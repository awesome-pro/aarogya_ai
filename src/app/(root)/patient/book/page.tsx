"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/Faq';

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  medications: string;
  symptoms: string;
}

const Book: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    age: '',
    medications: '',
    symptoms: '',
  });

  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const questions = [
    { label: 'Name', type: 'text', name: 'name' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Phone', type: 'tel', name: 'phone' },
    { label: 'Age', type: 'number', name: 'age' },
    { label: 'Medications', type: 'text', name: 'medications' },
    { label: 'Symptoms', type: 'textarea', name: 'symptoms' },
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory((prev) => [
        ...prev,
        { role: 'bot', content: `Please provide your ${questions[0].label}` },
      ]);
    }
  }, [chatHistory, questions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInput(value);
  };

  const handleNext = () => {
    const currentQuestion = questions[step];

    if (step < questions.length-1) {
      setStep(step + 1);
      setChatHistory((prev) => [
        ...prev,
        { role: 'user', content: userInput },
        { role: 'bot', content: `Please provide your ${questions[step+1].label}` },
      ]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [currentQuestion.name]: userInput,
      }));
      setChatHistory((prev) => [
        ...prev,
        { role: 'user', content: userInput },
        { role: 'bot', content: 'Thank you! Your appointment request has been submitted.' },
      ]);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [currentQuestion.name]: userInput,
    }));
    console.log(formData);
    setUserInput('');
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-xl transition duration-500 ease-in-out transform">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Book a <span className="text-blue-500">Free Clinic</span> Visit</h1>
            <p className="text-gray-600 mb-8">Please answer the questions below to book your visit.</p>
          </div>
          <div className="mb-4" style={{ height: '400px', overflowY: 'auto' }}>
            {chatHistory.map((message, index) => (
              <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-xl ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-6"
          >
            <input
              ref={inputRef}
              type="text"
              name={questions[step].name}
              value={userInput}
              onChange={handleChange}
              required
              className="appearance-none rounded-md block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={`Your ${questions[step].label.toLowerCase()}`}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Book;
