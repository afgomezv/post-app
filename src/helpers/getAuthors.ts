import { prisma } from "@/config/prisma";

export async function getAuthors() {
  return await prisma.user.findMany();
}
