import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, collection, addDoc, serverTimestamp, OperationType, handleFirestoreError } from '../firebase';

interface SiteEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'commercial' | 'residential';
  initialService?: string;
}

export default function SiteEvaluationModal({ isOpen, onClose, type = 'commercial', initialService = '' }: SiteEvaluationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    serviceType: initialService || (type === 'commercial' ? 'General Commercial' : 'General Residential'),
    requestType: type // Categorization indicator
  });

  // Reset form when modal opens with new initialService
  React.useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        serviceType: initialService || (type === 'commercial' ? 'General Commercial' : 'General Residential'),
        requestType: type
      });
      setError(null);
    }
  }, [isOpen, initialService, type]);

  const isCommercial = type === 'commercial';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Save to Firestore
      const path = 'site_evaluations';
      console.log('Saving to Firestore:', path);
      try {
        await addDoc(collection(db, path), {
          ...formData,
          createdAt: serverTimestamp()
        });
        console.log('Successfully saved to Firestore');
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }

      // 2. Send Email via backend
      console.log('Sending email notification...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'evaluation',
            data: formData
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json();
          console.warn('Email notification failed:', errorData.error);
        } else {
          console.log('Email notification sent successfully');
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.warn('Email notification timed out');
        } else {
          console.warn('Email notification failed:', err);
        }
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('There was an error submitting your request. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-brand-gray hover:text-brand-dark transition-colors z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-100"
              aria-label="Close modal"
            >
              <X size={24} className="md:w-7 md:h-7" />
            </button>

            <div className="overflow-y-auto flex-1 p-8 md:p-12">
              {!isSubmitted ? (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-brand-dark tracking-tight">
                      {isCommercial ? (
                        <>Request a <span className="text-brand-orange">Site Evaluation</span></>
                      ) : (
                        <>Schedule <span className="text-brand-blue">Home Service</span></>
                      )}
                    </h2>
                    <p className="text-brand-gray">
                      {isCommercial 
                        ? "Professional assessment of your commercial HVAC systems."
                        : "Expert HVAC repair and maintenance for your home."}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hidden indicator for categorization */}
                    <input type="hidden" name="request_type" value={type} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-gray">Full Name</label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-gray">
                          {isCommercial ? "Company Name" : "Company (Optional)"}
                        </label>
                        <input 
                          required={isCommercial}
                          type="text" 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                          placeholder={isCommercial ? "Acme Corp" : "Optional"}
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-gray">Email Address</label>
                        <input 
                          required
                          type="email" 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-gray">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                          placeholder="(956) 555-0123"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-gray">Request Category</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all bg-white"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                      >
                        {isCommercial ? (
                          <>
                            <option value="General Commercial">General Commercial Inquiry</option>
                            <option value="Preventative Maintenance">Preventative Maintenance</option>
                            <option value="Rooftop Units (RTUs)">Rooftop Units (RTUs)</option>
                            <option value="Chillers & Large Systems">Chillers & Large Systems</option>
                            <option value="Emergency Service">Emergency Service</option>
                            <option value="System Upgrades">System Upgrades</option>
                            <option value="Energy Optimization">Energy Optimization</option>
                          </>
                        ) : (
                          <>
                            <option value="General Residential">General Residential Inquiry</option>
                            <option value="AC Repair">AC Repair</option>
                            <option value="New Installation">New Installation</option>
                            <option value="Seasonal Maintenance">Seasonal Maintenance</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-gray">
                        {isCommercial ? "How can we help?" : "Service Needed"}
                      </label>
                      <textarea 
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all resize-none"
                        placeholder={isCommercial 
                          ? "Tell us about your facility or current HVAC needs..."
                          : "Describe the issue you're having with your home AC..."}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <div className="pt-4 space-y-4">
                      {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                          {error}
                        </div>
                      )}
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 text-lg flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isCommercial ? 'bg-brand-orange hover:bg-orange-600' : 'bg-brand-blue hover:bg-blue-700'}`}
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Send size={20} />
                            Send {isCommercial ? 'Commercial' : 'Residential'} Request
                          </>
                        )}
                      </button>
                      
                      <button 
                        type="button"
                        onClick={onClose}
                        className="w-full py-3 text-sm font-bold uppercase tracking-widest text-brand-gray hover:text-brand-dark transition-colors md:hidden"
                      >
                        Cancel / Close
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-12 space-y-6">
                  <div className="flex justify-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isCommercial ? 'bg-orange-100 text-brand-orange' : 'bg-blue-100 text-brand-blue'}`}>
                      <CheckCircle2 size={48} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-brand-dark">Request Received!</h2>
                    <p className="text-brand-gray max-w-sm mx-auto">
                      Thank you for reaching out. One of our {isCommercial ? 'commercial' : 'residential'} specialists will contact you shortly to discuss your needs.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="btn-secondary px-8"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
