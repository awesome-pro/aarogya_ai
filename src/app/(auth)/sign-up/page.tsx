"use client";
// /pages/sign-up.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { set } from 'mongoose';
import { Button } from '@/components/ui/button';
import { sign } from 'crypto';
import { signIn } from 'next-auth/react';

// Schema using zod
const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUp: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    toast({
      title: 'Signing up...',
      description: 'okay',
      variant: 'default'
    })

    try {
      const response = await axios.post('/api/sign-up', data);

      const responseData = response.data;

      if(responseData.error || response.status !== 200 || !response.data.message) {
        setError(responseData.error);
        toast({
          title: 'Error',
          description: responseData.error,
          variant: 'destructive'
        
        })
        setIsSubmitting(false);
        return;
      }

      toast({
        title: 'Success',
        description: responseData.message,
        variant: 'success'
      })

      setSuccess(response.data.message);
      form.reset();

      signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/'
      });

      router.replace('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data.error || 'An error occurred',
        variant: 'destructive'    
      })

      setError(error.response?.data.error || 'An error occurred');

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sky-400 to-blue-700">
      <div className="flex rounded-xl bg-white shadow-lg overflow-hidden">
        <Image
          src="/images/signin.jpg"
          alt="Sign in"
          width={600}
          height={500}
          className="rounded-l-2xl"
        />
        <div className="p-8 w-96">
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <span className="text-red-600 text-sm">{form.formState.errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                {...form.register('phoneNumber')}
              />
              {form.formState.errors.password && (
                <span className="text-red-600 text-sm">{form.formState.errors.password.message}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <span className="text-red-600 text-sm">{form.formState.errors.password.message}</span>
              )}
            </div>
            {error && <div className="text-red-600">{error}</div>}
            {success && <div className="text-green-600">{success}</div>}
            <Button
              type="submit"
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit'}
            </Button>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
