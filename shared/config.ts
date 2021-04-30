/**
 * Used in OpenGraph tags
 * (see BaseHead.tsx for how it's used)
 */
export const SITE_NAME = '%SITE_NAME%'

/**
 * If you want to associate your twitter links with a specific account, add it here:
 * (see BaseHead.tsx for how it's used)
 */
export const TWITTER_HANDLE: string | undefined = undefined

/**
 * Used to generate absolute URLs from paths, mainly for SEO purposes
 */
export const BASE_URL = `http://localhost:3000`
// export const BASE_URL = `https://your-site.com`

export const SITE_DOMAIN = BASE_URL.replace(/https?:\/\//g, '')

/**
 * Used to define the theme color in the HTML head, which will define the navigation bar's color on Android & MS devices
 */
export const THEME_COLOR = '%THEME_COLOR%'
