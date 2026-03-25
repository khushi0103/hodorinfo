import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-blue/5 to-background">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-blue to-cyan-accent">Touch</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl">
            Have questions about our services? Let's start a conversation about transforming your industry.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-display font-bold mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-slate-blue to-cyan-accent">
                      <Mail className="h-6 w-6 text-off-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Email</h3>
                    <a href="mailto:info@hodorinfo.com" className="text-foreground/70 hover:text-cyan-accent transition-colors">
                      info@hodorinfo.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-slate-blue to-cyan-accent">
                      <Phone className="h-6 w-6 text-off-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Phone</h3>
                    <a href="tel:+1234567890" className="text-foreground/70 hover:text-cyan-accent transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-slate-blue to-cyan-accent">
                      <MapPin className="h-6 w-6 text-off-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Address</h3>
                    <p className="text-foreground/70">
                      Global Headquarters<br />
                      Innovation Hub, Tech City<br />
                      Digital District
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12 pt-12 border-t border-border">
                <h3 className="font-display font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/services" className="text-foreground/70 hover:text-cyan-accent transition-colors">
                      View Services
                    </a>
                  </li>
                  <li>
                    <a href="/industries" className="text-foreground/70 hover:text-cyan-accent transition-colors">
                      Explore Industries
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-foreground/70 hover:text-cyan-accent transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="https://blog.hodorinfo.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-cyan-accent transition-colors">
                      Read Our Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-accent transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-accent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-accent transition-all"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold mb-2">
                        Service of Interest *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-accent transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="enterprise-software">Enterprise Software</option>
                        <option value="ai-ml">AI & Machine Learning</option>
                        <option value="drone-tech">Drone Technology</option>
                        <option value="cybersecurity">Cybersecurity</option>
                        <option value="data-science">Data Science</option>
                        <option value="digital-transformation">Digital Transformation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-accent transition-all resize-none"
                      placeholder="Tell us about your project and how we can help..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-slate-blue to-cyan-accent text-off-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={20} />
                  </button>
                </form>

                <p className="text-sm text-foreground/60 mt-4">
                  * Required fields. We'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-blue to-slate-blue/80">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-off-white mb-6">
            Let's Start Your Transformation Journey
          </h2>
          <p className="text-lg text-off-white/90 mb-8 max-w-2xl mx-auto">
            Whether you have questions or are ready to begin, our team is here to help you succeed.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
