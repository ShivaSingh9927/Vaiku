// components/RichTextComponents.tsx
export const RichTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-5">{children}</h2>,
    p: ({ children }: any) => <p className="text-lg leading-relaxed mb-4 text-gray-700">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="ml-10 list-disc space-y-2 py-5">{children}</ul>,
  },
};