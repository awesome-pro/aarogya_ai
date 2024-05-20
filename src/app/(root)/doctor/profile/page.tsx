"use client";
import React from 'react';
import Header from '@/components/Header';
import FAQ from '@/components/Faq';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { signOut } from '@/auth';
import { useSession } from 'next-auth/react';
import { Doctor } from '@/models/Doctor';

interface DoctorProfileProps {
  name: string;
  email: string;
  phone: string;
  specialty: string[];
  experience: string;
  clinicAddress: string;
  consultationFee: string;
  availability: string;
  qualifications: string;
  bio: string;
  profileImage: string; // URL or base64 string
}

const customDoctorData: DoctorProfileProps = {
  name: 'Dr. John Doe',
  email: 'johndoe@example.com',
  phone: '+1234567890',
  specialty: ['Cardiology', 'General Medicine'],
  experience: '15 years',
  clinicAddress: '123 Main St, Springfield, IL',
  consultationFee: '$200',
  availability: 'Mon-Fri, 9am-5pm',
  qualifications: 'MD, PhD in Cardiology',
  bio: 'Dr. John Doe is a highly experienced cardiologist with over 15 years of practice. He specializes in treating heart conditions and providing general medical care.',
  profileImage: 'https://via.placeholder.com/150', // Placeholder image URL
};

const fetchDoctorData = async (): Promise<DoctorProfileProps> => {
  // Fetch doctor data from the backend API

  
  return customDoctorData;
}

const DoctorProfile: React.FC = () => {
  const {
    name,
    email,
    phone,
    specialty,
    experience,
    clinicAddress,
    consultationFee,
    availability,
    qualifications,
    bio,
    profileImage,
  } = customDoctorData;

  const { data: session } = useSession();
  const doctor = session?.user as Doctor

  return (
    <>
    
      <div className="min-h-screen bg-white py-4 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Doctor Profile</h2>
          <div className="flex flex-col md:flex-row items-start mt-8">
            <div className="md:w-1/5 flex flex-col items-center mb-8 md:mb-0">
              <Image
                src={doctor?.image?.toString() || profileImage}
                alt="Profile Image"
                className="rounded-full mb-4 w-60 h-60 object-cover shadow-md"
                width={150}
                height={150}
              />
              <div className="text-center">
                <h3 className="text-2xl font-semibold">{doctor?.name.toString() || "Your name"}</h3>
                <p className="text-gray-600 text-xl">{doctor?.email.toString() || "Your Email"}</p>
                <p className="text-gray-600 text-xl">{doctor?.phoneNumber?.toString() || "+91-1234567890"}</p>
              </div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="font-bold text-xl">Specialty</h4>
                  <ul className="list-disc list-inside ml-4 text-gray-800 text-lg font-medium">
                    {specialty.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl">Experience</h4>
                  <p className="text-gray-800 text-lg font-medium">{experience}</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl">Clinic Address</h4>
                  <p className="text-gray-800 text-lg font-medium">{clinicAddress}</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl">Consultation Fee</h4>
                  <p className="text-gray-800 text-lg font-medium">{consultationFee}</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl">Availability</h4>
                  <p className="text-gray-800 text-lg font-medium">{availability}</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl">Qualifications</h4>
                  <p className="text-gray-800 text-lg font-medium">{qualifications}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-bold text-xl">Bio</h4>
                  <p className="text-gray-800 text-lg font-medium">{bio}</p>
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
        onClick={() => {
          // Sign out logic here
          signOut();
        }}
        >
          Sign Out
        </Button>
        </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
