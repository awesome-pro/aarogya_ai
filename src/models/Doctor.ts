import mongoose, { Document } from 'mongoose';
import { Appointment, AppointmentSchema } from './utils/Appointment';

export interface Doctor extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber?: number;
    department: string;
    hospital?: string;
    clinicAddress: string;
    appointmentIds?: string[];
    qualifications?: string;
    experience?: string;
    consultationFee?: number;
    availability?: string;
    bio?: string;
    rating?: number;
    latitude: string;
    longitude:string;
}

const DoctorSchema = new mongoose.Schema<Doctor>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: false },
    department: { type: String, required: true }, // updated to required
    hospital: { type: String, required: false },
    clinicAddress: { type: String, required: false },
    appointmentIds: [
        {
            type: String,
        }
    ],
    qualifications: { type: String, required: false },
    experience: { type: String, required: false },
    consultationFee: { type: Number, required: false },
    availability: { type: String, required: false },
    bio: { type: String, required: false },
    rating: { type: Number, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
});

const DoctorModel = mongoose.models.Doctor || mongoose.model<Doctor>('Doctor', DoctorSchema);
export default DoctorModel;
