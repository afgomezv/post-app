import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const post = await prisma.post.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: Params) {
  const data = await request.json();

  if (data.userId) {
    data.userId = parseInt(data.userId);
  }

  const postsUpdated = await prisma.post.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title: data.title,
      body: data.body,
      userId: data.userId,
    },
  });
  return NextResponse.json(postsUpdated);
}

export async function DELETE(request: Request, { params }: Params) {
  const postdeleted = await prisma.post.delete({
    where: {
      id: Number(params.id),
    },
  });
  console.log(postdeleted);

  return NextResponse.json(postdeleted);
}
