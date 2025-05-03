'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

// Sample blog post data
const initialPosts = [
  {
    id: 1,
    title: 'Branding and Strategy',
    excerpt:
      'Our Branding and Strategy services are designed to help you build a strong, cohesive brand identity and create effective strategies to connect with your target audience.',
    image: '/services/branding.png?height=400&width=400',
    slug: '/services/service1',
  },
  {
    id: 2,
    title: 'Analytics and Reporting',
    excerpt:
      'Our Analytics and Reporting services help you make data-driven decisions by providing in-depth insights into your website performance, user behavior, and overall business metrics.',
    image: '/services/analytics.png?height=400&width=400',
    slug: '/services/service1',
  },
  {
    id: 3,
    title: 'Email Marketing',
    excerpt:
      'Our Email Marketing services are crafted to help you nurture relationships with your audience, promote your products or services, and drive conversions.',
    image: '/services/emaill.png?height=400&width=400',
    slug: '/services/service1',
  },
  {
    id: 4,
    title: 'Content Marketing',
    excerpt:
      'Start by conducting thorough user research to understand what your audience values and how they',
    image: '/services/conten.png?height=400&width=400',
    slug: '/services/service1',
  },
  {
    id: 5,
    title: 'Social Media Marketing',
    excerpt:
      'With the proliferation of smartphones, tablets, and other mobile devices, responsive design ensures',
    image: '/services/social.png?height=400&width=400',
    slug: '/services/service1',
  },
  {
    id: 6,
    title: 'Search Engine Optimization (SEO)',
    excerpt:
      'Understanding how colors interact and influence user perception can dramatically improve engagement',
    image: '/services/seo.png?height=400&width=400',
    slug: '/services/service1',
  },
];

// Additional posts to load when clicking "Load More"
const additionalPosts = [
  {
    id: 7,
    title: 'Search Engine Optimization (SEO)',
    excerpt:
      'Understanding how colors interact and influence user perception can dramatically improve engagement',
    image: '/services/seo.png?height=400&width=400',
    slug: '/services/service1',
  },
  {
    id: 8,
    title: 'Accessibility in Digital Products: A Complete Guide',
    excerpt:
      'Creating inclusive designs that work for everyone is not just ethical but also expands your market reach',
    image: '/services/branding.png?height=400&width=400',
    slug: '/services/service1',
  },
  {
    id: 9,
    title: 'The Psychology Behind Effective UI Design',
    excerpt:
      'Understanding cognitive patterns and user behavior helps create interfaces that feel intuitive and natural',
    image: '/services/branding.png?height=400&width=400',
    slug: '/services/service1',
  },
];

export default function ServiceList() {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const handleLoadMore = () => {
    setLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      setPosts([...posts, ...additionalPosts]);
      setLoading(false);
      setAllLoaded(true); // In a real app, you'd check if there are more posts to load
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Link href={post.slug} className="block">
              <div
                className="relative overflow-hidden group"
                ref={(el) => {
                  if (el) imageRefs.current.set(post.id, el);
                }}
              >
                <div className="w-full h-64 bg-gray-200 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </Link>

            <div className="p-5">
              <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {!allLoaded && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-8 py-3 rounded-full bg-gray-900 text-white font-medium transition-all duration-300
                     hover:bg-[#F69429] hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50
                     disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                LOADING...
              </span>
            ) : (
              'XEM THÊM'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
