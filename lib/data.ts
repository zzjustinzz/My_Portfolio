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
  appStoreUrl?: string;
  playStoreUrl?: string;
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
    liveUrl: "https://hurc.vn/app",
  },
  {
    title: "Go!Bus — Multimodal Journey Planning",
    role: "Product Owner",
    dateRange: "2019 – Present",
    description:
      "Pioneered multimodal journey planning connecting buses with ride-hailing, river bus, metro, and other public transport across HCMC. Delivered vehicle tracking, arrival-time prediction, route planning, personalized stops, service info, and direct rider feedback to operators.",
    metrics: ["245,000+ Zalo Mini App users", "261,000+ visits in 40 days", "Real-time tracking & ETA prediction"],
    tags: ["Urban Mobility", "Zalo Mini App", "Multimodal", "Real-time Tracking", "User Research"],
    appStoreUrl: "https://apps.apple.com/vn/app/go-bus-tphcm/id1465448216",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.fts.mybus",
  },
  {
    title: "TTGT — Real-time Traffic Intelligence",
    role: "Product Owner",
    dateRange: "2019 – Present",
    description:
      "Owned strategy, roadmap, and end-to-end delivery for TTGT, positioning it among the most recognized must-have digital services for HCMC residents. Delivered real-time traffic, congestion, incidents, road restrictions, and camera feeds while supporting authorities with centralized operational data.",
    metrics: ["1M+ downloads", "Citywide traffic coverage", "Centralized operational data"],
    tags: ["Product Strategy", "Smart City", "Real-time Data", "Public Sector", "Scrum"],
    appStoreUrl: "https://apps.apple.com/vn/app/ttgt-tp-h%E1%BB%93-ch%C3%AD-minh/id1193052114",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.fts.notis",
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

export interface Role {
  title: string;
  period: string;
  location?: string;
  description?: string;
  highlights?: string[];
  skills?: string[];
}

export interface CompanyExperience {
  company: string;
  /** Optional logo in /public (e.g. "/logos/fpt-is.png"). Falls back to the monogram. */
  logo?: string;
  monogram: string;
  employment?: string;
  period: string;
  roles: Role[];
}

export const careerData: CompanyExperience[] = [
  {
    company: "FPT IS",
    logo: "/logos/fpt-is.svg",
    monogram: "FI",
    employment: "Full-time",
    period: "Apr 2019 – Present · 7 yrs 4 mos",
    roles: [
      {
        title: "Product Manager · Deputy Head of Metro Solutions",
        period: "Jan 2023 – Present · 3 yrs 7 mos",
        location: "Ho Chi Minh City, Vietnam",
        description: "Leading HCMC Metro's digital product (FPT.Maas) and payment-integration workstreams from requirements and solution design through UAT and go-live.",
        highlights: [
          "Coordinated Metro authorities, banks, card schemes, e-wallets, AFC vendors, engineering, QA, and operations.",
          "Orchestrated integrations with 6+ payment partners — MoMo, ZaloPay, ShopeePay, Vietcombank, Techcombank, Visa, and Mastercard.",
          "Contributed to a Metro ecosystem where 90%+ of passengers choose cashless payment.",
        ],
        skills: ["Product Management", "Payment Integration", "Stakeholder Management", "AFC"],
      },
      {
        title: "Product Owner",
        period: "Apr 2019 – Present · 7 yrs 4 mos",
        location: "Ho Chi Minh City, Vietnam",
        description: "Owning product strategy, roadmaps, and end-to-end delivery for TTGT, Go!Bus, and HCMC Metro — translating complex public-sector and commuter needs into prioritized backlogs and scalable products.",
        highlights: [
          "Grew TTGT into a must-have HCMC service delivering real-time traffic intelligence, surpassing 1M downloads.",
          "Led Go!Bus multimodal journey planning; Zalo Mini App reached 245,000+ users and 261,000+ visits within 40 days.",
          "Delivered the HCMC Metro HURC app, helping the product exceed 500,000 downloads.",
        ],
        skills: ["Product Management", "Scrum", "User Research", "Stakeholder Management"],
      },
      {
        title: "Project Manager",
        period: "Jan 2024 – Present · 2 yrs 7 mos",
        location: "Ho Chi Minh City, Vietnam",
        description: "Leading end-to-end delivery of enterprise and smart-township platforms while controlling scope, schedule, risk, dependencies, and change requests.",
        highlights: [
          "Delivered AJINOMOTO's Voice of Customer platform for structured, data-driven service improvement.",
          "Managed Smart Township implementations for NOVA Group and Mapletree, digitizing resident services and operations.",
        ],
        skills: ["Project Delivery", "Project Planning", "Enterprise Platforms", "Stakeholder Management"],
      },
    ],
  },
  {
    company: "transcosmos technology Vietnam",
    logo: "/logos/transcosmos-technology.svg",
    monogram: "tc",
    employment: "Full-time",
    period: "Oct 2017 – Mar 2019 · 1 yr 6 mos",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "Oct 2017 – Mar 2019",
        location: "Ho Chi Minh City, Vietnam",
        description: "Led development of AI chatbot and automation solutions, building reusable serverless components that accelerated new conversational use cases across multiple cloud environments.",
        skills: ["Node.js", "AngularJS", "ReactJS", "AWS Lambda", "Azure Bot", "Google APIs"],
      },
    ],
  },
  {
    company: "Originally US — Mobile App Dev, Singapore",
    logo: "/logos/originally-us.png",
    monogram: "OU",
    employment: "Full-time",
    period: "Mar 2017 – Sep 2017 · 7 mos",
    roles: [
      {
        title: "Full Stack Engineer",
        period: "Mar 2017 – Sep 2017",
        location: "Ho Chi Minh City, Vietnam",
        description: "Delivered real-time full-stack products for smart homes, food delivery, and kiosk management, optimizing frontend architecture and performance.",
        skills: ["Firebase", "OneSignal", "Google Maps API", "Node.js", "Vue.js"],
      },
    ],
  },
  {
    company: "PTSC M&C",
    logo: "/logos/ptsc-mc.png",
    monogram: "PT",
    employment: "Full-time",
    period: "Nov 2015 – Feb 2017 · 1 yr 4 mos",
    roles: [
      {
        title: "Full Stack Engineer",
        period: "Nov 2015 – Feb 2017",
        location: "Ba Ria-Vung Tau, Vietnam",
        description: "Digitized business and production workflows through internal management platforms and introduced new technology stacks supporting digital transformation.",
        skills: ["Node.js", "MEAN Stack", "Digital Transformation"],
      },
    ],
  },
  {
    company: "Freelance",
    monogram: "FL",
    employment: "Freelance · Remote",
    period: "Jun 2015 – Jan 2017 · 1 yr 8 mos",
    roles: [
      {
        title: "Full Stack Engineer",
        period: "Jun 2015 – Jan 2017",
        location: "Remote",
        description: "Delivered end-to-end web products for multiple clients — owning database, backend, API, and UI development, and translating requirements into maintainable solutions.",
        skills: ["Node.js", "AngularJS", "Vue.js", "REST APIs"],
      },
    ],
  },
  {
    company: "FPT Corporation",
    logo: "/logos/fpt-corporation.svg",
    monogram: "FC",
    employment: "Full-time",
    period: "Jul 2014 – Oct 2015 · 1 yr 4 mos",
    roles: [
      {
        title: "Full Stack Engineer",
        period: "Jul 2014 – Oct 2015",
        location: "Ho Chi Minh City, Vietnam",
        description: "Led frontend delivery for real-time traffic and ticketing platforms supporting HCMC public-sector operations and Vietnam Railways, turning operational data into actionable dashboards.",
        skills: ["MEAN Stack", "d3.js", "Real-time Dashboards"],
      },
    ],
  },
  {
    company: "GNT VN",
    monogram: "GN",
    logo: "/logos/gnt-vn.jpg",
    employment: "Full-time",
    period: "Aug 2013 – Jul 2014 · 1 yr",
    roles: [
      {
        title: "Quality Control Engineer",
        period: "Aug 2013 – Jul 2014",
        location: "Ho Chi Minh City, Vietnam",
        description: "Strengthened mobile and web product quality through test-case design, manual testing, defect documentation, and close collaboration with developers before release.",
        skills: ["Manual Testing", "Test Design", "Defect Tracking"],
      },
    ],
  },
  {
    company: "FPT Software",
    logo: "/logos/fpt-software.png",
    monogram: "FS",
    employment: "Full-time",
    period: "Jan 2012 – Jul 2013 · 1 yr 7 mos",
    roles: [
      {
        title: "Tester",
        period: "Aug 2012 – Jul 2013",
        location: "Ho Chi Minh City, Vietnam",
        description: "Improved mobile release quality within Scrum teams through structured test planning, execution, and defect tracking.",
        skills: ["Manual Testing", "Scrum", "Android"],
      },
      {
        title: "Java Software Engineer",
        period: "Jan 2012 – Aug 2012",
        location: "Ho Chi Minh City, Vietnam",
        description: "Built an educational dictionary application using Java and AJAX, converting functional requirements into a complete user-facing product.",
        skills: ["Java", "AJAX"],
      },
    ],
  },
];

export interface Education {
  school: string;
  monogram: string;
  logo?: string;
  degree: string;
  period: string;
}

export const educationData: Education[] = [
  {
    school: "FPT University",
    logo: "/logos/fpt-university.png",
    monogram: "FU",
    degree: "Bachelor of Engineering — Computer Software Engineering",
    period: "2009 – 2012",
  },
  {
    school: "Le Quy Don High School for the Gifted",
    monogram: "LQ",
    logo: "/logos/le-quy-don-vung-tau.jpg",
    degree: "High School Diploma",
    period: "2006 – 2009",
  },
];
