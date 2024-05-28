import PatientModel from "@/models/Patient";
import AppointmentModel from "@/models/utils/Appointment";
import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";



export async function POST( request: NextRequest){
    
        const { searchParams } = new URL(request.url, "http://localhost:3000");
        const { patientId, doctorId } = Object.fromEntries(searchParams);

        const { 
            startTimestamp, 
            endTimestamp, 
            location, 
            details, 
            disease, 
            prescriptions,
            patientAllergies,
            patientMedications,
            patientDiseases,
            patientSymptoms,  
        } = await request.json();

        console.log("patientId, doctorId, location , startTimeStamp, endTimeStamp,  ", patientId, doctorId, location, startTimestamp, endTimestamp, disease, details, patientAllergies, patientMedications, patientDiseases, patientSymptoms, prescriptions)
        
        console.log("patientId: ", patientId)
        console.log("doctorId: ", doctorId)
    
        if(!patientId || !doctorId || !startTimestamp || !endTimestamp){
            return NextResponse.json({
                status: 400,
                message: "Bad Request, missing required fields"
            },
            {
                status: 400
            })
        }
    
        await dbConnect();
    
        try {
            const patient = await PatientModel.findById(patientId);
            if(!patient){
                return NextResponse.json({
                    status: 404,
                    message: "Patient not found"
                },
                {
                    status: 404
                })
            }
    
            const doctor = await DoctorModel.findById(doctorId);
            if(!doctor){
                console.log("Doctors not found")
                return NextResponse.json({
                    status: 404,
                    message: "Doctor not found"
                },
                {
                    status: 404
                })
            }
            console.log("Doctor found: ", doctor)

            const patientOverlapppingAppointments = await AppointmentModel.findOne({
                patientId: patientId,
                $or: [
                    {startTimestamp: {$lte: startTimestamp}, endTimestamp: {$gte: startTimestamp}},
                    {startTimestamp: {$lte: endTimestamp}, endTimestamp: {$gte: endTimestamp}},
                    {startTimestamp: {$gte: startTimestamp}, endTimestamp: {$lte: endTimestamp}},
                    {startTimestamp: {$lte: startTimestamp}, endTimestamp: {$gte: endTimestamp}}
                ]
            });

            if(patientOverlapppingAppointments){
                console.log("Patient has overlapping appointments")

                return NextResponse.json({
                    status: 400,
                    message: "Patient has overlapping appointments"
                },
                {
                    status: 400
                })
            }

            const doctorOverlapppingAppointments = await AppointmentModel.findOne({
                doctorId: doctorId,
                $or: [
                    {startTimestamp: {$lte: startTimestamp}, endTimestamp: {$gte: startTimestamp}},
                    {startTimestamp: {$lte: endTimestamp}, endTimestamp: {$gte: endTimestamp}},
                    {startTimestamp: {$gte: startTimestamp}, endTimestamp: {$lte: endTimestamp}},
                    {startTimestamp: {$lte: startTimestamp}, endTimestamp: {$gte: endTimestamp}}
                ]
            });

            if(doctorOverlapppingAppointments){
                console.log("Doctor has overlapping appointments")

                return NextResponse.json({
                    status: 400,
                    message: "Doctor has overlapping appointments"
                },
                {
                    status: 400
                })
            }
           
    
            const appointment = new AppointmentModel({
                patientId: patientId,
                doctorId: doctorId,
                startTimestamp: startTimestamp,
                endTimestamp: endTimestamp,
                location: location || "",
                disease: disease || "",
                patientAllergies: patientAllergies || [],
                patientMedications: patientMedications  || [],
                patientDiseases: patientDiseases  || [],
                patientSymptoms: patientSymptoms  || [],
                prescriptions: prescriptions || [],
                details: details || "",
                status: "pending"
            });
    
            const response = await appointment.save();
            console.log("Appointment created: ", response);

            console.log("id: ", response?._id)

            if(!response){
                return NextResponse.json({
                    status: 500,
                    message: "Error creating appointment"
                },
                {
                    status: 500
                })
            }

    
            return NextResponse.json({
                status: 201,
                message: "Appointment created",
                data: response,
                id: response._id
            },
            {
                status: 201
            })
    
        } catch (error) {
            console.log("Error creating appointment: ", error);
            return NextResponse.json({
                status: 500,
                message: "Internal Server Error"
            },
            {
                status: 500
            })
        }
}