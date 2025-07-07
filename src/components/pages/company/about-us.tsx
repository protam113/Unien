'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/wrappers/SectionHeader';
import { CustomImage } from '@/components/design/image.component';
import AboutData from '@/data/about.data.json';

export const WhoAreWeSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <SectionHeader title={AboutData.AboutData.title} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Công Ty TNHH <span className="text-main">UNIEN</span>
          </motion.h1>

          <motion.p
            className="text-gray-400 text-sm max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {AboutData.AboutData.description}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Image Section */}
        <div className="relative mt-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
          >
            <CustomImage
              src="/img/boiler.jpg"
              alt="Close up eye through technology"
              width={1280}
              height={640}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover object-center "
            />
            {/* <motion.div
                  className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-6"
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-l-2 text-white border-gray-400 pl-6 bg-black/30 bg-opacity-50 p-6">
                    <p className="text-lg font-light">
                      “Born and raised in Ho Chi Minh City, Vietnam, I started
                      this journey with a laptop, a vision, and a small but
                      ambitious team in the heart of Ho Chi Minh City. We’re not
                      just building websites—we’re crafting experiences, pushing
                      boundaries, and proving that a passionate team can make
                      waves in the digital world. To us, success isn’t just
                      about numbers; it’s about learning, growing, and creating
                      something truly meaningful.”
                    </p>
                    <p className="mt-4 font-semibold text-sm">
                      — HOANG PHAM ( LENF ), FOUNDER OF OUR TEAM
                    </p>
                  </div>
                </motion.div> */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
