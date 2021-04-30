import anchor from './anchor'
import cards from './cards'
import cta from './cta'
import iframe from './iframe'
import image from './image'
import testimonial from './testimonial'

/**
 * Blocks are re-usable pieces of schema that can be added to rich text fields for building landing pages, richer articles, etc.
 */
export default [anchor, ...cards, cta, iframe, image, testimonial]
