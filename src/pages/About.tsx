import { Leaf, Users, Globe, Award, Heart, CheckCircle } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Pure & Organic',
    description: 'We source only 100% organic spices, free from pesticides, chemicals, and artificial additives.',
  },
  {
    icon: Users,
    title: 'Farmer Partnerships',
    description: 'Direct relationships with farmers ensure fair prices and sustainable farming practices.',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Eco-friendly packaging and carbon-neutral shipping to minimize our environmental footprint.',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Every batch is lab-tested for purity, potency, and freshness before reaching you.',
  },
];

const processes = [
  'Hand-selected spices from premium growing regions',
  'Traditional sun-drying methods for maximum flavor',
  'Small-batch grinding to preserve essential oils',
  'Vacuum-sealed packaging for lasting freshness',
  'Lab-tested for purity and contamination',
  'Quality-checked before every shipment',
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Bringing India's Finest Spices to Your Kitchen
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Prayan Organic was born from a simple vision: to share the authentic, 
              pure flavors of India with the world while supporting sustainable farming 
              and empowering local communities.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                From Farm to Your Kitchen
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our journey began in the spice farms of Kerala, Karnataka, and Rajasthan, 
                where generations of farmers have cultivated the world's finest spices using 
                time-honored techniques passed down through centuries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We work directly with over 200 farming families, ensuring they receive fair 
                compensation while maintaining the organic practices that make their spices 
                exceptional. This direct relationship eliminates middlemen and guarantees 
                you receive spices at peak freshness.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every spice in our collection is carefully selected, traditionally processed, 
                and rigorously tested to meet our exacting standards. The result? Spices that 
                transform ordinary meals into extraordinary culinary experiences.
              </p>
            </div>
            <div className="glass-card p-8 space-y-6">
              <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Our Quality Promise
              </h3>
              <ul className="space-y-4">
                {processes.map((process, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{process}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing to packaging to customer service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storage Tips */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-8">
              Storage Tips for Maximum Freshness
            </h2>
            <div className="glass-card p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Keep Cool & Dry', desc: 'Store spices away from heat, moisture, and direct sunlight' },
                  { title: 'Airtight Containers', desc: 'Transfer to glass jars with tight lids after opening' },
                  { title: 'Whole vs Ground', desc: 'Whole spices last longer; grind fresh when possible' },
                  { title: 'Label & Date', desc: 'Mark opening date to track freshness (use within 6-12 months)' },
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full spice-gradient flex items-center justify-center shrink-0 text-primary-foreground font-semibold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
