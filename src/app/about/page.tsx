"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Eye, Heart, Brain, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { 
  TeamMember, 
  MissionVisionValue, 
  EcosystemProject, 
  PageContentAPIResponse,
  AboutPageStaticContent
} from '@/lib/types';

// --- THIS IS THE FIX ---
// Client components MUST use NEXT_PUBLIC_
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Icon mapping
const iconMap = {
  rocket: Rocket,
  eye: Eye,
  heart: Heart,
  default: Award,
};

// --- Data Fetching Hooks ---
function useAboutData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}${endpoint}`);
        if (!res.ok) {
          if (res.status === 404) {
            setData(null); // No data is not an error
          } else {
            throw new Error(`Failed to fetch ${endpoint}`);
          }
        } else {
          const json = await res.json();
          setData(Array.isArray(json) ? json : json);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
}

// --- Static Content Hook ---
function useStaticContent() {
  const [data, setData] = useState<AboutPageStaticContent | null>(null);
  useEffect(() => {
    const fetchStatic = async () => {
      try {
        const res = await fetch(`${API_URL}/pages/about`);
        if (res.ok) {
          const json: PageContentAPIResponse<AboutPageStaticContent> = await res.json();
          setData(json.content);
        }
      } catch (e) {
        console.error("Failed to fetch static content", e);
      }
    };
    fetchStatic();
  }, []);
  return data;
}


// --- Component Definitions ---

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.section 
    className={`py-20 ${className}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.section>
);

const MvvCard: React.FC<{ item: MissionVisionValue }> = ({ item }) => {
  const Icon = iconMap[item.icon as keyof typeof iconMap] || iconMap.default;
  return (
    <div className="bg-secondary p-8 rounded-xl border border-gray-700 h-full">
      <Icon className="w-12 h-12 text-primary mb-4" />
      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
      <p className="text-light/70">{item.description}</p>
    </div>
  );
};

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="bg-secondary p-6 rounded-xl border border-gray-700 text-center">
    <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
      {/* Placeholder for image */}
      <Users className="w-12 h-12 text-primary" />
    </div>
    <h3 className="text-xl font-bold">{member.name}</h3>
    <p className="text-primary mb-3">{member.role}</p>
    <p className="text-light/70 text-sm mb-4">{member.bio}</p>
    {member.twitterUrl && (
      <a 
        href={member.twitterUrl ?? undefined} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-light/70 hover:text-primary transition-colors"
      >
        View Twitter
      </a>
    )}
  </div>
);

const EcoCard: React.FC<{ project: EcosystemProject }> = ({ project }) => (
  <a 
    href={project.url ?? undefined} 
    target="_blank" 
    rel="noopener noreferrer"
    className="block bg-secondary p-6 rounded-xl border border-gray-700 hover:border-primary transition-all duration-200"
  >
    <Brain className="w-10 h-10 text-primary mb-4" />
    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
    <p className="text-light/70 text-sm">{project.description}</p>
  </a>
);

// --- The Main Page Component ---
export default function AboutPage() {
  const staticContent = useStaticContent();
  const { data: mvvItems } = useAboutData<MissionVisionValue[]>('/content/mvv');
  const { data: teamMembers } = useAboutData<TeamMember[]>('/team');
  const { data: ecoProjects } = useAboutData<EcosystemProject[]>('/content/ecosystem-projects');

  return (
    <div className="bg-dark">
      {/* 1. Page Header */}
      <header className="py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          {staticContent?.header?.title || 'About OwlphaDAO'}
        </h1>
        <p className="text-xl md:text-2xl text-light/70 max-w-2xl mx-auto">
          {staticContent?.header?.subtitle || 'Our mission, our vision, and the people building it.'}
        </p>
      </header>

      {/* 2. The Owlpha Story */}
      <Section className="bg-bg-panel border-y border-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            {staticContent?.story?.title || 'The Owlpha Story'}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            {staticContent?.story?.text || 'Our story begins with...'}
          </p>
        </div>
      </Section>

      {/* 3. Mission, Vision, Values */}
      {mvvItems && mvvItems.length > 0 && (
        <Section>
          <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {mvvItems.map(item => <MvvCard key={item.id} item={item} />)}
          </div>
        </Section>
      )}

      {/* 4. The Ecosystem Snapshot (Internal) */}
      {ecoProjects && ecoProjects.length > 0 && (
        <Section className="bg-bg-panel border-y border-secondary">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our Ecosystem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ecoProjects.map(project => <EcoCard key={project.id} project={project} />)}
            </div>
          </div>
        </Section>
      )}

      {/* 5. The Team & Contributors */}
      {teamMembers && teamMembers.length > 0 && (
        <Section>
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              The People Behind the DAO
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {teamMembers.map(member => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <TeamCard member={member} />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}
      
      {/* 6. Governance Overview */}
      <Section className="bg-bg-panel border-t border-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            {staticContent?.governance?.title || 'Governance & Structure'}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {staticContent?.governance?.text || 'Our governance structure is...'}
          </p>
        </div>
      </Section>

      {/* 7. Links to other pages */}
      <Section>
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/roadmap" className="block p-8 rounded-xl bg-secondary hover:border-primary border border-transparent transition-colors">
            <h3 className="text-3xl font-bold mb-3">View Our Roadmap</h3>
            <p className="text-light/70">See what we've accomplished and what's coming next.</p>
          </Link>
          <Link href="/ecosystem" className="block p-8 rounded-xl bg-secondary hover:border-primary border border-transparent transition-colors">
            <h3 className="text-3xl font-bold mb-3">Explore Our Partners</h3>
            <p className="text-light/70">Discover the partners and collaborators in our ecosystem.</p>
          </Link>
        </div>
      </Section>

      {/* 8. Call to Action */}
      <Section className="bg-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Movement</h2>
          <p className="text-lg text-light/70 mb-8">
            Become a part of the OwlphaDAO community.
          </p>
          <a
            href="https://discord.gg/Z9U2bMWH36" // From your config
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-lg bg-primary text-dark text-lg font-semibold hover:bg-primary/80 transition-colors"
          >
            Join Our Discord
          </a>
        </div>
      </Section>
    </div>
  );
}