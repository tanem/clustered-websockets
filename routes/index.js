
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log('Request handled by worker with pid: %d', process.pid);
  res.render('index', { title: 'Express' });
};