// "use client";

// import { FormError } from '@/components/FormError';
// import { FormSuccess } from '@/components/FormSuccess';
// import MyButton from '@/components/MyButton';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import { formatDate } from '@/lib/utils';
// import { Appointment } from '@/models/utils/Appointment';
// import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { div } from '@tensorflow/tfjs';
// import axios from 'axios';
// import Image from 'next/image';
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import React, { useCallback, useEffect, useState } from 'react'

// function AppointmentDetails() {

//     const searchParams = useSearchParams();

//     const appointmentId = searchParams.get('id');

//     console.log("appointmentId: ", appointmentId)

//     const { toast } = useToast();
//     const router = useRouter();

//     const [appointmentData, setAppointmentData] = React.useState<Appointment>();
//     const [loading, setLoading] = React.useState(false);
//     const [error, setError] = React.useState('');
//     const [success, setSuccess] = useState('');


//     const fetchAppointmentDetails = useCallback(async () => {

//         setLoading(true);
//         toast(
//             {
//                 title: "Fetching appointment details",
//                 description: "Please wait...",
//                 variant: 'default'
//             }
//         )


//         try {

//             const response = await axios.get(`/api/get-appointment-detail?id=${appointmentId}`);

//             console.log("response: ", response)
//             const data = response.data.data;

//             if (response.status === 200 && response.data) {
//                 setAppointmentData(data);
//                 toast(
//                     {
//                         title: "Appointment details fetched successfully",
//                         description: "Appointment details fetched successfully",
//                         variant: 'success'
//                     }
//                 )
//                 setSuccess("Appointment details fetched successfully: " + data._id);
//             } else {
//                 toast(
//                     {
//                         title: "Error fetching appointment details",
//                         description: "Error fetching appointment details",
//                         variant: 'destructive'
//                     }
//                 )
//                 setError("Error fetching appointment details");
//             }
            
//         } catch (error: any) {
//             console.log("Error while fetching appointment details: ", error)
//             toast(
//                 {
//                     title: "Error: " + error,
//                     description: "Error while fetching appointment details" + error,
//                     variant: 'destructive'
//                 }
//             )
//             setError(error.toString());
//         }
//     }, [ setAppointmentData, setLoading, setError, toast, appointmentId])

//     useEffect( () => {

//         fetchAppointmentDetails();
    
//     }, [fetchAppointmentDetails, appointmentId])

//     if(!appointmentId){
//         return <div>

//             <h1>
//                 OOPS! This is not the page you are looking for 
//             </h1>
//             <Image
//                 src="/images/page-not-looking.png"
//                 alt="404"
//                 width={500}
//                 height={500}
//             />

//             <MyButton
//                 label="Go back to home"
//                 onClick={() => {
//                     window.location.href = "/";
//                 }}
//                 className="bg-blue-600 text-white"

//             />
//                </div>
//     }


//   return (
//     <div>
//         <FormError message={error} />
//         <FormSuccess message={success} />

//         <div>
//             <div className=" bg-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8">
//                 <div className="p-6 rounded-lg text-center">
//                 <FontAwesomeIcon icon={faCircleCheck} className='text-9xl text-blue-500 pb-7' />
//                 <h1 className="text-3xl font-extrabold text-blue-950 mb-4">Appointment Confirmed</h1>
//                 <p className="text-gray-700 mb-4">Thank you for booking your appointment. We have received your request and will get back to you soon.</p>
//                 <button
//                     onClick={() => router.push('/')}
//                     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                     Go to Homepage
//                 </button>
//                 <br />
//                 <Button
//                     className='bg-sky-500 text-white font-bold px-3 py-5 rounded-xl mt-4 w-full hover:bg-sky-400 hover:text-white'
//                     onClick={() => router.back() }
//                 >
//                     Book More Appointment
//                 </Button>
//                 </div>
//             </div>
//             </div>

//             <h1>
//                 Appointment Details
//             </h1>


