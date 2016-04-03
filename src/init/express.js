'use strict';

/**
 * nodejs practise project
 *
 * @author Betis Yeon <betis.yeon@gmail.com>
 *
 */
import Path from 'path';
import Express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import Multiparty from 'connect-multiparty';
import session from 'express-session';
/*import _RedisStore from 'connect-redis';
const RedisStore = _RedisStore(session);
*/
module.exports = function (done) {

  const debug = $.createDebug('init:express');
  debug('Initiating the Express...');

  const app = Express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(Multiparty());
  app.use(session({
    secret: $.config.get('web.session.secret'),
    //store: new RedisStore($.config.get('web.session.redis')),
  }));

  const router = Express.Router();

  const routerWrap = {};
  ['get', 'head', 'post', 'put', 'del', 'delete'].forEach(method => {
    routerWrap[method] = function(path, ...fnList){
      fnList = fnList.map(fn => {
        return function(req, res, next){
          const ret = fn(req, res, next);
          //if (ret.catch) ret.catch(next);
          if (ret && ret.catch) ret.catch(next);
        };
      });
      router[method](path, ...fnList);
    };
  });
  $.router = routerWrap;

  app.use(function (req, res, next) {
    res.apiSuccess = function (data) {
      res.json({success: true, result: data});
    };
    next();
  });

  app.use(router);
  app.use('static', serveStatic(Path.resolve(__dirname, '../../static')));
  app.use('/api', function (err, req, res, next) {
    debug('API error: %s', err && err.stack || err);
    res.json({error: err.toString()});
  });

  app.listen($.config.get('web.port'), (err) => {
    done(err);
  });
};
