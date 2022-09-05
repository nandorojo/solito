import { DripsyProvider, makeTheme } from 'dripsy'
import { Platform } from 'react-native'

const rootFontName = 'Inter-Regular'

const webFont = (font: string) =>
  Platform.select({
    web: `${font}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, Inter-serif`,
    default: font,
  })

const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  text: {
    p: {
      fontSize: 16,
    },
  },
  customFonts: {
    [rootFontName]: {
      '400': webFont(rootFontName),
      '500': webFont(rootFontName),
      600: webFont('Inter-Bold'),
      700: webFont('Inter-Bold'),
      800: webFont('Inter-Black'),
      900: webFont('Inter-Black'),
      bold: webFont('Inter-Bold'),
      default: webFont(rootFontName),
      normal: webFont(rootFontName),
    },
  },
  fonts: {
    root: rootFontName,
  },
})

export function Dripsy({ children }: { children: React.ReactNode }) {
  return (
    <DripsyProvider
      theme={theme}
      // this disables SSR, since react-native-web doesn't have support for it (yet)
      ssr
    >
      {children}
    </DripsyProvider>
  )
}
