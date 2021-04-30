import SanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

/**
 * Used in the server side
 */
const client = new SanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_READ_TOKEN,
  // Tokens don't work the CDN and we want the freshest data possible
  useCdn: false,
})

export default client

/**
 * Used in the preview route for getting freshest data with the currently authenticated user's credentials
 */
export const browserClient = new SanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  withCredentials: true,
  useCdn: false,
})

export const imageBuilder = imageUrlBuilder(browserClient)
