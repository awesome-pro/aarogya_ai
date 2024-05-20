"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/Faq";

interface Prescription {
  diagnosis: string;
  medication: string;
  dosage: string;
  notes: string;
}

interface HistoryRecord {
  date: string;
  time: string;
  doctor: string;
  diagnosis: string;
  prescriptions: string[];
  notes: string;
}

interface PastAppointment {
  date: string;
  doctor: string;
  treatment: string;
  outcome: string;
}

interface PatientData {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  condition: string;
  emergency: boolean;
  image: string;
  bodyImage?: string;
  address: string;
  contactNumber: string;
  height: string;
  weight: string;
  allergies: string[];
  history: HistoryRecord[];
  pastAppointments: PastAppointment[];
}

const PatientDetail: React.FC = () => {
  const router = useRouter();
  // const { id } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prescription, setPrescription] = useState<Prescription>({
    diagnosis: "",
    medication: "",
    dosage: "",
    notes: "",
  });

  const patientData: PatientData = {
    id: 1,
    name: "Patient-1",
    email: "patient000@gmail.com",
    age: 16,
    gender: "Female",
    condition: "Lungs Infection",
    emergency: true,
    image: "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    // bodyImage: "https://example.com/body-image.jpg",
    address: "123 Main St, Springfield, IL",
    contactNumber: "+1234567890",
    height: "5'4\"",
    weight: "120 lbs",
    allergies: ["Peanuts", "Penicillin"],
    history: [
      {
        date: "2023-04-15",
        time: "10:30 AM",
        doctor: "Dr. John Doe",
        diagnosis: "Common Cold",
        prescriptions: ["Paracetamol 500mg", "Cough Syrup"],
        notes: "Patient advised to rest and stay hydrated.",
      },
      // Add more history records here
    ],
    pastAppointments: [
      {
        date: "2023-03-20",
        doctor: "Dr. Jane Smith",
        treatment: "Bronchitis",
        outcome: "Recovered",
      },
      // Add more past appointments here
    ],
  };

  // if (!id) return <div>Loading...</div>;

  const handlePrescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrescription((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPrescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle prescription submission logic here
    console.log("Prescription submitted:", prescription);
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-900">Patient Detail</h1>
          <h2 className="text-blue-800 mb-8">Detailed information about the patient</h2>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <img src={patientData.image} alt="Patient Image" className="w-60 h-60 object-cover rounded-lg shadow-md" />
            {patientData.bodyImage && (
              <img src={patientData.bodyImage} alt="Body Image" className="w-60 h-60 object-cover rounded-lg shadow-md" />
            )}
            <div>
              <h2 className="text-2xl font-bold">{patientData.name}</h2>
              <p className="text-gray-600">{patientData.email} | Age: {patientData.age}</p>
              <p className="text-gray-600">Gender: {patientData.gender}</p>
              <p className="text-gray-600">Contact Number: {patientData.contactNumber}</p>
              <p className="text-gray-600">Address: {patientData.address}</p>
              <p className="text-gray-600">Height: {patientData.height}</p>
              <p className="text-gray-600">Weight: {patientData.weight}</p>
              <p className="text-gray-600">Allergies: {patientData.allergies.join(", ")}</p>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">{patientData.condition}</h3>
                <p className={patientData.emergency ? "text-red-500" : "text-gray-600"}>
                  {patientData.emergency ? "Emergency" : "Non-Emergency"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Patient History</h3>
            {patientData.history.map((record, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg shadow">
                <div className="flex justify-between">
                  <h4 className="text-lg font-semibold">{record.date} at {record.time}</h4>
                  <p className="text-gray-600">{record.doctor}</p>
                </div>
                <p className="text-gray-600 mt-2"><strong>Diagnosis:</strong> {record.diagnosis}</p>
                <p className="text-gray-600"><strong>Prescriptions:</strong> {record.prescriptions.join(", ")}</p>
                <p className="text-gray-600"><strong>Notes:</strong> {record.notes}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Past Appointments</h3>
            {patientData.pastAppointments.map((appointment, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg shadow">
                <div className="flex justify-between">
                  <h4 className="text-lg font-semibold">{appointment.date}</h4>
                  <p className="text-gray-600">{appointment.doctor}</p>
                </div>
                <p className="text-gray-600 mt-2"><strong>Treatment:</strong> {appointment.treatment}</p>
                <p className="text-gray-600"><strong>Outcome:</strong> {appointment.outcome}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl"
            >
              Prescribe Medication
            </button>
          </div>
        </div>
      </div>
      <FAQ />
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Prescribe Medication</h2>
            <form onSubmit={handleSubmitPrescription}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="diagnosis">
                  Diagnosis
                </label>
                <input
                  type="text"
                  id="diagnosis"
                  name="diagnosis"
                  value={prescription.diagnosis}
                  onChange={handlePrescriptionChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="medication">
                  Medication
                </label>
                <input
                  type="text"
                  id="medication"
                  name="medication"
                  value={prescription.medication}
                  onChange={handlePrescriptionChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="dosage">
                  Dosage
                </label>
                <input
                  type="text"
                  id="dosage"
                  name="dosage"
                  value={prescription.dosage}
                  onChange={handlePrescriptionChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={prescription.notes}
                  onChange={handlePrescriptionChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientDetail;

            
