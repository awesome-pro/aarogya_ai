import mongoose from "mongoose";
import PatientModel from "@/models/Patient";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import { error } from "console";
import { data } from "@tensorflow/tfjs";


export async function POST(request: NextRequest){

    const {name, email, password, phoneNumber, age, diseases, height, weight,  } = await request.json();
    console.log("name, email, password, phoneNumber, age, diseases", name, email, password, phoneNumber, age, diseases);

    if(!email || !password){
        return Response.json(
            {
                success: false,
                message: "Email and password are required"
            },
            {
                status: 400
            }
        );
    }

    await dbConnect();

    try {

        const existingPatientbyEmail = await PatientModel.findOne({
            email: email
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
            name: name ? name : "",
            email: email,
            password: hashedPassword,
            phoneNumber: phoneNumber ? phoneNumber : 0,
            age: age ? age : 0,
            diseases: diseases ? diseases : "",
            height: height ? height : 0,
            weight: weight ? weight : 0,
        });

        const result = await newPatient.save();

        

        if(!result){
            return Response.json(
                {
                    success: false,
                    message: "Error Registering User",
                    error: "Error Registering User" + error
                },
                {
                    status: 500
                }
            );
        }

        console.log("newPatient", newPatient);

        return Response.json(
            {
                success: true,
                message: "User registered successfully",
                data: result
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