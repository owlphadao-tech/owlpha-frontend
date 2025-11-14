"use client"; // We'll make this a client component for simple hover effects

import { motion } from 'framer-motion';
import { Users, Twitter, LayoutGrid, CircleDollarSign, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// --- Reusable Link Card Component ---
type LinkCardProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

function LinkCard({ href, icon, title, description }: LinkCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 bg-secondary rounded-xl border border-secondary hover:border-primary hover:-translate-y-1 transition-transform transition-colors duration-200 shadow-md group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="flex items-start gap-4">
        <div className="bg-secondary p-3 rounded-lg text-primary group-hover:text-light transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-light mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-400">{description}</p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-light/70 ml-auto shrink-0" />
      </div>
    </motion.a>
  );
}

// --- The Main Page Component ---
export default function CommunityPage() {
  return (
    <main className="container mx-auto max-w-4xl p-8">
      <motion.section
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Join the Movement
        </h1>
        <p className="text-xl text-light/70 max-w-3xl mx-auto">
          OwlphaDAO is built by its community. Here's how you can get involved,
          connect with members, and start building.
        </p>
      </motion.section>

      {/* --- Key Links Section --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        <LinkCard
          href="https://discord.gg/Z9U2bMWH36"
          icon={<Users className="w-6 h-6" />}
          title="Join our Discord"
          description="The heart of our community. Chat, build, and vote."
        />
        <LinkCard
          href="https://x.com/OwlphaDAO_"
          icon={<Twitter className="w-6 h-6" />}
          title="Follow on X"
          description="Get the latest official news, updates, and announcements."
        />
        <LinkCard
          href="https://www.nftstake.app/owlphadao"
          icon={<LayoutGrid className="w-6 h-6" />}
          title="NFT Staking"
          description="Stake your 'The Owl Man' NFT to earn rewards."
        />
        <LinkCard
          href="https://stake.smithii.io/owlphadaotoken"
          icon={<CircleDollarSign className="w-6 h-6" />}
          title="$ADC Token Staking"
          description="Stake your $ADC tokens to secure the network."
        />
      </section>

      {/* --- Governance (Coming Soon) Section --- */}
      <motion.section
        className="py-16 text-center bg-gray-900 border border-gray-700 rounded-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold text-white mb-6">
          DAO Governance
        </h2>
        <p className="text-lg text-light/70 leading-relaxed max-w-2xl mx-auto mb-8">
          Our on-chain voting system is in development. Soon, you'll be able to
          use your $ADC and NFTs to create proposals and vote on the future of
          the DAO.
        </p>
        <button
          disabled
          className="px-8 py-3 rounded-lg text-lg font-semibold bg-secondary text-light/70 cursor-not-allowed"
        >
          Governance Portal (Coming Soon)
        </button>
      </motion.section>
    </main>
  );
}