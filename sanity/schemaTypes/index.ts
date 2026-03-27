import { type SchemaTypeDefinition } from 'sanity'
import post from './post' // Import the file you just created

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post], // Add 'post' to the types array
}