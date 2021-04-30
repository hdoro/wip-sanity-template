import React from 'react'

/**
 * Sticky button in /preview that, when clicked, re-fetches the data for the page.
 */
const PreviewRefresh: React.FC<{
  onClick: () => void
}> = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>
        <span className="visually-hidden">Refresh data</span>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
      </button>
    </div>
  )
}

export default PreviewRefresh
