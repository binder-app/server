
/* Dislikes
 * Create a new 'dislike'
 */

var r = require('../r');

module.exports.post = post;

function post(req, res, next) {
  if (!req.body.to) {
    var err = { error : '\'to\' parameter is required' };
    return res.status(400).send(err);
  }
  if (req.body.to == req.user) {
    var err = { error : 'You cannot like your own profile' };
    return res.status(400).send(err);
  }
  var vote = {
    to   : req.body.to,
    from : req.user,
    type : 'dislike'
  };
  r.table('Vote')
  .insert(vote)
  .then(rslt => {
    vote.id = rslt.generated_keys[0];
    res.send(vote);
  })
  .catch(next);
};
