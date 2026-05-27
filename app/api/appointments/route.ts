import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
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
export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    // TERMIN SPEICHERN
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

    // EMAIL SENDEN
    await resend.emails.send({

      from:
        "onboarding@resend.dev",

      to:
        "oguzhan.kurt@outlook.at",

      subject:
        "Terminbestätigung",

      html: `

        <h1>
          Termin bestätigt ✅
        </h1>

        <p>
          Hallo ${body.customerName}
        </p>

        <p>
          Datum:
          ${body.date}
        </p>

        <p>
          Uhrzeit:
          ${body.time}
        </p>

      `,

    });

    return NextResponse.json(
      appointment
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Fehler",
      },
      {
        status: 500,
      }
    );

  }

}