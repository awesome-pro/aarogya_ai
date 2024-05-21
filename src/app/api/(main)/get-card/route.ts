import CardModel from "@/models/utils/Card";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";    



export async function GET(request: Request) {

    console.log('requset body', request.body)

    const { searchParams } = new URL(request.url, "http://localhost:3000");
    const { title, description, image, footer, category } = Object.fromEntries(searchParams);

    console.log('title', title)
    console.log('description', description)
    console.log('image', image)
    console.log('footer', footer)
    console.log('category', category)
    
    if(!title && !description && !image && !footer && !category) {
        return NextResponse.json(
            {
                status: 400,
                message: 'title, description, image, footer, category are required'
            },
            {
                status: 400
            }
        )
    }
        

    await dbConnect();


    try {

        const cards = await CardModel.find(
            {
                $or: [
                    { title: { $regex: title, $options: 'i' } },
                    { description: { $regex: description, $options: 'i' } },
                    { image: { $regex: image, $options: 'i' } },
                    { footer: { $regex: footer, $options: 'i' } },
                    { categories: { $regex: category, $options: 'i' } }
                ]
            }
        )

        if(cards.length === 0 || !cards) {
            return NextResponse.json(
                {
                    status: 404,
                    message: 'No cards found'
                },
                {
                    status: 404
                }
            )
        }

        console.log('cards: ', cards)

        return NextResponse.json(
            {
                status: 200,
                message: 'cards found',
                data: cards
            },
            {
                status: 200
            }
        )
        
    } catch (error) {
        console.log("error in get-card route", error)

        return NextResponse.json(
            {
                status: 500,
                message: 'error in get-card route',
                error: error
            },
            {
                status: 500
            }
        )
    }
}