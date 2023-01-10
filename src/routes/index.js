const adminRouter = require('./admin');
const siteRouter = require('./site');
const apiRouter = require('./api');
function route(app) {
  app.use('/api/v1', apiRouter);
  app.use('/api_admin', adminRouter);
  app.use('/', siteRouter);
}

module.exports = route;
