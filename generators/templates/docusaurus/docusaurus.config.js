const fs = require("fs");
const path = require("path");

const configFile = fs.readFileSync(
  path.resolve(__dirname, "options.json"),
  "utf-8"
);
const config = JSON.parse(configFile);
module.exports = {
  title: config.projectName, // Use projectName from the JSON file
  tagline: 'add yout tagline',
  url: 'https://example.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  organizationName: 'coMakeIT-TIC',
  projectName: 'coMakeIT-TIC.github.io',

  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      }),
    ],
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl: 'https://github.com/coMakeIT-TIC/coMakeIT-TIC.github.io/edit/main/',
        },
        blog: {
          blogTitle: 'Blog',
          blogDescription:
            'The blog is where your team shares your thoughts and ideas about everything from your products to industry news and insights.',
          showReadingTime: true,
          feedOptions: {
            type: 'all',
           // copyright,
          },

          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 5,
          postsPerPage: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'company title',
      logo: {
        alt: 'TIC@CoMakeIT Logo',
        src: 'img/logo.png',
      },   
      items: [
        // {
        //   to: 'docs/index',
        //   activeBasePath: 'docs/index',
        //   label: 'Introduction',
        //   position: 'left',
        // },
        {
          type: 'doc',
          docId: 'Documentation/concept',
          position: 'left',
          label: 'Documentation',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/coMakeIT-TIC/coMakeIT-TIC.github.io',
          //label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://example.com',//add your github account
            },
            {
              label: 'Contact Us',
              href: 'https://example.com',// add your discussions url
            },
          ],
        },
      ],
    },
  },
};
