import PatientModel from "@/models/Patient";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  
    const { searchParams } = new URL(request.url, "http://localhost:3000");

    const { id, phoneNumber, email } = Object.fromEntries(searchParams);

    if(!id && !phoneNumber && !email){
        return NextResponse.json(
            {
                error: "Please provide either id, phoneNumber or email"
            }, {status: 400}
        );
    }

    await dbConnect();

    try {

        const searchConditions = [];

        if(id){
            searchConditions.push({ _id: id });
        }
        if(phoneNumber){
            searchConditions.push({ phoneNumber: phoneNumber });
        }
        if(email){
            searchConditions.push({ email: email });
        }

        const patient = await PatientModel.find(
            searchConditions.length > 0 ? { $or: searchConditions } : {}
        );

        if(patient.length === 0 || !patient){
            return NextResponse.json(
                {
                    error: "No patient found"
                }, 
                {
                    status: 404
                }
            );
        }

        console.log("Patient found Successfully :) ", patient)

        return NextResponse.json(
            {
               data: patient,
               message: "Patient found Successfully"
            }, 
            {
                status: 200
            }
        )
        
    } catch (error) {
        console.log("Error fetching patient: ", error);
        return NextResponse.json(
            {
                error: "Error fetching patient: " + error,
                statusbar: 500
            }, 
            {
                status: 500,
                statusText: "Error fetching patient"
            }
        )
    }
}