import { months } from "@/app/data";
import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import nodemailer from 'nodemailer';
import { clientHtml } from "./html";
import ServiceModel from "@/app/models/Service";


export async function PATCH(request: NextRequest) {
  await dbConnect();

  try {

    const transporter = nodemailer.createTransport({
      host: 'cp8.ulimitserver.com', 
      port: 465, 
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'potvrda@sasabarber.com',
        pass: 'SasaAdmin',
      },
    });

    const url = new URL(request.url);
    const _id = url.searchParams.get("id")
    const client = await BarberModel.findOneAndUpdate(
      { _id },
      { confirmed: true },
      {new:true}
    );

    const services = await Promise.all(
      client.services.map(async (s:string) => {
        const [service] = await ServiceModel.find({ _id: s });
        return service.toObject(); // Convert Mongoose document to plain JS object
      })
    );

    const mailOptions = {
      from: 'potvrda@sasabarber.com',
      to:client.clientEmail,
      subject:'Potvrda vaseg termina',
      html:clientHtml({time:client.time[0], date:client.date,barberName:client.barberName, services}),
      // text:`Poštovanje ${client.clientName}, \n\n Vaš termin za ${new Date(client.date).getDate()}. ${months[new Date(client.date).getMonth()]} u ${client.time} je potvrđen. \n\n Frizerski Salon Saša `,
    };

    await transporter.sendMail(mailOptions);

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
