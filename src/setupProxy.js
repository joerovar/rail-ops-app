const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:5000', // or your target server
      changeOrigin: true,
      allowedHosts: 'all',
    })
  );
};
