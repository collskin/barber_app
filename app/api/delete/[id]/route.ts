import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { rejectHTML } from "./html";

export async function DELETE(request: NextRequest,{params}:{params:{id:string}}) {
  await dbConnect();

  try {
    const { id } = params;
    const resp  = await BarberModel.findOneAndDelete({_id:id})

    const transporter = nodemailer.createTransport({
      host: 'cp8.ulimitserver.com', 
      port: 465, 
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'potvrda@sasabarber.com',
        pass: 'SasaAdmin',
      },
    });

    const mailOptions = {
      from: 'potvrda@sasabarber.com',
      to:resp.clientEmail,
      subject:'Termin odbijen',
      html:rejectHTML(),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Termin uspesno obrisan" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Doslo je do greske" },
      { status: 500 }
    );
  }
}
