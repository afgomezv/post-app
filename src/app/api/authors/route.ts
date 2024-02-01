import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export async function GET() {
  const authors = await prisma.user.findMany();
  return NextResponse.json(authors);
}
