//* Funcion
import { getAuthors } from "@/helpers/getAuthors";

//*Componente
import NewPost from "@/components/NewPost";

export const dynamic = "force-dynamic";

async function addPostPage() {
  const authors = await getAuthors();

  return (
    <div>
      <NewPost authors={authors} />
    </div>
  );
}

export default addPostPage;
