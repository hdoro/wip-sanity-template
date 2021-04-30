import blocks from './blocks'
import customScript from './customScript'
import links from './links'
import pageBody from './pageBody'
import pageHero from './pageHero'
import richParagraph from './richParagraph'
import socialMedia from './socialMedia'

export default [
  customScript,
  richParagraph,
  pageBody,
  pageHero,
  socialMedia,
  ...blocks,
  ...links,
]
