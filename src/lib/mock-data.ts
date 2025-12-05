import type {
  Conversation,
  FeatureHighlight,
  Message,
  Project,
  ProjectStage,
  Role,
  User,
} from "@/types";

export const industries = [
  "Fintech",
  "AI",
  "Climate",
  "SaaS",
  "Marketplace",
  "Health",
  "Social",
];

export const stages: ProjectStage[] = ["Idea", "MVP", "Launched"];

export const currentUser: User = {
  id: "me",
  name: "Avery Chen",
  role: "founder",
  headline: "Building an AI-native project ops platform",
  bio: "Ex-product at a YC SaaS, now shipping an async collaboration tool for global teams.",
  location: "Remote · SF",
  skills: ["Product", "Strategy", "Leadership"],
  interests: ["AI", "Future of Work", "SaaS"],
  avatar: "",
  profileCompletion: 82,
};

export const secondaryUser: User = {
  id: "me-contributor",
  name: "Riley Novak",
  role: "contributor",
  headline: "Full-stack engineer who loves shipping MVPs",
  bio: "I prototype fast with Next.js, ship quality UX, and care about outcomes.",
  location: "Remote · Berlin",
  skills: ["React", "TypeScript", "UI/UX"],
  interests: ["DevTools", "SaaS", "Marketplaces"],
  availability: "Nights/Weekends",
  profileCompletion: 76,
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Nebula Ops",
    description: "AI-driven project board that matches tasks to contributor strengths.",
    longDescription:
      "Nebula Ops is building a lightweight operating layer for async teams. We want to combine an intelligent task router with a contributor marketplace. The focus is speed: ship weekly, gather feedback daily, and keep everyone aligned with ambient updates.",
    industry: "AI",
    stage: "MVP",
    location: "Remote",
    remote: true,
    neededSkills: ["Next.js", "Product Design", "LLMs"],
    founder: {
      id: "u1",
      name: "Avery Chen",
      headline: "Product, previously YC W21",
      avatar: "",
      role: "founder",
    },
    interestedCount: 8,
    createdDaysAgo: 6,
    status: "active",
  },
  {
    id: "p2",
    title: "Waveform Finance",
    description: "Consumer-friendly fintech app for shared budgets and goals.",
    longDescription:
      "Waveform lets households and teams plan finances together without spreadsheets. We need help refining the onboarding, data integrations, and mobile polish. We ship in two-week sprints with clear scopes.",
    industry: "Fintech",
    stage: "Launched",
    location: "Hybrid · NYC",
    remote: false,
    neededSkills: ["React Native", "Product Design", "Growth"],
    founder: {
      id: "u2",
      name: "Nina Patel",
      headline: "Fintech founder, ex-Robinhood PM",
      avatar: "",
      role: "founder",
    },
    interestedCount: 15,
    createdDaysAgo: 14,
    status: "hiring",
  },
  {
    id: "p3",
    title: "Arcadia Climate",
    description: "Marketplace connecting climate researchers with field operators.",
    longDescription:
      "Arcadia is a curated network for climate adaptation projects. We need to design better contributor profiles, experiment with matching signals, and pilot a messaging flow that builds trust quickly.",
    industry: "Climate",
    stage: "Idea",
    location: "Remote · EU friendly",
    remote: true,
    neededSkills: ["Data Viz", "UX Research", "Partnerships"],
    founder: {
      id: "u3",
      name: "Diego Martinez",
      headline: "Climate ops, ex-UN field lead",
      avatar: "",
      role: "founder",
    },
    interestedCount: 4,
    createdDaysAgo: 3,
    status: "draft",
  },
  {
    id: "p4",
    title: "Lumen Health",
    description: "Personal health copilot that tracks trends and flags anomalies.",
    longDescription:
      "We aggregate wearable and lab data to produce a simple health story. Looking for contributors to refine the insights feed, add sharing, and test with early cohorts.",
    industry: "Health",
    stage: "MVP",
    location: "Remote",
    remote: true,
    neededSkills: ["Data Science", "React", "Content"],
    founder: {
      id: "u4",
      name: "Maya Singh",
      headline: "Doctor turned builder",
      avatar: "",
      role: "founder",
    },
    interestedCount: 12,
    createdDaysAgo: 9,
    status: "active",
  },
  {
    id: "p5",
    title: "Pulseboard",
    description: "Real-time dashboard for hardware startups to monitor installs.",
    longDescription:
      "Pulseboard helps hardware teams see device health, firmware status, and alerts in one place. We want a sleek UI, edge-friendly data pipeline, and a stronger notifications layer.",
    industry: "SaaS",
    stage: "MVP",
    location: "Remote · PST overlap",
    remote: true,
    neededSkills: ["Next.js", "GraphQL", "Product Design"],
    founder: {
      id: "u5",
      name: "Leo Carter",
      headline: "CTO, previously Stripe",
      avatar: "",
      role: "founder",
    },
    interestedCount: 6,
    createdDaysAgo: 1,
    status: "active",
  },
];

