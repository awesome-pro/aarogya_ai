import mongoose from "mongoose";
import DiseaseModel from "@/models/Disease";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function POST( request: NextRequest ){

    await dbConnect();
    
    const { name, symptoms, departments, specialty } =  await request.json();
    console.log("Disease Name: ", name)
    console.log("Symptoms: ", symptoms)
    console.log("Departments: ", departments)
    console.log("Specialty: ", specialty)


    if(!name || !departments){
        return NextResponse.json({
            success: false,
            message: "Please provide all required fields"
        },
        {
            status: 400
        });
    }

    try {

        const existingDisease = await DiseaseModel.findOne({
            name: name
        }); 

        let departmentResponse: string = '';

        if(existingDisease){
            return NextResponse.json({
                success: false,
                message: "Disease already exists"
            },
            {
                status: 400
            });
        }

        const existingDepartment = axios.get(`http://localhost:3000/api/get-all-departments?$name=${departments[0]}`);

        if(!existingDepartment){
            const response = await axios.post(`http://localhost:3000/api/create-new-department`, {
                name: departments[0],
                specialty: specialty
            });
            console.log("Department Response: ", response.data)

            if(response.data.success){
                console.log("Department created successfully: ", response.data.data)
                departmentResponse = response.data.message

            } else {
                departmentResponse = response.data.error
            }
        }else{
            departmentResponse = "Department already exists"
            console.log("Department already exists")
            //Add the disease to the existing department
            //TODO
        }

        const disease = new DiseaseModel({
            name: name,
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