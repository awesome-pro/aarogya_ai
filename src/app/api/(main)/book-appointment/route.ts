import AppointmentModel from "@/models/utils/Appointment";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";


export async function POST( request: NextRequest){

    const { searchParams } = new URL(request.url, "http://localhost:3000");

    const { patientId, doctorId } = Object.fromEntries(searchParams);

    const { startTimestamp, endTimestamp, location, details, disease } = await request.json();
}