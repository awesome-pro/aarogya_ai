"use client";

// components/AppointmentForm.tsx
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Patient } from '@/models/Patient';
import { useToast } from '@/components/ui/use-toast';
import { Doctor } from '@/models/Doctor';
import { div } from '@tensorflow/tfjs';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import CustomAppInput from '@/components/CustomAppInput';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

  const router = useRouter()

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
      patientAllergies: [],
      patientMedications: [],
      patientBodyImage: patientData?.image || '',
      patientPrescriptionImage: '',
      patientDiseases: [],
      doctorName: doctorData?.name || '',
      doctorId: doctorId || '',
      clinicAddress: doctorData?.clinicAddress || '',
      startTimestamp: Date.now().toString(),
      endTimestamp: Date.now().toString(),
    }
  });



    const fetchPatientDetails = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSuccess('');
    
        try {
        if (!patient?._id) {
            setError('An error occurred while fetching patient data: Patient not found');
            setLoading(false);
            return;
        }
    
        const response = await axios.get(`/api/get-patient-by-id?id=${patient?._id}`);
        const responseJson = response.data;
    
        if (response.status !== 200 || response.data.error) {
            setError('An error occurred while fetching patient data: ' + response.data.error);
            toast({
            title: 'Error',
            description: 'An error ' + response.data.error,
            variant: 'destructive'
            });
            return;
        }
    
        const patientData = responseJson.data;
    
        console.log(patientData);
        setSuccess('Patient data fetched successfully: ' + patientData.name);
        setPatientData(patientData);
    
        // Update form default values with fetched patient data
        reset({
            patientName: patientData?.name || '',
            patientEmail: patientData?.email || '',
            patientPhoneNumber: patientData?.phoneNumber?.toString() || '',
            patientAddress: patientData?.address || '',
            patientImage: patientData?.image || '',
            patientAge: patientData?.age || 0,
            patientHeight: patientData?.height || 0,
            patientWeight: patientData?.weight || 0,
            patientBloodGroup: patientData?.bloodGroup || '',
            patientAllergies: patientData?.allergies || [''],
            patientMedications: patientData?.medications || [''],
            patientBodyImage: patientData?.image || '',
            patientPrescriptionImage: '',
            patientDiseases: patientData?.diseases || [''],
            doctorName: doctorData?.name || '',
            doctorId: doctorId || '',
            clinicAddress: doctorData?.clinicAddress || '',
            startTimestamp: '',
            endTimestamp: '',
        });
    
        } catch (error) {
        setError('An error occurred while fetching patient data: ' + error);
        toast({
            title: 'Error',
            description: 'An error ' + error,
            variant: 'destructive'
        });
        return;
        } finally {
        setLoading(false);
        }
    }, [patient, toast, reset]);
    

    const fetchDoctorDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess('');

    try {
        if (!doctorId) {
        setError('An error occurred while fetching doctor data: Doctor not found');
        setLoading(false);
        toast({
            title: 'Error',
            description: 'An error ' + 'Doctor not found',
            variant: 'destructive'
        });
        return;
        }

        const response = await axios.get(`/api/get-doctor-by-id?id=${doctorId}`);
        const responseJson = response.data;

        if (response.status !== 200) {
        setError('An error occurred while fetching doctor data: ' + responseJson.message);
        return;
        }

        const doctorData = responseJson.data;

        toast({
        title: 'Success',
        description: 'Doctor data fetched successfully',
        variant: 'success'
        });

        console.log(doctorData);
        setDoctorData(doctorData);
        setSuccess('Doctor data fetched successfully: ' + doctorData?.name);

        // Update form default values with fetched doctor data
        reset({
        doctorName: doctorData?.name || '',
        doctorId: doctorId || '',
        clinicAddress: doctorData?.clinicAddress || '',
        // Include other fields if necessary
        });

    } catch (error) {
        setError('An error occurred while fetching doctor data: ' + error);
        toast({
        title: 'Error',
        description: 'An error ' + error,
        variant: 'destructive'
        });
        return;
    } finally {
        setLoading(false);
    }
    }, [doctorId, reset, toast]);

    useEffect(() => {
        
      if(patient?._id) {
          fetchPatientDetails()
      }

      if(doctorId) {
          fetchDoctorDetails()
      } 

      }, [session, patient?._id, setPatientData, setDoctorData, doctorId, reset]
    )


  const onSubmit = async (data: AppointmentFormData) => {

    console.log("data: ", data);

    toast({
        title: 'Info',
        description: 'Creating appointment',
        variant: 'default'
    })
    
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

      const response = await axios.post(`/api/create-new-appointment?patientId=${patient?._id}&doctorId=${doctorId}`, data);

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

      const appointmentId = response.data.id;

      if(!appointmentId) {
        setError('An error occurred while creating appointment: Appointment ID not found');
        toast(
          {
            title: 'Error',
            description: 'An error ' + 'Appointment ID not found',
            variant: 'destructive'
          }
        )
        return;
      }

      router.push(`/appointment-details?id=${appointmentId}`);

      toast({
        title: 'Info',
        description: 'Redirecting to appointment details page',
        variant: 'success'
      
      })
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

    
    <div className='flex flex-col items-center justify-center p-2 gap-2 '>

      <FormError message={error?.toString()} />
      <FormSuccess message={success} />

      <form onSubmit={handleSubmit(onSubmit)}>

        <CustomAppInput
        label="Patient Name"
        name="patientName"
        register={register}
        errors={errors.patientName}
      />
      <CustomAppInput
        label="Patient Email"
        name="patientEmail"
        register={register}
        errors={errors.patientEmail}
        
      />
      <CustomAppInput
        label="Patient Phone Number"
        name="patientPhoneNumber"
        register={register}
        errors={errors.patientPhoneNumber}
      />
      <CustomAppInput
        label="Patient Address"
        name="patientAddress"
        register={register}
        errors={errors.patientAddress}
      />
      {/* Add other fields here similarly */}
      
      <div>
        <label
        className='font-semibold text-blue-600 font-xl'
        >Patient Allergies</label>
        {allergies.map((_, index) => (
          <div key={index} className='flex gap-4'>
            <Input 
            {...register(`patientAllergies.${index}` as const)} 
            className='border border-gray-300 rounded-md  p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-96'
            />
            <Button 
            type="button" 
            onClick={() => removeField(index, setAllergies)}
            className=' text-red-500 p-2 rounded-3xl px-6 mt-2 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
            variant={'outline'}
            >Remove</Button>
          </div>
        ))}
        <Button 
        type="button" 
        onClick={() => addField(setAllergies)}
        className='bg-blue-500 text-white p-2 rounded-3xl px-6 mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
        >Add Allergy</Button>
      </div>

      <div>
        <label>Patient Medications</label>
        {medications.map((_, index) => (
          <div key={index} className='flex gap-4'>
            <h1 className='font-semibold text-indigo-600 '>
                {index + 1}
            </h1>
            <Input 
            {...register(`patientMedications.${index}` as const)} 
            className='border border-gray-300 rounded-md  p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-96'
            />
            <Button 
            type="button" 
            onClick={() => removeField(index, setMedications)}
            className=' text-red-500 p-2 rounded-3xl px-6 mt-2 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
            variant={'outline'}
            >Remove</Button>
          </div>
        ))}
        <Button 
        type="button" 
        onClick={() => addField(setMedications)}
        className='bg-blue-500 text-white p-2 rounded-3xl px-6 mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
        
        >Add Medication</Button>
      </div>

      <div className='my-6'>
        <label>Patient Diseases</label>
        {diseases.map((_, index) => (
          <div key={index} className='flex gap-4'>
            <Input 
            {...register(`patientDiseases.${index}` as const)}
            className='border border-gray-300 rounded-md  p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-96'
            />
            <Button 
            type="button" 
            onClick={() => removeField(index, setDiseases)}
            className=' text-red-500 p-2 rounded-3xl px-6 mt-2 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent'
            variant={'outline'}
            >Remove</Button>
          </div>
        ))}
        <Button 
        type="button" 
        onClick={() => addField(setDiseases)}
        className='bg-blue-500 text-white p-2 rounded-3xl px-6 mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
        >Add Disease</Button>
      </div>

      <CustomAppInput
        label="Doctor Name"
        name="doctorName"
        register={register}
        errors={errors.doctorName}
        disabled={true}
        />

      <CustomAppInput
        label="Doctor ID"
        name="doctorId"
        register={register}
        errors={errors.doctorId}
        disabled={true}
        />

        <CustomAppInput
        label="Clinic Address"
        name="clinicAddress"
        register={register}
        errors={errors.clinicAddress as FieldError}
        disabled={false}
        />

      <div>
        <label
        className='font-semibold text-blue-600 font-xl'
        >Start Timestamp</label>
        <Controller
          name="startTimestamp"
          control={control}
          render={({ field }) => <input type="datetime-local" {...field} />}
        />
        {errors.startTimestamp && <span>{errors.startTimestamp.message}</span>}
      </div>

      <div>
        <label
        className='font-semibold text-blue-600 font-xl'
        >End Timestamp</label>
        <Controller
          name="endTimestamp"
          control={control}
          render={({ field }) => <input type="datetime-local" {...field} />}
        />
        {errors.endTimestamp && <span>{errors.endTimestamp.message}</span>}
      </div>

      <Button 
      type="submit"
      className='bg-blue-500 text-white p-2 rounded-3xl px-9 mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent m-6'
      >Book Appointment</Button>
        </form>
    </div>

  );
};

export default AppointmentForm;
