
"use client"; 

import type { Hospital as HospitalType } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { MapPin, Phone, Stethoscope, ExternalLink } from 'lucide-react';

interface HospitalCardProps {
  hospital: HospitalType;
  // dictionary prop removed
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(hospital.address);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  // Static text, previously from dictionary
  const cardStaticText = {
    servicesTitle: "Services:",
    getDirectionsButton: "Get Directions"
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {hospital.imageUrl && (
         <div className="relative w-full h-48 bg-secondary">
            <Image
              src={hospital.imageUrl}
              alt={`Image of ${hospital.name}`}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={hospital.imageHint || "hospital building"}
            />
         </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{hospital.name}</CardTitle>
        <CardDescription className="flex items-center text-muted-foreground pt-1">
          <MapPin className="mr-2 h-4 w-4" /> {hospital.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4 text-primary" />
          <span>{hospital.phone}</span>
        </div>
        <div>
          <h4 className="text-sm font-medium flex items-center mb-1">
            <Stethoscope className="mr-2 h-4 w-4 text-primary" />
            {cardStaticText.servicesTitle}
          </h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5 pl-2">
            {hospital.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground hover:scale-[1.03] transform" 
          onClick={handleGetDirections}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          {cardStaticText.getDirectionsButton}
        </Button>
      </CardFooter>
    </Card>
  );
}

