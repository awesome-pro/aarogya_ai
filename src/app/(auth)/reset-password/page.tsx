"use client"

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { authFormSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'


function ResetPassword() {

    const { data: session } = useSession()
    const user = session?.user

    const router = useRouter()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const formSchema = authFormSchema



    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                password: '',
                confirmPassword: ''
            }
        }
    )

    if(!session || !user) {
        return <div className='flex flex-col items-center  justify-center p-4 mt-8'>
            
            <h1>
                oops! You are not logged in
            </h1>

            <p>
                Please login to access this page
            </p>

            <Button
            className='mt-8 mb-9 bg-blue-500 hover:bg-blue-700 rounded-3xl text-white w-48'
            onClick={() => router.push('/sign-in')}
            variant={'default'}
            >
                Login
            </Button>

            <Image
            src={'/images/page-not-looking.png'}
            alt='page not found'
            width={500}
            height={500}
            className='rounded-2xl'
            />
        </div>
    }
   


  return (
    <div>
        <h1>Reset Password</h1>
        
        <div className="flex items-center justify-center mt-6 bg-[url('/images/(doctors)/d3.jpg')] max-w-[500px]">
            

            <div>

              
            </div>
            
           
        </div>
    </div>
  )
}

export default ResetPassword