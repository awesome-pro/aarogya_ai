"use client";

import React, { useState } from "react";
import Image from"next/image";
import Header from "@/components/Header";
import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";

import { faSearch, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from "@/components/Dropdown";

export default function Fleets(){

  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for cards
  const cardData = [
    {
      id: 1,
      name: "Dr. Shantanu Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 2,
      name: "Dr. Shantanu Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 3,
      name: "Dr. Shantanu Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 4,
      name: "Dr. Shantanu Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 5,
      name: "Dr. Shantanu Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 6,
      name: "Dr. Shant Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 7,
      name: "Dr. Shant Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 8,
      name: "Dr. Shant Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 9,
      name: "Dr. Shantanu Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 10,
      name: "Dr. Shantanu Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 11,
      name: "Dr. Shantanu Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    {
      id: 12,
      name: "Dr. Shantanu Jambhekar",
      specialty: "Dentist",
      experience: 16,
      location: "Parentheses, Mumbai",
      clinics: ["Smilessence Center for Advanced Dentistry"],
      availability: "Available Today",
    },
    // Add more card data as needed
  ];

  // Function to calculate the index of the first and last card to display
  const indexOfLastCard = currentPage * 4;
  const indexOfFirstCard = indexOfLastCard - 4;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  const [isDropDown , setIsDropDown ] = useState(false);

  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [doctorHospital, setDoctorHospital] = useState('');

  const handleVoiceSearch = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };
    recognition.start();
  };

    return(
        <>
        <Header />
       <div className="bg-blue-100">
        <style>{`
        .upper {
          background-color: whitesmoke;
          height: 75px;
          max-width: 1200px;
          padding: 0 2rem;
          margin: 0 auto;
          border-radius: 20px;
        }

        .location {
          margin-top: 22px;
          background-color: white;
          height: 30px;
          width: 300px;
          margin-left: 20px;
          padding: 14px;
          border-radius: 5px;
        }

        .location:hover {
          box-shadow: 1px 3px 3px 2px rgb(180, 179, 179);
        }

        .docterhospital {
          margin-top: 22px;
          background-color: white;
          height: 30px;
          width: 600px;
          margin-left: 20px;
          padding: 14px;
          border-radius: 5px;
        }

        .docterhospital:hover {
          box-shadow: 1px 3px 3px 2px rgb(180, 179, 179);
        }

        .searchbtn {
          height: 35px;
          width: 130px;
          background-color: rgb(41, 179, 243);
          margin-left: 20px;
          color: white;
          margin-top: 22px;
          border-radius: 4px;
        }

        .searchbtn:hover {
          height: 36px;
          width: 134px;
        }

        .container {
          max-width: 900px;
          padding: 0 2rem;
          margin: 0 auto;
        }

        .cardbox {
          background-color: whitesmoke;
          display: flex;
          border-radius: 20px;
          margin-top: 25px;
          box-shadow: 10px rgb(155, 88, 88);
        }

        .cardbox:hover {
          box-shadow: 4px 4px 5px 5px rgb(177, 185, 191);
        }

        .fleet--clip {
          margin-top: 10px;
          margin-left: 10px;
          border-radius: 60%;
          height: 150px;
          width: 150px;
          border: 4px solid rgb(65, 185, 240);
        }

        .drname {
          font-size: 25px;
          color: rgb(65, 185, 240);
          margin-top: 12px;
        }

        .drname:hover {
          color: rgb(25, 154, 213);
        }

        .commanbox {
          margin-left: 24px;
        }

        .h1 {
          font-size: 20px;
          margin-top: 8px;
        }

        .btn {
          color: white;
          background-color: rgb(41, 179, 243);
          height: 30px;
          width: 240px;
          margin-left: -45px;
          border-radius: 5px;
          margin-top: 5px;
        }

        .bookingbox {
          margin-left: 170px;
        }
      `}</style>
      <div className="bg-blue-500 w-full h-16 relative"></div>
       <div className="upper absolute top-32 left-52">
        <div className="flex">
        <input className="location" placeholder="Set your location"></input>
        <input className="docterhospital" placeholder="Ex.Docter,Hospital"></input> 
      <button className="searchbtn">Search</button>
        </div>
       </div>
       <br></br>

        <div className="container">
            <h3 className="font-semibold mb-1 text-black text-3xl mt-10">Doctors available in <span className="text-red-600">Andheri west</span></h3>
            <h2 className="text-gray-500">Book appointments with minimum wait-time & verified doctor details</h2>

<div className="container flex items-center justify-center flex-col gap-6 mt-10">
        {currentCards.map((card) => (
          <div key={card.id} className="cardbox">
            <div className="relative">
              <Image 
              src="/download.jpg" 
              alt="background" 
              className="fleet--clip" 
              width={200}
              height={200}
              />
            </div>
            <span className="commanbox">
              <h1 className="drname">{card.name}</h1>
              <p className="text-gray-400 text-small">
                {card.specialty}
                <br />
                {card.experience} years experience overall
              </p>
                <h1 className="h1">{card.location}</h1>
                {card.clinics.map((clinic, index) => (
                  <p key={index} className="text-gray-600">
                    {clinic}
                  </p>
                ))}
              <b className="text-green-500">Free</b>
              <div className="flex">
                <p className="text-gray-500">Consultation fee at clinic</p>
                <div className="bookingbox">
                  <b className="text-green-500 pb-4">{card.availability}</b>
                  <button className="btn" onClick={() => setIsDropDown(!isDropDown)}>Book FREE Clinic Visit</button>
                </div>
              </div>
              <br />
              <hr />
              {isDropDown ?
              <Dropdown />  : " "
              }
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* <div className="mt-6 flex justify-center pb-6">
        {[...Array(Math.ceil(cardData.length / 4)).keys()].map((number) => (
          <button
            key={number}
            className={`${
              currentPage === number + 1 ? "bg-blue-800" : "bg-blue-600"
            } text-white font-semibold px-4 py-2 mx-1 rounded-full`}
            onClick={() => setCurrentPage(number + 1)}
          >
            {number + 1}
          </button>
        ))}
      </div> */}

       </div>
       </div>
       <div className="w-full">
       <FAQ />
       </div>
       <Footer />
       </>
    )
}