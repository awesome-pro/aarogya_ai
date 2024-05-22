import PatientModel from "@/models/Patient";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url)

    const { id } = Object.fromEntries(searchParams)

    if(!id) {
        return NextResponse.json(
            {
                success: false,
                message: "Patient id is required"
            },
            {
                status: 400,
                statusText: "Patient id is required"
            }
        )
    }

    await dbConnect()

    try {

        const patient = await PatientModel.findById(id)

        if(!patient) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Patient not found"
                },
                {
                    status: 404,
                    statusText: "Patient not found"
                }
            )
        }

        console.log("patient by id: ", patient)

        return NextResponse.json(
            {
                success: true,
                data: patient,
                message: "Patient found Successfully"
            },
            {
                status: 200,
                statusText: "Patient found Successfully"
            }
        )
        
    } catch (error) {
        console.log("error fetching patient by id: ", error)

        return NextResponse.json(
            {
                success: false,
                message: "Error fetching patient by id"
            },
            {
                status: 500,
                statusText: "Error fetching patient by id"
            }
        )
    }

}