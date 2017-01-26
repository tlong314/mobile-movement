# mobilemovement.js

MobileMovement is a JavaScript library - WAIT!!! WARNING!! Do NOT ever use this library or any product built with this library. The author takes no responsibility for damaged items (including people) that result from using this library.

Ok, now that the legal stuff is out of the way (you never can be too careful)...

MobileMovement detects a bunch of common movements from your mobile phone browser while you are holding your phone in your hand (think of it kind of like if your phone was a Nintendo Wii controller), and lets you apply callback functions for any of these movements. You can also register your own movements.

After referencing the MobileMovement script from your webpage, you can create a MobileMovement object with a simple line of code:

```
var mm = new MobileMovement();
```

Then use the object's `.on` method to add callbacks for the numerous registered movements:

```
mm.on("basketball shot", function() { alert("Two points!"); });
```

If you want to remove that callback later, use the object's `.off` method:

```
mm.off("basketball shot");
```

To register a new movement that is not already in the library, use the `.registerMovement` method. There are two required parameters: a string name for the action (this shouldn't match any movements that are already registered), and an array describing where the coordinates should fall in each step of a path that would create the movement. These coordinates are alpha, beta, and gamma from the DeviceOrientationEvent object - you only need to put those that affect the movement. There is an optional third parameter (a function describing the callback for this action) and an optional fourth parameter (a number defining how many milliseconds to wait after a callback is invoked before starting the movement detection again; this defaults to 500). The third and fourth parameter will rarely be used. Example:

```
mm.registerMovement("basketball three pointer", [
			{beta: [110, Infinity]},
			{beta: [0, 75]}
		]);
```

See the library constructor for a full list of registered movements.

## Options

Currently the only available option is a simple object called "on". This can be used as shorthand to define multiple movement callbacks immediately upon creation of the MobileMovement object. Here is an example:

```
var mm = new MobileMovement({
		on: {
			"basketball shot": function() {alert("Nice shot!");},
			"fishing line cast": function() {alert("Great day for fishing!");}
		}
});
```

## License

mobilemovement.js is available for use under the MIT License.
