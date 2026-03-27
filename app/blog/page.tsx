import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/footer'

export const revalidate = 60;

export default async function BlogIndex() {
  // Fetch Latest 3, AI/ML specifically, and the rest
  const data = await client.fetch(`{
    "latest": *[_type == "post"] | order(publishedAt desc)[0...3] {
      title, "slug": slug.current, mainImage, publishedAt
    },
    "aiml": *[_type == "post" && category == "aiml"] | order(publishedAt desc)[0...3] {
      title, "slug": slug.current, mainImage, publishedAt
    },
    "archive": *[_type == "post"] | order(publishedAt desc)[3...12] {
      title, "slug": slug.current, mainImage, publishedAt
    }
  }`);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HEADER */}
      <section className="pt-32 pb-20 bg-[#471FFF] text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">NueraLogic <span className="text-white">Insights</span></h1>
        <p className="text-white/70 max-w-2xl mx-auto">Bridging the gap between AI potential and measurable ROI.</p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        
        {/* ROW 1: LATEST POSTS */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-bold text-[#1a103c]">Latest Strategies</h2>
            <div className="h-1 w-20 bg-[#471FFF]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.latest.map((post: any) => <BlogCard key={post.slug} post={post} />)}
          </div>
        </section>

        {/* ROW 2: AI/ML ADVANCEMENTS */}
        <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-bold text-[#1a103c]">AI/ML Advancements</h2>
            <Link href="#" className="text-[#471FFF] font-bold hover:underline">View All AI/ML →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.aiml.map((post: any) => <BlogCard key={post.slug} post={post} />)}
          </div>
        </section>

        {/* SECTION 3: THE ARCHIVE (Pagination Ready) */}
        <section>
          <h2 className="text-3xl font-bold text-[#1a103c] mb-8">More Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.archive.map((post: any) => <BlogCard key={post.slug} post={post} />)}
          </div>
          
          {/* SIMPLE PAGINATION UI */}
          <div className="mt-16 flex justify-center gap-4">
            <button className="px-6 py-2 rounded-lg border border-slate-300 text-slate-500 hover:bg-white transition">Previous</button>
            <button className="px-6 py-2 rounded-lg bg-[#471FFF] text-white font-bold">Next Page</button>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}

// Reusable Card Component
function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
      <div className="relative h-48 w-full overflow-hidden">
        {post.mainImage ? (
          <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-[#471FFF]/10" />
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-slate-400 text-xs font-bold uppercase mb-2">
          {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <h3 className="text-lg font-extrabold text-[#1a103c] group-hover:text-[#471FFF] transition-colors leading-snug">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}