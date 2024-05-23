"use client"

import { FormError } from '@/components/FormError';
import ProfileSkeleton from '@/components/ProfileSkeleton';
import { Form } from '@/components/ui/form';
import { patientFormSchema } from '@/lib/utils';
import { Patient } from '@/models/Patient';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod'


function Profile() {

  const { data: session } = useSession();
  const user = session?.user 


  const [patientData, setPatientData] = useState<Patient>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>('');


  const router = useRouter();
  

  const fetchPatientData = useCallback(async () => {

    setLoading(true);
    setError(null);
    setSuccess('');

    try {
      
      if(!user?._id){
        setError('User not found');
        setLoading(false);
        return;
      }

      const response = await axios.get(`/api/get-patient-by-id?id=${user?._id}`);

      if (response.status !== 200 || !response.data) {
        setError('Failed to fetch patient data: ' + response.data.error);
      } 
      else {
        setPatientData(response.data.data);
        setSuccess("Patient data fetched successfully: " + response.data.message);

      }
    } catch (error) {

      setError("Failed to fetch patient data: " + error);
      
    } finally {
      setLoading(false);
    }
  }, [user?._id, session])

  const updatePatientData = useCallback(async (data: Patient) => {
      
      setLoading(true);
      setError(null);
      setSuccess('');
  
      try {
        
        if(!user?._id){
          setError('User not found');
          setLoading(false);
          return;
        }
  
        const response = await axios.put(`/api/update-patient?id=${user?._id}`, data);
  
        if (response.status !== 200 || !response.data) {
          setError('Failed to update patient data: ' + response.data.error);
        } 
        else {
          setPatientData(response.data.data);
          setSuccess("Patient data updated successfully: " + response.data.message);
        }
      } catch (error) {
  
        setError("Failed to update patient data: " + error);
        
      } finally {
        setLoading(false);
      }
    }, [user?._id, session])


  useEffect(() => {
    if(user?._id){
      fetchPatientData();
    }
  
  }, [fetchPatientData, user?._id, session]);

  const formSchema = patientFormSchema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: patientData || {}
  })

  const onSubmit = form.handleSubmit(async (data) => {
    updatePatientData(data);
  })

  
  return (
    <div>

      {
        error && <div className='mb-11'>
          <FormError message={error} />
        </div>
      }

      {
        success && <div className='mb-11'>
          <FormError message={success} />
        </div>
      }

      {
        loading 
        ? <ProfileSkeleton /> 
        : (
          <div>
            <Form {...form}>
              <form onSubmit={onSubmit}>

                

              </form>
            </Form>
            
         </div>
        )
      }
        
    </div>
  )
}

export default Profile