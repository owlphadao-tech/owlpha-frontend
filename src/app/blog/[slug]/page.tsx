// src/app/blog/[slug]/page.tsx
import { Post } from '@/lib/types';
import { notFound } from 'next/navigation';

// Data Fetching Function
async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
    const res = await fetch(`${API_URL}/posts/${slug}`, {
      cache: 'no-store', // Always fetch fresh data
    });
    if (!res.ok) {
      // If status is 404, our API couldn't find the post
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null; // Return null on error
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Format the date for display
  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="container mx-auto max-w-3xl p-8">
      {/* Post Header */}
      <article>
        <h1 className="text-5xl font-extrabold text-white text-center mb-6">
          {post.title}
        </h1>
        <p className="text-center text-light/70 mb-10">
          Posted by {post.author.email} on {postDate}
        </p>
        {/* Post Content */}
        <div className="text-lg text-light/70 leading-relaxed space-y-6">
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  );
}