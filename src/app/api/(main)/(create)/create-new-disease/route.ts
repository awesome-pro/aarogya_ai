import mongoose from "mongoose";
import DiseaseModel from "@/models/Disease";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function POST( request: NextRequest ){

    await dbConnect();
    console.log("Request: ", request.body)
    const { diseaseName, symptoms, departments, specialty } =  await request.json();
    console.log("Disease Name: ", diseaseName)
    console.log("Symptoms: ", symptoms)
    console.log("Departments: ", departments)
    console.log("Specialty: ", specialty)

    try {
       
        const existingDisease = await DiseaseModel.findOne({
            diseaseName: diseaseName
        }); 

        if(existingDisease){
            return NextResponse.json({
                success: false,
                message: "Disease already exists"
            },
            {
                status: 400
            });
        }

        const disease = new DiseaseModel({
            diseaseName: diseaseName,
            symptoms: symptoms,
            departments: departments,
            specialty: specialty
        });

        const savedDisease = await disease.save();
        if(!savedDisease){
            return NextResponse.json({
                success: false,
                message: "Error creating disease"
            },
            {
                status: 400
            });
        }
        console.log("Disease created successfully: ", disease)

        

        return NextResponse.json({
            success: true,
            message: "Disease created successfully",
            data: disease,
            id: disease._id
        });

    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({
            success: false,
            message: "Error creating disease",
            error: error
        },
        {
            status: 400
        });
    }
}