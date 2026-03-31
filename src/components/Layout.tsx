import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomBar from './MobileBottomBar';
import ConstructionBanner from './ConstructionBanner';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ConstructionBanner />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
