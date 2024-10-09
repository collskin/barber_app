import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const _id = url.searchParams.get("id")
    await BarberModel.findOneAndUpdate(
      { _id },
      { confirmed: true }
    );
    return NextResponse.json(
      { message: "Termin uspesno prihvacen" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Doslo je do greske" },
      { status: 500 }
    );
  }
}
