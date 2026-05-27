import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const params =
      await context.params;

    const id =
      Number(params.id);

    await prisma.appointment.delete({

      where: {
        id,
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