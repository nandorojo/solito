import { resolveSourceFromImgAttributes } from './helpers'

describe('resolveSourceFromImgAttributes', () => {
  test('picks from max-width', () => {
    expect(
      resolveSourceFromImgAttributes({
        dimensions: {
          width: 100,
          height: 100,
        },
        srcSet: `elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w`,
        sizes: `(max-width: 600px) 480px, 800px`,
        src: 'elva-fairy.jpg',
      }).uri
    ).toBe('elva-fairy-480w.jpg')
  })

  test('trims excess space', () => {
    expect(
      resolveSourceFromImgAttributes({
        dimensions: {
          width: 100,
          height: 100,
        },
        srcSet: `elva-fairy-480w.jpg 480w, 
        
    elva-fairy-800w.jpg 800w`,
        sizes: `(max-width: 600px) 480px, 
        800px`,
        src: 'elva-fairy.jpg',
      }).uri
    ).toBe('elva-fairy-480w.jpg')
  })

  test('picks from min-width', () => {
    expect(
      resolveSourceFromImgAttributes({
        dimensions: {
          width: 700,
          height: 700,
        },
        srcSet: `elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w`,
        sizes: `(min-width: 600px) 480px, 800px`,
        src: 'elva-fairy.jpg',
      }).uri
    ).toBe('elva-fairy-480w.jpg')
  })

  test('100vw size is treated as dimensions width', () => {
    expect(
      resolveSourceFromImgAttributes({
        dimensions: {
          width: 700,
          height: 700,
        },
        srcSet: `elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w`,
        sizes: `100vw`,
        src: 'elva-fairy.jpg',
      }).uri
    ).toBe('elva-fairy-800w.jpg')
  })

  test('100vw falls back to src', () => {
    expect(
      resolveSourceFromImgAttributes({
        dimensions: {
          width: 900,
          height: 900,
        },
        srcSet: `elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w`,
        sizes: `100vw`,
        src: 'elva-fairy.jpg',
      }).uri
    ).toBe('elva-fairy.jpg')
  })

  test('falls back to last value in sizes', () => {
    expect(
      resolveSourceFromImgAttributes({
        dimensions: {
          width: 700,
          height: 700,
        },
        srcSet: `elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w`,
        sizes: `(max-width: 600px) 480px, 800px`,
        src: 'elva-fairy.jpg',
      }).uri
    ).toBe('elva-fairy-800w.jpg')
  })

  test('uses src if missing rest', () => {
    expect(
      resolveSourceFromImgAttributes({
        dimensions: {
          width: 700,
          height: 700,
        },
        src: 'elva-fairy.jpg',
      }).uri
    ).toBe('elva-fairy.jpg')
  })

  test('throws for 1x, 2x', () => {
    expect(
      () =>
        resolveSourceFromImgAttributes({
          dimensions: {
            width: 700,
            height: 700,
          },
          srcSet: `elva-fairy-480w.jpg 1x, elva-fairy-800w.jpg 2x`,
          sizes: `(max-width: 600px) 480px, 800px`,
          src: 'elva-fairy.jpg',
        }).uri
    ).not.toThrow()
  })
})
