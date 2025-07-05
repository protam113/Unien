'use client';

import { motion } from 'framer-motion';
import DefaultBreadcrumb from '../design/DefaultBreadCrumb';

export function HeroHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="relative h-[400px] md:h-[400px]overflow-hidden bg-gradient-to-r from-background to-card mt-12">
      {/* Grid background */}
      <div className="absolute inset-0  bg-main/30  bg-[size:40px_40px]" />

      {/* City skyline illustration */}
      <div className="absolute right-0 bottom-0 w-full h-[100px] md:h-[150px] opacity-10 [mask-image:linear-gradient(to_left,#000_30%,transparent_100%)]">
        <svg
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path
            d="M0,200 L50,200 L50,120 L100,120 L100,200 L150,200 L150,80 L180,80 L180,200 L250,200 L250,150 L280,150 L280,200 L350,200 L350,100 L380,100 L380,70 L410,70 L410,100 L440,100 L440,200 L500,200 L500,70 L550,70 L550,200 L600,200 L600,120 L650,120 L650,200 L700,200 L700,150 L750,150 L750,200 L800,200 L800,100 L850,100 L850,150 L900,150 L900,200 L950,200 L950,120 L1000,120 L1000,200 L1050,200 L1050,80 L1100,80 L1100,200 L1150,200 L1150,100 L1200,100 L1200,200"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="container px-4 relative z-10 h-full flex flex-col justify-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-[#F69429] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <div className="mt-4 mb-4">
          <DefaultBreadcrumb />
        </div>
        <motion.p
          className="mt-4 text-lg text-muted-foreground w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
