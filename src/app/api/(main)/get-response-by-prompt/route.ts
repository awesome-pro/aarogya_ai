import { StreamingTextResponse, GoogleGenerativeAIStream, Message } from "ai";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";


// IMPORTANT! Set the runtime to edge
export const runtime = "edge";


export async function GET(req: NextRequest) {
    try {
        
        if (req.method !== 'GET') {
            return NextResponse.json(
              { error: "Invalid request method" },
              { status: 405 } // Method Not Allowed
            );
        }


        const { searchParams } = new URL(req.url);
        const prompt = searchParams.get('prompt');
        console.log("Prompt: " + prompt);

        if (!prompt) {
            return NextResponse.json(
              { error: "Prompt is required" },
              { status: 400 } // Bad Request
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
        console.log("GEN AI: " + genAI);

        const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        });

        const content = await model.generateContent(prompt);
        const responseText = await content.response.text();

        console.log("CONTENT: " + content);
        console.log("RESPONSE TEXT: " + responseText);

        return NextResponse.json(
            {
              content: content,
              responseText: responseText
            },
            { status: 200 }
        );


    } catch (error) {

        console.log("ERROR: " + error);
        return NextResponse.json(
        {
            error: "Error generating content",
            message: error
        },
        { status: 500 } // Internal Server Error
        );
    }
}
 


