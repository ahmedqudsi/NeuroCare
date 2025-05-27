
"use client";

import type { Doctor, VideoConsultationBookingFormData, ConsultationType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { sendBookingConfirmation } from '@/lib/notifications';

const videoBookingFormSchema = z.object({
  patientName: z.string().min(2, {
    message: "Patient name must be at least 2 characters.",
  }),
  selectedDoctorId: z.string().min(1, { message: "Please select a doctor." }),
  consultationType: z.string().min(1, { message: "Please select a consultation type."}),
  preferredDate: z.date({
    required_error: "A preferred date is required.",
  }),
  preferredTimeSlot: z.string().min(1, { message: "Please select a time slot." }),
  symptoms: z.string().min(10, {
    message: "Please describe symptoms/reason for consultation (min 10 chars).",
  }).max(500, { message: "Symptoms description cannot exceed 500 characters."}),
});

interface VideoConsultationBookingFormProps {
  doctors: Doctor[];
  consultationTypes: ConsultationType[];
}

// Sample generic time slots (in a real app, these would be dynamic based on doctor's availability for the selected date)
const genericTimeSlots = [
  "09:00 AM - 09:30 AM", "09:30 AM - 10:00 AM", "10:00 AM - 10:30 AM", "10:30 AM - 11:00 AM",
  "02:00 PM - 02:30 PM", "02:30 PM - 03:00 PM", "03:00 PM - 03:30 PM", "03:30 PM - 04:00 PM",
];

export function VideoConsultationBookingForm({ doctors, consultationTypes }: VideoConsultationBookingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const form = useForm<z.infer<typeof videoBookingFormSchema>>({
    resolver: zodResolver(videoBookingFormSchema),
    defaultValues: {
      patientName: "",
      selectedDoctorId: "",
      consultationType: "",
      preferredTimeSlot: "",
      symptoms: "",
    },
  });

  async function onSubmit(values: z.infer<typeof videoBookingFormSchema>) {
    setIsSubmitting(true);
    setSubmissionStatus(null);
    console.log("Video Consultation Request Submitted:", values);

    try {
      // Hardcoded patient ID for now (replace with actual user authentication)
      const patientId = "test-patient-id";

      if (db) {
        const docRef = await addDoc(collection(db, "video_consultations"), {
          doctor_id: values.selectedDoctorId,
          patient_id: patientId,
          scheduled_time: values.preferredDate,
          time_slot: values.preferredTimeSlot,
          consultation_type: values.consultationType,
          symptoms: values.symptoms,
          status: "pending",
          uploaded_reports: [], // Implement file upload later
        });

        console.log("Document written with ID: ", docRef.id);

        const selectedDoctor = doctors.find(d => d.id === values.selectedDoctorId)?.fullName || 'the selected doctor';
        const consultationDateTime = format(values.preferredDate, "PPP") + " at " + values.preferredTimeSlot;

        sendBookingConfirmation(values.patientName, selectedDoctor, consultationDateTime);
    
        toast({
          title: "Video Consultation Request Submitted!",
          description: `Thank you, ${values.patientName}. Your request for a video consultation with ${selectedDoctor} on ${format(values.preferredDate, "PPP")} at ${values.preferredTimeSlot} has been received. We will contact you shortly to confirm.`,
          duration: 7000,
        });
        setSubmissionStatus('success');
        form.reset();
      } else {
        console.error("Firebase not initialized");
        toast({
          title: "Error Submitting Request",
          description: "Firebase not initialized. Please try again.",
          variant: "destructive",
        });
        setSubmissionStatus('error');
      }
    } catch (error: any) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error Submitting Request",
        description: error.message || "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter patient's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="selectedDoctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Doctor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={cn("hover:bg-accent hover:text-accent-foreground transition-colors")}>
                        <SelectValue placeholder="Choose a doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.fullName} ({doctor.specialty} - ₹{doctor.videoConsultationFee})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consultationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consultation Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={cn("hover:bg-accent hover:text-accent-foreground transition-colors")}>
                        <SelectValue placeholder="Select type of consultation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Preferred Consultation Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                           "hover:bg-accent hover:text-accent-foreground transition-colors"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setDate(new Date().getDate() -1)) // Disable past dates
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredTimeSlot"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Preferred Time Slot</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={cn("hover:bg-accent hover:text-accent-foreground transition-colors")}>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genericTimeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                 <p className="text-xs text-muted-foreground mt-1">Note: Final slot confirmation depends on doctor availability.</p>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symptoms / Reason for Consultation</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe your symptoms or the reason for this video consultation."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submissionStatus === 'success' && (
          <Alert variant="default" className="bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300">
            <AlertTriangle className="h-4 w-4 !text-green-600 dark:!text-green-400" />
            <AlertTitle>Request Sent!</AlertTitle>
            <AlertDescription>
              Your video consultation request has been successfully submitted. We will contact you soon to confirm.
            </AlertDescription>
          </Alert>
        )}

        {submissionStatus === 'error' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Submission Failed</AlertTitle>
            <AlertDescription>
              There was an error submitting your request. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Submitting Request..." : "Book Video Consultation"}
        </Button>
      </form>
    </Form>
  );
}
