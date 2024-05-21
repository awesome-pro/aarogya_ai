import mongoose, { Schema } from "mongoose";


export interface Department {
    name: string;
    specialty?: string[];
    doctors?: string[];
    image?: string;
}

const DepartmentSchema = new Schema<Department>({
    name: { type: String, required: true },
    specialty: { type: [String], required: false },
    doctors: { type: [String], required: false },
    image: { type: String, required: false },
});

const DepartmentModel = mongoose.models && mongoose.models.Department || mongoose.model<Department>('Department', DepartmentSchema);
export default DepartmentModel;