import { SectionTable } from "@/components/SectionTable";

async function getPosts() {
  try {
    //const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const response = await fetch("http://localhost:3000/api/posts", {
      cache: "no-store",
    });
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error loading products: ", error);
  }
}

async function HomePage() {
  const posts = await getPosts();
  return (
    <main>
      <SectionTable posts={posts} />
    </main>
  );
}

export default HomePage;
