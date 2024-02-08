import { prisma } from "@/config/prisma";

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });

  const newPosts = posts.map((post: any) => ({
    ...post,
    author: post.author.name,
  }));

  return newPosts;
}
