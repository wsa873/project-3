const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getClubs', mid.requiresLogin, controllers.Club.getClubs);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', controllers.Account.signup);

  app.get('/logout', mid.requiresSecure, mid.requiresLogin, controllers.Account.logout);

  app.post('/changePassword', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePassword);
  app.post('/premium', mid.requiresSecure, mid.requiresLogin, controllers.Club.getAffiliatedLinks);

  app.get('/maker', mid.requiresLogin, controllers.Club.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Club.makeClub);

  app.post('/maker', mid.requiresLogin, controllers.Club.editClub);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
