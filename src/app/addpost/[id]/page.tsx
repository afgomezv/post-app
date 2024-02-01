import NewPost from "@/components/NewPost";
import { url } from "@/helpers/url";

async function getAuthors() {
  try {
    const response = await fetch(`${url}/api/authors`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const authors = await response.json();
    return authors;
  } catch (error) {
    console.error("Error carga de authors: ", error);
  }
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
