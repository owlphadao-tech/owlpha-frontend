// src/app/roadmap/page.tsx
import { RoadmapMilestone } from '@/lib/types';
import { motion } from 'framer-motion';

// Data fetching function
async function getRoadmap(): Promise<RoadmapMilestone[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/roadmap`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    
    return await res.json();

  } catch (error)
 {
    console.error('Error fetching roadmap:', error);
    return []; // Return an empty array on error
  }
}

// A simple component to display the status
function StatusBadge({ status }: { status: RoadmapMilestone['status'] }) {
  switch (status) {
    case 'COMPLETED':
      return <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">{status}</span>;
    case 'IN_PROGRESS':
      return <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300">{status}</span>;
    case 'PLANNED':
      return <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-light/70">{status}</span>;
  }
}

// The main page component
export default async function RoadmapPage() {
  const milestones = await getRoadmap();

  return (
    <main className="container mx-auto max-w-4xl px-4 sm:px-8 md:px-24 py-8 sm:py-16">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center mb-8 sm:mb-12">
        Our Roadmap
      </h1>

      {milestones.length === 0 ? (
        <p className="text-center text-light/70">
          Roadmap details are not available yet.
        </p>
      ) : (
        <div className="relative py-8 sm:py-16">
          {/* Central vertical timeline */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-secondary z-0" />

          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            const alignClass = isEven
              ? "md:self-start md:items-end pr-8 md:pr-16"
              : "md:self-end md:items-start pl-8 md:pl-16";
            const motionDir = isEven ? -100 : 100;
            return (
              <motion.div
                key={milestone.id}
                className={`relative flex flex-col w-full md:w-1/2 ${alignClass} group mb-12 md:mb-16 z-10`}
                initial={{ opacity: 0, x: motionDir }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, type: "spring", damping: 20, stiffness: 120 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                {/* Dot on timeline */}
                <div
                  className="absolute left-1/2 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-dark z-20 shadow-md"
                />
                {/* Milestone card */}
                <div className={
                  `bg-secondary border border-secondary rounded-xl p-6 shadow-lg transition-all duration-300 group-hover:border-primary`
                }>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-bold text-light">
                      {milestone.title}
                    </h2>
                    <StatusBadge status={milestone.status} />
                  </div>
                  <p className="text-light/70 mb-1 text-sm">
                    Target Date: {new Date(milestone.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-light/70">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </main>
  );
}