import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Specialized Enterprise Software',
      description: 'Next-generation platforms designed to automate and optimize complex business processes.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026809090/hnrrSqkFZFAiwHyMRLF6Qv/hodor-digital-transformation-9xw8LNjibvKxbkH78aXqCS.webp',
      features: [
        'Transport Management Systems (TMS)',
        'AgriTech Platforms',
        'Healthcare Technology Solutions',
        'Industry-Specific Custom Solutions',
      ],
      benefits: [
        'Complete supply chain automation',
        'Real-time tracking and optimization',
        'Seamless integration with existing systems',
        'Scalable architecture for enterprise growth',
      ],
    },
    {
      id: 2,
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Deploy intelligent agents and ML models to automate decision-making and predictive analytics.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026809090/hnrrSqkFZFAiwHyMRLF6Qv/hodor-ai-intelligence-BC5mfWGCt2gGbLZ3LaevSj.webp',
      features: [
        'Predictive Analytics',
        'AI Agents & Automation',
        'Natural Language Processing',
        'Computer Vision Solutions',
      ],
      benefits: [
        'Automated decision-making',
        'Accurate forecasting',
        'Reduced operational costs',
        'Intelligent process optimization',
      ],
    },
    {
      id: 3,
      title: 'Drone Technology & Aerial Solutions',
      description: 'Design, deploy, and manage drone systems for industrial applications and data collection.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026809090/hnrrSqkFZFAiwHyMRLF6Qv/hodor-drone-tech-cXLqpBh6CFrmEmWrfRxrcv.webp',
      features: [
        'Agricultural Monitoring',
        'Infrastructure Inspection',
        'Delivery & Logistics Drones',
        'Environmental Monitoring',
      ],
      benefits: [
        'Real-time aerial data collection',
        'Reduced inspection costs',
        'Improved safety and efficiency',
        'Advanced mapping and surveying',
      ],
    },
    {
      id: 4,
      title: 'Cybersecurity & Aerospace Protection',
      description: 'Specialized security solutions for drones, satellites, and critical aerospace systems.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026809090/hnrrSqkFZFAiwHyMRLF6Qv/hodor-cybersecurity-k6Bx7KGhFacwDFQVD3y2cF.webp',
      features: [
        'Drone Communication Security',
        'Anti-Drone Systems',
        'Satellite Network Protection',
        'Threat Detection & Response',
      ],
      benefits: [
        'Advanced threat protection',
        'Encrypted communications',
        'Real-time threat monitoring',
        'Compliance with aerospace standards',
      ],
    },
    {
      id: 5,
      title: 'Data Science & Advanced Analytics',
      description: 'Extract insights and drive decisions with advanced analytics and data engineering.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026809090/hnrrSqkFZFAiwHyMRLF6Qv/hodor-data-analytics-edcfimtRkqauNrxXckQK6x.webp',
      features: [
        'Predictive Modeling',
        'Data Pipeline Engineering',
        'Business Intelligence',
        'Real-Time Analytics',
      ],
      benefits: [
        'Data-driven decision making',
        'Actionable insights',
        'Improved business intelligence',
        'Scalable data infrastructure',
      ],
    },
    {
      id: 6,
      title: 'Digital Transformation Consulting',
      description: 'Guide organizations through comprehensive modernization and technology integration.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026809090/hnrrSqkFZFAiwHyMRLF6Qv/hodor-digital-transformation-9xw8LNjibvKxbkH78aXqCS.webp',
      features: [
        'Digital Strategy Development',
        'Legacy System Modernization',
        'Cloud Migration',
        'Change Management',
      ],
      benefits: [
        'Clear transformation roadmap',
        'Reduced technical debt',
        'Improved operational efficiency',
        'Future-proof infrastructure',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-blue/5 to-background">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-blue to-cyan-accent">Services</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl">
            Six interconnected technology pillars enabling industry transformation across all sectors.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          {services.map((service, index) => (
            <div key={service.id} className={`mb-24 ${index % 2 === 1 ? 'flex flex-col-reverse md:flex-row' : 'flex flex-col md:flex-row'} gap-12 items-center`}>
              {/* Content */}
              <div className="flex-1">
                <div className="inline-block mb-4 px-4 py-2 bg-cyan-accent/10 border border-cyan-accent/30 rounded-full">
                  <span className="text-cyan-accent font-semibold text-sm">Service {service.id}</span>
                </div>
                <h2 className="text-4xl font-display font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-foreground/70 mb-8">{service.description}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-display font-semibold text-lg mb-4 text-slate-blue dark:text-cyan-accent">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-cyan-accent mt-2 flex-shrink-0"></div>
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-lg mb-4 text-slate-blue dark:text-cyan-accent">Benefits</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-gold-accent mt-2 flex-shrink-0"></div>
                          <span className="text-foreground/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href="/contact">
                  <a className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-blue to-cyan-accent text-off-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Learn More <ArrowRight size={20} />
                  </a>
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1">
                <div className="relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-blue/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-blue to-slate-blue/80">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-off-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-off-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss which services are right for your business and how we can help you transform your industry.
          </p>
          <Link href="/contact">
            <a className="inline-block px-8 py-3 bg-cyan-accent text-slate-blue font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Schedule a Consultation
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
