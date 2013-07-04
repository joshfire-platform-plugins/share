define(['woodman'], function (woodman) {
  return function (runtime, params, callback) {

    var logger = woodman.getLogger('add-on share androidproj');
    logger.log('started');

    /**
     * Invoke plugman.install on the android project
     *
     * @function
     */
    function plugmanInstall() {
      runtime.plugmanInstall('./share', function (err) {
        if (err) {
          logger.error('plugmanInstall error', err);
        } else {
          logger.log('we DONE');
        }

        callback(err);
      });
    }

    plugmanInstall();

  };
});