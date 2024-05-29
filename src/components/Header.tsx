"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Header = () => {
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <>
      <div className='flex justify-center items-center p-2 bg-blue-500'></div>

      <header className="bg-blue-50 py-2 w-full">
        <div className="flex justify-between items-center px-5">
          <Link href="/" className='flex items-center gap-2 cursor-pointer'>
            <Image
              src="/icons/logo.png"
              alt='logo'
              width={34}
              height={34}
              className='w-[34px] h-[34px]'
            />
            <h1 className='navbar-logo'>Aarogya AI</h1>
          </Link>

          <nav className="space-x-10 flex items-center">
            <Link href="/">
              <Button className="hover:underline">Home</Button>
            </Link>
            <Link href="/find-doctor">
              <Button className="hover:underline">Find Doctor</Button>
            </Link>
            <Link href="/my-appointments">
              <Button className="hover:underline">Appointments</Button>
            </Link>
            <div className="relative">
              <Button className="hover:underline" onClick={toggleDropdown}>
                More
              </Button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <Link href="/facilities" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Facilities
                  </Link>
                  <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    About Us
                  </Link>
                </div>
              )}
            </div>
            <Link href="/doctor/sign-in" className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl">
              Doctor sign-In
              </Link>
          </nav>

          {session ? (
            <div className="flex gap-7 items-center">
              <Link href="/patient/profile">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={user?.image || "/icons/profile.png"}
                    alt="profile"
                    width={30}
                    height={30}
                    className='w-[30px] h-[30px] rounded-full'
                  />
                  <p>{user?.name}</p>
                </div>
              </Link>

              <Button
                className="text-red-500 px-3 py-2 rounded-3xl w-28 border-red-500 hover:bg-red-500 hover:text-white"
                onClick={async () => {
                  await signOut()
                  router.push('/sign-in')
                }}
                variant="outline"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link href="/sign-up">
              <Button className="text-white bg-blue-500 bg-opacity-95 px-3 py-2 rounded-3xl w-40 hover:bg-blue-700">
                SignUp/Login
              </Button>
            </Link>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
