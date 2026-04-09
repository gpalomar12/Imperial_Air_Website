import React, { useState, useRef } from 'react';
import { X, Send, CheckCircle2, Upload, FileText, Building2, Calendar, Ruler, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, collection, addDoc, serverTimestamp, OperationType, handleFirestoreError } from '../firebase';
import { PHONE_NUMBER, EMAIL } from '@/src/constants';

interface ProposalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function ProposalRequestModal({ isOpen, onClose, initialService = '' }: ProposalRequestModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    email: '',
    phone: '',
    facilityType: 'Office',
    sqft: '',
    projectType: initialService || 'Replacement',
    timeline: 'Immediate',
    message: '',
    fileName: ''
  });

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setError(null);
      setFormData({
        name: '',
        company: '',
        title: '',
        email: '',
        phone: '',
        facilityType: 'Office',
        sqft: '',
        projectType: initialService || 'Replacement',
        timeline: 'Immediate',
        message: '',
        fileName: ''
      });
    }
  }, [isOpen, initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Save to Firestore
      const path = 'proposal_requests';
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
            type: 'proposal',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setFormData({ ...formData, fileName: file.name });
      // Simulate upload
      setTimeout(() => setIsUploading(false), 1500);
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
            className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-brand-gray hover:text-brand-dark transition-colors z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-100"
              aria-label="Close modal"
            >
              <X size={24} className="md:w-7 md:h-7" />
            </button>

            <div className="overflow-y-auto flex-1">

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Sidebar Info */}
              <div className="lg:col-span-4 bg-brand-dark p-8 md:p-10 text-white space-y-8">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center mb-4">
                    <FileText size={24} />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">Request a Proposal</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Get a detailed commercial HVAC proposal tailored to your facility's specific needs and efficiency goals.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
                    <p className="text-xs font-medium text-white/80">Detailed Equipment Analysis</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
                    <p className="text-xs font-medium text-white/80">Energy ROI Projections</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
                    <p className="text-xs font-medium text-white/80">Custom Maintenance Options</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Priority Support</p>
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 text-sm font-bold hover:text-brand-orange transition-colors">
                    <Phone size={16} />
                    Commercial Desk: {PHONE_NUMBER}
                  </a>
                  <a 
                    href={`mailto:${EMAIL}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm font-bold hover:text-brand-orange transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`mailto:${EMAIL}`, '_blank');
                    }}
                  >
                    <Mail size={16} />
                    {EMAIL}
                  </a>
                </div>
              </div>

              {/* Form Area */}
              <div className="lg:col-span-8 p-8 md:p-12">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section 1: Contact */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-brand-orange">1. Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                          required
                          type="text" 
                          placeholder="Full Name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <input 
                          required
                          type="text" 
                          placeholder="Company Name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                          required
                          type="email" 
                          placeholder="Work Email"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <input 
                          required
                          type="tel" 
                          placeholder="Phone Number"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Section 2: Facility */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-brand-orange">2. Facility Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <select 
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all bg-white appearance-none"
                            value={formData.facilityType}
                            onChange={(e) => setFormData({...formData, facilityType: e.target.value})}
                          >
                            <option value="Office">Office Building</option>
                            <option value="Retail">Retail / Restaurant</option>
                            <option value="Industrial">Industrial / Warehouse</option>
                            <option value="Healthcare">Healthcare Facility</option>
                            <option value="Education">Educational Institution</option>
                            <option value="Other">Other Commercial</option>
                          </select>
                        </div>
                        <div className="relative">
                          <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type="text" 
                            placeholder="Est. Square Footage"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all"
                            value={formData.sqft}
                            onChange={(e) => setFormData({...formData, sqft: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Project */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-brand-orange">3. Project Scope</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all bg-white"
                          value={formData.projectType}
                          onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        >
                          <option value="Replacement">Full System Replacement</option>
                          <option value="New Construction">New Construction Install</option>
                          <option value="Retrofit">Energy Efficiency Retrofit</option>
                          <option value="Maintenance">Maintenance Contract</option>
                          <option value="Repair">Large Scale Repair</option>
                        </select>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <select 
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all bg-white appearance-none"
                            value={formData.timeline}
                            onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                          >
                            <option value="Immediate">Immediate Need</option>
                            <option value="1-3 Months">1-3 Months</option>
                            <option value="3-6 Months">3-6 Months</option>
                            <option value="Planning">Planning / Budgeting Phase</option>
                          </select>
                        </div>
                      </div>
                      
                      <textarea 
                        rows={3}
                        placeholder="Additional project details or specific requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />

                      {/* File Upload */}
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer hover:border-brand-orange hover:bg-orange-50 transition-all"
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                        {isUploading ? (
                          <div className="flex items-center gap-2 text-brand-orange font-bold">
                            <div className="w-4 h-4 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                            Uploading...
                          </div>
                        ) : formData.fileName ? (
                          <div className="flex items-center gap-2 text-green-600 font-bold">
                            <CheckCircle2 size={18} />
                            {formData.fileName}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-brand-gray font-medium">
                            <Upload size={18} />
                            Upload Blueprints or Equipment List (Optional)
                          </div>
                        )}
                      </div>
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
                          className="w-full bg-brand-orange text-white py-4 rounded-xl font-black uppercase tracking-widest text-lg shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <Send size={20} />
                              Submit Proposal Request
                            </>
                          )}
                        </button>
                        
                        <button 
                          type="button"
                          onClick={onClose}
                          className="w-full py-3 text-sm font-bold uppercase tracking-widest text-brand-gray hover:text-brand-dark transition-colors lg:hidden"
                        >
                          Cancel / Close
                        </button>
                      </div>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-6">
                    <div className="flex justify-center">
                      <div className="w-24 h-24 bg-orange-100 text-brand-orange rounded-full flex items-center justify-center">
                        <CheckCircle2 size={56} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tight">Request Received</h2>
                      <p className="text-brand-gray max-w-sm mx-auto text-lg">
                        Our commercial estimating team has received your request. We will review your details and contact you within 24 business hours to discuss the next steps.
                      </p>
                    </div>
                    <button 
                      onClick={onClose}
                      className="btn-secondary px-10 py-4"
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
