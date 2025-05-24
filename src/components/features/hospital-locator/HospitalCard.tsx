
import type { Hospital as HospitalType } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { MapPin, Phone, Stethoscope, ExternalLink } from 'lucide-react';

interface HospitalCardProps {
  hospital: HospitalType;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(hospital.address);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {hospital.imageUrl && (
         <div className="relative w-full h-48 bg-secondary">
            <Image
              src={hospital.imageUrl}
              alt={`Image of ${hospital.name}`}
              layout="fill"
              objectFit="cover"
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
      <CardContent className="space-y-3">
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4 text-primary" />
          <span>{hospital.phone}</span>
        </div>
        <div>
          <h4 className="text-sm font-medium flex items-center mb-1">
            <Stethoscope className="mr-2 h-4 w-4 text-primary" />
            Services:
          </h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5 pl-2">
            {hospital.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleGetDirections}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Get Directions
        </Button>
      </CardFooter>
    </Card>
  );
}
