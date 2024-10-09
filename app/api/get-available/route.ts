import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { barberId: string } }) {
  await dbConnect();

  const url = new URL(request.url);
  const date = url.searchParams.get("date") // Default to current date if not provided

  const resp = await BarberModel.find({
    date: new Date(date as string).toLocaleDateString(),
    confirmed:true
  })

  //@ts-ignore
    const ar = [...new Set(resp.map(m=>m.time))]
  return new NextResponse(JSON.stringify(ar))

}
