import mongoose from "mongoose";
import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST( request: NextRequest ){

    await dbConnect();

    const { name,
            email,
            password, 
            phoneNumber, 
            department, 
            speciality, 
            hospital, 
            location, 
            appointmentIds 
        } = await request.json();

        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Password", password);

        try {

            const existingDoctor = await DoctorModel.findOne({
                $or: [
                    { email: email },
                    { phoneNumber: phoneNumber }
                ]
            })

            if(existingDoctor){
                console.log("Doctor already exists");

                return NextResponse.json({
                    success: false,
                    message: "Doctor already exists"
                },
                {
                    status: 400
                });
            }

            const hashedPassword = await bcryptjs.hash(password, 12);
            console.log("Hashed Password: ", hashedPassword)

            const newDoctor = new DoctorModel({
                name: name,
                email: email,
                password: hashedPassword,
                phoneNumber: phoneNumber,
                department: department,
                speciality: speciality,
                hospital: hospital,
                location: location,
                appointmentIds: appointmentIds
            });

            const savedDoctor = await newDoctor.save();
            console.log("New Doctor: ", savedDoctor);

            if(!savedDoctor){
                console.log("Error while creating new doctor");

                return NextResponse.json({
                    success: false,
                    message: "Error while creating new doctor"
                },
                {
                    status: 500
                });
            }

            return NextResponse.json({
                success: true,
                message: "New doctor created successfully",
                doctor: savedDoctor
            },
            {
                status: 201
            });
            
        } catch (error) {
            console.log("Error while creating new doctor: ", error);

            return NextResponse.json(
                {
                    success: false,
                    message: "Error while creating new doctor"
                },
                {
                    status: 500
                }
            );
        }
}