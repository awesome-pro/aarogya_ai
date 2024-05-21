import CardModel from "@/models/utils/Card";
import dbConnect from "@/lib/dbConnect";



export async function POST(req: Request){

    await dbConnect();

    const { title, description, image, footer, category } = await req.json();

    console.log("Request body: ", req.body)
    
    if(!title){
        return {
            status: 400,
            json: {
                success: false,
                message: "Please fill all the fields"
            }
        }
    }

    const existingCard = await CardModel.findOne(
        {
            title: title
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
        const card = await CardModel.create({
            title: title,
            description: description ? description : [],
            image: image ? image : "",
            footer: footer ? footer : "",
            category: category ? category : []
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