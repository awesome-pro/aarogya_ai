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
    <div className='flex flex-col items-center justify-center w-2/3 p-6 gap-1'>
        <div className="">
            <h1 className='text-teal-600 font-semibold'>
               Status: {status}
            </h1>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-700">
                  {/* {startTimestamp.getTime() } to  {endTimestamp.getTime()} */}
                    {startTimestamp.toString()} to {endTimestamp.toString()}
                </h3>
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