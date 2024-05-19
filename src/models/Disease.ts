import mongoose, { Document } from "mongoose";

export interface Disease extends Document{
    name: string;
    symptoms?: string[];
    departments?: string[];
    specialty?: string;
}

const DiseaseSchema = new mongoose.Schema<Disease>({
    name: { type: String, required: true },
    symptoms: { type: [String], required: false },
    departments: { type: [String], required: false },
    specialty: { type: String, required: false }
});

const DiseaseModel = mongoose.models && mongoose.models.Disease || mongoose.model<Disease>('Disease', DiseaseSchema);
export default DiseaseModel;

