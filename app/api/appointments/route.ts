import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

import { createEvent } from "ics";

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

    // DATUM SPLITTEN
    const [year, month, day] =
      body.date
        .split("-")
        .map(Number);

    const [hour, minute] =
      body.time
        .split(":")
        .map(Number);

    // ICS EVENT ERSTELLEN
    const event =
      createEvent({

        title:
          "Barber Termin",

        description:
          `${body.service} bei ${body.employee}`,

        start: [
          year,
          month,
          day,
          hour,
          minute,
        ],

        duration: {
          hours: 1,
        },

        status:
          "CONFIRMED",

        organizer: {

          name:
            "Premium Barber Shop",

          email:
            "booking@barber.at",

        },

      });

    if (event.error) {

      console.log(
        event.error
      );

    }

    // EMAIL SENDEN
    await resend.emails.send({

      from:
        "onboarding@resend.dev",

      to:
        body.customerEmail,

      subject:
        "Terminbestätigung",

      html: `

        <div style="font-family: Arial; padding: 20px;">

          <h1>
            Termin bestätigt ✅
          </h1>

          <p>
            Hallo ${body.customerName},
          </p>

          <p>
            dein Termin wurde erfolgreich gebucht.
          </p>

          <hr />

          <p>
            <strong>Datum:</strong>
            ${body.date}
          </p>

          <p>
            <strong>Uhrzeit:</strong>
            ${body.time}
          </p>

          <p>
            <strong>Mitarbeiter:</strong>
            ${body.employee}
          </p>

          <p>
            <strong>Service:</strong>
            ${body.service}
          </p>

          <hr />

          <p>
            Öffne den Anhang,
            um den Termin direkt
            in deinen Kalender
            einzutragen 📅
          </p>

        </div>

      `,

      attachments: [

        {

          filename:
            "barber-termin.ics",

          content:
            Buffer.from(
              event.value || ""
            ).toString("base64"),

        },

      ],

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