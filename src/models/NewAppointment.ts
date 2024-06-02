// models/NewAppointment.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  details: string;
  disease: string;
  doctorId: string;
  endTimestamp: Date;
  location: string;
  patientAllergies: string[];
  patientDiseases: string[];
  patientId: string;
  patientMedications: string[];
  patientSymptoms: string[];
  prescriptions: string[];
  startTimestamp: Date;
  status: string;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>({
  details: { type: String, default: "" },
  disease: { type: String, default: "" },
  doctorId: { type: String, required: true },
  endTimestamp: { type: Date, required: true },
  location: { type: String, default: "" },
  patientAllergies: { type: [String], default: [] },
  patientDiseases: { type: [String], default: [] },
  patientId: { type: String, required: true },
  patientMedications: { type: [String], default: [] },
  patientSymptoms: { type: [String], default: [] },
  prescriptions: { type: [String], default: [] },
  startTimestamp: { type: Date, required: true },
  status: { type: String, required: true },
});

export default mongoose.models.NewAppointment || mongoose.model<IAppointment>('NewAppointment', AppointmentSchema);
