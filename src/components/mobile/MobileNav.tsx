"use client"

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Footer from '../Footer'
  

function MobileNav({ patient }: MobileNavProps) {

    const pathName = usePathname()
 
  return (
   <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger>
                <Image
                    src="/icons/hamburger.svg"
                    alt='menu'
                    width={30}
                    height={30}
                    className='cursor-pointer'
                />
            </SheetTrigger>
            <SheetContent className='bg-white bg-opacity-95 border-none'>
                
                <nav className='flex flex-col gap-4'>
                <Link href="/" className='cursor-pointer items-center gap-2 flex'>
                    <Image
                        src="/icons/logo.svg"
                        alt='logo'
                        width={30}
                        height={30}
                        className='size-[44px] max-xl:size-14'
                    />
                    <h1 className='text-26 text-black-1 font-ibm-plex-serif font-bold'>
                        SBI
                    </h1>
                </Link>
                
                <div className='mobilenav-sheet'>
                    <SheetClose asChild>
                        <nav className='flex  flex-col gap-6 pt-12 text-white'>
                            {sidebarLinks.map((item) => {
                                const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)

                                return(
                                    <SheetClose asChild key={item.route}>
                                        <Link href={item.route} key={item.label} className={cn('mobilenav-sheet_close',{ 'bg-bank-gradient': isActive})}>
                                           
                                            <Image
                                                src={item.imgURL}
                                                alt={item.label}
                                                width={20}
                                                height={20}
                                                className={cn({'brightness-[3] invert-0': isActive})}
                                            />
            
                                            <p className={cn('text-16 font-semibold text-black-2', {'!text-white': isActive})}>
                                                    {item.label}
                                            </p>
                                        </Link>

                                    </SheetClose>
                                )
                            })}
                             {/* <Footer user={user} type="mobile"/> */}
                        </nav>
                    </SheetClose>
                </div>
                </nav>
            
            </SheetContent>
        </Sheet>

   </section>
  )
}

export default MobileNav