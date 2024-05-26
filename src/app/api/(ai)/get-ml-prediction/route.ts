import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    console.log(request);

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

        if(mlResponse.status === 200 && mlResponse.data && mlResponse.data.prediction !== null && mlResponse.data.prediction !== undefined){

            console.log("Prediction found: ", mlResponse.data.prediction)

            return NextResponse.json(
                {
                    prediction: mlResponse.data.prediction,
                    message: 'Prediction fetched successfully'
                },
                {
                    status: 200,
                    statusText: 'Prediction fetched successfully'
                }
            )
        }

        console.log("Error fetching response from ml: ", mlResponse.data.prediction)

        return NextResponse.json(
            {
                error: 'An error occurred while fetching response from ml: ' + mlResponse.data.error,
                message: 'An error occurred while fetching response from ml: ' + mlResponse.data.error
            }, 
            {
                status: 500,
                statusText: 'An error occurred while fetching response from ml: ' + mlResponse.data.error
            }
        )
       

        
        
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