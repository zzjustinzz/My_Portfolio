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
    title: "Urban Mobility Platforms — TTGT, GoBus & HCMC Metro",
    role: "Product Owner",
    dateRange: "2019 – Present",
    description:
      "Owned the discovery, delivery, and continuous improvement of digital platforms serving urban transportation in Ho Chi Minh City. Worked closely with public-sector stakeholders, user research teams, engineers, and delivery partners.",
    metrics: ["End-to-end product ownership", "Public-sector stakeholders", "Cross-functional delivery"],
    tags: ["Product Strategy", "Product Discovery", "Scrum", "User Research", "Smart City"],
  },
  {
    title: "Integrated Digital Payments",
    role: "Product Owner",
    dateRange: "2019 – Present",
    description:
      "Led cross-functional initiatives integrating payment gateways and financial partners into digital services, coordinating product requirements across business, technology, and external partner teams.",
    metrics: ["7 major payment partners", "Multi-party coordination", "Platform integration"],
    tags: ["MoMo", "ZaloPay", "ShopeePay", "Vietcombank", "VISA", "Mastercard"],
  },
  {
    title: "Enterprise Platforms for AJINOMOTO",
    role: "Product Manager",
    dateRange: "FPT IS",
    description:
      "Managed enterprise platform initiatives tailored to large-scale client needs, translating business requirements into product direction while ensuring alignment with operational needs and industry standards.",
    metrics: ["Enterprise product management", "Business alignment", "Stakeholder leadership"],
    tags: ["B2B", "Enterprise Platforms", "Requirements", "Roadmapping", "Delivery"],
  },
];

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillsData: SkillGroup[] = [
  { category: "Product Management", skills: ["Product Strategy", "Product Discovery", "Roadmapping", "Product Lifecycle", "Requirements Management"] },
  { category: "Leadership & Delivery", skills: ["Product Leadership", "Cross-functional Leadership", "Stakeholder Management", "Agile Delivery", "Scrum"] },
  { category: "Domain Expertise", skills: ["Smart City", "Urban Mobility", "Digital Payments", "Enterprise Platforms", "Public Sector"] },
  { category: "Engineering", skills: ["Node.js", "ReactJS", "AngularJS", "Vue.js", "Java", "REST APIs"] },
  { category: "Cloud & Integrations", skills: ["AWS", "Azure Bot", "Firebase", "Google APIs", "Payment Gateways", "Serverless"] },
  { category: "Quality & Ways of Working", skills: ["User Research", "Manual Testing", "Test Planning", "Defect Tracking", "Clean Architecture"] },
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
    title: "Product Owner",
    subtitle: "FPT IS · Ho Chi Minh City",
    period: "Apr 2019 – Present",
    description: "Leading digital products for urban mobility, public-sector services, payments, and enterprise clients from discovery through delivery.",
    highlights: ["Owned TTGT, GoBus, and HCMC Metro product initiatives.", "Coordinated integrations with MoMo, ZaloPay, ShopeePay, Vietcombank, VISA, and Mastercard.", "Managed enterprise platform initiatives for AJINOMOTO."],
    techStack: ["Product Management", "Scrum", "User Research", "Stakeholder Management"],
  },
  {
    title: "Senior Software Engineer",
    subtitle: "transcosmos technology Vietnam",
    period: "Oct 2017 – Mar 2019",
    description: "Developed intelligent chatbot and automation systems for internal operations and customer support, collaborating across teams to deliver scalable services.",
    techStack: ["Node.js", "AngularJS", "ReactJS", "AWS Lambda", "Azure Bot", "Google APIs"],
  },
  {
    title: "Full Stack Engineer",
    subtitle: "Originally US · PTSC M&C · Freelance · FPT Corporation",
    period: "Jul 2014 – Sep 2017",
    description: "Built full-stack, real-time, and internal business applications across smart homes, food delivery, kiosks, urban traffic, ticketing, and production management.",
    highlights: ["Delivered traffic and ticketing monitoring platforms for Ho Chi Minh City and Vietnam Railways.", "Built real-time dashboards and visualizations with the MEAN stack and d3.js.", "Integrated Firebase, OneSignal, and Google Maps APIs."],
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
    description: "Engineering education in computer software at FPT University.",
  },
];
