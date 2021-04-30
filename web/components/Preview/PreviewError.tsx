import React from 'react'

const PreviewError: React.FC<{
  title?: string
  subtitle?: string
}> = (props) => {
  return (
    <main>
      <div>
        <h1>{props.title || 'Something went wrong!'}</h1>
        {props.subtitle && <p>{props.subtitle}</p>}
      </div>
    </main>
  )
}

export default PreviewError
