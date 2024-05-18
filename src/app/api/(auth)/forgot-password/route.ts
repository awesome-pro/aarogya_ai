import mongoose from "mongoose";
import PatientModel from "@/models/Patient";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request){

    await dbConnect();

    const { email } = await request.json();

    try {

        const existingPatientbyEmail = await PatientModel.findOne({
            email
        });

        if (!existingPatientbyEmail) {
            return Response.json(
                {
                    success: false,
                    message: "Email does not exist"
                },
                {
                    status: 400
                }
            );
        }

        console.log("existingPatientbyEmail", existingPatientbyEmail)
        console.log("existingPatientbyEmail._id", existingPatientbyEmail._id)
        console.log("forgot password successful :)")
        
        return Response.json(
            {
                success: true,
                message: "Forgot Password Successful"
            },
            {
                status: 200
            }
        );

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Server Error"
            },
            {
                status: 500
            }
        );
    }
}