# STEM Education Center Website

## Overview

This is a modern educational website for a STEM (Science, Technology, Engineering, Mathematics) center focused on elementary and middle school students. The site showcases educational programs like Otto Robot, Microbit, Python, AI, and Cloud Computing with a clean, professional design using an ocean blue color scheme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built as a Single Page Application (SPA) using:
- **React** with TypeScript for type safety and better development experience
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **Tailwind CSS** for utility-first styling with custom STEM-focused color variables
- **Shadcn/ui** component library for consistent, accessible UI components
- **Vite** as the build tool for fast development and optimized production builds

### Backend Architecture

The backend follows a REST API architecture using:
- **Express.js** server with TypeScript
- **In-memory storage** pattern with interface-based design for easy future database integration
- **RESTful endpoints** for programs, students, news, events, and contacts
- **Input validation** using Zod schemas
- **Middleware** for request logging and error handling

### Database Strategy

Currently uses an in-memory storage system with a well-defined interface (IStorage) that can be easily replaced with a real database. The schema is defined using Drizzle ORM with PostgreSQL dialect, preparing for future database integration.

## Key Components

### Core Pages
- **Home** - Hero section with featured programs, students, and news
- **Programs** - Showcase of STEM educational programs with filtering
- **Students** - Outstanding student achievements with program and year filters
- **News** - Latest updates and announcements with category filtering
- **Events** - Upcoming and past events with registration support
- **Contact** - Contact form with validation
- **About** - Information about the center, teachers, and facilities

### Reusable Components
- **ProgramCard** - Displays program information with color-coded badges
- **StudentCard** - Shows student achievements with photos and descriptions
- **NewsCard** - News articles with category badges and publication dates
- **Header/Footer** - Consistent navigation and branding

### UI Components
Leverages Shadcn/ui library for:
- Forms with validation
- Cards and layouts
- Buttons and interactive elements
- Navigation components
- Toast notifications

## Data Flow

### Client-Side Data Management
- **React Query** for server state management, caching, and synchronization
- **React Hook Form** with Zod validation for form handling
- **Custom hooks** for responsive design and toast notifications

### API Communication
- RESTful API endpoints following conventional patterns
- Consistent error handling with appropriate HTTP status codes
- JSON request/response format
- Query parameters for filtering and pagination

### State Management
- Server state managed by React Query with automatic caching
- Component state using React hooks
- Form state managed by React Hook Form
- No global client state management (keeping it simple)

## External Dependencies

### Frontend Dependencies
- **@tanstack/react-query** - Server state management
- **@hookform/resolvers** - Form validation integration
- **@radix-ui/* components** - Accessible UI primitives
- **wouter** - Lightweight routing
- **date-fns** - Date formatting utilities
- **lucide-react** - Icon library

### Backend Dependencies
- **express** - Web framework
- **drizzle-orm** - Database ORM and schema definition
- **zod** - Schema validation
- **@neondatabase/serverless** - Database driver (prepared for future use)

### Development Tools
- **Vite** - Build tool and development server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **ESBuild** - Fast JavaScript bundler

## Deployment Strategy

### Development Environment
- **Vite dev server** for frontend with hot module replacement
- **Express server** running concurrently with frontend
- **Environment variables** for configuration
- **TypeScript compilation** for type checking

### Production Build
- **Vite build** generates optimized static assets
- **ESBuild** bundles the Express server
- **Static file serving** for the built frontend
- **Environment-based configuration** for production settings

### Hosting Considerations
- Designed for deployment on platforms like Replit, Vercel, or similar
- Static assets served from `/dist/public`
- API routes prefixed with `/api`
- Single server handles both API and static file serving

The architecture is designed for easy scaling and maintenance, with clear separation of concerns and a foundation ready for database integration when needed.