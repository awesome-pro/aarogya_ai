"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import axios from 'axios';

interface DoctorSignupFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  experience: string;
  clinicAddress: string;
  consultationFee: string;
  availability: string;
  qualifications: string;
  bio: string;
  password: string;
  place: string;
  latitude: string;
  longitude: string;
}

const DoctorSignup: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<DoctorSignupFormData>({
    name: '',
    email: '',
    phone: '',
    department: '',
    experience: '',
    clinicAddress: '',
    consultationFee: '',
    availability: '',
    qualifications: '',
    bio: '',
    password: '',
    place: '',
    latitude: '',
    longitude: ''
  });

  const departments = [
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Dermatology', label: 'Dermatology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Orthopedics', label: 'Orthopedics' },
    { value: 'Pediatrics', label: 'Pediatrics' },
    { value: 'Psychiatry', label: 'Psychiatry' },
    { value: 'Surgery', label: 'Surgery' },
    { value: 'General Medicine', label: 'General Medicine' },
    { value: 'Allergy and Immunology', label: 'Allergy and Immunology' },
    { value: 'Anesthesiology', label: 'Anesthesiology' },
    { value: 'Emergency Medicine', label: 'Emergency Medicine' },
    { value: 'Endocrinology', label: 'Endocrinology' },
    { value: 'Gastroenterology', label: 'Gastroenterology' },
    { value: 'Geriatrics', label: 'Geriatrics' },
    { value: 'Hematology', label: 'Hematology' },
    { value: 'Infectious Disease', label: 'Infectious Disease' },
    { value: 'Internal Medicine', label: 'Internal Medicine' },
    { value: 'Nephrology', label: 'Nephrology' }
  ];

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDepartmentChange = (selectedOption: any) => {
    setFormData({ ...formData, department: selectedOption.value });
  };

  const getCoordinates = async (address: string, place: string) => {
    const options = {
      method: 'POST',
      url: 'https://google-api31.p.rapidapi.com/map',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'a74f98ca07msh13a3e05599ca2aep1dbfd2jsnd0b1eab05732',
        'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
      },
      data: {
        text: address,
        place: place,
        street: '',
        city: '',
        country: '',
        state: '',
        postalcode: '',
        latitude: '',
        longitude: '',
        radius: ''
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      if (response.status === 200) {
        const location = response.data.result[0];
        console.log(location);
        return {
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString()
        };
      } else {
        throw new Error('Failed to get coordinates');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get coordinates');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { latitude, longitude } = await getCoordinates(formData.clinicAddress, formData.place);
      console.log(latitude);
      console.log(longitude);
      const updatedFormData = {
        ...formData,
        latitude,
        longitude
      };

      const response = await fetch('/api/doctor/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFormData)
      });

      console.log(updatedFormData);

      if (response.ok) {
        setSuccess('Doctor signed up successfully');
      } else {
        setError('Failed to sign up');
      }
    } catch (error: any) {
      setError('Failed to sign up: ' + error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <FormError message={error} />}
      {success && <FormSuccess message={success} />}

      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-center">Loading...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-blue-100 flex">
        <div className="hidden md:block md:w-1/2 bg-cover rounded-l-2xl" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}></div>
        <div className="flex flex-col justify-center md:w-1/2 p-8 bg-white">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Doctor Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Full Name"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Phone Number"
                />
              </div>
              <div className='w-full'>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <Select
                  id="department"
                  name="department"
                  options={departments}
                  placeholder="Department"
                  value={departments.find(department => department.value === formData.department) || null}
                  onChange={handleDepartmentChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Years of Experience"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Place</label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Place"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Clinic Address</label>
                <input
                  type="text"
                  name="clinicAddress"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Clinic Address"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
                <input
                  type="text"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Consultation Fee"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Availability</label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                placeholder="Availability (e.g., Mon-Fri, 9am-5pm)"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Qualifications</label>
              <input
                type="text"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                placeholder="Qualifications"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                placeholder="Short Bio"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                placeholder="Password"
              />
            </div>
            <div className="pt-5">
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorSignup;
