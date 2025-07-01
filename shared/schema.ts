import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  grade: text("grade").notNull(),
  division: text("division").notNull(),
  email: text("email"),
  committee: text("committee").notNull(),
  suggestions: text("suggestions"),
  status: text("status").notNull().default("pending"), // pending, confirmed, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  studentName: z.string().min(1, "Full name is required"),
  grade: z.enum(["8", "9", "10", "11", "12"], { required_error: "Grade is required" }),
  division: z.enum(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], { required_error: "Division is required" }),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  committee: z.string().min(1, "Committee selection is required"),
  suggestions: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
