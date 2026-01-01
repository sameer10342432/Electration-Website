import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth
  setupAuth(app);

  // === Inquiries ===
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.inquiries.list.path, async (req, res) => {
    // Protect admin route
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const inquiries = await storage.getInquiries();
    res.json(inquiries);
  });

  app.get(api.inquiries.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const inquiry = await storage.getInquiry(Number(req.params.id));
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  });

  app.patch(api.inquiries.updateStatus.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { status, adminNotes } = req.body;
    const updated = await storage.updateInquiryStatus(Number(req.params.id), status, adminNotes);
    res.json(updated);
  });

  app.delete("/api/inquiries/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.deleteInquiry(Number(req.params.id));
    res.sendStatus(204);
  });

  // === Services ===
  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get(api.services.getBySlug.path, async (req, res) => {
    const service = await storage.getServiceBySlug(req.params.slug);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  });

  // === Cities ===
  app.get(api.cities.list.path, async (req, res) => {
    const cities = await storage.getCities();
    res.json(cities);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const services = await storage.getServices();
  if (services.length === 0) {
    const initialServices = [
      { name: "Electrical Wiring", slug: "electrical-wiring", icon: "Zap", imageUrl: "/images/electrical-wiring.png", shortDescription: "Complete home and office wiring services." },
      { name: "Light Installation", slug: "light-installation", icon: "Lightbulb", imageUrl: "/images/light-installation.png", shortDescription: "Indoor and outdoor lighting installation." },
      { name: "Switch & Socket", slug: "switch-socket", icon: "Plug", imageUrl: "/images/switch-socket.png", shortDescription: "Repair and installation of switches and sockets." },
      { name: "Circuit Breaker", slug: "circuit-breaker", icon: "Activity", imageUrl: "/images/circuit-breaker.png", shortDescription: "DB board and circuit breaker repairs." },
      { name: "UPS & Inverter", slug: "ups-inverter", icon: "Battery", imageUrl: "/images/ups-inverter.png", shortDescription: "UPS and inverter wiring and installation." },
      { name: "AC Wiring", slug: "ac-wiring", icon: "Wind", imageUrl: "/images/ac-wiring.png", shortDescription: "AC power point wiring and stabilization." },
      { name: "Fan Installation", slug: "fan-installation", icon: "Fan", imageUrl: "/images/fan-installation.png", shortDescription: "Ceiling and wall fan installation." },
      { name: "Generator Setup", slug: "generator-setup", icon: "Power", imageUrl: "/images/generator-setup.png", shortDescription: "Generator changeover switch and wiring." },
    ];
    for (const s of initialServices) {
      await storage.createService(s);
    }
  }

  const cities = await storage.getCities();
  if (cities.length === 0) {
    const initialCities = [
      { name: "Karachi", slug: "karachi" },
      { name: "Lahore", slug: "lahore" },
      { name: "Islamabad", slug: "islamabad" },
      { name: "Rawalpindi", slug: "rawalpindi" },
      { name: "Faisalabad", slug: "faisalabad" },
      { name: "Multan", slug: "multan" },
      { name: "Peshawar", slug: "peshawar" },
      { name: "Quetta", slug: "quetta" },
      { name: "Gujranwala", slug: "gujranwala" },
      { name: "Sialkot", slug: "sialkot" },
    ];
    for (const c of initialCities) {
      await storage.createCity(c);
    }
  }
}
