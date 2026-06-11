'use client';

import { motion } from 'motion/react';

const specs = [
  { label: 'Lens Range', value: '14mm - 200mm' },
  { label: 'Sensor Resolution', value: '45.7 MP Full Frame' },
  { label: 'Studio Lighting', value: '3-Point Godox System' },
  { label: 'Editing Suite', value: 'Adobe Creative Cloud' },
  { label: 'Print Quality', value: '300 DPI Ultra HD' },
  { label: 'Backup System', value: 'RAID 5 Cloud Sync' },
];

export function About() {
  return (
    <section className="py-24 bg-white px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-4"
            >
              Our Studio
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-6">
              Precision and Artistry <br />
              in every frame.
            </h2>
            <p className="text-gray-500 text-sm max-w-md mb-8 leading-relaxed">
              Founded in Bhogewadi, Atharv Digital Photo Studio has been a cornerstone of local
              photography for years. We combine professional-grade equipment with a passion for
              storytelling.
            </p>

            <div className="space-y-4">
              <p className="text-sm text-gray-700 font-medium">Why local residents trust us:</p>
              <ul className="space-y-2">
                {[
                  'Expert lighting for every skin tone',
                  'High-speed instant delivery for passport photos',
                  'Specialized wedding cinematography',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <span className="text-blue-500 mt-0.5">✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            whileHover={{ rotateY: 2, scale: 1.01 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F9FAFB] rounded-xl border border-gray-200 p-8 shadow-lg"
            style={{ perspective: '1000px' }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold text-gray-900">Technical Standards</h3>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.8 }}
                className="bg-white border border-gray-200 rounded-full px-3 py-1 text-[10px] text-gray-500 font-medium flex items-center gap-1.5"
              >
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                />
                Live Calibration
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <div className="text-[10px] text-gray-500 uppercase font-medium mb-1 tracking-wider">
                    {spec.label}
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{spec.value}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-10 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500 italic">&ldquo;Quality is never an accident.&rdquo;</div>
                <motion.div
                  whileHover={{ x: 3 }}
                  className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline"
                >
                  View Equipment List →
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
