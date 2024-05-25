import { formatDate, formatTime } from '@/lib/utils';
import { Appointment } from '@/models/utils/Appointment'
import React from 'react'


interface AppointmentCardProps {
    patientName?: string;
    doctorName?: string;
    startTimestamp: Date;
    endTimestamp: Date;
    status?: string;
    _id?: string;
    location?: string;
    disease?: string;
    details?: string;
    prescriptions?: string[]
}

function AppointmentCard(
    { patientName, doctorName, startTimestamp, endTimestamp, status, _id, disease, details, prescriptions }: AppointmentCardProps
) {
  return (
    <div className='flex flex-col items-center justify-center w-2/3 p-6 gap-1 bg-sky-100 my-5 rounded-3xl'>
        <div className="w-full">
            <h1 className='text-teal-600 font-semibold'>
               Status: {status}
            </h1>
              <div className="flex justify-between px-2 items-center mb-2">
                <div className='flex gap-2 items-center'>
                  <h3 className="text-xl font-semibold text-purple-600">
                      {formatDate(new Date(startTimestamp))}
                  </h3>  
                  <p>
                    {formatTime(new Date(startTimestamp))}  
                  </p>
                   --
                  <h3 className="text-xl font-semibold text-purple-600">
                    {formatDate(new Date(endTimestamp))}  
                  </h3>
                  <p>
                  {formatTime(new Date(endTimestamp))}
                  </p>
                </div>
                
                <p className="text-lg text-gray-600"><span className="font-bold text-blue-700">
                    
                    {
                        patientName ? "Doctor" : "Patient"
                    }
                    </span> {doctorName || patientName}</p>
              </div>
              <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-blue-700">Diagnosis</h4>
                  <p className="text-gray-700">{disease}</p>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-blue-700">Prescriptions</h4>
                  <ul className="list-disc list-inside ml-4 text-gray-700">
                    {prescriptions && prescriptions.map((prescription, i) => (
                      <li key={i}>{prescription}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-blue-700">Notes</h4>
                  <p className="text-gray-700">{details}</p>
                </div>
              </div>
        </div> 

    </div>
  )
}

export default AppointmentCard