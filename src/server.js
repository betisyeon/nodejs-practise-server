'use strict';

/**
 * nodejs practise project
 *
 * @author Betis Yeon <betis.yeon@gmail.com>
 *
 */

import Path from 'path';
import ProjectCore from 'project-core';
import Mongoose from 'mongoose';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();

// 创建Debug函数
$.createDebug = function(name) {
  return createDebug('My '+ name);
};
const debug = $.createDebug('server');



// 加载配置文件
$.init.add((done) => {
  $.config.load(Path.resolve(__dirname, 'config.js'));
  const env = process.env.NODE_ENV || null;
  if (env) {
    debug('load env: %s', env);
    $.config.load(Path.resolve(__dirname, '../config', env + '.js'));
  }
  $.env = env;
  done();
});

// 初始化MongoDB
$.init.load(Path.resolve(__dirname, 'init', 'mongodb.js'));
// 加载Models文件夹中的所有文件
$.init.load(Path.resolve(__dirname, 'models'));
// 加载methods
$.init.load(Path.resolve(__dirname, 'methods'));
// 初始化Express
$.init.load(Path.resolve(__dirname, 'init', 'express.js'));
// 初始化路由
$.init.load(Path.resolve(__dirname, 'routes'));

// 初始化
$.init((err) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  } else {
    console.log('inited [env=%s].', $.env);
  }
  //require('./test');
/*
  const item = new $.model.User({
    name: `User${$.utils.date('Ymd')}`,
    password: '123456',
    nickname: '测试用户'
  });

  item.save(console.log);
  */
});
