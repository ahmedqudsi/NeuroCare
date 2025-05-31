
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Brain, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem('neuroCareUserEmail');
    if (storedEmail) {
      setSavedEmail(storedEmail);
      form.setValue('email', storedEmail);
    }
    // If already "logged in" (e.g. navigating back to /login), redirect to dashboard
    if (localStorage.getItem('neuroCareUserLoggedIn') === 'true' && storedEmail) {
        router.replace('/dashboard');
    }
  }, [form, router]);

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication: For demo, any non-empty password with a valid email logs in.
    // In a real app, you'd verify credentials against a backend.
    if (data.email && data.password) {
      localStorage.setItem('neuroCareUserEmail', data.email);
      localStorage.setItem('neuroCareUserLoggedIn', 'true'); // Simple flag for logged-in state
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.email}!`,
      });
      router.push('/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your email and password.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  const handleUseDifferentAccount = () => {
    setSavedEmail(null);
    form.reset({ email: '', password: '' });
    localStorage.removeItem('neuroCareUserEmail'); // Also clear it from storage if they choose this
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Brain className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">Welcome to NeuroCare</CardTitle>
        <CardDescription>Please sign in to continue to your dashboard.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {savedEmail && !form.formState.isDirty && (
          <div className="mb-4 p-3 bg-secondary/50 rounded-md text-center">
            <p className="text-sm text-muted-foreground">Welcome back!</p>
            <p className="font-semibold">{savedEmail}</p>
            <Button variant="link" size="sm" onClick={handleUseDifferentAccount} className="text-xs h-auto p-0 mt-1">
              Use a different account?
            </Button>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LogIn className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-center text-xs text-muted-foreground">
        {/* Footer content can be added here if needed */}
      </CardFooter>
    </Card>
  );
}
