import { formatDate } from "@/app/data";
import { dbConnect, disconnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import ServiceModel from "@/app/models/Service";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");
    const barberName = url.searchParams.get("barberName");
    let obj: any = {
      confirmed: true,
      date: formatDate(date as string),
    };
    if (barberName) {
      obj.barberName = barberName;
    }

    const getServices = async (_id: string) => {
      const sResp = await ServiceModel.find({ _id });
      return sResp;
    };

    let resp = await BarberModel.find(obj);

    resp = await Promise.all(
      resp.map(async (r: any) => {
        const services = await Promise.all(
          r.services.map(async (s: string) => {
            const respS = await getServices(s);
            return respS;
          })
        );
        return { ...r._doc, services:services.flat(),servicesDetails:services.flat() }; // Return the object with resolved services
      })
    );

    return NextResponse.json(resp);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Doslo je do greske" },
      { status: 500 }
    );
  }
}
