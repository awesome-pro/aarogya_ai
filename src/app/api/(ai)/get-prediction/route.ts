import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST(request: NextRequest){

    const { symptoms } = await request.json();
    console.log(symptoms)

    if(!symptoms || !symptoms.length){
        return NextResponse.json(
            {
                error: "Please provide symptoms",
                message: "Please provide symptoms"
            },
            {
                status: 400,
                statusText: "Please provide symptoms"
            }
        )
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    try {

        const model = genAI.getGenerativeModel(
            {
                model: "gemini-pro"
            }
        )

        const prompt = `A patient presents with the following symptoms: ${symptoms.join(", ")}. Return a response having ONLY array of most & best possible diseases(array of strings like ["", ""]), patient may have. If no disease is found, return an empty array. DO NOT return any other information.`;

        const result = await model.generateContent(prompt)
        const response =  result.response
        console.log("Response response: ", response)
        const text = response.text();
        console.log("Response text: ", text)

        if(text && text.length != 0){
            return NextResponse.json(
                {
                    result: text.split("\n"),
                    message: "Success"
                },
                {
                    status: 200,
                    statusText: "Success"
                }
            )
        }

        return NextResponse.json(
            {
                result: [],
                message: "No disease found"
            },
            {
                status: 500,
                statusText: "No disease found"
            }
        )
        
    } catch (error) {
        console.log("Error while geneting response: ", error)

        return NextResponse.json(
            {
                error: "Error while generating response: " + error,
                message: "Error while generating response"
            },
            {
                status: 500,
                statusText: "Error while generating response"
            }
        )
    }
}