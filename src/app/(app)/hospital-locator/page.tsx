import { HospitalCard } from '@/components/features/hospital-locator/HospitalCard';
import { sampleHospitals } from '@/lib/constants';
import { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nearby Hospitals',
  description: 'Find hospitals with stroke care facilities near you.',
};

export default function HospitalLocatorPage() {
  // In a real app, hospitals would be fetched based on geolocation or search
  const hospitals = sampleHospitals;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Find Nearby Hospitals</h1>
        <p className="mt-1 text-muted-foreground">
          Locate medical facilities equipped for stroke care. (Sample data shown)
        </p>
      </div>

      <div className="flex gap-2 items-center p-4 border rounded-lg bg-card shadow">
        <Input 
          type="text" 
          placeholder="Enter your city or zip code (Feature not implemented)" 
          className="flex-grow"
          disabled 
        />
        <Button variant="default" disabled>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      {hospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No hospitals found. Please try adjusting your search criteria (Feature not implemented).</p>
      )}
      
      <p className="text-center text-sm text-muted-foreground mt-8">
        <strong>Note:</strong> This is a demo feature. Hospital data is for illustrative purposes only. 
        In an emergency, always call your local emergency number.
      </p>
    </div>
  );
}
