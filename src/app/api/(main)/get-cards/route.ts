import CardModel from "@/models/utils/Card";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: Request){

    console.log("Request body: ", req)

    const { title, category, description, image, footer } = await req.json()

    if(!title && !category && !description && !image && !footer){
        return NextResponse.json(
            {
                success: false,
                message: "Please provide at least one search parameter"
            },
            {
                status: 400
            }
        )
    }

    console.log("Request body: ", req.body)

    await dbConnect();

    try {

        const cards = await CardModel.find(
            {
                $or: [
                    {
                        title: title
                    },
                    {
                        category: category
                    },
                    {
                        description: description
                    },
                    {
                        image: image
                    },
                    {
                        footer: footer
                    }
                ]
            }
        )

        if(!cards || cards.length === 0){
            return NextResponse.json(
                {
                    success: false,
                    message: "No cards found"
                },
                {
                    status: 404
                }
            )
        }

        console.log("Cards: ", cards)

        return NextResponse.json(
            {
                success: true,
                message: "Cards fetched successfully",
                data: cards
            },
            {
                status: 200
            }
        )
        
    } catch (error) {
        console.log("Error fetching card: ", error)

        return NextResponse.json(
            {
                success: false,
                message: "Error fetching card",
                error: error
            },
            {
                status: 500
            }
        )
    }

}