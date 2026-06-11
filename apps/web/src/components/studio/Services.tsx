'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Image as ImageIcon,
  Users,
  Calendar,
  Printer,
  ShieldCheck,
  Heart,
  Sparkles,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const fallbackIcon = Camera;

const iconMap: Record<string, typeof Camera> = {
  Camera, ImageIcon, Users, Calendar, Printer, ShieldCheck, Heart, Sparkles,
};

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  features: string[];
}

const defaultServices: ServiceItem[] = [
  {
    id: '1',
    title: 'Passport Size Photos',
    description: 'High-quality instant passport and visa photos with lighting optimization.',
    features: ['Instant printing', 'Digital copy provided', 'Visa compliance check'],
  },
  {
    id: '2',
    title: 'Wedding Photography',
    description: 'Cinematic and traditional wedding photography to capture your special day.',
    features: ['Pre-wedding shoot', 'Cinematic highlights', 'Luxury photo albums'],
  },
  {
    id: '3',
    title: 'Event Coverage',
    description: 'Comprehensive coverage for birthdays, anniversaries, and ceremonies.',
    features: ['Professional lighting', 'Group portraits', 'Event highlights'],
  },
  {
    id: '4',
    title: 'Digital Services',
    description: 'Photo restoration, lamination, and expert photo editing services.',
    features: ['Photo restoration', 'High-end retouching', 'ID card printing'],
  },
];

export function Services() {
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-white text-gray-900 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-4"
          >
            Our Expertise
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-2"
          >
            Professional Photography Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm max-w-lg"
          >
            Experience the perfect blend of traditional expertise and modern digital imaging at
            Bhogewadi's premier studio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <Skeleton className="w-10 h-10 rounded-full mb-6" />
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-6" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))
            : services.map((service, index) => {
                const Icon = service.icon_name && iconMap[service.icon_name]
                  ? iconMap[service.icon_name]
                  : fallbackIcon;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    whileHover={{ y: -8, rotateX: 3, rotateY: 3, scale: 1.02 }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 transition-all group perspective-1000"
                    style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{service.description}</p>

                    <div className="space-y-1.5" style={{ transform: 'translateZ(20px)' }}>
                      {service.features.map((feature) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="text-sm text-gray-600 py-1"
                        >
                          <span className="text-blue-400 mr-2">→</span> {feature}
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="mt-6 pt-4 border-t border-gray-100"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-xs font-medium text-blue-600 flex items-center gap-1"
                      >
                        Learn More <span className="text-sm">→</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
