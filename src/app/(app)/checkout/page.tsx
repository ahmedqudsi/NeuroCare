
"use client";

import { CheckoutForm } from '@/components/features/checkout/CheckoutForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      // If cart is empty, redirect back to cart page or pharma page
      router.push('/healthcare-services/pharma-delivery');
    }
  }, [cartItems, router]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return <p className="text-center py-10">Your cart is empty. Redirecting...</p>;
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Please provide your shipping details.</CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutForm />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium">{item.product.productName}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p>₹{(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <p>Total:</p>
                <p>₹{calculateTotal()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
