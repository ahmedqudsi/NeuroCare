
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { sampleDoctors, sampleConsultationTypes } from '@/lib/constants';
import type { Doctor } from '@/types';
import { VideoDoctorProfileCard } from '@/components/features/healthcare-services/video-consultation/VideoDoctorProfileCard';
import { VideoConsultationBookingForm } from '@/components/features/healthcare-services/video-consultation/VideoConsultationBookingForm';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video Consultation with Doctors',
  description: 'Connect with doctors virtually for online consultations.',
};

export default function VideoConsultationPage() {
  const pageStaticText = {
    mainTitle: 'Video Consultation with Doctors',
    mainDescription: 'Book virtual appointments with qualified doctors from the comfort of your home. Browse available specialists and schedule your online consultation.',
    availableDoctorsTitle: 'Doctors Available for Video Consultation',
    bookingFormTitle: 'Book Your Video Consultation',
    backButtonText: "Back to Healthcare Services",
  };

  // Filter doctors who offer video consultations and are verified
  const videoDoctors = sampleDoctors.filter(doctor => 
    doctor.verifiedLicense && 
    doctor.videoConsultationFee !== undefined && 
    doctor.videoAvailabilitySlots && 
    doctor.videoAvailabilitySlots.length > 0
  );

  return (
    <div className="space-y-10">
      <div className="animate-in fade-in slide-in-from-top-8 duration-700">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {pageStaticText.mainTitle}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageStaticText.mainDescription}
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/healthcare-services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {pageStaticText.backButtonText}
            </Link>
          </Button>
        </div>
      </div>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <h2 className="text-2xl font-semibold text-foreground">{pageStaticText.availableDoctorsTitle}</h2>
        {videoDoctors.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videoDoctors.map((doctor: Doctor) => (
              <VideoDoctorProfileCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No doctors currently available for video consultation. Please check back later.</p>
        )}
      </section>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
        <h2 className="text-2xl font-semibold text-foreground">{pageStaticText.bookingFormTitle}</h2>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <VideoConsultationBookingForm doctors={videoDoctors} consultationTypes={sampleConsultationTypes} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
