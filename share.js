/**
 * @fileoverview Hook handler boilerplate for an in-app hook that executes
 * a user action.
 *
 * The handler must be defined as an AMD module. Dependencies to other add-on
 * javascript files, if any, must start with "./"
 */
define([], function () {
  /**
   * The module returns a factory method that creates a hook handler
   * initialized with the given configuration options.
   *
   * The configuration options are those entered by the Factory user
   * in the add-on configuration pane. They follow the schema defined
   * in the manifest file's "options" property (if any).
   */
  return function (config) {
    return {
      /**
       * Performs the add-on's main action and calls one of the callback
       * methods once done with the result of the action.
       *
       * This method is mandatory. It should never throw exceptions.
       * Returned data depends on the action (i.e. the hook) considered.
       *
       * Note the use of a success callback and of a failure callback
       * as opposed to the usual "callback with error as first parameter"
       * paradigm, as the method follows the Web Intents specification:
       * http://www.w3.org/TR/web-intents/#invocation-api
       *
       * @function
       * @param {Object} intent User intent description. The template
       *  should set the "data" property to the appropriate data structure
       *  for the action to perform in particular.
       * @param {function} successCallback callback method to call when
       *  the activity is a success.
       * @param {function} failureCallback callback method to call when
       *  the activity results in an error.
       */
      startActivity: function (intent, successCallback, failureCallback) {
        // Identity action that does not transform anything
        window.plugins.share(intent.data.msg, intent.data.url);

        successCallback('okay');
        return;
      }
    };
  };
});