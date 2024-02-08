//* Funcion
import { getPosts } from "@/helpers/getPosts";

//* Componente
import SectionTable from "@/components/SectionTable";

export const dynamic = "force-dynamic";

async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="bg-[#f8f9f9]">
      <SectionTable posts={posts} />
    </main>
  );
}

export default HomePage;
