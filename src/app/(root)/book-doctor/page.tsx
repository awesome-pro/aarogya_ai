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


    const formSchema = appointmentFormSchema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            patientName: patient?.name || "",
            patientEmail: patient?.email || "",
            patientPhoneNumber: patientData?.phoneNumber,
            patientAge: patientData?.age,
            patientMedications: patientData?.medications,
            patientAllergies: patientData?.allergies,
            patientBloodGroup: patientData?.bloodGroup,
            patientDiseases: patientData?.diseases,
            patientAddress: patientData?.address,
            patientImage: patientData?.image,
            patientBodyImage: "",
            patientPrescriptionImage: "",
            doctorId: doctorId || "",
            doctorName: doctorData?.name || "",
            clinicAddress: doctorData?.clinicAddress || ""
        }
    })


    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)

        try {
            setLoading(true)
            const response = await axios.post(`/api/create-new-appointment?id=${patient?.id}`, data)
            console.log(response.data)
            console.log(response.status)
            console.log(response.data.message)


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

                            
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                                <div className='flex items-center justify-center'>
                                    <Button
                                    type='submit'
                                    className='px-4 py-2 bg-blue-500 rounded-3xl hover:bg-blue-600 text-white mb-10 my-8 w-48'
                                    disabled={loading}
                                    onClick={() => handleSubmit}
                                    >
                                    Book Appointment
                                    </Button>
                                </div>
                                    
                                    <div className=' grid grid-cols-2 gap-7'>

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='patientName'
                                            label='Name'
                                            placeholder='Enter your name'
                                            description='Please enter your name'
                                            type='text'
                                            value={patient?.name || ""}
                                        />

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='patientEmail'
                                            label='Email'
                                            placeholder='Enter your email'
                                            description='Please enter your email'
                                            type='email'
                                            value={patient?.email || ""}
                                            disabled={true}
                                        />

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='patientPhoneNumber'
                                            label='Phone Number'
                                            placeholder='Enter your phone number'
                                            description='Please enter your phone number'
                                            type='tel'
                                            value={patientData?.phoneNumber || ""}
                                        />

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='patientAddress'
                                            label='Address'
                                            placeholder='Enter your address'
                                            description='Please enter your address'
                                            type='text'
                                            value={patientData?.address || ""}
                                        />

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='patientAge'
                                            label='Age'
                                            placeholder='Enter your age'
                                            description='Please enter your age'
                                            type='number'
                                            value={patientData?.age || 0}
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
                                            value={patientData?.medications || ""}
                                        />

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='patientAllergies'
                                            label='Allergies'
                                            placeholder='Enter your allergies'
                                            description='Please enter your allergies'
                                            type='text'
                                            value={patientData?.allergies || ""}
                                        />

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='patientBloodGroup'
                                            label='Blood Group'
                                            placeholder='Enter your blood group'
                                            description='Please enter your blood group'
                                            type='text'
                                            value={patientData?.bloodGroup || ""}
                                        />

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='patientDiseases'
                                            label='Diseases'
                                            placeholder='Enter your diseases'
                                            description='Please enter your diseases'
                                            type='text'
                                            value={patientData?.diseases || ""}
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

                                    </div>

                                        <Separator className='my-4'/>


                                    <div>

                                        <h1>Doctors Details</h1>

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='doctorId'
                                            label='Doctor ID'
                                            placeholder=''
                                            disabled={true}
                                            description='This is the Doctor ID'
                                            type='text'                        
                                        />

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='doctorName'
                                            label='Doctor Name'
                                            placeholder=''
                                            disabled={true}
                                            description='This is the Doctor Name'
                                            type='text'
                                            value={doctorData?.name || ""}                        
                                        />

                                        <CustomAppointmentInput
                                            control={form.control}
                                            name='clinicAddress'
                                            label='clinicAddress'
                                            placeholder=''
                                            disabled={true}
                                            description='This is the clinicAddress of Appointment'
                                            type='text'  
                                            value={doctorData?.clinicAddress || ""}                      
                                        />                                         
                                    </div>
                                        
                                            
                                </form>
                            </Form>
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
