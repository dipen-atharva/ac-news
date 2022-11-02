module.exports = function isLoggedIn(req, res, next) {
  console.log("----dsdsdsds----", req.session, req.session.userId)
  if (req.session.userId) {
    next();
  } else {
    res.send('You are not logged in')
  }
};