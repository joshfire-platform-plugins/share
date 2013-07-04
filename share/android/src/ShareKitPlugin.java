/**
 *
 * Phonegap share plugin for Android
 * Joshfire 2013
 *
 */

package com.joshfire.phonegap.plugins.share;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;

public class ShareKitPlugin extends CordovaPlugin {

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if ("share".equals(action)) {
      String message = args.getString(0);
      String url = args.getString(1);
      this.doSendIntent(message, url);
      return true;
    }
    return false;  // Returning false results in a "MethodNotFound" error.
  }

  private void doSendIntent(String message, String url) {
    System.out.println("send intent");
    Intent sendIntent = new Intent(android.content.Intent.ACTION_SEND);
    sendIntent.setType("text/plain");
    sendIntent.putExtra(android.content.Intent.EXTRA_SUBJECT, message);
    sendIntent.putExtra(android.content.Intent.EXTRA_TEXT, url);
    this.cordova.startActivityForResult(this, sendIntent, 0);
  }

}
