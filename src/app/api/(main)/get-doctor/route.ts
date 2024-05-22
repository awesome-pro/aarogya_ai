import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import DiseaseModel from "@/models/Disease";
import { Doctor } from "@/models/Doctor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url, "http://localhost:3000");
    const { id,  department, disease, location, specialty, hospital, rating } = Object.fromEntries(searchParams);
    console.log(id, department, disease, location, searchParams, specialty, hospital, rating);

    if(!id && !department && !disease && !location && !specialty && !hospital && !rating){
        return NextResponse.json(
            {
                error: "Please provide either id, department, disease, location, specialty, hospital or rating"
            }, {
                status: 400
            }
        );
    }

    await dbConnect();
    console.log("Connected to DB")

    try {

        const searchConditions = [];
        const departments = new Set<String>();

        departments.add(department);

        if(id){
            searchConditions.push({ _id: id });
        }
        if(location){
            searchConditions.push({ location: location });
        }
        if(specialty){
            searchConditions.push({ specialty: specialty });
        }
        if(hospital){
            searchConditions.push({ hospital: hospital });
        }
        if(rating){
            searchConditions.push({ rating: rating });
        }
        if(disease){
            const diseaseData = await DiseaseModel.find(
                {
                    name: disease
                }
            )

            console.log("diseaseData: ", diseaseData)

            if(diseaseData != undefined && diseaseData != null && diseaseData.length > 0){
                const departmentsByDisease = diseaseData[0].departments;
                departmentsByDisease.forEach((department: string) => { // Explicitly type 'department' as string
                    departments.add(department)
                }, departments ) // Pass 'departments' as the second argument to forEach

                console.log("departmentsByDisease: ", departmentsByDisease)
            }
        }
        if(departments.size > 0){
            searchConditions.push({ department: { $in: Array.from(departments) } });
        }

        console.log("departmentList: ", Array.from(departments))

        console.log("searchConditions: ", searchConditions)


        const doctors = await DoctorModel.find(
            searchConditions.length > 0 ? { $or: searchConditions } : {}
        );

        if(doctors.length === 0 || !doctors){
            console.log("No doctor found")

            return NextResponse.json(
                {
                    error: "No doctor found"
                }, 
                {
                    status: 404,
                    statusText: "Doctors Not Found"
                }
            );
        }

        console.log("Doctors found Successfully :) ", doctors)

        return NextResponse.json(
            {
                data: doctors,
                message: "Doctors found Successfully"
            }, 
            {
                status: 200,
                statusText: "Doctors Found"
            }
        )
        
    } catch (error) {
        console.log("Error fetching doctor: ", error)

        return NextResponse.json(
            {
                error: "Error fetching doctor :( " + error
            }, {
                status: 500,
                statusText: "Internal Server Error"
            }
        );
    }


}