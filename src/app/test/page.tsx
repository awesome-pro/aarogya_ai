"use client";

// components/AppointmentForm.tsx
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Patient } from '@/models/Patient';
import { useToast } from '@/components/ui/use-toast';
import { Doctor } from '@/models/Doctor';
import { div } from '@tensorflow/tfjs';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';

const appointmentFormSchema = z.object({
  patientName: z.string().min(3),
  patientEmail: z.string().email(),
  patientPhoneNumber: z.string().optional(),
  patientAddress: z.string(),
  patientImage: z.string().optional(),
  patientAge: z.number().min(0).optional(),
  patientHeight: z.number().min(0).optional(),
  patientWeight: z.number().min(0).optional(),
  patientBloodGroup: z.string().optional(),
  patientAllergies: z.array(z.string()).optional(),
  patientMedications: z.array(z.string()).optional(),
  patientBodyImage: z.string().optional(),
  patientPrescriptionImage: z.string().optional(),
  patientDiseases: z.array(z.string()).optional(),
  doctorName: z.string().min(3),
  doctorId: z.string().min(3),
  clinicAddress: z.string().min(2).optional(),
  startTimestamp: z.string().optional(),
  endTimestamp: z.string().optional(),
});

type AppointmentFormData =  z.infer<typeof appointmentFormSchema>
const AppointmentForm = () => {

  const {data: session} = useSession();
  const patient = session?.user;

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [patientData, setPatientData] = useState<Patient>();
  const [doctorData, setDoctorData] = useState<Doctor>();
  const [allergies, setAllergies] = useState<string[]>(['']);
  const [medications, setMedications] = useState<string[]>(['']);
  const [diseases, setDiseases] = useState<string[]>(['']);

 

  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId');

  const { toast } = useToast();


  const fetchPatientDetails = useCallback(async () => {

    setLoading(true)
    setError(null)
    setSuccess('')

    try {

        if(!patient?._id) {
            setError('An error occurred while fetching patient data: Patient not found')
            setLoading(false)
            return
        }

        const response = await axios.get(`/api/get-patient-by-id?id=${patient?._id}`)

        const responseJson = response.data

        if(response.status !== 200 || response.data.error) {
            setError('An error occurred while fetching patient data: ' + response.data.error)
            toast(
              {
                title: 'Error',
                description: 'An error ' + response.data.error,
                variant: 'destructive'
              }
            )
            return
        }

        const patientData = responseJson.data

        console.log(patientData)
        setSuccess('Patient data fetched successfully: ' + patientData.name)
        setPatientData(patientData)
            
    } catch (error) {
        setError('An error occurred while fetching patient data: ' + error)
        toast({
            title: 'Error',
            description: 'An error ' + error,
            variant: 'destructive'
        })
        return
    } finally {
        setLoading(false)
    }
}, [session, patient, setPatientData, setDoctorData])

  const fetchDoctorDetails = useCallback(async () => {
        
        setLoading(true)
        setError(null)
        setSuccess('')

        try {

        if(!doctorId) {
            setError('An error occurred while fetching doctor data: Doctor not found')
            setLoading(false)
            toast(
              {
                title: 'Error',
                description: 'An error ' + 'Doctor not found',
                variant: 'destructive'
              }
            )
            return
        }

        const response = await axios.get(`/api/get-doctor-by-id?id=${doctorId}`)

        const responseJson = response.data


        if(response.status !== 200 ) {
            setError('An error occurred while fetching doctor data: ' + responseJson.message)
            return
        }

        const doctorData = responseJson.data

        toast(
          {
            title: 'Success',
            description: 'Doctor data fetched successfully',
            variant: 'success'
          }
        )

        console.log(doctorData)
        setDoctorData(doctorData)
        setSuccess('Doctor data fetched successfully: ' + doctorData?.name)
            
        } catch (error) {
            setError('An error occurred while fetching doctor data: ' + error)
            toast({
                title: 'Error',
                description: 'An error ' + error,
                variant: 'destructive'
            })
            return
        } finally {
            setLoading(false)
        }
    }, [session, patient?._id, setPatientData, setDoctorData, doctorId])
    

    useEffect(() => {
        
      if(patient?._id) {
          fetchPatientDetails()
      }

      if(doctorId) {
          fetchDoctorDetails()
      } 

      }, [session, patient?._id, setPatientData, setDoctorData, doctorId]
    )


  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patientName: patient?.name,
      patientEmail: patient?.email || '',
      patientPhoneNumber: patient?.phoneNumber?.toString() || '',
      patientAddress: patientData?.address || '',
      patientImage: patientData?.image || '',
      patientAge: patientData?.age || 0,
      patientHeight: patientData?.height || 0,
      patientWeight: patientData?.weight || 0,
      patientBloodGroup: patientData?.bloodGroup || '',
      patientAllergies: [''],
      patientMedications: [''],
      patientBodyImage: patientData?.image || '',
      patientPrescriptionImage: '',
      patientDiseases: [''],
      doctorName: doctorData?.name || '',
      doctorId: doctorId || '',
      clinicAddress: doctorData?.clinicAddress || '',
      startTimestamp: '',
      endTimestamp: '',
    }
  });



  const onSubmit = async (data: AppointmentFormData) => {

    console.log("data: ", data);
    
    setLoading(true);

    try {
      
      if(!patient?._id) {
        setError('An error occurred while creating appointment: Patient not found')
        setLoading(false)
        toast(
          {
            title: 'Error',
            description: 'An error ' + 'Patient not found',
            variant: 'destructive'
          }
        )
        return
      }

      const response = await axios.post('/api/create-appointment', data);

      const responseJson = response.data;

      if(response.status !== 201 || responseJson.status !== 201 || responseJson.error) {
        setError('An error occurred while creating appointment: ' + responseJson.message);
        toast(
          {
            title: 'Error',
            description: 'An error ' + responseJson.message,
            variant: 'destructive'
          }
        )
        return;
      }

      setSuccess('Appointment created successfully: ' + responseJson.message);

      toast(
        {
          title: 'Success',
          description: 'Appointment created successfully',
          variant: 'success'
        }
      )
    } catch (error) {
      console.error(error);

      toast(
        {
          title: 'Error',
          description: 'An error ' + error,
          variant: 'destructive'
        }
      )
    } finally { 
      setLoading(false);
      toast(
        {
          title: 'Info',
          description: 'Appointment creation process completed',
          variant: 'default'
        }
      )
    }
  };


  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const removeField = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  return (

    
    <div>

      <FormError message={error?.toString()} />
      <FormSuccess message={success} />

      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Patient Name</label>
        <input {...register('patientName')} />
        {errors.patientName && <span>{errors.patientName.message}</span>}
      </div>

      <div>
        <label>Patient Email</label>
        <input {...register('patientEmail')} />
        {errors.patientEmail && <span>{errors.patientEmail.message}</span>}
      </div>

      <div>
        <label>Patient Phone Number</label>
        <input {...register('patientPhoneNumber')} />
        {errors.patientPhoneNumber && <span>{errors.patientPhoneNumber.message}</span>}
      </div>

      <div>
        <label>Patient Address</label>
        <input {...register('patientAddress')} />
        {errors.patientAddress && <span>{errors.patientAddress.message}</span>}
      </div>

      {/* Add other fields here similarly */}
      
      <div>
        <label>Patient Allergies</label>
        {allergies.map((_, index) => (
          <div key={index}>
            <input {...register(`patientAllergies.${index}` as const)} />
            <button type="button" onClick={() => removeField(index, setAllergies)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addField(setAllergies)}>Add Allergy</button>
      </div>

      <div>
        <label>Patient Medications</label>
        {medications.map((_, index) => (
          <div key={index}>
            <input {...register(`patientMedications.${index}` as const)} />
            <button type="button" onClick={() => removeField(index, setMedications)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addField(setMedications)}>Add Medication</button>
      </div>

      <div>
        <label>Patient Diseases</label>
        {diseases.map((_, index) => (
          <div key={index}>
            <input {...register(`patientDiseases.${index}` as const)} />
            <button type="button" onClick={() => removeField(index, setDiseases)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addField(setDiseases)}>Add Disease</button>
      </div>

      <div>
        <label>Doctor Name</label>
        <input {...register('doctorName')} />
        {errors.doctorName && <span>{errors.doctorName.message}</span>}
      </div>

      <div>
        <label>Doctor ID</label>
        <input {...register('doctorId')} />
        {errors.doctorId && <span>{errors.doctorId.message}</span>}
      </div>

      <div>
        <label>Clinic Address</label>
        <input {...register('clinicAddress')} />
        {errors.clinicAddress && <span>{errors.clinicAddress.message}</span>}
      </div>

      <div>
        <label>Start Timestamp</label>
        <Controller
          name="startTimestamp"
          control={control}
          render={({ field }) => <input type="datetime-local" {...field} />}
        />
        {errors.startTimestamp && <span>{errors.startTimestamp.message}</span>}
      </div>

      <div>
        <label>End Timestamp</label>
        <Controller
          name="endTimestamp"
          control={control}
          render={({ field }) => <input type="datetime-local" {...field} />}
        />
        {errors.endTimestamp && <span>{errors.endTimestamp.message}</span>}
      </div>

      <button type="submit">Book Appointment</button>
    </form>
    </div>

  );
};

export default AppointmentForm;
