"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/Faq';
import Link from 'next/link';

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
  const [doctorData, setDoctorData] = useState<DoctorProfileProps>(initialDoctorData);

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
    setDoctorData({
      ...doctorData,
      specialty: [...doctorData.specialty, ''],
    });
  };

  const handleRemoveSpecialty = (index: number) => {
    const updatedSpecialties = doctorData.specialty.filter((_, i) => i !== index);
    setDoctorData({
      ...doctorData,
      specialty: updatedSpecialties,
    });
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
      <Header />
      <div className="min-h-screen bg-white py-4 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Edit Doctor Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/5 flex flex-col items-center mb-8 md:mb-0">
                <img
                  src={doctorData.profileImage}
                  alt="Profile Image"
                  className="rounded-full mb-4 w-40 h-40 object-cover shadow-md"
                />
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="md:w-4/5 md:pl-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-bold text-xl mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={doctorData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={doctorData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={doctorData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={doctorData.experience}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Clinic Address</label>
                    <input
                      type="text"
                      name="clinicAddress"
                      value={doctorData.clinicAddress}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Consultation Fee</label>
                    <input
                      type="text"
                      name="consultationFee"
                      value={doctorData.consultationFee}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Availability</label>
                    <input
                      type="text"
                      name="availability"
                      value={doctorData.availability}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-xl mb-2">Qualifications</label>
                    <input
                      type="text"
                      name="qualifications"
                      value={doctorData.qualifications}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-bold text-xl mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={doctorData.bio}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-bold text-xl mb-2">Specialty</label>
                    {doctorData.specialty.map((spec, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecialty(index)}
                          className="ml-2 text-red-500 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddSpecialty}
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
                    >
                      Add Specialty
                    </button>
                  </div>
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
      <FAQ />
      <Footer />
    </>
  );
};

export default EditDoctorProfile;
