import React from 'react'
import Logo from '../../plugins/cms-customizer/Logo'

import css from './OgImageEditor.module.css'

const Component = ({ title, subtitle }) => {
  return (
    <div className={css.root}>
      <div>
        <h1>{title || 'Title missing!'}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className={css.logo}>
        <Logo />
      </div>
    </div>
  )
}

export default {
  name: 'ogImage1200',
  component: Component,
  prepare: (document) => ({
    title: document.hero?.title || document.seoTitle || document.internalTitle,
    subtitle: document.seoDescription,
  }),
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    },
  ],
}
