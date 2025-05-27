
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageSearch, ArrowLeft, Timer, ShoppingBag, AlertTriangle, CheckCircle, RefreshCw, TruckIcon } from 'lucide-react';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { Alert, AlertDescription, AlertTitle as AlertTitleUi } from "@/components/ui/alert";
import { Separator } from '@/components/ui/separator';

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
  status: "Processing" | "Out for Delivery" | "Delivered" | "Cancelled";
  timestamp: string;
}

export default function OrderStatusPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(null);

    if (typeof window !== "undefined") {
      const storedOrdersData = localStorage.getItem('neuroCareOrders');
      console.log("OrderStatusPage: Raw data from localStorage for 'neuroCareOrders':", storedOrdersData);

      if (storedOrdersData) {
        try {
          const parsedOrders: StoredOrder[] = JSON.parse(storedOrdersData);

          if (Array.isArray(parsedOrders) && parsedOrders.every(order => order && typeof order.orderId === 'string')) {
            setOrders(parsedOrders);
          } else {
            console.error("OrderStatusPage: Parsed orders data is not a valid array or items are malformed.", parsedOrders);
            setErrorMessage("The stored order history is incomplete or malformed. Please try placing a new order to refresh it.");
            // localStorage.removeItem('neuroCareOrders'); // Optionally clear malformed data
            setOrders([]);
          }
        } catch (e: any) {
          console.error("OrderStatusPage: Error parsing order data from localStorage.", e);
          setErrorMessage(`Failed to load your order history: ${e.message}. The stored data might be corrupted. Please try placing a new order.`);
          // localStorage.removeItem('neuroCareOrders'); // Optionally clear corrupted data
          setOrders([]);
        }
      } else {
        console.log("OrderStatusPage: No order history found in localStorage for 'neuroCareOrders'.");
        setOrders([]);
      }
    } else {
      setErrorMessage("Unable to access order storage. This feature requires a browser environment.");
    }
    setLoading(false);
  }, []);

  const pageStaticText = {
    title: "Order History & Status",
    backButton: "Back to Pharmacy",
    noOrdersFound: "You have no orders in your history.",
    orderIdLabel: "Order ID:",
    statusLabel: "Status:",
    placedLabel: "Placed:",
    itemsLabel: "Items:",
    totalLabel: "Total:",
    shippingToLabel: "Shipping To:",
    processingMessage: "Your order is being prepared.",
    outForDeliveryMessage: "Your order is out for delivery!",
    deliveredMessage: "This order was successfully delivered!",
    estimatedDelivery: "Estimated delivery in 10-15 minutes (Demo).",
    errorLoadingOrder: "Error Loading Order History",
  };

  const getStatusIcon = (status: StoredOrder['status']) => {
    switch (status) {
      case "Processing":
        return <RefreshCw className="mr-2 h-5 w-5 text-blue-500 animate-spin-slow" />;
      case "Out for Delivery":
        return <TruckIcon className="mr-2 h-5 w-5 text-orange-500" />;
      case "Delivered":
        return <CheckCircle className="mr-2 h-5 w-5 text-green-500" />;
      default:
        return <PackageSearch className="mr-2 h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 text-center">
        <RefreshCw className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading order history...</p>
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

      {!errorMessage && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <Card key={order.orderId} className={`shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-${index * 100}`}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  {getStatusIcon(order.status)}
                  {pageStaticText.orderIdLabel} <span className="text-primary ml-2">{order.orderId}</span>
                </CardTitle>
                <CardDescription>
                  {pageStaticText.placedLabel} {format(new Date(order.timestamp), "PPPp")} ({formatDistanceToNow(new Date(order.timestamp), { addSuffix: true })})
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{pageStaticText.statusLabel}</h3>
                  <p className={`text-xl font-bold ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Processing' ? 'text-blue-600' : 'text-orange-600'}`}>
                    {order.status}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {order.status === "Processing" && pageStaticText.processingMessage}
                    {order.status === "Out for Delivery" && pageStaticText.outForDeliveryMessage}
                    {order.status === "Delivered" && pageStaticText.deliveredMessage}
                  </p>
                </div>

                {order.status !== "Delivered" && (
                  <div className="flex items-center text-md text-muted-foreground">
                    <Timer className="mr-2 h-5 w-5 text-primary" />
                    <span>{pageStaticText.estimatedDelivery}</span>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">{pageStaticText.itemsLabel}</h3>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {order.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm">
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
              {order.status === "Delivered" && (
                <CardFooter className="bg-green-50 dark:bg-green-900/20 p-4 rounded-b-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    🎉 Your order was delivered successfully! We hope you enjoyed your purchase. Thank you for choosing NeuroCare!
                  </p>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}

      {!errorMessage && orders.length === 0 && !loading && (
        <div className="text-center py-12 animate-in fade-in duration-700">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground opacity-50" />
          <p className="mt-4 text-xl text-muted-foreground">
            {pageStaticText.noOrdersFound}
          </p>
        </div>
      )}
    </div>
  );
}

