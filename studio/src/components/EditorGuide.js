import React from 'react'

const EditorGuide = () => {
  return (
    <iframe
      src="/static/docs/index.html"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
      }}
      frameBorder={0}
      allowFullScreen={true}
    ></iframe>
  )
}

export default EditorGuide
