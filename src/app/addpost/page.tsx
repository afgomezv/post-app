//* Funcion
import { getAuthors } from "@/helpers/getAuthors";

//*Componente
import NewPost from "@/components/NewPost";

export const dynamic = "force-dynamic";

async function addPostPage({ params }: { params: { id: string } }) {
  const authors = await getAuthors();

  return (
    <div>
      <NewPost authors={authors} params={params} />
    </div>
  );
}

export default addPostPage;
