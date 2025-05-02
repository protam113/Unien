'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function RadiatingLoader() {
  const [pulses, setPulses] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulses((prev) => {
        const newPulses = [...prev, Date.now()];
        if (newPulses.length > 3) {
          return newPulses.slice(newPulses.length - 3);
        }
        return newPulses;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#F69429]/20">
      <div className="relative flex items-center justify-center">
        {/* Static center logo */}
        <Image
          src="/logo.svg"
          alt="Logo"
          width={96}
          height={96}
          className="z-10"
        />

        {/* Radiating pulses */}
        {pulses.map((id) => (
          <motion.div
            key={id}
            className="absolute rounded-full bg-[#F69429]/70 opacity-70"
            initial={{ width: '6rem', height: '6rem', opacity: 0.8 }}
            animate={{
              width: '12rem',
              height: '12rem',
              opacity: 0,
            }}
            transition={{
              duration: 2.5,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Static outer ring */}
        <div className="absolute w-32 h-32 bg-[#F69429]/80 rounded-full opacity-50 z-0" />
      </div>
    </div>
  );
}
