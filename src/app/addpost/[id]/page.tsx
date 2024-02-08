//*Function
import UpdatePost from "@/components/UpdatePosts";

//* Componente
import { getAuthors } from "@/helpers/getAuthors";

export const dynamic = "force-dynamic";

async function UpdatePostPage({ params }: { params: { id: string } }) {
  const authors = await getAuthors();

  return (
    <div>
      <UpdatePost authors={authors} params={params} />
    </div>
  );
}

export default UpdatePostPage;
