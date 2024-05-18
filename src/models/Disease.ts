import mongoose, { Document } from "mongoose";

export interface Disease extends Document{
    id: number;
    diseaseName: string;
    symptoms: string[];
    departments?: string[];
    speciality?: string;
}

const DiseaseSchema = new mongoose.Schema<Disease>({
    id: { type: Number, required: true },
    diseaseName: { type: String, required: true },
    symptoms: { type: [String], required: true },
    departments: { type: [String], required: false },
    speciality: { type: String, required: false }
});

const DiseaseModel = mongoose.models && mongoose.models.Disease || mongoose.model<Disease>('Disease', DiseaseSchema);
export default DiseaseModel;

