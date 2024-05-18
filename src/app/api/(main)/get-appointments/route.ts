import mongoose from "mongoose";
import PatientModel from "@/models/Patient";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import AppointmentModel from "@/models/utils/Appointment";


export async function GET( request: NextRequest ){

    const { searchParams } = new URL(request.url, "http://localhost:3000");
    const { patientId } = Object.fromEntries(searchParams);

    console.log("id: ", patientId)

    if(!patientId){
        return NextResponse.json({
            status: 400,
            message: "Bad Request"
        },
        {
            status: 400
        })
    }

    await dbConnect();

    try {

        const appointments = await AppointmentModel.find({ endTimestamp: { $gte: new Date() }, patientId: patientId }).exec();
        console.log("Appointments: ", appointments);

        if(appointments.length === 0 || !appointments){
            console.log("No appointment found");

            return NextResponse.json({
                status: 404,
                message: "No appointment found"
            },
            {
                status: 404
            })
        }

        return NextResponse.json({
            status: 200,
            message: "Appointment found",
            data: appointments
        },
        {
            status: 200
        })
        
    } catch (error) {
        console.log("Error fetching appointment: ", error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        },
        {
            status: 500
        })
    }
}