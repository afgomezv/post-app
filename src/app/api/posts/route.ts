import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import { log } from "util";

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  if (data.authorId) {
    data.authorId = parseInt(data.authorId);
  }

  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      body: data.body,
      authorId: data.authorId,
    },
  });

  return NextResponse.json(newPost);
}
