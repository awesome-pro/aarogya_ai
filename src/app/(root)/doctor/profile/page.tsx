// "use client";

// import React, { useEffect, useState, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import Link from 'next/link';
// import { signOut } from 'next-auth/react';
// import axios from 'axios';
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
// import io from 'socket.io-client';

// const socket = io();

// const DoctorProfile: React.FC = () => {
//   const [doctorData, setDoctorData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [appointments, setAppointments] = useState<any[]>([]);
  
//   const router = useRouter();
//   const { searchParams } = new URL(window.location.href);
//   const id = searchParams.get('id');

//   const fetchDoctorData = useCallback(async (id: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`/api/doctor/get-doctor-details?id=${id}`);
//       if (response.status !== 200) {
//         throw new Error('Failed to fetch doctor data');
//       }
//       setDoctorData(response.data.doctor);
//     } catch (error) {
//       setError(error?.toString() || 'Failed to fetch doctor data');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchAppointments = useCallback(async () => {
//     try {
//       const response = await axios.get(`/api/doctor/get-appointments?id=${id}`);
//       console.log(response);
//       if (response.status === 200) {
//         setAppointments(response.data.appointments);
//       } else {
//         throw new Error('Failed to fetch appointments');
//       }
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       fetchDoctorData(id);
//       fetchAppointments();
//     }
//   }, [id, fetchDoctorData, fetchAppointments]);

//   return (
//     <>
//       {loading && (
//         <div className="min-h-screen flex items-center justify-center">
//           <p className="text-2xl font-semibold text-blue-900">Loading...</p>
//         </div>
//       )}

//       {error ? (
//         <div className="flex items-center justify-center bg-red-300 p-10 rounded-lg w-full">
//           <ExclamationTriangleIcon className="w-15 h-15 text-red-600" />
//           <p className="text-2xl font-semibold text-red-600">{error}</p>
//         </div>
//       ) : (
//         <>
//           <div className="min-h-screen bg-white py-4 flex items-center justify-center">
//             <div className="w-full bg-white shadow-lg rounded-lg">
//               <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Doctor Profile</h2>
//               <div className="flex flex-col md:flex-row items-start mt-8">
//                 <div className="md:w-1/5 flex flex-col items-center mb-8 md:mb-0">
//                   <Image
//                     src={doctorData?.image || 'https://via.placeholder.com/150'}
//                     alt="Profile Image"
//                     className="rounded-full mb-4 w-60 h-60 object-cover shadow-md"
//                     width={150}
//                     height={150}
//                   />
//                   <div className="text-center">
//                     <h3 className="text-2xl font-semibold">{doctorData?.name || "Your name"}</h3>
//                     <p className="text-gray-600 text-xl">{doctorData?.email || "Your Email"}</p>
//                     <p className="text-gray-600 text-xl">{doctorData?.phoneNumber || "+91-1234567890"}</p>
//                   </div>
//                 </div>
//                 <div className="md:w-2/3 md:pl-8">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                     <div>
//                       <h4 className="font-bold text-xl">Department</h4>
//                       <p className="text-gray-800 text-lg font-medium">{doctorData?.department || ""}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-xl">Experience</h4>
//                       <p className="text-gray-800 text-lg font-medium">{doctorData?.experience || ""}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-xl">Clinic Address</h4>
//                       <p className="text-gray-800 text-lg font-medium">{doctorData?.clinicAddress || ""}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-xl">Consultation Fee</h4>
//                       <p className="text-gray-800 text-lg font-medium">{doctorData?.consultationFee || ""}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-xl">Availability</h4>
//                       <p className="text-gray-800 text-lg font-medium">{doctorData?.availability}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-xl">Qualifications</h4>
//                       <p className="text-gray-800 text-lg font-medium">{doctorData?.qualifications}</p>
//                     </div>
//                     <div className="md:col-span-2">
//                       <h4 className="font-bold text-xl">Bio</h4>
//                       <p className="text-gray-800 text-lg font-medium">{doctorData?.bio}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className='flex justify-center items-center gap-10 pt-10 pb-6'>
//                 <Link href={`/doctor/profile/edit?id=${id}`}>
//                   <Button className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl'>Edit your profile</Button>
//                 </Link>
//                 <Link href='/doctor/patient-history'>
//                   <Button className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl'>View Patient history</Button>
//                 </Link>
//                 <Button className='bg-red-500 text-white rounded-xl hover:bg-red-700 px-12' variant="destructive" 
//                   onClick={() => signOut()}
//                 >
//                   Sign Out
//                 </Button>
//               </div>
//               <div className="mt-8">
//                 <h2 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">New Appointments</h2>
//                 <ul className="divide-y divide-gray-200">
//                   {appointments.map((appointment) => (
//                     <li key={appointment._id} className="py-4">
//                       {/* Render appointment details */}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default DoctorProfile;

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import io from 'socket.io-client';
import { setInterval } from 'timers/promises';

const socket = io();

