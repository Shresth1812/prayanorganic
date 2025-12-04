import { Leaf, Shield, Truck, Award, Heart, Recycle } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'All our spices are certified organic, grown without pesticides or chemicals',
    color: 'text-coriander',
    bg: 'bg-coriander/10',
  },
  {
    icon: Shield,
    title: 'Quality Tested',
    description: 'Every batch undergoes rigorous testing for purity and freshness',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Truck,
    title: 'Farm to Kitchen',
    description: 'Direct sourcing ensures maximum freshness and authentic taste',
    color: 'text-chili',
    bg: 'bg-chili/10',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-selected spices from the finest growing regions of India',
    color: 'text-turmeric',
    bg: 'bg-turmeric/10',
  },
  {
    icon: Heart,
    title: 'Health Benefits',
    description: 'Rich in antioxidants and natural compounds for wellness',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: Recycle,
    title: 'Eco-Friendly',
    description: 'Sustainable packaging that cares for our planet',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Why Prayan Organic
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            The Prayan Promise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to bringing you the purest, most flavorful spices while supporting sustainable farming practices
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-card p-6 hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
