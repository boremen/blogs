import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold">Blog</h1>
      <ul className="flex flex-col gap-6">
        {posts.map(({ slug, meta }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`} className="text-xl font-medium">
              {meta.title}
            </Link>
            <p className="text-sm text-zinc-500">{meta.date}</p>
            {meta.description && <p className="mt-1">{meta.description}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
