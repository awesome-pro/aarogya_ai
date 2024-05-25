"use client";


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authFormSchema } from '@/lib/utils';
import { signInSchema } from '@/schemas/signInSchema';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { Loader2 } from 'lucide-react';
import { CardWrapper } from '@/components/CardWrapper';
import axios from 'axios';
import { z } from 'zod';
import CustomAuthInput from '@/components/CustomAuthInput';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { div } from '@tensorflow/tfjs';

function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>('');
  const { data: session } = useSession();
  const user = session?.user;

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    setError('');
    setIsSubmitting(true);

      try {
        
        const result = await signIn('credentials',
          {
            redirect: false,
            email: data.email,
            password: data.password,
          }
        );

        if(result?.error === 'CredentialsSignin') {
          setError('Invalid credentials. Please try again.');
          setIsSubmitting(false);
          return;
        }else if(result?.error){
          setError('An error occurred: ' + result.error);
          setIsSubmitting(false);
          return;
        }

        if(result?.url){
          router.push('/');
        }
        
        
      } catch (error: any) {
        setError('An error occurred: ' + error.toString());
      }
  };

  return (
    session || user ? (
      <div>
        <h1>You are already signed in as</h1>
        <p>{user?.email}</p>

        <Button
        className='bg-sky-500 hover:bg-sky-600 text-white rounded-3xl px-4 py-2 mt-4 w-52 mb-10'
        onClick={() => router.push('/')}
        >
          Continue to Dashboard
        </Button>

        

        <h1 className='text-red-400 text-2xl'>Are you sure you want to sign out?</h1>
        <Button
          className='bg-red-600 text-white rounded-3xl px-4 py-2 mt-4 w-32 hover:bg-red-700'
          onClick={() => signOut()}
        >
          Sign Out
        </Button>


      </div>
    ) : (
      <div className="size-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-700 ">


      <div className='flex rounded-xl size-fit'>

     
      <Image
      src='/images/doctor-search.jpeg'
      alt='signin'
      width={600}
      height={500}
      className='rounded-l-2xl'
      />
      <CardWrapper
        headerLabel="Sign In"
        backButtonLabel="Don't have an account?"
        backButtonHref="/sign-up"
        showSocial={true}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
             <CustomAuthInput
                control={form.control}
                name="email"
                placeholder="Email"
                disabled={isSubmitting}
                type='email'
                label='Email'
                description='Enter your email address to sign in.'
              />
              <CustomAuthInput
                control={form.control}
                name="password"
                placeholder="Password"
                disabled={isSubmitting}
                type='password'
                label='Password'
                description='Enter your password to sign in.'
              />

            </div>
            <FormError message={error} />
            <FormSuccess message="" />
            <Button
              className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-3xl"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-4 w-4 animate-spin" /> Authenticating User...
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
      </div>
    </div>
    )
   
  );
}

export default SignIn;
