"use client";
import React, { useState, useEffect } from 'react';
import Symptoms from '@/components/Symptoms';

interface Doctor {
  name: string;
  specialty: string;
  location: string;
  contact: string;
}

interface Department {
  name: string;
  doctors: Doctor[];
}

const Home: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const departments: Department[] = [
    {
      name: 'Cardiology',
      doctors: [
        { name: 'Dr. John Doe', specialty: 'Cardiologist', location: 'Hospital A', contact: '123-456-7890' },
        { name: 'Dr. Jane Smith', specialty: 'Cardiologist', location: 'Hospital B', contact: '456-789-0123' },
      ],
    },
    ];

  const handleSymptomSelection = (symptom: string, selected: boolean) => {
    const newSelectedSymptoms = selected
      ? [...selectedSymptoms, symptom]
      : selectedSymptoms.filter(s => s !== symptom);

    setSelectedSymptoms(newSelectedSymptoms);
  };

  useEffect(() => {
    findDepartment();
  }, [selectedSymptoms]);

  const findDepartment = () => {
    const symptomKeywords = selectedSymptoms.map(symptom => symptom.toLowerCase());
    const department = departments.find(dept => {
      const departmentKeywords = dept.name.toLowerCase().split(' ');
      return symptomKeywords.some(keyword => departmentKeywords.includes(keyword));
    });
    setSelectedDepartment(department || null);
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <div className="text-4xl font-bold text-blue-500 mb-2">Symptom Checker</div>
          <p className="text-gray-600 text-lg">Select your symptoms:</p>
        </div>
        <div className="m-4">
          <p className="font-semibold">Selected Symptoms:</p>
          <ul>
            {selectedSymptoms.map(symptom => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </div>

        <Symptoms handleSymptomSelection={handleSymptomSelection} />
        
        {selectedDepartment && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-blue-500 mb-2">Department: {selectedDepartment.name}</h2>
            <h3 className="text-xl font-semibold mb-2">Doctors:</h3>
            <ul>
              {selectedDepartment.doctors.map(doctor => (
                <li key={doctor.name}>
                  <div>
                    <b>{doctor.name}</b> - {doctor.specialty}
                  </div>
                  <div>Location: {doctor.location}</div>
                  <div>Contact: {doctor.contact}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
