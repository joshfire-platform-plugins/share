define(['woodman'], function (woodman) {
  return function (runtime, params, callback) {

    var logger = woodman.getLogger('add-on share xcodeproj');
    logger.log('started');

    /**
     * Copy the Sharekit library to the xcode projects' directory
     *
     * @function
     * @param {function} cb Callback
     */
    function copyLibraryToProject(cb) {
      var iOSLibrary = './share/ios/lib';
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
     * Injects source code in AppDelegate.m at various placeholders:
     *  - imports
     *  - source
     *
     * TODO: prepend rather than replace the placeholders so we can potentially
     * inject more code.
     *
     * @function
     * @param {function} cb Callback
     */
    function injectInApplicationSrc(cb) {
      // 4 space indent
      var indent = '    ';

      var imports = [
        '#import "SHK.h"',
        '#import "SHKConfiguration.h"',
        '#import "MySHKConfigurator.h"',
        '#import "SHKFacebook.h"'
        // '#import "SHKDropbox.h"',
        // '#import "SHKGooglePlus.h"',
        // '#import "EvernoteSDK.h"',
        // '#import "SHKBuffer.h"',
        // '#import "PocketAPI.h"'
      ].join('\n');

      var onLaunch = [
        '// Sharekit',
        indent + 'DefaultSHKConfigurator *configurator = [[[MySHKConfigurator alloc] init] autorelease];',
        indent + '[SHKConfiguration sharedInstanceWithConfigurator:configurator];'
      ].join('\n');

      // src code file to inject in src
      var srcToInjectPath = 'share/ios/src/AppDelegate.m';
      runtime.readFileFromAddon(srcToInjectPath, function (err, src) {
        if (err) {
          logger.warn('injectInApplicationSrc readFileFromAddon error', err);
          cb(err);
        }

        var replaceMap = {
          '\\/\\*\\*___JOSHFIRE_IMPORT_PLACEHOLDER___\\*\\*\\/': imports,
          '\\/\\*\\*___JOSHFIRE_LAUNCH_PLACEHOLDER___\\*\\*\\/': onLaunch,
          '\\/\\*\\*___JOSHFIRE_SRC_PLACEHOLDER___\\*\\*\\/'   : src
        };

        // we should do something like 'prepend' so we can inject more...

        logger.log('injectInApplicationSrc replaceMap', replaceMap);

        var fpath = 'Classes/AppDelegate.m';
        logger.log('injectInApplicationSrc fpath', fpath);

        runtime.multipleReplaceInFile(fpath, replaceMap, function (err) {
          if (err) {
            logger.warn('injectInApplicationSrc multipleReplaceInFile error', err);
          } else {
            logger.log('injectInApplicationSrc OK!');
          }

          cb(err);
        });
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

      var fbAppURL = options['fb-app-url'] || 'http://www.joshfire.com';
      var fbAppKey = options['fb-app-key'];

      var replaceMap = {
        '___JOSHFIRE_APP_NAME___'             : params.projectname,
        '___JOSHFIRE_APP_URL___'              : fbAppURL,
        '___JOSHFIRE_FACEBOOK_APP_ID___'      : fbAppKey
      };

      logger.log('updateSharekitConfig replaceMap', replaceMap);

      var configFilePath = 'Plugins/com.joshfire.phonegap.plugins.SharePlugin/MySHKConfigurator.m';

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
      copyLibraryToProject,
      customSharekitInstall,
      injectInApplicationSrc,
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