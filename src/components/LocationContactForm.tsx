import React, { useState } from 'react';
import { Send, CheckCircle2, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { db, collection, addDoc, serverTimestamp, OperationType, handleFirestoreError } from '../firebase';

interface LocationContactFormProps {
  cityName: string;
}

export default function LocationContactForm({ cityName }: LocationContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    location: cityName,
    source: `Location Page - ${cityName}`
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Save to Firestore
      const path = 'location_requests';
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });

      // 2. Send Email via backend (optional, reusing the same setup)
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'location_request',
            data: formData
          })
        });
      } catch (err) {
        console.warn('Email notification failed:', err);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('There was an error sending your request. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-brand-orange/20 text-center space-y-6"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tight">Request Received!</h3>
          <p className="text-brand-gray text-lg max-w-sm mx-auto">
            Thank you! A technician familiar with the {cityName} area will contact you shortly to discuss your service needs.
          </p>
        </div>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="btn-secondary px-8 py-3"
        >
          Send Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-gray-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight">
            Schedule {cityName} Service
          </h2>
          <p className="text-brand-gray">
            Fill out the form below for a free estimate or to schedule your next maintenance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required
                type="text" 
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required
                type="tel" 
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              required
              type="email" 
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-4 top-6 text-gray-400" size={18} />
            <textarea 
              required
              rows={3}
              placeholder="How can we help? (e.g. AC Repair, New Install, Tune-up)"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all resize-none"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </p>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-dark text-white py-4 rounded-xl font-black uppercase tracking-widest text-lg hover:bg-brand-orange transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Send size={20} />
                Request Service
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
