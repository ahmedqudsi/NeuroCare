
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
import { FeedbackForm } from '@/components/features/healthcare-services/video-consultation/FeedbackForm'; // Import FeedbackForm

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
    joinCallTitle: "Join Video Call",
    joinCallDescription: "Click the button below to join the video consultation. Ensure you have a stable internet connection.",
    joinCallButton: "Join Meeting Now",
    prescriptionTitle: "Prescription and Follow-up Notes",
    prescriptionDescriptionPatient: "Download your prescription and follow-up notes here after your consultation.",
    prescriptionDescriptionDoctor: "Upload prescription and notes for the patient here.",
    downloadPrescriptionButton: "Download Prescription",
    feedbackTitle: "Feedback and Ratings",
    feedbackDescription: "Share your experience and help us improve our services.",
    submitFeedbackButton: "Submit Feedback",
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      if (db) {
        try {
          const querySnapshot = await getDocs(collection(db, "doctors"));
          const doctorsData: Doctor[] = [];
          querySnapshot.forEach((doc) => {
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
          setDoctors(staticSampleDoctors);
        }
      } else {
        console.warn("Firebase not initialized, using static doctor data.");
        setDoctors(staticSampleDoctors);
      }
      setIsLoading(false);
    };

    fetchDoctors();
  }, []);

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
        <h2 className="text-2xl font-semibold text-foreground">{pageStaticText.joinCallTitle}</h2>
        <p className="text-muted-foreground">{pageStaticText.joinCallDescription}</p>
        <Button asChild>
            <a href="https://meet.jit.si/NeuroCareTestRoom" target="_blank" rel="noopener noreferrer">
                {pageStaticText.joinCallButton}
            </a>
        </Button>
        {/* Placeholder for embedded video call integration. You would uncomment and configure this.
        <div className="mt-4 aspect-video w-full max-w-3xl rounded-lg border bg-muted overflow-hidden">
           <iframe 
            src="https://meet.jit.si/NeuroCareTestRoom" // Replace with dynamic room URL
            allow="camera; microphone; fullscreen; display-capture"
            className="w-full h-full border-0"
            title="Video Consultation"
          ></iframe>
        </div>
        */}
      </section>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-800">
        <h2 className="text-2xl font-semibold text-foreground">{pageStaticText.prescriptionTitle}</h2>
        <p className="text-muted-foreground">
          {pageStaticText.prescriptionDescriptionPatient}
          {/* For doctor's view, you might show: {pageStaticText.prescriptionDescriptionDoctor} */}
        </p>
        <Button asChild variant="outline">
          <a href="/prescription.pdf" download="prescription.pdf">
            {pageStaticText.downloadPrescriptionButton}
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-1">
          Note: To test download, create a dummy `prescription.pdf` file in your `public` folder.
        </p>
      </section>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-1000">
        <h2 className="text-2xl font-semibold text-foreground">{pageStaticText.feedbackTitle}</h2>
        <p className="text-muted-foreground">
          {pageStaticText.feedbackDescription}
        </p>
        <FeedbackForm />
      </section>
    </div>
  );
}
