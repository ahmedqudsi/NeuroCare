
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'At-Home Blood Test Booking',
  description: 'Schedule lab tests with sample collection at your home.',
};

export default function LabTestsPage() {
  return (
    <div className="container mx-auto py-12 text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">At-Home Blood Test Booking</h1>
      <p className="text-xl text-muted-foreground">
        This feature is coming soon!
      </p>
      <p className="text-lg">
        Book lab tests and view digital reports conveniently.
      </p>
      <Button asChild size="lg">
        <Link href="/healthcare-services">Back to Healthcare Services</Link>
      </Button>
    </div>
  );
}
