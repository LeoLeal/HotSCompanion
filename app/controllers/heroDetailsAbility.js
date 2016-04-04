// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var skill = $.args.skill;

Ti.API.info('[HERO DETAILS ABILITY CONTROLLER][SKILL]' + JSON.stringify(skill));
