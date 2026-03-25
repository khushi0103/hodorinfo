import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Truck, Leaf, Heart, Factory, ShoppingCart, Zap, CreditCard, Shield } from 'lucide-react';

export default function Industries() {
  const industries = [
    {
      id: 1,
      icon: Truck,
      title: 'Logistics & Supply Chain',
      description: 'End-to-end automation, real-time tracking, and predictive optimization for global supply chains.',
      solutions: [
        'Transport Management Systems',
        'Real-time Fleet Tracking',
        'Predictive Route Optimization',
        'Inventory Management Automation',
      ],
      color: 'from-blue-500 to-cyan-400',
    },
    {
      id: 2,
      icon: Leaf,
      title: 'Agriculture',
      description: 'AI-driven farming, drone monitoring, yield optimization, and sustainable resource management.',
      solutions: [
        'AI-Powered Crop Optimization',
        'Drone Agricultural Monitoring',
        'Predictive Yield Analysis',
        'Smart Irrigation Systems',
      ],
      color: 'from-green-500 to-emerald-400',
    },
    {
      id: 3,
      icon: Heart,
      title: 'Healthcare',
      description: 'Digital health platforms, patient management, diagnostic AI, and workflow automation.',
      solutions: [
        'Patient Management Systems',
        'AI Diagnostic Tools',
        'Healthcare Data Analytics',
        'Telemedicine Platforms',
      ],
      color: 'from-red-500 to-pink-400',
    },
    {
      id: 4,
      icon: Factory,
      title: 'Manufacturing',
      description: 'Quality control automation, predictive maintenance, and production optimization.',
      solutions: [
        'Predictive Maintenance Systems',
        'Quality Control Automation',
        'Production Optimization',
        'IoT Integration',
      ],
      color: 'from-orange-500 to-yellow-400',
    },
    {
      id: 5,
      icon: ShoppingCart,
      title: 'Retail & E-commerce',
      description: 'Inventory optimization, demand forecasting, and customer analytics.',
      solutions: [
        'Inventory Optimization',
        'Demand Forecasting',
        'Customer Analytics',
        'Personalization Engines',
      ],
      color: 'from-purple-500 to-pink-400',
    },
    {
      id: 6,
      icon: Zap,
      title: 'Energy & Utilities',
      description: 'Grid optimization, predictive maintenance, and resource management.',
      solutions: [
        'Smart Grid Optimization',
        'Predictive Maintenance',
        'Energy Consumption Analytics',
        'Renewable Integration',
      ],
      color: 'from-yellow-500 to-amber-400',
    },
    {
      id: 7,
      icon: CreditCard,
      title: 'Finance & Banking',
      description: 'Risk analytics, fraud detection, automated compliance, and data security.',
      solutions: [
        'Risk Analytics Platforms',
        'Fraud Detection Systems',
        'Compliance Automation',
        'Financial Data Security',
      ],
      color: 'from-indigo-500 to-blue-400',
    },
    {
      id: 8,
      icon: Shield,
      title: 'Government & Defense',
      description: 'Surveillance systems, data analytics, cybersecurity, and operational efficiency.',
      solutions: [
        'Surveillance Systems',
        'Data Analytics Platforms',
        'Cybersecurity Solutions',
        'Operational Intelligence',
      ],
      color: 'from-slate-500 to-gray-400',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-blue/5 to-background">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-blue to-cyan-accent">Transform</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl">
            From logistics to government, we bring digital innovation and next-level technology to every sector.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.id}
                  className="group p-8 bg-card border border-border rounded-xl hover:shadow-xl hover:border-cyan-accent transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${industry.color} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  <h3 className="text-2xl font-display font-semibold mb-3">{industry.title}</h3>
                  <p className="text-foreground/70 mb-6">{industry.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-slate-blue dark:text-cyan-accent mb-3">Solutions:</h4>
                    <ul className="space-y-2">
                      {industry.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-accent mt-1.5 flex-shrink-0"></div>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/contact">
                    <a className="text-cyan-accent font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm">
                      Explore <ArrowRight size={16} />
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose HodorInfo */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Why Choose HodorInfo?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We don't just build technology—we transform industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Industry Expertise',
                description: 'Deep understanding of vertical-specific challenges and opportunities across all sectors.',
              },
              {
                title: 'Technology Integration',
                description: 'Seamless combination of AI, drones, cybersecurity, and data science.',
              },
              {
                title: 'Next-Level Innovation',
                description: 'Not incremental improvements—we fundamentally transform how industries operate.',
              },
              {
                title: 'End-to-End Solutions',
                description: 'From strategy and consulting to implementation, deployment, and optimization.',
              },
              {
                title: 'Security First',
                description: 'Built-in cybersecurity and data protection across all solutions.',
              },
              {
                title: 'Scalability',
                description: 'Solutions designed to grow with your business, from startups to enterprises.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-card border border-border rounded-lg hover:border-cyan-accent transition-colors">
                <h3 className="text-xl font-display font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-blue to-slate-blue/80">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-off-white mb-6">
            Let's Transform Your Industry
          </h2>
          <p className="text-lg text-off-white/90 mb-8 max-w-2xl mx-auto">
            Discover how HodorInfo can revolutionize your business with next-level technology solutions tailored to your industry.
          </p>
          <Link href="/contact">
            <a className="inline-block px-8 py-3 bg-cyan-accent text-slate-blue font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get in Touch
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
