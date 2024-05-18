import mongoose from "mongoose";

export interface History {
    appontmentId: number;
    symptoms: string[];
    disease?: string;
    diagnosis?: string[];
    prescription?: string;
    followUp: string;
}

export const HistorySchema = new mongoose.Schema<History>({
    appontmentId: { type: Number, required: true },
    symptoms: { type: [String], required: true },
    disease: { type: String, required: false },
    diagnosis: { type: [String], required: false },
    prescription: { type: String, required: false },
    followUp: { type: String, required: true }
});


