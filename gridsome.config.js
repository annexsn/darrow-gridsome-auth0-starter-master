// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Darrow Gridsome Auth0 Starter',
  siteDescription: 'Based on Gridsome starter using Auth0 for user authentication.',
  siteUrl: 'https://gridsome-auth0-starter.netlify.app',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        purgeConfig: {
          content: [
            './src/**/*.vue',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.html',
            './src/**/*.pug',
            './src/**/*.md',
            './docs/**/*.md',
            './blog/**/*.md',
          ],
          whitelist: [
            'body',
            'html',
            'img',
            'a',
            'g-image',
            'g-image--lazy',
            'g-image--loaded',
            'active',
          ],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        },
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Documentation', // Required
        baseDir: './docs', // Where .md files are located
        pathPrefix: '/docs', // Add route prefix. Optional
        template: './src/templates/Documentation.vue', // Optional
        plugins: [
          [ 'gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: true } ]
      ],
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Gridsome Auth0 Starter Blog',
          feed_url: 'https://gridsome-auth0-starter.netlify.app/rss.xml',
          site_url: 'https://gridsome-auth0-starter.netlify.app'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.summary,
          url: 'https://gridsome-auth0-starter.netlify.app' + node.path,
          author: 'Hervé Fulchiron',
          date: node.date
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      }
    },
  ],
  templates: {
    Tag: '/tag/:id'
  },
  transformers: {
    remark: {
      plugins: [
        [ 'gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: true } ]
      ],
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
    }
  },
}
