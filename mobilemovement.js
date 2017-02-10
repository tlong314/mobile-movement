/**
 * @overview A JavaScript library for mobile web development, that detects various user movements using deviceorientation.
 * @author Tim Scott Long
 * @copyright Tim Scott Long 2017
 * @license Available for use under the MIT license. 
 */
;var MobileMovement = (function() {
	var self,
		latestVals = {
			alpha: 0,
			beta: 0,
			gamma: 0,
			uninitialized: true
		},
		longestStretch = {
			alpha: 0,
			beta: 0,
			gamma: 0
		};

	/**
	 * @description Constructor function for creating MobileMovement objects.
	 * @param {Object} opts - A primitive object of options. Currently only option is an object called "on", that serves as a shorthand way to apply the MobileMovement.prototype.on method upon creation of the MobileMovement object.
	 * @returns {Object} - The current referenced MobileMovement object.
	 */
	var MobileMovement = function(opts) {
		var defaults = {
			on: {}
		};
		
		 self = this;

		if(!opts) {
			opts = {};
		}

		for(var x in defaults) {
			opts[x] = opts[x] || defaults[x];
		}

		this.registeredMovements = {};
		this.monitoredMovements = {};

		if(window.DeviceOrientationEvent) {
			window.addEventListener("deviceorientation", reactToDeviceMove, false);
		}
 
		// Create numerous custom movement detection objects.
		this.registerMovement("ball and paddle hit", [
			{beta: [-Infinity, 4.9999]},
			{beta: [5, Infinity]}
		]);
		
		this.registerMovement("basketball shot", [
			{beta: [90, Infinity]},
			{beta: [0, 75]}
		]);

		this.registerMovement("fishing line cast", [
			{beta: [90, Infinity]},
			{beta: [0, 75]}
		]);

		this.registerMovement("swing bat", [
			{alpha: 60}
		]);
		
		this.registerMovement("upside down golf swing", [
			{beta: [-30, Infinity]},
			{beta: [-Infinity, -85]}
		]);

		this.registerMovement("upside down golf putt", [
			{beta: [-75, Infinity]},
			{beta: [-Infinity, -85]}
		]);

		this.registerMovement("basketball dribble", [
			{beta: [5, Infinity]},
			{beta: [-Infinity, 0]}
		]);

		this.registerMovement("headbang", [
			{gamma: [-Infinity, -75]},
			{gamma: [-65, Infinity]}
		]);
		
		this.registerMovement("drum hit", [
			{beta: [30, Infinity]},
			{beta: [-Infinity, 10]}
		]);

		this.registerMovement("guitar strum", [
			{beta: [10, Infinity]},
			{beta: [-Infinity, 5]}
		]);

		// This assumes that the top of the phone is facing left.
		this.registerMovement("left turn landscape", [			
			{beta: [-5, Infinity]},
			{beta: [-Infinity, -5]}
		]);

		// This assumes that the top of the phone is facing left.
		this.registerMovement("right turn landscape", [
			{beta: [-Infinity, 5]},
			{beta: [5, Infinity]}
		]);

		this.registerMovement("left turn portrait", [
			{alpha: 70}
		]);

		this.registerMovement("right turn portrait", [
			{alpha: -70}
		]);

		this.registerMovement("look up portrait", [
			{beta: [-Infinity, 70]},
			{beta: [100, Infinity]}
		]);
		
		this.registerMovement("look down portrait", [
			{beta: [51, Infinity]},
			{beta: [-Infinity, 50]}
		]);

		this.registerMovement("hadouken", [
			{beta: [150, Infinity]},
			{beta: [-Infinity, 110]}
		]);

		this.registerMovement("shoryuken", [
			{beta: [-Infinity, -155]},
			{beta: [-110, Infinity]}
		]);
		
		this.registerMovement("vertical page flip", [
			{beta: [40, Infinity]},
			{beta: [-Infinity, 20]}
		]);

		this.registerMovement("football pass", [
			{beta: [5, Infinity]},
			{beta: [-Infinity, -10]}
		]);

		this.registerMovement("door open back", [
			{gamma: [0, Infinity]},
			{gamma: [-Infinity, 0]}
		]);
		
		this.registerMovement("situp", [
			{beta: [-Infinity, 10]},
			{beta: [45, Infinity]}
		]);
		
		this.registerMovement("pushup", [
			{beta: [-Infinity, 25]},
			{beta: [60, Infinity]}
		]);

		this.registerMovement("punch", [
			{beta: [40, Infinity]},
			{beta: [-Infinity, 10]}
		]);
		
		// Like lifting your spoon from a bowl of cereal.
		this.registerMovement("spoon lift", [
			{beta: [-Infinity, -20]},
			{beta: [-10, Infinity]}
		]);

		this.registerMovement("door opening front", [
			{gamma: [-Infinity, 0]},
			{gamma: [0, Infinity]}
		]);

		// holding phone upside down, stabbing down like a knife
		this.registerMovement("stab", [
			{beta: [-60, Infinity]},
			{beta: [-Infinity, -70]}
		]);
		
		this.registerMovement("page turn", [
			{gamma: [0, Infinity]},
			{gamma: [-Infinity, 0]}
		]);

		this.registerMovement("ball roll", [
			{beta: [-Infinity, -90]},
			{beta: [-75, Infinity]}
		]);

		// Or baseball pitch or pitch baseball
		this.registerMovement("pitch", [
			{beta: [90, Infinity]},
			{beta: [-Infinity, 40]}
		]);
		
		this.registerMovement("softball pitch", [
			{beta: [-Infinity, -25]},
			{beta: [-10, Infinity]}
		]);

		this.registerMovement("yoyo down", [
			{beta: [0, Infinity]},
			{beta: [-Infinity, 0]}
		]);

		this.registerMovement("yoyo up", [
			{beta: [-Infinity, 0]},
			{beta: [0, Infinity]}
		]);
		
		this.registerMovement("hammer", [
			{beta: [22, Infinity]},
			{beta: [-Infinity, 12]}
		]);
		
		// This assumes right-handed
		this.registerMovement("frisbee", [
			{alpha: -60}
		]);

		this.registerMovement("frisbee left", [
			{alpha: 60}
		]);

		// Hadouken with the device facing the user
		this.registerMovement("hadouken facing user", [
			{beta: [-Infinity, 7]},
			{beta: [65, Infinity]}
		]);
		
		// hammer swing, holding the phone sideways
		this.registerMovement("hammer sideways", [
			{beta: [35, Infinity]},
			{beta: [-Infinity, 20]}
		]);

		this.registerMovement("frisbee left", [
			{alpha: -60}
		]);

		this.registerMovement("left turn landscape", [
			{beta: [0, Infinity]},
			{beta: [-Infinity, -25]}
		]);
		
		this.registerMovement("right turn landscape", [
			{beta: [-Infinity, 0]},
			{beta: [25, Infinity]}
		]);
		
		this.registerMovement("soda shake", [
			{alpha: -40},
			{alpha: 40}
		]);

		this.registerMovement("drink", [
			{beta: [120, Infinity]},
			{beta: [-Infinity, 112]}
		]);
		
		this.registerMovement("hose turn", [
			{beta: [-Infinity, 4.9999]},
			{beta: [5, Infinity]}
		]);

		this.registerMovement("drink pour", [
			{beta: [0, Infinity]},
			{beta: [-Infinity, 0]}
		]);

		this.registerMovement("selfie", [
			{beta: [103, 145]}
		],
		function(){},
		2000);
		
		// Holding phone right side up
		this.registerMovement("broom sweep", [
			{gamma: [-45, Infinity]},
			{gamma: [-Infinity, -60]}
		]);

		this.registerMovement("drink from bottle", [
			{beta: [0, Infinity]},
			{beta: [-Infinity, -40]}
		]);

		this.registerMovement("dig", [
			{beta: [30, Infinity]},
			{beta: [-Infinity, 10]}
		]);

		// The next two refer to holding up auction paddles. "bid" is used when the phone faces away, as if it has a number on the screen and the user is bidding.
		this.registerMovement("bid", [
			{beta: [140, Infinity]},
			{beta: [-Infinity, 115]}
		]);
		
		this.registerMovement("bid facing self", [
			{beta: [-Infinity, 30]},
			{beta: [70, Infinity]}
		]);

		// As in, take a puff of a cigarette
		this.registerMovement("smoke", [
			{alpha: [-Infinity, 265]},
			{alpha: [270, Infinity]}
		]);
		
		this.registerMovement("knife throw", [
			{gamma: [0, Infinity]},
			{gamma: [-Infinity, 0]}
		]);
		
		this.registerMovement("draw gun", [
			{beta: [-Infinity, -60]},
			{beta: [-15, Infinity]}
		]);
		
		this.registerMovement("run", [
			{gamma: [20, Infinity]},
			{gamma: [-Infinity, -20]},
			{gamma: [20, Infinity]},
			{gamma: [-Infinity, -20]}
		]);
		
		// With phone right-side up
		this.registerMovement("write", [
			{gamma: [20, Infinity]},
			{gamma: [-Infinity, -20]}
		]);
		
		// Apply callbacks set up in the options
		for(var action in opts.on) {
			opts.on(action, opts.on[action]);
		}

		return self;
	}; // End MobileMovement constructor

	MobileMovement.prototype.constructor = MobileMovement;

	/**
	 * @description Adds a recognized movement to those being monitored, and defines a callback to be invoked each time the movement is completed.
	 * @returns {Object} - The current referenced MobileMovement object.
	 */
	MobileMovement.prototype.on = function(callbackName, responseFunc) {
		this.monitoredMovements[currentCallback] = this.registeredMovements[currentCallback];
		
		this.monitoredMovements[currentCallback].callback = responseFunc || function() {};
		
		return this;
	}; // End MobileMovement.prototype.on()

	/**
	 * @description Removes a recognized movement from those being monitored.
	 * @returns {Object} - The current referenced MobileMovement object.
	 */
	MobileMovement.prototype.off = function(callbackName) {
		delete this.monitoredMovements[callbackName];
		registeredMovements[callbackName].reset();
		return this;
	}; // End MobileMovement.prototype.off()

	/**
	 * @description Names and defines a new physical movement to be recognized.
	 * @param {string} name - A name to define the current movement. This name will be used to define callbacks later on the movement.
	 * @param {Object[]} path - An array of ordered steps that would trigger detection of the entire movement. Each step contains bounds for orientation values.
	 * @param {Object} [callback] - An optional callback function to be invoked each time the movement is completed. Typically this will be added later, after the object is created.
	 * @param {number} [delay] - An optional number of milliseconds to wait after the callback is executed before the movement detection should begin again. Defaults to 500.
	 * @returns {Object} - The current referenced MobileMovement object.
	 */
	MobileMovement.prototype.registerMovement = function(name, path, callback, delay) {
		this.registeredMovements[name] = {
			path: path,
			currentState: 0,
			//*** This is currently set to the entire system, but I am considering whether or not it will help to use it on each movement as a separate property.
			
			/*
			longestStretch: {
				alpha: 0,
				beta: 0,
				gamma: 0
			},
			latestVals: {
				alpha: 0,
				beta: 0,
				gamma: 0,
				uninitialized: true
			},
			*/
			
			watch: {},
			recoilTime: delay || 500,
			callback: callback || function() {},
			reset: function() {
				this.currentState = 0;
				this.callback = function() {};
			}
		};

		for(var i = 0; i < path.length; i++) {
			for(var letter in path[i]) {
				this.registeredMovements[name].watch[letter] = true;
			}
		}
		
		return this;
	}; // End registerMovement()

	/**
	 * @description Gathers current orientation values and checks if monitoredMovements objects are affected.
	 * @param {Object} e - The DeviceOrientationEvent object that triggered this handler.
	 */
	var reactToDeviceMove = function(e) {
		var a = e.alpha || 0,
			b = e.beta || 0,
			c = e.gamma || 0,
			aDiff,
			bDiff,
			cDiff;
		
		// Track movements that depend on a certain length of variation in alpha, beta, or gamma.

		// Set up starting points.
		if(latestVals.uninitialized) {
			latestVals.alpha = a;
			latestVals.beta = b;
			latestVals.gamma = c;

			delete latestVals.uninitialized;
		}

		aDiff = Math.abs(a - latestVals.alpha);
		bDiff = Math.abs(b - latestVals.beta);
		cDiff = Math.abs(c - latestVals.gamma);

		// Shift numbers to account for crossing over 360
		if(a - latestVals.alpha > 300) {
			latestVals.alpha += 360;
		} else if(latestVals.alpha - a > 300) {
			a += 360;
		}
		
		if(b - latestVals.beta > 300) {
			latestVals.beta += 360;
		} else if(latestVals.beta - b > 300) {
			b += 360;
		}
		
		if(c - latestVals.gamma > 300) {
			latestVals.gamma += 360;
		} else if(latestVals.gamma - c > 300) {
			c += 360;
		}
		
		// Reset numbers as necessary.
		
		if(a > latestVals.alpha) { // alpha is going up
			if(longestStretch.alpha >= 0) { // alpha was not going down before, so let's keep going up
				longestStretch.alpha += a - latestVals.alpha;
			} else {
				longestStretch.alpha = 0; // alpha was going down before, so let's reset this movement and try going up again on the next call
			}
		} else { // alpha is going down
			if(longestStretch.alpha <= 0) { // alpha was not going up, so we keep going down (a - latestVals.alpha is negative)
				longestStretch.alpha += a - latestVals.alpha;
			} else {
				longestStretch.alpha = 0; // reset as above
			}
		}
		
		if(b > latestVals.beta) { // beta is going up
			if(longestStretch.beta >= 0) { // beta was not going down before, so let's keep going up
				longestStretch.beta += b - latestVals.beta;
			} else {
				longestStretch.beta = 0; // beta was going down before, so let's reset this movement and try going up again on the next call
			}
		} else { // beta is going down
			if(longestStretch.beta <= 0) { // beta was not going up, so we keep going down (b - latestVals.beta is negative)
				longestStretch.beta += b - latestVals.beta;
			} else {
				longestStretch.beta = 0; // reset as above
			}
		}

		if(c > latestVals.gamma) { // gamma is going up
			if(longestStretch.gamma >= 0) { // gamma was not going down before, so let's keep going up
				longestStretch.gamma += c - latestVals.gamma;
			} else {
				longestStretch.gamma = 0; // gamma was going down before, so let's reset this movement and try going up again on the next call
			}
		} else { // gamma is going down
			if(longestStretch.gamma <= 0) { // gamma was not going up, so we keep going down (c - latestVals.gamma is negative)
				longestStretch.gamma += c - latestVals.gamma;
			} else {
				longestStretch.gamma = 0; // reset as above
			}
		}
		
		a %= 360;
		b %= 360;
		c %= 360;
		
		for(var action in self.monitoredMovements) {			
			if(inBounds(e, action)) {
				advanceCurrentState(self.monitoredMovements[action], action);
			}
		}

		latestVals.alpha = a;
		latestVals.beta = b;
		latestVals.gamma = c;
	}; // End reactToDeviceMove()

	/**
	 * @description Determines whether or not the given orientation event object is within the bounds of a movement's current path step.
	 * @param {Object} e - the DeviceOrientationEvent object whose orientation values will be used for the check.
	 * @param {string} actionKey - The name of the movement being checked.
	 * @returns {boolean}
	 */
	var inBounds = function(e, actionKey) {
		var a = e.alpha,
			b = e.beta,
			c = e.gamma,
			pathIndex = self.monitoredMovements[actionKey].currentState,
			bounds = self.monitoredMovements[actionKey].path[pathIndex];
		
		// Waiting for recoil to take effect.
		if(pathIndex >= self.monitoredMovements[actionKey].path.length) {
			return false;
		}

		if(inPropertyBounds(e, actionKey, "alpha", bounds) && inPropertyBounds(e, actionKey, "beta", bounds) && inPropertyBounds(e, actionKey, "gamma", bounds)) {
			return true;
		}
		

		return false;
	}; // End inBounds()

	/**
	 * @description Checks conditions in a path step for alpha, beta, and gamma DeviceOrientation properties.
	 * @param {Object} ortnEvent - The original orientation event being used to check the current step.
	 * @param {string} actionKey - The string name of the registered movement being checked.
	 * @param {string} letter - The orientation event property being checked ("alpha", "beta", or "gamma").
	 * @param {Object[]|number} bounds - A 2-element array containing the lower and upper bounds of the step being checked.
	 * @returns {boolean}
	 */
	var inPropertyBounds = function(ortnEvent, actionKey, letter, bounds) {

		// Ignore properties that aren't being tracked.
		if(!self.monitoredMovements[actionKey].watch[letter]) {
			return true;
		}

		if(Array.isArray(bounds[letter])) { // This path step has been defined as an array of two values (a lower bound and an upper bound).
			if((bounds[letter][0] <= ortnEvent[letter] && ortnEvent[letter] <= bounds[letter][1])) {
				return true;
			}
		} else { // This path step has been defined by a variation amount of an orientation value, so the property is of type "number".
			if(bounds[letter] > 0 && longestStretch[letter] >= bounds[letter]) {
				longestStretch[letter] = 0;
				return true; 
			} else if(bounds[letter] < 0 && longestStretch[letter] <= bounds[letter]) {
				longestStretch[letter] = 0;
				return true;
			}
		}
		
		return false;
	}; // End inPropertyBounds()
	
	/**
	 * @description Increments the current state of the movement object, and invokes the callback if the end of the object's path has been reached.
	 * @param {Object} obj - The registeredMovement object whose currentState is being incremented.
	 * @param {string} action - The registered name of the movement.
	 */
	var advanceCurrentState = function(obj, action) {
		obj.currentState++;
		if(obj.currentState === obj.path.length) {
			obj.callback();
			
			setTimeout(function(){
				if(self.monitoredMovements[action]) { // that is, if it hasn't been removed already
					self.monitoredMovements[action].currentState = 0;
				}
			}, self.monitoredMovements[action].recoilTime);
		}
	}; // End advanceCurrentState()

	// Expose the constructor to the global scope
	return MobileMovement;
}());