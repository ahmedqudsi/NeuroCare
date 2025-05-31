
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
import { Brain, LogIn, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

// Simple SVG for Google G icon
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="20" height="20" className="mr-2">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

// Simple SVG for Microsoft icon
const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 21 21" className="mr-2">
    <path fill="#f25022" d="M1 1h9v9H1z"/>
    <path fill="#00a4ef" d="M1 11h9v9H1z"/>
    <path fill="#7fba00" d="M11 1h9v9h-9z"/>
    <path fill="#ffb900" d="M11 11h9v9h-9z"/>
  </svg>
);


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
    if (localStorage.getItem('neuroCareUserLoggedIn') === 'true' && storedEmail) {
        router.replace('/dashboard');
    }
  }, [form, router]);

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email && data.password) {
      localStorage.setItem('neuroCareUserEmail', data.email);
      localStorage.setItem('neuroCareUserLoggedIn', 'true'); 
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
    localStorage.removeItem('neuroCareUserEmail');
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Social Login (${provider})`,
      description: `This is a placeholder for ${provider} login. In a real app, this would initiate the OAuth flow.`,
      duration: 5000,
    });
    // In a real app, you'd redirect to the provider's OAuth page.
    // For demo, simulate a successful login after a delay and redirect.
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('neuroCareUserEmail', `${provider.toLowerCase()}@example.com`); // Mock email
      localStorage.setItem('neuroCareUserLoggedIn', 'true');
      toast({
        title: `Logged in with ${provider}`,
        description: "Welcome to NeuroCare!",
      });
      router.push('/dashboard');
      setIsLoading(false);
    }, 1500);
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('Google')} disabled={isLoading}>
            <GoogleIcon />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('GitHub')} disabled={isLoading}>
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('Microsoft')} disabled={isLoading}>
            <MicrosoftIcon />
            Continue with Microsoft
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-center text-xs text-muted-foreground">
        {/* Footer content can be added here if needed */}
      </CardFooter>
    </Card>
  );
}

    