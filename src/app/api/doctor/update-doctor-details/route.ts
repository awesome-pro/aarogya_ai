import mongoose from "mongoose";
import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse, NextMiddleware } from "next/server";



export async function PUT(req: NextRequest) {

    const { searchParams } = new URL(req.url)

    const id = searchParams.get('id');
    

    await dbConnect();

    const { name, email, phoneNumber, specialty, experience, consultationFee, availability, qualifications, bio, } = await req.json();
    try {

        const updatedDoctor = await DoctorModel.findByIdAndUpdate(
            id,
            {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                specialty: specialty,
                experience: experience,
                location: location,
                consultationFee: consultationFee,
                availability: availability,
                qualifications: qualifications,
                bio: bio,
            },
            { new: true }
        );  

        if (!updatedDoctor || updatedDoctor === null) {
            return NextResponse.json(
                {
                    message: "Doctor not found",
                    statusbar: 404
                },
                { status: 404 }
            )
        }


        return NextResponse.json(
            {
                mesage: "Doctor details updated successfully",
                doctor: updatedDoctor
            },
            { 
                status: 200 ,
                statusText: "OK"
            }
        )
        

    } catch (error) {
        console.log("error updating doctor detail: ", error);
        return NextResponse.json(
            {
                message: "Error updating doctor detail",
                error: error
            },
            { status: 500 }
        )
    }


}