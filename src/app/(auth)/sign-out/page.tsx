"use client";
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';

function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(); // Sign out the user
      router.push('/sign-in'); // Redirect to the sign-in page
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally handle the error here
    }
  };

  return (
    <div>
      <h1 className='text-red-400 text-2xl'>Are you sure you want to sign out?</h1>
      <Button
        className='bg-red-600 text-white rounded-3xl px-4 py-2 mt-4 w-32 hover:bg-red-700'
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default SignOut;
