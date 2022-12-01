export type ImageConfigComplete = {
  deviceSizes: number[]
  imageSizes: number[]
  /**
   * Example: `https://beatgig.com` or `http://localhost:3000`
   *
   * This is the URL to your Next.js app, used on iOS & Android to resolve relative URLs.
   *
   * For example, if you have `public/image.png` in your Next.js app, and your URL is `https://beatgig.com`,
   * then you can use `<SolitoImage src="/image.png" />` and it will get the image from the next.js site.
   *
   * Docs: https://solito.dev/usage/image#solitoimageprovider-
   */
  nextJsURL?: `http:${string}` | `https:${string}`
  /**
   * You probably shouldn't touch this. It's only used on native to get your images.
   *
   * Default: `'/_next/image'`. You must set nextJsURL for this to work.
   */
  path?: string
  loader?: (info: { src: string; width: number; quality: number }) => string
}

export type ImageConfig = ImageConfigComplete & {
  allSizes: number[]
}
