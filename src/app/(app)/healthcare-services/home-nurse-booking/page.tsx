
import type { Metadata } from 'next';
import Image from 'next/image';
import { sampleNurses } from '@/lib/constants';
import type { Nurse } from '@/types';
import { HomeNurseBookingForm } from '@/components/features/healthcare-services/HomeNurseBookingForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, DollarSign } from 'lucide-react'; // Using Star as a generic rating/experience icon

export const metadata: Metadata = {
  title: 'Book a Home Nurse',
  description: 'Schedule professional nursing care at your home.',
};

export default function HomeNurseBookingPage() {
  const pageStaticText = {
    title: "Book a Home Nurse",
    description: "Find and schedule certified nurses for personalized in-home care. Review profiles and book a suitable nurse for your needs.",
    availableNursesTitle: "Available Nurses",
    bookingFormTitle: "Make a Booking Request",
  };

  return (
    <div className="space-y-10">
      <div className="animate-in fade-in slide-in-from-top-8 duration-700">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {pageStaticText.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageStaticText.description}
        </p>
      </div>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <h2 className="text-2xl font-semibold text-foreground">{pageStaticText.availableNursesTitle}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleNurses.map((nurse: Nurse) => (
            <Card key={nurse.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
              <CardHeader className="pb-3">
                {nurse.imageUrl && (
                  <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={nurse.imageUrl}
                      alt={`Photo of ${nurse.name}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      data-ai-hint={nurse.imageHint || "professional nurse"}
                    />
                  </div>
                )}
                <CardTitle className="text-xl">{nurse.name}</CardTitle>
                <div className="flex flex-wrap gap-1 mt-1">
                  {nurse.specializations.slice(0, 2).map(spec => ( // Show max 2 specializations
                     <Badge key={spec} variant="secondary" className="text-xs">{spec}</Badge>
                  ))}
                  {nurse.specializations.length > 2 && <Badge variant="outline" className="text-xs">+{nurse.specializations.length - 2} more</Badge>}
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 flex-grow">
                <p className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> {nurse.experienceYears} years experience</p>
                <p className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-primary" /> ₹{nurse.hourlyRate}/hour</p>
                <p><strong>Availability:</strong> {nurse.availability}</p>
                {nurse.bio && <p className="mt-2 text-xs italic line-clamp-3">{nurse.bio}</p>}
              </CardContent>
               <CardFooter>
                 {/* Could add a "Select Nurse" button here if form handles nurse selection directly */}
               </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
        <h2 className="text-2xl font-semibold text-foreground">{pageStaticText.bookingFormTitle}</h2>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <HomeNurseBookingForm nurses={sampleNurses} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
