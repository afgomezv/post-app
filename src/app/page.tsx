import SectionTable from "@/components/SectionTable";
import { url } from "@/helpers/url";

async function getPosts() {
  try {
    //const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const response = await fetch(`${url}/api/posts`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error carga de posts: ", error);
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
