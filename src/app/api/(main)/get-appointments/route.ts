import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import AppointmentModel from "@/models/utils/Appointment";


export async function GET( request: NextRequest ){

    const { searchParams } = new URL(request.url, "http://localhost:3000");
    const { patientId, doctorId } = Object.fromEntries(searchParams);

    console.log("patiendId: ", patientId)
    console.log("doctorId: ", doctorId)

    if(!patientId && !doctorId){
        return NextResponse.json({
            status: 400,
            message: "Invalid request. Please provide patientId or doctorId"
        },
        {
            status: 400
        })
    }

    await dbConnect();

    try {

        const appointments = await AppointmentModel.find(
            { 
                endTimestamp: { $gte: new Date() },
                $or: [
                    { doctorId: doctorId },
                    { patientId: patientId }
                ]
             }).exec();

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
            status: 500,
            statusText: "Internal Server Error"
        })
    }
}