const { Accounts } = require('./modules/Account');
class SiteController {
  //[GET] /home
  index(req, res, next) {
    res.render('home');
  }
  //[GET] /login
  login(req, res, next) {
    res.render('login');
  }

  //[GET] /register
  register(req, res, next) {
    res.render('register');
  }

  //[POST] /register/store
  store(req, res, next) {
    const formData = req.body;
    if (formData.username.includes('admin') || formData.username.includes('Admin')) {
      const arr = {
        mes: 'Không Được Đặt Username Là Admin!',
      };
      res.render('register', { arr });
      return;
    } else {
      const dataAccount = new Accounts(formData);
      dataAccount
        .save()
        .then(() => res.json('reg account success'))
        .catch((error) => {});
    }
  }
}

module.exports = new SiteController();
