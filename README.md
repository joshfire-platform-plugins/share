# Share plugin

## Platform Support

For iOS, the PhoneGap/Cordova ShareKit plugin is used.

Thank god, Android doesn't need all that bizz, it is simply a share intent.

For now iOS share only supports Facebook, Twitter and Mail.

## Setup

### iOS

ShareKit plugin files are taken from [here](https://github.com/phonegap/phonegap-plugins/tree/master/iOS/ShareKitPlugin) but this repo is getting rather old, so some slight modifications were done to the files:

 * header imports in src/SharekitPlugin.h replaced

```objective-c
#ifdef CORDOVA_FRAMEWORK
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVPluginResult.h>
//#import <Cordova/JSONKit.h>

#else
#import "CDVPlugin.h"
#import "CDVPluginResult.h"
//#import "JSONKit.h"
#endif
```

with

```objective-c
#import <Cordova/CDV.h>
```

 * added src/MySHKConfigurator.{h,m} files to configure sharer's keys/secrets

these files are based upon [DefaultSHKConfigurator.{h,m}](https://github.com/ShareKit/ShareKit/tree/master/Classes/ShareKit/Configuration) leaving only the Twitter, Facebook, Mail code and adding placeholders (used by the Factory deployers).

ps: in the future that could be a plist file so the placeholder replacing can be done directly by plugman!

All the ShareKit library xcode setting up was done by carefully following this [guide](https://github.com/ShareKit/ShareKit/wiki/Granular-install).

The ShareKit library is a submodule which itself has submodules, so to update it run:
`git submodule update --init --recursive`

### Android

For Android we used a simple intent, inspired by [this](https://github.com/phonegap/phonegap-plugins/tree/master/Android/Share) but remixed to use todays syntax.

For the JS, to make sure we only have one file/interface, I renamed the java file to ShareKitPlugin to match Sharekits plugin API
