//
//  ShareKitPlugin.js
//
//
//  Created by Erick Camacho on 28/07/11.
//  MIT Licensed
//

function ShareKitPlugin()
{
	console.log('creating plugin');
};

ShareKitPlugin.prototype.share = function(message, url)
{
	cordova.exec(null, null, "ShareKitPlugin", "share", [message, url]);

};


ShareKitPlugin.prototype.isLoggedToTwitter = function( callback )
{

    cordova.exec(callback, null, "ShareKitPlugin", "isLoggedToTwitter", [] );
};

ShareKitPlugin.prototype.isLoggedToFacebook = function( callback )
{

    cordova.exec(callback, null, "ShareKitPlugin", "isLoggedToFacebook", [] );

};

ShareKitPlugin.prototype.logoutFromTwitter = function()
{

    cordova.exec(null, null, "ShareKitPlugin", "logoutFromTwitter", [] );

};

ShareKitPlugin.prototype.logoutFromFacebook = function()
{

    cordova.exec(null, null, "ShareKitPlugin", "logoutFromFacebook", [] );

};


ShareKitPlugin.prototype.facebookConnect = function()
{

    cordova.exec(null, null, "ShareKitPlugin", "facebookConnect", [] );

};

ShareKitPlugin.prototype.shareToFacebook = function( message, url)
{

    cordova.exec(null, null, "ShareKitPlugin", "shareToFacebook", [message, url] );

};

ShareKitPlugin.prototype.shareToTwitter = function( message, url)
{

    cordova.exec(null, null, "ShareKitPlugin", "shareToTwitter", [message, url] );

};

ShareKitPlugin.prototype.shareToMail = function( subject, message)
{

    cordova.exec(null, null, "ShareKitPlugin", "shareToMail", [subject, message] );

};




ShareKitPlugin.install = function()
{
    if (!window.plugins) {
        window.plugins = {};
    }

    window.plugins.shareKit = new ShareKitPlugin();
    window.plugins.share = window.plugins.shareKit.share;

    return;
};

cordova.addConstructor(ShareKitPlugin.install);