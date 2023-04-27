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
})
