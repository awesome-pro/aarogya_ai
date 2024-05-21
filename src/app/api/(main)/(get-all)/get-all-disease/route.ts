import mongoose from "mongoose";
import DiseaseModel from "@/models/Disease";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: Request){

    await dbConnect();

    try {
        const diseases = await DiseaseModel.find({});
    
        console.log("Diseases: ", diseases);
    
        if(!diseases || diseases.length === 0){
            console.log("No diseases found");
    
            return NextResponse.json({
                success: false,
                message: "No diseases found"
            },
            {
                status: 400
            });
        }

        const diseaseNames = diseases.map(disease => disease.name);
        console.log("Disease Names: ", diseaseNames)
        return NextResponse.json({
            success: true,
            message: "Diseases fetched successfully",
            data: diseases,
            diseaseNames: diseaseNames
        });

    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({
            success: false,
            message: "Error fetching diseases"
        },
        {
            status: 400
        });
        
    }

}