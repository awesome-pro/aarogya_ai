"use client";
import React, { useState } from 'react';

const FAQ = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);
    const [isOpen9, setIsOpen9] = useState(false);
    const [isOpen10, setIsOpen10] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccordion2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleAccordion3 = () => {
    setIsOpen3(!isOpen3);
  };

  const toggleAccordion4 = () => {
    setIsOpen4(!isOpen4);
  };

  const toggleAccordion5 = () => {
    setIsOpen5(!isOpen5);
  };

  const toggleAccordion6 = () => {
    setIsOpen6(!isOpen6);
  };

  const toggleAccordion7 = () => {
    setIsOpen7(!isOpen7);
  };

  return (
    <>
    <div className='flex flex-col justify-center items-center'>
    <h1 className="text-sm font-bold text-blue-400 mt-6 mb-2">Get Your Answer</h1>
    <h1 className="text-3xl font-bold text-blue-900 mb-6">Frequently Asked Questions</h1>
    </div>
    <div className="container mx-auto px-5 py-10">
      <div className="flex flex-wrap items-center justify-between">
        {/* Image Section */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <img src="https://s3-alpha-sig.figma.com/img/e227/fb42/a6ada2ba341019c7efd2dc283f78b62d?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l3OCRUFc9kL2nVxnMYyY2qWLk4eHmCxuc1A53m4DDQNtExxzDwNjC8xkg-4FlGyxkmscQgPvy-4M11cT66C7lQXRJqynsMAyBsecT~oW1CZI9lDK4T8WjkuG3CZkIW5DsGZl2sJFvjv8OFHyigogPl1dJyhxygo-gQEZ--K0nG5rzN7YA2-RGwVwiZbn5CSkuQjG4A2XojoO9DG7yMuzcmU4Yt~dWd2BaCUQqHg2xqivtatdbMt4lwR6h1WtIzZzqGZ-cDgLzkdHJXjVPT4VYEF5vhTCKz~l~B7T6cF1KDcDxK5Xt~-3g0~DCAcAY54V~oVC3CajxSVAT-IUFERIgA__" alt="FAQ Image" className="w-2/3 h-auto" />
        </div>

        <div className='flex flex-col md:flex-row justify-center items-center px-10 text-xl w-2/3 font-medium'>
      <div className='w-full flex flex-col gap-2 md:mr-2'>
        <div className="accordion-item">
          <button
            className={`accordion-title justify-between flex items-center w-full ${isOpen ? 'accordion-open' : ''} hover:bg-gray-100 py-2 px-4 rounded-md`}
            onClick={toggleAccordion}
            aria-expanded={isOpen}
          >
            <span>Why choose our medical for your family?</span>
            <span className="accordion-icon text-blue-400">{isOpen ? '-' : '+'}</span>
          </button>
          {isOpen && (
            <div className="accordion-content py-2 px-4">
              Choose our medical services for your family for quality care by experienced professionals, comprehensive services, and convenient access to state-of-the-art facilities, ensuring personalized attention and continuity of care for your loved ones health and wellness needs.
            </div>
          )}
        </div>
        <div className="accordion-item">
          <button
            className={`accordion-title justify-between flex items-center w-full ${isOpen2 ? 'accordion-open' : ''} hover:bg-gray-100 py-2 px-4 rounded-md`}
            onClick={toggleAccordion2}
            aria-expanded={isOpen2}
          >
            <span>Why we are different from others?</span>
            <span className="accordion-icon text-blue-400">{isOpen2 ? '-' : '+'}</span>
          </button>
          {isOpen2 && (
            <div className="accordion-content py-2 px-4">
              We stand out from others due to our commitment to patient-centric care, innovative treatment approaches, and a compassionate team dedicated to empowering individuals on their healthcare journey.
            </div>
          )}
        </div>
        <div className="accordion-item">
          <button
            className={`accordion-title justify-between flex items-center w-full ${isOpen3 ? 'accordion-open' : ''} hover:bg-gray-100 py-2 px-4 rounded-md`}
            onClick={toggleAccordion3}
            aria-expanded={isOpen3}
          >
            <span>Trusted & experience senior care & love</span>
            <span className="accordion-icon text-blue-400">{isOpen3 ? '-' : '+'}</span>
          </button>
          {isOpen3 && (
            <div className="accordion-content py-2 px-4">
              Our focus on trusted and experienced senior care is driven by a deep sense of love and compassion for our elderly community members. We provide personalized support and companionship to ensure their well-being and happiness.
            </div>
          )}
        </div>
        <div className="accordion-item">
          <button
            className={`accordion-title justify-between flex items-center w-full ${isOpen4 ? 'accordion-open' : ''} hover:bg-gray-100 py-2 px-4 rounded-md`}
            onClick={toggleAccordion4}
            aria-expanded={isOpen4}
          >
            <span>How to get appointment for emergency cases?</span>
            <span className="accordion-icon text-blue-400">{isOpen4 ? '-' : '+'}</span>
          </button>
          {isOpen4 && (
            <div className="accordion-content py-2 px-4">
              For emergency cases, appointments can be swiftly secured by contacting our dedicated emergency hotline or visiting our medical facility directly. We prioritize urgent cases and ensure prompt medical attention to address critical situations effectively.
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default FAQ;
