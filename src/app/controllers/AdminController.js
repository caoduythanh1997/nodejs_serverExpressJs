const { Accounts, Notice } = require('./modules/Account');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class AdminController {
  //[GET] /indexAdmin
  index(req, res) {
    res.render('admin/indexAdmin');
  }

  //[GET] /indexAdmin/dashboard
  dashboard(req, res, next) {
    res.render('admin/dashboardAdmin');
  }

  //[GET] /indexAdmin/AccountManager
  accountManager(req, res, next) {
    Accounts.find({})
      .then((acc) => {
        res.render('admin/accountManager', {
          acc: multipleMongooseToObject(acc),
        });
      })
      .catch(next);
  }
  //[GET] /indexAdmin/notice
  notice(req, res, next) {
    Notice.findOne({})
      .then((notice) => {
        res.render('admin/notice', { notice: mongooseToObject(notice) });
      })
      .catch(next);
  }

  //[PUT] /notice/store
  store(req, res, next) {
    const formData = req.body;
    Notice.updateOne({ _id: formData.idValue }, formData)
      .then(() => res.redirect('/api_admin/notice'))
      .catch(next);
  }
}

module.exports = new AdminController();
