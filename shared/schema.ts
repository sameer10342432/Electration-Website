export * from "./models/auth";
import { pgTable, text, serial, timestamp, boolean, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  service: text("service").notNull(),
  areaAddress: text("area_address"),
  message: text("message").notNull(),
  preferredContactMethod: text("preferred_contact_method").notNull().default("Call"),
  imageUrl: text("image_url"),
  status: text("status").notNull().default("New"), // New, Contacted, Completed, Spam
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(), // emoji or icon name
  shortDescription: text("short_description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertInquirySchema = createInsertSchema(inquiries).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true, 
  status: true, 
  adminNotes: true 
});
export const insertServiceSchema = createInsertSchema(services).omit({ id: true, createdAt: true });
export const insertCitySchema = createInsertSchema(cities).omit({ id: true, createdAt: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type City = typeof cities.$inferSelect;
export type InsertCity = z.infer<typeof insertCitySchema>;

// Request Types
export type CreateInquiryRequest = InsertInquiry;
export type UpdateInquiryStatusRequest = { status: string; adminNotes?: string };

// Response Types
export type InquiryResponse = Inquiry;
export type ServiceResponse = Service;
export type CityResponse = City;
