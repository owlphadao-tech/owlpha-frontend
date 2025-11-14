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
};

// This is the new, more complex type for the About page's static content
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

// This is a generic API response type.
// We can use it for <HomePageContent> or <AboutPageStaticContent>
export type PageContentAPIResponse<T> = {
  id: string;
  pageSlug: string;
  content: T; // The flexible JSON content
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
  content: string; // The full post content
  published: boolean;
  createdAt: string; // This will be an ISO date string
  updatedAt: string;
  authorId: string;
  author?: PostAuthor; // Author is optional
};

// --- Site Stats Types ---

export type SiteStats = {
  // We removed totalNftStaked because the API call was failing
  totalAdcSupply: number;
  collectionCount: number;
};

// --- "About" Page Dynamic Content Types ---

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  imageUrl: string | null;
  // videoUrl has been REMOVED
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

// --- "Community" Page Dynamic Content Types ---

export type CommunityLink = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
};