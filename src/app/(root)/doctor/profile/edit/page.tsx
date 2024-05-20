"use client";


import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/Faq';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Doctor } from '@/models/Doctor';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

const initialDoctorData: DoctorProfileProps = {
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






const EditDoctorProfile: React.FC = () => {

  const { data: sesssion } = useSession();
  const doctor = sesssion?.user as Doctor

  const [doctorData, setDoctorData] = useState<Doctor >(doctor);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);


  const updateDoctorDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      
      const response = await axios.put(`/api/doctor/update-doctor-details?id=${doctor._id}`, doctorData);

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('Failed to update doctor details');
      }
    } catch (error: any) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <>
      <div className="min-h-screen bg-white py-4 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Edit Doctor Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/5 flex flex-col items-center mb-8 md:mb-0">
                <Image
                  src={doctorData?.image || "/images/doctor-placeholder.jpg"}
                  alt="Profile Image"
                  className="rounded-full mb-4 w-40 h-40 object-cover shadow-md"
                  width={150}
                  height={150}
                />
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="md:w-4/5 md:pl-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-bold text-xl mb-2">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={doctorData?.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={doctor.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={doctor?.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={doctorData?.experience}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Clinic Address</label>
                    <input
                      type="text"
                      name="clinicAddress"
                      value={doctorData?.location}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Consultation Fee</label>
                    <input
                      type="text"
                      name="consultationFee"
                      value={doctorData?.consultationFee}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Availability</label>
                    <input
                      type="text"
                      name="availability"
                      value={doctorData?.availability}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Qualifications</label>
                    <input
                      type="text"
                      name="qualifications"
                      value={doctorData?.experience}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-bold text-xl mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={doctorData?.bio}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-bold text-xl mb-2">Specialty</label>
                    {doctorData?.specialty && doctorData.specialty.map((spec, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Input
                          type="text"
                          value={spec}
                          onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <Button
                          variant={'destructive'}
                          onClick={() => handleRemoveSpecialty(index)}
                          className="ml-2 text-red-500 font-bold"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant={'outline'}
                      onClick={handleAddSpecialty}
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
                    >
                      Add Specialty
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl"
                onClick={updateDoctorDetails}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
      <FAQ />
      <Footer />
    </>
  );
};

export default EditDoctorProfile;
