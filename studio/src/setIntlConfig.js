const fs = require('fs')
const locales = require('../../shared/locales')

// Creates the JSON configuration file for the sanity-plugin-intl-input plugin we're using under the hood for translations
const config = {
  /**
   * Note to be included in the JSON file for better clarity
   */
  NOTE:
    'This document is auto-generated, refer to src/setIntlConfig.js for how to change it',
  /**
   * Defines the _ids of localized pages as i18n.[ID]
   * https://github.com/LiamMartens/sanity-plugin-intl-input/blob/master/docs/important-configuration.md#id-structure
   */
  idStructure: 'subpath',
  /**
   * Makes it so translated documents are more easily deletable as the references from the main document won't block the studio from deleting them.
   * https://github.com/LiamMartens/sanity-plugin-intl-input/blob/master/docs/important-configuration.md#reference-behavior
   */
  referenceBehavior: 'weak',
  languages: locales,
}

fs.writeFileSync('config/intl-input.json', JSON.stringify(config, null, 2), {
  encoding: 'utf-8',
})
