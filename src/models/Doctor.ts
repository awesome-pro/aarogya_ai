import monggose, { Document } from 'mongoose';
import { Appointment, AppointmentSchema } from './utils/Appointment';

export interface Doctor extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    department: string;
    speciality?: string;
    hospital?: string;
    location: string;
    appointmentIds?: String[];
}

const DoctorSchema = new monggose.Schema<Doctor>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    department: { type: String, required: true },
    speciality: { type: String, required: false },
    hospital: { type: String, required: false },
    location: { type: String, required: true },
    appointmentIds: [
        {
            type: String,
        }
    ]
});

const DoctorModel = monggose.models && monggose.models.Doctor || monggose.model<Doctor>('Doctor', DoctorSchema);
export default DoctorModel;