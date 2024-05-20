"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/Faq';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  medications: string;
  symptoms: string;
  voiceInput: string;
  bodyImage: File | null;
  prescriptionImage: File | null;
}

const Book: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    age: '',
    medications: '',
    symptoms: '',
    voiceInput: '',
    bodyImage: null,
    prescriptionImage: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleVoiceInput = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      setFormData({ ...formData, voiceInput: event.results[0][0].transcript });
    };
    recognition.start();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Process form submission (e.g., send data to backend)
    console.log(formData);
  };

  return (
    <div>
    
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-xl transition duration-500 ease-in-out transform hover:scale-105">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Book a <span className="text-blue-500">Free Clinic</span> Visit</h1>
            <p className="text-gray-600 mb-8">Please fill out the form below to book your visit.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="pb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your name"
                />
              </div>
              <div className="pb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your email"
                />
              </div>
              <div className="pb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your phone number"
                />
              </div>
              <div className="pb-4">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your age"
                />
              </div>
            </div>
            <div className="pb-4">
              <label className="block text-sm font-medium text-gray-700">Medications</label>
              <input
                type="text"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                required
                className="appearance-none rounded-md block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Current medications"
              />
            </div>
            <div className="pb-4">
              <label className="block text-sm font-medium text-gray-700">Symptoms</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
                className="appearance-none rounded-md block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Describe your symptoms"
              />
            </div>
            {/* <div className="pb-4">
              <label className="block text-sm font-medium text-gray-700">Voice Message</label>
              <button
                type="button"
                onClick={handleVoiceInput}
                className="mt-1 mb-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
                Record Voice
              </button>
              <textarea
                name="voiceInput"
                value={formData.voiceInput}
                readOnly
                className="appearance-none rounded-md block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Your voice message will appear here"
              />
            </div> */}
            <div className="pb-4">
              <label className="block text-sm font-medium text-gray-700">Body Image</label>
              <input
                type="file"
                name="bodyImage"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-50"
              />
              <p className="mt-2 text-sm text-gray-500">Use your camera to take a picture of your body.</p>
            </div>
            <div className="pb-4">
              <label className="block text-sm font-medium text-gray-700">Prescription Image</label>
              <input
                type="file"
                name="prescriptionImage"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-50"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Submit
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

export default Book;

