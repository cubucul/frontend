module.exports = {
  images: {
    domains: [
      'is1-ssl.mzstatic.com',
      'is2-ssl.mzstatic.com',
      'is3-ssl.mzstatic.com',
      'is4-ssl.mzstatic.com',
      'is5-ssl.mzstatic.com'
    ],
    deviceSizes: [],
    imageSizes: [40, 60, 80, 120, 131, 210, 262, 420]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader']
    });

    return config;
  }
}
