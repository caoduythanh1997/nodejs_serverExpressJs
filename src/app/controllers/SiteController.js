class SiteController {
  //[GET] /home
  index(req, res) {
    res.render("home");
  }
  //[GET] /login
  login(req, res) {
    res.render("login");
  }
}

module.exports = new SiteController();
