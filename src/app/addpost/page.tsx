import { NewPost } from "@/components/NewPost";

export async function getAuthors() {
  const response = await fetch("http://localhost:3000/api/authors");
  const authors = await response.json();
  return authors;
}

async function addPostPage() {
  const authors = await getAuthors();
  return (
    <div>
      <NewPost authors={authors} />
    </div>
  );
}

export default addPostPage;
