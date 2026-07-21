export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export interface Project {
  title: string;
  role: string;
  dateRange: string;
  description: string;
  metrics: string[];
  tags: string[];
  liveUrl?: string;
}

export const projectsData: Project[] = [
  {
    title: "FPT.Maas — Smart Ticketing for Modern Public Transportation",
    role: "Product Manager · Deputy Head of Metro Solutions",
    dateRange: "2023 – Present",
    description:
      "Led HCMC Metro's digital product (FPT.Maas) and payment-integration workstreams, coordinating Metro authorities, banks, card schemes, e-wallets, AFC vendors, engineering, QA, and operations from requirements and solution design through UAT and go-live.",
    metrics: ["90%+ cashless payments", "6+ payment partners integrated", "Requirements → go-live ownership"],
    tags: ["AFC", "EMV", "QR", "VNeID", "Biometric", "Payment Integration"],
    liveUrl: "https://maas.paas.io.vn/",
  },
  {
    title: "HCMC Metro HURC — Passenger App",
    role: "Product Owner",
    dateRange: "2019 – Present",
    description:
      "Delivered the HCMC Metro HURC application for journey planning, fare calculation, station information, passenger guidance, and digital services — giving Metro riders a single companion app from trip planning through in-station navigation.",
    metrics: ["500,000+ downloads", "Fare calculation & journey planning", "Station info & passenger guidance"],
    tags: ["Urban Mobility", "Metro", "Journey Planning", "Fare Calculation", "Passenger Experience"],
  },
  {
    title: "Go!Bus — Multimodal Journey Planning",
    role: "Product Owner",
    dateRange: "2019 – Present",
    description:
      "Pioneered multimodal journey planning connecting buses with ride-hailing, river bus, metro, and other public transport across HCMC. Delivered vehicle tracking, arrival-time prediction, route planning, personalized stops, service info, and direct rider feedback to operators.",
    metrics: ["245,000+ Zalo Mini App users", "261,000+ visits in 40 days", "Real-time tracking & ETA prediction"],
    tags: ["Urban Mobility", "Zalo Mini App", "Multimodal", "Real-time Tracking", "User Research"],
  },
  {
    title: "TTGT — Real-time Traffic Intelligence",
    role: "Product Owner",
    dateRange: "2019 – Present",
    description:
      "Owned strategy, roadmap, and end-to-end delivery for TTGT, positioning it among the most recognized must-have digital services for HCMC residents. Delivered real-time traffic, congestion, incidents, road restrictions, and camera feeds while supporting authorities with centralized operational data.",
    metrics: ["1M+ downloads", "Citywide traffic coverage", "Centralized operational data"],
    tags: ["Product Strategy", "Smart City", "Real-time Data", "Public Sector", "Scrum"],
  },
  {
    title: "Enterprise & Smart Township Platforms",
    role: "Project Manager",
    dateRange: "2024 – Present",
    description:
      "Delivered AJINOMOTO's Voice of Customer platform for centralized, data-driven feedback management, and Smart Township implementations for NOVA Group and Mapletree — digitizing resident services and township operations through mobile apps, admin portals, access, facility, payment, and service management.",
    metrics: ["End-to-end delivery leadership", "Multi-client rollouts", "Scope · schedule · risk control"],
    tags: ["B2B", "Enterprise Platforms", "Voice of Customer", "Smart Township", "Delivery"],
  },
];

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillsData: SkillGroup[] = [
  { category: "Product Management", skills: ["Product Strategy", "Product Discovery", "Roadmapping", "Product Lifecycle", "Backlog Prioritization", "Requirements Management"] },
  { category: "Delivery & Leadership", skills: ["Project Delivery", "Project Planning", "Project Estimation", "Cross-functional Leadership", "Stakeholder Management", "Agile Delivery", "Scrum"] },
  { category: "Domain Expertise", skills: ["Smart City", "Urban Mobility", "Digital Payments", "Enterprise Platforms", "Public Sector", "AFC Integration"] },
  { category: "Engineering", skills: ["JavaScript", "TypeScript", "Node.js", "Express.js", "ReactJS", "Next.js", "AngularJS", "Vue.js", "HTML/CSS", "Tailwind CSS", "MEAN Stack", "Serverless"] },
  { category: "Databases & APIs", skills: ["MongoDB", "PostgreSQL", "Redis", "REST APIs", "WebSockets", "Firebase"] },
  { category: "Cloud & Integrations", skills: ["AWS Lambda", "Azure Bot", "Google APIs", "Docker", "Kubernetes", "CI/CD", "Microservices", "Payment Gateways", "d3.js"] },
];

