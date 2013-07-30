//
//  MySHKConfigurator.m
//  Joshfire Factory Project
//
//  Created by Joshfire on 27/06/13.
//
//

#import "MySHKConfigurator.h"

@implementation MySHKConfigurator

- (NSString*)appName {
	return @"___JOSHFIRE_APP_NAME___";
}

- (NSString*)appURL {
	return @"___JOSHFIRE_APP_URL___";
}

- (NSString*)facebookAppId {
	return @"___JOSHFIRE_FACEBOOK_APP_ID___";
}

/*
 Favorite Sharers
 ----------------
 These values are used to define the default favorite sharers appearing on ShareKit's action sheet.
 */
- (NSArray*)defaultSharers {
    // if iOS 6 or greater show all three: FB, Twitter, Mail
    // if lower
    //    if fbAppId is set, show all three
    //    if not, only show Twitter & Mail
    NSString *reqSysVer = @"6.0";
    NSString *currSysVer = [[UIDevice currentDevice] systemVersion];
    BOOL iOS6OrGreater = ([currSysVer compare:reqSysVer options:NSNumericSearch] != NSOrderedAscending);
    BOOL fbAppIdUndefined = [self.facebookAppId isEqualToString:@"undefined"];

    NSArray* fbTwitterMail = [NSArray arrayWithObjects:@"SHKFacebook", @"SHKTwitter", @"SHKMail", nil];

    if (iOS6OrGreater) {
        return fbTwitterMail;
    } else {
        if (fbAppIdUndefined) {
            return [NSArray arrayWithObjects:@"SHKTwitter", @"SHKMail", nil];
        } else {
            return fbTwitterMail;
        }
    }
}

- (NSArray*)defaultFavoriteURLSharers {
    return [self defaultSharers];
}
- (NSArray*)defaultFavoriteImageSharers {
    return [self defaultSharers];
}
- (NSArray*)defaultFavoriteTextSharers {
    return [self defaultSharers];
}

// SHKActionSheet settings
- (NSNumber*)showActionSheetMoreButton {
	return [NSNumber numberWithBool:false];// Setting this to true will show More... button in SHKActionSheet, setting to false will leave the button out.
}

@end