//             <div>
//                 <div>
//                     <div>
//                         <div>
//                             <label>Appointment Date</label>
//                             {/* <div>{formatDate(appointmentData?.startTimestamp}</div> */}
//                         </div>
//                         <div>
//                             <label>Appointment Time</label>
//                             <div>{appointmentData?.doctorId}</div>
//                         </div>
//                         <div>
//                             <label>Appointment Type</label>
//                             <div>{appointmentData?.patientId}</div>
//                         </div>
//                         <div>
//                             <label>Doctor Name</label>
//                             <div>{appointmentData?.doctorName}</div>
//                         </div>
//                         <div>
//                             <label>Patient Name</label>
//                             <div>{appointmentData?.patientName}</div>
//                         </div>
//                         <div>
//                             <label>Patient Age</label>
//                             <div>{appointmentData?.patientMedications}</div>
//                         </div>
                        
//                     </div>
//                 </div>
//             </div>
//         </div>

//     </div>
//   )
// }

// export default AppointmentDetails

"use client";

import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import MyButton from '@/components/MyButton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { formatDate } from '@/lib/utils';
import { Appointment } from '@/models/utils/Appointment';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

function AppointmentDetails() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('id');

  const { toast } = useToast();
  const router = useRouter();
  const [appointmentData, setAppointmentData] = useState<Appointment>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAppointmentDetails = useCallback(async () => {
    if (!appointmentId) return;
    setLoading(true);
    toast({
      title: "Fetching appointment details",
      description: "Please wait...",
      variant: 'default'
    });

    try {
      const response = await axios.get(`/api/get-appointment-detail?id=${appointmentId}`);
      const data = response.data.data;

      if (response.status === 200 && response.data) {
        setAppointmentData(data);
        toast({
          title: "Appointment details fetched successfully",
          description: "Appointment details fetched successfully",
          variant: 'success'
        });
        setSuccess("Appointment details fetched successfully: " + data._id);

        await axios.post('/api/new-appointment', data);
      } else {
        throw new Error("Error fetching appointment details");
      }
    } catch (error: any) {
      toast({
        title: "Error: " + error.message,
        description: "Error while fetching appointment details",
        variant: 'destructive'
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [toast, appointmentId]);

  useEffect(() => {
    fetchAppointmentDetails();
  }, [fetchAppointmentDetails, appointmentId]);

  if (!appointmentId) {
    return (
      <div>
        <h1>OOPS! This is not the page you are looking for</h1>
        <Image src="/images/page-not-looking.png" alt="404" width={500} height={500} />
        <MyButton label="Go back to home" onClick={() => window.location.href = "/"} className="bg-blue-600 text-white" />
      </div>
    );
  }

  return (
    <div>
      <FormError message={error} />
      <FormSuccess message={success} />
      <div className="bg-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="p-6 rounded-lg text-center">
            <FontAwesomeIcon icon={faCircleCheck} className='text-9xl text-blue-500 pb-7' />
            <h1 className="text-3xl font-extrabold text-blue-950 mb-4">Appointment Confirmed</h1>
            <p className="text-gray-700 mb-4">Thank you for booking your appointment. We have received your request and will get back to you soon.</p>
            <button
              onClick={() => router.push('/')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Homepage
            </button>
            <br />
            <Button
              className='bg-sky-500 text-white font-bold px-3 py-5 rounded-xl mt-4 w-full hover:bg-sky-400 hover:text-white'
              onClick={() => router.back()}
            >
              Book More Appointment
            </Button>
          </div>
        </div>
      </div>

      <h1>Appointment Details</h1>
      <div>
        <div>
          <div>
            <label>Appointment Date</label>
            {/* <div>{formatDate(appointmentData?.startTimestamp)}</div> */}
          </div>
          <div>
            <label>Appointment Time</label>
            <div>{appointmentData?.doctorId}</div>
          </div>
          <div>
            <label>Appointment Type</label>
            <div>{appointmentData?.patientId}</div>
          </div>
          <div>
            <label>Doctor Name</label>
            <div>{appointmentData?.doctorName}</div>
          </div>
          <div>
            <label>Patient Name</label>
            <div>{appointmentData?.patientName}</div>
          </div>
          <div>
            <label>Patient Age</label>
            <div>{appointmentData?.patientMedications}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;
