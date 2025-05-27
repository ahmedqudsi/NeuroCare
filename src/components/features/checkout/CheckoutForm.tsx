
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const checkoutFormSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  streetAddress: z.string().min(5, { message: "Street address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits." }),
  contactNumber: z.string().regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit Indian mobile number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function CheckoutForm() {
  const { toast } = useToast();
  const { cartItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: "",
      state: "",
      pincode: "",
      contactNumber: "",
      email: "",
    },
  });

  async function onSubmit(data: CheckoutFormValues) {
    setIsSubmitting(true);
    setPaymentProcessing(true);
    setPaymentComplete(false);
    setShowPaymentModal(true);

    console.log("Checkout Data:", data);
    console.log("Cart Items for Order:", cartItems);

    // Simulate payment gateway interaction and delay
    await new Promise(resolve => setTimeout(resolve, 3000)); // Increased delay for effect

    setPaymentProcessing(false);
    setPaymentComplete(true);

    toast({
      title: "Order Placed Successfully!",
      description: (
        <div>
          <p>Thank you, {data.fullName}! Your order has been received.</p>
          <p>Details have been sent to {data.email}.</p>
          <p className="mt-2 text-xs">This is a demo. No real payment was processed or order stored.</p>
        </div>
      ),
      duration: 7000,
    });

    // Short delay to show success tick before closing modal
    await new Promise(resolve => setTimeout(resolve, 2000));

    setShowPaymentModal(false);
    setPaymentComplete(false);
    
    clearCart(); 
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="House No., Street Name, Landmark" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Your state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="6-digit pincode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="10-digit mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting || showPaymentModal}>
            <CreditCard className="mr-2 h-4 w-4" />
            Proceed to Payment
          </Button>
        </form>
      </Form>

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-64 h-48 shadow-2xl">
            <CardContent className="flex flex-col items-center justify-center h-full space-y-4">
              {paymentProcessing && (
                <>
                  <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  <p className="text-muted-foreground">Processing Payment...</p>
                </>
              )}
              {paymentComplete && (
                <>
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <p className="text-green-600 font-semibold">Payment Successful!</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
