"use client";

import React, { useState } from 'react';
import Symptoms from '@/components/Symptoms';
import { Button } from '@/components/ui/button';
import { CirclePowerIcon } from 'lucide-react';
import axios from 'axios';
import { error } from 'console';

const Home: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const departments: string[] = ["Cardiology", "Neurology"]; // Example departments

  const handleSymptomSelection = (symptom: string, selected: boolean) => {
    const newSelectedSymptoms = selected
      ? [...selectedSymptoms, symptom.toLowerCase()]
      : selectedSymptoms.filter(s => s.toLowerCase() !== symptom.toLowerCase());

    setSelectedSymptoms(newSelectedSymptoms);
  };

  const findDepartment = async () => {
    if(selectedSymptoms.length < 10){
      alert("Mark atleast 10 symptoms");
      return;
    }

    setIsLoading(true);
    console.log("hello");
    console.log(selectedSymptoms);
    try {
      const response = await axios.post('http://localhost:3000/api/get-ml-prediction', {
        symptoms: selectedSymptoms 
      });

      console.log(response);

      if (response.status) {
        console.log(response);
        setSelectedDisease(response.data.prediction || []);
        // setSelectedDepartment(data.result.departments || []);
        console.log(response.data.prediction)
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
        <div className="bg-gray-100 p-6 rounded-xl fixed top-1/2 md:top-1/3 md:left-1/3 w-full md:w-1/3 h-auto flex flex-col items-center justify-center z-50 shadow-xl border-2 border-black">
  <h2 className="text-lg font-semibold mb-4">Result:</h2>
  <div className="text-md">
    {selectedDisease.length > 0 && (
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Prediction:</h3>
        <p>{selectedDisease}</p>
      </div>
    )}
    {/* {selectedDepartment.length > 0 && (
      <div>
        <h3 className="font-semibold mb-2">Departments you must visit:</h3>
        <ul className="list-disc pl-4">
          {selectedDepartment.map((department, index) => (
            <li key={index}>{department}</li>
          ))}
        </ul>
      </div>
    )} */}
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
            <p className="text-red-500 text-base">Please select atleast 10 symptoms to predict the disease</p>
          </div>
          {/* <div className="m-4">
            <p className="font-semibold">Selected Symptoms:</p>
            <ul>
              {selectedSymptoms.map(symptom => (
                <li key={symptom}>{symptom}</li>
              ))}
            </ul>
          </div> */}

           <div>
           <h1 className="text-black text-base">Total symptoms Selected : {selectedSymptoms.length}</h1>
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

