import mongoose from "mongoose";
import PatientModel from "@/models/Patient";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request){

        const { searchParams } = new URL(request.url);

        const _id = searchParams.get("id");

        await dbConnect();
    
       const { newPassword } = await request.json();
       console.log("newPassword", newPassword)
        console.log("_id", _id)

        try {
    
            const existingPatientbyId = await PatientModel.findOne({
                _id
            });
    
            if (!existingPatientbyId) {
                return Response.json(
                    {
                        success: false,
                        message: "Patient does not exist"
                    },
                    {
                        status: 400
                    }
                );
            }
    
            const hashedPassword = await bcrypt.hash(newPassword, 10);
    
            const updatedPatient = await PatientModel.findOneAndUpdate(
                {
                    _id
                },
                {
                    password: hashedPassword
                },
                {
                    new: true
                }
            );
    
            if (!updatedPatient) {
                console.log("updatedPatient reset failed ", updatedPatient)
                return Response.json(
                    {
                        success: false,
                        message: "Password reset failed"
                    },
                    {
                        status: 500
                    }
                );
            }
            console.log("updatedPatient reset successful ", updatedPatient)
    
            return Response.json(
                {
                    success: true,
                    message: "Password reset successful"
                },
                {
                    status: 200
                }
            );
    
        } catch (error) {
            console.log("error reseting password: ", error)

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





