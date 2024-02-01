import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import { log } from "util";

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (data.userId) {
    data.userId = parseInt(data.userId);
  }

  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      body: data.body,
      userId: data.userId,
    },
  });

  return NextResponse.json(newPost);
}
