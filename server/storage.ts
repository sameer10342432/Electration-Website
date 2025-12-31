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

export const storage = new DatabaseStorage();
