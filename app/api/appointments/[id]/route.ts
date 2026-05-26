import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: {
    params: {
      id: string;
    };
  }
) {

  try {

    await prisma.appointment.delete({

      where: {
        id: Number(params.id),
      },

    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Fehler beim Löschen",
      },
      {
        status: 500,
      }
    );

  }

}