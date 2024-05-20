"use client";
import FAQ from '@/components/Faq';
import Footer from '@/components/Footer';
import Navbar from '@/components/Header';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {

  return (
    <div>
      <Navbar />

      <div className="py-20 bg-white">
  <div className=" rounded-lg p-6 flex flex-col">
      <div>
        <section className='flex items-center justify-center flex-col lg:flex-row'>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className='relative flex justify-center items-center'>
            {/* User image */}
            <img className="h-56 w-56 object-cover rounded-full bg-black" src="" alt="User" />
            {/* Circular progress bar */}
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:pl-8 mt-4 lg:mt-0 border border-black p-5">
          <p className="text-black text-xl"><span className="font-bold text-blue-700">Name: </span>Sahil Gupta</p>
          <p className="text-black text-xl"><span className="font-bold text-blue-700">Gender: </span>Male</p>
          <p className="text-black text-xl"><span className="font-bold text-blue-700">Email-Id: </span>yfugiiuvblbuo</p>
          <p className="text-black text-xl"><span className="font-bold text-blue-700">Contact Number: </span>9779770707</p>
          <p className="text-black text-xl"><span className="font-bold text-blue-700">Age: </span>34</p>
          <p className="text-black text-xl"><span className="font-bold text-blue-700">Date of Birth: </span>34</p>
          <p className="text-black text-xl"><span className="font-bold text-blue-700">Address: </span>jgt8ougb oihbuo j obii</p>
        </div>

        </section>

        <section className='mt-10'>

        <div className='flex justify-center items-center my-5'>
          <h1 className='text-4xl text-blue-500 font-extrabold'>Medical Details</h1>
        </div>

        <div className="mb-4 border border-black p-5">
          <h3 className="text-2xl font-bold mb-2 text-blue-700">Height</h3>
          <p className='text-xl'>
           160 cm
          </p>
        </div>

        <div className="mb-4 border border-black p-5">
          <h3 className="text-2xl font-bold mb-2 text-blue-700">Weight</h3>
          <p className='text-xl'>
            90 Kg
          </p>
        </div>

        <div className="mb-4 border border-black p-5">
          <h3 className="text-2xl font-bold mb-2 text-blue-700">Blood Group</h3>
          <p className='text-xl'>
            O+
          </p>
        </div>

        <div className="mb-4 border border-black p-5">
          <h3 className="text-2xl font-bold mb-2 text-blue-700">Allergies</h3>
          <p className='text-xl'>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum ut modi similique beatae perspiciatis accusamus iste? Veritatis quaerat alias beatae nisi, impedit nesciunt officiis rerum sapiente amet ut ullam. Minima voluptas veritatis exercitationem dicta unde necessitatibus harum amet voluptatibus, eaque officiis laboriosam dolore autem est accusamus quisquam incidunt. Atque, blanditiis.
          </p>
        </div>

        <div className="mb-4 border border-black p-5">
          <h3 className="text-2xl font-bold mb-2 text-blue-700">Chronic Conditions</h3>
          <p className='text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, velit?
          </p>
        </div>

        <div className="mb-4 border border-black p-5">
          <h3 className="text-2xl font-bold mb-2 text-blue-700">Medications Currently Taking</h3>
          <p className='text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, velit?
          </p>
        </div>

        <div className="mb-4 border border-black p-5">
          <h3 className="text-2xl font-bold mb-2 text-blue-700">Medical History</h3>
          <Link href="/" className='hover:text-red-600 text-xl'>Click here</Link>
        </div>

        </section>

      </div>
  </div>
  <div className='flex justify-center items-center gap-7'>
  <Link href="/patient/profile/edit">
        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl'>Edit your profile</button>
    </Link>
        <Link href='/patient/history'>
        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl'>View Patient history</button>
        </Link>
</div>
</div>
  <FAQ/>
  <Footer />      
  </div>
  )
}

export default page

