# mobilemovement.js

MobileMovement is a JavaScript library - WAIT!!! WARNING!! Do NOT ever use this library or any product built with this library. The author takes no responsibility for damaged items (including people) that result from using this library.

Ok, now that the legal stuff is out of the way (you never can be too careful)...

MobileMovement detects a bunch of common movements from your mobile phone browser while you are holding your phone in your hand (think of it kind of like if your phone was a Nintendo Wii controller), and lets you apply callback functions for any of these movements. You can also register your own movements.

A working example can be seen here:

http://www.timlongcreative.com/libraries/mobilemovement/mobilemovement-demo-1.html

## Basic Usage

After referencing the MobileMovement script from your webpage, you can create a MobileMovement object with a simple line of code:

```javascript
var mm = new MobileMovement();
```

Then use the object's `.on` method to add callbacks for the numerous registered movements:

```javascript
mm.on("basketball shot", function() { alert("Two points!"); });
```

If you want to remove that callback later, use the object's `.off` method:

```javascript
mm.off("basketball shot");
```

When you add a callback with the `.on` method, this callback accepts one parameter - a primitive JavaScript object with three options: movement, actionKey, and event.

```javascript
mm.on("basketball shot", function(info) {
		console.log(info.movement); // Logs the monitored movement object defined by "basketball shot"
		console.log(info.actionKey); // Logs the string "basketball shot"
		console.log(info.event.alpha); // Logs the alpha component of the DeviceOrientation event triggering the callback
	});
```

## Options

When invoking the constructor, the one available option is a simple object called "on". This can be used as shorthand to define multiple movement callbacks immediately upon creation of the MobileMovement object. Here is an example:

```javascript
var mm = new MobileMovement({
		on: {
			"basketball shot": function() {alert("Nice shot!");},
			"fishing line cast": function(callbackOptions) { alert(callbackOptions.acionKey + ". Great day for fishing!"); }
		}
});
```

## Registering New Movements

To register a new movement that is not already in the library, use the `.registerMovement` method. There are two required parameters: a string name for the action (this shouldn't match any movements that are already registered), and an array describing the lower/upper bounds where the coordinates should fall, or an amount the property should vary, in each step of a path that would create the movement. These coordinates are alpha, beta, and gamma from the DeviceOrientationEvent object - you only need to put those that affect the movement. There is an optional third parameter (a function describing the callback for this action) and an optional fourth parameter (a number defining how many milliseconds to wait after a callback is invoked before starting the movement detection again; this defaults to 500). The third and fourth parameter will rarely be used. In the example below, the path required for "basketball three pointer" to be handled has two steps: first beta must be greater than or equal to 110, then beta must end up between 0 and 75:

```javascript
mm.registerMovement("basketball three pointer", [
			{beta: [110, Infinity]},
			{beta: [0, 75]}
		]);
```

If the specific coordinate range isn't important, but rather how much a value has changed, you can set beta (respectively, alpha, gamma) to a number instead of an array. This is useful for working with alpha values. In the example below, "basketball three pointer" will be handled when beta has decreased by 35 degrees (the movement must decrease for the full 35 degrees without increasing; if beta increases then the tracking restarts at the next decrease).

```javascript
mm.registerMovement("basketball three pointer", [
			{beta: -35}
		]);
```

See below for a full list of preloaded registered movements.

## Preloaded Registered Movements

ball and paddle hit

basketball shot

fishing line cast

swing bat

upside down golf swing

upside down golf putt

basketball dribble

headbang

drum hit

guitar strum

left turn landscape

right turn landscape

left turn portrait

right turn portrait

look up portrait

look down portrait

hadouken

shoryuken

vertical page flip

football pass

door open back

situp

pushup

punch

spoon lift

door opening front

stab

page turn

ball roll

pitch

softball pitch

yoyo down

yoyo up

hammer

frisbee

frisbee left

hadouken facing user

hammer sideways

soda shake

drink

hose turn

drink pour

selfie

broom sweep

drink from bottle

dig

bid

bid facing self

smoke

knife throw

draw gun

run

write

## License

mobilemovement.js is available for use under the MIT License.
