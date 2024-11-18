import { dbConnect } from "@/app/lib/db";
import BarberModel, { Barber } from "@/app/models/Barber";
import {  NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { ownerHtml } from "../confirm/html";


export async function POST(request: any,res:any) {
  await dbConnect();

  const requestBody: Omit<Barber,'confirmed'> = await request.json();
  const url = new URL(request.url);
  const c = url.searchParams.get("confirmed")
  
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

    const mailOptions = {
      from: 'potvrda@sasabarber.com',
      to:'sasafrizer78@gmail.com',
      subject:'Novi zahtev',
      html:ownerHtml({time:requestBody.time[0], date:requestBody.date, barberName:requestBody.barberName, clientEmail:requestBody.clientEmail, clientPhone:requestBody.clientPhone, clientName:requestBody.clientName}),
    };

    requestBody.clientEmail = requestBody.clientEmail || '/'
    requestBody.clientPhone = requestBody.clientPhone || '/'


    if(!(c == 'true')){
      await transporter.sendMail(mailOptions);
    }
    const resp = await BarberModel.create(
      {...requestBody,
      confirmed:c == 'true',
      }
    )
  
    return NextResponse.json(
      {message:{id:resp._id}},
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
