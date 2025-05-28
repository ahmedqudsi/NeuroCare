
"use client";

import type { LabTestPackage, LabTestBookingFormData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { CalendarIcon, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle as AlertTitleUi } from '@/components/ui/alert'; // Renamed to avoid conflict

const labTestBookingFormSchema = z.object({
  patientName: z.string().min(2, {
    message: "Patient name must be at least 2 characters.",
  }),
  selectedTestId: z.string().min(1, { message: "Please select a test or package." }),
  preferredDate: z.date({
    required_error: "A preferred booking date is required.",
  }),
  preferredTimeSlot: z.string().min(1, { message: "Please select a time slot." }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  fastingConfirmed: z.boolean().optional(),
  notes: z.string().max(500, { message: "Notes cannot exceed 500 characters." }).optional(),
}).refine(data => {
  // Conditional validation for fastingConfirmed
  const selectedTest = sampleTimeSlotsForTests.find(t => t.id === data.selectedTestId); // Use a placeholder or actual data source
  if (selectedTest && (sampleLabTestPackages.find(p => p.id === data.selectedTestId)?.fastingRequired)) {
    return data.fastingConfirmed === true;
  }
  return true;
}, {
  message: "Please confirm you will be fasting if the selected test requires it.",
  path: ["fastingConfirmed"], // Specify the path of the error
});


interface LabTestBookingFormProps {
  testPackages: LabTestPackage[];
}

// Sample time slots - can be dynamic based on lab availability later
const sampleTimeSlotsForTests = [
  "07:00 AM - 08:00 AM (Fasting Preferred)",
  "08:00 AM - 09:00 AM (Fasting Preferred)",
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
];

export function LabTestBookingForm({ testPackages }: LabTestBookingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [currentSelectedTest, setCurrentSelectedTest] = useState<LabTestPackage | null>(null);

  const form = useForm<z.infer<typeof labTestBookingFormSchema>>({
    resolver: zodResolver(labTestBookingFormSchema),
    defaultValues: {
      patientName: "",
      selectedTestId: "",
      address: "",
      notes: "",
      preferredTimeSlot: "",
      fastingConfirmed: false,
    },
  });

  const selectedTestId = form.watch("selectedTestId");

  useEffect(() => {
    if (selectedTestId) {
      const test = testPackages.find(pkg => pkg.id === selectedTestId);
      setCurrentSelectedTest(test || null);
      // Reset fastingConfirmed if the new test doesn't require fasting
      if (test && !test.fastingRequired) {
        form.setValue("fastingConfirmed", false);
      }
    } else {
      setCurrentSelectedTest(null);
    }
  }, [selectedTestId, testPackages, form]);

  async function onSubmit(values: z.infer<typeof labTestBookingFormSchema>) {
    setIsSubmitting(true);
    setSubmissionStatus(null);
    console.log("Lab Test Booking Request Submitted:", values);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, integrate with Firebase Firestore here.
    // Example:
    // try {
    //   const docRef = await addDoc(collection(db, "lab_test_bookings"), {
    //     ...values,
    //     preferredDate: Timestamp.fromDate(values.preferredDate),
    //     status: "pending",
    //     createdAt: serverTimestamp(),
    //   });
    //   setSubmissionStatus('success');
    //   form.reset();
    // } catch (e) {
    //   setSubmissionStatus('error');
    // }

    toast({
      title: "Booking Request Submitted!",
      description: `Thank you, ${values.patientName}. Your request for ${currentSelectedTest?.testName || 'the selected test'} on ${format(values.preferredDate, "PPP")} at ${values.preferredTimeSlot} has been received. Our team will contact you shortly to confirm.`,
      duration: 7000,
    });
    setSubmissionStatus('success');
    form.reset();
    setCurrentSelectedTest(null);
    setIsSubmitting(false);
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

        <FormField
          control={form.control}
          name="selectedTestId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Test or Package</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={cn("hover:bg-accent hover:text-accent-foreground transition-colors")}>
                    <SelectValue placeholder="Choose a test or package" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {testPackages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.testName} (₹{pkg.price}) {pkg.fastingRequired ? "- Fasting Required" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {currentSelectedTest?.fastingRequired && (
            <FormField
              control={form.control}
              name="fastingConfirmed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-amber-50 border-amber-200">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-amber-700">
                      Confirm Fasting: <span className="font-normal">This test requires fasting (typically 8-12 hours before sample collection). Please confirm you will adhere to this.</span>
                    </FormLabel>
                    <FormDescription className="text-xs text-amber-600">
                      Do not eat or drink anything other than water for the specified period before your test.
                    </FormDescription>
                     <FormMessage />
                  </div>
                </FormItem>
              )}
            />
        )}


        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Preferred Booking Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal hover:bg-accent hover:text-accent-foreground transition-colors",
                          !field.value && "text-muted-foreground"
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
                        date < new Date(new Date().setDate(new Date().getDate() -1)) 
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
                    {sampleTimeSlotsForTests.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Address for Sample Collection</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter complete address including flat/house number, street, landmark, city, and pincode"
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any specific instructions or information for the phlebotomist (e.g., patient mobility issues, preferred contact person)"
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
            <CheckCircle2 className="h-4 w-4 !text-green-600 dark:!text-green-400" />
            <AlertTitleUi>Request Sent!</AlertTitleUi>
            <AlertDescription>
              Your home lab test booking request has been successfully submitted. We will contact you soon to confirm details.
            </AlertDescription>
          </Alert>
        )}

        {submissionStatus === 'error' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitleUi>Submission Failed</AlertTitleUi>
            <AlertDescription>
              There was an error submitting your request. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || (currentSelectedTest?.fastingRequired && !form.getValues("fastingConfirmed"))}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Request...
            </>
          ) : (
            "Submit Booking Request"
          )}
        </Button>
      </form>
    </Form>
  );
}
