'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1e1e24] text-white pt-20 px-6"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="relative w-full h-full opacity-30">
          <img
            src="https://raw.createusercontent.com/84cf41be-9ffb-40ff-b8dc-3308d0f2ea7c/"
            alt="Studio Architectural Render"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e24]/80 via-transparent to-[#1e1e24]" />
        </div>
      </motion.div>

      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, #60a5fa 0%, transparent 50%)
          `,
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-400 border border-blue-400/20 text-sm font-medium mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
          />
          Capturing Moments in Bhogewadi
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight mb-6"
          style={{ perspective: '1000px' }}
        >
          <motion.span
            initial={{ rotateX: 45, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-block"
          >
            Atharv Digital
          </motion.span>
          <br />
          <motion.span
            initial={{ rotateX: 45, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-400 inline-block"
          >
            Photo Studio
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-normal"
        >
          Premium photography and digital imaging services. Where tradition meets modern digital
          craftsmanship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-blue-600/25"
            >
              View Portfolio <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="border-white/10 hover:bg-white/5 text-white rounded-full px-8 h-12 text-base font-semibold backdrop-blur-sm"
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100, rotateY: -10 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ rotateY: -5, x: -5 }}
        className="absolute bottom-20 right-10 hidden xl:block z-20"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 w-64 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-400/20">
              <ImageIcon className="text-blue-400 w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase font-medium">Digital Assets</div>
              <div className="text-lg font-semibold text-white">5,240+ Shot</div>
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ delay: 1.5, duration: 1 }}
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
