"use client";
import React from 'react';
import Header from '@/components/Header';
import FAQ from '@/components/Faq';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface PatientHistoryProps {
  date: string;
  time: string;
  doctor: string;
  diagnosis: string;
  prescriptions: string[];
  notes: string;
}

const patientHistoryData: PatientHistoryProps[] = [
  {
    date: '2023-04-15',
    time: '10:30 AM',
    doctor: 'Dr. John Doe',
    diagnosis: 'Common Cold',
    prescriptions: ['Paracetamol 500mg', 'Cough Syrup'],
    notes: 'Patient advised to rest and stay hydrated.',
  },
  {
    date: '2022-12-10',
    time: '2:00 PM',
    doctor: 'Dr. Jane Smith',
    diagnosis: 'Hypertension',
    prescriptions: ['Amlodipine 5mg'],
    notes: 'Regular blood pressure monitoring recommended.',
  },
  {
    date: '2022-08-05',
    time: '11:00 AM',
    doctor: 'Dr. Mark Brown',
    diagnosis: 'Type 2 Diabetes',
    prescriptions: ['Metformin 500mg'],
    notes: 'Diet and exercise plan provided.',
  },
];

const PatientHistory: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-10">Patient History</h2>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 gap-4">
          {patientHistoryData.map((history, index) => (
            <div key={index} className="mb-8 border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-700">
                  {history.date} at {history.time}
                </h3>
                <p className="text-lg text-gray-600"><span className="font-bold text-blue-700">Doctor:</span> {history.doctor}</p>
              </div>
              <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-blue-700">Diagnosis</h4>
                  <p className="text-gray-700">{history.diagnosis}</p>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-blue-700">Prescriptions</h4>
                  <ul className="list-disc list-inside ml-4 text-gray-700">
                    {history.prescriptions.map((prescription, i) => (
                      <li key={i}>{prescription}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-blue-700">Notes</h4>
                  <p className="text-gray-700">{history.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/patient/profile">
          <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">Back to Profile</button>
        </Link>
      </div>
      <FAQ />
      <Footer />
    </>
  );
};

export default PatientHistory;
