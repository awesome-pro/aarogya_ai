"use client";

import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect, useTransition,  } from 'react'
import { useDebounceValue} from "usehooks-ts"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import axios, { AxiosError } from 'axios'
import { CardWrapper } from '@/components/CardWrapper'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,

} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react';
import { signInSchema } from '@/schemas/signInSchema';
import { signIn } from 'next-auth/react';
import { clear } from 'console';
import { authFormSchema } from '@/lib/utils';



function SignIn() {

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess ] = useState<string | undefined>("")

  // zod implementation
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    })


  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    setError('')
    setIsSubmitting(true)

    console.log('Credentials: ', data)
    console.log("Sign In initiated...")
    
    const result = await signIn(
      'credentials',
      {
        email: data.email,
        password: data.password,
        redirect: false
      }
    )

    console.log('Result: ', result)

    if(result?.error){

      if (result.error === 'CredentialsSignin') {

        console.log('Error: ', result.error)

        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
        
      } else{
          console.log('Error: ', result.error)
          toast({
            title: 'Error',
            description: result.error,
            variant: "destructive",
          })
      }

      console.log('Error: ', result.error)

      setError(result.error)
      setIsSubmitting(false)
    }

    console.log('Result: ', result)
    console.log('Result URL: ', result?.url)

    if(result?.url){
      console.log('Redirecting to: ', result.url)
      router.push('/')
      window.location.href = '/'
    }

  }

  return (
    <div className='size-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-700  '>
    
    <CardWrapper 
        headerLabel="Sign In"
        backButtonLabel="Don't have an account?"
        backButtonHref="/sign-up"
        showSocial={true}
       >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email/Username</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            {...field}
                                            placeholder="abhi@email.com"
                                            type="email"
                                            onChange={(e) => {
                                              field.onChange(e)
                                              setEmail(e.target.value)
                                            }}
                                        />
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
                                        <Input 
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError  message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                        {
                          isSubmitting ? (
                            <>
                              <Loader2 className='mr-3 h-4 w-4 animate-spin'/> Authenticating User...
                            </>
                          ) : ('Log In')
                        }
                    </Button>
                </form>
            </Form>
            <FormError message={error}/>
            <FormSuccess message={success}/>
       </CardWrapper>
    
    </div>
  )
}

export default SignIn