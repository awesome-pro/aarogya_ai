"use client";

import React, { useCallback, useEffect, useState, } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointmentFormSchema } from '@/lib/utils'
import CustomAppointmentInput from '@/components/CustomAppointmentInput'
import { Button } from '@/components/ui/button'
import { Form, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Patient } from '@/models/Patient';
import { toast, useToast } from '@/components/ui/use-toast';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { set } from 'mongoose';

function BookAppointment() {

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [voiceInput, setVoiceInput] = useState<string>('')
    const [patientData, setPatientData] = useState<Patient>()

    const router = useRouter()

    const { toast } = useToast()

    const searchParams = useSearchParams()
    const doctorId = searchParams.get('doctorId')

    const { data: session } = useSession()
    const patient = session?.user 



    const fetchPatientDetails = useCallback(async () => {

        setLoading(true)

        setError(null)
        setSuccess('')

        if (!patient || !session) {
            toast(
                {
                    title: 'Error',
                    description: 'You need to be signed in to view this page',  
                    variant: 'destructive'
                }
            )

           // router.push('/sign-in')

           // return
        }

        try {

        const response = await axios.get(`/api/get-patient?id=${patient?._id}`)

        if(response.status !== 200 || response.data.error) {
            setError('An error occurred while fetching patient data: ' + response.data.error)
            return
        }

        const patientData = response.data

        console.log(patientData)
        setPatientData(patientData)
            
        } catch (error) {
            setError('An error occurred while fetching patient data: ' + error)
            toast({
                title: 'Error',
                description: 'An error ' + error,
                variant: 'destructive'
            })
            return
        } finally {
            setLoading(false)
        }
    }, [session, patient, setPatientData])


    useEffect(() => {

        // fetchPatientDetails()

    }
    , [fetchPatientDetails, session, patient])


    const formSchema = appointmentFormSchema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            patientName: patientData?.name,
            patientEmail: patientData?.email,
            patientPhoneNumber: patientData?.phoneNumber,
            patientAge: patientData?.age,
            patientMedications: patientData?.medications,
            patientAllergies: patientData?.allergies,
            patientBloodGroup: patientData?.bloodGroup,
            patientDiseases: patientData?.diseases,
            patientAddress: patientData?.address,
            patientImage: patientData?.image,
            patientBodyImage: "",
            patientPrescriptionImage: ""
        }
    })


    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
        try {
            setLoading(true)
            const response = await axios.post(`/api/create-new-appointment?id=${patient?.id}`, data)
            console.log(response.data)

            if(response.status !== 200) {
                setError('An error occurred while booking the appointment: ' + response.data.error)
                return
            }
            setSuccess('Appointment booked successfully')

            router.push('/patient/dashboard')

        } catch (error) {
            console.error(error)
            setError(error as string)
        } finally {
            setLoading(false)
        }
    }



  return (
    <div className='flex'>
        <div className='flex flex-col items-center justify-center w-1/2 bg-gray-100'>
            <h1 className='text-3xl font-semibold mt-8'>Book an <span className='text-blue-400'>Appointment</span></h1>
            <div className='w-3/4 mt-8'>
                {
                    error && (
                        <FormError message={error} />
                    )
                }
                {
                    success && (
                        <FormSuccess message={success} />
                    )
                }
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 grid-cols-2'>
                        
                            <CustomAppointmentInput
                                control={form.control}
                                name='patientName'
                                label='Name'
                                placeholder='Enter your name'
                                description='Please enter your name'
                                type='text'
                            />

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientEmail'
                                label='Email'
                                placeholder='Enter your email'
                                description='Please enter your email'
                                type='email'
                            />

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientPhoneNumber'
                                label='Phone Number'
                                placeholder='Enter your phone number'
                                description='Please enter your phone number'
                                type='tel'
                            />

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientAddress'
                                label='Address'
                                placeholder='Enter your address'
                                description='Please enter your address'
                                type='text'
                            />

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientAge'
                                label='Age'
                                placeholder='Enter your age'
                                description='Please enter your age'
                                type='number'
                            />

                            {/* <CustomAppointmentInput
                                control={form.control}
                                name='patientImage'
                                label='Image'
                                placeholder='Enter your image'
                                description='Please enter your image'
                                type='text'
                            /> */}

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientMedications'
                                label='Medications'
                                placeholder='Enter your medications'
                                description='Please enter your medications'
                                type='text'

                            />

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientAllergies'
                                label='Allergies'
                                placeholder='Enter your allergies'
                                description='Please enter your allergies'
                                type='text'
                            />

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientBloodGroup'
                                label='Blood Group'
                                placeholder='Enter your blood group'
                                description='Please enter your blood group'
                                type='text'

                            />

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientDiseases'
                                label='Diseases'
                                placeholder='Enter your diseases'
                                description='Please enter your diseases'
                                type='text'
                            />

                            {/* <CustomAppointmentInput
                                control={form.control}
                                name='patientBodyImage'
                                label='Body Image'
                                placeholder='Enter your body image'
                                description='Please enter your body image'
                                type='text'
                            /> */}

                            {/* <CustomAppointmentInput
                                control={form.control}
                                name='patientPrescriptionImage'
                                label='Prescription Image'
                                placeholder='Enter your prescription image'
                                description='Please enter your prescription image'
                                type='text'
                            /> */}
                            <div className='flex items-center justify-center'>
                            <Button
                                type='submit'
                                className='px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 text-white mb-10'
                                disabled={loading}
                            >
                                Book Appointment
                            </Button>
                            </div>
                    </form>
                </Form>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2'>
            <img src='https://images.unsplash.com/photo-1597764690472-ec054f1c8637?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jb3IlMjBhbmQlMjBwYXRpZW50fGVufDB8fDB8fHww' alt='/' className='w-full h-full object-cover' />
        </div>
    </div>
  )
}

export default BookAppointment
