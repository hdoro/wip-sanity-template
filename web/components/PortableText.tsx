import React from 'react'
import BlockContent from '@sanity/block-content-to-react'

import { SanityBlockContent } from '../types/objects'
import Anchor from './Anchor'
import ImageBlock from './ImageBlock/ImageBlock'

// BROKEN - just here for an overview of what it _could_ do
const serializers = {
  types: {
    anchor: (props) => <Anchor {...props.node} />,
    blurbSection: (props) => <BlurbSection {...props.node} />,
    clientLogoSection: (props) => <ClientLogoSection {...props.node} />,
    ctaSection: (props) => <CtaSection {...props.node} />,
    iframe: (props) => <Iframe {...props.node} />,
    imageBlock: (props) => <ImageBlock {...props.node} />,
    testimonial: (props) => <Testimonial {...props.node} />,
    'pricing.table': (props) => <PricingTable {...props.node} />,
    // PLOP: add block to serializers
    versionedScreenshot: (props) => <VersionedScreenshot {...props.node} />,
    newsletterBlock: (props) => <NewsletterBlock {...props.node} />,
  },
  marks: {
    blockAbsUrl: (props) => {
      if (!props?.mark) {
        return null
      }
      return (
        <Cta
          type="inline"
          cta={{
            ...props.mark,
          }}
        >
          {props.children}
        </Cta>
      )
    },
    blockPageLink: (props) => {
      if (!props?.mark) {
        return null
      }
      return (
        <Cta
          type="inline"
          cta={{
            ...props.mark,
          }}
        >
          {props.children}
        </Cta>
      )
    },
  },
}

const PortableText: React.FC<{
  blocks?: SanityBlockContent
  className?: string
  containerId?: string
}> = (props) => {
  if (!props.blocks || props.blocks.length < 1) {
    return null
  }

  return (
    <BlockContent
      blocks={props.blocks.filter((block) => block.hideBlock !== true)}
      renderContainerOnSingleChild={true}
      className={props.className}
      serializers={{
        ...serializers,
        container: ({ className, children }) => (
          <div className={className} id={props.containerId}>
            {children}
          </div>
        ),
      }}
    />
  )
}

export default PortableText
