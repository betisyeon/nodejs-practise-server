'use strict';

/**
 * nodejs practise project
 *
 * @author Betis Yeon <betis.yeon@gmail.com>
 *
 */

import Mongoose from 'mongoose';

module.exports = function (done) {
  const Schema = Mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const User = new Schema({
    name: {type: 'String', unique: true},
    password  : String,
    nickname  : String,
    email: String,
    about: {type: 'String'}
  });

  $.mongodb.model('User', User);
  $.model.User = $.mongodb.model('User');

  done();

};
