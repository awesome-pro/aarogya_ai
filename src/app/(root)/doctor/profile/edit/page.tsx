"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface DoctorProfile {
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  experience: number;
  clinicAddress: string;
  consultationFee: number;
  availability: string;
  qualification: string;
  bio: string;
}

export default function EditProfile() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const router = useRouter();

  const { searchParams } = new URL(window.location.href);
  const id = searchParams.get('id');

  useEffect(() => {
    // Fetch the original profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/doctor/get-doctor-details?id=${id}`); // Replace with actual API endpoint
        setProfile(response.data.doctor);
        console.log(response.data.doctor);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    console.log(profile);

    try {
      await axios.post(`/api/doctor/update-doctor-details?id=${id}`, profile);
      alert('Profile updated successfully!');
      router.push('/profile'); // Redirect to profile page
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Failed to load profile data.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Department</label>
            <select
              name="department"
              value={profile.department}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Rheumatology">Rheumatology</option>
              <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Otolaryngology (ENT)">Otolaryngology (ENT)</option>
              <option value="Urology">Urology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Hematology">Hematology</option>
              <option value="Oncology">Oncology</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Infectious Disease">Infectious Disease</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Clinic Address</label>
            <input
              type="text"
              name="clinicAddress"
              value={profile.clinicAddress}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Consultation Fee</label>
            <input
              type="number"
              name="consultationFee"
              value={profile.consultationFee}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Availability</label>
            <input
              type="text"
              name="availability"
              value={profile.availability}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Qualification</label>
            <input
              type="text"
              name="qualification"
              value={profile.qualification}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-blue-500 text-white p-2 rounded ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



