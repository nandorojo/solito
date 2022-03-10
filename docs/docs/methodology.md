---
title: Methodology
---

With gradual adoption in mind, it's useful to know the Solito methodology to navigation. You might be wondering, where am I sharing code here, and where do I write different code per-platform?

The answer: the code for screens themselves are 100% shared. So is the code for navigating between screens.

So, where is code _not_ shared? Whenever screens themeselves are rendered.

Solito views your screens as primitives that make up your app (and website). It's up to your platform to implement how those screens are displayed.

On iOS and Android, you'll implement these shared screens using stacks, tabs, and drawers from React Navigation. You have full freedom for how you want to implement these. To a React Native developer, this is completely familiar. You don't have to learn anything new.

Meanwhile, on Next.js, you will render your shared screen components inside of your `pages` folder like always.

Sounds pretty easy, right?

So, how is this possible? Do the Next.js site and React Native app have to "communicate" somehow? How is it that `<Link href="/users/fernando" />` opens the same screen on both platforms?

Solito treats URLs as your central source of truth. Your Next.js app and React Native app don't communicate at all. The live in total isolation. <u>**Solito works by doing this: give me a URL, I'll detect what platform you're using, and then I'll figure out how to navigate to that URL.**</u>

Lets call this [headless navigation](https://github.com/axeldelafosse/expo-next-monorepo-example/pull/1#issuecomment-1011563775). Your screens are your primitives, and they're fully shared across platforms. It's then up to each platform to implement these screens, and ensure that the URLs across platforms map to the same screens.

In the future, React Native may have a [`pages` folder API](https://github.com/EvanBacon/expo-auto-navigation-webpack), like Next.js, which would alleviate the burden for developers to map URLs to the same screens across platforms. But this burden, while it exists today, is very minimal.

## Should I use Solito?

If you're building a Next.js app, there's no real reason _not_ to use Solito. After all, it provides all the functionality that you're already getting from `useRouter` and `Link`, plus some useful utilities like `useParam`. Plus, any unnecessary React Navigation code is tree shaken.

If you're building a React Native app, the app you're already building can be spun into a website in like a day or two, max. You should use the web's URL mental model to get around pages, rather than screen names. If you use Solito to get around screens and read in `params`, then the moment you want to turn your app into a Next.js site, the hard parts are already done.

And so, my short answer is, why not use Solito? If you think you'll ever use React Native, or just React Native Web for your website (just like [twitter.com](https://twitter.com)), then I view Solito as the future-proof way to do so. React Native is my go-to framework, [even if I'm only building a website](https://www.youtube.com/watch?v=0lnbdRweJtA&t=22s). And Solito is my go-to to glue it all together.
