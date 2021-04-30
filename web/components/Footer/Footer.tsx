import Link from 'next/link'
import React from 'react'
import htmlParser from 'html-react-parser'

import { LocaleT } from '../../types/documents'
import { CtaLink, CustomScript } from '../../types/objects'
import Logo from '../Logo'

const Footer: React.FC<{
  footerLinks?: CtaLink[]
  locale: LocaleT
  customScripts?: CustomScript[]
}> = ({ footerLinks = [], locale, customScripts = [] }) => {
  const bodyEndScripts = customScripts
    .filter((script) => script.type === 'bodyEnd')
    .reduce(
      (finalScript, curEntry) => `${finalScript}\n\n${curEntry.script || ''}`,
      '',
    )
  return (
    <>
      <footer>
        <div>
          {footerLinks?.length > 0 && (
            <nav>
              {footerLinks.map(
                (link) =>
                  // <Cta key={link._key || link.label} cta={link} type="nav" />
                  null,
              )}
            </nav>
          )}
          <Link href="/" locale={locale}>
            <a href="/">
              <Logo />
            </a>
          </Link>
          <p>©{new Date(Date.now()).getFullYear()} - All rights reserved</p>
        </div>
      </footer>
      {htmlParser(bodyEndScripts)}
    </>
  )
}

export default Footer
