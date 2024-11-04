export default function AuthorPage({ params }:any) {
  const { authorId } = params;
  return <h1>Prikaz stranice za autora s ID-em: {authorId}</h1>;
}
