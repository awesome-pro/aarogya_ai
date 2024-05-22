import { Appointment } from '@/models/utils/Appointment';
import React, { useState } from 'react'

function MyAppointment() {

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  return (
    <div>
        
    </div>
  )
}

export default MyAppointment