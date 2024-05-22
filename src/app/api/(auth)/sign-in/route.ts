import mongoose from "mongoose";
import PatientModel from "@/models/Patient";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request){

    

    const { email, password } = await request.json();

    await dbConnect();
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

        const isPasswordCorrect = await bcrypt.compare(password, existingPatientbyEmail.password);
        console.log("isPasswordCorrect", isPasswordCorrect)

        if (!isPasswordCorrect) {
            return Response.json(
                {
                    success: false,
                    message: "Password is incorrect"
                },
                {
                    status: 400
                }
            );
        }

        console.log("existingPatientbyEmail", existingPatientbyEmail)
        console.log("existingPatientbyEmail._id", existingPatientbyEmail._id)
        console.log("signing in successful :)")

        return Response.json(
            {
                success: true,
                message: "Sign In Successful",
                data: existingPatientbyEmail
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error Signing In: ", error);
        return Response.json(
            {
                success: false,
                message: "Error Signing In"
            },
            {
                status: 500
            }
        );
    }

}