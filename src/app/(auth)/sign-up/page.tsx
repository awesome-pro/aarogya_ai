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
import { set } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import CustomAuthInput from '@/components/CustomAuthInput';
import Image from 'next/image';



function SignUp() {

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess ] = useState<string | undefined>("")
  const [disabled, setDisabled] = useState(false)

  // zod implementation
  const formSchema = authFormSchema
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
      defaultValues: {
        email: '',
        password: '',
        phoneNumber: '',
        age: 0,
        address: '',
        name: '',
        image: '',
        bloodGroup: '',
        height: 0,
        weight: 0,
        allergies: [],
        medications: [],
        diseases: [],
      }
    })


    const onSubmit = async (data: z.infer<typeof authFormSchema>) => {

      setIsSubmitting(true)
      console.log("Submitting data: ",data)
  
      try {
        console.log("Data: ",data)
  
        const response = await  fetch('/api/sign-up',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
  
        if(!response.ok){
          console.log("Error finding Response: " + response)
          setError(response.text.toString() || 'Error registering user')
          setIsSubmitting(false)
          return null
        }
  
        console.log("Response Data: ",response)
       
        console.log("Response Data Message: ",response)
  
        toast({
          title: 'Success',
          description: response.json.toString(),
        })
  
        setSuccess(response.json.toString())
  
        router.replace(`/`)
        setIsSubmitting(false)
  
      } catch (error) {
  
        console.log("Error is registering user: ",error)
  
        const axiosError = error as AxiosError<NextResponse>
  
        setError(axiosError.response?.data.text.toString() || 'Error registering user')
  
        toast({
          title: 'Error',
          description: axiosError.response?.data.text.toString() || 'Error registering user',
          variant: "destructive"
        })
  
        setIsSubmitting(false)
      }
    }

  return (
    // bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-700 
    <div className="size-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-700 ">


    <div className='flex rounded-xl size-fit'>

   
    <Image
    src='/images/signin.jpg'
    alt='signin'
    width={600}
    height={500}
    className='rounded-l-2xl'
    />
    <CardWrapper
      headerLabel="Sign Up"
      backButtonLabel="Already Registerd?"
      backButtonHref="/sign-in"
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
}

export default SignUp