import { dbConnect } from "@/app/lib/db";
import ServiceModel from "@/app/models/Service";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();

  try {
    const resp = await ServiceModel.find();
    return NextResponse.json(resp);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Doslo je do greške" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const requestBody: { name: string; price: number, slots:number } = await request.json();

  try {
    const resp = await ServiceModel.create(requestBody);
    return NextResponse.json(resp, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Doslo je do greške" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();
  const requestBody: { slots:number; name: string; price: number; _id: number } =
    await request.json();
  try {
    const resp = await ServiceModel.findOneAndUpdate(
      { _id: requestBody._id },
      { name: requestBody.name, price: requestBody.price, slots:requestBody.slots },
      {new:true}
    );
    return NextResponse.json(resp, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Doslo je do greške" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const url = new URL(request.url);
  const _id = url.searchParams.get("id")

  try {
    await ServiceModel.deleteOne({_id})
    return NextResponse.json( { status: 200, message:'Usluga uspešno obrisana.' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Doslo je do greške" },
      { status: 500 }
    );
  }
}
