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
import Multiparty from 'multiparty';

module.exports = function (done) {

  const debug = $.createDebug('init:express');
  debug('Initiating the Express...');

  const app = Express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  const router = Express.Router();
  $.router = router;

  app.use(router);
  app.use('static', serveStatic(Path.resolve(__dirname, '../../static')));

  app.listen($.config.get('web.port'), (err) => {
    done(err);
  });
};
