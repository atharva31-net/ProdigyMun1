import { users, registrations, type User, type InsertUser, type Registration, type InsertRegistration } from "@shared/schema";

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

export const storage = new MemStorage();
