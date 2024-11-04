type AuthorPageProps = {
  params: {
    authorId: string;
  };
};

export default function AuthorPage({ params }: AuthorPageProps) {
  const { authorId } = params;
  return <h1>Prikaz stranice za autora s ID-em: {authorId}</h1>;
}
