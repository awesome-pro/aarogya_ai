import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url)

    const { id } = Object.fromEntries(searchParams)

    if(!id) {
        return NextResponse.json(
            {
                success: false,
                message: "Doctor id is required"
            },
            {
                status: 400,
                statusText: "Doctor id is required"
            }
        )
    }

    await dbConnect()


    try {

        const doctor = await DoctorModel.findById(id)

        if(!doctor) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Doctor not found"
                },
                {
                    status: 404,
                    statusText: "Doctor not found"
                }
            )
        }

        console.log("doctor by id: ", doctor)

        return NextResponse.json(
            {
                success: true,
                data: doctor,
                message: "Doctor found Successfully"
            },
            {
                status: 200,
                statusText: "Doctor found Successfully"
            }
        )
        
    } catch (error) {
        console.log("error fetching doctor by id: ", error)

        return NextResponse.json(
            {
                success: false,
                message: "Error fetching doctor by id",
                error: error
            },
            {
                status: 500,
                statusText: "Error fetching doctor by id"
            }
        )
    }
    
}