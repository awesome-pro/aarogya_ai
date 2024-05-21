// "use client";
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import Header from '@/components/Header';
// import FAQ from '@/components/Faq';
// import Footer from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// const DoctorSignIn: React.FC = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     // Process form submission (e.g., send data to backend for authentication)
//     console.log(formData);
//     // Redirect to doctor's dashboard after successful login
//     router.push('/doctor/profile');
//   };

//   return (
//     <>
     
//       <div className="min-h-screen flex">
//         <div className="w-1/2 relative flex items-center justify-center bg-blue-50">
//           <Image
//             src="https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt="Sign In"
//             className="rounded-l-lg w-2/3 bg-cover"
//             width={2024}
//             height={1518}
//           />
//         </div>
//         <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-50 p-8">
//           <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
//             <div>
//               <h2 className="text-center text-3xl font-extrabold text-blue-900">Sign In to Your Account</h2>
//               <p className="mt-2 text-center text-sm text-gray-600">
//                 Or{' '}
//                 <Link href="/doctor/sign-up">
//                   <Button className="font-medium text-blue-600 hover:text-blue-500" variant="link">
//                     sign up for a new account
//                   </Button>
//                 </Link>
//               </p>
//             </div>
//             <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//               <div className="rounded-md shadow-sm -space-y-px">
//                 <div className="pb-4">
//                   <label className="block text-sm font-medium text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                     placeholder="Email address"
//                   />
//                 </div>
//                 <div className="pb-4">
//                   <label className="block text-sm font-medium text-gray-700">Password</label>
//                   <Input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                     placeholder="Password"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <Input
//                     type="checkbox"
//                     name="remember_me"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-900">Remember me</label>
//                 </div>
//                 <div className="text-sm">
//                   <Link href="/forgot-password">
//                     <Button className="font-medium text-blue-600 hover:text-blue-500" variant="link">
//                       Forgot your password?
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//               <div>
//                 <Button
//                   type="submit"
//                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Sign In
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
      
//     </>
//   );
// };

// export default DoctorSignIn;

"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import FAQ from '@/components/Faq';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DoctorSignIn: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/doctor/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data.doctor);
        router.push(`/doctor/profile?id=${data.doctor._id}`);
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to sign in');
      }
    } catch (error: any) {
      setError('An error occurred: ' + error.toString());
    }
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-1/2 relative flex items-center justify-center bg-blue-50">
          <Image
            src="https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sign In"
            className="rounded-l-lg w-2/3 bg-cover"
            width={2024}
            height={1518}
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-50 p-8">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-blue-900">Sign In to Your Account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link href="/doctor/sign-up">
                  <Button className="font-medium text-blue-600 hover:text-blue-500" variant="link">
                    sign up for a new account
                  </Button>
                </Link>
              </p>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="pb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div className="pb-4">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    name="remember_me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <div className="text-sm">
                  <Link href="/forgot-password">
                    <Button className="font-medium text-blue-600 hover:text-blue-500" variant="link">
                      Forgot your password?
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorSignIn;

