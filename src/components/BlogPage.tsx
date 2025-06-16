import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
import Layout from '../components/Layout';
import { Link } from '@chakra-ui/react/link';
import image1 from '../assets/code.avif'

// Blog post type definition
interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  slug: string;
}

// Sample blog data (replace with actual data from a CMS or API)
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Responsive Web Applications with React',
    description: 'Learn how to create responsive and accessible web applications using React and modern CSS techniques.',
    date: 'April 2, 2025',
    readTime: '5 min read',
    tags: ['React', 'Web Development', 'CSS'],
    image: image1,
    slug: 'building-responsive-web-applications-with-react'
  },
  {
    id: '2',
    title: 'Optimizing Website Performance: Best Practices',
    description: 'Explore techniques to improve website loading speed and overall performance for better user experience.',
    date: 'March 15, 2025',
    readTime: '8 min read',
    tags: ['Performance', 'Web Development', 'Optimization'],
    image: '/images/blog/performance.jpg',
    slug: 'optimizing-website-performance-best-practices'
  },
  {
    id: '3',
    title: 'Introduction to Next.js: Why Its Great for Developers',
    description: 'Discover the benefits of using Next.js for your web projects and how it simplifies development.',
    date: 'February 28, 2025',
    readTime: '6 min read',
    tags: ['Next.js', 'React', 'Web Development'],
    image: '/images/blog/nextjs-intro.jpg',
    slug: 'introduction-to-nextjs-why-its-great-for-developers'
  },
  {
    id: '4',
    title: 'Creating Accessible Web Experiences',
    description: 'Learn essential techniques for making your websites accessible to all users regardless of abilities.',
    date: 'February 10, 2025',
    readTime: '7 min read',
    tags: ['Accessibility', 'Web Development', 'UX'],
    image: '/images/blog/accessibility.jpg',
    slug: 'creating-accessible-web-experiences'
  }
];

// Filter function for tags
function filterPosts(posts: BlogPost[], activeTag: string | null): BlogPost[] {
  if (!activeTag) return posts;
  return posts.filter(post => post.tags.includes(activeTag));
}

// Get all unique tags from blog posts
function getAllTags(posts: BlogPost[]): string[] {
  const tagsSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(sampleBlogPosts);
  const allTags = getAllTags(sampleBlogPosts);

  useEffect(() => {
    // Filter posts based on search term and active tag
    let results = sampleBlogPosts;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.description.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    if (activeTag) {
      results = results.filter(post => post.tags.includes(activeTag));
    }
    
    setFilteredPosts(results);
  }, [searchTerm, activeTag]);

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  return (
    <>
      <div>
        <title>Blog | Ezekiel Mburu</title>
        <meta name="description" content="Read my latest thoughts and tutorials on web development, design, and technology." />
      </div>

      <main  id= "blogs" className="container mx-auto px-4 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1   className="text-4xl font-bold mb-8 text-center">Blog</h1>
          
          {/* Search and filter section */}
          <div className="mb-10">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeTag === tag 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {activeTag && (
                <button
                  onClick={() => setActiveTag(null)}
                  className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Blog posts */}
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {filteredPosts.map(post => (
                <Link 
                  href={`/blog/${post.slug}`} 
                  key={post.id}
                  className="group"
                >
                  <article className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-gray-700">
                    {post.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            // Fallback for missing images
                            const target = e.target as HTMLImageElement;
                            target.src = `/images/blog/placeholder.jpg`;
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                        {post.tags.slice(0, 2).map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-900 dark:text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full dark:bg-gray-800 dark:text-gray-300">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{post.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-2 dark:text-gray-400">{post.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}