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

    // GOOGLE KALENDER LINK
    const formattedDate =
      body.date.replaceAll(
        "-",
        ""
      );

    const startDate =
      `${formattedDate}T${body.time
        .replace(":", "")}00`;

    const endHour =
      Number(
        body.time.split(":")[0]
      ) + 1;

    const endDate =
      `${formattedDate}T${String(
        endHour
      ).padStart(2, "0")}${body.time
        .split(":")[1]}00`;

    const calendarLink =

      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Barber+Termin&dates=${startDate}/${endDate}&details=Premium+Barber+Shop+-+${body.service}+bei+${body.employee}`;

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

          <a
            href="${calendarLink}"
            style="
              background:black;
              color:white;
              padding:12px 20px;
              border-radius:12px;
              text-decoration:none;
              display:inline-block;
              margin-top:20px;
            "
          >
            Zum Kalender hinzufügen
          </a>

          <p style="margin-top:20px;">
            Stornierungen sind nur telefonisch möglich.
          </p>

        </div>

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