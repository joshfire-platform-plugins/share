define(['woodman'], function (woodman) {
  return function (runtime, params, callback) {
    var logger = woodman.getLogger('add-on share injectCordovaPluginJS');
    logger.log('started');

    var jsFilePath = './Sharekit/www/ShareKitPlugin.js';

    /**
     * wrap JS file in IIFE and append it to cordova in bootstrap
     *
     * @function
     * @param {function} cb Callback
     */
    runtime.injectJS(jsFilePath, function (err) {
      if (err) {
        logger.warn('injectJS error', err);
      } else {
        logger.log('done');
      }

      callback(err);
      return;
    });

  };
});