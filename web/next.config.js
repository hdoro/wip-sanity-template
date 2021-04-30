const locales = require('../shared/locales')

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales,
    defaultLocale: locales[0],
  },
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
  },
}
