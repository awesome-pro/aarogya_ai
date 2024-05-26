import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  const { symptoms } = await request.json();
  console.log(symptoms);

  if (!symptoms || !symptoms.length) {
    return NextResponse.json(
      {
        error: "Please provide symptoms",
        message: "Please provide symptoms",
      },
      {
        status: 400,
        statusText: "Please provide symptoms",
      }
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const prompt = `A patient presents with the following symptoms: ${symptoms.join(
      ", "
    )}. Analyze critically and return a response having ONLY an array of (most & best possible) diseases that the patient may have, as an array of strings like ["Heart Disease", "Migraine"]. If no disease is found, return an empty array. DO NOT return any other information.`;

    const result = await model.generateContent(prompt);
    console.log(result);
    const response = result.response;
    console.log("Response response: ", response);
    const text = await response.text();
    console.log("Response text: ", text);

    let diseases;
    try {
      diseases = JSON.parse(text);
    } catch (e) {
      console.log("Error parsing JSON: ", e);
      diseases = [];
    }

    const disease = diseases.length > 0 ? diseases : "";

    const promptForDepartments = `A patient presents with the following symptoms: ${symptoms.join(
        ", "
      )}. Analyze critically and return a response having ONLY an array of (most & best possible) department that the patient may have, as an array of strings. If no department is found, return an empty array. DO NOT return any other information.`;

    const resultDepartments = await model.generateContent(promptForDepartments);
    console.log(resultDepartments);
    const responseDepartments = resultDepartments.response;
    console.log("Response response: ", responseDepartments);
    const textDepartments = await responseDepartments.text();
    console.log("Response text: ", textDepartments);

    let departments;
    try {
      departments = JSON.parse(textDepartments);
    } catch (e) {
      console.log("Error parsing JSON: ", e);
      departments = [];
    }

    return NextResponse.json(
      {
        disease,
        departments,
        message: "Success",
      },
      {
        status: 200,
        statusText: "Success",
      }
    );
  } catch (error) {
    console.log("Error while generating response: ", error);

    return NextResponse.json(
      {
        error: "Error while generating response: " + error,
        message: "Error while generating response",
      },
      {
        status: 500,
        statusText: "Error while generating response",
      }
    );
  }
}
