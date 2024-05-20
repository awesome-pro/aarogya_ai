"use client"

import { navbarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'

function Navbar() {

    const { data: session } = useSession()
    const patient = session?.user

  const pathName = usePathname()

  return (
    <div>
    <section className='navbar items-center justify-between'>
        <nav className='flex  gap-4 justify-between'>
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

            {navbarLinks.map((item) => {
                const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)

                return(
                    <Link href={item.route} key={item.label} className={cn('navbar-link',{ 'bg-sky-500': isActive})}>
                       <div className='relative size-6 '>
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                fill
                                className={cn({'brightness-[3] invert-0': isActive})}
                            />
                       </div>
                       <p className={cn('navbar-label', {'!text-white': isActive})}>
                            {item.label}
                       </p>
                    </Link>
                )
            })}

        {session ? (
            <Link href="/patient/profile">
                <div className='navbar-link bg-sky-200 rounded-sm'>
                    <div className='relative size-6'>
                        <Image
                            src="/icons/profile.svg"
                            alt='profile'
                            fill
                        />
                    </div>
                    <p className='navbar-label'>
                        {patient?.name}
                    </p>
                </div>
            </Link>
        ) : 
            (
            <Button className='bg-sky-500 p-2 rounded-lg px-8 text-white font-bold '>
                <Link href="/sign-in">
                    Sign In
                </Link>
            </Button>)
        }
        
           
        </nav>

      
    </section>
</div>
  )
}

export default Navbar