const DoctorProfile: React.FC = () => {
  const [doctorData, setDoctorData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  
  const router = useRouter();
  const { searchParams } = new URL(window.location.href);
  const id = searchParams.get('id');

  const fetchDoctorData = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/doctor/get-doctor-details?id=${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch doctor data');
      }
      setDoctorData(response.data.doctor);
    } catch (error) {
      setError(error?.toString() || 'Failed to fetch doctor data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get(`/api/doctor/get-appointments?id=${id}`);
      if (response.status === 200) {
        setAppointments(response.data.appointments);
        setAppointments(prevAppointments =>
          prevAppointments.filter(appointment => appointment.status !== 'Accepted')
        );
      } else {
        throw new Error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDoctorData(id);
      fetchAppointments();
    }
  }, [id, fetchDoctorData, fetchAppointments]);

  const updateAppointmentStatus = async (appointmentId : string, status: string) => {
    try {
      const response = await axios.post(`/api/doctor/update-appointment-status`, {
        appointmentId,
        status,
      });

      if (response.status === 200) {
        // setAppointments((prevAppointments) =>
        //   prevAppointments.map((appointment) =>
        //     appointment._id === appointmentId ? { ...appointment, status } : appointment
        //   )

          setAppointments(prevAppointments =>
            prevAppointments.filter(appointment => appointment._id !== appointmentId)
        );
      } else {
        throw new Error('Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <>
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-2xl font-semibold text-blue-900">Loading...</p>
        </div>
      )}

      {error ? (
        <div className="flex items-center justify-center bg-red-300 p-10 rounded-lg w-full">
          <ExclamationTriangleIcon className="w-15 h-15 text-red-600" />
          <p className="text-2xl font-semibold text-red-600">{error}</p>
        </div>
      ) : (
        <>
        <div className='bg-green-400 flex items-center justify-center'>
          <p className='px-3 py-2 text-base font-medium text-white'>New Appointments : {appointments.length}</p>
        </div>
          <div className="min-h-screen bg-white py-4 flex items-center justify-center">
            <div className="w-full bg-white shadow-lg rounded-lg min-h-screen min-w-full">
              <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Doctor Profile</h2>
              <div className="flex flex-col md:flex-row items-start mt-8">
                <div className="md:w-1/5 flex flex-col items-center mb-8 md:mb-0">
                  <Image
                    src={doctorData?.image || 'https://via.placeholder.com/150'}
                    alt="Profile Image"
                    className="rounded-full mb-4 w-60 h-60 object-cover shadow-md"
                    width={150}
                    height={150}
                  />
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold">{doctorData?.name || "Your name"}</h3>
                    <p className="text-gray-600 text-xl">{doctorData?.email || "Your Email"}</p>
                    <p className="text-gray-600 text-xl">{doctorData?.phoneNumber || "+91-1234567890"}</p>
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-bold text-xl">Department</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.department || ""}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Experience</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.experience || ""}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Clinic Address</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.clinicAddress || ""}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Consultation Fee</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.consultationFee || ""}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Availability</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.availability}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Qualifications</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.qualifications}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-xl">Bio</h4>
                      <p className="text-gray-800 text-lg font-medium">{doctorData?.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-center items-center gap-10 pt-10 pb-6'>
                <Link href={`/doctor/profile/edit?id=${id}`}>
                  <Button className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl'>Edit your profile</Button>
                </Link>
                <Link href='/doctor/patient-history'>
                  <Button className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl'>View Patient history</Button>
                </Link>
                <Button className='bg-red-500 text-white rounded-xl hover:bg-red-700 px-12' variant="destructive" 
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
              <div className="mt-8">
                <h2 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">New Appointments</h2>
                <ul className="divide-y divide-gray-200 flex flex-col items-center justify-center">
                  {appointments.map((appointment) => (
                    <li key={appointment._id} className="p-6 bg-white shadow-lg rounded-lg mb-4 w-1/2">
                    <div className="flex justify-between items-center">
                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          <p className="text-xl font-semibold text-blue-900">Patient ID:</p>
                          <p className="ml-2 text-xl font-medium">{appointment.patientId}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-600"><span className="font-semibold">Disease:</span> {appointment.disease}</p>
                            <p className="text-gray-600"><span className="font-semibold">Details:</span> {appointment.details}</p>
                            <p className="text-gray-600"><span className="font-semibold">Location:</span> {appointment.location}</p>
                            <p className="text-gray-600"><span className="font-semibold">Start:</span> {new Date(appointment.startTimestamp).toLocaleString()}</p>
                            <p className="text-gray-600"><span className="font-semibold">End:</span> {new Date(appointment.endTimestamp).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600"><span className="font-semibold">Status:</span> {appointment.status}</p>
                            <p className="text-gray-600"><span className="font-semibold">Allergies:</span> {appointment.patientAllergies.join(', ')}</p>
                            <p className="text-gray-600"><span className="font-semibold">Diseases:</span> {appointment.patientDiseases.join(', ')}</p>
                            <p className="text-gray-600"><span className="font-semibold">Medications:</span> {appointment.patientMedications.join(', ')}</p>
                            <p className="text-gray-600"><span className="font-semibold">Symptoms:</span> {appointment.patientSymptoms.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col ml-4 space-y-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-xl" onClick={() => updateAppointmentStatus(appointment._id, 'Accepted')}>
                          Accept
                        </Button>
                        </div>
                    </div>
                  </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DoctorProfile;



