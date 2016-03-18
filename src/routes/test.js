'use strict';

/**
 * nodejs practise project
 *
 * @author Betis Yeon <betis.yeon@gmail.com>
 *
 */


module.exports = function (done) {
  $.router.get('/', function (req, res, next) {
    res.end(`现在是北京时间[Beijing Time Zone]: ${new Date()}`);
  });
  done();
}
