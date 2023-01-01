class AdminController {
  //[GET] /indexAdmin
  index(req, res) {
    res.render("indexAdmin");
  }
  dashboard(req, res) {
    res.render("dashboardAdmin");
  }
}

module.exports = new AdminController();
