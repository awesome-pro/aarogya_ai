import mongoose from "mongoose";


export interface CarouselCard {
    title: string;
    description?: string[];
    image?: string;
    footer?: string;
    categories? : string[];
}

export const CarouselCardSchema = new mongoose.Schema<CarouselCard>({
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

const CarouselCardModel = mongoose.models && mongoose.models.Card || mongoose.model<CarouselCard>('Card', CarouselCardSchema);
export default CarouselCardModel;