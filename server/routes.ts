import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema } from "@shared/schema";
import { z } from "zod";

const adminLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Root route - API status
  app.get("/", (req, res) => {
    res.json({
      message: "Prodigy MUN 2025 API Server",
      status: "running",
      version: "1.0.0",
      endpoints: {
        health: "/api/registrations/stats",
        admin_login: "POST /api/admin/login",
        registrations: "GET/POST /api/registrations",
        registration_management: "PATCH/DELETE /api/registrations/:id"
      }
    });
  });

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In production, create a proper JWT token
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Registration endpoints
  app.post("/api/registrations", async (req, res) => {
    try {
      const registrationData = insertRegistrationSchema.parse(req.body);
      
      // Check if student already registered for any committee
      const existingRegistrations = await storage.getAllRegistrations();
      const existingRegistration = existingRegistrations.find(
        r => r.studentName.toLowerCase() === registrationData.studentName.toLowerCase() &&
             r.grade === registrationData.grade &&
             r.division === registrationData.division
      );
      
      if (existingRegistration) {
        return res.status(400).json({ 
          message: "A registration already exists for this student. Each student can only register once." 
        });
      }
      
      const registration = await storage.createRegistration(registrationData);
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/registrations/stats", async (req, res) => {
    try {
      const stats = await storage.getRegistrationStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/registrations/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = z.object({ 
        status: z.enum(["pending", "confirmed", "rejected"]) 
      }).parse(req.body);
      
      const updatedRegistration = await storage.updateRegistrationStatus(id, status);
      if (!updatedRegistration) {
        return res.status(404).json({ message: "Registration not found" });
      }
      
      res.json(updatedRegistration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid status", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/registrations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteRegistration(id);
      
      if (!success) {
        return res.status(404).json({ message: "Registration not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
