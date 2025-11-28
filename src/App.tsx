import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Moon, Sun, Check, ArrowRight, Star, 
  Code, Zap, Search, Layout, Smartphone, Mail, 
  Instagram, Linkedin, Globe, MessageCircle,
  Clock, Shield, Users, Hammer, Heart, ShoppingBag, 
  Utensils, BookOpen, Briefcase, BarChart, Server, 
  PenTool, Database, Cpu, Monitor, TrendingUp,
  Lock, ChevronRight, Loader, Construction,
  XCircle, CheckCircle 
} from 'lucide-react';

// --- Interfaces & Types ---

type PageType = 'home' | 'services' | 'portfolio' | 'about' | 'contact' | 'book' | 'privacy';

interface PageProps {
  setPage: (page: PageType) => void;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface AddOnData {
  name: string;
  desc: string;
  price: string;
}

// --- Constants & Data ---

const ADD_ON_CATEGORIES = [
  { id: 'web', label: 'Website & Design' },
  { id: 'seo', label: 'SEO & Marketing' },
  { id: 'social', label: 'Social Media & Content' },
  { id: 'auto', label: 'Automation & Tech' },
  { id: 'maint', label: 'Maintenance & Security' },
  { id: 'premium', label: 'Premium / Special Services' }
] as const;

const ADD_ONS_DATA: Record<string, AddOnData[]> = {
  web: [
    { name: 'Extra Page', desc: 'Add 1 additional page to your website', price: '$25' },
    { name: 'Landing Page', desc: 'Campaign-specific page', price: '$50' },
    { name: 'Custom Graphics', desc: 'Icons, banners, small illustrations', price: '$30–$80' },
    { name: 'Logo / Branding Kit', desc: 'Simple logo + color/font setup', price: '$80–$150' },
    { name: 'Website Redesign', desc: 'Minor website revamp', price: '$100–$200' }
  ],
  seo: [
    { name: 'SEO Audit & Fixes', desc: 'Basic technical SEO + corrections', price: '$50–$100' },
    { name: 'Local SEO Setup', desc: 'Google My Business + citations', price: '$30–$80' },
    { name: 'Keyword Research', desc: 'Competitor + keyword analysis', price: '$40–$80' },
    { name: 'Content Writing', desc: '1 page or blog post', price: '$25–$50' },
    { name: 'Monthly SEO Report', desc: 'Track performance for 1 month', price: '$25' }
  ],
  social: [
    { name: 'Extra Posts', desc: '+5 posts/month', price: '$25' },
    { name: 'Short Videos / Reels', desc: 'Social media-ready clips', price: '$30–$70' },
    { name: 'Ad Graphics', desc: 'Social media ad images', price: '$40–$80' },
    { name: 'Branding Templates', desc: 'Post templates', price: '$25–$50' },
    { name: 'Monthly Analytics', desc: 'Social media performance', price: '$25' }
  ],
  auto: [
    { name: 'Email Automation', desc: 'Welcome/follow-up sequence', price: '$40–$80' },
    { name: 'WhatsApp Automation', desc: 'Auto-replies & workflows', price: '$30–$60' },
    { name: 'Booking System Setup', desc: 'Appointment scheduler', price: '$50–$100' },
    { name: 'CRM Integration', desc: 'Basic lead tracking', price: '$80–$150' },
    { name: 'E-commerce Setup', desc: 'Small Shopify / WooCommerce store', price: '$100–$200' }
  ],
  maint: [
    { name: 'Extra Security Monitoring', desc: 'Advanced monitoring', price: '$15–$25/mo' },
    { name: 'Speed Optimisation', desc: 'Page load & performance boost', price: '$30–$80' },
    { name: 'Backup Setup', desc: 'Full backups & monthly service', price: '$15–$30' },
    { name: 'Website Health Check', desc: 'Quarterly review', price: '$25' }
  ],
  premium: [
    { name: 'Custom Animations', desc: 'Interactive site elements', price: '$40–$80' },
    { name: 'Multilingual Setup', desc: 'Add extra languages', price: '$80–$150' },
    { name: 'Photo/Video Editing', desc: 'Website or social media', price: '$25–$60' },
    { name: 'Premium Stock Media', desc: 'Images / videos purchased', price: '$10–$30' },
    { name: 'Consulting / Strategy Call', desc: 'Digital strategy session', price: '$25–$50' }
  ]
};

const PACKAGES = [
  {
    name: 'Starter',
    price: '$35',
    period: '/mo',
    desc: 'Perfect for: New businesses, tradies, home-run setups',
    features: [
      '1-page modern website', 
      'Basic SEO setup', 
      'Mobile-responsive layout', 
      'Basic speed optimisation', 
      'WhatsApp contact button',
      'Email support'
    ],
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$50',
    period: '/mo',
    desc: 'Perfect for: Growing businesses needing consistent online presence',
    features: [
      '1–3 page website', 
      '2 website changes/mo', 
      'Basic SEO', 
      'Security monitoring', 
      'Social media (2 posts/wk)',
      'Priority email support'
    ],
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$70',
    period: '/mo',
    desc: 'Perfect for: Businesses wanting better SEO & multi-platform social media',
    features: [
      '3–5 page website', 
      'Advanced SEO', 
      '5 changes/month', 
      'Multi-platform social', 
      'Security monitoring',
      'WhatsApp automation'
    ],
    highlight: false,
  },
  {
    name: 'Elite',
    price: '$100',
    period: '/mo',
    desc: 'Perfect for: Businesses wanting full digital management',
    features: [
      'Full custom website', 
      'Unlimited changes', 
      'Complete social media', 
      'Branding kit', 
      'Email + WhatsApp auto',
      'Lead tracking system'
    ],
    highlight: false,
  },
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah J.", role: "Bakery Owner", text: "Build50 transformed our online presence. Orders are up 40%!" },
  { id: 2, name: "Mike T.", role: "Personal Trainer", text: "The monthly support is a lifesaver. I focus on training, they handle the web." },
];

// --- Components ---

const BrandLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 85V55H35V85H20Z" className="fill-slate-800 dark:fill-white" />
    <path d="M42.5 85V40H57.5V85H42.5Z" className="fill-slate-800 dark:fill-white" />
    <path d="M65 85V25H80V85H65Z" className="fill-slate-800 dark:fill-white" />
    <path d="M10 60 L35 35 L50 50 L85 15" stroke="#3B82F6" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M85 15 L70 15 M85 15 L85 30" stroke="#3B82F6" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false }: ButtonProps) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants: Record<string, string> = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30",
    secondary: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700",
    outline: "border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20",
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const Card = ({ children, className = "", highlight = false }: { children: React.ReactNode; className?: string; highlight?: boolean }) => (
  <div className={`p-6 rounded-2xl transition-all duration-300 ${
    highlight 
      ? 'bg-white dark:bg-slate-800 ring-2 ring-purple-500 shadow-xl shadow-purple-500/20 scale-105 z-10' 
      : 'bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:shadow-lg'
    } ${className}`}>
    {children}
  </div>
);

// --- Pages ---

const Home = ({ setPage }: PageProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    
    {/* 1. New Hero Section */}
    <section className="relative pt-32 pb-24 px-6 flex flex-col items-center text-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent dark:from-purple-900/30"></div>
      
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-[10%] w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full text-sm font-bold text-slate-800 dark:text-slate-200 mb-8 shadow-sm">
          <Star className="w-4 h-4 text-purple-500 fill-purple-500" /> Trusted by Australian Businesses
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
          Helping Australian <br className="hidden md:block"/> Small Businesses <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Grow Online</span>
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Modern websites, SEO, social media, and digital automation — designed to make your business thrive without the agency price tag.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={() => setPage('book')} className="w-full sm:w-auto h-14 text-lg">
            Book Free Consult
          </Button>
          <Button variant="secondary" onClick={() => window.open('https://wa.me/61400123456')} className="w-full sm:w-auto h-14 text-lg">
            <MessageCircle className="w-5 h-5" /> WhatsApp Us
          </Button>
        </div>

        <div className="mt-16 relative w-full max-w-3xl mx-auto h-[300px] md:h-[400px]">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute inset-x-0 bottom-0 top-10 bg-slate-900 rounded-t-2xl border-x-4 border-t-4 border-slate-800 shadow-2xl overflow-hidden"
          >
             <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">
               <div className="w-full h-full bg-slate-900 relative p-4">
                 <div className="w-full h-8 bg-slate-800 rounded mb-4 flex items-center px-4 gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="w-2/3 h-4 bg-slate-700 rounded mb-2"></div>
                 <div className="w-1/2 h-4 bg-slate-700 rounded mb-8"></div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="h-24 bg-slate-800 rounded"></div>
                   <div className="h-24 bg-slate-800 rounded"></div>
                 </div>
               </div>
             </div>
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -right-4 md:-right-12 bottom-0 w-24 md:w-32 h-48 md:h-64 bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-xl overflow-hidden"
          >
             <div className="w-full h-full bg-slate-800 flex flex-col p-2 gap-2">
               <div className="w-full h-20 bg-purple-600/20 rounded"></div>
               <div className="w-full h-4 bg-slate-700 rounded"></div>
               <div className="w-3/4 h-4 bg-slate-700 rounded"></div>
             </div>
          </motion.div>
        </div>
      </motion.div>
    </section>

    {/* 2. Why Build50 / Stats */}
    <div className="bg-white dark:bg-slate-900 py-12 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { icon: Zap, text: "Fast delivery (7–14 days)" },
          { icon: MessageCircle, text: "Direct WhatsApp support" },
          { icon: Lock, text: "Built-in security & backups" },
          { icon: TrendingUp, text: "SEO-ready structure" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center shadow-sm">
               <item.icon className="w-6 h-6" />
            </div>
            <div className="font-bold text-slate-900 dark:text-white text-sm md:text-base max-w-[160px] mx-auto">
              {item.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* 3. Problem / Solution Split */}
    <Section>
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: Problem */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Struggling to grow online?</h2>
          <div className="space-y-6">
            {[
              "Website looks outdated or doesn't work on mobile",
              "No time to post on social media consistently",
              "Paying too much for agencies with slow service",
              "Confused by SEO, domains, and tech jargon"
            ].map((prob, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-slate-600 dark:text-slate-400"
              >
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <span className="font-medium">{prob}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Solution */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700">
          <h2 className="text-3xl font-bold mb-8 text-purple-600">The Build50 Solution</h2>
          <div className="space-y-6">
            {[
              "Modern, fast websites built in 7 days",
              "Social media managed for you automatically",
              "Fixed monthly pricing — no hidden fees",
              "We handle all the tech, hosting & security"
            ].map((sol, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-slate-700 dark:text-slate-200"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <span className="font-bold">{sol}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <Button className="w-full" onClick={() => setPage('services')}>See How We Can Help</Button>
          </div>
        </div>
      </div>
    </Section>

    {/* 4. Quick Services Strip */}
    <Section className="bg-slate-900 text-white rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-purple-600/20 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="text-3xl font-bold">Everything You Need</h2>
          <button onClick={() => setPage('services')} className="text-purple-400 hover:text-white transition-colors flex items-center gap-2 font-medium">
            View all services <ArrowRight className="w-4 h-4"/>
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Globe, title: "Websites", desc: "Modern, responsive, animated" },
            { icon: TrendingUp, title: "SEO", desc: "Rank higher and attract clients" },
            { icon: Smartphone, title: "Social Media", desc: "Stay consistent without stress" },
            { icon: Zap, title: "Automation", desc: "Save time with smart workflows" }
          ].map((srv, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-colors cursor-pointer"
              onClick={() => setPage('services')}
            >
              <srv.icon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-bold text-xl mb-2">{srv.title}</h3>
              <p className="text-slate-400 text-sm">{srv.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>

    {/* 5. Before & After Transformation */}
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Before & After Using Build50</h2>
        <p className="text-slate-500">See the difference a professional digital system makes.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Before */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border border-red-100 dark:border-red-900/30"
        >
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center gap-2">
            <XCircle className="w-6 h-6" /> Before Build50
          </h3>
          <ul className="space-y-4">
            {["Outdated website", "No Google visibility", "Low enquiry rate", "Manual follow-ups", "Inconsistent branding"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <X className="w-5 h-5 text-red-400 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* After */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-green-50 dark:bg-green-900/10 p-8 rounded-2xl border border-green-100 dark:border-green-900/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RESULTS</div>
          <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" /> After Build50
          </h3>
          <ul className="space-y-4">
            {["Fast modern website", "SEO-ready structure", "Lead capture systems", "Automated responses", "Professional branding"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
                <Check className="w-5 h-5 text-green-500 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>

    {/* 6. Authority Builder */}
    <Section className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">What Most Agencies Won’t Tell You</h2>
        <div className="space-y-4 text-left mb-10">
          {[
            "You don’t need a $5,000 website to grow.",
            "Fancy designs mean nothing without SEO.",
            "Posting daily on social media is unnecessary.",
            "Speed and structure matter more than visuals.",
            "Automation saves more money than ads."
          ].map((truth, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start gap-4"
            >
              <div className="w-6 h-6 mt-0.5 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center shrink-0 text-purple-600 font-bold text-sm">!</div>
              <span className="text-slate-700 dark:text-slate-200 font-medium">{truth}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xl text-purple-600 font-bold mb-8">We build only what actually grows your business.</p>
        <Button onClick={() => setPage('book')} className="mx-auto">Get a Strategy Call</Button>
      </div>
    </Section>

    {/* 7. Lead Capture / CTA */}
    <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Want to Grow Your Business Online?</h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-10">
          Slots for next month are filling up fast. Join our list or book a free consultation today!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-grow p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <Button className="whitespace-nowrap">Get Started</Button>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Or <button onClick={() => window.open('https://wa.me/61400123456')} className="text-purple-600 font-bold hover:underline">WhatsApp us</button> directly.
        </p>
      </div>
    </div>

  </motion.div>
);

const Services = ({ setPage }: PageProps) => {
  const [activeAddOnCategory, setActiveAddOnCategory] = useState<string>('web');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-12">
      <Section>
        {/* Section 1 - Overview */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Our Services</h1>
          <p className="text-2xl text-purple-600 font-medium mb-8">Digital solutions designed to help your business grow.</p>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              At Build50, we offer simple, affordable, Australian-focused digital services that help businesses get online, grow, and scale. 
              Whether you're just starting or ready for automation, our monthly plans provide everything you need.
            </p>
          </div>
        </div>

        {/* Section 2 - Packages */}
        <h2 className="text-2xl font-bold text-center mb-8">Service Packages</h2>
        <div className="grid lg:grid-cols-4 gap-6 mb-24">
          {PACKAGES.map((pkg) => (
            <Card key={pkg.name} highlight={pkg.highlight} className="flex flex-col relative overflow-hidden">
              {pkg.highlight && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
                {pkg.price}<span className="text-sm text-slate-500 font-normal">{pkg.period}</span>
              </div>
              <p className="text-sm text-slate-500 mb-6 italic">{pkg.desc}</p>
              
              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start text-sm gap-3">
                      <Check className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" /> 
                      <span className="text-slate-700 dark:text-slate-300 leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button variant={pkg.highlight ? 'primary' : 'outline'} className="w-full" onClick={() => setPage('contact')}>
                Choose {pkg.name}
              </Button>
            </Card>
          ))}
        </div>

        {/* Section 2.5 - One-Off Add-Ons (Interactive) */}
        <div className="mb-24">
           <h2 className="text-3xl font-bold text-center mb-4">One-Off Add-Ons</h2>
           <p className="text-center text-slate-500 mb-12">Need something extra? Choose from our tailored one-time services.</p>
           
           <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
             {/* Left Sidebar / Tabs */}
             <div className="w-full lg:w-1/4 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
               {ADD_ON_CATEGORIES.map(cat => (
                 <motion.button
                   key={cat.id}
                   onClick={() => setActiveAddOnCategory(cat.id)}
                   whileHover={{ scale: 1.02, x: 4, backgroundColor: activeAddOnCategory === cat.id ? undefined : "rgba(124, 58, 237, 0.05)" }}
                   whileTap={{ scale: 0.98 }}
                   className={`px-4 py-4 rounded-xl text-left font-medium transition-all flex items-center justify-between group whitespace-nowrap lg:whitespace-normal flex-shrink-0 ${
                     activeAddOnCategory === cat.id 
                       ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                       : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-transparent dark:border-transparent'
                   }`}
                 >
                   {cat.label}
                   <ChevronRight className={`w-4 h-4 hidden lg:block transition-transform ${activeAddOnCategory === cat.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-50'}`} />
                 </motion.button>
               ))}
             </div>

             {/* Right Content Panel */}
             <div className="w-full lg:w-3/4 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 md:p-8 min-h-[400px] relative overflow-hidden border border-slate-100 dark:border-slate-800">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeAddOnCategory}
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 50 }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                 >
                   <div className="grid md:grid-cols-2 gap-4">
                     {ADD_ONS_DATA[activeAddOnCategory]?.map((addon, index) => (
                       <motion.div 
                         key={index} 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: index * 0.08, duration: 0.3 }}
                         whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                         className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors group cursor-default"
                       >
                         <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-lg">{addon.name}</h4>
                           <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-bold px-2 py-1 rounded whitespace-nowrap ml-2">
                             {addon.price}
                           </span>
                         </div>
                         <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{addon.desc}</p>
                         <button 
                           onClick={() => setPage('contact')}
                           className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 group-hover:gap-2 transition-all"
                         >
                           Inquire <ArrowRight className="w-3 h-3" />
                         </button>
                       </motion.div>
                     ))}
                   </div>
                 </motion.div>
               </AnimatePresence>
             </div>
           </div>
        </div>

        {/* Section 3 - What We Do */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Web Development */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-lg group">
               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Globe className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">Website Development</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 Fast, modern, animated websites built with React. Includes dark/light mode and mobile-first design.
               </p>
            </div>

            {/* SEO */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-lg group">
               <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <TrendingUp className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">SEO Optimisation</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 Rank better on Google and attract customers with speed optimisation, schema markup, and keyword strategy.
               </p>
            </div>

            {/* Branding */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-lg group">
               <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <PenTool className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">Branding & Identity</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 Complete visual identity packages including logo design, colour palettes, fonts, and professional templates.
               </p>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-lg group">
               <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Smartphone className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">Social Media Management</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 Consistent posting, engaging captions, and content strategy to keep your audience growing across platforms.
               </p>
            </div>

            {/* Automation */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-lg group">
               <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Zap className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">Business Automation</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 Save time with auto-emails, WhatsApp auto-responses, lead funnels, and streamlined sales workflows.
               </p>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-lg group">
               <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Lock className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">Security Monitoring</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                 Sleep easy with daily security checks, automated backups, and protection against online threats.
               </p>
            </div>

          </div>
        </div>
      </Section>
    </motion.div>
  );
};

const About = ({ setPage }: PageProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-12">
    
    {/* 1. Origin & Mission */}
    <Section>
      <div className="max-w-5xl mx-auto mb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">About Build50</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
             Build50 was created with a simple idea: help Australian small businesses get a modern website without paying agency prices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
           {/* Origin */}
           <div>
             <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
               The Origin
             </h3>
             <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
               As a founder who grew up around hardworking tradespeople, retail owners, and local services, I saw one thing in common.
             </p>
             <blockquote className="border-l-4 border-purple-600 pl-6 py-2">
               <p className="text-xl font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
                 "Everyone wants more customers, but no one has the time or budget for a $5,000+ agency website."
               </p>
             </blockquote>
           </div>

           {/* Mission */}
           <div>
             <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
               Our Mission
             </h3>
             <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
               To give every Australian business a fast, beautiful, affordable online presence — 
               without the stress, confusing tech jargon, or massive upfront cost.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
               We bridge the gap between expensive agencies and low-quality DIY builders by providing fixed-price, subscription websites that grow with you.
             </p>
           </div>
        </div>
      </div>
    </Section>

    {/* 2. How We Help & 3. What We Do */}
    <Section className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl">
       <div className="grid lg:grid-cols-2 gap-16">
         <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Heart className="w-8 h-8 text-purple-500" /> How We Help
            </h2>
            <ul className="space-y-6">
              {[
                "Responsive websites that look premium and convert clients",
                "SEO foundations to rank on Google and bring in customers",
                "Social media systems that keep their brand active",
                "Automation that saves hours of time each week",
                "Monthly support so your site never becomes “outdated” again"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 font-medium pt-1">{item}</span>
                </li>
              ))}
            </ul>
         </div>
         <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-purple-500" /> What We Do
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Monitor, title: "Web Design", desc: "Clean, modern, mobile-first websites built to convert." },
                { icon: Search, title: "SEO & Growth", desc: "Basic to advanced SEO strategies that help you get found." },
                { icon: Layout, title: "Social & Brand", desc: "Content, branding kits, templates, and assets." },
                { icon: Zap, title: "Automation", desc: "CRM setup, lead tracking, automated follow-ups." },
                { icon: Server, title: "Management", desc: "Changes, updates, maintenance, monitoring, security." },
                { icon: Clock, title: "Fast Turnaround", desc: "Most builds delivered within 7–14 days." }
              ].map((service, i) => (
                 <div key={i} className="flex flex-col gap-3 p-5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
                    <div className="text-purple-600"><service.icon className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold mb-1">{service.title}</h4>
                      <p className="text-sm text-slate-500 leading-snug">{service.desc}</p>
                    </div>
                 </div>
              ))}
            </div>
         </div>
       </div>
    </Section>

    {/* 4. Why Australians Choose Us */}
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Australians Choose Us 🇦🇺</h2>
        <p className="text-slate-500">Built for the local market, with local values.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: MessageCircle, title: "Local Support", desc: "We operate on Aussie time, answer fast, and communicate clearly." },
          { icon: DollarSignIcon, title: "Fixed Pricing", desc: "No hidden fees, no surprises — just predictable monthly plans." }, // Placeholder icon
          { icon: Zap, title: "Fast Delivery", desc: "Most sites are delivered in 1–2 weeks, not months." },
          { icon: Users, title: "Real Humans", desc: "No overseas call centres. You speak directly to the person doing the work." },
          { icon: Heart, title: "Small Biz Friendly", desc: "We understand Aussie small business culture — trust, fairness, straight talk." },
          { icon: Shield, title: "Secure & Reliable", desc: "Australian hosting partners, fast load times, and security monitoring." }
        ].map((item, i) => (
          <Card key={i} className="text-center hover:scale-105">
             <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
               <item.icon className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-lg mb-2">{item.title}</h3>
             <p className="text-sm text-slate-500">{item.desc}</p>
          </Card>
        ))}
      </div>
    </Section>

    {/* 5. Industries */}
    <Section className="bg-slate-900 text-white rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-purple-600/20 blur-3xl rounded-full pointer-events-none"></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-10 text-center">Industries We Support</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {[
             { icon: Hammer, name: "Trades" },
             { icon: Heart, name: "Health" },
             { icon: ShoppingBag, name: "Retail" },
             { icon: Utensils, name: "Hospitality" },
             { icon: BookOpen, name: "Education" },
             { icon: Briefcase, name: "Services" }
           ].map((ind, i) => (
             <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-white/20 transition-colors cursor-default">
               <ind.icon className="w-8 h-8 text-purple-300" />
               <span className="font-medium text-sm">{ind.name}</span>
             </div>
           ))}
        </div>
      </div>
    </Section>

    {/* 6. Process */}
    <Section>
       <h2 className="text-3xl font-bold mb-12 text-center">Our Simple Process</h2>
       <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {[
            { step: "01", title: "Discovery Call", desc: "We learn what you need, your goals, and how your business works." },
            { step: "02", title: "Custom Preview", desc: "We design a homepage preview so you can visualise everything before we build." },
            { step: "03", title: "Dev & Setup", desc: "We build your pages, SEO, mobile responsiveness and connect all systems." },
            { step: "04", title: "Revisions", desc: "You request changes. We refine until you’re ready to launch." },
            { step: "05", title: "Launch", desc: "Your website goes live. We handle hosting, setup, security, and monitoring." },
            { step: "06", title: "Monthly Support", desc: "You focus on your business. We handle updates, changes, SEO and content." }
          ].map((item, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon/Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-hover:bg-purple-500 group-hover:text-white text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xs transition-colors">
                {item.step}
              </div>
              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                 <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">{item.title}</h3>
                 <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
       </div>
    </Section>

    {/* 7. Extra Elements (Stats & Tech) */}
    <Section className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-6">Build50 by the Numbers</h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Avg Build Time", val: "10 Days", icon: CalendarIcon },
              { label: "Response Time", val: "< 2 Hrs", icon: Clock },
              { label: "Client Renewal", val: "90%+", icon: TrendingUp },
              { label: "Aussie Owned", val: "100%", icon: Star }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <div className="text-purple-600 mb-2"><stat.icon className="w-5 h-5"/></div>
                <div className="text-2xl font-bold mb-1">{stat.val}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
           <h2 className="text-2xl font-bold mb-6">Built on Modern Tech</h2>
           <p className="text-slate-600 dark:text-slate-400 mb-6">We don't use slow, insecure builders. We use the same stack as major tech companies for speed and reliability.</p>
           <div className="flex flex-wrap gap-3">
             {['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'TypeScript', 'Framer Motion', 'Shopify'].map(tech => (
               <span key={tech} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300">
                 {tech}
               </span>
             ))}
           </div>
        </div>
      </div>
    </Section>

    {/* CTA */}
    <Section className="text-center py-20">
       <h2 className="text-4xl font-bold mb-4">Ready to grow your business?</h2>
       <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto">Let’s build your website in the next 7 days. Book your free 20-minute strategy session.</p>
       <div className="flex flex-col sm:flex-row justify-center gap-4">
         <Button onClick={() => setPage('book')}>Book a Call</Button>
         <Button variant="outline" onClick={() => window.open('https://wa.me/61400123456')}>Message on WhatsApp</Button>
       </div>
    </Section>

  </motion.div>
);

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', package: 'Growth', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', package: 'Growth', message: '' });
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-12">
      <Section className="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold mb-6">Let's Talk</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Ready to grow your business? Fill out the form or use the quick links below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold">WhatsApp Us</div>
                  <div className="text-sm text-slate-500">+61 400 123 456</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold">Email Us</div>
                  <div className="text-sm text-slate-500">hello@build50.com</div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
               <h3 className="font-bold mb-2">Office Hours</h3>
               <p className="text-sm text-slate-500">Mon-Fri: 9am - 5pm (AEST)</p>
               <p className="text-sm text-slate-500">Melbourne, Australia</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-lg">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-6">We'll get back to you within 24 hours.</p>
                <Button onClick={() => setStatus('idle')} variant="outline">Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Interested Package</label>
                  <select 
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                    value={formState.package}
                    onChange={e => setFormState({...formState, package: e.target.value})}
                  >
                    {PACKAGES.map(p => <option key={p.name} value={p.name}>{p.name} ({p.price})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </motion.div>
  );
};

const Book = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-12">
    <Section className="text-center max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Book a Free Consult</h1>
      <div className="bg-white dark:bg-slate-800 h-[600px] rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg">
        <div className="text-center p-8">
           <p className="text-slate-500 mb-4">[Calendly Embed Widget Placeholder]</p>
           <Button>Open Calendly Popup</Button>
           <p className="text-xs text-slate-400 mt-4">Simulating 3rd party iframe load...</p>
        </div>
      </div>
    </Section>
  </motion.div>
);

const Privacy = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-12">
    <Section className="max-w-3xl prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p><strong>Last updated:</strong> November 26, 2025</p>
      
      <h3>1. Introduction</h3>
      <p>Build50 ("we", "us", "our") respects your privacy. This policy explains what personal data we collect, how we use it, and your rights.</p>
      
      <h3>2. Information we collect</h3>
      <p>Contact information you provide (name, email, phone, business name) when using our contact or booking forms. Usage data collected via server logs and analytics.</p>
      
      <h3>3. How we use your data</h3>
      <ul>
        <li>To respond to enquiries and provide services.</li>
        <li>To send transactional emails.</li>
        <li>To improve and secure our site.</li>
      </ul>

      <h3>Contact</h3>
      <p>hello@build50.com</p>
    </Section>
  </motion.div>
);

// --- Layout & Main App ---

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
)

const DollarSignIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
)

export default function App() {
  const [page, setPage] = useState<PageType>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);

  useEffect(() => {
    // Check local storage for theme
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else {
      setTheme('dark'); // Default to dark as per spec
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const navLinks: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold cursor-pointer flex items-center gap-3" onClick={() => setPage('home')}>
             <BrandLogo className="w-10 h-10" />
             <span className="tracking-tight">Build50</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => setPage(link.id)}
                className={`text-sm font-medium hover:text-purple-600 transition-colors ${page === link.id ? 'text-purple-600' : 'text-slate-600 dark:text-slate-300'}`}
              >
                {link.label}
              </button>
            ))}
            <Button onClick={() => setPage('book')} className="text-sm py-2 px-4">Book Now</Button>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map(link => (
                  <button 
                    key={link.id}
                    onClick={() => { setPage(link.id); setMobileMenuOpen(false); }}
                    className="text-lg font-medium text-left"
                  >
                    {link.label}
                  </button>
                ))}
                <Button onClick={() => { setPage('book'); setMobileMenuOpen(false); }} className="w-full">Book Consult</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {page === 'home' && <Home key="home" setPage={setPage} />}
          {page === 'services' && <Services key="services" setPage={setPage} />}
          {page === 'portfolio' && <Portfolio key="portfolio" setPage={setPage} />}
          {page === 'about' && <About key="about" setPage={setPage} />}
          {page === 'contact' && <Contact key="contact" />}
          {page === 'book' && <Book key="book" />}
          {page === 'privacy' && <Privacy key="privacy" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-xl font-bold mb-4 flex items-center gap-2">
              <BrandLogo className="w-8 h-8" />
              Build50
            </div>
            <p className="text-slate-500 text-sm mb-4">
              Modern websites & branding that convert. Built for small businesses.
            </p>
            <div className="flex gap-4 text-slate-400">
               <Instagram className="w-5 h-5 hover:text-purple-500 cursor-pointer" />
               <Linkedin className="w-5 h-5 hover:text-purple-500 cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Web Design</li>
              <li>Branding</li>
              <li>Automation</li>
              <li>SEO Management</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="cursor-pointer hover:text-purple-600" onClick={() => setPage('about')}>About Us</li>
              <li className="cursor-pointer hover:text-purple-600" onClick={() => setPage('portfolio')}>Portfolio</li>
              <li className="cursor-pointer hover:text-purple-600" onClick={() => setPage('contact')}>Contact</li>
              <li className="cursor-pointer hover:text-purple-600" onClick={() => setPage('privacy')}>Privacy Policy</li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold mb-4">Get Started</h4>
             <Button className="w-full mb-2 text-sm" onClick={() => setPage('book')}>Book Free Consult</Button>
             <p className="text-xs text-slate-500 text-center">No credit card required.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-400">
          © 2025 Build50. All rights reserved.
        </div>
      </footer>

      {/* Floating Elements */}
      <a 
        href="https://wa.me/61400123456?text=Hi%20Build50%2C%20I%20want%20a%20website..."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* Cookie Banner */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              We use cookies to improve your experience and analyze traffic.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setCookieAccepted(true)} className="text-sm font-medium hover:underline">Manage</button>
              <Button onClick={() => setCookieAccepted(true)} className="py-2 px-4 text-sm">Accept</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
