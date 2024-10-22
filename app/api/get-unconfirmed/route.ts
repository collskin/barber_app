import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import ServiceModel from "@/app/models/Service";
import {  NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  try {
    let obj:any = {confirmed:false}
   let resp:any =  await BarberModel.find(obj)

   const getServices = async(_id:string) =>{
    const sResp = await ServiceModel.find({_id})
    return sResp
   }
   
   resp = await Promise.all(
    resp.map(async (r: any) => {
      const services = await Promise.all(
        r.services.map(async (s: string) => {
          const respS = await getServices(s);
          return respS;
        })
      );
      return { ...r._doc, services:services.flat() }; // Return the object with resolved services
    })
  );
  //  resp = resp.map(r=>({...r, services:r.services.map(async (s:string)=>{
  //   const respS = await getServices(s)
  //   return respS
  //  })}))

    return  NextResponse.json(resp)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Doslo je do greške" },
      { status: 500 }
    );
  }
}
