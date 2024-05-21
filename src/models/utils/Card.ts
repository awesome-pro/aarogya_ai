import mongoose from "mongoose";


export interface Card {
    title: string;
    description?: string[];
    image?: string;
    footer?: string;
    categories? : string[];
}

export const CardSchema = new mongoose.Schema<Card>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: false
    },
    image: {
        type: String,
        required: false
    },
    footer: {
        type: String,
        required: false
    },
    categories: {
        type: [String],
        required: false
    }
})

const CardModel = mongoose.models && mongoose.models.Card || mongoose.model<Card>('Card', CardSchema);
export default CardModel;