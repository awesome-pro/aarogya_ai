import CarouselCardModel from "@/models/utils/CarouselCard";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    console.log('request body', request.body);

    const { searchParams } = new URL(request.url, "http://localhost:3000");
    const { title, description, image, footer, category } = Object.fromEntries(searchParams);

    console.log('title', title);
    console.log('description', description);
    console.log('image', image);
    console.log('footer', footer);
    console.log('category', category);
    
    if(!title && !description && !image && !footer && !category) {
        return NextResponse.json(
            {
                status: 400,
                message: 'title, description, image, footer, category are required'
            },
            {
                status: 400
            }
        );
    }

    await dbConnect();

    try {
        const searchConditions = [];

        if (title) {
            searchConditions.push({ title: { $regex: title, $options: 'i' } });
        }
        if (description) {
            searchConditions.push({ description: { $regex: description, $options: 'i' } });
        }
        if (image) {
            searchConditions.push({ image: { $regex: image, $options: 'i' } });
        }
        if (footer) {
            searchConditions.push({ footer: { $regex: footer, $options: 'i' } });
        }
        if (category) {
            searchConditions.push({ categories: { $in: [new RegExp(category, 'i')] } });
        }

        const cards = await CarouselCardModel.find(
            searchConditions.length > 0 ? { $or: searchConditions } : {}
        );

        if (cards.length === 0 || !cards) {
            return NextResponse.json(
                {
                    status: 404,
                    message: 'No cards found'
                },
                {
                    status: 404
                }
            );
        }

        console.log('cards: ', cards);

        return NextResponse.json(
            {
                status: 200,
                message: 'cards found',
                data: cards
            },
            {
                status: 200
            }
        );
        
    } catch (error) {
        console.log("error in get-card route", error);

        return NextResponse.json(
            {
                status: 500,
                message: 'error in get-card route',
                error: error
            },
            {
                status: 500
            }
        );
    }
}
