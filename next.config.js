const { i18n } = require('./next-i18next.config');

module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
            './pages/**/*.{js,jsx,ts,tsx}',
            './components/**/*.{js,jsx,ts,tsx}'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"]
      }
    ],
  ],
  async redirects() {
    return [
      {
        source: '/articles/category/:category/page/([0-1])',
        destination: '/articles/category/:category',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return [
        {
            source: '/robots.txt',
            destination: '/api/robots'
        }
    ];
  },
  i18n,
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
  }
}