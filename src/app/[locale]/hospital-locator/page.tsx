
"use client";

import { useState, type FormEvent, useEffect } from 'react';
import { HospitalCard } from '@/components/features/hospital-locator/HospitalCard';
import { sampleHospitals } from '@/lib/constants';
import type { Hospital, Locale, Dictionary } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';

interface HospitalLocatorPageProps {
  params: { locale: Locale };
}

export default function HospitalLocatorPage({ params }: HospitalLocatorPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedHospitals, setDisplayedHospitals] = useState<Hospital[]>(sampleHospitals);
  const [dictionary, setDictionary] = useState<any>({}); // For page specific translations

  useEffect(() => {
    async function fetchDictionary() {
      const dict = await getDictionary(params.locale);
      setDictionary(dict.hospitalLocatorPage || {});
    }
    fetchDictionary();
  }, [params.locale]);

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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {dictionary.title || "Find Nearby Hospitals"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {dictionary.description || "Locate medical facilities equipped for stroke care. (Sample data shown)"}
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 items-center p-4 border rounded-lg bg-card shadow">
        <Input 
          type="text" 
          placeholder={dictionary.searchPlaceholder || "Enter hospital name or address..."}
          className="flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" variant="default">
          <Search className="mr-2 h-4 w-4" /> {dictionary.searchButton || "Search"}
        </Button>
      </form>

      {displayedHospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} dictionary={dictionary.hospitalCard || {}} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          {dictionary.noResults || "No hospitals found matching your search criteria. Please try a different term or clear your search."}
        </p>
      )}
      
      <p className="text-center text-sm text-muted-foreground mt-8">
        <strong>{dictionary.noteTitle || "Note:"}</strong> {dictionary.noteContent || "This feature searches through sample hospital data. In an emergency, always call your local emergency number."}
      </p>
    </div>
  );
}
