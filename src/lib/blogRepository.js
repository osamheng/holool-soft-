import starterPosts from "../data/blogData";
import { supabase } from "./supabaseClient";

function formatReadingTime(minutes) {
  if (minutes === 1) return "دقيقة واحدة";
  if (minutes === 2) return "دقيقتان";
  return `${minutes} دقائق`;
}

function formatPublishedDate(value) {
  return new Intl.DateTimeFormat("ar-YE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function fromDatabaseRow(row) {
  const readingMinutes = Number(row.reading_minutes);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    excerpt: row.excerpt,
    icon: row.icon,
    publishedAt: row.published_at.slice(0, 10),
    publishedLabel: formatPublishedDate(row.published_at),
    readingMinutes,
    readingTime: formatReadingTime(readingMinutes),
    author: row.author_name,
    authorId: row.author_id,
    intro: row.intro,
    sections: row.sections,
    isPublished: row.is_published,
  };
}

function toDatabaseRow(post, authorId) {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    excerpt: post.excerpt,
    icon: post.icon || "</>",
    author_name: post.author || "فريق حلول سوفت",
    author_id: authorId,
    intro: post.intro,
    sections: post.sections,
    reading_minutes: Number(post.readingMinutes),
    is_published: Boolean(post.isPublished),
  };
}

export async function getPublishedPosts() {
  if (!supabase) return starterPosts;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data.map(fromDatabaseRow);
}

export async function getPublishedPost(slug) {
  if (!supabase) {
    return starterPosts.find((post) => post.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data ? fromDatabaseRow(data) : null;
}

export async function getEditorPosts() {
  if (!supabase) throw new Error("إعداد اتصال Supabase غير مكتمل.");

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(fromDatabaseRow);
}

export async function createBlogPost(post, authorId) {
  if (!supabase) throw new Error("إعداد اتصال Supabase غير مكتمل.");

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(toDatabaseRow(post, authorId))
    .select("*")
    .single();

  if (error) throw error;
  return fromDatabaseRow(data);
}

export async function updateBlogPost(id, post, publishedAt) {
  if (!supabase) throw new Error("إعداد اتصال Supabase غير مكتمل.");

  const updates = toDatabaseRow(post, post.authorId);
  if (publishedAt) updates.published_at = publishedAt;
  const { data, error } = await supabase
    .from("blog_posts")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return fromDatabaseRow(data);
}

export async function deleteBlogPost(id) {
  if (!supabase) throw new Error("إعداد اتصال Supabase غير مكتمل.");

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

export async function importStarterPosts(authorId, existingPosts) {
  if (!supabase) throw new Error("إعداد اتصال Supabase غير مكتمل.");

  const existingSlugs = new Set(existingPosts.map((post) => post.slug));
  const missingPosts = starterPosts.filter(
    (post) => !existingSlugs.has(post.slug),
  );
  if (missingPosts.length === 0) return 0;

  const rows = missingPosts.map((post) => ({
    ...toDatabaseRow(
      {
        ...post,
        readingMinutes: Number.parseInt(post.readingTime, 10),
        isPublished: true,
      },
      authorId,
    ),
    published_at: `${post.publishedAt}T12:00:00Z`,
  }));
  const { error } = await supabase.from("blog_posts").insert(rows);

  if (error) throw error;
  return rows.length;
}
