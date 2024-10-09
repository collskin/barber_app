import { dbConnect } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {

  const { username, password }: { username: string; password: string } =
    await request.json();

  try {
    if (username == "sasa@sasaberber.com" && password == "SasaAdmin") {
      const token = jwt.sign(username, process.env.TOKEN_SECRET as string);

      return NextResponse.json({ message: { token } }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Pogresni kredencijali" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Doslo je do greske" },
      { status: 500 }
    );
  }
}
