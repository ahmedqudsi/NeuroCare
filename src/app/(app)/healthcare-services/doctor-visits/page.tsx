
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Doctor Visits at Home',
  description: 'Schedule doctor consultations at your home.',
};

export default function DoctorVisitsPage() {
  return (
    <div className="container mx-auto py-12 text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Doctor Visits at Home</h1>
      <p className="text-xl text-muted-foreground">
        This feature is coming soon!
      </p>
      <p className="text-lg">
        Soon, you'll be able to schedule doctor appointments directly to your home for convenient medical consultations.
      </p>
      <Button asChild size="lg">
        <Link href="/healthcare-services">Back to Healthcare Services</Link>
      </Button>
    </div>
  );
}
