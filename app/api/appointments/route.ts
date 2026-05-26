import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET
export async function GET() {

  const appointments =
    await prisma.appointment.findMany();

  return NextResponse.json(
    appointments
  );

}

// POST
export async function POST(req: Request) {

  const body = await req.json();

  const appointment =
    await prisma.appointment.create({

      data: {

        customerName:
          body.customerName,

        customerPhone:
          body.customerPhone,

        customerEmail:
          body.customerEmail,

        employee:
          body.employee,

        service:
          body.service,

        date:
          body.date,

        time:
          body.time,

      },

    });

  return NextResponse.json(
    appointment
  );

}