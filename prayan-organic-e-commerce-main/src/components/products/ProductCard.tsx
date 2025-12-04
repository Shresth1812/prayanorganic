import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getWeightMultiplier } = useCart();

  const price = Math.round(product.price * getWeightMultiplier(selectedWeight));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, selectedWeight, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} (${selectedWeight}) added to your cart`,
    });
    setQuantity(1);
  };

  return (
    <div className="group glass-card overflow-hidden hover-lift">
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-xs font-semibold">{product.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs text-primary font-medium uppercase tracking-wide">
              {product.category}
            </p>
            <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">SKU: {product.sku}</p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>

      {/* Actions */}
      <div className="p-4 pt-0 space-y-3">
        {/* Weight Selector */}
        <div className="flex gap-2">
          {product.weights.map(weight => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={cn(
                "flex-1 py-1.5 text-xs font-medium rounded-md border transition-all duration-200",
                selectedWeight === weight
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              )}
            >
              {weight}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">₹{price}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 hover:bg-muted transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-3 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 hover:bg-muted transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <Button size="icon" onClick={handleAddToCart} className="shrink-0">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
