import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const date = url.searchParams.get("date") 
   const resp =  await BarberModel.find({date:new Date(String(date)).toLocaleDateString()})
    return  NextResponse.json(resp)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Doslo je do greske" },
      { status: 500 }
    );
  }
}
