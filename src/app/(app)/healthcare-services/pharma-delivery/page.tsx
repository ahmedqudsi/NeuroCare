
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pharmaceutical & Medication Delivery',
  description: 'Order medicines and healthcare products online.',
};

export default function PharmaDeliveryPage() {
  return (
    <div className="container mx-auto py-12 text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Pharmaceutical & Medication Delivery</h1>
      <p className="text-xl text-muted-foreground">
        This feature is coming soon!
      </p>
      <p className="text-lg">
        Soon, you'll be able to upload prescriptions or order from a catalog for home delivery.
      </p>
      <Button asChild size="lg">
        <Link href="/healthcare-services">Back to Healthcare Services</Link>
      </Button>
    </div>
  );
}
