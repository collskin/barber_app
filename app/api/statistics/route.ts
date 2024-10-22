import { dbConnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import ServiceModel from "@/app/models/Service";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
  } catch (error) {
    //@ts-ignore
    return new NextResponse("pukla baza", error);
  }
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const done = await BarberModel.find({
      confirmed: true,
      date: {
        $gte: startOfMonth,
        $lt: now,
      },
    });

    const servicesList = done.map((r) => r.services);
    const pricePromises = servicesList.flatMap((s) =>
      s.map((ss: string) => ServiceModel.findById(ss))
    );
    const responses = await Promise.all(pricePromises);
    const revenue = responses.reduce(
      (total, rsp) => (rsp ? total + rsp.price : 0),
      0
    );
    const services = done
      .map((r) => r.services.length)
      .reduce((total, arr) => total + arr, 0);

    return NextResponse.json({ done: done.length, services, revenue });
  } catch (error: any) {
    return new NextResponse("puklo nesto drugo", error);
  }
}
