export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
}

export interface Course {
  slug: string;
  level: string;
  title: string;
  description: string;
  outcomes: string[];
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  location: string;
  course: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}
