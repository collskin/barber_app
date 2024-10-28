import { formatDate, generateTimeSlots, getTakenTimes } from "@/app/data";
import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel, { Barber, IBarberWithServicesObject } from "@/app/models/Barber";
import ServiceModel from "@/app/models/Service";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest ) {
  try {
  await dbConnect();
    
  } catch (error) {
    //@ts-ignore
    return new NextResponse('pukla baza', error)
  }
try {
  const url = new URL(request.url);
  const date = url.searchParams.get("date")
  const barberName = url.searchParams.get("barberName")

  let resp:Barber[] = await BarberModel.find({
    date: formatDate(date as string),
    confirmed:true,
    barberName
  })

  const getServices = async (_id: string) => {
    const sResp = await ServiceModel.find({ _id });
    return sResp;
  };

  resp = await Promise.all(
    resp.map(async (r: any) => {
      const services = await Promise.all(
        r.services.map(async (s: string) => {
          const respS = await getServices(s);
          return respS;
        })
      );
      return { ...r._doc, servicesDetails:services.flat() }; // Return the object with resolved services
    })
  );

  const ar = getTakenTimes(resp as IBarberWithServicesObject[] )

  return new NextResponse(JSON.stringify(ar))
} catch (error:any) {
  console.log(error)
  return new NextResponse('puklo nesto drugo', error)
  
}


}
