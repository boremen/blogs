import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  return (await getSlugs()).map((slug) => ({ slug }));
}

async function loadPost(slug: string) {
  try {
    return await getPost(slug);
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await loadPost(slug);
  return { title: meta.title, description: meta.description };
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const { Content } = await loadPost(slug);

  return (
    <article className="prose mx-auto w-full max-w-2xl px-6 py-16 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_li]:list-disc [&_ul]:ml-6 [&_p]:my-4">
      <Content />
    </article>
  );
}
