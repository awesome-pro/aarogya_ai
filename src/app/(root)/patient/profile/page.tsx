"use client";

import FAQ from '@/components/Faq';
import Footer from '@/components/Footer';
import Navbar from '@/components/Header';
import Link from 'next/link';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Patient {
  data(data: any): unknown;
  name: string;
  email: string;
  gender: string;
  contactNumber: string;
  age: number;
  dob: string;
  address: string;
  height: string;
  weight: string;
  bloodGroup: string;
  allergies: string;
  chronicConditions: string;
  medications: string;
  // Add other properties as needed
}

const PatientProfilePage: React.FC = () => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { searchParams } = new URL(window.location.href);
  const patientId = searchParams.get('id');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get<Patient>(`/api/get-patient-by-id?id=${patientId}`);
        console.log(response.data);
        setPatientData(response.data.data);
      } catch (error) {
        setError('An error occurred while fetching patient data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* <Navbar /> */}

      <div className="py-20 bg-white">
        <div className="rounded-lg p-6 flex flex-col">
          <section className="flex items-center justify-center flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 lg:pl-8 mt-4 lg:mt-0 border border-black p-5">
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Name: </span>{patientData?.name}</p>
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Gender: </span>{patientData?.gender}</p>
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Email-Id: </span>{patientData?.email}</p>
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Contact Number: </span>{patientData?.contactNumber}</p>
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Age: </span>{patientData?.age}</p>
              <p className="text-black text-xl"><span className="font-bold text-blue-700">Date of Birth: </span>{patientData?.dob}</p>
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
              <h3 className="text-xl font-bold mb-2 text-blue-700">Chronic Conditions</h3>
              <p className="text-lg">{patientData?.chronicConditions}</p>
            </div>

            <div className="mb-4 border border-black p-5">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Medications Currently Taking</h3>
              <p className="text-lg">{patientData?.medications}</p>
            </div>

            {/* <div className="mb-4 border border-black p-5">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Medical History</h3>
              <Link href="/" className="hover:text-red-600 text-xl">Click here</Link>
            </div> */}
          </section>
        </div>

        <div className="flex justify-center items-center gap-7">
          <Link href="/patient/profile/edit">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl">Edit your profile</button>
          </Link>
          <Link href="/patient/history">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl">View Patient history</button>
          </Link>
        </div>
      </div>
      
      <FAQ />
      <Footer />
    </div>
  );
};

export default PatientProfilePage;


