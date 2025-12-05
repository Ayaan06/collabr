export type Role = "founder" | "contributor";

export type User = {
  id: string;
  name: string;
  role: Role;
  headline: string;
  bio: string;
  location: string;
  skills: string[];
  interests: string[];
  availability?: "Full-time" | "Part-time" | "Nights/Weekends";
  avatar?: string;
  profileCompletion?: number;
};

export type ProjectStage = "Idea" | "MVP" | "Launched";

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  industry: string;
  stage: ProjectStage;
  location: string;
  remote: boolean;
  neededSkills: string[];
  founder: Pick<User, "id" | "name" | "headline" | "avatar" | "role">;
  interestedCount: number;
  saved?: boolean;
  createdDaysAgo?: number;
  status?: "draft" | "active" | "hiring";
};

export type Conversation = {
  id: string;
  participant: Pick<User, "id" | "name" | "headline" | "avatar" | "role">;
  lastMessage: string;
  unread: boolean;
  timestamp: string;
};

export type Message = {
  id: string;
  conversationId: string;
  from: string;
  text: string;
  timestamp: string;
  direction: "sent" | "received";
};

export type FeatureHighlight = {
  title: string;
  description: string;
  icon: string;
};
