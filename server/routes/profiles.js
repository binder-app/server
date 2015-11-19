
/* Profiles
 * Allow a user to update their profile
 */

var r = require('../r');

module.exports.put = put;

const photoLimit = 3*1024*1024;

function put(req, res, next) {
  if (req.params.id != req.user) {
    var err = { error : 'You can only update your own profile' };
    return res.status(401).send(err);
  }
  if (!req.body.phone) {
    var err = { error : 'You must provide a phone number' };
    return res.status(400).send(err);
  }
  if (Buffer.byteLength(req.body.photo, 'utf8') > photoLimit) {
    var err = { error : 'Maximum size for `photo` exceeded' };
    return res.status(400).send(err);
  }
  var profile = {
    id      : req.user,
    name    : req.body.name || '',
    bio     : req.body.bio || '',
    program : req.body.program || '',
    year    : req.body.year || 0,
    phone   : req.body.phone || '',
    photo   : req.body.photo || '',
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
