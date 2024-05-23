// "use client";

// import * as z from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Divide, Loader2 } from 'lucide-react'
// import { sign } from 'crypto'
// import { useRouter } from 'next/navigation'
// import { doctorFormSchema } from '@/lib/utils'
// import CustomDoctorInput from '@/components/CustomDoctorInput'
// import { FormError } from '@/components/FormError'
// import { FormSuccess } from '@/components/FormSuccess'
// import React, { useCallback, useEffect, useState } from 'react';
// import Header from '@/components/Header';
// import FAQ from '@/components/Faq';
// import Footer from '@/components/Footer';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import { signOut } from '@/auth';
// import { useSession } from 'next-auth/react';
// import { Doctor } from '@/models/Doctor';
// import axios from 'axios';
// import { set } from 'mongoose';
// import { FaExclamationTriangle } from 'react-icons/fa';
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

const DoctorProfile: React.FC = () => {
  const [doctorData, setDoctorData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const router = useRouter();
  const { searchParams } = new URL(window.location.href);
  const doctorId = searchParams.get('id');

  const fetchDoctorData = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/doctor/get-doctor-details?id=${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch doctor data');
      }
      setDoctorData(response.data.doctor);
    } catch (error) {
      setError(error?.toString() || 'Failed to fetch doctor data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (doctorId) {
      fetchDoctorData(doctorId);
    }
  }, [doctorId, fetchDoctorData]);

  return (
    <>
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-2xl font-semibold text-blue-900">Loading...</p>
        </div>
      )}

      {error ? (
        <div className="flex items-center justify-center bg-red-300 p-10 rounded-lg w-full">
          <ExclamationTriangleIcon className="w-15 h-15 text-red-600" />
          <p className="text-2xl font-semibold text-red-600">{error}</p>
        </div>
      ) : (
        <>
          <div className="min-h-screen bg-white py-4 flex items-center justify-center">
            <div className="w-full bg-white shadow-lg rounded-lg">
              <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Doctor Profile</h2>
              <div className="flex flex-col md:flex-row items-start mt-8">
                <div className="md:w-1/5 flex flex-col items-center mb-8 md:mb-0">
                  <Image
                    src={doctorData?.image || 'https://via.placeholder.com/150'}
                    alt="Profile Image"
                    className="rounded-full mb-4 w-60 h-60 object-cover shadow-md"
                    width={150}
                    height={150}
                  />
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold">{doctorData?.name || "Your name"}</h3>
                    <p className="text-gray-600 text-xl">{doctorData?.email || "Your Email"}</p>
                    <p className="text-gray-600 text-xl">{doctorData?.phoneNumber || "+91-1234567890"}</p>
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-bold text-xl">Department</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.department || ""}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Experience</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.experience || ""}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Clinic Address</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.clinicAddress || ""}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Consultation Fee</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.consultationFee || ""}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Availability</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.availability}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Qualifications</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.experience}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-xl">Bio</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-center items-center gap-10 pt-10 pb-6'>
                <Link href="/doctor/profile/edit">
                  <Button className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl'>Edit your profile</Button>
                </Link>
                <Link href='/doctor/patient-history'>
                  <Button className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl'>View Patient history</Button>
                </Link>
                <Button className='bg-red-500 text-white rounded-xl hover:bg-red-700 px-12' variant="destructive" 
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DoctorProfile;

