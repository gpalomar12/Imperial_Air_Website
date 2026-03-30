import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import CommercialServices from './pages/CommercialServices';
import PreventativeMaintenance from './pages/PreventativeMaintenance';
import EmergencyService from './pages/EmergencyService';
import RooftopUnitRepair from './pages/RooftopUnitRepair';
import LocationPage from './pages/LocationPage';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <SEO />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<CommercialServices />} />
          <Route path="/services/maintenance" element={<PreventativeMaintenance />} />
          <Route path="/services/emergency" element={<EmergencyService />} />
          <Route path="/services/rooftop-units" element={<RooftopUnitRepair />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/areas/:city" element={<LocationPage />} />
          <Route path="/areas" element={<LocationPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}
