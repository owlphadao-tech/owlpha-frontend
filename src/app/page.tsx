// src/app/page.tsx
import type { PageContentAPIResponse, HomePageContent, SiteStats } from '@/lib/types'; // No change here

// --- Data Fetching Function 1 ---
async function getHomepageContent(): Promise<HomePageContent | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/pages/homepage`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    
    // --- THIS IS THE FIX ---
    // We must now tell the generic type what kind of content we expect.
    const data: PageContentAPIResponse<HomePageContent> = await res.json();
    // ---------------------

    return data.content;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return null;
  }
}

// --- Data Fetching Function 2 ---
async function getStats(): Promise<SiteStats | null> {
// ... (this function is fine, no changes)
  try {
    const res = await fetch(`${process.env.API_URL}/stats`, {
      cache: 'no-store', // We use no-store to always get fresh data
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch stats: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

// --- Stat Card Component ---
// ... (this component is fine, no changes)
function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-dark border border-secondary rounded-xl p-6 text-center">
      <p className="text-sm font-medium text-primary uppercase tracking-wider">
        {title}
      </p>
      <p className="text-4xl font-extrabold text-white mt-2">
        {typeof value === 'number' ? value.toLocaleString('en-US') : value}
      </p>
    </div>
  );
}


export default async function Home() {
  // ... (this function is fine, no changes)
  // Fetch both data sources in parallel
  const [content, stats] = await Promise.all([
    getHomepageContent(),
    getStats(),
  ]);

  // Show a loading/error state if content isn't there
  if (!content) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Error</h1>
        <p className="mt-4 text-lg text-red-400">
          Could not load homepage content.
        </p>
      </main>
    );
  }

  // We have data! Render the content from the API.
  return (
    <main className="flex min-h-screen flex-col items-center py-10 sm:py-24 px-4 sm:px-8 md:px-24">
      
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
          {content.hero.title}
        </h1>
        <p className="mt-4 text-lg sm:text-2xl text-light/70">
          {content.hero.subtitle}
        </p>
      </section>

      {/* --- Live Stats Section (Fixed) --- */}
      {stats && (
        <section className="w-full max-w-5xl mx-auto my-12 sm:my-24">
          {/* We now show a 2-column grid, not 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* This card for "Total NFT Staked" has been REMOVED 
              because we cannot get the data.
            */}
            
            <StatCard 
              title="Total $ADC Supply" // Updated title
              value={stats.totalAdcSupply} 
            />
            <StatCard 
              title="Collection Size" 
              value={stats.collectionCount} 
            />
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="max-w-2xl text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white">
          {content.aboutSection.title}
        </h2>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-light/70">
          {content.aboutSection.text}
        </p>
      </section>

    </main>
  );
}