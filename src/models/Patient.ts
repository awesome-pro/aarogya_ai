import mongoose, {Schema, Document}  from "mongoose";
import { HistorySchema } from "./utils/History";
import { Appointment } from "./utils/Appointment";


export interface Patient extends Document{
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    age: number;
    diseases?: string[];
    appointments?: Appointment[];
    history?: History[];
}


const PatientSchema = new Schema<Patient>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    age: { type: Number, required: true },
    diseases: { type: [String], required: false },
    appointments: { type: [String], required: false },
    history: [
        HistorySchema
    ]
});

const PatientModel = mongoose.models && mongoose.models.Patient || mongoose.model<Patient>('Patient', PatientSchema);
export default PatientModel;

