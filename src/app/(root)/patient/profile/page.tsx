"use client";

import FAQ from '@/components/Faq';
import Footer from '@/components/Footer';
import Navbar from '@/components/Header';
import Link from 'next/link';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Patient } from '@/models/Patient';
import { useSession } from 'next-auth/react';
import { set } from 'mongoose';
import { Skeleton } from '@/components/ui/skeleton';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';
import ProfileSkeleton from '@/components/ProfileSkeleton';


const PatientProfilePage: React.FC = () => {

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


  useEffect(() => {
    if(user?._id){
      fetchPatientData();
    }
  
  }, [fetchPatientData, user?._id, session]);


  if (loading) {
    return (
    <div className='flex items-center  gap-4 mb-11'>

      <ProfileSkeleton />
    </div>)
  }

  

  return (
    <div>

      {
        error && <FormError message={error} />
      }

      {
        success && <FormSuccess message={success} />
      }
   

      <div className="py-20 bg-white">
        <div className="rounded-lg p-6 flex flex-col">
          <section className="flex items-center justify-center flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 lg:pl-8 mt-4 lg:mt-0 border border-black p-5">
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Name: </span>{patientData?.name}</p>
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Email-Id: </span>{patientData?.email}</p>
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Contact Number: </span>{patientData?.phoneNumber}</p>
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Age: </span>{patientData?.age}</p>
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Address: </span>{patientData?.address}</p>
            </div>
          </section>

          <div className="flex justify-center items-center my-5">
              <h1 className="text-4xl text-blue-500 font-extrabold">Medical Details</h1>
            </div>

          <section className="mt-10 grid grid-cols-2 m-4 gap-5">

            <div className="mb-4 border border-black p-5">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Height</h3>
              <p className="text-lg">{patientData?.height}</p>
            </div>

            <div className="mb-4 border border-black p-5">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Weight</h3>
              <p className="text-lg">{patientData?.weight}</p>
            </div>

            <div className="mb-4 border border-black p-5">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Blood Group</h3>
              <p className="text-lg">{patientData?.bloodGroup}</p>
            </div>

            <div className="mb-4 border border-black p-5">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Allergies</h3>
              <p className="text-lg">{patientData?.allergies}</p>
            </div>

            <div className="mb-4 border border-black p-5">

              <h3 className="text-2xl font-bold mb-2 text-blue-700">Chronic Conditions</h3>
              <p className="text-xl">{patientData?.diseases}</p>
            </div>

            <div className="mb-4 border border-black p-5">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Medications Currently Taking</h3>
              <p className="text-lg">{patientData?.medications}</p>
            </div>
          </section>
        </div>

        <div className="flex justify-center items-center gap-7">
          <Link href="/patient/profile/edit">
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-3xl"
            >
              Edit your profile
            </Button>
          </Link>
          <Link href="/my-appointments">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-3xl"
            >
              View Patient history
            </Button>
          </Link>
        </div>
      </div>
      
      <FAQ />
      <Footer />
    </div>
  );
};

export default PatientProfilePage;


