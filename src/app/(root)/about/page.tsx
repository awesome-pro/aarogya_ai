"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/Faq';
import Image from 'next/image';

// Team Member Data
const teamMembers = [
  {
    name: 'ABHINANDAN VERMA',
    role: 'Full Stack Developer',
    image: 'https://res.cloudinary.com/dkddnw4le/image/upload/v1716118754/WhatsApp_Image_2024-05-19_at_3.00.44_PM_qbbvcl.jpg',
  },
  {
    name: 'SAHIL GUPTA',
    role: 'Full Stack Developer',
    image: 'https://res.cloudinary.com/dkddnw4le/image/upload/v1708449132/o8zfwddyvwrrqwxirkqa.jpg',
  },
  {
    name: 'DAKSHIKA CHAUDHARY',
    role: 'Frontend Developer',
    image: 'https://res.cloudinary.com/dkddnw4le/image/upload/v1716118057/WhatsApp_Image_2024-05-19_at_3.59.30_PM_o26fhy.jpg',
  },
  // {
  //   name: 'Daisy Lee',
  //   role: 'Project Manager',
  //   image: 'https://via.placeholder.com/150',
  // },
];


const AboutUs: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center py-8">
        <div className="w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-6 text-center">About Us</h1>

          {/* Company Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to provide comprehensive and accessible healthcare solutions for both patients and doctors. We aim to bridge the gap between healthcare providers and patients through technology and innovation.
            </p>
          </section>

          {/* Our Pages */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Pages</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>Home:</strong> Welcome to our platform. Discover how we connect patients with the best doctors.
              </li>
              <li>
                <strong>Doctor Signup:</strong> Doctors can register on our platform to offer their services.
              </li>
              <li>
                <strong>Doctor Signin:</strong> Registered doctors can log in to their accounts.
              </li>
              <li>
                <strong>Patient Signup:</strong> Patients can create an account to access our services.
              </li>
              <li>
                <strong>Patient Signin:</strong> Registered patients can log in to their accounts.
              </li>
              <li>
                <strong>Patient Profile:</strong> Patients can view and manage their personal and medical information.
              </li>
              <li>
                <strong>Doctor Profile:</strong> Doctors can manage their profiles, including personal and professional details.
              </li>
              <li>
                <strong>All Doctors:</strong> A comprehensive list of all doctors available on our platform.
              </li>
              <li>
                <strong>History:</strong> Patients can view their medical history and doctors can view their practice history.
              </li>
            </ul>
          </section>

          {/* Team Members */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full mb-4 object-cover"
                    width={160}
                    height={160}
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <FAQ/>
      <Footer />
    </>
  );
};

export default AboutUs;
