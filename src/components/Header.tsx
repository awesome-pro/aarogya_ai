"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { useSession } from "next-auth/react"


const Header = () => {

  const {data: session } = useSession()
 
  return (
    <>
    {/* <div className='flex justify-center items-center p-2 bg-blue-500'>
    <div className='text-sm text-white'> The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.</div>
    </div> */}


    <div className='flex justify-center items-center p-2 bg-blue-500'>
    </div>
    
    <header className="bg-blue-50 py-2">
      
    <div className="container mx-auto flex justify-around items-center">
    <Link href="/" className=' cursor-pointer items-center gap- flex'>
                <Image
                    src="/icons/logo.png"
                    alt='logo'
                    width={34}
                    height={34}
                    className='size-[44px] max-xl:size-14'
                />
                <h1 className='navbar-logo'>
                    Aarogya AI
                </h1>
            </Link>
        <nav className="space-x-10">
          <Link href="/find-doctor">
            <Button className=" hover:underline">Find Doctor</Button>
          </Link>
          <Link href="/my-appointments">
            <Button className=" hover:underline">Appointments</Button>
          </Link>
          <Link href="/facilities">
            <Button className=" hover:underline">Facilities</Button>
          </Link>
        </nav>

        {
          session ? (
            <Link href="/patient/profile">
              <div className="flex items-center gap-2">
                <Image
                  src={session.user.image as string || "/icons/profile.png"}
                  alt="profile"
                  width={30}
                  height={30}
                />
                <p>{session.user.name}</p>
              </div>
            </Link>
          ) : (
            <Link href="/sign-up">
            <Button className="text-white bg-blue-500 bg-opacity-95 px-3 py-2 rounded-xl">
              SignUp/Login
            </Button>
            </Link>
          )
        }
        
        </div>
    </header>
    </>
  )
}

export default Header