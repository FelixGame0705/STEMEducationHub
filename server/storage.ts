import { 
  adminUsers, programs, students, news, events, contacts, recruitments,
  type AdminUser, type InsertAdminUser, type Program, type InsertProgram,
  type Student, type InsertStudent, type News, type InsertNews,
  type Event, type InsertEvent, type Contact, type InsertContact,
  type Recruitment, type InsertRecruitment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, like, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // Admin Users
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  validateAdminUser(username: string, password: string): Promise<AdminUser | null>;
  
  // Programs
  getPrograms(options?: { limit?: number; offset?: number }): Promise<{ programs: Program[]; total: number }>;
  getProgram(id: number): Promise<Program | undefined>;
  getProgramBySlug(slug: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: number, program: Partial<InsertProgram>): Promise<Program>;
  deleteProgram(id: number): Promise<void>;
  
  // Students
  getStudents(options?: { limit?: number; offset?: number; program?: string; year?: number }): Promise<{ students: Student[]; total: number }>;
  getStudent(id: number): Promise<Student | undefined>;
  getStudentsByProgram(program: string): Promise<Student[]>;
  getStudentsByYear(year: number): Promise<Student[]>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student>;
  deleteStudent(id: number): Promise<void>;
  
  // News
  getNews(options?: { limit?: number; offset?: number; category?: string; featured?: boolean }): Promise<{ news: News[]; total: number }>;
  getNewsItem(id: number): Promise<News | undefined>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  getFeaturedNews(): Promise<News[]>;
  getNewsByCategory(category: string): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: number, news: Partial<InsertNews>): Promise<News>;
  deleteNews(id: number): Promise<void>;
  
  // Events
  getEvents(options?: { limit?: number; offset?: number; upcoming?: boolean }): Promise<{ events: Event[]; total: number }>;
  getEvent(id: number): Promise<Event | undefined>;
  getEventBySlug(slug: string): Promise<Event | undefined>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
  
  // Recruitments
  getRecruitments(options?: { limit?: number; offset?: number; type?: string }): Promise<{ recruitments: Recruitment[]; total: number }>;
  getRecruitment(id: number): Promise<Recruitment | undefined>;
  getRecruitmentBySlug(slug: string): Promise<Recruitment | undefined>;
  createRecruitment(recruitment: InsertRecruitment): Promise<Recruitment>;
  updateRecruitment(id: number, recruitment: Partial<InsertRecruitment>): Promise<Recruitment>;
  deleteRecruitment(id: number): Promise<void>;
  
  // Contacts
  getContacts(options?: { limit?: number; offset?: number; processed?: boolean }): Promise<{ contacts: Contact[]; total: number }>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: number, contact: Partial<Contact>): Promise<Contact>;
  deleteContact(id: number): Promise<void>;
}

// For development - using memory storage with real database structure
export class MemStorage implements IStorage {
  private adminUsersData: Map<number, AdminUser> = new Map();
  private programsData: Map<number, Program> = new Map();
  private studentsData: Map<number, Student> = new Map();
  private newsData: Map<number, News> = new Map();
  private eventsData: Map<number, Event> = new Map();
  private recruitmentsData: Map<number, Recruitment> = new Map();
  private contactsData: Map<number, Contact> = new Map();
  
  private nextId = {
    adminUsers: 1,
    programs: 1,
    students: 1,
    news: 1,
    events: 1,
    recruitments: 1,
    contacts: 1
  };

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize admin user
    const hashedPassword = bcrypt.hashSync('123456', 10);
    this.adminUsersData.set(1, {
      id: 1,
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date(),
    });
    this.nextId.adminUsers = 2;

