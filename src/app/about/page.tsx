"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Eye,
  Target,
  Heart,
  Briefcase,
  Share2,
  Twitter,
  Linkedin,
  Rocket,
  ArrowUpRight,
} from 'lucide-react';
import {
  TeamMember,
  MissionVisionValue,
  EcosystemProject,
  PageContentAPIResponse,
  AboutPageStaticContent,
} from '@/lib/types';
import Link from 'next/link';

// Helper function to get an icon component
const getIcon = (iconName: string | null) => {
  switch (iconName) {
    case 'rocket':
      return <Rocket className="h-8 w-8 text-primary" />;
    case 'eye':
      return <Eye className="h-8 w-8 text-primary" />;
    case 'heart':
      return <Heart className="h-8 w-8 text-primary" />;
    default:
      return <Target className="h-8 w-8 text-primary" />;
  }
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// --- Page Component ---
export default function AboutPage() {
  // Create state for all our dynamic content
  const [staticContent, setStaticContent] =
    useState<AboutPageStaticContent | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [mvvItems, setMvvItems] = useState<MissionVisionValue[]>([]);
  const [ecoProjects, setEcoProjects] = useState<EcosystemProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const [
          staticRes,
          teamRes,
          mvvRes,
          ecoRes
        ] = await Promise.all([
          // 1. Fetch static page content
          fetch(`${process.env.API_URL}/pages/about`, { cache: 'no-store' }),
          // 2. Fetch team members
          fetch(`${process.env.API_URL}/team`, { cache: 'no-store' }),
          // 3. Fetch Mission/Vision/Values
          fetch(`${process.env.API_URL}/content/mvv`, { cache: 'no-store' }),
          // 4. Fetch internal ecosystem projects
          fetch(`${process.env.API_URL}/content/ecosystem-projects`, { cache: 'no-store' }),
        ]);

        // Parse JSON for all successful requests
        if (staticRes.ok) {
          const staticData: PageContentAPIResponse<AboutPageStaticContent> = await staticRes.json();
          setStaticContent(staticData.content);
        }
        if (teamRes.ok) setTeamMembers(await teamRes.json());
        if (mvvRes.ok) setMvvItems(await mvvRes.json());
        if (ecoRes.ok) setEcoProjects(await ecoRes.json());

      } catch (error) {
        console.error("Failed to fetch 'About' page data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Loading About...</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12 overflow-hidden">
      {/* 1. Page Header (from PageContent) */}
      <motion.section
        className="text-center py-8 sm:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {staticContent?.header?.title || 'About OwlphaDAO'}
        </h1>
        <p className="text-base sm:text-xl text-light/70 max-w-3xl mx-auto">
          {staticContent?.header?.subtitle || "Our mission, our vision, and the people building it."}
        </p>
      </motion.section>

      {/* 2. Mission, Vision, Values (Dynamic) */}
      <motion.section
        className="py-8 sm:py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mvvItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-secondary border border-secondary rounded-xl p-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4 mb-4">
                {getIcon(item.icon)}
                <h2 className="text-2xl font-bold text-white">{item.title}</h2>
              </div>
              <p className="text-light/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. The Owlpha Story (from PageContent) */}
      <motion.section
        className="py-8 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-6">
            {staticContent?.story?.title || 'The Owlpha Story'}
          </h2>
          <p className="text-base sm:text-lg text-light/70 leading-relaxed">
            {staticContent?.story?.text || 'The story of our origin...'}
          </p>
        </div>
        <div className="bg-secondary border border-secondary rounded-xl h-80 flex items-center justify-center">
          <p className="text-light/70">[Story Image/Video Placeholder]</p>
        </div>
      </motion.section>

      {/* 4. The Team & Contributors (Dynamic) */}
      <section className="py-8 sm:py-16">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white text-center mb-8 sm:mb-12">
          The People Behind the DAO
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="bg-secondary border border-secondary rounded-xl text-center p-6"
              variants={itemVariants}
            >
              <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-light/70" />
                {/* Image placeholder: <img src={member.imageUrl} /> */}
              </div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
              <p className="text-light/70 text-sm mt-2">{member.bio}</p>
              <div className="flex justify-center gap-4 mt-4">
                {member.twitterUrl && (
                  <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-light/70 hover:text-light">
                    <Twitter />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-light/70 hover:text-light">
                    <Linkedin />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Ecosystem Snapshot (Dynamic) */}
      <section className="py-8 sm:py-16">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white text-center mb-8 sm:mb-12">
          Our Internal Ecosystem
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {ecoProjects.map((project) => (
            <motion.a
              key={project.id}
              href={project.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary border border-secondary rounded-xl p-6 flex items-center gap-6 hover:border-primary transition-colors"
              variants={itemVariants}
            >
              <div className="bg-secondary p-3 rounded-lg">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                <p className="text-light/70">{project.description}</p>
              </div>
              {project.url && <ArrowUpRight className="w-5 h-5 text-light/70 ml-auto shrink-0" />}
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* 6. Governance (from PageContent) */}
      <motion.section
        className="py-8 sm:py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-6">
          {staticContent?.governance?.title || 'Governance & Structure'}
        </h2>
        <p className="text-base sm:text-lg text-light/70 leading-relaxed max-w-3xl mx-auto">
          {staticContent?.governance?.text || 'Our governance structure is...'}
        </p> {/* 👈 THIS WAS THE BROKEN LINE */}
      </motion.section>

      {/* 7. Links to other pages */}
      <section className="py-8 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/roadmap" className="block p-6 sm:p-8 bg-secondary rounded-xl border border-secondary hover:border-primary transition-colors">
          <h3 className="text-2xl font-bold text-white mb-2">Our Roadmap</h3>
          <p className="text-light/70">See what we've accomplished and what's coming next.</p>
        </Link>
        <Link href="/ecosystem" className="block p-6 sm:p-8 bg-secondary rounded-xl border border-secondary hover:border-primary transition-colors">
          <h3 className="text-2xl font-bold text-white mb-2">Our Partners</h3>
          <p className="text-light/70">Explore the external partners and collaborators in our ecosystem.</p>
        </Link>
      </section>
    </main>
  );
}