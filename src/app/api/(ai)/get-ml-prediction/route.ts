import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    const { symptoms } = await request.json()

    if(!symptoms || !symptoms.length) {
        return NextResponse.json({
            error: 'Please provide symptoms',
            message: 'Please provide symptoms'
        }, {
            status: 400,
            statusText: 'Please provide symptoms'
        })
    }

    try {

        const mlResponse = await axios.post('http://127.0.0.1:5000/predict', {
            symptoms
        })

        if(mlResponse.status === 200 && !mlResponse.data && mlResponse.data.prediction !== null && mlResponse.data.prediction !== undefined){

            console.log("Pre")
        }
       

        
        
    } catch (error) {
        console.log("Error fetching response from ml: ", error)

        return NextResponse.json(
        {
            error: 'An error occurred while fetching response from ml: ' + error,
            message: 'An error occurred while fetching response from ml: ' + error
        }, {
            status: 500,
            statusText: 'An error occurred while fetching response from ml: ' + error
        })
    }

    
    
}