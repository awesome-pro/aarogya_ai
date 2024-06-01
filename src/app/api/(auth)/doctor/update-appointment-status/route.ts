// /pages/api/doctor/update-appointment-status.js

import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/NewAppointment";
import { NextResponse } from "next/server";
import AppointmentModel from "@/models/utils/Appointment";

export async function POST(request : Request) {
    await dbConnect();

    const { appointmentId, status } = await request.json();

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return NextResponse.json({
                status: 404,
                message: "Appointment not found"
            }, {
                status: 404
            });
        }

        appointment.status = status;
        await appointment.save();

        return NextResponse.json({
            status: 200,
            message: "Appointment status updated",
            appointment
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error updating appointment status: ", error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}
