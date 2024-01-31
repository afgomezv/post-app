import { SectionTable } from "@/components/SectionTable";

export async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //const response = await fetch("http://localhost:3000/api/posts");
  const posts = await response.json();
  return posts;
}

async function HomePage() {
  const posts = await getPosts();
  return (
    <main className="bg-[#f8f9f9] dark:bg-[#212F3C]">
      <SectionTable posts={posts} />
    </main>
  );
}

export default HomePage;
