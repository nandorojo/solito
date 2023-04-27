import type { NextRouter } from 'next/router'

const parseNextPath = (from: Parameters<NextRouter['push']>[0]) => {
  let path = (typeof from == 'string' ? from : from.pathname) || ''

  // replace each instance of [key] with the corresponding value from query[key]
  // this ensures we're navigating to the correct URL
  // it currently ignores [[...param]]
  // but I can't see why you would use this with RN + Next.js
  if (typeof from == 'object' && from.query && typeof from.query == 'object') {
    const query = { ...from.query }
    // replace dynamic routes
    // and [...param] syntax
    for (const key in query) {
      if (path.includes(`[${key}]`)) {
        path = path.replace(`[${key}]`, `${query[key] ?? ''}`)
        delete query[key]
      } else if (path.includes(`[...${key}]`)) {
        const values = query[key]
        if (Array.isArray(values)) {
          path = path.replace(`[...${key}]`, values.join('/'))
          delete query[key]
        }
      }
    }

    if (Object.keys(query).length) {
      // add query param separator
      path += '?'
      for (const key in query) {
        const value = query[key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            path += `${key}=${item}&`
          })
        } else if (value != null) {
          path += `${key}=${value}&`
        }
      }
      if (path.endsWith('&') || path.endsWith('?')) {
        path = path.slice(0, -1)
      }
    }
  }

  return path
}

export { parseNextPath }
