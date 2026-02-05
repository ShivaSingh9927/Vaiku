import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI/ML Advancements', value: 'aiml' },
          { title: 'Strategy & ROI', value: 'strategy' },
          { title: 'Automation', value: 'automation' },
        ],
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      // CHANGE THIS FROM 'blockContent' TO 'array'
      type: 'array', 
      of: [
        { type: 'block' },
        { type: 'image' } // This allows you to put images INSIDE the text body too!
      ],
    }),
  ],
})