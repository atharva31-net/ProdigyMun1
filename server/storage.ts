import { users, registrations, type User, type InsertUser, type Registration, type InsertRegistration } from "@shared/schema";
import { db } from "./db";
import { eq, count } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Registration methods
  getAllRegistrations(): Promise<Registration[]>;
  getRegistration(id: number): Promise<Registration | undefined>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  updateRegistrationStatus(id: number, status: "pending" | "confirmed" | "rejected"): Promise<Registration | undefined>;
  deleteRegistration(id: number): Promise<boolean>;
  getRegistrationStats(): Promise<{
    total: number;
    confirmed: number;
    pending: number;
    rejected: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private registrations: Map<number, Registration>;
  private currentUserId: number;
  private currentRegistrationId: number;

  constructor() {
    this.users = new Map();
    this.registrations = new Map();
    this.currentUserId = 1;
    this.currentRegistrationId = 1;
    
    // Create default admin user
    this.createUser({
      username: "prodigymun0",
      password: "munprodiy#123@12@12" // In production, this should be hashed
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllRegistrations(): Promise<Registration[]> {
    return Array.from(this.registrations.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getRegistration(id: number): Promise<Registration | undefined> {
    return this.registrations.get(id);
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = this.currentRegistrationId++;
    const registration: Registration = {
      ...insertRegistration,
      id,
      status: "pending",
      email: insertRegistration.email || null,
      suggestions: insertRegistration.suggestions || null,
      createdAt: new Date(),
    };
    this.registrations.set(id, registration);
    return registration;
  }

  async updateRegistrationStatus(id: number, status: "pending" | "confirmed" | "rejected"): Promise<Registration | undefined> {
    const registration = this.registrations.get(id);
    if (!registration) return undefined;
    
    const updatedRegistration = { ...registration, status };
    this.registrations.set(id, updatedRegistration);
    return updatedRegistration;
  }

  async deleteRegistration(id: number): Promise<boolean> {
    return this.registrations.delete(id);
  }

  async getRegistrationStats(): Promise<{
    total: number;
    confirmed: number;
    pending: number;
    rejected: number;
  }> {
    const allRegistrations = Array.from(this.registrations.values());
    return {
      total: allRegistrations.length,
      confirmed: allRegistrations.filter(r => r.status === "confirmed").length,
      pending: allRegistrations.filter(r => r.status === "pending").length,
      rejected: allRegistrations.filter(r => r.status === "rejected").length,
    };
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllRegistrations(): Promise<Registration[]> {
    return await db.select().from(registrations);
  }

  async getRegistration(id: number): Promise<Registration | undefined> {
    const [registration] = await db.select().from(registrations).where(eq(registrations.id, id));
    return registration || undefined;
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const [registration] = await db
      .insert(registrations)
      .values(insertRegistration)
      .returning();
    return registration;
  }

  async updateRegistrationStatus(id: number, status: "pending" | "confirmed" | "rejected"): Promise<Registration | undefined> {
    const [registration] = await db
      .update(registrations)
      .set({ status })
      .where(eq(registrations.id, id))
      .returning();
    return registration || undefined;
  }

  async deleteRegistration(id: number): Promise<boolean> {
    const result = await db.delete(registrations).where(eq(registrations.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getRegistrationStats(): Promise<{
    total: number;
    confirmed: number;
    pending: number;
    rejected: number;
  }> {
    const [totalResult] = await db.select({ count: count() }).from(registrations);
    const [confirmedResult] = await db.select({ count: count() }).from(registrations).where(eq(registrations.status, "confirmed"));
    const [pendingResult] = await db.select({ count: count() }).from(registrations).where(eq(registrations.status, "pending"));
    const [rejectedResult] = await db.select({ count: count() }).from(registrations).where(eq(registrations.status, "rejected"));

    return {
      total: totalResult.count,
      confirmed: confirmedResult.count,
      pending: pendingResult.count,
      rejected: rejectedResult.count,
    };
  }
}

export const storage = new DatabaseStorage();
