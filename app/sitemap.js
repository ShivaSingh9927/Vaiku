import { client } from '@/sanity/lib/client'; // Adjust this path to your sanity client

export default async function sitemap() {
  const baseUrl = 'https://nueralogic.com';

  // 1. Fetch all blog post slugs from Sanity
  const query = `*[_type == "post"] { "slug": slug.current, _updatedAt }`;
  const posts = await client.fetch(query);

  // 2. Format them for the sitemap
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. Add your static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...staticPages, ...blogUrls];
}