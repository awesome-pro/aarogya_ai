import mongoose from "mongoose";
import PatientModel from "@/models/Patient";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import { error } from "console";


export async function POST(request: NextRequest){

    await dbConnect();

    const {name, email, password, phoneNumber, age, diseases } = await request.json();
    console.log("name, email, password, phoneNumber, age, diseases", name, email, password, phoneNumber, age, diseases);

    try {

        const existingPatientbyEmail = await PatientModel.findOne({
            email
        });

        if (existingPatientbyEmail) {
            return Response.json(
                {
                    success: false,
                    message: "Email already exists",
                    error: "Email already exists"
                },
                {
                    status: 400
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = new PatientModel({
            name: name,
            email: email,
            password: hashedPassword,
            phoneNumber: phoneNumber,
            age: age,
            diseases: diseases,
            appointments: [],
        });

        const result = await newPatient.save();

        console.log("newPatient", newPatient);

        if(!result){
            return Response.json(
                {
                    success: false,
                    message: "Error Registering User"
                },
                {
                    status: 500
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User registered successfully"
            },
            {
                status: 200,
                statusText: "OK"
            }
        );
        
    } catch (error) {

        console.log("Error signing up: ", error);

        return Response.json(
            {
                success: false,
                message: "Error Registering User"
            },
            {
                status: 500
            }
        )
    }
}