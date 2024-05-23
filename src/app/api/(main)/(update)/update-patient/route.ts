import PatientModel from "@/models/Patient";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";


export async function POST(request:NextRequest) {

    const { searchParams } = new URL(request.url)

    const { id } = Object.fromEntries(searchParams)

    if(!id) {
        return NextResponse.json(
            {
                message: "Id is required",
                error: "Bad Request"
            },
            {
                status: 400,
                statusText: "Bad Request"
            }
        )
    }

    const {
        name,
        email,
        phoneNumber,
        age,
        diseases,
        appointments,
        history,
        height,
        weight,
        bloodGroup,
        allergies,
        medications,
        address,
        image

    } = await request.json()

    console.log("Request Body", request.body)

    await dbConnect()

    try {


        const patient = await PatientModel.findByIdAndUpdate(
            id,
            {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                age: age,
                diseases: diseases,
                appointments: appointments,
                history: history,
                height: height,
                weight: weight,
                bloodGroup: bloodGroup,
                allergies: allergies,
                medications: medications,
                address: address,
                image: image
            },
            {
                new: true
            }
        )

        if(!patient) {
            return NextResponse.json(
                {
                    message: "Patient not found",
                    error: "Not Found"
                },
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        console.log("Patient Updated :) ", patient)

        return NextResponse.json(
            {
                message: "Patient updated successfully",
                data: patient
            },
            {
                status: 200,
                statusText: "OK"
            }
        )
        
    } catch (error) {
        console.log("Error in updating patient :( ", error)

        return NextResponse.json(
            {
                message: "Internal Server Error",
                error: error
            },
            {
                status: 500,
                statusText: "Internal Server Error"
            }
        )
    }


    
}