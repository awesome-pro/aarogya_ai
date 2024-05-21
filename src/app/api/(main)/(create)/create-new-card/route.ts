import dbConnect from "@/lib/dbConnect";
import CarouselCardModel from "@/models/utils/CarouselCard";



export async function POST(req: Request){

    await dbConnect();

    const { title, description, image, footer, categories } = await req.json();

    console.log("Request body: ", req.body)
    
    if(!title || !categories){
        return {
            status: 400,
            json: {
                success: false,
                message: "Please fill in the required fields"
            }
        }
    }

    const existingCard = await CarouselCardModel.findOne(
        {
            title: title,
        }
    )

    if(existingCard){
        return {
            status: 400,
            json: {
                success: false,
                message: "Card with this title already exists"
            }
        }
    }

    try {
        const card = await CarouselCardModel.create({
            title: title,
            description: description ? description : [],
            image: image ? image : "",
            footer: footer ? footer : "",
            categories: categories ? categories : []
        });

        if(!card){
            return Response.json(
                {
                    success: false,
                    message: "Card not created"
                },
                {
                    status: 500
                }
            )
        }

        console.log("Card created successfully: ", card)

        return Response.json(
            {
                success: true,
                message: "Card created successfully",
                data: card
            },
            {
                status: 201
            }
        )
    } catch (error: any) {
        return {
            status: 500,
            json: {
                success: false,
                message: "Internal server error: " + error.toString()
            }
        }
    }
}