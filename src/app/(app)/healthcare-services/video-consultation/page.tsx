
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { sampleConsultationTypes, sampleDoctors as staticSampleDoctors } from '@/lib/constants';
import type { Doctor, ConsultationType } from '@/types';
import { VideoDoctorProfileCard } from '@/components/features/healthcare-services/video-consultation/VideoDoctorProfileCard';
import { VideoConsultationBookingForm } from '@/components/features/healthcare-services/video-consultation/VideoConsultationBookingForm';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, UploadCloud, Video as VideoIcon } from 'lucide-react'; // Added VideoIcon
import { useEffect, useState, type ChangeEvent } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FeedbackForm } from '@/components/features/healthcare-services/video-consultation/FeedbackForm';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function VideoConsultationPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(staticSampleDoctors);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const pageStaticText = {
    mainTitle: 'Video Consultation with Doctors',
    mainDescription: 'Book virtual appointments with qualified doctors from the comfort of your home. Browse available specialists and schedule your online consultation.',
    availableDoctorsTitle: 'Doctors Available for Video Consultation',
    bookingFormTitle: 'Book Your Video Consultation',
    backButtonText: "Back to Healthcare Services",
    joinCallTitle: "Join Video Call",
    joinCallDescription: "Click the button below to join the video consultation. Ensure you have a stable internet connection.",
    joinCallButton: "Video Call", // Changed text here
    prescriptionTitle: "Prescription and Follow-up Notes",
    prescriptionDescriptionPatient: "Upload prescription and notes for the patient here (PDF/JPG accepted). The actual file upload to cloud storage will be implemented in a future update.",
    prescriptionDescriptionDoctor: "Upload prescription and notes for the patient here.",
    uploadPrescriptionButton: "Upload Prescription",
    feedbackTitle: "Feedback and Ratings",
    feedbackDescription: "Share your experience and help us improve our services.",
    submitFeedbackButton: "Submit Feedback",
    noFileSelectedError: "Please select a file to upload.",
    fileSelectedSuccess: "File selected and ready for upload.",
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
          setDoctors(doctorsData.length > 0 ? doctorsData : staticSampleDoctors);
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('File selected for upload:', selectedFile);
      // Here you would typically implement the actual upload to Firebase Storage
      toast({
        title: pageStaticText.fileSelectedSuccess,
        description: `File: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`,
      });
      // Reset file input after selection (optional)
      // setSelectedFile(null);
      // const fileInput = document.getElementById('prescriptionUpload') as HTMLInputElement;
      // if (fileInput) fileInput.value = '';
    } else {
      toast({
        title: "No File Selected",
        description: pageStaticText.noFileSelectedError,
        variant: "destructive",
      });
    }
  };

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
        {isLoading && videoDoctors.length === 0 && (
            <p className="text-muted-foreground">Fetching doctor profiles...</p>
        )}
        {!isLoading && videoDoctors.length === 0 && (
            <p className="text-muted-foreground">No doctors currently available for video consultation. Please check back later.</p>
        )}
        {videoDoctors.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videoDoctors.map((doctor: Doctor) => (
              <VideoDoctorProfileCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
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
                <VideoIcon className="mr-2 h-4 w-4" /> {/* Using VideoIcon */}
                {pageStaticText.joinCallButton}
            </a>
        </Button>
      </section>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-800">
        <h2 className="text-2xl font-semibold text-foreground">{pageStaticText.prescriptionTitle}</h2>
        <p className="text-muted-foreground">
          {pageStaticText.prescriptionDescriptionPatient}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-card shadow">
          <Input
            id="prescriptionUpload"
            type="file"
            accept=".pdf,.jpg,.jpeg"
            onChange={handleFileChange}
            className="flex-grow"
          />
          <Button onClick={handleUpload} variant="outline" className="w-full sm:w-auto">
            <UploadCloud className="mr-2 h-4 w-4" />
            {pageStaticText.uploadPrescriptionButton}
          </Button>
        </div>
        {selectedFile && (
          <Alert variant="default" className="mt-4">
            <AlertTitle>File Ready</AlertTitle>
            <AlertDescription>
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB). Click upload to proceed.
            </AlertDescription>
          </Alert>
        )}
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
