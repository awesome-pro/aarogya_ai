"use client";

import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import MyButton from '@/components/MyButton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Appointment } from '@/models/utils/Appointment';
import { div } from '@tensorflow/tfjs';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'

function AppointmentDetails() {

    const searchParams = useSearchParams();

    const appointmentId = searchParams.get('id');

    console.log("appointmentId: ", appointmentId)

    const { toast } = useToast();
    const router = useRouter();

    const [appointmentData, setAppointmentData] = React.useState<Appointment>();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = useState('');


    const fetchAppointmentDetails = useCallback(async () => {

        setLoading(true);
        toast(
            {
                title: "Fetching appointment details",
                description: "Please wait...",
                variant: 'default'
            }
        )


        try {

            const response = await axios.get(`/api/get-appointment-detail?id=${appointmentId}`);

            console.log("response: ", response)
            const data = response.data.data;

            if (response.status === 200 && response.data) {
                setAppointmentData(data);
                toast(
                    {
                        title: "Appointment details fetched successfully",
                        description: "Appointment details fetched successfully",
                        variant: 'success'
                    }
                )
                setSuccess("Appointment details fetched successfully: " + data._id);
            } else {
                toast(
                    {
                        title: "Error fetching appointment details",
                        description: "Error fetching appointment details",
                        variant: 'destructive'
                    }
                )
                setError("Error fetching appointment details");
            }
            
        } catch (error: any) {
            console.log("Error while fetching appointment details: ", error)
            toast(
                {
                    title: "Error: " + error,
                    description: "Error while fetching appointment details" + error,
                    variant: 'destructive'
                }
            )
            setError(error.toString());
        }
    }, [ setAppointmentData, setLoading, setError, toast, appointmentId])

    useEffect( () => {

        fetchAppointmentDetails();
    
    }, [fetchAppointmentDetails, appointmentId])

    if(!appointmentId){
        return <div>

            <h1>
                OOPS! This is not the page you are looking for 
            </h1>
            <Image
                src="/images/page-not-looking.png"
                alt="404"
                width={500}
                height={500}
            />

            <MyButton
                label="Go back to home"
                onClick={() => {
                    window.location.href = "/";
                }}
                className="bg-blue-600 text-white"

            />
               </div>
    }


  return (
    <div>
        <FormError message={error} />
        <FormSuccess message={success} />

        <h1>
            Appointment Details
        </h1>

        <h1>
                Appointment ID: {appointmentId}
            </h1>

            <h1>
                {appointmentData?.doctorName}
            </h1>

            <p>
                {appointmentData?.details}
            </p>
            <p>
                {appointmentData?.doctorId}
            </p>
                

    </div>
  )
}

export default AppointmentDetails
