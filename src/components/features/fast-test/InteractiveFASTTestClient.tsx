
"use client";

import { fastTestSteps } from '@/lib/constants'; // Use default, non-translated
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneOutgoing, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { FASTStep } from '@/types';


export function InteractiveFASTTestClient() {
  const { toast } = useToast();

  // Static text, previously from dictionary
  const pageStaticText = {
    title: "F.A.S.T. Stroke Test",
    description: "Use the F.A.S.T. test to quickly check for common signs of a stroke. If you see any of these signs, call emergency services immediately.",
    emergencyCallButton: "Emergency Services",
    emergencyCallMessage: "Attempting to dial 112. If the call doesn't start, please dial your local emergency number manually.",
    emergencyCallToastTitle: "Emergency Action"
  };

  const handleEmergencyCall = () => {
    // Attempt to initiate a call to the emergency number for India
    window.location.href = 'tel:112';

    toast({
      title: pageStaticText.emergencyCallToastTitle,
      description: pageStaticText.emergencyCallMessage,
      variant: "destructive",
      duration: 7000, // Keep toast visible for 7 seconds
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <AlertTriangle className="mr-2 h-8 w-8 text-destructive animate-pulse" /> {/* Increased icon size */}
          {pageStaticText.title}
        </CardTitle>
        <CardDescription>
          {pageStaticText.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {fastTestSteps.map((step: FASTStep) => {
            const IconComponent = step.icon || (() => null);
            return (
              <AccordionItem
                value={step.id}
                key={step.id}
                className="border bg-card rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]" /* Increased hover effect */
              >
                <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                  <div className="flex items-center">
                    <IconComponent className="mr-3 h-7 w-7 text-primary" />
                    <span>{step.id} - {step.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <ul className="list-disc space-y-1 pl-5 mb-3">
                    {step.checkItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm bg-secondary p-3 rounded-md">{step.details}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <div className="mt-8 text-center">
          <Button
            size="lg"
            variant="destructive"
            className="w-full max-w-md shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out transform" /* Added hover effect */
            onClick={handleEmergencyCall}
            aria-label={pageStaticText.emergencyCallButton}
          >
            <PhoneOutgoing className="mr-2 h-5 w-5" />
            {pageStaticText.emergencyCallButton}
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            If you suspect a stroke, every second counts. Do not delay.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
