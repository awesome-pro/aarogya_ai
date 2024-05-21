import mongoose from "mongoose";
import DepartmentModel from "@/models/utils/Department";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";


export async function GET( request: Request ){

    await dbConnect();

    try {
        
        const departments = await DepartmentModel.find({});
        console.log("Departments: ", departments);

        if (!departments) {
            console.log("No departments found");

            return Response.json({
                success: false,
                message: "No departments found"
            },
            {
                status: 404
            });
        }

        const departmentNames = departments.map(department => department.name);
        console.log("Department Names: ", departmentNames)

        const departmentSpecialties = departments.map(department => department.specialty);
        console.log("Department Specialties: ", departmentSpecialties)

        const departmentDoctors = departments.map(department => department.doctors);
        console.log("Department Doctors: ", departmentDoctors.toString())
        
        const departmentIds = departments.map(department => department._id);
        console.log("Department Ids: ", departmentIds.toString())

        return Response.json({
            success: true,
            data: departments,
            departmentIds: departmentIds,
            departmentNames: departmentNames,
        },
        {
            status: 200
        });

    } catch (error) {
        console.log("Error while fetching departments: ", error);

        return Response.json(
            {
                success: false,
                message: "Error while fetching departments"
            },
            {
                status: 500
            }
        );
    }
}