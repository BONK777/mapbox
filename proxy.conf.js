const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/styles',
    createProxyMiddleware({
      target: 'https://api.mapbox.com',
      changeOrigin: true,
      pathRewrite: {
        '^/styles': '/styles',
      },
    })
  );
};
