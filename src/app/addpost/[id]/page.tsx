//*Function
import NewPost from "@/components/NewPost";

//* Componente
import { getAuthors } from "@/helpers/getAuthors";

async function UpdatePostPage({ params }: { params: { id: string } }) {
  const authors = await getAuthors();

  return (
    <div>
      <NewPost authors={authors} params={params} />
    </div>
  );
}

export default UpdatePostPage;
