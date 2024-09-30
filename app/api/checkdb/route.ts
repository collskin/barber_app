import { dbConnect, disconnect } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  console.log("hit db connect", new Date().getSeconds());
  return new NextResponse("RADI BRT");
}
