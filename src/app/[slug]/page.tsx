import ShowGameLayout from "@/modules/show/ShowGameLayout";

type ShowGameProps = {
  params: {
    slug: string;
  };
};

export default async function ShowGame({ params }: ShowGameProps) {
  return <ShowGameLayout slug={params.slug} />;
}
