import mongoose from "mongoose";
import DepartmentModel from "@/models/utils/Department";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function POST( request: NextRequest, response: NextResponse ){

   

    const { name, specialty, doctors } = await request.json();

    console.log("Name: ", name);
    console.log("Speciality: ", specialty);
    console.log("Doctors: ", doctors);


    await dbConnect();

    try {

        const existingDepartment = await DepartmentModel.findOne({
            name: name
        });

        if (existingDepartment) {
            return NextResponse.json({
                status: "error",
                message: "Department already exists"
            },
            {
                status: 400
            });
        }

        const newDepartment = new DepartmentModel({
            name: name,
            specialty: specialty,
            doctors: doctors
        });

        const savedDepartment = await newDepartment.save();
        console.log("Saved Department: ", savedDepartment);

        return NextResponse.json({
            status: "success",
            message: "New department created successfully",
            department: savedDepartment
        },
        {
            status: 201
        });
        
    } catch (error) {
        console.log("Error while creating new department: ", error);
        return NextResponse.json({
            status: "error",
            message: "Error while creating new department"
        },
        {
            status: 500
        });
        }
    
}