"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import FAQ from '@/components/Faq';
import Footer from '@/components/Footer';

interface DoctorSignupFormData {
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
  profileImage: File | null;
  password: string;
}

const DoctorSignup: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<DoctorSignupFormData>({
    name: '',
    email: '',
    phone: '',
    specialty: [],
    experience: '',
    clinicAddress: '',
    consultationFee: '',
    availability: '',
    qualifications: '',
    bio: '',
    profileImage: null,
    password: ''
  });

  const specializations = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Surgery',
    'General Medicine',
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'speciality') {
      const options = (e.target as HTMLSelectElement).options;
      const selectedSpecializations = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData({ ...formData, [name]: selectedSpecializations });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Process form submission (e.g., send data to backend)
    console.log(formData);
    // Redirect to the doctor's dashboard after successful sign-up
    router.push('/profile');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-blue-100 flex">
        <div className="hidden md:block md:w-1/2 bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}></div>
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
              <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <select
                id="speciality"
                value={formData.specialty}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
              >
                <option value="">Specialization...</option>
                {specializations.map((title) => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
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
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Availability (e.g., Mon-Fri, 10am-5pm)"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 h-24"
                  placeholder="Brief Bio"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
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
                placeholder="password"
              />
            </div>
          <div className="text-center">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
    <FAQ />
    <Footer />
    </>
  );
};

export default DoctorSignup;
