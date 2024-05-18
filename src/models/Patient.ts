import mongoose, {Schema, Document}  from "mongoose";


export interface Disease extends Document{
    diseaseName: string,
    diseaseSymptoms?: string[],
    diseaseCategory: string[]
}



export interface Patient extends Document{
    username: string,
    email: string,
    password: string,
    location?: string,
    diseases?: Disease[]
}