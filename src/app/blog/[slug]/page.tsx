// src/app/blog/[slug]/page.tsx
import { Post } from '@/lib/types';
import { notFound } from 'next/navigation';

// --- This component's props are passed by Next.js ---
// The 'params' object contains the dynamic parts of the URL
type SinglePostPageProps = {
  params: {
    slug: string;
  };
};

// --- Data Fetching Function ---
// We fetch one post from our API using its slug
async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/posts/${slug}`, {
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


// --- The Page Component ---
export default async function SinglePostPage({ params }: SinglePostPageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  // If our API returned null, this post doesn't exist.
  // We'll show a 404 page.
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
        {/* In the future, we would parse this as Markdown/HTML */}
        {/* For now, we display the raw text content */}
        <div className="text-lg text-light/70 leading-relaxed space-y-6">
          <p>{post.content}</p>
        </div>
      </article>

    </main>
  );
}