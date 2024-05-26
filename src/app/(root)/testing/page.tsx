"use client";

import React, { useState } from 'react';
import Symptoms from '@/components/Symptoms';
import { Button } from '@/components/ui/button';
import { CirclePowerIcon } from 'lucide-react';

const Home: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const departments: string[] = ["Cardiology", "Neurology"]; // Example departments

  const handleSymptomSelection = (symptom: string, selected: boolean) => {
    const newSelectedSymptoms = selected
      ? [...selectedSymptoms, symptom]
      : selectedSymptoms.filter(s => s !== symptom);

    setSelectedSymptoms(newSelectedSymptoms);
  };

  const findDepartment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms: selectedSymptoms })
      });

      console.log(response.body);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSelectedDisease(data.prediction || []);
        // setSelectedDepartment(data.result.departments || []);
        setShowResults(true);
      } else {
        console.error('Failed to fetch department data');
      }
    } catch (error) {
      console.error('An error occurred while fetching department data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    findDepartment();
  };

  const handleDismiss = () => {
    setShowResults(false);
    setSelectedDisease([]);
    setSelectedDepartment([]);
  };

  return (
    <div>
      {showResults && (
        <div className="bg-gray-100 p-6 rounded-xl fixed top-1/3 left-1/3 w-1/3 h-auto flex flex-col items-center justify-center z-50 shadow-xl border-2 border-black">
  <h2 className="text-lg font-semibold mb-4">Result:</h2>
  <div className="text-md">
    {selectedDisease.length > 0 && (
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Diseases you may have:</h3>
        <ul className="list-disc pl-4">
          {selectedDisease.map((disease, index) => (
            <li key={index}>{disease}</li>
          ))}
        </ul>
      </div>
    )}
    {selectedDepartment.length > 0 && (
      <div>
        <h3 className="font-semibold mb-2">Departments you must visit:</h3>
        <ul className="list-disc pl-4">
          {selectedDepartment.map((department, index) => (
            <li key={index}>{department}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
  <button onClick={handleDismiss} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400">
    OK
  </button>
</div>
      )}

      <div className="flex flex-col justify-center items-center">
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

          <Button
            onClick={handleSubmit}
            className="m-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-3xl border-2 w-48"
            disabled={isLoading}
          >
            {isLoading ? <div>
              Loading..
              <CirclePowerIcon size={16} className="animate-spin ml-2" />
            </div> : 'Submit'}
          </Button>

          <Symptoms handleSymptomSelection={handleSymptomSelection} />
        </div>
      </div>
    </div>
  );
};

export default Home;
