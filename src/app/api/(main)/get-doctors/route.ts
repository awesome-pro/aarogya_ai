import mongoose from "mongoose";
import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import PromptSync from "prompt-sync";
import chalk from "chalk";


export async function GET( request: NextRequest ){

    const { searchParams } = new URL(request.url);

    const locations = searchParams.get('location');
    const speciality = searchParams.get('speciality');
    const department = searchParams.get('department');

    console.log("Locations: ", locations);
    console.log("Speciality: ", speciality);
    console.log("Department: ", department);


    const { query } = await request.json();

    if(!query){
        console.log("Invalid query")

        return NextResponse.json({
            status: "error",
            message: "Invalid query"
        },
        {
            status: 400
        });
    }
    console.log("Query: ", query);

    chalk.level = 1;

    await dbConnect();
    console.log("Connected to database successfully :)");

    try {
        
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

        const model = genAI.getGenerativeModel({model: "gemini-pro"});
        const prompt = "Get me best medical department best department for (my problem description)" + query;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        return NextResponse.json({
            status: "success",
            message: "Doctors fetched successfully",
            "response": text
        },
        {
            status: 200
        });

    } catch (error) {
        console.log("Error getting doctors: ", error);
        return NextResponse.json({
            status: "error",
            message: "Error getting doctors"
        },
        {
            status: 500
        })
    }

   
}