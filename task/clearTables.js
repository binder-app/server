
/* clearTables
 * Small task script to clear all database tables
 */

var r = require('../server/r');

console.log('Clearing tables...');

r.table('Profile')
.delete()
.then(() => {
  console.log('Deleted all profiles');
  return r.table('Vote')
  .delete();
})
.then(() => {
  console.log('Deleted all votes');
  process.exit(0);
});
