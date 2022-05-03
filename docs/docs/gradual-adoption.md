---
title: Gradual Adoption
---

Solito is built with gradual adoption in mind. The API and functionality perfectly mirrors that of `next/link` and `next/router`. This means that, if you're only building a Next.js app, but think you'll want to use the same code for native later, you can safely use Solito to keep your Next.js code future-proof. You don't need to go all-in on React Native today to justify using Solito.

Solito is purposefully built to run in isolation between platforms. While Solito gives you a single API, and works the same on Next.js and React Native, under the hood, it runs [different code per-platform](https://www.youtube.com/watch?v=0lnbdRweJtA&t=1046s) to keep you from importing a bunch of code you aren't using.

Previous attempts at unifying navigation code between Next.js and React Native involved using React Navigation on Web, together with Next.js Router. This meant two sources of truth and clashing philosophies attempting to work together.

Solito takes a new approach: let each platform do what it does best. Solito uses React Navigation on Native, and Next.js Router on Web. We never mix-and-match the two. In fact, Solito makes sure React Navigation is never imported on Web. If you're wondering how this is possible, I touch on it in the [Methodology](/methodology) section.

## Made for Web developers

Solito is easy for Web developers to pick up. If you've never used React Native, but you've used Next.js or Create React App, you're ready to go.

On the iOS/Android side, instead of a `pages` folder, you'll implement the screens with [React Navigation](https://reactnavigation.org). This will look similar to React Router. Setting up React Navigation's [linking config](https://reactnavigation.org/docs/configuring-links), which maps screens to URL paths, may be a bit less intuitive for you at first. It's a little clunkier than Next.js' `pages` folder. But after an hour or two it'll be second nature, and you won't have to deal with it often.

Luckily, there are zero new things to learn on the Web side. After all, you're using the same APIs you're used to from Next.js.

In the next section, let's unpack Solito's methodology to understand what's going down under the hood.
