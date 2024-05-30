import mongoose from 'mongoose';

export interface Appointment {
    doctorId: string;
    patientId: string;
    doctorName?: string;
    patientName?: string;
    startTimestamp: Date;
    endTimestamp: Date;
    location?: string;
    disease?: string;
    details?: string;
    status?: string;
    prescriptions?: string[];
    patientAllergies?: string[];
    patientMedications?: string[];
    patientDiseases?: string[];
    patientSymptoms?: string[];
}

export const AppointmentSchema = new mongoose.Schema<Appointment>({
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    patientName: { type: String, required: false },
    doctorName: { type: String, required: false },
    startTimestamp: { type: Date, required: true },
    endTimestamp: { type: Date, required: true },
    location: { type: String, required: false },
    disease: { type: String, required: false },
    details: { type: String, required: false },
    status: { type: String, required: false },
    prescriptions: [
        {
            type: String,
            required: false
        }
    ],
    patientAllergies: [
        {
            type: String,
            required: false
        }
    ],
    patientMedications: [
        {
            type: String,
            required: false
        }
    ],
    patientDiseases: [
        {
            type: String,
            required: false
        }
    ],
    patientSymptoms: [
        {
            type: String,
            required: false
        }
    ]
});

const AppointmentModel = mongoose.models && mongoose.models.Appointment || mongoose.model<Appointment>('Appointment', AppointmentSchema);
export default AppointmentModel;