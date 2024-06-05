import mongoose from "mongoose";
import DoctorModel from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import DepartmentModel from "@/models/utils/Department";

export async function POST(request: Request){

    console.log("request: ", request.body);

    const {
        email,
        password,
        department,
        name,
        phone,
        clinicAddress,
        hospital,
        consultationFee,
        availability,
        experience,
        latitude,
        longitude,
        bio,
        profileImage
    } = await request.json();

    console.log("email: ", email);
    console.log("password: ", password);
    console.log("department: ", department);
    console.log("name: ", name);
    console.log("phoneNumber: ", phone);
    console.log("clinicAddress: ", clinicAddress);
    console.log("hospital: ", hospital);
    console.log("consultationFee: ", consultationFee);
    console.log("availability: ", availability);
    console.log("experience: ", experience);
    console.log("bio: ", bio);
    console.log("profileImage: ", profileImage);

    await dbConnect();

    try {
        const existingDoctor = await DoctorModel.findOne({
            $or: [
                { email: email },
                { phoneNumber: phone }
            ]
        });

        console.log("existingDoctor: ", existingDoctor);

        if (existingDoctor) {
            return NextResponse.json({
                status: 400,
                message: "Doctor already exists"
            }, {
                status: 400
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);

        const newDoctor = new DoctorModel({
            email: email,
            password: hashedPassword,
            department: department || "General",
            name: name || "",
            phoneNumber: phone || "",
            latitude: latitude || "",
            longitude: longitude || "",
            clinicAddress: clinicAddress || "",
            hospital: hospital || "",
            appointments: [],
            consultationFee: consultationFee || 0,
            availability: availability || "",
            experience: experience || "",
            bio: bio || "",
            profileImage: profileImage || ""
        });

        const response = await newDoctor.save();
        console.log("response: ", response);

        if (!response) {
            return NextResponse.json({
                status: 400,
                message: "Doctor could not be created"
            }, {
                status: 400
            });
        }

        const departments = await DepartmentModel.findOne({}).distinct("name");
        console.log("departments: ", departments);

        if (!departments.includes(department)) {
            const newDepartment = new DepartmentModel({
                name: department,
                doctors: [response._id]
            });

            const departmentResponse = await newDepartment.save();
            console.log("departmentResponse: ", departmentResponse);
            
            if (!departmentResponse) {
                return NextResponse.json({
                    status: 400,
                    message: "Department could not be created"
                }, {
                    status: 400,
                    statusText: "Department could not be created"
                });
            }

            console.log("departmentResponse created successfully: ", departmentResponse);
        
        } else {
            const departmentResponse = await DepartmentModel.findOneAndUpdate({
                name: department
            }, {
                $push: { doctors: response._id }
            }, {
                new: true
            });

            console.log("departmentResponse updated successfully: ", departmentResponse);
        }

        return NextResponse.json({
            status: 201,
            message: "Doctor created successfully"
        }, {
            status: 201
        });
        
    } catch (error) {
        console.log("error in signing up doctor: ", error);
        
        return NextResponse.json({
            status: 500,
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}

