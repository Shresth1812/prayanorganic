import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getWeightMultiplier, clearCart } = useCart();

  const handleCheckout = () => {
    toast({
      title: "Choose Payment",
      description: "Select Cash on Delivery or Pay via UPI (Razorpay).",
    });
  };

  const handleCOD = () => {
    // Simulate placing order for COD
    toast({ title: 'Order placed', description: 'Your order has been placed (Cash on Delivery).' });
    clearCart();
  };

  const handleRazorpay = async () => {
    try {
      const amount = Math.round(getTotalPrice()); // in rupees
      const resp = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!resp.ok) {
        const err = await resp.json();
        toast({ title: 'Payment Error', description: err?.error || 'Failed to create payment order.' });
        return;
      }

      const data = await resp.json();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Prayan Organic',
        description: 'Order Payment',
        order_id: data.id,
        handler: function (response: any) {
          // Successful payment
          toast({ title: 'Payment Successful', description: 'Thank you! Your payment was successful.' });
          clearCart();
        },
        modal: {
          ondismiss: function () {
            toast({ title: 'Payment Dismissed', description: 'You dismissed the payment window.' });
          },
        },
      } as any;

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
      script.onload = () => {
        const Razorpay = (window as any).Razorpay;
        if (!Razorpay) {
          toast({ title: 'Payment Error', description: 'Razorpay SDK failed to load.' });
          return;
        }
        const rzp = new Razorpay(options);
        rzp.open();
      };
    } catch (error) {
      console.error(error);
      toast({ title: 'Payment Error', description: 'Unexpected error while initiating payment.' });
    }
  };

  if (items.length === 0) {
    return (
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any spices yet. Start shopping to fill your cart with amazing flavors!
            </p>
            <Link to="/shop">
              <Button variant="hero" size="lg">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const price = Math.round(item.product.price * getWeightMultiplier(item.weight));
              const totalPrice = price * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.weight}`}
                  className="glass-card p-4 md:p-6 flex flex-col sm:flex-row gap-4 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Weight: {item.weight}</p>
                      <p className="text-sm text-muted-foreground">₹{price} each</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.weight, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.weight, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Total */}
                      <span className="font-semibold text-foreground w-20 text-right">
                        ₹{totalPrice}
                      </span>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.weight)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto">
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{Math.round(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-accent">Free</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-foreground font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{Math.round(getTotalPrice())}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="hero" size="lg" className="w-full" onClick={handleRazorpay}>
                  Pay with UPI (Razorpay)
                </Button>

                <Button variant="outline" size="lg" className="w-full" onClick={handleCOD}>
                  Cash On Delivery
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-2">
                  Secure checkout powered by industry-standard encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
