import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server";
import DepartmentModel from "@/models/utils/Department";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: NextRequest) {

    // const { query } = await request.json();
    // console.log("Query: ", query);

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    try {
        // const queryString = query.toLowerCase().toString();
        // console.log("Query string: ", queryString);
        
        dbConnect();
        const allDepartment = await DepartmentModel.find({}).exec();
        console.log("All department: ", allDepartment)
        // const allDepartmentNames = allDepartment.map(department => department.name.distinct());
        // console.log("All department names: ", allDepartmentNames)

        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const prompt = "Get the best department(s) as array of strings based on the medical query provided by patient" + "from the list of departments: " + allDepartment

        const response = await (await model.generateContent(prompt)).response.candidates[0].content.parts[0].text;
        console.log("Response from generative AI: ", response)

        return NextResponse.json(
            {
                status: 200,
                message: "Department fetched successfully",
                data: response
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Error fetching department from query: ", error);
        return NextResponse.json(
            {
                status: 500,
                message: "Internal Server Error",
                error: error
            },
            {
                status: 500
            }
        )
    }

}