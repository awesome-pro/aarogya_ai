"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/Faq';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface PatientData {
  name: string;
  age: number;
  email: string;
  contact: string;
  address: string;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  allergies: string;
  currentMedications: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

interface EditProfileProps {
  patientData: PatientData;
}

const EditProfile: React.FC<EditProfileProps> = ({ patientData: initialData }) => {
  const [patientData, setPatientData] = useState<PatientData>({
    name: initialData?.name || '',
    age: initialData?.age || 0,
    email: initialData?.email || '',
    contact: initialData?.contact || '',
    address: initialData?.address || '',
    gender: initialData?.gender || '',
    bloodGroup: initialData?.bloodGroup || '',
    height: initialData?.height || '',
    weight: initialData?.weight || '',
    allergies: initialData?.allergies || '',
    currentMedications: initialData?.currentMedications || '',
    emergencyContact: {
      name: initialData?.emergencyContact?.name || '',
      relation: initialData?.emergencyContact?.relation || '',
      phone: initialData?.emergencyContact?.phone || '',
    },
  });

  const router = useRouter();
  // const { id } = router.query;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      emergencyContact: {
        ...patientData.emergencyContact,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/api/patient`, patientData);
      console.log('Patient data updated successfully');
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  };

  return (
    <div>
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Edit Patient Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Details</h2>
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={patientData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={patientData.age}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={patientData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={patientData.contact}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={patientData.address}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={patientData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Medical Details</h2>
                <div>
                  <label className="block text-gray-700">Blood Group</label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={patientData.bloodGroup}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={patientData.height}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={patientData.weight}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Allergies</label>
                  <textarea
                    name="allergies"
                    value={patientData.allergies}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700">Current Medications</label>
                  <textarea
                    name="currentMedications"
                    value={patientData.currentMedications}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Contact</h2>
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={patientData.emergencyContact.name}
                  onChange={handleEmergencyContactChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Relation</label>
                <input
                  type="text"
                  name="relation"
                  value={patientData.emergencyContact.relation}
                  onChange={handleEmergencyContactChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={patientData.emergencyContact.phone}
                  onChange={handleEmergencyContactChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default EditProfile;
