// components/AppointmentForm.tsx
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

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
  startTimestamp: z.date().optional(),
  endTimestamp: z.date().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

const AppointmentForm = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
  });

  const [allergies, setAllergies] = useState<string[]>(['']);
  const [medications, setMedications] = useState<string[]>(['']);
  const [diseases, setDiseases] = useState<string[]>(['']);

  const onSubmit = async (data: AppointmentFormData) => {
    const { doctorId, patientName } = data;
    const patientId = generatePatientId(patientName); // Implement this function based on your logic

    try {
      const response = await axios.post(`/api/create-new-appointment?patientId=${patientId}&doctorId=${doctorId}`, data);
      console.log(response.data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const removeField = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  return (
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
  );
};

export default AppointmentForm;

// Mock function to generate patientId based on patientName, replace with your logic
const generatePatientId = (patientName: string) => {
  return patientName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 10000);
};
