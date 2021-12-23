import type { NextRouter } from 'next/router'

const parseNextPath = (from: Parameters<NextRouter['push']>[0]) => {
  let path = (typeof from == 'string' ? from : from.pathname) || ''

  // replace each instance of [key] with the corresponding value from query[key]
  // this ensures we're navigating to the correct URL
  // it currently ignores [[...param]]
  // but I can't see why you would use this with RN + Next.js
  if (typeof from == 'object' && from.query && typeof from.query == 'object') {
    const query = { ...from.query }
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
      path += '?'
      for (const key in query) {
        if (query[key] != null) {
          path += `${key}=${query[key]}&`
        }
      }
      if (path.endsWith('&')) {
        path = path.slice(0, -1)
      }
    }
  }

  return path
}

export { parseNextPath }