    // Initialize programs
    const programsData = [
      {
        id: 1,
        title: "Otto Robot",
        slug: "otto-robot",
        description: "Lập trình robot Otto - Robot đi bộ hai chân với Arduino",
        ageRange: "8-12 tuổi",
        objectives: "Học lập trình cơ bản, tư duy logic, kỹ năng giải quyết vấn đề",
        image: "/api/placeholder/400/300",
        color: "#3B82F6",
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "Microbit",
        slug: "microbit",
        description: "Lập trình Microbit - Vi điều khiển nhỏ gọn, dễ sử dụng",
        ageRange: "9-14 tuổi",
        objectives: "Học lập trình visual, điều khiển LED, cảm biến",
        image: "/api/placeholder/400/300",
        color: "#10B981",
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Python for Kids",
        slug: "python-for-kids",
        description: "Học lập trình Python cơ bản dành cho trẻ em",
        ageRange: "10-16 tuổi",
        objectives: "Nền tảng lập trình, tư duy thuật toán, phát triển game đơn giản",
        image: "/api/placeholder/400/300",
        color: "#8B5CF6",
        createdAt: new Date(),
      },
      {
        id: 4,
        title: "AI for Young Minds",
        slug: "ai-for-young-minds",
        description: "Giới thiệu AI và Machine Learning cho trẻ em",
        ageRange: "12-16 tuổi",
        objectives: "Hiểu biết về AI, xây dựng chatbot đơn giản, phân loại hình ảnh",
        image: "/api/placeholder/400/300",
        color: "#EF4444",
        createdAt: new Date(),
      },
      {
        id: 5,
        title: "Cloud Computing Basics",
        slug: "cloud-computing-basics",
        description: "Cơ bản về điện toán đám mây và các dịch vụ cloud",
        ageRange: "14-18 tuổi",
        objectives: "Hiểu về cloud, triển khai ứng dụng web, quản lý dữ liệu",
        image: "/api/placeholder/400/300",
        color: "#F59E0B",
        createdAt: new Date(),
      }
    ];

    programsData.forEach(program => this.programsData.set(program.id, program));
    this.nextId.programs = 6;

    // Initialize students
    const studentsData = [
      {
        id: 1,
        name: "Nguyễn Minh An",
        school: "THCS Trần Phú",
        grade: "Lớp 7",
        achievement: "Giải Nhất cuộc thi Robothon 2024",
        description: "An đã xuất sắc lập trình robot Otto thực hiện các động tác phức tạp và giành giải nhất trong cuộc thi Robothon cấp thành phố.",
        image: "/api/placeholder/300/400",
        program: "Otto Robot",
        year: 2024,
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Trần Thanh Hà",
        school: "THCS Võ Thị Sáu",
        grade: "Lớp 8",
        achievement: "Giải Nhì cuộc thi Microbit Challenge",
        description: "Hà đã tạo ra một hệ thống thông minh giám sát nhiệt độ và độ ẩm sử dụng Microbit và các cảm biến.",
        image: "/api/placeholder/300/400",
        program: "Microbit",
        year: 2024,
        createdAt: new Date(),
      },
      {
        id: 3,
        name: "Lê Hoàng Nam",
        school: "THPT Nguyễn Huệ",
        grade: "Lớp 10",
        achievement: "Phát triển game Python đầu tiên",
        description: "Nam đã tự phát triển một game puzzle bằng Python với giao diện đẹp mắt và gameplay thú vị.",
        image: "/api/placeholder/300/400",
        program: "Python for Kids",
        year: 2024,
        createdAt: new Date(),
      }
    ];

    studentsData.forEach(student => this.studentsData.set(student.id, student));
    this.nextId.students = 4;

    // Initialize news
    const newsData = [
      {
        id: 1,
        title: "Khai trương lớp học AI mới dành cho học sinh trung học",
        slug: "khai-truong-lop-hoc-ai-moi",
        excerpt: "Trung tâm STEM chính thức ra mắt chương trình học AI cho học sinh từ 12-16 tuổi",
        content: "Chương trình học AI mới của chúng tôi sẽ giúp các em học sinh...",
        image: "/api/placeholder/600/400",
        category: "TIN TỨC",
        publishedAt: new Date("2024-01-15"),
        featured: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "Học viên STEM đạt giải cao tại cuộc thi Robothon 2024",
        slug: "hoc-vien-stem-dat-giai-cao-robothon-2024",
        excerpt: "3 học viên của trung tâm đã xuất sắc giành giải trong cuộc thi lập trình robot toàn quốc",
        content: "Với sự chuẩn bị kỹ lưỡng và tài năng xuất sắc...",
        image: "/api/placeholder/600/400",
        category: "THÀNH TỰU",
        publishedAt: new Date("2024-01-10"),
        featured: true,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Workshop Python miễn phí cho phụ huynh",
        slug: "workshop-python-mien-phi-cho-phu-huynh",
        excerpt: "Tham gia workshop để hiểu thêm về lập trình Python và cách hỗ trợ con em học tập",
        content: "Workshop này sẽ cung cấp cho phụ huynh những kiến thức cơ bản...",
        image: "/api/placeholder/600/400",
        category: "WORKSHOP",
        publishedAt: new Date("2024-01-05"),
        featured: false,
        createdAt: new Date(),
      }
    ];

