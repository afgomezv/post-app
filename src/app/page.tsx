//* Funcion
import { getPosts } from "@/helpers/getPosts";

//* Componente
import SectionTable from "@/components/SectionTable";

async function HomePage() {
  const posts = await getPosts();
  return (
    <main>
      <SectionTable posts={posts} />
    </main>
  );
}

export default HomePage;
