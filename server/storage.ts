import { db } from "./db";
import {
  inquiries, services, cities,
  type Inquiry, type InsertInquiry,
  type Service, type InsertService,
  type City, type InsertCity,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  updateInquiryStatus(id: number, status: string, adminNotes?: string): Promise<Inquiry>;
  deleteInquiry(id: number): Promise<void>;

  // Services
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>; // For seeding

  // Cities
  getCities(): Promise<City[]>;
  createCity(city: InsertCity): Promise<City>; // For seeding
}

export class DatabaseStorage implements IStorage {
  // Inquiries
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [newInquiry] = await db.insert(inquiries).values(inquiry).returning();
    return newInquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, id));
    return inquiry;
  }

  async updateInquiryStatus(id: number, status: string, adminNotes?: string): Promise<Inquiry> {
    const [updated] = await db
      .update(inquiries)
      .set({ status, adminNotes, updatedAt: new Date() })
      .where(eq(inquiries.id, id))
      .returning();
    return updated;
  }

  async deleteInquiry(id: number): Promise<void> {
    await db.delete(inquiries).where(eq(inquiries.id, id));
  }

  // Services
  async getServices(): Promise<Service[]>;
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  // Cities
  async getCities(): Promise<City[]> {
    return await db.select().from(cities);
  }

  async createCity(city: InsertCity): Promise<City> {
    const [newCity] = await db.insert(cities).values(city).returning();
    return newCity;
  }
}

export class MemStorage implements IStorage {
  private inquiries: Map<number, Inquiry>;
  private services: Map<number, Service>;
  private cities: Map<number, City>;
  private inquiryId: number;
  private serviceId: number;
  private cityId: number;

  constructor() {
    this.inquiries = new Map();
    this.services = new Map();
    this.cities = new Map();
    this.inquiryId = 1;
    this.serviceId = 1;
    this.cityId = 1;
  }

  // Inquiries
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryId++;
    const newInquiry: Inquiry = {
      ...inquiry,
      id,
      status: "New",
      adminNotes: null,
      imageUrl: inquiry.imageUrl || null,
      areaAddress: inquiry.areaAddress || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferredContactMethod: inquiry.preferredContactMethod || "Call",
    };
    this.inquiries.set(id, newInquiry);
    return newInquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async updateInquiryStatus(id: number, status: string, adminNotes?: string): Promise<Inquiry> {
    const inquiry = this.inquiries.get(id);
    if (!inquiry) throw new Error("Inquiry not found");
    const updatedInquiry = { ...inquiry, status, adminNotes: adminNotes || null, updatedAt: new Date() };
    this.inquiries.set(id, updatedInquiry);
    return updatedInquiry;
  }

  async deleteInquiry(id: number): Promise<void> {
    if (!this.inquiries.has(id)) throw new Error("Inquiry not found");
    this.inquiries.delete(id);
  }

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find((s) => s.slug === slug);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceId++;
    const newService: Service = { ...service, id, createdAt: new Date() };
    this.services.set(id, newService);
    return newService;
  }

  // Cities
  async getCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }

  async createCity(city: InsertCity): Promise<City> {
    const id = this.cityId++;
    const newCity: City = { ...city, id, createdAt: new Date() };
    this.cities.set(id, newCity);
    return newCity;
  }
}

export const storage = db ? new DatabaseStorage() : new MemStorage();
