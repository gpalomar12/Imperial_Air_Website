export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  result: string;
}