export const contributors: User[] = [
  {
    id: "c1",
    name: "Riley Novak",
    role: "contributor",
    headline: "Full-stack engineer into AI + product",
    bio: "I prototype fast with Next.js, Storybook, and ship thoughtful UX.",
    location: "Remote · Berlin",
    skills: ["Next.js", "TypeScript", "Design Systems"],
    interests: ["AI", "Productivity", "Marketplaces"],
    availability: "Nights/Weekends",
  },
  {
    id: "c2",
    name: "Priya Desai",
    role: "contributor",
    headline: "Product designer focused on clarity",
    bio: "I craft clean UX for complex tools. Led design at a Series A fintech.",
    location: "Remote · NYC",
    skills: ["Product Design", "UX Research", "Prototyping"],
    interests: ["Fintech", "Health", "DevTools"],
    availability: "Part-time",
  },
  {
    id: "c3",
    name: "Malik Green",
    role: "contributor",
    headline: "Backend + infra with an eye for DX",
    bio: "Built data pipelines and APIs for climate and mobility startups.",
    location: "Remote · Austin",
    skills: ["Node.js", "GraphQL", "Data Pipelines"],
    interests: ["Climate", "Mobility", "SaaS"],
    availability: "Full-time",
  },
  {
    id: "c4",
    name: "Sofia Petrova",
    role: "contributor",
    headline: "Mobile engineer shipping polished apps",
    bio: "React Native and SwiftUI experience. Obsessed with smooth interactions.",
    location: "Hybrid · Toronto",
    skills: ["React Native", "Motion Design", "SwiftUI"],
    interests: ["Health", "Social", "Productivity"],
    availability: "Part-time",
  },
];

export const conversations: Conversation[] = [
  {
    id: "conv1",
    participant: contributors[0],
    lastMessage: "Here’s a quick Loom of the interaction prototype.",
    unread: true,
    timestamp: "2h ago",
  },
  {
    id: "conv2",
    participant: contributors[1],
    lastMessage: "I’m available next week to iterate on onboarding.",
    unread: false,
    timestamp: "1d ago",
  },
  {
    id: "conv3",
    participant: contributors[2],
    lastMessage: "Shared notes on the data model.",
    unread: false,
    timestamp: "3d ago",
  },
];

export const messages: Message[] = [
  {
    id: "m1",
    conversationId: "conv1",
    from: "c1",
    text: "Hey! I mocked up a version of the matching screen—want to see a Loom?",
    timestamp: "10:21 AM",
    direction: "received",
  },
  {
    id: "m2",
    conversationId: "conv1",
    from: "me",
    text: "Yes please, sharing the latest brief here too.",
    timestamp: "10:24 AM",
    direction: "sent",
  },
  {
    id: "m3",
    conversationId: "conv2",
    from: "c2",
    text: "Onboarding feels long—could we combine steps?",
    timestamp: "Yesterday",
    direction: "received",
  },
  {
    id: "m4",
    conversationId: "conv2",
    from: "me",
    text: "Agreed. Let’s reduce to 3 inputs and push optional later.",
    timestamp: "Yesterday",
    direction: "sent",
  },
];

export const featureHighlights: FeatureHighlight[] = [
  {
    title: "Smart matching",
    description: "Signals from skills, availability, and momentum to pair the right people.",
    icon: "Sparkles",
  },
  {
    title: "Message fast",
    description: "DMs and async threads designed for founders who move quickly.",
    icon: "MessageCircle",
  },
  {
    title: "Project board",
    description: "Glanceable health, contributor interest, and next sprint focus.",
    icon: "Kanban",
  },
  {
    title: "Pulse alerts",
    description: "Stay ahead with pings for applicants, replies, and milestones.",
    icon: "Bell",
  },
];

export const logos = ["Aurora Labs", "Northwind", "ProtoOne", "Sierra", "Flux", "Moneta"];

export const testimonials = [
  {
    name: "Jordan Lee",
    role: "Founder, Flux",
    quote: "We found a designer and two engineers in a week. Shipping velocity doubled.",
  },
  {
    name: "Tessa Roland",
    role: "Contributor",
    quote: "Clear briefs, fast feedback, and a community that wants to build.",
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function getMessagesForConversation(id: string) {
  return messages.filter((message) => message.conversationId === id);
}

export function mockRole(role: Role) {
  return role === "founder" ? currentUser : secondaryUser;
}
