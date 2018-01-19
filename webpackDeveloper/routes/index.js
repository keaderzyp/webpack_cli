var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:parm', function(req, res, next) {
  var page = req.params.parm;
  res.render(page, { title: 'Express' });
});

module.exports = router;
