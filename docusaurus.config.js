module.exports = {
  title: 'Tenn Chio',
  tagline: 'Build Self - Build World.',
  url: 'https://chioio.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'chioio',
  projectName: 'chioio.github.io',
  themeConfig: {
    algolia: {
      apiKey: '47ecd3b21be71c5822571b9f59e52544',
      indexName: 'docusaurus-2',
      contextualSearch: true,
    },
    navbar: {
      title: 'Tenn Chio',
      logo: {
        alt: 'IO Logo',
        // src: theme === 'light'
        //   ? 'img/logo-dark.svg'
        //   : 'img/logo-light.svg',
        src: 'img/logo-light.svg',
      },
      items: [
        {
          to: 'records/',
          activeBasePath: 'records',
          label: 'Records',
          position: 'left',
        },
        { to: 'blogs', label: 'Blogs', position: 'left' },
        // right
        {
          to: 'resume',
          label: 'Resume',
          position: 'right',
        },
        {
          href: 'https://github.com/chioio',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'RECORDS',
          items: [
            {
              label: 'JavaScript',
              to: 'records/javascript/',
            },
            {
              label: 'Vue',
              to: 'records/vue/',
            },
            {
              label: 'React',
              to: 'records/react/',
            },
          ],
        },
        {
          title: 'BLOGS',
          items: [
            {
              label: '2021',
              to: 'blogs/2021/',
            },
          ],
        },
        {
          title: 'PROJECTS',
          items: [
            {
              label: 'Ant Fortune Desktop',
              href: 'https://github.com/chioio/ant-fortune-desktop',
            },
            {
              label: 'Vue 3.0 Resolve',
              href: 'https://github.com/chioio/vue3.0-resolve',
            },
            {
              label: 'Vue 2.0 Resolve',
              href: 'https://github.com/chioio/vue2.0-resolve',
            },
          ],
        },
        {
          title: 'SOCIALS',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/chioio',
            },
            {
              label: 'Juejin',
              href: 'https://juejin.cn/user/1521379825688637',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/Tenn_Chio',
            },
          ],
        },
      ],
      copyright: `
        Copyright © ${new Date().getFullYear()} Tenn Chio. <br> 
        Powered by <a href="https://pages.github.com">GitHub Page</a>, built by <a href="https://v2.docusaurus.io/">Docusaurus</a>.
      `,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
}
