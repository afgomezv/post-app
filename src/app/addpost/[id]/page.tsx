import { NewPost } from "@/components/NewPost";
import { url } from "@/helpers/url";

async function getAuthors() {
  const response = await fetch(`${url}/api/authors`);
  const authors = await response.json();
  return authors;
}

async function UpdatePostPage({ params }: { params: { id: string } }) {
  const authors = await getAuthors();

  return (
    <div>
      <NewPost authors={authors} params={params} />
    </div>
  );
}

export default UpdatePostPage;
