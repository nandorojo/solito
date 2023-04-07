// Based on https://github.com/zeit/next.js/tree/canary/examples/with-react-native-web
// and https://github.com/expo/expo-cli/blob/main/packages/webpack-config/web-default/index.html
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'
import { AppRegistry } from 'react-native'

const fonts = ['Inter-Regular', 'Inter-Bold', 'Inter-Black']

const customFontCss = fonts
  .map(
    (font) => `
    @font-face {
        font-family: '${font}';
        src: url('/font/Inter/${font}.otf');
    }
`
  )
  .join('\n')

export const style = `
/**
 * Building on the RNWeb reset:
 * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/initialRules.js
 */
html, body, #__next {
  width: 100%;
  /* To smooth any scrolling behavior */
  -webkit-overflow-scrolling: touch;
  margin: 0px;
  padding: 0px;
  /* Allows content to fill the viewport and go beyond the bottom */
  min-height: 100%;
}
#__next {
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  display: flex;
  flex: 1;
}
html {
  scroll-behavior: smooth;
  /* Prevent text size change on orientation change https://gist.github.com/tfausak/2222823#file-ios-8-web-app-html-L138 */
  -webkit-text-size-adjust: 100%;
  height: 100%;
}
body {
  display: flex;
  /* Allows you to scroll below the viewport; default value is visible */
  overflow-y: auto;
  overscroll-behavior-y: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: scrollbar;
}
`

// @ts-expect-error it's okay
export async function getInitialProps({ renderPage }) {
  AppRegistry.registerComponent('Main', () => Main)
  // @ts-expect-error missing types here too
  const { getStyleElement } = AppRegistry.getApplication('Main')
  const page = await renderPage()
  const styles = [
    <style key="style-reset" dangerouslySetInnerHTML={{ __html: style }} />,
    getStyleElement(),
  ]
  return { ...page, styles: React.Children.toArray(styles) }
}

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Document.getInitialProps = getInitialProps

export default Document
