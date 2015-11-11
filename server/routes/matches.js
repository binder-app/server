
/* Matches
 * Send a list of matches
 */

var r = require('../r');

module.exports.get = get;

function get(req, res, next) {
  r.table('Profile')
  .filter(function(profile) {
    var c1 = r.table('Vote')
    .filter({ 
      to   : profile('id'),
      from : req.user,
      type : 'like'
    })
    .count()
    .ne(0);
    var c2 = r.table('Vote')
    .filter({ 
      to   : req.user,
      from : profile('id'),
      type : 'like'
    })
    .count()
    .ne(0);
    return r.and(c1, c2);
  })
  .then(users => {
    res.send(users);
  })
  .catch(next);
};
