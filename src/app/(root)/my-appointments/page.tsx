"use client";

import AppointmentCard from '@/components/AppointmentCard';
import DoctorSkeleton from '@/components/DocorSkeleton';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { Skeleton } from '@/components/ui/skeleton';
import { Appointment } from '@/models/utils/Appointment';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'

function MyAppointment() {

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);
    const [success, setSuccess] = useState('');

    const { data: session } = useSession();
    const user = session?.user;

    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSuccess('');

        try {
            if (!user?._id) {
                setError("Invalid request. Please provide id");
                setLoading(false); // Stop loading if no user ID is found
                return;
            }

            const response = await axios.get(`/api/get-history?id=${user?._id}`);

            console.log("patient id: ", user?._id)

            if (response.status !== 200 || !response.data) {
                setError('Failed to fetch appointments: ' + response.data.error);
            } else {
                setAppointments(response.data.data);
                setSuccess("Appointments fetched successfully: " + response.data.message);
            }
        } catch (error: any) {
            setError(error.toString());
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    useEffect(() => {
        if (user?._id) {
            fetchAppointments();
        }
    }, [fetchAppointments, user?._id]);

    return (
        <div>
            {
                loading ? (
                    <div className='flex flex-col gap-3 items-center justify-center mt-10'>
                        <h1 className='font-serif font-semibold text-blue-600 text-2xl'>
                            Loading...
                        </h1>
                        <p>Please Wait</p>
                        <div className="loader">
                            <DoctorSkeleton/>
                            <DoctorSkeleton/>
                        </div>
                    </div>
                ) : (
                    <div>
                        {
                            error ? <FormError message={error.toString()} /> : null
                        }
                        {
                            success ?<FormSuccess message={success}/> : null
                        }
                        {
                            appointments.map((appointment, index) => (
                                <div key={index} className='bg-whitesmoke'>
                                    <AppointmentCard
                                        patientName={appointment.patientName}
                                        doctorName={appointment.doctorName}
                                        startTimestamp={appointment.startTimestamp}
                                        endTimestamp={appointment.endTimestamp}
                                        status={appointment.status}
                                        disease={appointment.disease}
                                        details={appointment.details}
                                        prescriptions={appointment.prescriptions}
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MyAppointment;