    newsData.forEach(news => this.newsData.set(news.id, news));
    this.nextId.news = 4;

    // Initialize events
    const eventsData = [
      {
        id: 1,
        title: "Triển lãm Robot STEM 2024",
        slug: "trien-lam-robot-stem-2024",
        description: "Triển lãm các sản phẩm robot do học viên tự thiết kế và lập trình",
        image: "/api/placeholder/600/400",
        startDate: new Date("2024-03-15"),
        endDate: new Date("2024-03-17"),
        location: "Trung tâm STEM, Quận 1, TP.HCM",
        registrationRequired: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "Cuộc thi Microbit Challenge 2024",
        slug: "cuoc-thi-microbit-challenge-2024",
        description: "Cuộc thi lập trình Microbit dành cho học sinh cấp 2",
        image: "/api/placeholder/600/400",
        startDate: new Date("2024-04-20"),
        endDate: new Date("2024-04-22"),
        location: "Trường THCS Trần Phú, Quận 3, TP.HCM",
        registrationRequired: true,
        createdAt: new Date(),
      }
    ];

    eventsData.forEach(event => this.eventsData.set(event.id, event));
    this.nextId.events = 3;

    // Initialize recruitments
    const recruitmentsData = [
      {
        id: 1,
        title: "Giảng viên lập trình Python",
        slug: "giang-vien-lap-trinh-python",
        description: "Tìm kiếm giảng viên có kinh nghiệm giảng dạy Python cho trẻ em",
        requirements: "Tốt nghiệp Công nghệ thông tin, có kinh nghiệm giảng dạy, yêu thích trẻ em",
        benefits: "Lương cạnh tranh, môi trường làm việc năng động, cơ hội phát triển",
        deadline: new Date("2024-02-29"),
        location: "TP.HCM",
        salary: "15-25 triệu",
        type: "full-time",
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "Trợ giảng Robotics",
        slug: "tro-giang-robotics",
        description: "Hỗ trợ giảng viên trong các lớp học robotics",
        requirements: "Sinh viên năm 3-4, có kiến thức về Arduino, robot",
        benefits: "Kinh nghiệm giảng dạy, thu nhập thêm, môi trường học tập",
        deadline: new Date("2024-03-15"),
        location: "TP.HCM",
        salary: "5-8 triệu",
        type: "part-time",
        createdAt: new Date(),
      }
    ];

