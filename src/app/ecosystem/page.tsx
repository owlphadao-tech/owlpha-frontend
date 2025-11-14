// src/app/ecosystem/page.tsx
import { Partner } from '@/lib/types';
import Link from 'next/link';

// Data fetching function
async function getPartners(): Promise<Partner[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/partners`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    
    return await res.json();

  } catch (error) {
    console.error('Error fetching partners:', error);
    return []; // Return an empty array on error
  }
}

// A reusable Partner Card component for this page
function PartnerCard({ partner }: { partner: Partner }) {
  const content = (
    <>
      <div className="w-full h-32 bg-secondary rounded-t-lg flex items-center justify-center">
        <span className="text-light/70">{partner.logoUrl}</span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-1">{partner.name}</h3>
        {partner.description && (
          <p className="text-primary mt-2">{partner.description}</p>
        )}
      </div>
    </>
  );

  // If a websiteUrl exists, make the whole card a link
  if (partner.websiteUrl) {
    return (
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-dark rounded-xl border border-secondary hover:border-primary hover:-translate-y-1 transition-all duration-200 shadow-md"
      >
        {content}
      </a>
    );
  }
  // Otherwise, just render a static div
  return (
    <div className="bg-dark rounded-xl border border-secondary shadow-md">
      {content}
    </div>
  );
}


// The main page component
export default async function EcosystemPage() {
  const partners = await getPartners();

  return (
    <main className="container mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center mb-8 sm:mb-12">
        Our Ecosystem & Partners
      </h1>

      {partners.length === 0 ? (
        <p className="text-center text-light/70">
          Partner information is not available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      )}
    </main>
  );
}