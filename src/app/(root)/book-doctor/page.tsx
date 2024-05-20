"use client";


import React, { useCallback, useEffect, useState, } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointmentFormSchema } from '@/lib/utils'
import CustomAppointmentInput from '@/components/CustomAppointmentInput'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { Form, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Patient } from '@/models/Patient';
import { toast } from '@/components/ui/use-toast';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';

function BookAppointment() {

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [voiceInput, setVoiceInput] = useState<string>('')
    const [patientData, setPatientData] = useState<Patient>()

    const router = useRouter()

    const { data: session } = useSession()
    const patient = session?.user as Patient



    const fetchPatientDetails = useCallback(async () => {
        if (!patient || !session) {
            toast(
                {
                    title: 'Error',
                    description: 'You need to be signed in to view this page',  
                    variant: 'destructive'
                }
            )

            router.push('/sign-in')

            return
        }

        const response = await axios.get(`/api/patient/${patient._id}`)

        if(response.status !== 200) {
            setError('An error occurred while fetching patient data: ' + response.data.error)
            return
        }
        const patientData = response.data
        console.log(patientData)
        setPatientData(patientData)
        
    }, [session, patient])


    useEffect(() => {

        fetchPatientDetails()

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
        }
    })


    const handleVoiceInput = () => {
        const recognition = new (window as any).webkitSpeechRecognition()
        recognition.lang = 'en-US'
        recognition.onresult = (event: any) => {
            setVoiceInput(event)
        }
        recognition.start()
    }

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
        try {
            setLoading(true)
            const response = await axios.post(`/api/create-new-appointment?id=${patient.id}`, data)
            console.log(response.data)

            if(response.status !== 200) {
                setError('An error occurred while booking the appointment: ' + response.data.error)
                return
            }
            setSuccess(true)

            router.push('/patient/dashboard')

        } catch (error) {
            console.error(error)
            setError(error as string)
        } finally {
            setLoading(false)
        }
    }



  return (
    <div>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-semibold mt-8'>Book an appointment</h1>
            <div className='w-3/4 mt-8'>
                {
                    error && (
                        <FormError message={error} />
                    )
                }
                {
                    success && (
                        <FormSuccess message='Appointment booked successfully' />
                    )
                }
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
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

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientImage'
                                label='Image'
                                placeholder='Enter your image'
                                description='Please enter your image'
                                type='text'
                            />

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

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientBodyImage'
                                label='Body Image'
                                placeholder='Enter your body image'
                                description='Please enter your body image'
                                type='text'
                            />

                            <CustomAppointmentInput
                                control={form.control}
                                name='patientPrescriptionImage'
                                label='Prescription Image'
                                placeholder='Enter your prescription image'
                                description='Please enter your prescription image'
                                type='text'
                            />

                            <Button
                                type='submit'
                                className='w-32 '
                                disabled={loading}
                            >
                                Submit
                            </Button>
                    </form>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default BookAppointment