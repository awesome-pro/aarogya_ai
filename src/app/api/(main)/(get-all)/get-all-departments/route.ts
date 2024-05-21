import mongoose from "mongoose";
import DepartmentModel, { Department } from "@/models/utils/Department";
import dbConnect from "@/lib/dbConnect";



export async function GET( request: Request ){

    const { searchParams } = new URL(request.url);

    const { name, specialty, doctor } = Object.fromEntries(searchParams);

    await dbConnect();

    try {

        const searchConditions = [];
        let departments = <Department[]>([]);

        if (name) {
            searchConditions.push({ name: { $regex: name, $options: "i" } });
        }
        if(specialty) {
            searchConditions.push({ 
                specialty: { $in: [new RegExp(specialty, "i")] }
            });
        }
        if(doctor) {
            searchConditions.push({
                doctors: { $in: [new RegExp(doctor, "i")] }
            });
        }

        
        if(searchConditions.length === 0) {
            departments = await DepartmentModel.find({});
        } else {
            departments = await DepartmentModel.find(
                searchConditions.length > 0 ? { $or: searchConditions } : {}
            );
        }

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
        
        // const departmentIds = departments.map(department => department._id);
        // console.log("Department Ids: ", departmentIds.toString())

        return Response.json({
            success: true,
            data: departments,
            departmentNames: departmentNames,
            message: "Departments found successfully"
        },
        {
            status: 200,
            statusText: "Departments Found"
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