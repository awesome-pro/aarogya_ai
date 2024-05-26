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
import { Doctor } from '@/models/Doctor';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { PageNotFoundError } from 'next/dist/shared/lib/utils';

function BookAppointment() {

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [voiceInput, setVoiceInput] = useState<string>('')
    const [patientData, setPatientData] = useState<Patient>()
    const [doctorData, setDoctorData] = useState<Doctor>()

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

        try {

            if(!patient?._id) {
                setError('An error occurred while fetching patient data: Patient not found')
                setLoading(false)
                return
            }

            const response = await axios.get(`/api/get-patient-by-id?id=${patient?._id}`)

            const responseJson = response.data

            if(response.status !== 200 || response.data.error) {
                setError('An error occurred while fetching patient data: ' + response.data.error)
                return
            }

            const patientData = responseJson.data

            console.log(patientData)
            setSuccess('Patient data fetched successfully: ' + patientData.name)
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
    }, [session, patient, setPatientData, setDoctorData])

    const fetchDoctorDetails = useCallback(async () => {
            
            setLoading(true)
            setError(null)
            setSuccess('')

            try {

            if(!doctorId) {
                setError('An error occurred while fetching doctor data: Doctor not found')
                setLoading(false)
                return
            }
    
            const response = await axios.get(`/api/get-doctor-by-id?id=${doctorId}`)

            const responseJson = response.data

    
            if(response.status !== 200 ) {
                setError('An error occurred while fetching doctor data: ' + responseJson.message)
                return
            }
    
            const doctorData = responseJson.data
    
            console.log(doctorData)
            setDoctorData(doctorData)
            setSuccess('Doctor data fetched successfully: ' + doctorData?.name)
                
            } catch (error) {
                setError('An error occurred while fetching doctor data: ' + error)
                toast({
                    title: 'Error',
                    description: 'An error ' + error,
                    variant: 'destructive'
                })
                return
            } finally {
                setLoading(false)
            }
        }, [session, patient?._id, setPatientData, setDoctorData, doctorId])



    useEffect(() => {

        if(patient?._id) {
            fetchPatientDetails()
        }

        if(doctorId) {
            fetchDoctorDetails()
        } 

    }
    , [fetchPatientDetails, fetchDoctorDetails, session, patient?._id, doctorId])


    
    const form = useForm<z.infer<typeof appointmentFormSchema>>(
        {
            resolver: zodResolver(appointmentFormSchema),
            defaultValues: {
                "patientName": patientData?.name,
                "doctorId": doctorId!,
                "startTimestamp": new Date(),
                "endTimestamp": new Date(),
                "clinicAddress": doctorData?.clinicAddress || '',
            }
        }
    )

    const onsubmit = async (data: z.infer<typeof appointmentFormSchema>) => {
        console.log(data)

        setLoading(true)
        try {

            const result = await axios.post(`/api/test?doctorId=${doctorId}`, data)

            if(result.status !== 200) {
                setError('An error occurred while booking appointment: ' + result.data.message)
                return
            }

            const responseJson = result.data

            setSuccess('Appointment booked successfully: ' + responseJson.message)
            
        } catch (error) {
            setError('An error occurred while booking appointment: ' + error)
            toast({
                title: 'Error',
                description: 'An error ' + error,
                variant: 'destructive'
            })
            return
        } finally {
            setLoading(false)
        }
    }
   

  return (
    <div className=''>

        {
            doctorId ? (
                <div className=''>
                    <div className='flex flex-col items-center justify-center  bg-gray-100'>
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

                            
                           <h1>
                                Appointment Booking Details
                           </h1>


                           
                        </div>
                    </div>
                </div>
            ) : (
                <div>   
                    <h1 className='text-3xl font-semibold mt-8'>Book an <span className='text-blue-400'>Appointment</span></h1>
                    <h1>You need to select a doctor first to book appointment</h1>
                        <FormError message='An error occurred while fetching doctor data' />
                    <div className='mt-8 flex items-center justify-center flex-col w-full'>
                       
                        <Image
                            src="/images/page-not-looking.png"
                            alt="Page not found"
                            width={500}
                            height={500}
                            className='rounded-xl animate-pulse'
                        />

                        <Button
                            className='px-4 py-2 bg-blue-500 rounded-3xl hover:bg-blue-600 text-white mb-10 my-8 w-48'
                            onClick={() => router.push('/patient/dashboard')}
                        >
                            Go to Dashboard
                        </Button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default BookAppointment
