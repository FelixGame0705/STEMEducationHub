import { 
  users, programs, students, news, events, contacts,
  type User, type InsertUser, type Program, type InsertProgram,
  type Student, type InsertStudent, type News, type InsertNews,
  type Event, type InsertEvent, type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Programs
  getPrograms(): Promise<Program[]>;
  getProgram(id: number): Promise<Program | undefined>;
  getProgramBySlug(slug: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  
  // Students
  getStudents(): Promise<Student[]>;
  getStudent(id: number): Promise<Student | undefined>;
  getStudentsByProgram(program: string): Promise<Student[]>;
  getStudentsByYear(year: number): Promise<Student[]>;
  createStudent(student: InsertStudent): Promise<Student>;
  
  // News
  getNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  getFeaturedNews(): Promise<News[]>;
  getNewsByCategory(category: string): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  
  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getEventBySlug(slug: string): Promise<Event | undefined>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private programs: Map<number, Program>;
  private students: Map<number, Student>;
  private news: Map<number, News>;
  private events: Map<number, Event>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentProgramId: number;
  private currentStudentId: number;
  private currentNewsId: number;
  private currentEventId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.programs = new Map();
    this.students = new Map();
    this.news = new Map();
    this.events = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentProgramId = 1;
    this.currentStudentId = 1;
    this.currentNewsId = 1;
    this.currentEventId = 1;
    this.currentContactId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample data
    const samplePrograms: Program[] = [
      {
        id: 1,
        title: "Otto Robot",
        slug: "otto-robot",
        description: "Học lập trình cơ bản qua việc điều khiển robot Otto, phát triển tư duy logic và kỹ năng giải quyết vấn đề",
        ageRange: "8-12 tuổi",
        objectives: "Phát triển tư duy logic, kỹ năng giải quyết vấn đề, làm quen với lập trình cơ bản",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        color: "purple"
      },
      {
        id: 2,
        title: "Microbit",
        slug: "microbit",
        description: "Khám phá thế giới IoT với Microbit, học cách tạo ra các dự án thông minh và tương tác",
        ageRange: "10-14 tuổi",
        objectives: "Hiểu về IoT, tạo các dự án thông minh, phát triển kỹ năng lập trình",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        color: "green"
      },
      {
        id: 3,
        title: "Python",
        slug: "python",
        description: "Nền tảng lập trình Python từ cơ bản đến nâng cao, tạo ra những ứng dụng thực tế",
        ageRange: "12-16 tuổi",
        objectives: "Học lập trình Python, xây dựng ứng dụng, phát triển tư duy thuật toán",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        color: "blue"
      },
      {
        id: 4,
        title: "Trí tuệ nhân tạo (AI)",
        slug: "ai",
        description: "Khám phá thế giới AI, học cách xây dựng các mô hình học máy đơn giản",
        ageRange: "13-16 tuổi",
        objectives: "Hiểu về AI, xây dựng mô hình học máy, ứng dụng AI trong thực tế",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        color: "pink"
      },
      {
        id: 5,
        title: "Cloud Computing",
        slug: "cloud-computing",
        description: "Hiểu về điện toán đám mây và cách xây dựng ứng dụng trên nền tảng cloud",
        ageRange: "14-16 tuổi",
        objectives: "Hiểu về cloud computing, xây dựng ứng dụng cloud, quản lý dữ liệu",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        color: "indigo"
      }
    ];

    const sampleStudents: Student[] = [
      {
        id: 1,
        name: "Nguyễn Minh An",
        school: "THCS Nguyễn Trãi",
        grade: "Lớp 7A",
        achievement: "Giải nhất Olympic Tin học",
        description: "Đạt giải nhất cuộc thi lập trình Microbit cấp thành phố với dự án 'Hệ thống tưới cây thông minh'",
        image: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
        program: "Microbit",
        year: 2024
      },
      {
        id: 2,
        name: "Trần Thu Hà",
        school: "Tiểu học Trung Hòa",
        grade: "Lớp 5B",
        achievement: "Dự án xuất sắc",
        description: "Tạo ra robot Otto có thể nhảy theo nhạc và được trình diễn tại triển lãm khoa học trường",
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
        program: "Otto Robot",
        year: 2024
      },
      {
        id: 3,
        name: "Lê Đức Anh",
        school: "THCS Lê Quý Đôn",
        grade: "Lớp 8C",
        achievement: "Ứng dụng Python",
        description: "Phát triển ứng dụng Python quản lý thư viện trường học, được áp dụng thực tế",
        image: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
        program: "Python",
        year: 2024
      }
    ];

    const sampleNews: News[] = [
      {
        id: 1,
        title: "Khai trương lớp học AI mới dành cho học sinh THCS",
        slug: "khai-truong-lop-hoc-ai-moi",
        excerpt: "Trung tâm vừa ra mắt chương trình học AI cơ bản dành cho học sinh từ 13-16 tuổi với phương pháp giảng dạy hiện đại...",
        content: "Trung tâm STEM vừa chính thức khai trương lớp học Trí tuệ nhân tạo (AI) dành cho học sinh THCS. Chương trình được thiết kế đặc biệt để giúp các em hiểu về AI một cách dễ dàng và thú vị.",
        image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "TIN TỨC",
        publishedAt: new Date("2024-03-15"),
        featured: true
      },
      {
        id: 2,
        title: "Cuộc thi Robotics toàn quốc - Học viên STEM Center đạt 3 giải",
        slug: "cuoc-thi-robotics-toan-quoc",
        excerpt: "Trong cuộc thi Robotics toàn quốc năm 2024, các học viên của trung tâm đã đạt được những thành tích ấn tượng...",
        content: "Cuộc thi Robotics toàn quốc năm 2024 đã khép lại với những thành tích đáng tự hào của các học viên STEM Center. Các em đã giành được 1 giải nhất, 1 giải nhì và 1 giải ba.",
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "SỰ KIỆN",
        publishedAt: new Date("2024-03-12"),
        featured: true
      },
      {
        id: 3,
        title: "Workshop 'Python cho người mới bắt đầu' - Miễn phí cho phụ huynh",
        slug: "workshop-python-cho-nguoi-moi-bat-dau",
        excerpt: "Một workshop đặc biệt dành cho phụ huynh muốn hiểu rõ hơn về lập trình Python và cách con em học tập...",
        content: "Trung tâm STEM tổ chức workshop miễn phí dành cho phụ huynh để hiểu rõ hơn về chương trình học Python và cách hỗ trợ con em trong quá trình học tập.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "WORKSHOP",
        publishedAt: new Date("2024-03-08"),
        featured: false
      }
    ];

    const sampleEvents: Event[] = [
      {
        id: 1,
        title: "Triển lãm Khoa học Công nghệ 2024",
        slug: "trien-lam-khoa-hoc-cong-nghe-2024",
        description: "Triển lãm các dự án STEM xuất sắc của học viên trong năm học 2023-2024",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-04-15"),
        endDate: new Date("2024-04-16"),
        location: "Trung tâm STEM - 123 Đường ABC, Quận 1, TP.HCM",
        registrationRequired: true
      },
      {
        id: 2,
        title: "Cuộc thi Lập trình Microbit",
        slug: "cuoc-thi-lap-trinh-microbit",
        description: "Cuộc thi lập trình Microbit dành cho học sinh tiểu học và THCS",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        startDate: new Date("2024-05-20"),
        endDate: new Date("2024-05-20"),
        location: "Trung tâm STEM - 123 Đường ABC, Quận 1, TP.HCM",
        registrationRequired: true
      }
    ];

    samplePrograms.forEach(program => {
      this.programs.set(program.id, program);
      this.currentProgramId = Math.max(this.currentProgramId, program.id + 1);
    });

    sampleStudents.forEach(student => {
      this.students.set(student.id, student);
      this.currentStudentId = Math.max(this.currentStudentId, student.id + 1);
    });

    sampleNews.forEach(news => {
      this.news.set(news.id, news);
      this.currentNewsId = Math.max(this.currentNewsId, news.id + 1);
    });

    sampleEvents.forEach(event => {
      this.events.set(event.id, event);
      this.currentEventId = Math.max(this.currentEventId, event.id + 1);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Programs
  async getPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgram(id: number): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async getProgramBySlug(slug: string): Promise<Program | undefined> {
    return Array.from(this.programs.values()).find(program => program.slug === slug);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = this.currentProgramId++;
    const program: Program = { ...insertProgram, id };
    this.programs.set(id, program);
    return program;
  }

  // Students
  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentsByProgram(program: string): Promise<Student[]> {
    return Array.from(this.students.values()).filter(student => student.program === program);
  }

  async getStudentsByYear(year: number): Promise<Student[]> {
    return Array.from(this.students.values()).filter(student => student.year === year);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.currentStudentId++;
    const student: Student = { ...insertStudent, id };
    this.students.set(id, student);
    return student;
  }

  // News
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    return Array.from(this.news.values()).find(news => news.slug === slug);
  }

  async getFeaturedNews(): Promise<News[]> {
    return Array.from(this.news.values())
      .filter(news => news.featured)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getNewsByCategory(category: string): Promise<News[]> {
    return Array.from(this.news.values())
      .filter(news => news.category === category)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const news: News = { ...insertNews, id };
    this.news.set(id, news);
    return news;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getEventBySlug(slug: string): Promise<Event | undefined> {
    return Array.from(this.events.values()).find(event => event.slug === slug);
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values())
      .filter(event => event.startDate > now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { ...insertContact, id, submittedAt: new Date() };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
