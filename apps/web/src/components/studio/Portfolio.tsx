'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  status?: string;
}

const fallbackItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'The Royal Wedding',
    category: 'Wedding',
    image_url: '/placeholder.svg',
    status: 'Featured',
  },
  {
    id: '2',
    title: 'Cultural Portraits',
    category: 'Studio',
    image_url: '/placeholder.svg',
    status: 'New',
  },
  {
    id: '3',
    title: 'Ceremony Moments',
    category: 'Events',
    image_url: '/placeholder.svg',
    status: 'Featured',
  },
  {
    id: '4',
    title: 'Corporate Identity',
    category: 'Passport',
    image_url: '/placeholder.svg',
    status: 'Active',
  },
];

export function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>(fallbackItems);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch('/api/portfolio');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      } catch {
        // use fallback data
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const categories = ['All', ...new Set(items.map((item) => item.category))];
  const filtered = activeTab === 'All' ? items : items.filter((item) => item.category === activeTab);

  return (
    <section className="py-24 bg-[#F9FAFB] border-y border-gray-200 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-4"
            >
              Latest Work
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900"
            >
              Portfolio Showcase
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex border-b border-gray-200 w-full md:w-auto"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`pb-3 -mb-[1px] px-4 text-sm transition-colors ${
                  activeTab === cat
                    ? 'text-gray-900 font-medium border-b-2 border-blue-600'
                    : 'text-gray-500 font-normal border-b-2 border-transparent hover:text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <Skeleton className="aspect-[16/10] w-full" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                </div>
              ))
            : filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/30 transition-all"
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    className="aspect-[16/10] relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />

                    {item.status && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-full px-3 py-1 text-[10px] text-gray-700 font-medium flex items-center gap-1.5 shadow-sm">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${item.status === 'New' ? 'bg-orange-500' : 'bg-green-500'}`}
                          />
                          {item.status}
                        </div>
                      </div>
                    )}

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </motion.div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-white border border-gray-200 rounded-full px-2 py-0.5 text-[10px] text-gray-500 font-medium">
                        {item.category}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
