"use client"

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link';


interface BackButtonProps {
   label: string;
    href: string
}

const BackButton = ({
    href,
    label
}: BackButtonProps) => {
  return (
    <Button
    variant="link"
    className='font-normal w-full'
    size="sm"
    asChild
    >
        <Link href={href} className='hover:text-blue-700'>
            {label}
        </Link>
    </Button>
  )
}

export default BackButton