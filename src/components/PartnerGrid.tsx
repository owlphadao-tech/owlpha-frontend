// src/components/PartnerGrid.tsx
"use client"; // This is critical for animations

import { Partner } from "@/lib/types";
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import motion

// --- We are moving the PartnerCard from the page into this file ---

function PartnerCard({ partner }: { partner: Partner }) {
  const content = (
    <>
      <div className="w-full h-32 bg-gray-800 rounded-t-lg flex items-center justify-center">
        <span className="text-gray-500">{partner.logoUrl}</span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{partner.name}</h3>
        {partner.description && (
          <p className="text-gray-400 mt-2">{partner.description}</p>
        )}
      </div>
    </>
  );

  if (partner.websiteUrl) {
    return (
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
      >
        {content}
      </a>
    );
  }
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700">
      {content}
    </div>
  );
}

// --- This is our new Animated Grid component ---

type PartnerGridProps = {
  partners: Partner[];
};

// This defines the animation for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This makes cards appear one after another
    },
  },
};

// This defines the animation for each card
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function PartnerGrid({ partners }: PartnerGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {partners.map((partner) => (
        // Each card is now a motion.div
        <motion.div key={partner.id} variants={cardVariants}>
          <PartnerCard partner={partner} />
        </motion.div>
      ))}
    </motion.div>
  );
}