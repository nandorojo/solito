const noOp = () => {
  throw new Error(
    '[use-link-to] is not supported on the web. Something went wrong if you called this.'
  )
}

/**
 * @deprecated imported from the wrong file. Use `use-link-to` instead.
 */
export const useLinkTo = () => noOp
