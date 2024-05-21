import mongoose from "mongoose";


export interface Card {
    title: string;
    description?: string[];
    image?: string;
    footer?: string;
    category? : string[];
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
    category: {
        type: [String],
        required: false
    }
})

const CardModel = mongoose.models && mongoose.models.Card || mongoose.model<Card>('Card', CardSchema);
export default CardModel;