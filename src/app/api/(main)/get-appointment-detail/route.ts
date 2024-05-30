import AppointmentModel from "@/models/utils/Appointment";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request: NextRequest){
    
        const { searchParams } = new URL(request.url, "http://localhost:3000");
        const { patientId, doctorId, id } = Object.fromEntries(searchParams);
        console.log("patientId, doctorId, id: ", patientId, doctorId, id)

        if(!id){
            return NextResponse.json({
                status: 400,
                message: "Bad Request, missing required fields"
            },
            {
                status: 400
            })
        }

        await dbConnect();

        try {

            const appointment = await AppointmentModel.findById(id);

            if(!appointment){
                return NextResponse.json({
                    status: 404,
                    message: "Appointment not found"
                },
                {
                    status: 404,
                    statusText: "Appointment not found"
                })
            }

            console.log(
                "appointment: ", appointment
            )

            return NextResponse.json({
                    status: 200,
                    data: appointment,
                    message: "Appointment details fetched successfully"
                },
                {
                    status: 200,
                    statusText: "OK"
                }
            )
            
        } catch (error) {
            console.log("Error while appoint details: ", error)

            return NextResponse.json({
                status: 500,
                message: "Internal Server Error" + error
                },
                {
                    status: 500,
                    statusText: "Internal Server Error"
                }
            )
        }

    }