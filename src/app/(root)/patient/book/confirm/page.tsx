"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import FAQ from '@/components/Faq';
import { Button } from '@/components/ui/button';

const Confirmation: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <div className="min-h-screen bg-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="p-6 rounded-lg text-center">
          <FontAwesomeIcon icon={faCircleCheck} className='text-9xl text-blue-500 pb-7' />
            <h1 className="text-3xl font-extrabold text-blue-950 mb-4">Appointment Confirmed</h1>
            <p className="text-gray-700 mb-4">Thank you for booking your appointment. We have received your request and will get back to you soon.</p>
            <button
              onClick={() => router.push('/')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Homepage
            </button>
            <br />
            <Button
              className='bg-sky-500 text-white font-bold px-3 py-5 rounded-xl mt-4 w-full hover:bg-sky-400 hover:text-white'
              onClick={() => router.back() }
            >
              Book More Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
