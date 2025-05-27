
"use client"; 

import type { Hospital as HospitalType } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Phone, Stethoscope } from 'lucide-react'; 

interface HospitalCardProps {
  hospital: HospitalType;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(hospital.address);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const cardStaticText = {
    servicesTitle: "Services:",
    getDirectionsButton: "Get Directions"
  };

  // Helper function to slugify names for image paths
  const slugify = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  };

  const getImagePath = () => {
    // Specific cases already handled
    if (hospital.name === 'Olive Hospital - Hyderabad') {
      return '/olive.webp';
    }
    if (hospital.name === 'Premier Hospital - Hyderabad') {
      return '/premier.jpeg';
    }

    // Dynamically generate paths for other hospitals assuming a .jpg extension
    // and that the user has placed these files in the /public folder
    // with names derived from the hospital name.
    const hospitalNameSlug = slugify(hospital.name);

    // Add conditions for other hospitals based on their exact names from constants.ts
    if (hospital.name === 'Sarojini Devi Eye Hospital - Hyderabad') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/sarojini_devi_eye_hospital_hyderabad.jpg
    }
    if (hospital.name === 'Ayaan Hospital - Hyderabad') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/ayaan_hospital_hyderabad.jpg
    }
    if (hospital.name === 'Bombay Hospital & Medical Research Centre - Mumbai') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/bombay_hospital_medical_research_centre_mumbai.jpg
    }
    if (hospital.name === 'Max Healthcare Saket - Delhi') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/max_healthcare_saket_delhi.jpg
    }
    if (hospital.name === 'Kokilaben Dhirubhai Ambani Hospital - Mumbai') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/kokilaben_dhirubhai_ambani_hospital_mumbai.jpg
    }
    if (hospital.name === 'Lilavati Hospital and Research Centre - Mumbai') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/lilavati_hospital_and_research_centre_mumbai.jpg
    }
    if (hospital.name === 'Breach Candy Hospital Trust - Mumbai') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/breach_candy_hospital_trust_mumbai.jpg
    }
    if (hospital.name === 'Indraprastha Apollo Hospitals - Delhi') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/indraprastha_apollo_hospitals_delhi.jpg
    }
    if (hospital.name === 'Fortis Escorts Heart Institute - Delhi') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/fortis_escorts_heart_institute_delhi.jpg
    }
    if (hospital.name === 'Sir Ganga Ram Hospital - Delhi') {
      return `/${hospitalNameSlug}.jpg`; // Expected: /public/sir_ganga_ram_hospital_delhi.jpg
    }

    // Fallback to the imageUrl from constants if no specific local path is matched
    return hospital.imageUrl;
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 flex flex-col h-full">
      {hospital.imageUrl && ( 
         <div className="relative w-full h-48 bg-secondary">
            <Image
              src={getImagePath()}
              alt={`Image of ${hospital.name}`}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={hospital.imageHint || "hospital building"}
              onError={(e) => {
                // Fallback for local images if they are not found or error out
                // This can also catch if a slugified name doesn't match a file
                (e.target as HTMLImageElement).src = `https://placehold.co/600x400.png?text=${encodeURIComponent(hospital.name.split(' ')[0])}+Not+Found`;
                (e.target as HTMLImageElement).alt = `Image for ${hospital.name} not found`;
              }}
            />
         </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{hospital.name}</CardTitle>
        <CardDescription className="flex items-center text-muted-foreground pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill mr-2 h-4 w-4" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
          </svg>
          {hospital.address}
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill mr-2 h-4 w-4" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
          </svg>
          {cardStaticText.getDirectionsButton}
        </Button>
      </CardFooter>
    </Card>
  );
}
