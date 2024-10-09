import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel, { Barber } from "@/app/models/Barber";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  const requestBody: Omit<Barber,'confirmed'> = await request.json();
  const url = new URL(request.url);
  const c = url.searchParams.get("confirmed")
  //VALIDACIJA

  try {
    const resp = await BarberModel.create(
      {...requestBody,
      confirmed:c == 'true'
      }
    )
  
    return NextResponse.json(
      {message:{id:resp._id}},
      {status:200}
    )
  
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {message:'Doslo je do greske'},
      {status:500}
    )
  }

}
