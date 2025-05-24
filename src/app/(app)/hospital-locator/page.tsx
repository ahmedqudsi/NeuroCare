
"use client";

import { useState, type FormEvent } from 'react';
import { HospitalCard } from '@/components/features/hospital-locator/HospitalCard';
import { sampleHospitals } from '@/lib/constants';
import type { Hospital } from '@/types';
import { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Metadata is not used in client components directly, but good to keep for reference
// export const metadata: Metadata = {
//   title: 'Nearby Hospitals',
//   description: 'Find hospitals with stroke care facilities near you.',
// };

export default function HospitalLocatorPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedHospitals, setDisplayedHospitals] = useState<Hospital[]>(sampleHospitals);

  const handleSearch = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    if (!searchTerm.trim()) {
      setDisplayedHospitals(sampleHospitals);
      return;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = sampleHospitals.filter(hospital => 
      hospital.name.toLowerCase().includes(lowercasedSearchTerm) ||
      hospital.address.toLowerCase().includes(lowercasedSearchTerm)
    );
    setDisplayedHospitals(filtered);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Find Nearby Hospitals</h1>
        <p className="mt-1 text-muted-foreground">
          Locate medical facilities equipped for stroke care. (Sample data shown)
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 items-center p-4 border rounded-lg bg-card shadow">
        <Input 
          type="text" 
          placeholder="Enter hospital name or address..." 
          className="flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" variant="default">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </form>

      {displayedHospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No hospitals found matching your search criteria. Please try a different term or clear your search.
        </p>
      )}
      
      <p className="text-center text-sm text-muted-foreground mt-8">
        <strong>Note:</strong> This feature searches through sample hospital data. 
        In an emergency, always call your local emergency number.
      </p>
    </div>
  );
}
