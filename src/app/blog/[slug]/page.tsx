export const dynamic = 'force-dynamic';
import { Post } from '@/lib/types'; // Make sure @/lib/types exports a 'Post' type
import { notFound } from 'next/navigation';

// This is the API_URL for server components, read from Vercel env
const API_URL = process.env.API_URL;

// Data Fetching Function
async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // We check for API_URL
    if (!API_URL) {
      throw new Error("API_URL is not defined in server environment");
    }
    const res = await fetch(`${API_URL}/posts/${slug}`, {
      cache: 'no-store', // Always fetch fresh data
    });
    if (!res.ok) {
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

// --- THIS IS THE CORRECT VERSION ---
// We define the props inline to fix the error
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
      <article>
        <h1 className="text-5xl font-extrabold text-white text-center mb-6">
          {post.title}
        </h1>
        <p className="text-center text-light/70 mb-10">
          {/* Check if post.author exists before accessing email */}
          {post.author ? `Posted by ${post.author.email} on ` : 'Posted on '}
          {postDate}
        </p>
        <div className="text-lg text-light/70 leading-relaxed space-y-6">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </article>
    </main>
  );
}