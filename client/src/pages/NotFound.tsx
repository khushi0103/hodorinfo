import { Link } from 'wouter';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="flex-1 flex items-center justify-center py-20">
        <div className="container text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-blue to-cyan-accent mb-4">
              404
            </h1>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <a className="px-8 py-3 bg-gradient-to-r from-slate-blue to-cyan-accent text-off-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                Go Home <ArrowRight size={20} />
              </a>
            </Link>
            <Link href="/services">
              <a className="px-8 py-3 border-2 border-slate-blue text-slate-blue font-semibold rounded-lg hover:bg-slate-blue/10 transition-colors flex items-center justify-center gap-2">
                Explore Services <ArrowRight size={20} />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
