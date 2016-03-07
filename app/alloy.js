// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function(){

Alloy.Globals.env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
Alloy.Globals.portraitNameTransform = Ti.UI.create2DMatrix().rotate(30.3);
Alloy.Globals.PORTRAIT_DEFAULT_WIDTH = 500;
Alloy.Globals.PORTRAIT_DEFAULT_HEIGHT = 256;
Alloy.Globals.heroesListIndex = 0;
Alloy.Globals.color = {
    "colorPrimary": "#1565C0",
    "colorPrimaryDark": "#0D47A1",
    "colorText": "#99000000",
    "colorAccent": "#4527A0",
    "colorControlNormal": "#757575",
    "colorControlActivated": "#1565C0",
    "colorControlHighlight": "#1976D2",
    "colorSwitchThumbNormal": "#BDBDBD",
    "android:colorButtonNormal": "#BDBDBD",
    "android:colorEdgeEffect": "#1565C0",
    "android:colorEdgeEffect": "#99000000",
};

})();

