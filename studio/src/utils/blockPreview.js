// Adds a nicer preview to items in the Portable Text editor (page.body)
import React from 'react'
import { CheckmarkCircleIcon, ErrorOutlineIcon } from '@sanity/icons'

import styles from './blockPreview.css'
import { hideBlockFld } from './commonBlockFields'

const VALUE_LENGTH = 50
function trimStr(str) {
  if (str.length < VALUE_LENGTH) {
    return str
  }
  return str.substr(0, VALUE_LENGTH) + '...'
}

const Value = (props) => {
  return (
    <code>
      <strong>{props.label}:</strong> <span>{props.children}</span>
    </code>
  )
}

const DefaultPreview = ({ fields = [], values = {} }) => {
  return (
    <pre className={styles.values}>
      {Object.keys(values)
        .filter((key) => key !== '_type')
        .map((key) => {
          const value = values[key]
          const field = fields.find((fld) => fld.name === key)
          const label = field ? field.title : key

          if (key === hideBlockFld.name) {
            return null
          }
          if (typeof value === 'string') {
            return (
              <Value label={label} key={key}>
                {trimStr(value)}
              </Value>
            )
          }
          if (Array.isArray(value)) {
            return (
              <Value label={label} key={key}>
                {value.length} {value.length > 1 ? 'entries' : 'entry'}
              </Value>
            )
          }
          if (typeof value === 'boolean') {
            return (
              <Value label={label} key={key}>
                {value ? <CheckmarkCircleIcon /> : <ErrorOutlineIcon />}
              </Value>
            )
          }
          if (typeof value === 'undefined') {
            return (
              <Value label={label} key={key}>
                undefined / not selected
              </Value>
            )
          }
          if (value._type && value._type.toLowerCase().includes('image')) {
            return (
              <Value label={label} key={key}>
                image selected
              </Value>
            )
          }
          if (typeof value === 'object') {
            return (
              <Value label={label} key={key}>
                <DefaultPreview value={value} />
              </Value>
            )
          }
          return null
        })}
    </pre>
  )
}

const PreviewWrapper = (object = {}, customPreview) => {
  return (props) => {
    const Icon = object.icon
    return (
      <section
        className={`${styles.wrapper} ${
          props.value && props.value[hideBlockFld.name] === true
            ? styles.wrapperDisabled
            : ''
        }`}
      >
        <header className={styles.header}>
          {/* object.icon is a React component, and so we need to call it as a function */}
          {Icon ? typeof Icon === 'function' ? Icon() : <Icon /> : null}
          {object.title || ''}
        </header>
        {customPreview ? (
          customPreview({ object, ...props })
        ) : (
          <DefaultPreview values={props.value} fields={object.fields} />
        )}
      </section>
    )
  }
}

export default (object, { customPreview } = {}) => {
  const { fields = [] } = object
  const select = fields
    ? fields.reduce((acc, curr) => {
        acc[curr.name] = curr.name
        return acc
      }, {})
    : {}
  return {
    select,
    component: PreviewWrapper(object, customPreview),
  }
}
