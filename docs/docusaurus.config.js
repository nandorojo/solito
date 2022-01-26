// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Solito',
  tagline: 'React Native + Next.js utilities that give solo devs superpowers.',
  url: 'https://solito.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'nandorojo', // Usually your GitHub org/user name.
  projectName: 'solito', // Usually your repo name.
  scripts: [
    {
      src: 'https://cdn.splitbee.io/sb.js',
      async: true,
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // disable landing page
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Solito',
        logo: {
          alt: 'Solito Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/',
            activeBasePath: '/',
            label: 'Docs',
            position: 'left',
          },
          {
            href: 'https://twitter.com/fernandotherojo',
            label: 'Twitter',
            position: 'right',
          },
          {
            href: 'https://github.com/nandorojo/moti',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: '/',
              },
              {
                label: 'Installation',
                to: '/install',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nandorojo/solito',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/fernandotherojo',
              },
            ],
          },
          {
            title: 'About the creator',
            items: [
              {
                label: 'Fernando Rojo',
                href: 'https://fernandorojo.co',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fernando Rojo.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
