import mongoose from "mongoose";
import DoctorModel from "@/models/Doctor";
import PatientModel from "@/models/Patient";
import DepartmentModel from "@/models/utils/Department";
import DiseaseModel from "@/models/Disease";
import AppointmentModel from "@/models/utils/Appointment";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export default async function getDoctors(req: NextRequest) {
    const { searchParams } = new URL(req.url, "http://localhost:3000");
    const { department, disease, location, patientId } = Object.fromEntries(searchParams);
    console.log(department, disease, location, patientId);

    await dbConnect();

    try {

        if (department) {
            const doctors = await DoctorModel.find({ department: department });
            console.log("doctors: ", doctors)

            if (!doctors) {
                console.log("Doctors not found")

                return NextResponse.json({
                    status: 404,
                    message: "Doctors not found"
                },
                {
                    status: 404,
                    statusText: "Doctors not found"
                })
            }

            return NextResponse.json({
                status: 200,
                message: "Success",
                data: doctors
            },
            {
                status: 200,
                statusText: "Success"
            })
        }

        if (disease) {
            const diseaseData = await DiseaseModel.findOne({ name: disease });
            const doctors = await DoctorModel.find({ speciality: diseaseData.speciality });
            return NextResponse.json({
                status: 200,
                message: "Success",
                data: doctors
            },
            {
                status: 200,
                statusText: "Success"
            })
        }

        if (location) {
            const doctors = await DoctorModel.find({ location });
            return NextResponse.json({
                status: 200,
                message: "Success",
                data: doctors
            },
            {
                status: 200,
                statusText: "Success"
            })
        }

        if (patientId) {
            const patient = await PatientModel.findById(patientId);
            if (!patient) {
                return NextResponse.json({
                    status: 404,
                    message: "Patient not found"
                },
                {
                    status: 404,
                    statusText: "Patient not found"
                })
            }
            const appointmentIds = patient.appointmentIds;
            const appointments = await AppointmentModel.find({ _id: { $in: appointmentIds } });
            const doctorIds = appointments.map(appointment => appointment.doctorId);
            const doctors = await DoctorModel.find({ _id: { $in: doctorIds } });
            return NextResponse.json({
                status: 200,
                message: "Success",
                data: doctors
            },
            {
                status: 200,
                statusText: "Success"
            })
        }

        if (department && location) {

            const doctors = await DoctorModel.find({ department, location });

            return NextResponse.json({
                status: 200,
                message: "Success",
                data: doctors
            },
            {
                status: 200,
                statusText: "Success"
            })
        }

        return NextResponse.json({
            status: 400,
            message: "Bad request"
        },
        {
            status: 400,
            statusText: "Bad request"
        })
        
        
    } catch (error) {
        console.log("Error in getDoctors: ", error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error"
        },
        {
            status: 500,
            statusText: "Internal server error"
        })
    }
  
}