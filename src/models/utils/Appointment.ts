import mongoose from 'mongoose';

export interface Appointment {
    id: number;
    doctorName: string;
    patientName: string;
    startTimestamp: Date;
    endTimestamp: Date;
    location?: string;
}

export const AppointmentSchema = new mongoose.Schema<Appointment>({
    id: { type: Number, required: true },
    doctorName: { type: String, required: true },
    patientName: { type: String, required: true },
    startTimestamp: { type: Date, required: true },
    endTimestamp: { type: Date, required: true },
    location: { type: String, required: false }
});

const AppointmentModel = mongoose.models && mongoose.models.Appointment || mongoose.model<Appointment>('Appointment', AppointmentSchema);
export default AppointmentModel;