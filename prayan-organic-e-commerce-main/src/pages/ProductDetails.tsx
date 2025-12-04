import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Minus, ArrowLeft, Leaf, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import ProductCard from '@/components/products/ProductCard';
import { cn } from '@/lib/utils';

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const [selectedWeight, setSelectedWeight] = useState(product?.weights[0] || '100g');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'nutrition'>('description');
  const { addToCart, getWeightMultiplier } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const price = Math.round(product.price * getWeightMultiplier(selectedWeight));
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} (${selectedWeight}) added to your cart`,
    });
  };

  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Image */}
          <div className="glass-card p-4 md:p-8">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground">SKU: {product.sku}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">₹{price}</span>
              <span className="text-muted-foreground">/ {selectedWeight}</span>
            </div>

            {/* Weight Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Select Weight</label>
              <div className="flex gap-3">
                {product.weights.map(weight => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={cn(
                      "px-6 py-3 rounded-lg font-medium transition-all duration-200 border-2",
                      selectedWeight === weight
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border-2 border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <Button variant="hero" size="xl" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: Leaf, text: 'Organic' },
                { icon: Shield, text: 'Quality Tested' },
                { icon: Truck, text: 'Fast Delivery' },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex border-b border-border mb-6">
            {(['description', 'ingredients', 'nutrition'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3 font-medium capitalize transition-colors relative",
                  activeTab === tab
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="glass-card p-6 md:p-8">
            {activeTab === 'description' && (
              <p className="text-foreground/80 leading-relaxed">{product.longDescription}</p>
            )}
            {activeTab === 'ingredients' && (
              <p className="text-foreground/80 leading-relaxed">{product.ingredients}</p>
            )}
            {activeTab === 'nutrition' && (
              <p className="text-foreground/80 leading-relaxed">{product.nutrition}</p>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
