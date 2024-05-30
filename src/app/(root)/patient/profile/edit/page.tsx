"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/Faq';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { useToast } from '@/components/ui/use-toast';

interface PatientData {
  name: string;
  age: number;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  allergies: string;
  currentMedications: string;
}

interface EditProfileProps {
  patientData: PatientData;
}

const EditProfile: React.FC<EditProfileProps> = () => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [bloodGroup, setBloodGroup] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [allergies, setAllergies] = useState<string>('');
  const [currentMedications, setCurrentMedications] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const idFromParams = searchParams.get('id');

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    if (idFromParams) {
      setId(idFromParams);
      fetchPatientData(idFromParams);
    } else {
      setError('Patient ID not found in URL');
      setLoading(false);
    }
  }, [idFromParams]);

  const fetchPatientData = async (id: string) => {
    try {
      const response = await axios.get(`/api/get-patient-by-id?id=${id}`);
      const data = response.data.data;
      setName(data.name);
      setAge(data.age);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setAddress(data.address);
      setGender(data.gender);
      setBloodGroup(data.bloodGroup);
      setHeight(data.height);
      setWeight(data.weight);
      setAllergies(data.allergies);
      setCurrentMedications(data.currentMedications);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setError('Failed to fetch patient data');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'age':
        setAge(parseInt(value));
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'bloodGroup':
        setBloodGroup(value);
        break;
      case 'height':
        setHeight(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'allergies':
        setAllergies(value);
        break;
      case 'currentMedications':
        setCurrentMedications(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      setError('No patient ID provided');
      return;
    }
    const updatedPatientData = {
      id,
      name,
      age,
      email,
      phoneNumber,
      address,
      gender,
      bloodGroup,
      height,
      weight,
      allergies,
      currentMedications,
    };

    console.log(updatedPatientData);

    try {
      await axios.post(`/api/update-patient-details?id=${id}`, updatedPatientData);
      console.log('Patient data updated successfully');
      toast({
        title: 'Patient data updated successfully',
        variant: 'success',
        description: 'Patient data has been updated successfully',
      })
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div><FormError  message={error}/></div>;
  }

  return (
    <div>
      <FormSuccess message="Patient data fetched successfully" />
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
                    value={name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={gender}
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
                    value={bloodGroup}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={height}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={weight}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Allergies</label>
                  <textarea
                    name="allergies"
                    value={allergies}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700">Current Medications</label>
                  <textarea
                    name="currentMedications"
                    value={currentMedications}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
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
    </div>
  );
};

export default EditProfile;

