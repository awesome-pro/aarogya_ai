"use client";
// use client
import React, { useState } from 'react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/Faq';

const EditProfile: React.FC = () => {
  // Example data, in a real app this could come from an API or context
  const [patientData, setPatientData] = useState({
    profileImage: "",
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com',
    contact: '+1234567890',
    address: '123 Main St, Anytown, USA',
    gender: 'Male',
    dateOfBirth: '1993-01-01',
    bloodGroup: 'O+',
    height: '180 cm',
    weight: '75 kg',
    allergies: 'None',
    medicalHistory: 'No significant medical history',
    currentMedications: 'None',
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+0987654321',
    },
  });

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPatientData({
          ...patientData,
          profileImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, for example, send the updated data to an API
    console.log('Updated patient data:', patientData);
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Edit Patient Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Details</h2>
                <div className="flex items-center">
                  <img src={patientData.profileImage} alt="" className="bg-black w-40 h-40 rounded-full" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="name"
                  value={patientData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Name"
                />
                <input
                  type="number"
                  name="age"
                  value={patientData.age}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Age"
                />
                <input
                  type="email"
                  name="email"
                  value={patientData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="contact"
                  value={patientData.contact}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Contact"
                />
                <input
                  type="text"
                  name="address"
                  value={patientData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Address"
                />
                <input
                  type="text"
                  name="gender"
                  value={patientData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Gender"
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={patientData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Medical Details</h2>
                <input
                  type="text"
                  name="bloodGroup"
                  value={patientData.bloodGroup}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Blood Group"
                />
                <input
                  type="text"
                  name="height"
                  value={patientData.height}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Height"
                />
                <input
                  type="text"
                  name="weight"
                  value={patientData.weight}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Weight"
                />
                <textarea
                  name="allergies"
                  value={patientData.allergies}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Allergies"
                ></textarea>
                <textarea
                  name="medicalHistory"
                  value={patientData.medicalHistory}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Medical History"
                ></textarea>
                <textarea
                  name="currentMedications"
                  value={patientData.currentMedications}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Current Medications"
                ></textarea>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Contact</h2>
              <input
                type="text"
                name="name"
                value={patientData.emergencyContact.name}
                onChange={handleEmergencyContactChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Name"
              />
              <input
                type="text"
                name="relation"
                value={patientData.emergencyContact.relation}
                onChange={handleEmergencyContactChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Relation"
              />
              <input
                type="text"
                name="phone"
                value={patientData.emergencyContact.phone}
                onChange={handleEmergencyContactChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Phone"
              />
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
