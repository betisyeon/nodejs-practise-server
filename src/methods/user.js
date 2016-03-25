'use strict';

/**
 * nodejs practise project
 *
 * @author Betis Yeon <betis.yeon@gmail.com>
 *
 */

import Validator from 'validator';
import Debug from 'debug';

// 创建Debug函数
/*
$.createDebug = function(name) {
  return createDebug('My '+ name);
};
const debug = $.createDebug('user_operation');
*/
var debug = require('debug');

module.exports = function (done) {

  $.method('user.add').check({
    name: {required: true, validate: (v) => Validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
    email: {required: true, validate: (v) => Validator.isEmail(v)},
    password: {required: true, validate: (v) => Validator.isLength(v, {min: 6})},
  });
  $.method('user.add').register(async function (params, callback) {

    params.name = params.name.toLowerCase();
    {
      const user = await $.method('user.get').call({name: params.name});
      if (user) return callback(new Error(`user ${params.name} already exists...`));
    }
    {
      const user = await $.method('user.get').call({email: params.email});
      if (user) return callback(new Error(`email ${params.email} already exists...`));
    }
    params.password = $.utils.encryptPassword(params.password.toString());
    const user = new $.model.User(params);

    user.save(callback);
  });

  $.method('user.get').check({
    _id: {validate: (v) => Validator.isMongoId(v)},
    name: {validate: (v) => Validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
    email: {validate: (v) => Validator.isEmail(v)},
  });
  $.method('user.get').register(async function (params, callback) {
    //debug('My user_info_4_getting...');
    const query = {};
    if (params._id) {
      query._id = params._id;
    } else if (params.name) {
      query.name = params.name;
    } else if (params.email) {
      query.email = params.email;
    } else {
      return callback(new Error('missing params: _id or name or email....'));
    }

    $.model.User.findOne(query, callback);
  });

  $.method('user.update').check({
    _id: {validate: (v) => Validator.isMongoId(v)},
    name: {validate: (v) => Validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
    email: {validate: (v) => Validator.isEmail(v)},
  });
  $.method('user.update').register(async function (params, callback) {
    const user = await $.method('user.get').call(params);
    if (!user) {
      return callback(new Error('user does not exist...'));
    }
    const update = {};
    if (params.name && user.name !== params.name) update.name = params.name;
    if (params.email && user.email !== params.email) update.email = params.email;
    if (params.password) update.password = params.password;
    if (params.nickname) update.nickname = params.nickname;
    if (params.about) update.about = params.about;

    $.model.User.update({_id: user._id}, {$set: update}, callback);
  });

  done();

};
