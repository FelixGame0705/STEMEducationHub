import { mysqlTable, text, int, boolean, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin users table
export const adminUsers = mysqlTable("admin_users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const programs = mysqlTable("programs", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  ageRange: varchar("age_range", { length: 100 }).notNull(),
  objectives: text("objectives").notNull(),
  image: varchar("image", { length: 500 }).notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const students = mysqlTable("students", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  school: varchar("school", { length: 255 }).notNull(),
  grade: varchar("grade", { length: 50 }).notNull(),
  achievement: varchar("achievement", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 500 }).notNull(),
  program: varchar("program", { length: 255 }).notNull(),
  year: int("year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const news = mysqlTable("news", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: varchar("image", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  publishedAt: timestamp("published_at").notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = mysqlTable("events", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  image: varchar("image", { length: 500 }).notNull(),
  startDate: timestamp("start_date").notNull().defaultNow(),
  endDate: timestamp("end_date").notNull().defaultNow(),
  location: varchar("location", { length: 255 }).notNull(),
  registrationRequired: boolean("registration_required").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const recruitments = mysqlTable("recruitments", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  benefits: text("benefits").notNull(),
  deadline: timestamp("deadline").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  salary: varchar("salary", { length: 255 }),
  type: varchar("type", { length: 100 }).notNull(), // "full-time", "part-time", "internship"
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = mysqlTable("contacts", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
  processed: boolean("processed").default(false),
});
// Helper
export const zDateFromString = z.preprocess((val) => {
  if (typeof val === "string" || val instanceof Date) return new Date(val);
  return val;
}, z.date());

// Admin user
export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  username: true,
  password: true,
});

// Programs
export const insertProgramSchema = createInsertSchema(programs, {
  createdAt: zDateFromString,
}).omit({
  id: true,
  createdAt: true,
});

// Students
export const insertStudentSchema = createInsertSchema(students, {
  createdAt: zDateFromString,
}).omit({
  id: true,
  createdAt: true,
});

// News
export const insertNewsSchema = createInsertSchema(news, {
  publishedAt: zDateFromString,
  createdAt: zDateFromString,
}).omit({
  id: true,
  createdAt: true,
});

// Events
export const insertEventSchema = createInsertSchema(events, {
  startDate: zDateFromString,
  endDate: zDateFromString,
  createdAt: zDateFromString,
}).omit({
  id: true,
  createdAt: true,
});

// Recruitments
export const insertRecruitmentSchema = createInsertSchema(recruitments, {
  deadline: zDateFromString,
  createdAt: zDateFromString,
}).omit({
  id: true,
  createdAt: true,
});

// Contacts
export const insertContactSchema = createInsertSchema(contacts, {
  submittedAt: zDateFromString,
}).omit({
  id: true,
  submittedAt: true,
  processed: true,
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Recruitment = typeof recruitments.$inferSelect;
export type InsertRecruitment = z.infer<typeof insertRecruitmentSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;


