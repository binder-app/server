
/* Profiles
 * Allow a user to update their profile
 */

var r = require('../r');

module.exports.put = put;

function put(req, res, next) {
  if (req.params.id != req.user) {
    var err = { error : 'You can only update your own profile' };
    return res.status(403).send(err);
  }
  var profile = {
    id      : req.user,
    name    : req.body.name || '',
    bio     : req.body.bio || '',
    program : req.body.program || '',
    year    : req.body.year || 0,
    courses : req.body.courses || []
  };
  r.table('Profile')
  .insert(profile, {
    conflict : 'replace'
  })
  .then(() => {
    res.send(profile);
  })
  .catch(next);
};
