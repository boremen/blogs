import fs from "node:fs/promises";
import path from "node:path";

export type PostMeta = {
  title: string;
  date: string;
  description?: string;
};

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export async function getSlugs(): Promise<string[]> {
  "use cache";
  const files = await fs.readdir(POSTS_DIR);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.slice(0, -4));
}

export async function getPost(slug: string) {
  const { default: Content, metadata } = await import(
    `../../content/posts/${slug}.mdx`
  );
  return { Content, meta: metadata as PostMeta };
}

export async function getAllPosts() {
  "use cache";
  const slugs = await getSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => ({ slug, meta: (await getPost(slug)).meta })),
  );
  return posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}
