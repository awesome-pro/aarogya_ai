"use client";


import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { Doctor } from '@/models/Doctor';
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useToast } from '@/components/ui/use-toast';
import * as z from 'zod';


const EditDoctorProfile: React.FC = () => {

  const { data: session } = useSession();
  const doctor = session?.user as Doctor

  const [doctorData, setDoctorData] = useState<Doctor >(doctor);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { toast } = useToast();

  const router = useRouter()


  const formSchema = doctorFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: doctor?.name || '',
      email: doctor?.email || '',
      department: '',
      description: '',
      phoneNumber:  doctor?.phoneNumber || 0,
      location: '',
      image: doctor?.image || '',
      experience: '',
      consultationFee: 0,
      availability: '',
      bio: '',
      specialty: [],
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setDisabled(true);

    try {
      const response = await axios.post(`/api/doctor/update-doctor-details?id=${doctor._id}`, data);

      if (response.status === 200) {
        setSuccess(true);
        toast({
          title: 'Doctor details updated successfully',
          variant: 'success',
          description: 'Your doctor profile has been updated successfully',
        });
      } else {
        setError('Failed to update doctor details');
        toast({
          title: 'Failed to update doctor details',
          variant: 'destructive',
          description: 'An error occurred while updating your doctor profile. Please try again later.',
        });
      }
    } catch (error: any) {
      setError(error.toString());
      toast({
        title: 'Failed to update doctor details',
        variant: 'destructive',
        description: 'An error occurred while updating your doctor profile. Please try again later.',
      });
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };


  const handleSignOut = () => {

    if(session && session.user){
      console.log('Signing out user:', session.user);
      signOut();
    } 

    toast({
      title: 'Signed out successfully',
      variant: 'success',
      description: 'You have been signed out successfully',
    });

    router.push('/');
  }




  const fetchDoctorData = useCallback(async () => {
    
    // Fetch doctor data from the backend API

    setLoading(true);
    setError('');
    try {

      const response = await axios.get(`/api/doctor/get-doctor-details?id=${doctor?._id}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch doctor data');
      }

      const doctorData = response.data.doctor as Doctor;
      
      setDoctorData(doctorData);

      return doctorData;
      
    } catch (error) {

       setError(error?.toString() || 'Failed to fetch doctor data');
    }finally{
      setLoading(false);
    }

    return doctor;
  
}, [doctor])


useEffect(() => {
  if (!session || !session.user) return;

    fetchDoctorData();

}, [session, fetchDoctorData]);




 /* const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
  };

  const handleSpecialtyChange = (index: number, value: string) => {
    const updatedSpecialties = [...doctorData.specialty];
    updatedSpecialties[index] = value;
    setDoctorData({
      ...doctorData,
      specialty: updatedSpecialties,
    });
  };

  const handleAddSpecialty = () => {
    setDoctorData((prevDoctorData) => ({
      ...prevDoctorData,
      specialty: [...(prevDoctorData?.specialty || []), ''],
    }));
  };

  const handleRemoveSpecialty = (index: number) => {
    setDoctorData((prevDoctorData: Doctor) => ({
      ...prevDoctorData,
      specialty: prevDoctorData?.specialty?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setDoctorData({
          ...doctorData,
          profileImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, for example, send the updated data to an API
    console.log('Updated doctor data:', doctorData);
  };

  */

  return (
    <>
      <div className="min-h-screen bg-white py-4 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Edit Doctor Profile</h2>

          { error && (
           <FormError message={error} />
            )
          }

          {success && (
            <FormSuccess message="Doctor details updated successfully" />
          )}

          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='flex flex-col md:flex-row items-start'>

                <div className="md:w-1/5 flex flex-col items-center mb-8 md:mb-0">
                  <Image
                    src={doctorData?.image || "/icons/doctor-placeholder.png"}
                    alt="Profile Image"
                    className="rounded-full mb-4 w-40 h-40 object-cover shadow-md"
                    width={150}
                    height={150}
                  />
                </div>
              </div>

              <div className="md:w-4/5 md:pl-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      label='Location'
                      placeholder='Enter your address'
                      description='Enter your address'
                      type='text'
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
              
                 </div>
              </div>

              <Button 
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-4 w-32'
                disabled={loading}
                variant={'secondary'}
              >
                Submit
              </Button>
            </form>
          </Form>


          <Button 
            className='bg-red-500 hover:bg-red-700 text-white font-inter py-2 px-4 rounded-full my-4 w-32'
            onClick={handleSignOut}
            variant={'secondary'}
          >
            Sign Out
          </Button>
          
        </div>
      </div>
    
    </>
  );
};

export default EditDoctorProfile;


