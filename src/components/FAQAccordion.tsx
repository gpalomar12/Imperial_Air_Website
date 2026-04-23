import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../constants';

interface FAQAccordionProps {
  showTitle?: boolean;
}

export default function FAQAccordion({ showTitle = true }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`py-24 px-6 md:px-12 bg-gray-50 ${!showTitle ? 'pt-12' : ''}`}>
      <div className="max-w-3xl mx-auto">
        {showTitle && (
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight">Frequently Asked Questions</h2>
            <p className="text-brand-gray text-lg">
              Common questions about our commercial and residential HVAC services.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl font-bold text-brand-dark">{faq.question}</span>
                <div className="text-brand-orange">
                  {openIndex === i ? <Minus size={24} /> : <Plus size={24} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-brand-gray text-lg leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
