import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

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
        password,
        phoneNumber,
        department,
        specialty,
        hospital,
        location,
        appointmentIds,
        image,
        experience,
        consultationFee,
        availability,
        bio,
        rating

    } = await request.json()

    console.log("Request Body", request.body)

    await dbConnect()

    try {

        const updatedDoctor = await DoctorModel.findByIdAndUpdate(
            id,
            {
                name: name,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                department: department,
                specialty: specialty,
                hospital: hospital,
                location: location,
                appointmentIds: appointmentIds,
                image: image,
                experience: experience,
                consultationFee: consultationFee,
                availability: availability,
                bio: bio,
                rating: rating
            },
            {
                new: true
            }
        )

        if(!updatedDoctor) {
            return NextResponse.json(
                {
                    message: "Doctor not found",
                    error: "Not Found"
                },
                {
                    status: 404,
                    statusText: "Not Found"
                }
            )
        }

        console.log("Doctor updated successfully :) ", updatedDoctor)

        return NextResponse.json(
            {
                message: "Doctor updated successfully",
                data: updatedDoctor
            },
            {
                status: 200,
                statusText: "OK"
            }
        )
        
    } catch (error) {
        console.log("Error in updating doctor :( ", error)

        return NextResponse.json(
            {
                message: "Error in updating doctor",
                error: error
            },
            {
                status: 500,
                statusText: "Internal Server Error"
            }
        )
    }

}