import { 
  Wrench, 
  Building2, 
  Zap, 
  Clock, 
  ShieldCheck, 
  ThermometerSnowflake,
  Fan,
  Settings
} from 'lucide-react';

export const PHONE_NUMBER = "956-566-3406";
export const EMAIL = "info@imperialairllc.com";
export const ADDRESS = "Edinburg, TX";

export const COMMERCIAL_SERVICES = [
  {
    id: 'maintenance',
    title: 'Preventative Maintenance',
    description: 'Customized plans to prevent failures and extend equipment life.',
    icon: 'ShieldCheck',
    path: '/services/maintenance'
  },
  {
    id: 'rtu',
    title: 'Rooftop Units (RTUs)',
    description: 'Expert installation and repair of commercial rooftop HVAC systems.',
    icon: 'Building2',
    path: '/services/rooftop-units'
  },
  {
    id: 'chillers',
    title: 'Chillers & Large Systems',
    description: 'Specialized service for complex commercial cooling infrastructure.',
    icon: 'ThermometerSnowflake',
    path: '/services/chillers'
  },
  {
    id: 'emergency',
    title: 'Emergency Service',
    description: '24/7 rapid response for critical commercial HVAC failures.',
    icon: 'Clock',
    path: '/services/emergency'
  },
  {
    id: 'upgrades',
    title: 'System Upgrades',
    description: 'Modernizing your facility with high-efficiency HVAC technology.',
    icon: 'Zap',
    path: '/services/upgrades'
  },
  {
    id: 'optimization',
    title: 'Energy Optimization',
    description: 'Reducing operational costs through smart system tuning.',
    icon: 'Settings',
    path: '/services/optimization'
  }
];

export const FAQS = [
  {
    question: "Do you offer commercial maintenance contracts?",
    answer: "Yes, we provide customized preventative maintenance plans tailored to your facility's specific size and equipment needs."
  },
  {
    question: "What types of buildings do you service?",
    answer: "We service a wide range of commercial properties including offices, retail centers, warehouses, and multi-unit residential properties."
  },
  {
    question: "How fast is your emergency response?",
    answer: "We offer priority dispatch for our contract clients and same-day emergency response for all commercial critical failures."
  }
];
