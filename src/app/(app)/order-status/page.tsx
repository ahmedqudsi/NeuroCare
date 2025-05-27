
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageSearch, ArrowLeft, Timer, ShoppingBag, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Alert, AlertDescription, AlertTitle as AlertTitleUi } from "@/components/ui/alert";


interface OrderItem {
  name: string;
  quantity: number;
}
interface StoredOrder {
  orderId: string;
  items: OrderItem[];
  total: string;
  shippingAddress: {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    pincode: string;
  };
  status: string;
  timestamp: string;
}

export default function OrderStatusPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(null);

    if (typeof window !== "undefined") {
      const storedOrderData = localStorage.getItem('neuroCareLastOrder');
      console.log("OrderStatusPage: Raw data from localStorage for 'neuroCareLastOrder':", storedOrderData);

      if (storedOrderData) {
        try {
          const parsedOrder: StoredOrder = JSON.parse(storedOrderData);
          
          // Basic validation of the parsed object
          if (parsedOrder && typeof parsedOrder.orderId === 'string' && Array.isArray(parsedOrder.items) && typeof parsedOrder.shippingAddress === 'object') {
            setOrder(parsedOrder);
          } else {
            console.error("OrderStatusPage: Parsed order data is missing essential fields or has incorrect types.", parsedOrder);
            setErrorMessage("The stored order data is incomplete or malformed. Please try placing a new order.");
            localStorage.removeItem('neuroCareLastOrder'); // Clean up malformed data
            setOrder(null);
          }
        } catch (e: any) {
          console.error("OrderStatusPage: Error parsing order data from localStorage.", e);
          setErrorMessage(`Failed to load your order details: ${e.message}. The stored data might be corrupted and has been cleared. Please try placing a new order.`);
          localStorage.removeItem('neuroCareLastOrder'); // Clean up corrupted data
          setOrder(null);
        }
      } else {
        // No order data found, which is normal if no order has been placed.
        console.log("OrderStatusPage: No order data found in localStorage for 'neuroCareLastOrder'.");
        setOrder(null);
      }
    } else {
      setErrorMessage("Unable to access order storage. This feature requires a browser environment.");
    }
    setLoading(false);
  }, []);

  const pageStaticText = {
    title: "Order Status",
    backButton: "Back to Pharmacy",
    noOrderFound: "You have no recent orders to track.",
    orderIdLabel: "Order ID:",
    statusLabel: "Status:",
    placedLabel: "Placed:",
    itemsLabel: "Items:",
    totalLabel: "Total:",
    shippingToLabel: "Shipping To:",
    preparingMessage: "Your order is being prepared.",
    outForDeliveryMessage: "Your order is out for delivery!",
    deliveredMessage: "Your order has been delivered.",
    estimatedDelivery: "Estimated delivery in 10-15 minutes (Demo).",
    errorLoadingOrder: "Error Loading Order",
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading order status...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center">
          <PackageSearch className="mr-3 h-8 w-8 text-primary" />
          {pageStaticText.title}
        </h1>
        <Button asChild variant="outline">
          <Link href="/healthcare-services/pharma-delivery">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {pageStaticText.backButton}
          </Link>
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="destructive" className="animate-in fade-in duration-500">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitleUi>{pageStaticText.errorLoadingOrder}</AlertTitleUi>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      {!errorMessage && order && (
        <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
          <CardHeader>
            <CardTitle className="text-2xl">
              {pageStaticText.orderIdLabel} <span className="text-primary">{order.orderId}</span>
            </CardTitle>
            <CardDescription>
              {pageStaticText.placedLabel} {formatDistanceToNow(new Date(order.timestamp), { addSuffix: true })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">{pageStaticText.statusLabel}</h3>
              <p className="text-xl font-bold text-green-600">{order.status}</p>
              <p className="text-muted-foreground mt-1">
                {order.status === "Processing" && pageStaticText.preparingMessage}
                {order.status === "Out for Delivery" && pageStaticText.outForDeliveryMessage}
                {order.status === "Delivered" && pageStaticText.deliveredMessage}
              </p>
            </div>

            <div className="flex items-center text-lg text-muted-foreground">
              <Timer className="mr-2 h-5 w-5 text-primary" />
              <span>{pageStaticText.estimatedDelivery}</span>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">{pageStaticText.itemsLabel}</h3>
              <ul className="list-disc list-inside space-y-1 pl-1">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.name} (Qty: {item.quantity})
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold">{pageStaticText.totalLabel} ₹{order.total}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">{pageStaticText.shippingToLabel}</h3>
              <address className="not-italic text-sm text-muted-foreground">
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.streetAddress}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </address>
            </div>
          </CardContent>
        </Card>
      )}

      {!errorMessage && !order && !loading && (
        <div className="text-center py-12 animate-in fade-in duration-700">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground opacity-50" />
          <p className="mt-4 text-xl text-muted-foreground">
            {pageStaticText.noOrderFound}
          </p>
        </div>
      )}
    </div>
  );
}
