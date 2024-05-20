import React from "react";
import Image from "next/image";
import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
// import download from "@/public/images/images2.png";
// import Page from "@/app/fleets2/page";

interface Patient {
  image: string;
  name: string;
  email: string;
  age: number;
  condition: string;
  emergency: boolean;
}

const PatientCard: React.FC<Patient> = ({image, name, email, age, condition, emergency }) => (
  <div className="border rounded-lg overflow-hidden shadow-lg">
    <div className="relative">
      <img src={image} alt="background" className="object-cover w-full h-40" />
    </div>
    <div className="p-4">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{email} | Age: {age}</p>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{condition}</h3>
        <p className="text-gray-600">Under treatment</p>
      </div>
      <p className={emergency ? "text-red-500" : "text-gray-600"}>
        {emergency ? "Emergency" : "Non-Emergency"}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Confirm Appointment
        </button>
        <div className="text-right">
          <b>Today</b>
          <Link href="/doctor/patient-history/view-details">
          <button className="ml-2 text-blue-500 hover:text-blue-600">
            Check Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const Fleets: React.FC = () => {
  return (
    <>
    <Header/>
    <div className="container mx-auto py-8">
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Checkout Your Patients</h1>
      <h2 className="text-blue-800 mb-8">Where expertise meets empathy, your journey to wellness begins</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        <PatientCard
          image="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          name="Patient-1"
          email="patient000@gmail.com"
          age={16}
          condition="Lungs Infection"
          emergency={true}
        />
        
        {/* Add more PatientCard components for each patient */}
      </div>
    </div>
    <FAQ />
    <Footer/>
    </>
  );
}

export default Fleets;
