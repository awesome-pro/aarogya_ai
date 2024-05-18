import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";


export async function GET( req : Request ){
    
    
    try {
        // Access your API key as an environment variable (see "Set up your API key" above)
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
    
        if(!genAI){
            console.log("genAi not found")
            return Response.json(
                {
                "meassage": "genAI not found"
                },
                {
                    status: 500
                }
            )
        }
    
        // ...
    
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
        const prompt = ""
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    
        if(!text){
            console.log("text not found")
            return Response.json(
                {
                "meassage": "text not found"
                },
                {
                    status: 500
                }
            )
        }
    
        return Response.json(
            {
                "message": `text found successfully ${text}`
            },
            {
                status: 200
            }
        )
    } catch (error) {

        console.log("errror: ", error)
        
    }

    // ...
}