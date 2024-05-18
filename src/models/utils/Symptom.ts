import mongoose, { Document } from "mongoose";


export interface Symptom extends Document {
    id: number;
    name: string;
    description?: string;
    departments?: string[];
    speciality?: string[];
}

const SymptomSchema = new mongoose.Schema<Symptom>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    departments: { type: [String], required: false },
    speciality: { type: [String], required: false }
});

const SymptomModel = mongoose.models && mongoose.models.Symptom || mongoose.model<Symptom>('Symptom', SymptomSchema);
export default SymptomModel;

