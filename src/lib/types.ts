// src/lib/types.ts
export type HeroContent = {
  title: string;
  subtitle: string;
};

export type AboutSectionContent = {
  title: string;
  text: string;
};

// This matches the JSON `content` blob in your PageContent model
export type HomePageContent = {
  hero: HeroContent;
  aboutSection: AboutSectionContent;
};

// NEW: Define the shape of the "About" page's static content
export type AboutPageStaticContent = {
  header: {
    title: string;
    subtitle: string;
  };
  story: {
    title: string;
    text: string;
  };
  governance: {
    title: string;
    text: string;
  };
};

// This matches the full API response from /api/pages/:slug
export type PageContentAPIResponse<T> = {
  id: string;
  pageSlug: string;
  content: T; // This is now a generic type
  updatedAt: string;
};

// --- Blog Types ---
export type PostAuthor = {
  id: string;
  email: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: PostAuthor;
};

// --- Roadmap Types ---
export type MilestoneStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';

export type RoadmapMilestone = {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  date: string;
  createdAt: string;
};

// --- Partner Types ---
export type Partner = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string | null;
  description: string | null;
  order: number;
};

// --- Stats Types ---
export type SiteStats = {
  totalAdcSupply: number;
  collectionCount: number;
};

// --- NEW: About Page Dynamic Types ---

// For the "People Behind the DAO" section
export type TeamMember = {
  id: string;
  name: string;
  role: string; // e.g., "Core Developer", "Community Lead"
  imageUrl: string | null;
  bio: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  order: number;
};

// For the "Mission, Vision, and Values" cards
export type MvvType = 'MISSION' | 'VISION' | 'VALUE';

export type MissionVisionValue = {
  id: string;
  type: MvvType;
  title: string;
  description: string;
  icon: string | null;
};

// For the "Ecosystem Snapshot" (INTERNAL projects)
export type EcosystemProject = {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  url: string | null;
};

// For the "Community" page resource links
export type CommunityLink = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  icon: string | null;
  order: number;
};