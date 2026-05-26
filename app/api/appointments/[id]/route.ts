import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE
export async function DELETE(
  req: Request,
  context: any
) {

  const id =
    Number(context.params.id);

  await prisma.appointment.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });

}