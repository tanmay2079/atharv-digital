'use client';

import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919665460716"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl text-white cursor-pointer"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle size={32} />
      </motion.div>
    </motion.a>
  );
}
