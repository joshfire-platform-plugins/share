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

- (NSString*)twitterConsumerKey {
	return @"___JOSHFIRE_TWITTER_CONSUMER_KEY___";
}

- (NSString*)twitterSecret {
	return @"___JOSHFIRE_TWITTER_SECRET___";
}

/*
 Favorite Sharers
 ----------------
 These values are used to define the default favorite sharers appearing on ShareKit's action sheet.
 */
- (NSArray*)defaultFavoriteURLSharers {
    return [NSArray arrayWithObjects:@"SHKFacebook", @"SHKTwitter", @"SHKMail", nil];
}
- (NSArray*)defaultFavoriteImageSharers {
    return [NSArray arrayWithObjects:@"SHKFacebook", @"SHKTwitter", @"SHKMail", nil];
}
- (NSArray*)defaultFavoriteTextSharers {
    return [NSArray arrayWithObjects:@"SHKFacebook", @"SHKTwitter", @"SHKMail", nil];
}

// SHKActionSheet settings
- (NSNumber*)showActionSheetMoreButton {
	return [NSNumber numberWithBool:false];// Setting this to true will show More... button in SHKActionSheet, setting to false will leave the button out.
}

@end
