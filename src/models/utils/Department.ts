import mongoose, { Schema } from "mongoose";


export interface Department {
    departmentName: string;
    speciality?: string[];
    doctors?: string[];
}

const DepartmentSchema = new Schema<Department>({
    departmentName: { type: String, required: true },
    speciality: { type: [String], required: false },
    doctors: { type: [String], required: false }
});

const DepartmentModel = mongoose.models && mongoose.models.Department || mongoose.model<Department>('Department', DepartmentSchema);
export default DepartmentModel;