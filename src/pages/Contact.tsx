import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ArrowLeft, Star } from 'lucide-react';
import { PHONE_NUMBER, EMAIL } from '../constants';
import MapComponent from '../components/MapComponent';
import { db, collection, addDoc, serverTimestamp, OperationType, handleFirestoreError } from '../firebase';

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Commercial HVAC',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Save to Firestore
      const path = 'contact_messages';
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
            type: 'contact',
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
      setError('There was an error sending your message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="bg-brand-dark py-24 px-6 md:px-12 text-white text-center relative">
        <div className="max-w-7xl mx-auto mb-8 text-left">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-brand-orange font-bold uppercase tracking-widest text-xs transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Contact Us</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Have a question or need to schedule a service? Our team is ready to help you with your commercial or residential HVAC needs.
          </p>
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tight">Get In Touch</h2>
            <p className="text-lg text-brand-gray leading-relaxed">
              We provide 24/7 emergency support for our commercial contract clients and prompt service for all other inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-black text-brand-dark uppercase text-sm tracking-widest mb-1">Call Us</h3>
                <a href={`tel:${PHONE_NUMBER}`} className="text-xl font-bold text-brand-gray hover:text-brand-orange transition-colors">
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <a 
                href={`mailto:${EMAIL}`}
                className="block group"
              >
                <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div className="mt-4">
                  <h3 className="font-black text-brand-dark uppercase text-sm tracking-widest mb-1 group-hover:text-brand-orange transition-colors">Email Us</h3>
                  <p className="text-xl font-bold text-brand-gray group-hover:text-brand-orange transition-colors break-all">
                    {EMAIL}
                  </p>
                </div>
              </a>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-black text-brand-dark uppercase text-sm tracking-widest mb-1">Our Location</h3>
                <p className="text-xl font-bold text-brand-gray">
                  Edinburg, TX & Surrounding RGV
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-black text-brand-dark uppercase text-sm tracking-widest mb-1">Business Hours</h3>
                <p className="text-xl font-bold text-brand-gray">
                  Mon-Fri: 8am - 6pm<br />
                  24/7 Emergency Support
                </p>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[300px] bg-gray-200 relative group z-0">
            <MapComponent center={[26.3017, -98.1633]} zoom={13} />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight">Send a Message</h2>
                <p className="text-brand-gray">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-brand-gray">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-brand-gray">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                    placeholder="(956) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-gray">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-gray">Service Type</label>
                <select 
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all bg-white"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                >
                  <option>Commercial HVAC</option>
                  <option>Residential HVAC</option>
                  <option>Preventative Maintenance</option>
                  <option>Emergency Repair</option>
                  <option>Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-gray">Your Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all resize-none"
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-5 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={24} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 space-y-6"
            >
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={56} />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tight">Message Sent!</h2>
                <p className="text-xl text-brand-gray max-w-sm mx-auto">
                  Thank you for contacting Imperial Air LLC. We have received your message and will respond shortly.
                </p>
              </div>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="btn-secondary px-10"
              >
                Send Another Message
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
