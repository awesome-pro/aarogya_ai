import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
    const { symptoms } = await request.json();
    console.log(symptoms);

    if (!symptoms || !symptoms.length) {
        return NextResponse.json(
            {
                error: "Please provide symptoms",
                message: "Please provide symptoms"
            },
            {
                status: 400,
                statusText: "Please provide symptoms"
            }
        );
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-pro"
        });

        const prompt = `A patient presents with the following symptoms: ${symptoms.join(", ")}. 
        Analyze critically and return a response having ONLY diseases that patient may have, the related medical department,  
        as an array of objects like [{disease: "Disease Name", department: "Department Name"}, {}, {}].
        If no disease is found, return an empty array. DO NOT return any other information.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response;
        //const reaponse = responseText.candidates[0].content
        console.log("Response text: ", responseText);

        let parsedResult;
        try {
            // Parse the response text to extract the array of objects
            parsedResult = JSON.parse(responseText.text.toString())  ;
        } catch (e) {
            console.log("Error parsing JSON: ", e);
            parsedResult = [];
        }

        if (parsedResult && Array.isArray(parsedResult)) {
            return NextResponse.json(
                {
                    result: parsedResult,
                    message: "Success"
                },
                {
                    status: 200,
                    statusText: "Success"
                }
            );
        }

        return NextResponse.json(
            {
                result: [],
                message: "No disease found"
            },
            {
                status: 200,
                statusText: "No disease found"
            }
        );

    } catch (error) {
        console.log("Error while generating response: ", error);

        return NextResponse.json(
            {
                error: "Error while generating response: " + error,
                message: "Error while generating response"
            },
            {
                status: 500,
                statusText: "Error while generating response"
            }
        );
    }
}
