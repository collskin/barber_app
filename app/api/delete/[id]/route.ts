import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest,{params}:{params:{id:string}}) {
  await dbConnect();

  try {
    const { id } = params;
    await BarberModel.findOneAndDelete({_id:id})
    return NextResponse.json(
      { message: "Termin uspesno odbijen" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Doslo je do greske" },
      { status: 500 }
    );
  }
}
