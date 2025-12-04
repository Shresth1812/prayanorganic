import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 animate-fade-up">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">100% Organic & Pure</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Discover the
              <span className="block bg-gradient-to-r from-primary via-secondary to-chili bg-clip-text text-transparent">Essence of India</span>
              in Every Spice
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Premium organic spices sourced directly from Indian farms. Experience authentic flavors that transform every meal into a culinary masterpiece.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/shop">
                <Button variant="hero" size="xl">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="xl">
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {[
                { icon: Leaf, text: 'Certified Organic' },
                { icon: Shield, text: 'Quality Tested' },
                { icon: Sparkles, text: 'Farm Fresh' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground">
                  <badge.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-pulse-glow" />
              
              {/* Spice Circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
                <div className="w-full h-full rounded-full border-2 border-dashed border-primary/30 animate-[spin_20s_linear_infinite]">
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <div
                      key={i}
                      className="absolute w-16 h-16 rounded-full shadow-lg"
                      style={{
                        background: ['hsl(var(--turmeric))', 'hsl(var(--chili))', 'hsl(var(--coriander))', 'hsl(var(--cumin))', 'hsl(var(--ginger))', 'hsl(var(--primary))'][i],
                        top: `${50 - 45 * Math.cos(deg * Math.PI / 180)}%`,
                        left: `${50 + 45 * Math.sin(deg * Math.PI / 180)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Center Logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-card shadow-card flex items-center justify-center">
                <div className="text-center">
                  <Leaf className="w-10 h-10 text-primary mx-auto" />
                  <span className="font-heading text-sm font-bold">Prayan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
