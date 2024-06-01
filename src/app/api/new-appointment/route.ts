import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/models/NewAppointment";

// Define the handler function
export async function POST(req: Request) {
  // Ensure only POST requests are accepted
    // Connect to the database
    await dbConnect();

    try {
      // Extract appointment details from the request body
      const {
        details,
        disease,
        doctorId,
        endTimestamp,
        location,
        patientAllergies,
        patientDiseases,
        patientId,
        patientMedications,
        patientSymptoms,
        prescriptions,
        startTimestamp,
        status,
      } = await req.json();

      // Create a new appointment document
      const newAppointment = new AppointmentModel({
        details,
        disease,
        doctorId,
        endTimestamp,
        location,
        patientAllergies,
        patientDiseases,
        patientId,
        patientMedications,
        patientSymptoms,
        prescriptions,
        startTimestamp,
        status,
      });

      // Save the new appointment to the database
      const savedAppointment = await newAppointment.save();

      // Respond with success message and status code
      return NextResponse.json(
        {
          success: true,
          message: "Appointment created successfully",
          data: savedAppointment,
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      // Handle errors and respond with appropriate status code and message
      console.error("Error creating appointment:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Error creating appointment",
          error: error,
        },
        {
          status: 400,
        }
      );
    }
  } 