    recruitmentsData.forEach(recruitment => this.recruitmentsData.set(recruitment.id, recruitment));
    this.nextId.recruitments = 3;
  }

  // Admin Users
  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    return this.adminUsersData.get(id);
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsersData.values()).find(user => user.username === username);
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const hashedPassword = bcrypt.hashSync(insertUser.password, 10);
    const user: AdminUser = {
      id: this.nextId.adminUsers++,
      username: insertUser.username,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.adminUsersData.set(user.id, user);
    return user;
  }

  async validateAdminUser(username: string, password: string): Promise<AdminUser | null> {
    const user = await this.getAdminUserByUsername(username);
    if (!user) return null;
    
    const isValid = bcrypt.compareSync(password, user.password);
    return isValid ? user : null;
  }

  // Programs
  async getPrograms(options?: { limit?: number; offset?: number }): Promise<{ programs: Program[]; total: number }> {
    const allPrograms = Array.from(this.programsData.values()).sort((a, b) => a.id - b.id);
    const total = allPrograms.length;
    
    if (options?.limit) {
      const start = options.offset || 0;
      const programs = allPrograms.slice(start, start + options.limit);
      return { programs, total };
    }
    
    return { programs: allPrograms, total };
  }

  async getProgram(id: number): Promise<Program | undefined> {
    return this.programsData.get(id);
  }

  async getProgramBySlug(slug: string): Promise<Program | undefined> {
    return Array.from(this.programsData.values()).find(program => program.slug === slug);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const program: Program = {
      id: this.nextId.programs++,
      ...insertProgram,
      createdAt: new Date(),
    };
    this.programsData.set(program.id, program);
    return program;
  }

  async updateProgram(id: number, updateData: Partial<InsertProgram>): Promise<Program> {
    const program = this.programsData.get(id);
    if (!program) throw new Error('Program not found');
    
    const updatedProgram = { ...program, ...updateData };
    this.programsData.set(id, updatedProgram);
    return updatedProgram;
  }

  async deleteProgram(id: number): Promise<void> {
    this.programsData.delete(id);
  }

  // Students
  async getStudents(options?: { limit?: number; offset?: number; program?: string; year?: number }): Promise<{ students: Student[]; total: number }> {
    let allStudents = Array.from(this.studentsData.values());
    
    if (options?.program) {
      allStudents = allStudents.filter(student => student.program === options.program);
    }
    
    if (options?.year) {
      allStudents = allStudents.filter(student => student.year === options.year);
    }
    
    allStudents.sort((a, b) => a.id - b.id);
    const total = allStudents.length;
    
    if (options?.limit) {
      const start = options.offset || 0;
      const students = allStudents.slice(start, start + options.limit);
      return { students, total };
    }
    
    return { students: allStudents, total };
  }

  async getStudent(id: number): Promise<Student | undefined> {
    return this.studentsData.get(id);
  }

  async getStudentsByProgram(program: string): Promise<Student[]> {
    return Array.from(this.studentsData.values()).filter(student => student.program === program);
  }

  async getStudentsByYear(year: number): Promise<Student[]> {
    return Array.from(this.studentsData.values()).filter(student => student.year === year);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const student: Student = {
      id: this.nextId.students++,
      ...insertStudent,
      createdAt: new Date(),
    };
    this.studentsData.set(student.id, student);
    return student;
  }

  async updateStudent(id: number, updateData: Partial<InsertStudent>): Promise<Student> {
    const student = this.studentsData.get(id);
    if (!student) throw new Error('Student not found');
    
    const updatedStudent = { ...student, ...updateData };
    this.studentsData.set(id, updatedStudent);
    return updatedStudent;
  }

  async deleteStudent(id: number): Promise<void> {
    this.studentsData.delete(id);
  }

  // News
  async getNews(options?: { limit?: number; offset?: number; category?: string; featured?: boolean }): Promise<{ news: News[]; total: number }> {
    let allNews = Array.from(this.newsData.values());
    
    if (options?.category) {
      allNews = allNews.filter(news => news.category === options.category);
    }
    
    if (options?.featured !== undefined) {
      allNews = allNews.filter(news => news.featured === options.featured);
    }
    
    allNews.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    const total = allNews.length;
    
    if (options?.limit) {
      const start = options.offset || 0;
      const news = allNews.slice(start, start + options.limit);
      return { news, total };
    }
    
    return { news: allNews, total };
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    return this.newsData.get(id);
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    return Array.from(this.newsData.values()).find(news => news.slug === slug);
  }

  async getFeaturedNews(): Promise<News[]> {
    return Array.from(this.newsData.values())
      .filter(news => news.featured)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getNewsByCategory(category: string): Promise<News[]> {
    return Array.from(this.newsData.values())
      .filter(news => news.category === category)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const news: News = {
      id: this.nextId.news++,
      ...insertNews,
      createdAt: new Date(),
    };
    this.newsData.set(news.id, news);
    return news;
  }

  async updateNews(id: number, updateData: Partial<InsertNews>): Promise<News> {
    const news = this.newsData.get(id);
    if (!news) throw new Error('News not found');
    
    const updatedNews = { ...news, ...updateData };
    this.newsData.set(id, updatedNews);
    return updatedNews;
  }

  async deleteNews(id: number): Promise<void> {
    this.newsData.delete(id);
  }

  // Events
  async getEvents(options?: { limit?: number; offset?: number; upcoming?: boolean }): Promise<{ events: Event[]; total: number }> {
    let allEvents = Array.from(this.eventsData.values());
    
    if (options?.upcoming) {
      const now = new Date();
      allEvents = allEvents.filter(event => event.startDate >= now);
    }
    
    allEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const total = allEvents.length;
    
    if (options?.limit) {
      const start = options.offset || 0;
      const events = allEvents.slice(start, start + options.limit);
      return { events, total };
    }
    
    return { events: allEvents, total };
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.eventsData.get(id);
  }

  async getEventBySlug(slug: string): Promise<Event | undefined> {
    return Array.from(this.eventsData.values()).find(event => event.slug === slug);
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.eventsData.values())
      .filter(event => event.startDate >= now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const event: Event = {
      id: this.nextId.events++,
      ...insertEvent,
      createdAt: new Date(),
    };
    this.eventsData.set(event.id, event);
    return event;
  }

  async updateEvent(id: number, updateData: Partial<InsertEvent>): Promise<Event> {
    const event = this.eventsData.get(id);
    if (!event) throw new Error('Event not found');
    
    const updatedEvent = { ...event, ...updateData };
    this.eventsData.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<void> {
    this.eventsData.delete(id);
  }

  // Recruitments
  async getRecruitments(options?: { limit?: number; offset?: number; type?: string }): Promise<{ recruitments: Recruitment[]; total: number }> {
    let allRecruitments = Array.from(this.recruitmentsData.values());
    
    if (options?.type) {
      allRecruitments = allRecruitments.filter(recruitment => recruitment.type === options.type);
    }
    
    allRecruitments.sort((a, b) => b.deadline.getTime() - a.deadline.getTime());
    const total = allRecruitments.length;
    
    if (options?.limit) {
      const start = options.offset || 0;
      const recruitments = allRecruitments.slice(start, start + options.limit);
      return { recruitments, total };
    }
    
    return { recruitments: allRecruitments, total };
  }

  async getRecruitment(id: number): Promise<Recruitment | undefined> {
    return this.recruitmentsData.get(id);
  }

  async getRecruitmentBySlug(slug: string): Promise<Recruitment | undefined> {
    return Array.from(this.recruitmentsData.values()).find(recruitment => recruitment.slug === slug);
  }

  async createRecruitment(insertRecruitment: InsertRecruitment): Promise<Recruitment> {
    const recruitment: Recruitment = {
      id: this.nextId.recruitments++,
      ...insertRecruitment,
      createdAt: new Date(),
    };
    this.recruitmentsData.set(recruitment.id, recruitment);
    return recruitment;
  }

  async updateRecruitment(id: number, updateData: Partial<InsertRecruitment>): Promise<Recruitment> {
    const recruitment = this.recruitmentsData.get(id);
    if (!recruitment) throw new Error('Recruitment not found');
    
    const updatedRecruitment = { ...recruitment, ...updateData };
    this.recruitmentsData.set(id, updatedRecruitment);
    return updatedRecruitment;
  }

  async deleteRecruitment(id: number): Promise<void> {
    this.recruitmentsData.delete(id);
  }

  // Contacts
  async getContacts(options?: { limit?: number; offset?: number; processed?: boolean }): Promise<{ contacts: Contact[]; total: number }> {
    let allContacts = Array.from(this.contactsData.values());
    
    if (options?.processed !== undefined) {
      allContacts = allContacts.filter(contact => contact.processed === options.processed);
    }
    
    allContacts.sort((a, b) => (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0));
    const total = allContacts.length;
    
    if (options?.limit) {
      const start = options.offset || 0;
      const contacts = allContacts.slice(start, start + options.limit);
      return { contacts, total };
    }
    
    return { contacts: allContacts, total };
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contactsData.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: this.nextId.contacts++,
      ...insertContact,
      submittedAt: new Date(),
      processed: false,
    };
    this.contactsData.set(contact.id, contact);
    return contact;
  }

  async updateContact(id: number, updateData: Partial<Contact>): Promise<Contact> {
    const contact = this.contactsData.get(id);
    if (!contact) throw new Error('Contact not found');
    
    const updatedContact = { ...contact, ...updateData };
    this.contactsData.set(id, updatedContact);
    return updatedContact;
  }

  async deleteContact(id: number): Promise<void> {
    this.contactsData.delete(id);
  }
}

export const storage = new MemStorage();