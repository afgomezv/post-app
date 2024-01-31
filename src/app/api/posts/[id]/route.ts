import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const task = await prisma.post.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(task);
}

export async function PUT(request: Request, { params }: Params) {
  const data = await request.json();
  const taskUpdated = await prisma.post.update({
    where: {
      id: Number(params.id),
    },
    data,
  });
  return NextResponse.json(taskUpdated);
}

export async function DELETE(request: Request, { params }: Params) {
  const task = await prisma.post.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(task);
}
