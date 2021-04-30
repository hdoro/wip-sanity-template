import Link from 'next/link'
import React from 'react'
import htmlParser from 'html-react-parser'

import { AltLocale, LocaleT } from '../../types/documents'
import { CtaLink, CustomScript } from '../../types/objects'
import Logo from '../Logo'

const Header: React.FC<{
  headerLinks?: CtaLink[]
  locale: LocaleT
  customScripts?: CustomScript[]
  alternateLocales?: AltLocale[]
}> = ({ headerLinks = [], locale, customScripts = [], alternateLocales }) => {
  const bodyStartScripts = customScripts
    .filter((script) => script.type === 'bodyStart')
    .reduce(
      (finalScript, curEntry) => `${finalScript}\n\n${curEntry.script || ''}`,
      '',
    )
  return (
    <>
      {htmlParser(bodyStartScripts)}
      <header id="site-header">
        <div>
          <Link href="/" locale={locale}>
            <a>
              <Logo />
            </a>
          </Link>
          {headerLinks?.length > 0 && (
            <>
              <nav id="menu-nav" role="menu" aria-label="Header navigation">
                <div>
                  {headerLinks.map((link, i) => (
                    // Needs resolving URLs!
                    <Link href={''} key={link._key}>
                      <a>{link.label}</a>
                    </Link>
                  ))}
                  {alternateLocales?.length > 0 && (
                    <div>
                      {alternateLocales.map((alt) => (
                        // Implement locale link:
                        <div>{alt.locale}</div>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
