import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 500,
    temperature: 0.7,
    topP: 0.6,
    topK: 16,
  };
const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});

export async function POST(request: NextRequest) {
	const {messages} = await request.json();
	const prompt = messages[messages.length - 1].content;
	
  

  try {

    const result = await model.generateContent(prompt);
    console.log("Chat completion result:", result.response.text());
    return NextResponse.json(result.response.text() , { status: 200 });

  } catch (error) {
    console.log("Error fetching chat completion:", error);

    NextResponse.json(
        {
            role: 'assistant',
            content: "Sorry, something went wrong. Please try again.",
        },
        {
            status: 500,
        }
    )
  }
	
}