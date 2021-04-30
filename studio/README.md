# Sanity Studio for managing website's content

Documentation is pending. In the meantime, refer to comments in each individual file.

Here's the high level overview:

- Right now the only 2 document types are global settings & page
  - I intend to add schemas to support a company blog (post, author, tag, etc.)
- For internationalization / i18n, we're using [sanity-plugin-intl-input](https://github.com/LiamMartens/sanity-plugin-intl-input/)
  - The desk structure is mostly controlled by the plugin, we simply build on top of it to add our own custom titles & icons.
- Pages' content are highly flexible through re-usable blocks (refer to schemas/objects/blocks)
  - A very basic foundation is provided, you're free to add more as you see fit.
- Project info is set in environment variables
  - refer to .env.sample for the necessary values
- If hosting the studio on Vercel, a basic vercel.json file is provided to account for the SPA routing configuration
  - Refer to https://www.sanity.io/docs/deployment for more info on deployment
- I've added the basic implementation of the dashboard tool to include some interesting tutorials there in case you're new to Sanity.
  - if not, feel free to repurpose the dashboard: https://www.sanity.io/docs/dashboard-overview
  - Or delete it entirely by removing `"@sanity/dashboard"` from the plugins array in sanity.json
- There's a basic implementation of a markdown documentation inside the Desk powered by docsify
  - That documentation is lacking and should serve solely as an outliner and an inspiration for writing your own :)

## Known issues

- Language flags in the translations tab are broken
  - sanity-plugin-intl-input uses countryflags.io, which just recently was phased out
  - The author is working on a fix: https://github.com/LiamMartens/sanity-plugin-intl-input/issues/35
- The studio is showing a "Invalid prop icon supplied to PaneItem." error whenever it loads
  - This stems from @sanity/icons providing JSX elements / objects instead of functions
  - I've reported this issue and hope the team will remove the warning soon
