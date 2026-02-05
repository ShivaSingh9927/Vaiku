import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/footer"; // Ensure this matches your file name exactly

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null; // Safety check
      return (
        <div className="relative w-full h-[300px] md:h-[450px] my-10 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={urlFor(value).url()}
            alt="NueraLogic Insights"
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
};

export const revalidate = 60; 

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      publishedAt,
      mainImage
    }`, { slug }
  );

  if (!post) return <div className="p-20 text-center text-[#471FFF] font-bold">Post not found</div>;

  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      })
    : "February 5, 2026";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <article className="pt-16">
        <header className="relative w-full py-12 md:py-24 bg-[#471FFF] flex items-center justify-center overflow-hidden">
          <div className="relative z-10 w-full max-w-5xl px-6 text-center text-white">
            <h1 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
              {post.title}
            </h1>
            
            <div className="text-white/90 text-sm md:text-xl space-y-4">
              <p className="font-semibold tracking-wide uppercase text-blue-200">
                {formattedDate}
              </p>
              <p className="opacity-90 leading-relaxed max-w-2xl mx-auto italic">
                By Raja Singh | Nueralogic | Senior Director of Product and Industry Market Strategy
              </p>
              
              <div className="pt-8">
                <Link 
                  href="/#contact" 
                  className="inline-block bg-white text-[#471FFF] px-10 py-3.5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl hover:bg-blue-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 mt-16">
          {post.mainImage && (
            <div className="relative w-full h-[350px] md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <Image 
                src={urlFor(post.mainImage).url()} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg lg:prose-xl prose-slate max-w-none 
            prose-headings:text-[#471FFF] prose-headings:font-bold 
            prose-p:text-slate-700 prose-p:leading-relaxed
            prose-strong:text-slate-900 prose-a:text-[#471FFF] prose-a:no-underline hover:prose-a:underline">
            <PortableText value={post.body} components={ptComponents} />
          </div>

          <section className="mt-24 mb-20">
            <div className="bg-[#471FFF]/5 p-10 md:p-16 rounded-[2.5rem] border border-[#471FFF]/10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#471FFF]">Ready to bridge the gap?</h3>
              <p className="text-slate-600 mb-10 max-w-xl mx-auto text-lg md:text-xl leading-relaxed">
                Stop thinking about AI strategy. Start building actual ROI.
              </p>
              <Link 
                href="/#contact" 
                className="inline-block bg-[#471FFF] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}