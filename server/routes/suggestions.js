/* Suggestions
 * Return user profiles to the user
 */

var r = require('../r');

module.exports.get = get;

function get(req, res, next) {
  r.table('Profile')
  .filter(r.row('id').ne(req.user))
  .filter(function(profile) {
    return r.table('Vote')
    .filter({ 
      from : req.user,
      to   : profile('id')
    })
    .count()
    .eq(0);
  })
  .then(users => {
    users.forEach(user => {
      delete user.phone;
    });
    res.send(users);
  })
  .catch(next);
};
