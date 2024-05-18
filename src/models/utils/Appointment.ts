import mongoose from 'mongoose';

export interface Appointment {
    doctorId: string;
    patientId: string;
    startTimestamp: Date;
    endTimestamp: Date;
    location?: string;
    disease?: string;
    details?: string;
}

export const AppointmentSchema = new mongoose.Schema<Appointment>({
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    startTimestamp: { type: Date, required: true },
    endTimestamp: { type: Date, required: true },
    location: { type: String, required: false },
    disease: { type: String, required: false },
    details: { type: String, required: false }
});

const AppointmentModel = mongoose.models && mongoose.models.Appointment || mongoose.model<Appointment>('Appointment', AppointmentSchema);
export default AppointmentModel;