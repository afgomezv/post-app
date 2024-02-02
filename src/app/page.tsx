//* Funcion
import { getPosts } from "@/helpers/getPosts";

//* Componente
import SectionTable from "@/components/SectionTable";

export const dynamic = "force-dynamic";

async function HomePage() {
  const posts = await getPosts();
  return (
    <main>
      <SectionTable posts={posts} />
    </main>
  );
}

export default HomePage;
