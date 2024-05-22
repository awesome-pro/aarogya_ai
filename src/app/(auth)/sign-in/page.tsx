// "use client";

// import React from 'react'
// import * as z from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { useState, useEffect, useTransition,  } from 'react'
// import { useDebounceValue} from "usehooks-ts"
// import { useRouter } from 'next/navigation'
// import { useToast } from '@/components/ui/use-toast'
// import axios, { AxiosError } from 'axios'
// import { CardWrapper } from '@/components/CardWrapper'

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,

// } from "@/components/ui/form"
// import { Button } from "@/components/ui/button"
// import { FormError } from '@/components/FormError';
// import { FormSuccess } from '@/components/FormSuccess'
// import { Input } from '@/components/ui/input'
// import { Loader2 } from 'lucide-react';
// import { signInSchema } from '@/schemas/signInSchema';
// import { signIn } from 'next-auth/react';
// import { clear } from 'console';
// import { authFormSchema } from '@/lib/utils';



// function SignIn() {

//   const [email, setEmail] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { toast } = useToast()
//   const router = useRouter()
//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess ] = useState<string | undefined>("")

//   // zod implementation
//   const form = useForm<z.infer<typeof authFormSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//     })


//   const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
//     setError('')
//     setIsSubmitting(true)

//     console.log('Credentials: ', data)
//     console.log("Sign In initiated...")
    
//     const result = await signIn(
//       'credentials',
//       {
//         email: data.email,
//         password: data.password,
//         redirect: false
//       }
//     )

//     console.log('Result: ', result)

//     if(result?.error){

//       if (result.error === 'CredentialsSignin') {

//         console.log('Error: ', result.error)

//         toast({
//           title: 'Login Failed',
//           description: 'Incorrect username or password',
//           variant: 'destructive',
//         });
        
//       } else{
//           console.log('Error: ', result.error)
//           toast({
//             title: 'Error',
//             description: result.error,
//             variant: "destructive",
//           })
//       }

//       console.log('Error: ', result.error)

//       setError(result.error)
//       setIsSubmitting(false)
//     }

//     console.log('Result: ', result)
//     console.log('Result URL: ', result?.url)

//     if(result?.url){
//       console.log('Redirecting to: ', result.url)
//       router.push(`/patient/profile?id=${data.patient._id}`);
//       // window.location.href = '/'
//     }

//   }

//   return (
//     <div className='size-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-700  '>
    
//     <CardWrapper 
//         headerLabel="Sign In"
//         backButtonLabel="Don't have an account?"
//         backButtonHref="/sign-up"
//         showSocial={true}
//        >
//             <Form {...form}>
//                 <form 
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="space-y-6"
//                 >
//                     <div className="space-y-4">
//                         <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Email/Username</FormLabel>
//                                     <FormControl>
//                                         <Input 
//                                             disabled={isSubmitting}
//                                             {...field}
//                                             placeholder="abhi@email.com"
//                                             type="email"
//                                             onChange={(e) => {
//                                               field.onChange(e)
//                                               setEmail(e.target.value)
//                                             }}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Password</FormLabel>
//                                     <FormControl>
//                                         <Input 
//                                             {...field}
//                                             placeholder="******"
//                                             type="password"
//                                             disabled={isSubmitting}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     <FormError  message={error}/>
//                     <FormSuccess message={success}/>
//                     <Button
//                       className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg"
//                       type="submit"
//                       disabled={isSubmitting}
//                     >
//                         {
//                           isSubmitting ? (
//                             <>
//                               <Loader2 className='mr-3 h-4 w-4 animate-spin'/> Authenticating User...
//                             </>
//                           ) : ('Log In')
//                         }
//                     </Button>
//                 </form>
//             </Form>
//             <FormError message={error}/>
//             <FormSuccess message={success}/>
//        </CardWrapper>
    
//     </div>
//   )
// }

// export default SignIn

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

function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>('');

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
        const response = await fetch('/api/sign-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email : data.email, password: data.password}),
        });
  
        console.log(response);
  
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          router.push(`/patient/profile?id=${data.data._id}`);
        } else {
          const result = await response.json();
          setError(result.message || 'Failed to sign in');
        }
      } catch (error: any) {
        setError('An error occurred: ' + error.toString());
      }
  };

  return (
    <div className="size-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-700  ">
      <CardWrapper
        headerLabel="Sign In"
        backButtonLabel="Don't have an account?"
        backButtonHref="/sign-up"
        showSocial={true}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Username</FormLabel>
                    <Input
                      disabled={isSubmitting}
                      {...field}
                      placeholder="abhi@email.com"
                      type="email"
                    />
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
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isSubmitting}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message="" />
            <Button
              className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg"
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
  );
}

export default SignIn;
