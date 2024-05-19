import mongoose from "mongoose";
import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import DepartmentModel from "@/models/utils/Department";


export async function POST(request: NextRequest){

    const { email, password, department, name, phoneNumber, speciality, location, hospital } = await request.json()
    console.log("email: ", email)
    console.log("password: ", password)
    console.log("department: ", department)
    console.log("name: ", name)
    console.log("phoneNumber: ", phoneNumber)
    console.log("speciality: ", speciality)


    dbConnect();

    try {

        const existingDoctor = await DoctorModel.findOne({
            email: email
        })
        console.log("existingDoctor: ", existingDoctor)

        if(existingDoctor){
            return NextResponse.json({
                status: 400,
                message: "Doctor already exists"
            },
            {
                status: 400,
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 12)

        const newDoctor = new DoctorModel({
            email: email,
            password: hashedPassword,
            department: department,
            name: name,
            phoneNumber: phoneNumber,
            speciality: speciality,
            location: location,
            hospital: hospital
        })

        const response = await newDoctor.save()
        console.log("response: ", response)

        if(!response){
            return NextResponse.json({
                status: 400,
                message: "Doctor could not be created"
            },
            {
                status: 400
            })
        }

        const departments = await DepartmentModel.findOne({}).distinct("name")
        console.log("departments: ", departments)

        if(!departments.includes(department)){
            const newDepartment = new DepartmentModel({
                name: department,
                doctors: [response._id]
            })

            const departmentResponse = await newDepartment.save()
            console.log("departmentResponse: ", departmentResponse)
            
            if(!departmentResponse){
                return NextResponse.json({
                    status: 400,
                    message: "Department could not be created"
                },
                {
                    status: 400
                })      
            }

        console.log("departmentResponse created successfully: ", departmentResponse)
        
        } else{
            const departmentResponse = await DepartmentModel.findOneAndUpdate({
                name: department
            },
            {
                $push: {
                    doctors: response._id
                }
            },
            {
                new: true
            
            })

            console.log("departmentResponse updated successfully: ", departmentResponse)
        }

    return NextResponse.json({
        status: 201,
        message: "Doctor created successfully"
    },
    {
        status: 201
    })
        
    } catch (error) {
        console.log("error in signing up doctor: ", error)
        return NextResponse.json({
            status: 500,
            message: "Internal server error"
            },
        {
           status: 500 
        })
    }
}
