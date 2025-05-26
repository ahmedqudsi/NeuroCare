
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Video Consultation with Doctors',
  description: 'Connect with doctors virtually.',
};

export default function VideoConsultationPage() {
  return (
    <div className="container mx-auto py-12 text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Video Consultation with Doctors</h1>
      <p className="text-xl text-muted-foreground">
        This feature is coming soon!
      </p>
      <p className="text-lg">
        Virtual consultations with healthcare professionals will be available here.
      </p>
      <Button asChild size="lg">
        <Link href="/healthcare-services">Back to Healthcare Services</Link>
      </Button>
    </div>
  );
}
