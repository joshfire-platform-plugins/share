define(['woodman'], function (woodman) {
  return function (runtime, params, callback) {

    var logger = woodman.getLogger('add-on share xcodeproj');
    logger.log('started');

    /**
     * Invoke plugman.install on the xcode project
     *
     * @function
     * @param {function} cb Callback
     */
    function plugmanInstall(cb) {
      runtime.plugmanInstall('./Sharekit', function (err) {
        if (err) {
          logger.error('plugmanInstall error', err);
        } else {
          logger.log('we DONE');
        }

        cb(err);
      });
    }


    /**
     * Copy the Sharekit library to the xcode projects' directory
     *
     * @function
     * @param {function} cb Callback
     */
    function copyLibraryToProject(cb) {
      var iOSLibrary = './Sharekit/lib';
      var libDest = 'Sharekit';

      runtime.copyFromAddon(iOSLibrary, libDest, function (err) {
        if (err) {
          logger.warn('copyLibraryToProject copyFromAddonToProject error', err);
        } else {
          logger.log('copyLibraryToProject OK!');
        }

        cb(err);
      });
    }

    /**
     * Do all the fancy business...
     *
     * @function
     * @param {function} cb Callback
     */
    function customSharekitInstall(cb) {
      runtime.installSharekit(function (err) {
        if (err) {
          logger.warn('customSharekitInstall installSharekit error', err);
        } else {
          logger.log('customSharekitInstall OK!');
        }

        cb(err);
      });
    }

    /**
     * Updates the Sharekit config source file (Plugins/MySHKConfigurator.m)
     * with the facebook and twitter keys/secrets
     *
     * @function
     * @param {function} cb Callback
     */
    function updateSharekitConfig(cb) {
      var err;
      var options = params.options;

      if (!options) {
        err = new Error('no options parameters.. can\'t retrieve app key/secrets');
        logger.warn('updateSharekitConfig error', err);
        cb(err);
      }

      var appURL        = options['app-url'];
      var fbAppKey      = options['fb-app-key'];
      var twitterKey    = options['twitter-consumer-key'];
      var twitterSecret = options['twitter-secret'];

      var replaceMap = {
        '___JOSHFIRE_APP_NAME___'             : params.projectname,
        '___JOSHFIRE_APP_URL___'              : appURL,
        '___JOSHFIRE_FACEBOOK_APP_ID___'      : fbAppKey,
        '___JOSHFIRE_TWITTER_CONSUMER_KEY___' : twitterKey,
        '___JOSHFIRE_TWITTER_SECRET___'       : twitterSecret
      };

      logger.log('updateSharekitConfig replaceMap', replaceMap);

      var configFilePath = 'Plugins/MySHKConfigurator.m';

      runtime.multipleReplaceInFile(configFilePath, replaceMap, function (err) {
        if (err) {
          logger.warn('updateSharekitConfig multipleReplaceInFile error', err);
        } else {
          logger.log('updateSharekitConfig OK!');
        }

        cb(err);
      });
    }

    /**
     * the last two methods need plugman.install to have run (for all the files
     * to be available in the xcode project)
     * these last two methods could be executed in parallel but a single async.series
     * is better for simplicity
     */
    runtime.async.series([
      plugmanInstall,
      copyLibraryToProject,
      customSharekitInstall,
      updateSharekitConfig
    ], function (err) {
      if (err) {
        logger.warn('main async.series error', err);
      } else {
        logger.log('DONE');
      }

      callback(err);
    });
  };
});