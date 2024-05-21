import mongoose from "mongoose";
import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: Request ){

    await dbConnect();

    try {
        const locations = await DoctorModel.find({ location: { $ne: null } }).distinct('location');
    
        console.log("Locations: ", locations);
    
        if(!locations){
            console.log("No locations found");
    
            return NextResponse.json({
                success: false,
                message: "No locations found"
            },
            {
                status: 400
            });
        }
        
        return NextResponse.json({
            success: true,
            message: "Doctors fetched successfully",
            data: locations
        });
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({
            success: false,
            message: "Error fetching locations"
        },
        {
            status: 400
        });
        
    }
}