import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
    <div className='flex justify-center items-center p-2 bg-blue-500'>
    <div className='text-sm text-white'> The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.</div>
    </div>
    <header className="bg-blue-50 py-2">
    <div className="container mx-auto flex justify-around items-center">
        <div className="text-blue-400 text-lg font-bold">My Medical App</div>
        <nav className="space-x-10">
          <Link href="/find-doctor">
            <button className=" hover:underline">Find Doctor</button>
          </Link>
          <Link href="/hospitals">
            <button className=" hover:underline">Hospitals</button>
          </Link>
          <Link href="/medicines">
            <button className=" hover:underline">Medicines</button>
          </Link>
          <Link href="/surgeries">
            <button className=" hover:underline">Surgeries</button>
          </Link>
          <Link href="/software-provider">
            <button className=" hover:underline">Software Provider</button>
          </Link>
          <Link href="/facilities">
            <button className=" hover:underline">Facilities</button>
          </Link>
        </nav>
        <button className='text-white bg-blue-500 bg-opacity-95 px-3 py-2 rounded-lg'>SignUp/Login</button>
        </div>
    </header>
    </>
  )
}

export default Header