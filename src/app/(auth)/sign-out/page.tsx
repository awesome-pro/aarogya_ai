import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

function SignOut() {
  return (
    <div>
        <h1 className='text-red-400 text-2xl'>Are are confirmed to sign out ?</h1>

        <form
            action={async() => {
                'use server'
                await signOut()
            }}
        >
            <Button type='submit' variant='outline' size='lg' className='w-full'>Sign Out</Button>
        </form>
    </div>
  )
}

export default SignOut