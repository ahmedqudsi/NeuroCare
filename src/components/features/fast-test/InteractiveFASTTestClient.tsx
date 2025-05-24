"use client";

import { fastTestSteps } from '@/lib/constants';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneOutgoing, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function InteractiveFASTTestClient() {
  const { toast } = useToast();

  const handleEmergencyCall = () => {
    // In a real app, this would initiate a call or show emergency numbers.
    toast({
      title: "Emergency Action",
      description: "Calling emergency services immediately is crucial. For now, please dial your local emergency number.",
      variant: "destructive",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <AlertTriangle className="mr-2 h-6 w-6 text-destructive" />
          F.A.S.T. Stroke Test
        </CardTitle>
        <CardDescription>
          Use the F.A.S.T. test to quickly check for common signs of a stroke.
          If you see any of these signs, call emergency services immediately.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {fastTestSteps.map((step) => (
            <AccordionItem value={step.id} key={step.id} className="border bg-card rounded-lg shadow-sm">
              <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                <div className="flex items-center">
                  {step.icon && <step.icon className="mr-3 h-7 w-7 text-primary" />}
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
          ))}
        </Accordion>
        <div className="mt-8 text-center">
          <Button
            size="lg"
            variant="destructive"
            className="w-full max-w-md shadow-md hover:shadow-lg transition-shadow"
            onClick={handleEmergencyCall}
            aria-label="Call emergency services"
          >
            <PhoneOutgoing className="mr-2 h-5 w-5" />
            Call Emergency Services Now
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            If you suspect a stroke, every second counts. Do not delay.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
