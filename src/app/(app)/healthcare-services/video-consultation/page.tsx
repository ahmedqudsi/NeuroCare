
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { sampleConsultationTypes, sampleDoctors as staticSampleDoctors } from '@/lib/constants';
import type { Doctor, ConsultationType } from '@/types';
import { VideoDoctorProfileCard } from '@/components/features/healthcare-services/video-consultation/VideoDoctorProfileCard';
import { VideoConsultationBookingForm } from '@/components/features/healthcare-services/video-consultation/VideoConsultationBookingForm';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

// If you need dynamic metadata with client components, you'd typically handle it differently,
// e.g. by setting document.title in useEffect or using a Head component from next/head if not in App Router.
// For App Router, metadata is usually in server components.

export default function VideoConsultationPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageStaticText = {
    mainTitle: 'Video Consultation with Doctors',
    mainDescription: 'Book virtual appointments with qualified doctors from the comfort of your home. Browse available specialists and schedule your online consultation.',
    availableDoctorsTitle: 'Doctors Available for Video Consultation',
    bookingFormTitle: 'Book Your Video Consultation',
    backButtonText: "Back to Healthcare Services",
    loadingDoctors: "Loading doctors...",
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      if (db) {
        try {
          const querySnapshot = await getDocs(collection(db, "doctors"));
          const doctorsData: Doctor[] = [];
          querySnapshot.forEach((doc) => {
            // Ensure all required fields from Doctor type are present or have defaults
            const data = doc.data();
            doctorsData.push({
              id: doc.id,
              fullName: data.fullName || "N/A",
              specialty: data.specialty || "N/A",
              yearsOfExperience: data.yearsOfExperience || 0,
              languagesSpoken: data.languagesSpoken || [],
              ratings: data.ratings || 0,
              verifiedLicense: data.verifiedLicense || false,
              profilePictureUrl: data.profilePictureUrl || 'https://placehold.co/300x300.png',
              imageHint: data.imageHint || 'doctor profile',
              locationDescription: data.locationDescription || "N/A",
              consultationFee: data.consultationFee || 0,
              availability: data.availability || "N/A",
              bio: data.bio,
              videoConsultationFee: data.videoConsultationFee,
              videoAvailabilitySlots: data.videoAvailabilitySlots || [],
            } as Doctor);
          });
          setDoctors(doctorsData);
        } catch (error) {
          console.error("Error fetching doctors from Firestore:", error);
          // Fallback to static data if Firestore fetch fails
          setDoctors(staticSampleDoctors);
        }
      } else {
        console.warn("Firebase not initialized, using static doctor data.");
        // Fallback to static data if db is not available
        setDoctors(staticSampleDoctors);
      }
      setIsLoading(false);
    };

    fetchDoctors();
  }, []);

  // Filter doctors who offer video consultations and are verified
  const videoDoctors = doctors.filter(doctor =>
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
        {isLoading ? (
          <p className="text-muted-foreground">{pageStaticText.loadingDoctors}</p>
        ) : videoDoctors.length > 0 ? (
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

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600">
        <h2 className="text-2xl font-semibold text-foreground">Join Video Call</h2>
        <p className="text-muted-foreground">Click the button below to join the video consultation.</p>
        <Button onClick={() => alert("Video call integration coming soon!")}>Join Now</Button>
        {/* Placeholder for video call integration */}
        {/* <iframe src="https://meet.jit.si/testroom" width="800" height="600"></iframe> */}
      </section>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-800">
        <h2 className="text-2xl font-semibold text-foreground">Prescription and Follow-up Notes</h2>
        <p className="text-muted-foreground">
          {/* Doctor's view: Upload prescription and notes */}
          {/* Patient's view: Download prescription */}
          Download your prescription and follow-up notes here.
        </p>
        <Button onClick={() => alert("Prescription download coming soon!")}>Download Prescription</Button>
      </section>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-1000">
        <h2 className="text-2xl font-semibold text-foreground">Feedback and Ratings</h2>
        <p className="text-muted-foreground">
          Share your experience and help us improve our services.
        </p>
        <Button onClick={() => alert("Feedback form coming soon!")}>Submit Feedback</Button>
      </section>
    </div>
  );
}
