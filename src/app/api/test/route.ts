import { NextRequest, NextResponse } from "next/server";

export async function test(request: NextRequest){

    const { searchParams } = new URL(request.url)

    console.log(searchParams.get('doctorId'))

    const jsonRequest = await request.json()

    console.log(jsonRequest)

    return NextResponse.json(
        {
            message: 'Data received successfully',
            data: jsonRequest,
            doctorId: searchParams.get('doctorId')
        },
        {
            status: 200,
            statusText: 'OK'
        }
    )
}