export interface Experience {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  highlights?: string[];
  techStack?: string[];
}

export const experienceData: Experience[] = [
  {
    title: "Product Manager · Deputy Head of Metro Solutions",
    subtitle: "FPT IS · Ho Chi Minh City",
    period: "Jan 2023 – Present",
    description: "Leading HCMC Metro's digital product (FPT.Maas) and payment-integration workstreams from requirements and solution design through UAT and go-live.",
    highlights: [
      "Coordinated Metro authorities, banks, card schemes, e-wallets, AFC vendors, engineering, QA, and operations.",
      "Orchestrated integrations with 6+ payment partners — MoMo, ZaloPay, ShopeePay, Vietcombank, Techcombank, Visa, and Mastercard.",
      "Contributed to a Metro ecosystem where 90%+ of passengers choose cashless payment.",
    ],
    techStack: ["Product Management", "Payment Integration", "Stakeholder Management", "AFC"],
  },
  {
    title: "Product Owner",
    subtitle: "FPT IS · Ho Chi Minh City",
    period: "Apr 2019 – Present",
    description: "Owning product strategy, roadmaps, and end-to-end delivery for TTGT, Go!Bus, and HCMC Metro — translating complex public-sector and commuter needs into prioritized backlogs and scalable products.",
    highlights: [
      "Grew TTGT into a must-have HCMC service delivering real-time traffic intelligence, surpassing 1M downloads.",
      "Led Go!Bus multimodal journey planning; Zalo Mini App reached 245,000+ users and 261,000+ visits within 40 days.",
      "Delivered the HCMC Metro HURC app, helping the product exceed 500,000 downloads.",
    ],
    techStack: ["Product Management", "Scrum", "User Research", "Stakeholder Management"],
  },
  {
    title: "Project Manager",
    subtitle: "FPT IS · Ho Chi Minh City",
    period: "Jan 2024 – Present",
    description: "Leading end-to-end delivery of enterprise and smart-township platforms while controlling scope, schedule, risk, dependencies, and change requests.",
    highlights: [
      "Delivered AJINOMOTO's Voice of Customer platform for structured, data-driven service improvement.",
      "Managed Smart Township implementations for NOVA Group and Mapletree, digitizing resident services and operations.",
      "Coordinated cross-functional teams across requirements, design, development, UAT, deployment, and handover.",
    ],
    techStack: ["Project Delivery", "Project Planning", "Enterprise Platforms", "Stakeholder Management"],
  },
  {
    title: "Senior Software Engineer",
    subtitle: "transcosmos technology Vietnam",
    period: "Oct 2017 – Mar 2019",
    description: "Led development of AI chatbot and automation solutions, building reusable serverless components that accelerated new conversational use cases.",
    techStack: ["Node.js", "AngularJS", "ReactJS", "AWS Lambda", "Azure Bot", "Google APIs"],
  },
  {
    title: "Full Stack Engineer",
    subtitle: "Originally US · PTSC M&C · Freelance · FPT Corporation",
    period: "Jul 2014 – Sep 2017",
    description: "Built full-stack, real-time, and internal business applications across smart homes, food delivery, kiosks, urban traffic, ticketing, and production management.",
    highlights: [
      "Led frontend delivery for real-time traffic and ticketing platforms supporting HCMC operations and Vietnam Railways.",
      "Transformed operational data into actionable dashboards using the MEAN stack and d3.js.",
      "Integrated Firebase, OneSignal, and Google Maps APIs.",
    ],
    techStack: ["Node.js", "AngularJS", "Vue.js", "Firebase", "d3.js", "Google Maps API"],
  },
  {
    title: "Quality Control & Software Engineering",
    subtitle: "GNT VN · FPT Software",
    period: "Jan 2012 – Jul 2014",
    description: "Started in software quality and Java development, executing test plans for mobile and web applications and building an educational dictionary application.",
    techStack: ["Manual Testing", "Scrum", "Java", "AJAX", "Android"],
  },
  {
    title: "Bachelor of Engineering — Computer Software Engineering",
    subtitle: "FPT University",
    period: "2009 – 2012",
    description: "Engineering education in computer software at FPT University. Earlier: Le Quy Don High School for the Gifted (2006 – 2009).",
  },
];
