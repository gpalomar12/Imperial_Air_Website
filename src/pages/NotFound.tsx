import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="pt-32 min-h-screen flex items-center justify-center px-6 text-center">
      <div className="space-y-6 max-w-lg">
        <p className="text-brand-orange font-black text-8xl">404</p>
        <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tight">Page Not Found</h1>
        <p className="text-brand-gray text-lg">
          The page you're looking for doesn't exist. It may have been moved or the URL may be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button onClick={() => navigate('/')} className="btn-primary">
            Go to Homepage
          </button>
          <button onClick={() => navigate('/contact')} className="btn-secondary">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}