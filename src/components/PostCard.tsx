// src/components/PostCard.tsx
import Link from 'next/link';
import { Post } from '@/lib/types';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  // Format the date for display
  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block p-6 bg-owlpha-dark rounded-xl border border-gray-700 hover:border-owlpha-primary hover:-translate-y-1 transition-transform transition-colors duration-200 shadow-md group"
    >
      <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-owlpha-primary transition-colors">{post.title}</h2>
      
      {/* --- THIS IS THE FIX --- */}
      <p className="text-sm text-owlpha-accent">
        {/* We have to comment out the author line, since the API isn't sending it right now */}
        {/* By {post.author.email} on {postDate} */}
        
        {/* We can just show the date for now */}
        Posted on {postDate}
      </p>
      
      {/* We could add a short snippet of 'content' here later */}
    </Link>
  );
}