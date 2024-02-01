//* Funcion
import NewPost from "@/components/NewPost";
import { getAuthors } from "@/helpers/getAuthors";

async function addPostPage({ params }: { params: { id: string } }) {
  const authors = await getAuthors();

  return (
    <div>
      <NewPost authors={authors} params={params} />
    </div>
  );
}

export default addPostPage;
