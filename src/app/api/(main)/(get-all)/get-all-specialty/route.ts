import mongoose from "mongoose";
import DoctorModel from "@/models/Doctor";
import DepartmentModel from "@/models/utils/Department";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request: NextRequest ){

    await dbConnect();

    try {

        const specialties = await DepartmentModel.find({}, { specialty: 1, _id: 0});
        console.log("Specialties: ", specialties);

        const specialtyList = specialties.map((specialty) => specialty.specialty).flat();
        console.log("Specialty List: ", specialtyList);

        if(specialties.length === 0 || !specialties){
            console.log("No specialty found");

            return NextResponse.json({
                status: 404,
                message: "No specialty found"
            },
            {
                status: 404
            })
        }

        return NextResponse.json({
            status: 200,
            message: "Specialty found",
            data: specialties,
            specialtyList: specialtyList
        },
        {
            status: 200
        })
        
    } catch (error) {
        console.log("Error fetching specialty: ", error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        },
        {
            status: 500
        })
        }
}