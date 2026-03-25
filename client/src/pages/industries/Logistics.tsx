import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, TrendingUp, Zap, Shield, BarChart3 } from 'lucide-react';

export default function Logistics() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#1a2a4a]/5 to-background">
        <div className="container">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full">
              <span className="text-[#00d4ff] font-semibold text-sm">Industry Spotlight</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Logistics & Supply Chain
            </h1>
            <p className="text-xl text-foreground/70">
              Revolutionizing global supply chains through complete automation, real-time tracking, and AI-driven optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Current Challenges */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl font-display font-bold mb-12">Current Industry Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Fragmented Systems',
                description: 'Multiple disconnected platforms for inventory, shipping, and tracking create data silos and inefficiencies.',
              },
              {
                title: 'Manual Processes',
                description: 'Paper-based documentation and manual data entry lead to errors, delays, and increased operational costs.',
              },
              {
                title: 'Visibility Gaps',
                description: 'Lack of real-time tracking visibility across the supply chain creates uncertainty and customer dissatisfaction.',
              },
              {
                title: 'Demand Forecasting',
                description: 'Inaccurate demand predictions lead to overstocking or stockouts, tying up capital or losing sales.',
              },
              {
                title: 'Rising Costs',
                description: 'Fuel, labor, and operational costs continue to rise without corresponding efficiency improvements.',
              },
              {
                title: 'Last-Mile Complexity',
                description: 'Final delivery mile remains expensive and inefficient, especially for e-commerce and urban logistics.',
              },
            ].map((challenge, idx) => (
              <div key={idx} className="p-6 bg-card border border-border rounded-lg">
                <h3 className="text-xl font-display font-semibold mb-3">{challenge.title}</h3>
                <p className="text-foreground/70">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Transformation Solutions */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-display font-bold mb-12">Digital Transformation Solutions</h2>
          
          <div className="space-y-16">
            {[
              {
                title: 'Transport Management System (TMS)',
                description: 'End-to-end platform for route optimization, fleet management, and shipment tracking.',
                benefits: [
                  'Real-time visibility across entire supply chain',
                  'Automated route optimization reducing fuel costs by 15-20%',
                  'Seamless integration with existing systems',
                  'Mobile app for drivers and dispatchers',
                ],
                icon: TrendingUp,
              },
              {
                title: 'AI-Powered Demand Forecasting',
                description: 'Machine learning models predict demand patterns with unprecedented accuracy.',
                benefits: [
                  'Reduce inventory holding costs by 20-30%',
                  'Minimize stockouts and lost sales',
                  'Optimize warehouse space utilization',
                  'Improve cash flow management',
                ],
                icon: BarChart3,
              },
              {
                title: 'IoT & Real-Time Tracking',
                description: 'Connected devices and sensors provide complete visibility of shipments and assets.',
                benefits: [
                  'Track shipments in real-time with GPS and sensors',
                  'Monitor temperature and humidity for sensitive goods',
                  'Reduce theft and loss through continuous monitoring',
                  'Provide customers with accurate delivery windows',
                ],
                icon: Zap,
              },
              {
                title: 'Cybersecurity & Data Protection',
                description: 'Secure supply chain data against growing cyber threats.',
                benefits: [
                  'Protect sensitive shipment and customer data',
                  'Ensure compliance with industry regulations',
                  'Prevent supply chain disruptions from cyber attacks',
                  'Build customer trust through security',
                ],
                icon: Shield,
              },
            ].map((solution, idx) => {
              const Icon = solution.icon;
              return (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  {idx % 2 === 0 ? (
                    <>
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#1a2a4a] to-[#00d4ff] rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#f8f9fa]" />
                          </div>
                          <h3 className="text-2xl font-display font-bold">{solution.title}</h3>
                        </div>
                        <p className="text-lg text-foreground/70 mb-6">{solution.description}</p>
                        <ul className="space-y-3">
                          {solution.benefits.map((benefit, bidx) => (
                            <li key={bidx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#00d4ff] mt-2 flex-shrink-0"></div>
                              <span className="text-foreground/80">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-[#1a2a4a]/10 to-[#00d4ff]/10 rounded-lg h-64 flex items-center justify-center">
                        <p className="text-center text-foreground/50">Visual Asset</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gradient-to-br from-[#1a2a4a]/10 to-[#00d4ff]/10 rounded-lg h-64 flex items-center justify-center">
                        <p className="text-center text-foreground/50">Visual Asset</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#1a2a4a] to-[#00d4ff] rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#f8f9fa]" />
                          </div>
                          <h3 className="text-2xl font-display font-bold">{solution.title}</h3>
                        </div>
                        <p className="text-lg text-foreground/70 mb-6">{solution.description}</p>
                        <ul className="space-y-3">
                          {solution.benefits.map((benefit, bidx) => (
                            <li key={bidx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#00d4ff] mt-2 flex-shrink-0"></div>
                              <span className="text-foreground/80">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Trends & Opportunities */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl font-display font-bold mb-12">Future Trends & Opportunities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                year: '2026-2027',
                trend: 'Autonomous Delivery Networks',
                description: 'Widespread adoption of autonomous vehicles and drones for last-mile delivery, reducing costs and environmental impact.',
              },
              {
                year: '2027-2028',
                trend: 'Blockchain Supply Chain',
                description: 'Immutable ledgers for supply chain transparency, enabling real-time verification of product authenticity and origin.',
              },
              {
                year: '2028-2029',
                trend: 'Predictive Supply Chain',
                description: 'AI systems that anticipate disruptions and automatically adjust supply chains, minimizing delays and costs.',
              },
              {
                year: '2029-2030',
                trend: 'Sustainable Logistics',
                description: 'Carbon-neutral supply chains through electric vehicles, renewable energy, and optimized routing.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-card border border-border rounded-lg hover:border-[#00d4ff] transition-colors">
                <div className="text-sm font-semibold text-[#00d4ff] mb-2">{item.year}</div>
                <h3 className="text-xl font-display font-bold mb-3">{item.trend}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#1a2a4a] to-[#1a2a4a]/80 rounded-xl p-12 text-[#f8f9fa]">
            <h3 className="text-2xl font-display font-bold mb-4">The Opportunity</h3>
            <p className="text-lg mb-6">
              Companies that embrace digital transformation in logistics will gain significant competitive advantages: 30-40% reduction in operational costs, 50% improvement in delivery speed, and 99.9% supply chain visibility. The future belongs to those who can seamlessly integrate AI, automation, and real-time data to create intelligent, responsive supply chains.
            </p>
            <p className="text-lg">
              HodorInfo is ready to help you build that future. Our comprehensive solutions transform traditional logistics into intelligent, autonomous networks that drive profitability and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1a2a4a] to-[#1a2a4a]/80">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#f8f9fa] mb-6">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-lg text-[#f8f9fa]/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how HodorInfo can help you build a smarter, faster, more efficient supply chain.
          </p>
          <Link href="/contact">
            <a className="inline-block px-8 py-3 bg-[#00d4ff] text-[#1a2a4a] font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Schedule a Consultation
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
