// This matches the JSON `content` blob in your PageContent model
export type HomePageContent = {
  hero: {
    title: string;
    subtitle: string;
  };
  aboutSection: {
    title: string;
    text: string;
  };
  // We can add more sections here as needed
};

// --- ABOUT PAGE STATIC CONTENT ---
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

// Generic API response for PageContent
export type PageContentAPIResponse<T> = {
  id: string;
  pageSlug: string;
  content: T; // The flexible JSON content
  updatedAt: string;
};

// --- BLOG ---
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
  author?: PostAuthor; // Made optional to prevent crashes
};

// --- STATS ---
export type SiteStats = {
  totalAdcSupply: number;
  collectionCount: number;
};

// --- ROADMAP ---
export type MilestoneStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';

export type RoadmapMilestone = {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  date: string;
  createdAt: string;
};

// --- PARTNERS (External) ---
export type Partner = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string | null;
  description: string | null;
  order: number;
};

// --- NEW "ABOUT" PAGE MODELS ---

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  imageUrl: string | null;
  // videoUrl is removed
  twitterUrl: string | null;
  order: number;
};

export type MissionVisionValue = {
  id: string;
  type: 'MISSION' | 'VISION' | 'VALUE';
  title: string;
  description: string;
  icon: string;
};

export type EcosystemProject = {
  id: string;
  name: string;
  description: string;
  url: string | null;
  icon: string | null;
};

export type CommunityLink = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string | null;
};