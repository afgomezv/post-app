import { NewPost } from "@/components/NewPost";

export async function getAuthors() {
  const response = await fetch("http://localhost:3000/api/authors");
  const authors = await response.json();
  return authors;
}

async function addPostPage({ params }: { params: { id: string } }) {
  const authors = await getAuthors();

  return (
    <div>
      <NewPost authors={authors} params={params} />
    </div>
  );
}

export default addPostPage;
