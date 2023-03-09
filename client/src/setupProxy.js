// Here I setup the proxy server http://localhost:1234 for the back-end
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:1234',
      changeOrigin: true,
    })
  );
};