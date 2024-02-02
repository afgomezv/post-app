import { prisma } from "@/config/prisma";

export async function getPosts() {
  return await prisma.post.findMany();
}
