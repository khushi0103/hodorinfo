import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Lightbulb, Target, Shield, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We push boundaries and embrace emerging technologies to solve tomorrow\'s challenges today.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We deliver premium solutions that exceed expectations and drive measurable impact.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We build trust through transparency, ethical practices, and accountability.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with clients to understand and solve their unique challenges.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-blue/5 to-background">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-blue to-cyan-accent">HodorInfo</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl">
            Transforming industries through next-level technology and digital innovation.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-foreground/80 mb-6">
                To empower industries globally by delivering transformative digital solutions that leverage advanced technologies, enabling businesses to operate smarter, faster, and more securely in an increasingly digital world.
              </p>
              <p className="text-lg text-foreground/80 mb-6">
                We don't just build software—we fundamentally reimagine how industries operate by integrating cutting-edge technologies including AI, drones, cybersecurity, data science, and specialized enterprise solutions.
              </p>
              <Link href="/services">
                <a className="inline-flex items-center gap-2 text-cyan-accent font-semibold hover:gap-3 transition-all">
                  Explore Our Services <ArrowRight size={20} />
                </a>
              </Link>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663026809090/hnrrSqkFZFAiwHyMRLF6Qv/hodor-hero-tech-background-LdQqcCh7PBcqhdmaDGgBHk.webp"
                alt="Mission"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-blue/30 to-transparent"></div>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="bg-secondary/30 rounded-xl p-12 mb-20">
            <h2 className="text-4xl font-display font-bold mb-12 text-center">Our Core Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Enterprise Software',
                  description: 'Next-generation platforms that automate and optimize complex business processes.',
                },
                {
                  title: 'AI & Machine Learning',
                  description: 'Intelligent agents and ML models for automated decision-making and analytics.',
                },
                {
                  title: 'Drone Technology',
                  description: 'Design, deploy, and manage drone systems for industrial applications.',
                },
                {
                  title: 'Cybersecurity',
                  description: 'Specialized protection for drones, satellites, and aerospace systems.',
                },
                {
                  title: 'Data Science',
                  description: 'Advanced analytics and data engineering for actionable insights.',
                },
                {
                  title: 'Digital Transformation',
                  description: 'Comprehensive modernization and technology integration consulting.',
                },
              ].map((competency, idx) => (
                <div key={idx} className="p-6 bg-card rounded-lg border border-border hover:border-cyan-accent transition-colors">
                  <h3 className="text-xl font-display font-semibold mb-3">{competency.title}</h3>
                  <p className="text-foreground/70">{competency.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-slate-blue/5 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Values</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              These principles guide everything we do and how we work with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-slate-blue to-cyan-accent">
                      <Icon className="h-6 w-6 text-off-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">{value.title}</h3>
                    <p className="text-foreground/70">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why HodorInfo */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Why Choose HodorInfo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Industry Expertise',
                description: 'Deep understanding of vertical-specific challenges and opportunities across logistics, agriculture, healthcare, manufacturing, retail, energy, finance, and government sectors.',
              },
              {
                title: 'Technology Integration',
                description: 'Seamless combination of AI, drones, cybersecurity, and data science to create comprehensive, next-level solutions.',
              },
              {
                title: 'Transformative Impact',
                description: 'Not incremental improvements—we fundamentally transform how industries operate, delivering measurable business value.',
              },
              {
                title: 'End-to-End Solutions',
                description: 'From strategy and consulting to implementation, deployment, and ongoing optimization and support.',
              },
              {
                title: 'Security First',
                description: 'Built-in cybersecurity and data protection across all solutions, ensuring compliance and peace of mind.',
              },
              {
                title: 'Scalability',
                description: 'Solutions designed to grow with your business, from startups and SMEs to large enterprises.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-card border border-border rounded-lg hover:shadow-lg hover:border-cyan-accent transition-all">
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
            Ready to Partner with HodorInfo?
          </h2>
          <p className="text-lg text-off-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your industry and drive your business forward.
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
