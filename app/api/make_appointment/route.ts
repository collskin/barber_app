import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel, { Barber } from "@/app/models/Barber";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  const requestBody: Omit<Barber,'confirmed'> = await request.json();

  //VALIDACIJA

  try {
    await BarberModel.create(
      {...requestBody,
      confirmed:false
      }
    )
  
  
    return NextResponse.json(
      {message:'Zahtev je uspesno poslat'},
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
