import DoctorCard from '@/components/DoctorCard'
import React from 'react'

function Test() {
  return (
    <div>
      <DoctorCard 
        _id="1"
        name="Dr. Shantanu Jambhekar"
        location="Parentheses, Mumbai"
        specialty={['Dentist', 'Eye Surgeon']} // Fix: Assign an array of strings to the specialty prop
        experience='16'
        availability="Available Today"
        consultationFee={0}
        hospital="Smilessence Center for Advanced Dentistry"
        bio="Dr. Shantanu Jambhekar is a Dentist with 16 years of experience. He is available today at Smilessence Center for Advanced Dentistry, Parentheses, Mumbai."
        image="/icons/doctor-placeholder.png"
      />
    </div>
  )
}

export default Test