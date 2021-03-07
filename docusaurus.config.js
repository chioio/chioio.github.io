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
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false,
        blog: {
          path: 'blogs',
          // editUrl: '',
          // postsPerPages: 3,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear} Tenn Chio.`,
          },
          showReadingTime: true,
          // editUrl: '',
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      },
    ],
  ],
  themeConfig: {
    hideableSidebar: false,
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'support',
      content:
        '⭐️ Like this theme? Give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/chioio/chioio.github.io">GitHub</a>! ⭐️',
    },
    navbar: {
      title: '\\ioi/',
      // logo: {
      //   alt: 'Logo',
      //   src: 'img/logo-dark.svg',
      //   srcDark: 'img/logo-light.svg',
      // },
      items: [
        //left
        {
          label: 'Records',
          position: 'left',
          items: [
            {
              to: 'docs/records/html_css',
              label: 'HTML & CSS',
            },
            {
              to: 'docs/records/js_ts',
              label: 'JS & TS',
            },
            {
              to: 'docs/records/vue',
              label: 'Vue',
            },
            {
              to: 'docs/records/react',
              label: 'React',
            },
            {
              to: 'docs/records/mess',
              label: 'Mess',
            },
          ],
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left',
        },
        {
          to: 'resume',
          label: 'Resume',
          position: 'left',
        },
        // right
        {
          href: 'https://juejin.cn/user/1521379825688637',
          className: 'header-juejin-link',
          'aria-label': 'Juejin',
          position: 'right',
        },
        {
          href: 'https://github.com/chioio',
          className: 'header-github-link',
          'aria-label': 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
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
          title: 'FRIENDLY LINKS',
        },
        {
          title: 'SOCIALS NETWORK',
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
  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'html_css-records',
        path: 'docs/records/html_css',
        routeBasePath: 'docs/records/html_css',
        sidebarPath: require.resolve('./docs/records/html_css/sidebar.ts'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'js_ts-records',
        path: 'docs/records/js_ts',
        routeBasePath: 'docs/records/js_ts',
        sidebarPath: require.resolve('./docs/records/js_ts/sidebar.ts'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'vue-records',
        path: 'docs/records/vue',
        routeBasePath: 'docs/records/vue',
        sidebarPath: require.resolve('./docs/records/vue/sidebar.ts'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'react-records',
        path: 'docs/records/react',
        routeBasePath: 'docs/records/react',
        sidebarPath: require.resolve('./docs/records/react/sidebar.ts'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'mess-records',
        path: 'docs/records/mess',
        routeBasePath: 'docs/records/mess',
        sidebarPath: require.resolve('./docs/records/mess/sidebar.ts'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ],
}
