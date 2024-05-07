const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // Specify the base path for your API requests
    createProxyMiddleware({
      target: 'https://task-manager-aq2n.onrender.com',  // Specify the address of your API server
      changeOrigin: true,
    })
  );
};