import mongoose from "mongoose";
import DoctorModel from "@/models/Doctor";
import PatientModel from "@/models/Patient";
import DepartmentModel from "@/models/utils/Department";
import DiseaseModel from "@/models/Disease";
import AppointmentModel from "@/models/utils/Appointment";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url, "http://localhost:3000");
    const { department, disease, location, patientId, specialty } = Object.fromEntries(searchParams);
    console.log(department, disease, location, patientId, searchParams, specialty);

    await dbConnect();

    try {
        
        let doctorsQuery = [];

        if(department || location){
            doctorsQuery.push(
                {
                    $or: {
                        department: department,
                        location: location
                    }
                }
            )
        }
        console.log("Doctors query1: ", doctorsQuery);

        // If disease is provided, find doctors based on disease specialty and departmen
        if(disease || specialty){
            const diseaseDetails = await DiseaseModel.findOne({ diseaseName: disease }).exec();
            console.log("Disease details: ", diseaseDetails);

            if(diseaseDetails){
                doctorsQuery.push(
                    {
                        $or: [
                            {
                                specialty: diseaseDetails.specialty
                            },
                            {
                                department: {
                                    $in: diseaseDetails.department
                                }
                            }
                        ]
                    }
                )
            }
            console.log("Doctors query2: ", doctorsQuery);

            // Combine all conditions with $or operator
            let doctors = await DoctorModel.find(
                doctorsQuery.length ? { $or: doctorsQuery } : {} as any
            )
            console.log("Doctors: ", doctors);

            if(doctors.length === 0 || !doctors){
                console.log("No doctors found");

                return NextResponse.json({
                    status: 404,
                    message: "No doctors found"
                },
                {
                    status: 404
                })
            }


            return NextResponse.json({
                status: 200,
                message: "Doctors found",
                doctors: doctors
            },
            {
                status: 200
            })
        }
    } catch (error) {
        console.log("Error in getDoctors: ", error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error",
            error: error
        },
        {
            status: 500,
            statusText: "Internal server error"
        })
    }
  
}