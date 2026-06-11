'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(data: Record<string, string>): boolean {
    const errors: Record<string, string> = {};
    if (!data.name?.trim()) errors.name = 'Name is required';
    if (!data.phone?.trim()) errors.phone = 'Phone is required';
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(data.phone.trim()))
      errors.phone = 'Enter a valid phone number';
    if (!data.service_required?.trim()) errors.service_required = 'Service is required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError('');
    setFieldErrors({});
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, string>;

    if (!validate(data)) return;

    setLoading(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-24 bg-white px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-blue-50 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-4"
            >
              Get in Touch
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-6">
              Ready to capture your next <br /> big milestone?
            </h2>
            <p className="text-gray-500 text-sm max-w-md mb-10 leading-relaxed">
              We&apos;re here to help you preserve your memories. Reach out for bookings, pricing, or
              just to say hi.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Studio Location', detail: 'Bhogewadi, Maharashtra – 413223', action: 'Get Directions' },
                { icon: Phone, title: 'Contact Number', detail: '+91 96654 60716', action: null },
                { icon: MessageSquare, title: 'WhatsApp Support', detail: 'Instant Chat Available', action: null },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center bg-gray-50 shrink-0"
                  >
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.detail}</div>
                    {item.action && (
                      <div className="text-xs text-blue-600 font-medium mt-1 cursor-pointer hover:underline">
                        {item.action} →
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.01 }}
              className="mt-12 flex items-center gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32" cy="32" r="28"
                    stroke="currentColor" strokeWidth="3" fill="transparent"
                    className="text-gray-200"
                  />
                  <motion.circle
                    cx="32" cy="32" r="28"
                    stroke="currentColor" strokeWidth="3" fill="transparent"
                    strokeDasharray={175}
                    initial={{ strokeDashoffset: 175 }}
                    whileInView={{ strokeDashoffset: 175 * (1 - 0.98) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="text-orange-600"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-gray-900">
                  98%
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Customer Satisfaction</div>
                <div className="text-xs text-gray-500">Based on 500+ local studio reviews</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg"
            style={{ perspective: '1000px' }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-8">We&apos;ll get back to you within 24 hours.</p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="rounded-full px-8"
                >
                  Send Another
                </Button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">Full Name</label>
                  <Input
                    name="name"
                    placeholder="John Doe"
                    required
                    className={`rounded-sm focus:ring-blue-600 ${fieldErrors.name ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {fieldErrors.name && <p className="text-xs text-red-500">{fieldErrors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">Phone Number</label>
                  <Input
                    name="phone"
                    placeholder="+91 00000 00000"
                    required
                    className={`rounded-sm focus:ring-blue-600 ${fieldErrors.phone ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {fieldErrors.phone && <p className="text-xs text-red-500">{fieldErrors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">Service Required</label>
                  <Input
                    name="service_required"
                    placeholder="e.g. Wedding Photography"
                    required
                    className={`rounded-sm focus:ring-blue-600 ${fieldErrors.service_required ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {fieldErrors.service_required && <p className="text-xs text-red-500">{fieldErrors.service_required}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">Message (Optional)</label>
                  <Textarea
                    name="message"
                    placeholder="How can we help?"
                    className="rounded-sm border-gray-200 focus:ring-blue-600 min-h-[100px]"
                  />
                </div>

                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-100"
                  >
                    {formError}
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 font-semibold shadow-lg shadow-blue-600/20"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                        />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Submit Inquiry <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
