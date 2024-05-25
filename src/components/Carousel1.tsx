"use client"

import  React, { useCallback, useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CarouselCard } from "@/models/utils/CarouselCard"
import axios from "axios"
import Image from "next/image"
import { FormSuccess } from "./FormSuccess"


export default function CustomCarousel({ category }: { category: string }) {

  const [carouselCardItem, setCarouselCardItem] = useState<CarouselCard[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const fetchCarouselItems = useCallback(async () => {

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await axios.get(`/api/get-cards?category=${category}`)

      if( !response.data || response.data.length === 0 ) {
        setError('No cards found')
        return
      }

      setCarouselCardItem(response.data.data)
      setSuccess(response.data.message)
      setSuccess('Cards found')
      
    } catch (error: any) {
      console.log('error', error)
      setError(error.message)
      
    } finally{
      setLoading(false)
    }

  }, [setCarouselCardItem, setLoading, setError, setSuccess])

  useEffect(() => {

    fetchCarouselItems()
  
  }, [fetchCarouselItems])

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >

      {
        loading && <p>Loading...</p>
      }

      {
        error && <p className="text-red-600 bg-red-200 p-5 w-full">{error}</p>
      }

      {
        success && <FormSuccess message={success} />
      }
      <CarouselContent className="">
        { carouselCardItem &&
          carouselCardItem.map((card, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                    <span className="text-xl font-semibold">{card.title}</span>
                    <Image
                      src={card?.image || '/images/department-placeholder.png'}
                      alt={card.title}
                      width={200}
                      height={200}
                    />
                    <h4 className="text-md my-4 text-gray-800">
                      {card.description}
                    </h4>
                    <p className="text-gray-500">
                      {card.footer}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
