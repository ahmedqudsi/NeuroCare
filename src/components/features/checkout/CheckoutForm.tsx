
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
import { CreditCard, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const checkoutFormSchema = z.object({
  // Shipping Details
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  streetAddress: z.string().min(5, { message: "Street address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits." }),
  contactNumber: z.string().regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit Indian mobile number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),

  // Payment Details (for UI demo only)
  cardholderName: z.string().min(3, { message: "Cardholder name must be at least 3 characters." }),
  cardNumber: z.string()
    .min(15, { message: "Card number must be between 15 and 19 digits."}) // Common lengths for Visa/Mastercard/Amex
    .max(19, { message: "Card number must be between 15 and 19 digits."})
    .regex(/^(\d{4} ?){3,4}\d{3,4}$/, { message: "Enter a valid card number (e.g., XXXX XXXX XXXX XXXX)." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Enter expiry date in MM/YY format (e.g., 08/25)." }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits." }),
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
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  async function onSubmit(data: CheckoutFormValues) {
    setIsSubmitting(true);
    setPaymentProcessing(true);
    setPaymentComplete(false);
    setShowPaymentModal(true);

    console.log("Checkout Data (DEMO - DO NOT USE REAL CARD INFO):", data);
    // IMPORTANT: In a real app, send data.cardNumber, data.expiryDate, data.cvv securely to a PCI compliant payment gateway.
    // DO NOT log or store raw card details, especially CVV.
    console.log("Cart Items for Order:", cartItems);

    await new Promise(resolve => setTimeout(resolve, 3000));

    setPaymentProcessing(false);
    setPaymentComplete(true);

    toast({
      title: "Order Placed Successfully!",
      description: (
        <div>
          <p>Thank you, {data.fullName}! Your order has been received.</p>
          <p>Details have been sent to {data.email}.</p>
          <p className="mt-2 text-xs text-destructive">This is a demo. No real payment was processed. Do not enter real card details.</p>
        </div>
      ),
      duration: 7000,
    });

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
          {/* Shipping Information Section */}
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

          {/* Payment Details Section - DEMO ONLY */}
          <Card className="mt-8 pt-6 border-primary/50 shadow-md">
             <CardHeader className="pb-2 pt-0">
                <CardTitle className="text-xl flex items-center">
                    <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
                    Payment Details (Demo Only)
                </CardTitle>
                <CardDescription className="text-xs text-destructive">
                    Do not enter real card information. This section is for UI demonstration.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name as on card" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input type="text" inputMode="numeric" placeholder="XXXX XXXX XXXX XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input type="password" inputMode="numeric" placeholder="XXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>


          <Button type="submit" className="w-full mt-8" disabled={isSubmitting || showPaymentModal}>
            <CreditCard className="mr-2 h-4 w-4" />
            Place Order & Proceed to Payment
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
