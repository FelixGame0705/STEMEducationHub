import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Programs
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.getPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch programs" });
    }
  });

  app.get("/api/programs/:slug", async (req, res) => {
    try {
      const program = await storage.getProgramBySlug(req.params.slug);
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.json(program);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch program" });
    }
  });

  // Students
  app.get("/api/students", async (req, res) => {
    try {
      const { program, year } = req.query;
      let students;
      
      if (program) {
        students = await storage.getStudentsByProgram(program as string);
      } else if (year) {
        students = await storage.getStudentsByYear(parseInt(year as string));
      } else {
        students = await storage.getStudents();
      }
      
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

  // News
  app.get("/api/news", async (req, res) => {
    try {
      const { category, featured } = req.query;
      let news;
      
      if (featured === "true") {
        news = await storage.getFeaturedNews();
      } else if (category) {
        news = await storage.getNewsByCategory(category as string);
      } else {
        news = await storage.getNews();
      }
      
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:slug", async (req, res) => {
    try {
      const news = await storage.getNewsBySlug(req.params.slug);
      if (!news) {
        return res.status(404).json({ error: "News article not found" });
      }
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news article" });
    }
  });

  // Events
  app.get("/api/events", async (req, res) => {
    try {
      const { upcoming } = req.query;
      let events;
      
      if (upcoming === "true") {
        events = await storage.getUpcomingEvents();
      } else {
        events = await storage.getEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:slug", async (req, res) => {
    try {
      const event = await storage.getEventBySlug(req.params.slug);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  // Contacts
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
