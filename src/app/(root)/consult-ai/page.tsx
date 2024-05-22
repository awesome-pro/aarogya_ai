"use client";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const RAPIDAPI_KEY = 'a74f98ca07msh13a3e05599ca2aep1dbfd2jsnd0b1eab05732';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface DepartmentSuggestion {
  userMessage: string;
  department: string;
}

interface Doctor {
  experience: ReactNode;
  name: string;
  specialty: string;
}

export default function Home() {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestedDepartment, setSuggestedDepartment] = useState<DepartmentSuggestion | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const handleUserInput = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages

    setIsLoading(true);
    const newUserMessage = { role: 'user', content: userInput };
    const updatedChatHistory = [...chatHistory, newUserMessage];

    setChatHistory(updatedChatHistory);
    setUserInput('');

    try {
      const response = await axios.post('https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: updatedChatHistory
      }, {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
        }
      });

      const aiResponse = response.data.choices[0].message.content;

      // Map AI response to a medical department
      const department = mapToDepartment(aiResponse);

      const newAssistantMessage = {
        role: 'assistant',
        content: `Based on your description, you should visit the ${department} department.`,
      };

      setChatHistory((prevChat) => [...prevChat, newAssistantMessage]);
      setSuggestedDepartment({ userMessage: userInput, department });

      // Fetch doctors for the suggested department
      const doctorData = await fetchDoctorData(department);
      setDoctors(doctorData);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: 'assistant', content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const mapToDepartment = (response: string): string => {
    const lowerCaseResponse = response.toLowerCase();
  
    if (lowerCaseResponse.includes('heart') || lowerCaseResponse.includes('chest pain') || lowerCaseResponse.includes('palpitations')) {
      return 'Cardiology';
    } else if (lowerCaseResponse.includes('headache') || lowerCaseResponse.includes('migraine') || lowerCaseResponse.includes('dizziness') || lowerCaseResponse.includes('seizure')) {
      return 'Neurology';
    } else if (lowerCaseResponse.includes('children') || lowerCaseResponse.includes('child') || lowerCaseResponse.includes('pediatric') || lowerCaseResponse.includes('infant')) {
      return 'Pediatrics';
    } else if (lowerCaseResponse.includes('skin') || lowerCaseResponse.includes('rash') || lowerCaseResponse.includes('acne') || lowerCaseResponse.includes('eczema') || lowerCaseResponse.includes('psoriasis')) {
      return 'Dermatology';
    } else if (lowerCaseResponse.includes('joint') || lowerCaseResponse.includes('arthritis') || lowerCaseResponse.includes('rheumatism') || lowerCaseResponse.includes('swollen joints')) {
      return 'Rheumatology';
    } else if (lowerCaseResponse.includes('pregnant') || lowerCaseResponse.includes('pregnancy') || lowerCaseResponse.includes('obstetric') || lowerCaseResponse.includes('gynecologic') || lowerCaseResponse.includes('menstrual')) {
      return 'Obstetrics and Gynecology';
    } else if (lowerCaseResponse.includes('lung') || lowerCaseResponse.includes('breathing') || lowerCaseResponse.includes('asthma') || lowerCaseResponse.includes('respiratory') || lowerCaseResponse.includes('cough')) {
      return 'Pulmonology';
    } else if (lowerCaseResponse.includes('stomach') || lowerCaseResponse.includes('abdominal') || lowerCaseResponse.includes('digestion') || lowerCaseResponse.includes('gut') || lowerCaseResponse.includes('bowel')) {
      return 'Gastroenterology';
    } else if (lowerCaseResponse.includes('mental health') || lowerCaseResponse.includes('depression') || lowerCaseResponse.includes('anxiety') || lowerCaseResponse.includes('psychological') || lowerCaseResponse.includes('psychiatric')) {
      return 'Psychiatry';
    } else if (lowerCaseResponse.includes('eye') || lowerCaseResponse.includes('vision') || lowerCaseResponse.includes('ophthalmic') || lowerCaseResponse.includes('sight')) {
      return 'Ophthalmology';
    } else if (lowerCaseResponse.includes('ear') || lowerCaseResponse.includes('nose') || lowerCaseResponse.includes('throat') || lowerCaseResponse.includes('hearing') || lowerCaseResponse.includes('sinus')) {
      return 'Otolaryngology (ENT)';
    } else if (lowerCaseResponse.includes('urinary') || lowerCaseResponse.includes('kidney') || lowerCaseResponse.includes('bladder') || lowerCaseResponse.includes('urological')) {
      return 'Urology';
    } else if (lowerCaseResponse.includes('bone') || lowerCaseResponse.includes('fracture') || lowerCaseResponse.includes('orthopedic') || lowerCaseResponse.includes('musculoskeletal')) {
      return 'Orthopedics';
    } else if (lowerCaseResponse.includes('blood') || lowerCaseResponse.includes('hematologic') || lowerCaseResponse.includes('anemia') || lowerCaseResponse.includes('clotting')) {
      return 'Hematology';
    } else if (lowerCaseResponse.includes('cancer') || lowerCaseResponse.includes('oncologic') || lowerCaseResponse.includes('tumor')) {
      return 'Oncology';
    } else if (lowerCaseResponse.includes('diabetes') || lowerCaseResponse.includes('hormone') || lowerCaseResponse.includes('thyroid') || lowerCaseResponse.includes('endocrine')) {
      return 'Endocrinology';
    } else if (lowerCaseResponse.includes('infection') || lowerCaseResponse.includes('fever') || lowerCaseResponse.includes('infectious disease') || lowerCaseResponse.includes('pathogen')) {
      return 'Infectious Disease';
    } else {
      return 'General';
    }
  };

  const fetchDoctorData = async (department: string): Promise<Doctor[]> => {
    const response = await fetch(`/api/get-doctor?department=${department}`);
    const data = await response.json();
    console.log(data);
    console.log(data.data);
    return data.data || [];
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-md bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <div className="text-4xl font-bold text-blue-500 mb-2">
            Medical Assistant
          </div>
          <p className="text-gray-600 text-lg">
            Describe your medical problem, and I will suggest the department you should visit.
          </p>
        </div>
        <div className="mb-4" style={{ height: '400px', overflowY: 'auto' }}>
          {chatHistory.map((message, index) => (
            <div key={index} className={`${message.role === 'user' ? 'text-left' : 'text-right'} mb-2`}>
              <div className={`rounded-xl p-2 max-w-md mx-4 inline-block ${message.role === 'user' ? 'text-black' : 'text-black'}`}>
                {message.role === 'user' ? 'You' : 'Bot'}
              </div>
              <div className={`max-w-md mx-3 rounded-xl my-2 inline-block ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'} p-2 rounded-md`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Describe your problem"
            value={userInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
            className="flex-1 p-2 rounded-l-lg border border-gray-300"
          />
          {isLoading ? (
            <div className="bg-blue-500 text-gray-100 p-2 rounded-r-lg animate-pulse">
              wait...
            </div>
          ) : (
            <button onClick={handleUserInput} className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
              Send
            </button>
          )}
        </div>
        {suggestedDepartment && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-blue-500 mb-2">Suggested Department</h2>
            <p>You described: "{suggestedDepartment.userMessage}"</p>
            <p>You should visit the <b>{suggestedDepartment.department}</b> department.</p>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-blue-500 mb-2">Available Doctors</h3>
              {doctors.length > 0 ? (
                <ul>
                  {doctors.map((doctor, index) => (
                    <li key={index} className="mb-2">
                      <b>{doctor.name}</b> - {doctor.experience} years
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No doctors available for this department.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

