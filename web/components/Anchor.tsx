import React from 'react'
import { AnchorData } from '../types/objects'

const Anchor: React.FC<AnchorData> = ({ anchorId }) => {
  if (!anchorId) {
    return null
  }
  return <div aria-hidden="true" id={anchorId} />
}

export default Anchor
