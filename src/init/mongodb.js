'use strict';

/**
 * nodejs practise project
 *
 * @author Betis Yeon <betis.yeon@gmail.com>
 *
 */

import Mongoose from 'mongoose';

module.exports = function (done) {

  const debug = $.createDebug('init:mongodb');
  debug('Connecting to MongoDB...');

  const conn = Mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb = conn;
  $.model = {};

  done();

};
