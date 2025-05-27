
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { PharmacyProduct } from '@/types';
import { ProductCard } from '@/components/features/healthcare-services/pharma-delivery/ProductCard';
import { ArrowLeft, UploadCloud, ShoppingCart, PackageSearch } from 'lucide-react';
import { useState, type ChangeEvent, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { samplePharmacyProducts } from '@/lib/constants'; // Import sample data as fallback

// Metadata should be handled at a higher level for client components or dynamically
// export const metadata: Metadata = {
//   title: 'Pharmaceutical & Medication Delivery',
//   description: 'Order medicines and healthcare products online.',
// };

export default function PharmaDeliveryPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [products, setProducts] = useState<PharmacyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const pageStaticText = {
    mainTitle: 'Pharmaceutical & Medication Delivery',
    mainDescription: 'Order your medicines and healthcare products conveniently from home. Browse our catalog or upload your prescription.',
    backButtonText: "Back to Healthcare Services",
    catalogTitle: "Medicine Catalog",
    loadingProducts: "Loading products...",
    noProducts: "No products available at the moment. Please check back later.",
    viewCartButton: "View Cart",
    trackOrderButton: "Track My Order",
    uploadPrescriptionTitle: "Upload Prescription",
    uploadPrescriptionDescription: "Need a specific medicine? Upload your prescription here (PDF or JPG).",
    uploadButton: "Upload Prescription",
    fileSelectedSuccess: "File selected for prescription upload.",
    noFileSelectedError: "Please select a file to upload.",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (db) {
        try {
          const querySnapshot = await getDocs(collection(db, 'pharmacy_products'));
          const productList: PharmacyProduct[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as PharmacyProduct[];
          
          if (productList.length > 0) {
            setProducts(productList);
          } else {
            // If Firestore is empty, use sample products as a fallback for demonstration
            console.warn("No products found in Firestore, using sample data.");
            setProducts(samplePharmacyProducts);
          }
        } catch (error) {
          console.error('Error fetching products from Firestore:', error);
          toast({
            title: 'Error Fetching Products',
            description: 'Failed to load products from the database. Displaying sample data.',
            variant: 'destructive',
          });
          setProducts(samplePharmacyProducts); // Fallback to sample data on error
        }
      } else {
        console.error('Firebase not initialized, using sample data.');
        toast({
          title: 'Offline Mode',
          description: 'Cannot connect to the database. Displaying sample products.',
          variant: 'default',
        });
        setProducts(samplePharmacyProducts); // Fallback to sample data if db is null
      }
      setLoading(false);
    };

    fetchProducts();
  }, [toast]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      toast({
        title: pageStaticText.fileSelectedSuccess,
        description: `File: ${event.target.files[0].name} (${(event.target.files[0].size / 1024).toFixed(2)} KB)`,
      });
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadPrescription = () => {
    if (selectedFile) {
      console.log('Uploading prescription:', selectedFile.name);
      // Simulate upload - In a real app, upload to Firebase Storage
      toast({
        title: 'Prescription Upload Initiated',
        description: `Your prescription ${selectedFile.name} is being processed. This is a demo; no actual upload occurs.`,
        duration: 5000,
      });
      setSelectedFile(null); // Reset after "upload"
      // Clear the file input visually
      const fileInput = document.getElementById('prescriptionUploadPharma') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } else {
      toast({
        title: 'No File Selected',
        description: pageStaticText.noFileSelectedError,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-10">
      <div className="animate-in fade-in slide-in-from-top-8 duration-700">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {pageStaticText.mainTitle}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageStaticText.mainDescription}
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/healthcare-services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {pageStaticText.backButtonText}
            </Link>
          </Button>
        </div>
      </div>

      {/* Action Buttons: View Cart & Track Order - Placeholder */}
      <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in duration-700 delay-200">
        <Button asChild variant="default" size="lg" className="flex-1">
          <Link href="/cart">
            <ShoppingCart className="mr-2 h-5 w-5" />
            {pageStaticText.viewCartButton}
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="flex-1" disabled>
          <PackageSearch className="mr-2 h-5 w-5" />
          {pageStaticText.trackOrderButton} (Coming Soon)
        </Button>
      </div>

      {/* Upload Prescription Section */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{pageStaticText.uploadPrescriptionTitle}</CardTitle>
            <CardDescription>{pageStaticText.uploadPrescriptionDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Input
                id="prescriptionUploadPharma"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="flex-grow"
              />
              <Button onClick={handleUploadPrescription} variant="outline" className="w-full sm:w-auto">
                <UploadCloud className="mr-2 h-4 w-4" />
                {pageStaticText.uploadButton}
              </Button>
            </div>
            {selectedFile && (
              <Alert variant="default" className="mt-4">
                <AlertTitle>File Ready for Upload</AlertTitle>
                <AlertDescription>
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB). Click upload to proceed.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Medicine Catalog Section */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
        <h2 className="text-2xl font-semibold text-foreground">{pageStaticText.catalogTitle}</h2>
        {loading ? (
          <p className="text-muted-foreground">{pageStaticText.loadingProducts}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: PharmacyProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">{pageStaticText.noProducts}</p>
        )}
      </section>
    </div>
  );
}
