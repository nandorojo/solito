export type ImageConfigComplete = {
  deviceSizes: number[]
  imageSizes: number[]
  /**
   * Example: `https://beatgig.com` or `http://localhost:3000`
   *
   * This is the host of your images, which will get resolved on native if you use relative paths.
   *
   * For example, if you have `public/image.png` in your Next.js app, and your URL is `https://beatgig.com`,
   * then you can use `<SolitoImage src="/image.png" />` and it will work on native.
   */
  nextJsURL?: `http:${string}` | `https:${string}`
  /**
   * Default: `'/_next/image'`. You must set nextJsURL for this to work.
   */
  path?: string
}

export type ImageConfig = ImageConfigComplete & {
  allSizes: number[]
}
