'use strict';

/**
 * nodejs practise project
 *
 * @author Betis Yeon <betis.yeon@gmail.com>
 *
 */

module.exports = function (set, get, has) {
  // 设置服务器监听端口
  set('web.port', 3000);
  // set session secret
  set('web.session.secret', 'test');
};
