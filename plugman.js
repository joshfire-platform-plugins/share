define(['woodman'], function (woodman) {
  return function (runtime, params, callback) {
    var logger = woodman.getLogger('add-on share plugman');
    logger.log('started');

    /**
     * Invoke plugman.install on the android or xcode project
     *
     * @function
     * @param {function} cb Callback
     */
    function plugmanInstall(cb) {
      var err;
      var options = params.options;

      if (!options) {
        err = new Error('no options parameters.. can\'t retrieve app key/secrets');
        logger.warn('plugmanInstall error', err);
        cb(err);
      }

      var fbAppKey = options['fb-app-key'];
      var replaceMap = {
        'FB_APP_ID' : fbAppKey
      };

      logger.log('plugmanInstall replaceMap', replaceMap);
      runtime.plugmanInstall('./share', replaceMap, function (err) {
        if (err) {
          logger.error('plugmanInstall error', err);
        } else {
          logger.log('we DONE');
        }

        cb(err);
      });
    }

    plugmanInstall(callback);
  };
});