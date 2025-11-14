// src/app/blog/page.tsx
import { Post } from '@/lib/types';
import PostCard from '@/components/PostCard';

// This function will run on the server to fetch your posts
async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/posts`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    
    return await res.json();

  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return an empty array on error
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto max-w-4xl px-4 sm:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center mb-8 sm:mb-12">
        The Owlpha Blog
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-light/70">
          No published posts found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}