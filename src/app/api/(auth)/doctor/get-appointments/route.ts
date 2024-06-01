import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/NewAppointment";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request : Request) {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('id');

    console.log(doctorId);

    await dbConnect();

    try {
        const appointment = await Appointment.find({doctorId});

        if (!appointment) {
            return NextResponse.json({
                status: 404,
                message: "Doctor not found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            status: 200,
            appointments: appointment
        }, {
            status: 200
        });

    } catch (error) {
        console.error("Error fetching appointments: ", error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}
