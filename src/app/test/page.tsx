"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Divide, Loader2 } from 'lucide-react'
import { sign } from 'crypto'
import { useRouter } from 'next/navigation'
import { doctorFormSchema } from '@/lib/utils'
import CustomDoctorInput from '@/components/CustomDoctorInput'
import { set } from 'mongoose'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'
import axios from 'axios'
import { Doctor } from '@/models/Doctor'



function Test() {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [doctorData, setDoctorData] = useState<Doctor>()


  const  formSchema = doctorFormSchema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Abhinandan',
      email: 'abhi@gmail.com',
      department: '',
      description: '',
      phoneNumber: 0,
      location: '',
      image: '',
      experience: '',
      consultationFee: 0,
      availability: '',
      bio: '',
      specialty: [],
    }
  })

  

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      // const response = await api.post('/doctor', data)
      // console.log(response)
      console.log("Data Submitted: ", data)

      setError(data.email)
      setSuccess(data.name)

     
    
    } catch (error) {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    
        <div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <CustomDoctorInput
                control={form.control}
                name='name'
                label='Name'
                placeholder='Enter your name'
                description='Enter your full name'
                type='text'
                disabled={disabled}
              />

              <CustomDoctorInput
                control={form.control}
                name='email'
                label='Email'
                placeholder='Enter your email'
                description='Enter your email address'
                type='email'
                disabled={disabled}
              />

              <CustomDoctorInput
                control={form.control}
                name='department'
                label='Department'
                placeholder='Enter your department'
                description='Enter your department'
                type='text'
                disabled={disabled}
              />

              <CustomDoctorInput
                control={form.control}
                name='description'
                label='Description'
                placeholder='Enter your description'
                description='Enter your description'
                type='text'
                disabled={disabled}
              />

              <CustomDoctorInput
                control={form.control}
                name='phoneNumber'
                label='Phone Number'
                placeholder='Enter your phone number'
                description='Enter your phone number'
                type='number'
                disabled={disabled}
              />

              <CustomDoctorInput
                control={form.control}
                name='location'
                label='Address'
                placeholder='Enter your address'
                description='Enter your address'
                type='text'
                disabled={disabled}
              />

              <CustomDoctorInput
                control={form.control}
                name='image'
                label='Image'
                placeholder='Enter your image'
                description='Enter your image'
                type='file'
                disabled={disabled}
              />

              <CustomDoctorInput
                control={form.control}
                name='experience'
                label='Experience'
                placeholder='Enter your experience'
                description='Enter your experience'
                type='text'
                disabled={disabled}
              />

              <CustomDoctorInput
                control={form.control}
                name='consultationFee'
                label='Consultation Fee'
                placeholder='Enter your consultation fee'
                description='Enter your consultation fee'
                type='number'
                disabled={disabled}
              />

              <CustomDoctorInput
                control={form.control}
                name='availability'
                label='Availability'
                placeholder='Enter your availability'
                description='Enter your availability'
                type='text'
                disabled={disabled}

              />

              <CustomDoctorInput
                control={form.control}
                name='bio'
                label='Bio'
                placeholder='Enter your bio'
                description='Enter your bio'
                type='text'
                disabled={disabled}

              />

              <CustomDoctorInput
                control={form.control}
                name='specialty'
                label='Specialty'
                placeholder='Enter your specialty'
                description='Enter your specialty'
                type='text'
                disabled={disabled}
              />
              <Button 
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-4'
                disabled={loading}
                variant={'secondary'}
              >
                Submit
              </Button>

            </form>
          </Form>
            
          
        </div>
  
  )
}

export default Test