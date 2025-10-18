import { parseNextPath } from './parse-next-path'

describe('parseNextPath', () => {
  it('should handle arrays', () => {
    expect(
      parseNextPath({
        pathname: '/',
        query: {
          ids: [1, 2],
        },
      })
    ).toEqual('/?ids=1&ids=2')
  })

  it('supports dynamic routes', () => {
    expect(
      parseNextPath({
        pathname: '/[id]',
        query: {
          id: 1,
        },
      })
    ).toEqual('/1')
  })

  it('should handle catch-all routes', () => {
    expect(
      parseNextPath({
        pathname: '/docs/[...slug]',
        query: {
          slug: ['getting-started', 'installation'],
        },
      })
    ).toEqual('/docs/getting-started/installation')
  })

  it('should handle multiple dynamic parameters', () => {
    expect(
      parseNextPath({
        pathname: '/user/[userId]/post/[postId]',
        query: {
          userId: '123',
          postId: '456',
        },
      })
    ).toEqual('/user/123/post/456')
  })

  it('should combine dynamic routes with query params', () => {
    expect(
      parseNextPath({
        pathname: '/post/[id]',
        query: {
          id: '789',
          tab: 'comments',
          sort: 'recent',
        },
      })
    ).toEqual('/post/789?tab=comments&sort=recent')
  })

  it('should handle string input', () => {
    expect(parseNextPath('/about')).toEqual('/about')
  })

  it('should handle empty query object', () => {
    expect(
      parseNextPath({
        pathname: '/home',
        query: {},
      })
    ).toEqual('/home')
  })

  it('should ignore null and undefined query values', () => {
    expect(
      parseNextPath({
        pathname: '/search',
        query: {
          term: 'hello',
          filter: null,
          category: undefined,
        },
      })
    ).toEqual('/search?term=hello')
  })

  it('should handle mixed dynamic params and arrays', () => {
    expect(
      parseNextPath({
        pathname: '/category/[id]',
        query: {
          id: 'books',
          tags: ['fiction', 'bestseller'],
        },
      })
    ).toEqual('/category/books?tags=fiction&tags=bestseller')
  })

  it('should handle catch-all with additional query params', () => {
    expect(
      parseNextPath({
        pathname: '/blog/[...path]',
        query: {
          path: ['2024', '10', 'my-post'],
          preview: 'true',
        },
      })
    ).toEqual('/blog/2024/10/my-post?preview=true')
  })

  it('should handle empty pathname', () => {
    expect(
      parseNextPath({
        pathname: '',
        query: {
          page: '1',
        },
      })
    ).toEqual('?page=1')
  })

  it('should handle single-element catch-all array', () => {
    expect(
      parseNextPath({
        pathname: '/docs/[...slug]',
        query: {
          slug: ['intro'],
        },
      })
    ).toEqual('/docs/intro')
  })
})
