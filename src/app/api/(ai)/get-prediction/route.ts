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
    Analyze critically and return a response with an array of diseases 
    that the patient may have, as well as an array of relevant rel departments. 
    Response should be in the following format: 
    {
      "diseases": ["disease1", "disease2", ...], 
      "departments": ["department1", "department2", ...]
    }. DO NOT return any any other information or symbol. If no disease or department is founded return them as empty array []`;

    const result = await model.generateContent(prompt);
    console.log(result);
    const response = result.response;
    console.log("Response response: ", response);
    const text =  response.text();
    console.log("Response text: ", text);

    let parsedResult;
    try {
      parsedResult = JSON.parse(text);
    } catch (e) {
      console.log("Error parsing JSON: ", e);
      parsedResult = { diseases: [], departments: [] };
    }

    if (parsedResult && parsedResult.diseases && parsedResult.departments) {
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
        result: { diseases: [], departments: [] },
        message: "No relevant information found"
      },
      {
        status: 500,
        statusText: "No relevant information found"
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

