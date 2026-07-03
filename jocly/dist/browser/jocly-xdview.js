// tween.js r5 - http://github.com/sole/tween.js
var TWEEN = TWEEN || function() {
	var a, e, c = 60, b = false, h = [];
	return {
		setFPS : function(f) {
			c = f || 60
		},
		start : function(f) {
			arguments.length != 0 && this.setFPS(f);
			e = setInterval(this.update, 1E3 / c)
		},
		stop : function() {
			clearInterval(e)
		},
		setAutostart : function(f) {
			(b = f) && !e && this.start()
		},
		add : function(f) {
			h.push(f);
			b && !e && this.start()
		},
		getAll : function() {
			return h
		},
		removeAll : function() {
			h = []
		},
		remove : function(f) {
			a = h.indexOf(f);
			a !== -1 && h.splice(a, 1)
		},
		update : function(f) {
			a = 0;
			num_tweens = h.length;
			for (f = f || Date.now(); a < num_tweens;)
				if (h[a].update(f))
					a++;
				else {
					h.splice(a, 1);
					num_tweens--
				}
			num_tweens == 0 && b == true && this.stop()
		}
	}
}();
TWEEN.Tween = function(a) {
	var e = {}, c = {}, b = {}, h = 1E3, f = 0, j = null, n = TWEEN.Easing.Linear.EaseNone, k = null, l = null, m = null;
	this.to = function(d, g) {
		if (g !== null)
			h = g;
		for ( var i in d)
			if (a[i] !== null)
				b[i] = d[i];
		return this
	};
	this.start = function(d) {
		TWEEN.add(this);
		j = d ? d + f : Date.now() + f;
		for ( var g in b)
			if (a[g] !== null) {
				e[g] = a[g];
				c[g] = b[g] - a[g]
			}
		return this
	};
	this.stop = function() {
		TWEEN.remove(this);
		return this
	};
	this.delay = function(d) {
		f = d;
		return this
	};
	this.easing = function(d) {
		n = d;
		return this
	};
	this.chain = function(d) {
		k = d
	};
	this.onUpdate = function(d) {
		l = d;
		return this
	};
	this.onComplete = function(d) {
		m = function() {
			var $this=this;
			setTimeout(function() {
				d.call($this);				
			},0);
		}
		return this
	};
	this.update = function(d) {
		var g, i;
		if (d < j)
			return true;
		d = (d - j) / h;
		d = d > 1 ? 1 : d;
		i = n(d);
		for (g in c)
			a[g] = e[g] + c[g] * i;
		l !== null && l.call(a, i);
		if (d == 1) {
			m !== null && m.call(a);
			k !== null && k.start();
			return false
		}
		return true
	}
};
TWEEN.Easing = {
	Linear : {},
	Quadratic : {},
	Cubic : {},
	Quartic : {},
	Quintic : {},
	Sinusoidal : {},
	Exponential : {},
	Circular : {},
	Elastic : {},
	Back : {},
	Bounce : {}
};
TWEEN.Easing.Linear.EaseNone = function(a) {
	return a
};
TWEEN.Easing.Quadratic.EaseIn = function(a) {
	return a * a
};
TWEEN.Easing.Quadratic.EaseOut = function(a) {
	return -a * (a - 2)
};
TWEEN.Easing.Quadratic.EaseInOut = function(a) {
	if ((a *= 2) < 1)
		return 0.5 * a * a;
	return -0.5 * (--a * (a - 2) - 1)
};
TWEEN.Easing.Cubic.EaseIn = function(a) {
	return a * a * a
};
TWEEN.Easing.Cubic.EaseOut = function(a) {
	return --a * a * a + 1
};
TWEEN.Easing.Cubic.EaseInOut = function(a) {
	if ((a *= 2) < 1)
		return 0.5 * a * a * a;
	return 0.5 * ((a -= 2) * a * a + 2)
};
TWEEN.Easing.Quartic.EaseIn = function(a) {
	return a * a * a * a
};
TWEEN.Easing.Quartic.EaseOut = function(a) {
	return -(--a * a * a * a - 1)
};
TWEEN.Easing.Quartic.EaseInOut = function(a) {
	if ((a *= 2) < 1)
		return 0.5 * a * a * a * a;
	return -0.5 * ((a -= 2) * a * a * a - 2)
};
TWEEN.Easing.Quintic.EaseIn = function(a) {
	return a * a * a * a * a
};
TWEEN.Easing.Quintic.EaseOut = function(a) {
	return (a -= 1) * a * a * a * a + 1
};
TWEEN.Easing.Quintic.EaseInOut = function(a) {
	if ((a *= 2) < 1)
		return 0.5 * a * a * a * a * a;
	return 0.5 * ((a -= 2) * a * a * a * a + 2)
};
TWEEN.Easing.Sinusoidal.EaseIn = function(a) {
	return -Math.cos(a * Math.PI / 2) + 1
};
TWEEN.Easing.Sinusoidal.EaseOut = function(a) {
	return Math.sin(a * Math.PI / 2)
};
TWEEN.Easing.Sinusoidal.EaseInOut = function(a) {
	return -0.5 * (Math.cos(Math.PI * a) - 1)
};
TWEEN.Easing.Exponential.EaseIn = function(a) {
	return a == 0 ? 0 : Math.pow(2, 10 * (a - 1))
};
TWEEN.Easing.Exponential.EaseOut = function(a) {
	return a == 1 ? 1 : -Math.pow(2, -10 * a) + 1
};
TWEEN.Easing.Exponential.EaseInOut = function(a) {
	if (a == 0)
		return 0;
	if (a == 1)
		return 1;
	if ((a *= 2) < 1)
		return 0.5 * Math.pow(2, 10 * (a - 1));
	return 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2)
};
TWEEN.Easing.Circular.EaseIn = function(a) {
	return -(Math.sqrt(1 - a * a) - 1)
};
TWEEN.Easing.Circular.EaseOut = function(a) {
	return Math.sqrt(1 - --a * a)
};
TWEEN.Easing.Circular.EaseInOut = function(a) {
	if ((a /= 0.5) < 1)
		return -0.5 * (Math.sqrt(1 - a * a) - 1);
	return 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
};
TWEEN.Easing.Elastic.EaseIn = function(a) {
	var e, c = 0.1, b = 0.4;
	if (a == 0)
		return 0;
	if (a == 1)
		return 1;
	b || (b = 0.3);
	if (!c || c < 1) {
		c = 1;
		e = b / 4
	} else
		e = b / (2 * Math.PI) * Math.asin(1 / c);
	return -(c * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - e) * 2 * Math.PI
			/ b))
};
TWEEN.Easing.Elastic.EaseOut = function(a) {
	var e, c = 0.1, b = 0.4;
	if (a == 0)
		return 0;
	if (a == 1)
		return 1;
	b || (b = 0.3);
	if (!c || c < 1) {
		c = 1;
		e = b / 4
	} else
		e = b / (2 * Math.PI) * Math.asin(1 / c);
	return c * Math.pow(2, -10 * a) * Math.sin((a - e) * 2 * Math.PI / b) + 1
};
TWEEN.Easing.Elastic.EaseInOut = function(a) {
	var e, c = 0.1, b = 0.4;
	if (a == 0)
		return 0;
	if (a == 1)
		return 1;
	b || (b = 0.3);
	if (!c || c < 1) {
		c = 1;
		e = b / 4
	} else
		e = b / (2 * Math.PI) * Math.asin(1 / c);
	if ((a *= 2) < 1)
		return -0.5 * c * Math.pow(2, 10 * (a -= 1))
				* Math.sin((a - e) * 2 * Math.PI / b);
	return c * Math.pow(2, -10 * (a -= 1))
			* Math.sin((a - e) * 2 * Math.PI / b) * 0.5 + 1
};
TWEEN.Easing.Back.EaseIn = function(a) {
	return a * a * (2.70158 * a - 1.70158)
};
TWEEN.Easing.Back.EaseOut = function(a) {
	return (a -= 1) * a * (2.70158 * a + 1.70158) + 1
};
TWEEN.Easing.Back.EaseInOut = function(a) {
	if ((a *= 2) < 1)
		return 0.5 * a * a * (3.5949095 * a - 2.5949095);
	return 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
};
TWEEN.Easing.Bounce.EaseIn = function(a) {
	return 1 - TWEEN.Easing.Bounce.EaseOut(1 - a)
};
TWEEN.Easing.Bounce.EaseOut = function(a) {
	return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625
			* (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625
			* (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75)
			* a + 0.984375
};
TWEEN.Easing.Bounce.EaseInOut = function(a) {
	if (a < 0.5)
		return TWEEN.Easing.Bounce.EaseIn(a * 2) * 0.5;
	return TWEEN.Easing.Bounce.EaseOut(a * 2 - 1) * 0.5 + 0.5
};

(function() {
	
	var _Tween=TWEEN.Tween;
	
	TWEEN.Tween = function(object) {
		var $this=this;
		$.extend(this,new _Tween(object));
		var _onComplete=this.onComplete;
        this.onComplete = function ( callback ) {
            _onComplete.call($this,function() {
            	setTimeout(function() {
            		callback.call($this);
            	},0);
            });
            return this;
        };
	}
	
	TWEEN.Easing.Linear.EaseNone = TWEEN.Easing.Linear.EaseNone || TWEEN.Easing.Linear.None; 
	TWEEN.Easing.Quadratic.EaseIn = TWEEN.Easing.Quadratic.EaseIn || TWEEN.Easing.Quadratic.In;
	TWEEN.Easing.Quadratic.EaseOut = TWEEN.Easing.Quadratic.EaseOut || TWEEN.Easing.Quadratic.Out;
	TWEEN.Easing.Quadratic.EaseInOut = TWEEN.Easing.Quadratic.EaseInOut || TWEEN.Easing.Quadratic.InOut;
	TWEEN.Easing.Cubic.EaseIn = TWEEN.Easing.Cubic.EaseIn || TWEEN.Easing.Cubic.In; 
	TWEEN.Easing.Cubic.EaseOut = TWEEN.Easing.Cubic.EaseOut || TWEEN.Easing.Cubic.Out;
	TWEEN.Easing.Cubic.EaseInOut = TWEEN.Easing.Cubic.EaseInOut || TWEEN.Easing.Cubic.InOut;
	TWEEN.Easing.Quartic.EaseIn = TWEEN.Easing.Quartic.EaseIn || TWEEN.Easing.Quartic.In;
	TWEEN.Easing.Quartic.EaseOut = TWEEN.Easing.Quartic.EaseOut || TWEEN.Easing.Quartic.Out;
	TWEEN.Easing.Quartic.EaseInOut = TWEEN.Easing.Quartic.EaseInOut || TWEEN.Easing.Quartic.InOut;
	TWEEN.Easing.Quintic.EaseIn = TWEEN.Easing.Quintic.EaseIn || TWEEN.Easing.Quintic.In;
	TWEEN.Easing.Quintic.EaseOut = TWEEN.Easing.Quintic.EaseOut || TWEEN.Easing.Quintic.Out; 
	TWEEN.Easing.Quintic.EaseInOut = TWEEN.Easing.Quintic.EaseInOut || TWEEN.Easing.Quintic.InOut;
	TWEEN.Easing.Sinusoidal.EaseIn = TWEEN.Easing.Sinusoidal.EaseIn || TWEEN.Easing.Sinusoidal.In;
	TWEEN.Easing.Sinusoidal.EaseOut = TWEEN.Easing.Sinusoidal.EaseOut || TWEEN.Easing.Sinusoidal.Out;
	TWEEN.Easing.Sinusoidal.EaseInOut = TWEEN.Easing.Sinusoidal.EaseInOut || TWEEN.Easing.Sinusoidal.InOut;
	TWEEN.Easing.Exponential.EaseIn = TWEEN.Easing.Exponential.EaseIn || TWEEN.Easing.Exponential.In;
	TWEEN.Easing.Exponential.EaseOut = TWEEN.Easing.Exponential.EaseOut || TWEEN.Easing.Exponential.Out;
	TWEEN.Easing.Exponential.EaseInOut = TWEEN.Easing.Exponential.EaseInOut || TWEEN.Easing.Exponential.InOut;
	TWEEN.Easing.Circular.EaseIn = TWEEN.Easing.Circular.EaseIn || TWEEN.Easing.Circular.In;
	TWEEN.Easing.Circular.EaseOut = TWEEN.Easing.Circular.EaseOut || TWEEN.Easing.Circular.Out;
	TWEEN.Easing.Circular.EaseInOut = TWEEN.Easing.Circular.EaseInOut || TWEEN.Easing.Circular.InOut;
	TWEEN.Easing.Elastic.EaseIn = TWEEN.Easing.Elastic.EaseIn || TWEEN.Easing.Elastic.In;
	TWEEN.Easing.Elastic.EaseOut = TWEEN.Easing.Elastic.EaseOut || TWEEN.Easing.Elastic.Out;
	TWEEN.Easing.Elastic.EaseInOut = TWEEN.Easing.Elastic.EaseInOut || TWEEN.Easing.Elastic.InOut;
	TWEEN.Easing.Back.EaseIn = TWEEN.Easing.Back.EaseIn || TWEEN.Easing.Back.In;
	TWEEN.Easing.Back.EaseOut = TWEEN.Easing.Back.EaseOut || TWEEN.Easing.Back.Out;
	TWEEN.Easing.Back.EaseInOut = TWEEN.Easing.Back.EaseInOut || TWEEN.Easing.Back.InOut;
	TWEEN.Easing.Bounce.EaseIn = TWEEN.Easing.Bounce.EaseIn || TWEEN.Easing.Bounce.In;
	TWEEN.Easing.Bounce.EaseOut = TWEEN.Easing.Bounce.EaseOut || TWEEN.Easing.Bounce.Out;
	TWEEN.Easing.Bounce.EaseInOut = TWEEN.Easing.Bounce.EaseInOut || TWEEN.Easing.Bounce.InOut;

})();
/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
/*global THREE, console */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe
//
// This is a drop-in replacement for (most) TrackballControls used in examples.
// That is, include this js file and wherever you see:
//    	controls = new THREE.TrackballControls( camera );
//      controls.target.z = 150;
// Simple substitute "OrbitControls" and the control should work as-is.

THREE.OrbitControls = function ( camera, object, domElement ) {

	this.object = object;
    this.camera = camera;
    
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the control orbits around
	// and where it pans with respect to.
	this.camTarget = new THREE.Vector3();
	// center is old, deprecated; use "camTarget" instead
	this.center = this.camTarget;

	// This option actually enables dollying in and out; left as "zoom" for
	// backwards compatibility
	this.noZoom = false;
	this.zoomSpeed = 1.0;
	// Limits to how far you can dolly in and out
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// Set to true to disable this control
	this.noRotate = false;
	this.rotateSpeed = 1.0;

	// Set to true to disable this control
	this.noPan = false;
	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// Set to true to disable use of the keys
	this.noKeys = false;
	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
	
	// Jocly specific
	this.animControl = null;
	this.enableDrag = true;
	this.targetBounds = [3,3,3];

	////////////
	// internals

	var scope = this;

	var EPS = 0.000001;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	var phiDelta = 0;
	var thetaDelta = 0;
	var scale = 1;
	var pan = new THREE.Vector3();

	var lastPosition = new THREE.Vector3();

	var STATE = { NONE : -1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };
	var state = STATE.NONE;

	// events

	var changeEvent = { type: 'change' };


	this.rotateLeft = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		thetaDelta -= angle;

	};

	this.rotateUp = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		phiDelta -= angle;

	};

	// pass in distance in world space to move left
	this.panLeft = function ( distance ) {

		var panOffset = new THREE.Vector3();
		var te = this.object.matrix.elements;
		// get X column of matrix
		panOffset.set( te[0], te[1], te[2] );
		panOffset.multiplyScalar(-distance);
		
		pan.add( panOffset );

	};

	// pass in distance in world space to move up
	this.panUp = function ( distance ) {

		var panOffset = new THREE.Vector3();
		var te = this.object.matrix.elements;
		// get Y column of matrix
		panOffset.set( te[4], te[5], te[6] );
		panOffset.multiplyScalar(distance);
		
		pan.add( panOffset );
	};
	
	// main entry point; pass in Vector2 of change desired in pixel space,
	// right and down are positive
	this.pan = function ( delta ) {

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		if ( scope.camera.fov !== undefined ) {

			// perspective
			var position = scope.object.position;
			var offset = position.clone().sub( scope.camTarget );
			var targetDistance = offset.length();

			// half of the fov is center to top of screen
			targetDistance *= Math.tan( (scope.camera.fov/2) * Math.PI / 180.0 );
			// we actually don't use screenWidth, since perspective camera is fixed to screen height
			scope.panLeft( 2 * delta.x * targetDistance / element.clientHeight );
			scope.panUp( 2 * delta.y * targetDistance / element.clientHeight );

		} else if ( scope.object.top !== undefined ) {

			// orthographic
			scope.panLeft( delta.x * (scope.object.right - scope.object.left) / element.clientWidth );
			scope.panUp( delta.y * (scope.object.top - scope.object.bottom) / element.clientHeight );

		} else {

			// camera neither orthographic or perspective - warn user
			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );

		}

	};

	this.dollyIn = function ( dollyScale ) {

		if ( dollyScale === undefined ) {

			dollyScale = getZoomScale();

		}

		scale /= dollyScale;

	};

	this.dollyOut = function ( dollyScale ) {

		if ( dollyScale === undefined ) {

			dollyScale = getZoomScale();

		}

		scale *= dollyScale;

	};

	this.update = function () {

		var position = this.object.position;
		var offset = position.clone().sub( this.camTarget );

		// angle from z-axis around y-axis

		var theta = Math.atan2( offset.x, offset.z );

		// angle from y-axis

		var phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

		if ( this.autoRotate ) {

			this.rotateLeft( getAutoRotationAngle() );

		}

		theta += thetaDelta;
		phi += phiDelta;

		// restrict phi to be between desired limits
		phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

		// restrict phi to be betwee EPS and PI-EPS
		phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

		var radius = offset.length() * scale;

		// restrict radius to be between desired limits
		radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );
		
		//console.log("radius",radius,"phi",phi,"theta",theta);
		
		// move target to panned location
		this.camTarget.add( pan );

		offset.x = radius * Math.sin( phi ) * Math.sin( theta );
		offset.y = radius * Math.cos( phi );
		offset.z = radius * Math.sin( phi ) * Math.cos( theta );
		
		if(this.camTarget.x<-this.targetBounds[0])
			this.camTarget.setX(-this.targetBounds[0]);
		if(this.camTarget.x>this.targetBounds[0])
			this.camTarget.setX(this.targetBounds[0]);
		if(this.camTarget.y<-this.targetBounds[1])
			this.camTarget.setY(-this.targetBounds[1]);
		if(this.camTarget.y>this.targetBounds[1])
			this.camTarget.setY(this.targetBounds[1]);
		if(this.camTarget.z<-this.targetBounds[2])
			this.camTarget.setZ(-this.targetBounds[2]);
		if(this.camTarget.z>this.targetBounds[2])
			this.camTarget.setZ(this.targetBounds[2]);

		position.copy( this.camTarget ).add( offset );

		// apparently camera.lookAt is based on the camera relative position
        // in our case, where the camera is attached to an object, we need
        // to temporarily move the camera to this object for lookAt to work
        // properly
        var camPos = new THREE.Vector3();
        camPos.copy(this.camera.position);
        this.camera.position.copy(this.object.position);
		this.camera.lookAt( this.camTarget );
        this.camera.position.copy(camPos);

		thetaDelta = 0;
		phiDelta = 0;
		scale = 1;
		pan.set(0,0,0);

		if ( lastPosition.distanceTo( this.object.position ) > 0 ) {

			if(typeof this.dispatchEvent=="function")
				this.dispatchEvent( changeEvent );

			lastPosition.copy( this.object.position );
		}

	};
	
	this.destroy = function() {
		// things to do there ?
	}

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function onMouseDown( event ) {

		if(THREE.Object3D._threexDomEvent.lockObject(event,scope.enableDrag))
			return;

		if ( scope.enabled === false ) { return; }
		event.preventDefault();
		event.stopPropagation();

		if ( event.button === 0 ) {
			if ( scope.noRotate === true ) { return; }

			state = STATE.ROTATE;

			rotateStart.set( event.clientX, event.clientY );

		} else if ( event.button === 1 ) {
			if ( scope.noZoom === true ) { return; }

			state = STATE.DOLLY;

			dollyStart.set( event.clientX, event.clientY );

		} else if ( event.button === 2 ) {
			if ( scope.noPan === true ) { return; }

			state = STATE.PAN;

			panStart.set( event.clientX, event.clientY );

		}

		// Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
		scope.domElement.addEventListener( 'mousemove', onMouseMove, false );
		scope.domElement.addEventListener( 'mouseup', onMouseUp, false );

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		if ( state === STATE.ROTATE ) {

			if ( scope.noRotate === true ) return;

			rotateEnd.set( event.clientX, event.clientY );
			rotateDelta.subVectors( rotateEnd, rotateStart );

			// rotating across whole screen goes 360 degrees around
			scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
			// rotating up and down along whole screen attempts to go 360, but limited to 180
			scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

			rotateStart.copy( rotateEnd );
			
		} else if ( state === STATE.DOLLY ) {

			if ( scope.noZoom === true ) return;

			dollyEnd.set( event.clientX, event.clientY );
			dollyDelta.subVectors( dollyEnd, dollyStart );

			if ( dollyDelta.y > 0 ) {

				scope.dollyIn();

			} else {

				scope.dollyOut();

			}

			dollyStart.copy( dollyEnd );

		} else if ( state === STATE.PAN ) {

			if ( scope.noPan === true ) return;

			panEnd.set( event.clientX, event.clientY );
			panDelta.subVectors( panEnd, panStart );
			
			scope.pan( panDelta );

			panStart.copy( panEnd );

		}

		trigger();

	}

	function onMouseUp( /* event */ ) {

		if ( scope.enabled === false ) return;

		// Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
		scope.domElement.removeEventListener( 'mousemove', onMouseMove, false );
		scope.domElement.removeEventListener( 'mouseup', onMouseUp, false );

		state = STATE.NONE;

	}

	function onMouseWheel( event ) {
		
		event.stopPropagation();
		event.preventDefault();

		if ( scope.enabled === false || scope.noZoom === true ) return;

		var delta = 0;

		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail ) { // Firefox

			delta = - event.detail;

		}

		if ( delta > 0 ) {

			scope.dollyOut();

		} else {

			scope.dollyIn();

		}
		
		trigger();

	}

	function onMouseOut( event ) {

		if ( scope.enabled === false ) return;
	
		this.mouseIsDown = false;
		state = STATE.NONE;
		
	}
	
	function onKeyDown( event ) {

		if ( scope.enabled === false ) { return; }
		if ( scope.noKeys === true ) { return; }
		if ( scope.noPan === true ) { return; }

		// pan a pixel - I guess for precise positioning?
		// Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
		var needUpdate = false;
		
		switch ( event.keyCode ) {

			case scope.keys.UP:
				scope.pan( new THREE.Vector2( 0, scope.keyPanSpeed ) );
				needUpdate = true;
				break;
			case scope.keys.BOTTOM:
				scope.pan( new THREE.Vector2( 0, -scope.keyPanSpeed ) );
				needUpdate = true;
				break;
			case scope.keys.LEFT:
				scope.pan( new THREE.Vector2( scope.keyPanSpeed, 0 ) );
				needUpdate = true;
				break;
			case scope.keys.RIGHT:
				scope.pan( new THREE.Vector2( -scope.keyPanSpeed, 0 ) );
				needUpdate = true;
				break;
		}

		// Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
		if ( needUpdate ) {

			scope.update();

		}

	}
	
	function touchstart( event ) {

		if(THREE.Object3D._threexDomEvent.lockObject(event,scope.enableDrag))
			return;

		if ( scope.enabled === false ) { return; }

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: rotate
				if ( scope.noRotate === true ) { return; }

				state = STATE.TOUCH_ROTATE;

				rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				break;

			case 2:	// two-fingered touch: dolly
				if ( scope.noZoom === true ) { return; }

				state = STATE.TOUCH_DOLLY;

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );
				dollyStart.set( 0, distance );
				break;

			case 3: // three-fingered touch: pan
				if ( scope.noPan === true ) { return; }

				state = STATE.TOUCH_PAN;

				panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				break;

			default:
				state = STATE.NONE;

		}
		
		trigger();
	}

	function touchmove( event ) {

		if ( scope.enabled === false ) { return; }

		event.preventDefault();
		event.stopPropagation();

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: rotate
				if ( scope.noRotate === true ) { return; }
				if ( state !== STATE.TOUCH_ROTATE ) { return; }

				rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				rotateDelta.subVectors( rotateEnd, rotateStart );

				// rotating across whole screen goes 360 degrees around
				scope.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
				// rotating up and down along whole screen attempts to go 360, but limited to 180
				scope.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

				rotateStart.copy( rotateEnd );
				break;

			case 2: // two-fingered touch: dolly
				if ( scope.noZoom === true ) { return; }
				if ( state !== STATE.TOUCH_DOLLY ) { return; }

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );

				dollyEnd.set( 0, distance );
				dollyDelta.subVectors( dollyEnd, dollyStart );

				if ( dollyDelta.y > 0 ) {

					scope.dollyOut();

				} else {

					scope.dollyIn();

				}

				dollyStart.copy( dollyEnd );
				break;

			case 3: // three-fingered touch: pan
				if ( scope.noPan === true ) { return; }
				if ( state !== STATE.TOUCH_PAN ) { return; }

				panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
				panDelta.subVectors( panEnd, panStart );
				
				scope.pan( panDelta );

				panStart.copy( panEnd );
				break;

			default:
				state = STATE.NONE;

		}

		trigger();

	}

	function touchend( /* event */ ) {

		if ( scope.enabled === false ) { return; }

		state = STATE.NONE;
	}

	function trigger() {
		if(scope.animControl)
			scope.animControl.trigger();
	}

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); event.stopPropagation(); }, false );
	this.domElement.addEventListener( 'mousedown', onMouseDown, false );
	this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
	this.domElement.addEventListener( 'mouseout', onMouseOut, false );
	this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox

	this.domElement.addEventListener( 'keydown', onKeyDown, false );

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );

/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

THREE.DeviceOrientationControls = function( object, changeCallback ) {

	var scope = this;

	this.object = object;

	this.enabled = false;

	this.deviceOrientation = {};
	this.screenOrientation = 0;

	this.alpha = 0;
	this.alphaOffsetAngle = 0;

	this.calibration = true;

	var onDeviceOrientationChangeEvent = function( event ) {

		if(event.alpha!==null || event.beta!==null | event.gamma!==null) {
			scope.object.rotation.reorder( "YXZ" );
			scope.enabled = true;
		}
		scope.deviceOrientation = event;
		changeCallback(scope);

	};

	var onScreenOrientationChangeEvent = function() {

		scope.screenOrientation = window.orientation || 0;
		changeCallback(scope);

	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setObjectQuaternion = function() {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		return function( quaternion, alpha, beta, gamma, orient ) {

			euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler ); // orient the device

			quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

		}

	}();

	this.connect = function() {

		onScreenOrientationChangeEvent(); // run once on load

		window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

	};

	this.disconnect = function() {

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		scope.enabled = false;

	};

	this.update = function() {

		if ( scope.enabled === false ) return;

		if(scope.calibration) {
			scope.calibration = false;
			this.alphaOffsetAngle = - object.rotation.y - THREE.Math.degToRad( scope.deviceOrientation.alpha ) + Math.PI/2;
		}

		var alpha = scope.deviceOrientation.alpha ? THREE.Math.degToRad( scope.deviceOrientation.alpha ) + this.alphaOffsetAngle : 0; // Z
		var beta = scope.deviceOrientation.beta ? THREE.Math.degToRad( scope.deviceOrientation.beta ) : 0; // X'
		var gamma = scope.deviceOrientation.gamma ? THREE.Math.degToRad( scope.deviceOrientation.gamma ) : 0; // Y''
		var orient = scope.screenOrientation ? THREE.Math.degToRad( scope.screenOrientation ) : 0; // O

		setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );
		this.alpha = alpha;

	};

	this.updateAlphaOffsetAngle = function( angle ) {

		this.alphaOffsetAngle = angle;
		this.update();

	};

	this.dispose = function() {

		this.disconnect();

	};

	this.connect();

};

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author julianwa / https://github.com/julianwa
 */

THREE.RenderableObject = function () {

	this.id = 0;

	this.object = null;
	this.z = 0;
	this.renderOrder = 0;

};

//

THREE.RenderableFace = function () {

	this.id = 0;

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();
	this.v3 = new THREE.RenderableVertex();

	this.normalModel = new THREE.Vector3();

	this.vertexNormalsModel = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];
	this.vertexNormalsLength = 0;

	this.color = new THREE.Color();
	this.material = null;
	this.uvs = [ new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2() ];

	this.z = 0;
	this.renderOrder = 0;

};

//

THREE.RenderableVertex = function () {

	this.position = new THREE.Vector3();
	this.positionWorld = new THREE.Vector3();
	this.positionScreen = new THREE.Vector4();

	this.visible = true;

};

THREE.RenderableVertex.prototype.copy = function ( vertex ) {

	this.positionWorld.copy( vertex.positionWorld );
	this.positionScreen.copy( vertex.positionScreen );

};

//

THREE.RenderableLine = function () {

	this.id = 0;

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();

	this.vertexColors = [ new THREE.Color(), new THREE.Color() ];
	this.material = null;

	this.z = 0;
	this.renderOrder = 0;

};

//

THREE.RenderableSprite = function () {

	this.id = 0;

	this.object = null;

	this.x = 0;
	this.y = 0;
	this.z = 0;

	this.rotation = 0;
	this.scale = new THREE.Vector2();

	this.material = null;
	this.renderOrder = 0;

};

//

THREE.Projector = function () {

	var _object, _objectCount, _objectPool = [], _objectPoolLength = 0,
	_vertex, _vertexCount, _vertexPool = [], _vertexPoolLength = 0,
	_face, _faceCount, _facePool = [], _facePoolLength = 0,
	_line, _lineCount, _linePool = [], _linePoolLength = 0,
	_sprite, _spriteCount, _spritePool = [], _spritePoolLength = 0,

	_renderData = { objects: [], lights: [], elements: [] },

	_vector3 = new THREE.Vector3(),
	_vector4 = new THREE.Vector4(),

	_clipBox = new THREE.Box3( new THREE.Vector3( - 1, - 1, - 1 ), new THREE.Vector3( 1, 1, 1 ) ),
	_boundingBox = new THREE.Box3(),
	_points3 = new Array( 3 ),
	_points4 = new Array( 4 ),

	_viewMatrix = new THREE.Matrix4(),
	_viewProjectionMatrix = new THREE.Matrix4(),

	_modelMatrix,
	_modelViewProjectionMatrix = new THREE.Matrix4(),

	_normalMatrix = new THREE.Matrix3(),

	_frustum = new THREE.Frustum(),

	_clippedVertex1PositionScreen = new THREE.Vector4(),
	_clippedVertex2PositionScreen = new THREE.Vector4();

	//

	this.projectVector = function ( vector, camera ) {

		console.warn( 'THREE.Projector: .projectVector() is now vector.project().' );
		vector.project( camera );

	};

	this.unprojectVector = function ( vector, camera ) {

		console.warn( 'THREE.Projector: .unprojectVector() is now vector.unproject().' );
		vector.unproject( camera );

	};

	this.pickingRay = function ( vector, camera ) {

		console.error( 'THREE.Projector: .pickingRay() is now raycaster.setFromCamera().' );

	};

	//

	var RenderList = function () {

		var normals = [];
		var uvs = [];

		var object = null;
		var material = null;

		var normalMatrix = new THREE.Matrix3();

		function setObject( value ) {

			object = value;
			material = object.material;

			normalMatrix.getNormalMatrix( object.matrixWorld );

			normals.length = 0;
			uvs.length = 0;

		}

		function projectVertex( vertex ) {

			var position = vertex.position;
			var positionWorld = vertex.positionWorld;
			var positionScreen = vertex.positionScreen;

			positionWorld.copy( position ).applyMatrix4( _modelMatrix );
			positionScreen.copy( positionWorld ).applyMatrix4( _viewProjectionMatrix );

			var invW = 1 / positionScreen.w;

			positionScreen.x *= invW;
			positionScreen.y *= invW;
			positionScreen.z *= invW;

			vertex.visible = positionScreen.x >= - 1 && positionScreen.x <= 1 &&
					 positionScreen.y >= - 1 && positionScreen.y <= 1 &&
					 positionScreen.z >= - 1 && positionScreen.z <= 1;

		}

		function pushVertex( x, y, z ) {

			_vertex = getNextVertexInPool();
			_vertex.position.set( x, y, z );

			projectVertex( _vertex );

		}

		function pushNormal( x, y, z ) {

			normals.push( x, y, z );

		}

		function pushUv( x, y ) {

			uvs.push( x, y );

		}

		function checkTriangleVisibility( v1, v2, v3 ) {

			if ( v1.visible === true || v2.visible === true || v3.visible === true ) return true;

			_points3[ 0 ] = v1.positionScreen;
			_points3[ 1 ] = v2.positionScreen;
			_points3[ 2 ] = v3.positionScreen;

			return _clipBox.intersectsBox( _boundingBox.setFromPoints( _points3 ) );

		}

		function checkBackfaceCulling( v1, v2, v3 ) {

			return ( ( v3.positionScreen.x - v1.positionScreen.x ) *
				    ( v2.positionScreen.y - v1.positionScreen.y ) -
				    ( v3.positionScreen.y - v1.positionScreen.y ) *
				    ( v2.positionScreen.x - v1.positionScreen.x ) ) < 0;

		}

		function pushLine( a, b ) {

			var v1 = _vertexPool[ a ];
			var v2 = _vertexPool[ b ];

			_line = getNextLineInPool();

			_line.id = object.id;
			_line.v1.copy( v1 );
			_line.v2.copy( v2 );
			_line.z = ( v1.positionScreen.z + v2.positionScreen.z ) / 2;
			_line.renderOrder = object.renderOrder;

			_line.material = object.material;

			_renderData.elements.push( _line );

		}

		function pushTriangle( a, b, c ) {

			var v1 = _vertexPool[ a ];
			var v2 = _vertexPool[ b ];
			var v3 = _vertexPool[ c ];

			if ( checkTriangleVisibility( v1, v2, v3 ) === false ) return;

			if ( material.side === THREE.DoubleSide || checkBackfaceCulling( v1, v2, v3 ) === true ) {

				_face = getNextFaceInPool();

				_face.id = object.id;
				_face.v1.copy( v1 );
				_face.v2.copy( v2 );
				_face.v3.copy( v3 );
				_face.z = ( v1.positionScreen.z + v2.positionScreen.z + v3.positionScreen.z ) / 3;
				_face.renderOrder = object.renderOrder;

				// use first vertex normal as face normal

				_face.normalModel.fromArray( normals, a * 3 );
				_face.normalModel.applyMatrix3( normalMatrix ).normalize();

				for ( var i = 0; i < 3; i ++ ) {

					var normal = _face.vertexNormalsModel[ i ];
					normal.fromArray( normals, arguments[ i ] * 3 );
					normal.applyMatrix3( normalMatrix ).normalize();

					var uv = _face.uvs[ i ];
					uv.fromArray( uvs, arguments[ i ] * 2 );

				}

				_face.vertexNormalsLength = 3;

				_face.material = object.material;

				_renderData.elements.push( _face );

			}

		}

		return {
			setObject: setObject,
			projectVertex: projectVertex,
			checkTriangleVisibility: checkTriangleVisibility,
			checkBackfaceCulling: checkBackfaceCulling,
			pushVertex: pushVertex,
			pushNormal: pushNormal,
			pushUv: pushUv,
			pushLine: pushLine,
			pushTriangle: pushTriangle
		}

	};

	var renderList = new RenderList();

	this.projectScene = function ( scene, camera, sortObjects, sortElements ) {

		_faceCount = 0;
		_lineCount = 0;
		_spriteCount = 0;

		_renderData.elements.length = 0;

		if ( scene.autoUpdate === true ) scene.updateMatrixWorld();
		if ( camera.parent === null ) camera.updateMatrixWorld();

		_viewMatrix.copy( camera.matrixWorldInverse.getInverse( camera.matrixWorld ) );
		_viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, _viewMatrix );

		_frustum.setFromMatrix( _viewProjectionMatrix );

		//

		_objectCount = 0;

		_renderData.objects.length = 0;
		_renderData.lights.length = 0;

		function addObject( object ) {

			_object = getNextObjectInPool();
			_object.id = object.id;
			_object.object = object;

			_vector3.setFromMatrixPosition( object.matrixWorld );
			_vector3.applyMatrix4( _viewProjectionMatrix );
			_object.z = _vector3.z;
			_object.renderOrder = object.renderOrder;

			_renderData.objects.push( _object );

		}

		scene.traverseVisible( function ( object ) {

			if ( object instanceof THREE.Light ) {

				_renderData.lights.push( object );

			} else if ( object instanceof THREE.Mesh || object instanceof THREE.Line ) {

				if ( object.material.visible === false ) return;
				if ( object.frustumCulled === true && _frustum.intersectsObject( object ) === false ) return;

				addObject( object );

			} else if ( object instanceof THREE.Sprite ) {

				if ( object.material.visible === false ) return;
				if ( object.frustumCulled === true && _frustum.intersectsSprite( object ) === false ) return;

				addObject( object );

			}

		} );

		if ( sortObjects === true ) {

			_renderData.objects.sort( painterSort );

		}

		//

		for ( var o = 0, ol = _renderData.objects.length; o < ol; o ++ ) {

			var object = _renderData.objects[ o ].object;
			var geometry = object.geometry;

			renderList.setObject( object );

			_modelMatrix = object.matrixWorld;

			_vertexCount = 0;

			if ( object instanceof THREE.Mesh ) {

				if ( geometry instanceof THREE.BufferGeometry ) {

					var attributes = geometry.attributes;
					var groups = geometry.groups;

					if ( attributes.position === undefined ) continue;

					var positions = attributes.position.array;

					for ( var i = 0, l = positions.length; i < l; i += 3 ) {

						renderList.pushVertex( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );

					}

					if ( attributes.normal !== undefined ) {

						var normals = attributes.normal.array;

						for ( var i = 0, l = normals.length; i < l; i += 3 ) {

							renderList.pushNormal( normals[ i ], normals[ i + 1 ], normals[ i + 2 ] );

						}

					}

					if ( attributes.uv !== undefined ) {

						var uvs = attributes.uv.array;

						for ( var i = 0, l = uvs.length; i < l; i += 2 ) {

							renderList.pushUv( uvs[ i ], uvs[ i + 1 ] );

						}

					}

					if ( geometry.index !== null ) {

						var indices = geometry.index.array;

						if ( groups.length > 0 ) {

							for ( var g = 0; g < groups.length; g ++ ) {

								var group = groups[ g ];

								for ( var i = group.start, l = group.start + group.count; i < l; i += 3 ) {

									renderList.pushTriangle( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

								}

							}

						} else {

							for ( var i = 0, l = indices.length; i < l; i += 3 ) {

								renderList.pushTriangle( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

							}

						}

					} else {

						for ( var i = 0, l = positions.length / 3; i < l; i += 3 ) {

							renderList.pushTriangle( i, i + 1, i + 2 );

						}

					}

				} else if ( geometry instanceof THREE.Geometry ) {

					var vertices = geometry.vertices;
					var faces = geometry.faces;
					var faceVertexUvs = geometry.faceVertexUvs[ 0 ];

					_normalMatrix.getNormalMatrix( _modelMatrix );

					var material = object.material;

					var isFaceMaterial = material instanceof THREE.MultiMaterial;
					var objectMaterials = isFaceMaterial === true ? object.material : null;

					for ( var v = 0, vl = vertices.length; v < vl; v ++ ) {

						var vertex = vertices[ v ];

						_vector3.copy( vertex );

						if ( material.morphTargets === true ) {

							var morphTargets = geometry.morphTargets;
							var morphInfluences = object.morphTargetInfluences;

							for ( var t = 0, tl = morphTargets.length; t < tl; t ++ ) {

								var influence = morphInfluences[ t ];

								if ( influence === 0 ) continue;

								var target = morphTargets[ t ];
								var targetVertex = target.vertices[ v ];

								_vector3.x += ( targetVertex.x - vertex.x ) * influence;
								_vector3.y += ( targetVertex.y - vertex.y ) * influence;
								_vector3.z += ( targetVertex.z - vertex.z ) * influence;

							}

						}

						renderList.pushVertex( _vector3.x, _vector3.y, _vector3.z );

					}

					for ( var f = 0, fl = faces.length; f < fl; f ++ ) {

						var face = faces[ f ];

						material = isFaceMaterial === true
							 ? objectMaterials.materials[ face.materialIndex ]
							 : object.material;

						if ( material === undefined ) continue;

						var side = material.side;

						var v1 = _vertexPool[ face.a ];
						var v2 = _vertexPool[ face.b ];
						var v3 = _vertexPool[ face.c ];

						if ( renderList.checkTriangleVisibility( v1, v2, v3 ) === false ) continue;

						var visible = renderList.checkBackfaceCulling( v1, v2, v3 );

						if ( side !== THREE.DoubleSide ) {

							if ( side === THREE.FrontSide && visible === false ) continue;
							if ( side === THREE.BackSide && visible === true ) continue;

						}

						_face = getNextFaceInPool();

						_face.id = object.id;
						_face.v1.copy( v1 );
						_face.v2.copy( v2 );
						_face.v3.copy( v3 );

						_face.normalModel.copy( face.normal );

						if ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) {

							_face.normalModel.negate();

						}

						_face.normalModel.applyMatrix3( _normalMatrix ).normalize();

						var faceVertexNormals = face.vertexNormals;

						for ( var n = 0, nl = Math.min( faceVertexNormals.length, 3 ); n < nl; n ++ ) {

							var normalModel = _face.vertexNormalsModel[ n ];
							normalModel.copy( faceVertexNormals[ n ] );

							if ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) {

								normalModel.negate();

							}

							normalModel.applyMatrix3( _normalMatrix ).normalize();

						}

						_face.vertexNormalsLength = faceVertexNormals.length;

						var vertexUvs = faceVertexUvs[ f ];

						if ( vertexUvs !== undefined ) {

							for ( var u = 0; u < 3; u ++ ) {

								_face.uvs[ u ].copy( vertexUvs[ u ] );

							}

						}

						_face.color = face.color;
						_face.material = material;

						_face.z = ( v1.positionScreen.z + v2.positionScreen.z + v3.positionScreen.z ) / 3;
						_face.renderOrder = object.renderOrder;

						_renderData.elements.push( _face );

					}

				}

			} else if ( object instanceof THREE.Line ) {

				if ( geometry instanceof THREE.BufferGeometry ) {

					var attributes = geometry.attributes;

					if ( attributes.position !== undefined ) {

						var positions = attributes.position.array;

						for ( var i = 0, l = positions.length; i < l; i += 3 ) {

							renderList.pushVertex( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );

						}

						if ( geometry.index !== null ) {

							var indices = geometry.index.array;

							for ( var i = 0, l = indices.length; i < l; i += 2 ) {

								renderList.pushLine( indices[ i ], indices[ i + 1 ] );

							}

						} else {

							var step = object instanceof THREE.LineSegments ? 2 : 1;

							for ( var i = 0, l = ( positions.length / 3 ) - 1; i < l; i += step ) {

								renderList.pushLine( i, i + 1 );

							}

						}

					}

				} else if ( geometry instanceof THREE.Geometry ) {

					_modelViewProjectionMatrix.multiplyMatrices( _viewProjectionMatrix, _modelMatrix );

					var vertices = object.geometry.vertices;

					if ( vertices.length === 0 ) continue;

					v1 = getNextVertexInPool();
					v1.positionScreen.copy( vertices[ 0 ] ).applyMatrix4( _modelViewProjectionMatrix );

					var step = object instanceof THREE.LineSegments ? 2 : 1;

					for ( var v = 1, vl = vertices.length; v < vl; v ++ ) {

						v1 = getNextVertexInPool();
						v1.positionScreen.copy( vertices[ v ] ).applyMatrix4( _modelViewProjectionMatrix );

						if ( ( v + 1 ) % step > 0 ) continue;

						v2 = _vertexPool[ _vertexCount - 2 ];

						_clippedVertex1PositionScreen.copy( v1.positionScreen );
						_clippedVertex2PositionScreen.copy( v2.positionScreen );

						if ( clipLine( _clippedVertex1PositionScreen, _clippedVertex2PositionScreen ) === true ) {

							// Perform the perspective divide
							_clippedVertex1PositionScreen.multiplyScalar( 1 / _clippedVertex1PositionScreen.w );
							_clippedVertex2PositionScreen.multiplyScalar( 1 / _clippedVertex2PositionScreen.w );

							_line = getNextLineInPool();

							_line.id = object.id;
							_line.v1.positionScreen.copy( _clippedVertex1PositionScreen );
							_line.v2.positionScreen.copy( _clippedVertex2PositionScreen );

							_line.z = Math.max( _clippedVertex1PositionScreen.z, _clippedVertex2PositionScreen.z );
							_line.renderOrder = object.renderOrder;

							_line.material = object.material;

							if ( object.material.vertexColors === THREE.VertexColors ) {

								_line.vertexColors[ 0 ].copy( object.geometry.colors[ v ] );
								_line.vertexColors[ 1 ].copy( object.geometry.colors[ v - 1 ] );

							}

							_renderData.elements.push( _line );

						}

					}

				}

			} else if ( object instanceof THREE.Sprite ) {

				_vector4.set( _modelMatrix.elements[ 12 ], _modelMatrix.elements[ 13 ], _modelMatrix.elements[ 14 ], 1 );
				_vector4.applyMatrix4( _viewProjectionMatrix );

				var invW = 1 / _vector4.w;

				_vector4.z *= invW;

				if ( _vector4.z >= - 1 && _vector4.z <= 1 ) {

					_sprite = getNextSpriteInPool();
					_sprite.id = object.id;
					_sprite.x = _vector4.x * invW;
					_sprite.y = _vector4.y * invW;
					_sprite.z = _vector4.z;
					_sprite.renderOrder = object.renderOrder;
					_sprite.object = object;

					_sprite.rotation = object.rotation;

					_sprite.scale.x = object.scale.x * Math.abs( _sprite.x - ( _vector4.x + camera.projectionMatrix.elements[ 0 ] ) / ( _vector4.w + camera.projectionMatrix.elements[ 12 ] ) );
					_sprite.scale.y = object.scale.y * Math.abs( _sprite.y - ( _vector4.y + camera.projectionMatrix.elements[ 5 ] ) / ( _vector4.w + camera.projectionMatrix.elements[ 13 ] ) );

					_sprite.material = object.material;

					_renderData.elements.push( _sprite );

				}

			}

		}

		if ( sortElements === true ) {

			_renderData.elements.sort( painterSort );

		}

		return _renderData;

	};

	// Pools

	function getNextObjectInPool() {

		if ( _objectCount === _objectPoolLength ) {

			var object = new THREE.RenderableObject();
			_objectPool.push( object );
			_objectPoolLength ++;
			_objectCount ++;
			return object;

		}

		return _objectPool[ _objectCount ++ ];

	}

	function getNextVertexInPool() {

		if ( _vertexCount === _vertexPoolLength ) {

			var vertex = new THREE.RenderableVertex();
			_vertexPool.push( vertex );
			_vertexPoolLength ++;
			_vertexCount ++;
			return vertex;

		}

		return _vertexPool[ _vertexCount ++ ];

	}

	function getNextFaceInPool() {

		if ( _faceCount === _facePoolLength ) {

			var face = new THREE.RenderableFace();
			_facePool.push( face );
			_facePoolLength ++;
			_faceCount ++;
			return face;

		}

		return _facePool[ _faceCount ++ ];


	}

	function getNextLineInPool() {

		if ( _lineCount === _linePoolLength ) {

			var line = new THREE.RenderableLine();
			_linePool.push( line );
			_linePoolLength ++;
			_lineCount ++;
			return line;

		}

		return _linePool[ _lineCount ++ ];

	}

	function getNextSpriteInPool() {

		if ( _spriteCount === _spritePoolLength ) {

			var sprite = new THREE.RenderableSprite();
			_spritePool.push( sprite );
			_spritePoolLength ++;
			_spriteCount ++;
			return sprite;

		}

		return _spritePool[ _spriteCount ++ ];

	}

	//

	function painterSort( a, b ) {

		if ( a.renderOrder !== b.renderOrder ) {

			return a.renderOrder - b.renderOrder;

		} else if ( a.z !== b.z ) {

			return b.z - a.z;

		} else if ( a.id !== b.id ) {

			return a.id - b.id;

		} else {

			return 0;

		}

	}

	function clipLine( s1, s2 ) {

		var alpha1 = 0, alpha2 = 1,

		// Calculate the boundary coordinate of each vertex for the near and far clip planes,
		// Z = -1 and Z = +1, respectively.
		bc1near =  s1.z + s1.w,
		bc2near =  s2.z + s2.w,
		bc1far =  - s1.z + s1.w,
		bc2far =  - s2.z + s2.w;

		if ( bc1near >= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0 ) {

			// Both vertices lie entirely within all clip planes.
			return true;

		} else if ( ( bc1near < 0 && bc2near < 0 ) || ( bc1far < 0 && bc2far < 0 ) ) {

			// Both vertices lie entirely outside one of the clip planes.
			return false;

		} else {

			// The line segment spans at least one clip plane.

			if ( bc1near < 0 ) {

				// v1 lies outside the near plane, v2 inside
				alpha1 = Math.max( alpha1, bc1near / ( bc1near - bc2near ) );

			} else if ( bc2near < 0 ) {

				// v2 lies outside the near plane, v1 inside
				alpha2 = Math.min( alpha2, bc1near / ( bc1near - bc2near ) );

			}

			if ( bc1far < 0 ) {

				// v1 lies outside the far plane, v2 inside
				alpha1 = Math.max( alpha1, bc1far / ( bc1far - bc2far ) );

			} else if ( bc2far < 0 ) {

				// v2 lies outside the far plane, v2 inside
				alpha2 = Math.min( alpha2, bc1far / ( bc1far - bc2far ) );

			}

			if ( alpha2 < alpha1 ) {

				// The line segment spans two boundaries, but is outside both of them.
				// (This can't happen when we're only clipping against just near/far but good
				//  to leave the check here for future usage if other clip planes are added.)
				return false;

			} else {

				// Update the s1 and s2 vertices to match the clipped line segment.
				s1.lerp( s2, alpha1 );
				s2.lerp( s1, 1 - alpha2 );

				return true;

			}

		}

	}

};

// Adapted from examples/jsm/utils/BufferGeometryUtils.js (three.js r150)
// for use as a plain concatenated global script rather than an ES module,
// matching how this file is loaded by Jocly's gulpfile (packedLibs,
// loaded via BrowserScriptLoader.loadGlobalScript). The named ES imports
// below are destructured from the THREE global instead, which is already
// fully populated by the time this script runs (third-party/three.js is
// concatenated before this file in build-browser-xdview).
var BufferAttribute = THREE.BufferAttribute,
	BufferGeometry = THREE.BufferGeometry,
	Float32BufferAttribute = THREE.Float32BufferAttribute,
	InstancedBufferAttribute = THREE.InstancedBufferAttribute,
	InterleavedBuffer = THREE.InterleavedBuffer,
	InterleavedBufferAttribute = THREE.InterleavedBufferAttribute,
	TriangleFanDrawMode = THREE.TriangleFanDrawMode,
	TriangleStripDrawMode = THREE.TriangleStripDrawMode,
	TrianglesDrawMode = THREE.TrianglesDrawMode,
	Vector3 = THREE.Vector3;

function computeTangents() { // @deprecated, r140

	throw new Error( 'BufferGeometryUtils: computeTangents renamed to computeMikkTSpaceTangents.' );

}

function computeMikkTSpaceTangents( geometry, MikkTSpace, negateSign = true ) {

	if ( ! MikkTSpace || ! MikkTSpace.isReady ) {

		throw new Error( 'BufferGeometryUtils: Initialized MikkTSpace library required.' );

	}

	if ( ! geometry.hasAttribute( 'position' ) || ! geometry.hasAttribute( 'normal' ) || ! geometry.hasAttribute( 'uv' ) ) {

		throw new Error( 'BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.' );

	}

	function getAttributeArray( attribute ) {

		if ( attribute.normalized || attribute.isInterleavedBufferAttribute ) {

			const dstArray = new Float32Array( attribute.getCount() * attribute.itemSize );

			for ( let i = 0, j = 0; i < attribute.getCount(); i ++ ) {

				dstArray[ j ++ ] = attribute.getX( i );
				dstArray[ j ++ ] = attribute.getY( i );

				if ( attribute.itemSize > 2 ) {

					dstArray[ j ++ ] = attribute.getZ( i );

				}

			}

			return dstArray;

		}

		if ( attribute.array instanceof Float32Array ) {

			return attribute.array;

		}

		return new Float32Array( attribute.array );

	}

	// MikkTSpace algorithm requires non-indexed input.

	const _geometry = geometry.index ? geometry.toNonIndexed() : geometry;

	// Compute vertex tangents.

	const tangents = MikkTSpace.generateTangents(

		getAttributeArray( _geometry.attributes.position ),
		getAttributeArray( _geometry.attributes.normal ),
		getAttributeArray( _geometry.attributes.uv )

	);

	// Texture coordinate convention of glTF differs from the apparent
	// default of the MikkTSpace library; .w component must be flipped.

	if ( negateSign ) {

		for ( let i = 3; i < tangents.length; i += 4 ) {

			tangents[ i ] *= - 1;

		}

	}

	//

	_geometry.setAttribute( 'tangent', new BufferAttribute( tangents, 4 ) );

	if ( geometry !== _geometry ) {

		geometry.copy( _geometry );

	}

	return geometry;

}

/**
 * @param  {Array<BufferGeometry>} geometries
 * @param  {Boolean} useGroups
 * @return {BufferGeometry}
 */
function mergeBufferGeometries( geometries, useGroups = false ) {

	const isIndexed = geometries[ 0 ].index !== null;

	const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
	const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

	const attributes = {};
	const morphAttributes = {};

	const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

	const mergedGeometry = new BufferGeometry();

	let offset = 0;

	for ( let i = 0; i < geometries.length; ++ i ) {

		const geometry = geometries[ i ];
		let attributesCount = 0;

		// ensure that all geometries are indexed, or none

		if ( isIndexed !== ( geometry.index !== null ) ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
			return null;

		}

		// gather attributes, exit early if they're different

		for ( const name in geometry.attributes ) {

			if ( ! attributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
				return null;

			}

			if ( attributes[ name ] === undefined ) attributes[ name ] = [];

			attributes[ name ].push( geometry.attributes[ name ] );

			attributesCount ++;

		}

		// ensure geometries have the same number of attributes

		if ( attributesCount !== attributesUsed.size ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
			return null;

		}

		// gather morph attributes, exit early if they're different

		if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
			return null;

		}

		for ( const name in geometry.morphAttributes ) {

			if ( ! morphAttributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
				return null;

			}

			if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

			morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

		}

		if ( useGroups ) {

			let count;

			if ( isIndexed ) {

				count = geometry.index.count;

			} else if ( geometry.attributes.position !== undefined ) {

				count = geometry.attributes.position.count;

			} else {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
				return null;

			}

			mergedGeometry.addGroup( offset, count, i );

			offset += count;

		}

	}

	// merge indices

	if ( isIndexed ) {

		let indexOffset = 0;
		const mergedIndex = [];

		for ( let i = 0; i < geometries.length; ++ i ) {

			const index = geometries[ i ].index;

			for ( let j = 0; j < index.count; ++ j ) {

				mergedIndex.push( index.getX( j ) + indexOffset );

			}

			indexOffset += geometries[ i ].attributes.position.count;

		}

		mergedGeometry.setIndex( mergedIndex );

	}

	// merge attributes

	for ( const name in attributes ) {

		const mergedAttribute = mergeBufferAttributes( attributes[ name ] );

		if ( ! mergedAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' attribute.' );
			return null;

		}

		mergedGeometry.setAttribute( name, mergedAttribute );

	}

	// merge morph attributes

	for ( const name in morphAttributes ) {

		const numMorphTargets = morphAttributes[ name ][ 0 ].length;

		if ( numMorphTargets === 0 ) break;

		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[ name ] = [];

		for ( let i = 0; i < numMorphTargets; ++ i ) {

			const morphAttributesToMerge = [];

			for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

				morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

			}

			const mergedMorphAttribute = mergeBufferAttributes( morphAttributesToMerge );

			if ( ! mergedMorphAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
				return null;

			}

			mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

		}

	}

	return mergedGeometry;

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {BufferAttribute}
 */
function mergeBufferAttributes( attributes ) {

	let TypedArray;
	let itemSize;
	let normalized;
	let arrayLength = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];

		if ( attribute.isInterleavedBufferAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported.' );
			return null;

		}

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
			return null;

		}

		if ( itemSize === undefined ) itemSize = attribute.itemSize;
		if ( itemSize !== attribute.itemSize ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
			return null;

		}

		if ( normalized === undefined ) normalized = attribute.normalized;
		if ( normalized !== attribute.normalized ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
			return null;

		}

		arrayLength += attribute.array.length;

	}

	const array = new TypedArray( arrayLength );
	let offset = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		array.set( attributes[ i ].array, offset );

		offset += attributes[ i ].array.length;

	}

	return new BufferAttribute( array, itemSize, normalized );

}

/**
 * @param {BufferAttribute}
 * @return {BufferAttribute}
 */
function deepCloneAttribute( attribute ) {

	if ( attribute.isInstancedInterleavedBufferAttribute || attribute.isInterleavedBufferAttribute ) {

		return deinterleaveAttribute( attribute );

	}

	if ( attribute.isInstancedBufferAttribute ) {

		return new InstancedBufferAttribute().copy( attribute );

	}

	return new BufferAttribute().copy( attribute );

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {Array<InterleavedBufferAttribute>}
 */
function interleaveAttributes( attributes ) {

	// Interleaves the provided attributes into an InterleavedBuffer and returns
	// a set of InterleavedBufferAttributes for each attribute
	let TypedArray;
	let arrayLength = 0;
	let stride = 0;

	// calculate the length and type of the interleavedBuffer
	for ( let i = 0, l = attributes.length; i < l; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'AttributeBuffers of different types cannot be interleaved' );
			return null;

		}

		arrayLength += attribute.array.length;
		stride += attribute.itemSize;

	}

	// Create the set of buffer attributes
	const interleavedBuffer = new InterleavedBuffer( new TypedArray( arrayLength ), stride );
	let offset = 0;
	const res = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	for ( let j = 0, l = attributes.length; j < l; j ++ ) {

		const attribute = attributes[ j ];
		const itemSize = attribute.itemSize;
		const count = attribute.count;
		const iba = new InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, attribute.normalized );
		res.push( iba );

		offset += itemSize;

		// Move the data for each attribute into the new interleavedBuffer
		// at the appropriate offset
		for ( let c = 0; c < count; c ++ ) {

			for ( let k = 0; k < itemSize; k ++ ) {

				iba[ setters[ k ] ]( c, attribute[ getters[ k ] ]( c ) );

			}

		}

	}

	return res;

}

// returns a new, non-interleaved version of the provided attribute
function deinterleaveAttribute( attribute ) {

	const cons = attribute.data.array.constructor;
	const count = attribute.count;
	const itemSize = attribute.itemSize;
	const normalized = attribute.normalized;

	const array = new cons( count * itemSize );
	let newAttribute;
	if ( attribute.isInstancedInterleavedBufferAttribute ) {

		newAttribute = new InstancedBufferAttribute( array, itemSize, normalized, attribute.meshPerAttribute );

	} else {

		newAttribute = new BufferAttribute( array, itemSize, normalized );

	}

	for ( let i = 0; i < count; i ++ ) {

		newAttribute.setX( i, attribute.getX( i ) );

		if ( itemSize >= 2 ) {

			newAttribute.setY( i, attribute.getY( i ) );

		}

		if ( itemSize >= 3 ) {

			newAttribute.setZ( i, attribute.getZ( i ) );

		}

		if ( itemSize >= 4 ) {

			newAttribute.setW( i, attribute.getW( i ) );

		}

	}

	return newAttribute;

}

// deinterleaves all attributes on the geometry
function deinterleaveGeometry( geometry ) {

	const attributes = geometry.attributes;
	const morphTargets = geometry.morphTargets;
	const attrMap = new Map();

	for ( const key in attributes ) {

		const attr = attributes[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			attributes[ key ] = attrMap.get( attr );

		}

	}

	for ( const key in morphTargets ) {

		const attr = morphTargets[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			morphTargets[ key ] = attrMap.get( attr );

		}

	}

}

/**
 * @param {Array<BufferGeometry>} geometry
 * @return {number}
 */
function estimateBytesUsed( geometry ) {

	// Return the estimated memory used by this geometry in bytes
	// Calculate using itemSize, count, and BYTES_PER_ELEMENT to account
	// for InterleavedBufferAttributes.
	let mem = 0;
	for ( const name in geometry.attributes ) {

		const attr = geometry.getAttribute( name );
		mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;

	}

	const indices = geometry.getIndex();
	mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
	return mem;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} tolerance
 * @return {BufferGeometry}
 */
function mergeVertices( geometry, tolerance = 1e-4 ) {

	tolerance = Math.max( tolerance, Number.EPSILON );

	// Generate an index buffer if the geometry doesn't have one, or optimize it
	// if it's already available.
	const hashToIndex = {};
	const indices = geometry.getIndex();
	const positions = geometry.getAttribute( 'position' );
	const vertexCount = indices ? indices.count : positions.count;

	// next value for triangle indices
	let nextIndex = 0;

	// attributes and new attribute arrays
	const attributeNames = Object.keys( geometry.attributes );
	const tmpAttributes = {};
	const tmpMorphAttributes = {};
	const newIndices = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	// Initialize the arrays, allocating space conservatively. Extra
	// space will be trimmed in the last step.
	for ( let i = 0, l = attributeNames.length; i < l; i ++ ) {

		const name = attributeNames[ i ];
		const attr = geometry.attributes[ name ];

		tmpAttributes[ name ] = new BufferAttribute(
			new attr.array.constructor( attr.count * attr.itemSize ),
			attr.itemSize,
			attr.normalized
		);

		const morphAttr = geometry.morphAttributes[ name ];
		if ( morphAttr ) {

			tmpMorphAttributes[ name ] = new BufferAttribute(
				new morphAttr.array.constructor( morphAttr.count * morphAttr.itemSize ),
				morphAttr.itemSize,
				morphAttr.normalized
			);

		}

	}

	// convert the error tolerance to an amount of decimal places to truncate to
	const decimalShift = Math.log10( 1 / tolerance );
	const shiftMultiplier = Math.pow( 10, decimalShift );
	for ( let i = 0; i < vertexCount; i ++ ) {

		const index = indices ? indices.getX( i ) : i;

		// Generate a hash for the vertex attributes at the current index 'i'
		let hash = '';
		for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

			const name = attributeNames[ j ];
			const attribute = geometry.getAttribute( name );
			const itemSize = attribute.itemSize;

			for ( let k = 0; k < itemSize; k ++ ) {

				// double tilde truncates the decimal value
				hash += `${ ~ ~ ( attribute[ getters[ k ] ]( index ) * shiftMultiplier ) },`;

			}

		}

		// Add another reference to the vertex if it's already
		// used by another index
		if ( hash in hashToIndex ) {

			newIndices.push( hashToIndex[ hash ] );

		} else {

			// copy data to the new index in the temporary attributes
			for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

				const name = attributeNames[ j ];
				const attribute = geometry.getAttribute( name );
				const morphAttr = geometry.morphAttributes[ name ];
				const itemSize = attribute.itemSize;
				const newarray = tmpAttributes[ name ];
				const newMorphArrays = tmpMorphAttributes[ name ];

				for ( let k = 0; k < itemSize; k ++ ) {

					const getterFunc = getters[ k ];
					const setterFunc = setters[ k ];
					newarray[ setterFunc ]( nextIndex, attribute[ getterFunc ]( index ) );

					if ( morphAttr ) {

						for ( let m = 0, ml = morphAttr.length; m < ml; m ++ ) {

							newMorphArrays[ m ][ setterFunc ]( nextIndex, morphAttr[ m ][ getterFunc ]( index ) );

						}

					}

				}

			}

			hashToIndex[ hash ] = nextIndex;
			newIndices.push( nextIndex );
			nextIndex ++;

		}

	}

	// generate result BufferGeometry
	const result = geometry.clone();
	for ( const name in geometry.attributes ) {

		const tmpAttribute = tmpAttributes[ name ];

		result.setAttribute( name, new BufferAttribute(
			tmpAttribute.array.slice( 0, nextIndex * tmpAttribute.itemSize ),
			tmpAttribute.itemSize,
			tmpAttribute.normalized,
		) );

		if ( ! ( name in tmpMorphAttributes ) ) continue;

		for ( let j = 0; j < tmpMorphAttributes[ name ].length; j ++ ) {

			const tmpMorphAttribute = tmpMorphAttributes[ name ][ j ];

			result.morphAttributes[ name ][ j ] = new BufferAttribute(
				tmpMorphAttribute.array.slice( 0, nextIndex * tmpMorphAttribute.itemSize ),
				tmpMorphAttribute.itemSize,
				tmpMorphAttribute.normalized,
			);

		}

	}

	// indices

	result.setIndex( newIndices );

	return result;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} drawMode
 * @return {BufferGeometry}
 */
function toTrianglesDrawMode( geometry, drawMode ) {

	if ( drawMode === TrianglesDrawMode ) {

		console.warn( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.' );
		return geometry;

	}

	if ( drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode ) {

		let index = geometry.getIndex();

		// generate index if not present

		if ( index === null ) {

			const indices = [];

			const position = geometry.getAttribute( 'position' );

			if ( position !== undefined ) {

				for ( let i = 0; i < position.count; i ++ ) {

					indices.push( i );

				}

				geometry.setIndex( indices );
				index = geometry.getIndex();

			} else {

				console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.' );
				return geometry;

			}

		}

		//

		const numberOfTriangles = index.count - 2;
		const newIndices = [];

		if ( drawMode === TriangleFanDrawMode ) {

			// gl.TRIANGLE_FAN

			for ( let i = 1; i <= numberOfTriangles; i ++ ) {

				newIndices.push( index.getX( 0 ) );
				newIndices.push( index.getX( i ) );
				newIndices.push( index.getX( i + 1 ) );

			}

		} else {

			// gl.TRIANGLE_STRIP

			for ( let i = 0; i < numberOfTriangles; i ++ ) {

				if ( i % 2 === 0 ) {

					newIndices.push( index.getX( i ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i + 2 ) );

				} else {

					newIndices.push( index.getX( i + 2 ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i ) );

				}

			}

		}

		if ( ( newIndices.length / 3 ) !== numberOfTriangles ) {

			console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.' );

		}

		// build final geometry

		const newGeometry = geometry.clone();
		newGeometry.setIndex( newIndices );
		newGeometry.clearGroups();

		return newGeometry;

	} else {

		console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:', drawMode );
		return geometry;

	}

}

/**
 * Calculates the morphed attributes of a morphed/skinned BufferGeometry.
 * Helpful for Raytracing or Decals.
 * @param {Mesh | Line | Points} object An instance of Mesh, Line or Points.
 * @return {Object} An Object with original position/normal attributes and morphed ones.
 */
function computeMorphedAttributes( object ) {

	const _vA = new Vector3();
	const _vB = new Vector3();
	const _vC = new Vector3();

	const _tempA = new Vector3();
	const _tempB = new Vector3();
	const _tempC = new Vector3();

	const _morphA = new Vector3();
	const _morphB = new Vector3();
	const _morphC = new Vector3();

	function _calculateMorphedAttributeData(
		object,
		attribute,
		morphAttribute,
		morphTargetsRelative,
		a,
		b,
		c,
		modifiedAttributeArray
	) {

		_vA.fromBufferAttribute( attribute, a );
		_vB.fromBufferAttribute( attribute, b );
		_vC.fromBufferAttribute( attribute, c );

		const morphInfluences = object.morphTargetInfluences;

		if ( morphAttribute && morphInfluences ) {

			_morphA.set( 0, 0, 0 );
			_morphB.set( 0, 0, 0 );
			_morphC.set( 0, 0, 0 );

			for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

				const influence = morphInfluences[ i ];
				const morph = morphAttribute[ i ];

				if ( influence === 0 ) continue;

				_tempA.fromBufferAttribute( morph, a );
				_tempB.fromBufferAttribute( morph, b );
				_tempC.fromBufferAttribute( morph, c );

				if ( morphTargetsRelative ) {

					_morphA.addScaledVector( _tempA, influence );
					_morphB.addScaledVector( _tempB, influence );
					_morphC.addScaledVector( _tempC, influence );

				} else {

					_morphA.addScaledVector( _tempA.sub( _vA ), influence );
					_morphB.addScaledVector( _tempB.sub( _vB ), influence );
					_morphC.addScaledVector( _tempC.sub( _vC ), influence );

				}

			}

			_vA.add( _morphA );
			_vB.add( _morphB );
			_vC.add( _morphC );

		}

		if ( object.isSkinnedMesh ) {

			object.boneTransform( a, _vA );
			object.boneTransform( b, _vB );
			object.boneTransform( c, _vC );

		}

		modifiedAttributeArray[ a * 3 + 0 ] = _vA.x;
		modifiedAttributeArray[ a * 3 + 1 ] = _vA.y;
		modifiedAttributeArray[ a * 3 + 2 ] = _vA.z;
		modifiedAttributeArray[ b * 3 + 0 ] = _vB.x;
		modifiedAttributeArray[ b * 3 + 1 ] = _vB.y;
		modifiedAttributeArray[ b * 3 + 2 ] = _vB.z;
		modifiedAttributeArray[ c * 3 + 0 ] = _vC.x;
		modifiedAttributeArray[ c * 3 + 1 ] = _vC.y;
		modifiedAttributeArray[ c * 3 + 2 ] = _vC.z;

	}

	const geometry = object.geometry;
	const material = object.material;

	let a, b, c;
	const index = geometry.index;
	const positionAttribute = geometry.attributes.position;
	const morphPosition = geometry.morphAttributes.position;
	const morphTargetsRelative = geometry.morphTargetsRelative;
	const normalAttribute = geometry.attributes.normal;
	const morphNormal = geometry.morphAttributes.position;

	const groups = geometry.groups;
	const drawRange = geometry.drawRange;
	let i, j, il, jl;
	let group;
	let start, end;

	const modifiedPosition = new Float32Array( positionAttribute.count * positionAttribute.itemSize );
	const modifiedNormal = new Float32Array( normalAttribute.count * normalAttribute.itemSize );

	if ( index !== null ) {

		// indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = index.getX( j );
					b = index.getX( j + 1 );
					c = index.getX( j + 2 );

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = index.getX( i );
				b = index.getX( i + 1 );
				c = index.getX( i + 2 );

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	} else {

		// non-indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = j;
					b = j + 1;
					c = j + 2;

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( positionAttribute.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = i;
				b = i + 1;
				c = i + 2;

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	}

	const morphedPositionAttribute = new Float32BufferAttribute( modifiedPosition, 3 );
	const morphedNormalAttribute = new Float32BufferAttribute( modifiedNormal, 3 );

	return {

		positionAttribute: positionAttribute,
		normalAttribute: normalAttribute,
		morphedPositionAttribute: morphedPositionAttribute,
		morphedNormalAttribute: morphedNormalAttribute

	};

}

function mergeGroups( geometry ) {

	if ( geometry.groups.length === 0 ) {

		console.warn( 'THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge.' );
		return geometry;

	}

	let groups = geometry.groups;

	// sort groups by material index

	groups = groups.sort( ( a, b ) => {

		if ( a.materialIndex !== b.materialIndex ) return a.materialIndex - b.materialIndex;

		return a.start - b.start;

	} );

	// create index for non-indexed geometries

	if ( geometry.getIndex() === null ) {

		const positionAttribute = geometry.getAttribute( 'position' );
		const indices = [];

		for ( let i = 0; i < positionAttribute.count; i += 3 ) {

			indices.push( i, i + 1, i + 2 );

		}

		geometry.setIndex( indices );

	}

	// sort index

	const index = geometry.getIndex();

	const newIndices = [];

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		const groupStart = group.start;
		const groupLength = groupStart + group.count;

		for ( let j = groupStart; j < groupLength; j ++ ) {

			newIndices.push( index.getX( j ) );

		}

	}

	geometry.dispose(); // Required to force buffer recreation
	geometry.setIndex( newIndices );

	// update groups indices

	let start = 0;

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		group.start = start;
		start += group.count;

	}

	// merge groups

	let currentGroup = groups[ 0 ];

	geometry.groups = [ currentGroup ];

	for ( let i = 1; i < groups.length; i ++ ) {

		const group = groups[ i ];

		if ( currentGroup.materialIndex === group.materialIndex ) {

			currentGroup.count += group.count;

		} else {

			currentGroup = group;
			geometry.groups.push( currentGroup );

		}

	}

	return geometry;

}


// Creates a new, non-indexed geometry with smooth normals everywhere except faces that meet at
// an angle greater than the crease angle.
function toCreasedNormals( geometry, creaseAngle = Math.PI / 3 /* 60 degrees */ ) {

	const creaseDot = Math.cos( creaseAngle );
	const hashMultiplier = ( 1 + 1e-10 ) * 1e2;

	// reusable vertors
	const verts = [ new Vector3(), new Vector3(), new Vector3() ];
	const tempVec1 = new Vector3();
	const tempVec2 = new Vector3();
	const tempNorm = new Vector3();
	const tempNorm2 = new Vector3();

	// hashes a vector
	function hashVertex( v ) {

		const x = ~ ~ ( v.x * hashMultiplier );
		const y = ~ ~ ( v.y * hashMultiplier );
		const z = ~ ~ ( v.z * hashMultiplier );
		return `${x},${y},${z}`;

	}

	const resultGeometry = geometry.toNonIndexed();
	const posAttr = resultGeometry.attributes.position;
	const vertexMap = {};

	// find all the normals shared by commonly located vertices
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		// add the normal to the map for all vertices
		const normal = new Vector3().crossVectors( tempVec1, tempVec2 ).normalize();
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			if ( ! ( hash in vertexMap ) ) {

				vertexMap[ hash ] = [];

			}

			vertexMap[ hash ].push( normal );

		}

	}

	// average normals from all vertices that share a common location if they are within the
	// provided crease threshold
	const normalArray = new Float32Array( posAttr.count * 3 );
	const normAttr = new BufferAttribute( normalArray, 3, false );
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		// get the face normal for this vertex
		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		tempNorm.crossVectors( tempVec1, tempVec2 ).normalize();

		// average all normals that meet the threshold and set the normal value
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			const otherNormals = vertexMap[ hash ];
			tempNorm2.set( 0, 0, 0 );

			for ( let k = 0, lk = otherNormals.length; k < lk; k ++ ) {

				const otherNorm = otherNormals[ k ];
				if ( tempNorm.dot( otherNorm ) > creaseDot ) {

					tempNorm2.add( otherNorm );

				}

			}

			tempNorm2.normalize();
			normAttr.setXYZ( i3 + n, tempNorm2.x, tempNorm2.y, tempNorm2.z );

		}

	}

	resultGeometry.setAttribute( 'normal', normAttr );
	return resultGeometry;

}

THREE.BufferGeometryUtils = {
	computeTangents: computeTangents,
	computeMikkTSpaceTangents: computeMikkTSpaceTangents,
	mergeBufferGeometries: mergeBufferGeometries,
	mergeBufferAttributes: mergeBufferAttributes,
	interleaveAttributes: interleaveAttributes,
	estimateBytesUsed: estimateBytesUsed,
	mergeVertices: mergeVertices,
	toTrianglesDrawMode: toTrianglesDrawMode,
	computeMorphedAttributes: computeMorphedAttributes,
	mergeGroups: mergeGroups,
	toCreasedNormals: toCreasedNormals
};

// Adapted from examples/jsm/loaders/GLTFLoader.js (three.js r150) for use
// as a plain concatenated global script. See BufferGeometryUtils.js for
// the rationale -- same approach applied here.
var AnimationClip = THREE.AnimationClip,
	Bone = THREE.Bone,
	Box3 = THREE.Box3,
	BufferAttribute = THREE.BufferAttribute,
	BufferGeometry = THREE.BufferGeometry,
	ClampToEdgeWrapping = THREE.ClampToEdgeWrapping,
	Color = THREE.Color,
	DirectionalLight = THREE.DirectionalLight,
	DoubleSide = THREE.DoubleSide,
	FileLoader = THREE.FileLoader,
	FrontSide = THREE.FrontSide,
	Group = THREE.Group,
	ImageBitmapLoader = THREE.ImageBitmapLoader,
	InstancedMesh = THREE.InstancedMesh,
	InterleavedBuffer = THREE.InterleavedBuffer,
	InterleavedBufferAttribute = THREE.InterleavedBufferAttribute,
	Interpolant = THREE.Interpolant,
	InterpolateDiscrete = THREE.InterpolateDiscrete,
	InterpolateLinear = THREE.InterpolateLinear,
	Line = THREE.Line,
	LineBasicMaterial = THREE.LineBasicMaterial,
	LineLoop = THREE.LineLoop,
	LineSegments = THREE.LineSegments,
	LinearFilter = THREE.LinearFilter,
	LinearMipmapLinearFilter = THREE.LinearMipmapLinearFilter,
	LinearMipmapNearestFilter = THREE.LinearMipmapNearestFilter,
	Loader = THREE.Loader,
	LoaderUtils = THREE.LoaderUtils,
	Material = THREE.Material,
	MathUtils = THREE.MathUtils,
	Matrix4 = THREE.Matrix4,
	Mesh = THREE.Mesh,
	MeshBasicMaterial = THREE.MeshBasicMaterial,
	MeshPhysicalMaterial = THREE.MeshPhysicalMaterial,
	MeshStandardMaterial = THREE.MeshStandardMaterial,
	MirroredRepeatWrapping = THREE.MirroredRepeatWrapping,
	NearestFilter = THREE.NearestFilter,
	NearestMipmapLinearFilter = THREE.NearestMipmapLinearFilter,
	NearestMipmapNearestFilter = THREE.NearestMipmapNearestFilter,
	NumberKeyframeTrack = THREE.NumberKeyframeTrack,
	Object3D = THREE.Object3D,
	OrthographicCamera = THREE.OrthographicCamera,
	PerspectiveCamera = THREE.PerspectiveCamera,
	PointLight = THREE.PointLight,
	Points = THREE.Points,
	PointsMaterial = THREE.PointsMaterial,
	PropertyBinding = THREE.PropertyBinding,
	Quaternion = THREE.Quaternion,
	QuaternionKeyframeTrack = THREE.QuaternionKeyframeTrack,
	RepeatWrapping = THREE.RepeatWrapping,
	Skeleton = THREE.Skeleton,
	SkinnedMesh = THREE.SkinnedMesh,
	Sphere = THREE.Sphere,
	SpotLight = THREE.SpotLight,
	Texture = THREE.Texture,
	TextureLoader = THREE.TextureLoader,
	TriangleFanDrawMode = THREE.TriangleFanDrawMode,
	TriangleStripDrawMode = THREE.TriangleStripDrawMode,
	Vector2 = THREE.Vector2,
	Vector3 = THREE.Vector3,
	VectorKeyframeTrack = THREE.VectorKeyframeTrack,
	sRGBEncoding = THREE.sRGBEncoding;
var toTrianglesDrawMode = THREE.BufferGeometryUtils.toTrianglesDrawMode;

class GLTFLoader extends Loader {

	constructor( manager ) {

		super( manager );

		this.dracoLoader = null;
		this.ktx2Loader = null;
		this.meshoptDecoder = null;

		this.pluginCallbacks = [];

		this.register( function ( parser ) {

			return new GLTFMaterialsClearcoatExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFTextureBasisUExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFTextureWebPExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFTextureAVIFExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsSheenExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsTransmissionExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsVolumeExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsIorExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsEmissiveStrengthExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsSpecularExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsIridescenceExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFLightsExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMeshoptCompression( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMeshGpuInstancing( parser );

		} );

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		let resourcePath;

		if ( this.resourcePath !== '' ) {

			resourcePath = this.resourcePath;

		} else if ( this.path !== '' ) {

			resourcePath = this.path;

		} else {

			resourcePath = LoaderUtils.extractUrlBase( url );

		}

		// Tells the LoadingManager to track an extra item, which resolves after
		// the model is fully loaded. This means the count of items loaded will
		// be incorrect, but ensures manager.onLoad() does not fire early.
		this.manager.itemStart( url );

		const _onError = function ( e ) {

			if ( onError ) {

				onError( e );

			} else {

				console.error( e );

			}

			scope.manager.itemError( url );
			scope.manager.itemEnd( url );

		};

		const loader = new FileLoader( this.manager );

		loader.setPath( this.path );
		loader.setResponseType( 'arraybuffer' );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );

		loader.load( url, function ( data ) {

			try {

				scope.parse( data, resourcePath, function ( gltf ) {

					onLoad( gltf );

					scope.manager.itemEnd( url );

				}, _onError );

			} catch ( e ) {

				_onError( e );

			}

		}, onProgress, _onError );

	}

	setDRACOLoader( dracoLoader ) {

		this.dracoLoader = dracoLoader;
		return this;

	}

	setDDSLoader() {

		throw new Error(

			'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'

		);

	}

	setKTX2Loader( ktx2Loader ) {

		this.ktx2Loader = ktx2Loader;
		return this;

	}

	setMeshoptDecoder( meshoptDecoder ) {

		this.meshoptDecoder = meshoptDecoder;
		return this;

	}

	register( callback ) {

		if ( this.pluginCallbacks.indexOf( callback ) === - 1 ) {

			this.pluginCallbacks.push( callback );

		}

		return this;

	}

	unregister( callback ) {

		if ( this.pluginCallbacks.indexOf( callback ) !== - 1 ) {

			this.pluginCallbacks.splice( this.pluginCallbacks.indexOf( callback ), 1 );

		}

		return this;

	}

	parse( data, path, onLoad, onError ) {

		let json;
		const extensions = {};
		const plugins = {};
		const textDecoder = new TextDecoder();

		if ( typeof data === 'string' ) {

			json = JSON.parse( data );

		} else if ( data instanceof ArrayBuffer ) {

			const magic = textDecoder.decode( new Uint8Array( data, 0, 4 ) );

			if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

				try {

					extensions[ EXTENSIONS.KHR_BINARY_GLTF ] = new GLTFBinaryExtension( data );

				} catch ( error ) {

					if ( onError ) onError( error );
					return;

				}

				json = JSON.parse( extensions[ EXTENSIONS.KHR_BINARY_GLTF ].content );

			} else {

				json = JSON.parse( textDecoder.decode( data ) );

			}

		} else {

			json = data;

		}

		if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

			if ( onError ) onError( new Error( 'THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.' ) );
			return;

		}

		const parser = new GLTFParser( json, {

			path: path || this.resourcePath || '',
			crossOrigin: this.crossOrigin,
			requestHeader: this.requestHeader,
			manager: this.manager,
			ktx2Loader: this.ktx2Loader,
			meshoptDecoder: this.meshoptDecoder

		} );

		parser.fileLoader.setRequestHeader( this.requestHeader );

		for ( let i = 0; i < this.pluginCallbacks.length; i ++ ) {

			const plugin = this.pluginCallbacks[ i ]( parser );
			plugins[ plugin.name ] = plugin;

			// Workaround to avoid determining as unknown extension
			// in addUnknownExtensionsToUserData().
			// Remove this workaround if we move all the existing
			// extension handlers to plugin system
			extensions[ plugin.name ] = true;

		}

		if ( json.extensionsUsed ) {

			for ( let i = 0; i < json.extensionsUsed.length; ++ i ) {

				const extensionName = json.extensionsUsed[ i ];
				const extensionsRequired = json.extensionsRequired || [];

				switch ( extensionName ) {

					case EXTENSIONS.KHR_MATERIALS_UNLIT:
						extensions[ extensionName ] = new GLTFMaterialsUnlitExtension();
						break;

					case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
						extensions[ extensionName ] = new GLTFDracoMeshCompressionExtension( json, this.dracoLoader );
						break;

					case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
						extensions[ extensionName ] = new GLTFTextureTransformExtension();
						break;

					case EXTENSIONS.KHR_MESH_QUANTIZATION:
						extensions[ extensionName ] = new GLTFMeshQuantizationExtension();
						break;

					default:

						if ( extensionsRequired.indexOf( extensionName ) >= 0 && plugins[ extensionName ] === undefined ) {

							console.warn( 'THREE.GLTFLoader: Unknown extension "' + extensionName + '".' );

						}

				}

			}

		}

		parser.setExtensions( extensions );
		parser.setPlugins( plugins );
		parser.parse( onLoad, onError );

	}

	parseAsync( data, path ) {

		const scope = this;

		return new Promise( function ( resolve, reject ) {

			scope.parse( data, path, resolve, reject );

		} );

	}

}

/* GLTFREGISTRY */

function GLTFRegistry() {

	let objects = {};

	return	{

		get: function ( key ) {

			return objects[ key ];

		},

		add: function ( key, object ) {

			objects[ key ] = object;

		},

		remove: function ( key ) {

			delete objects[ key ];

		},

		removeAll: function () {

			objects = {};

		}

	};

}

/*********************************/
/********** EXTENSIONS ***********/
/*********************************/

const EXTENSIONS = {
	KHR_BINARY_GLTF: 'KHR_binary_glTF',
	KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
	KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
	KHR_MATERIALS_CLEARCOAT: 'KHR_materials_clearcoat',
	KHR_MATERIALS_IOR: 'KHR_materials_ior',
	KHR_MATERIALS_SHEEN: 'KHR_materials_sheen',
	KHR_MATERIALS_SPECULAR: 'KHR_materials_specular',
	KHR_MATERIALS_TRANSMISSION: 'KHR_materials_transmission',
	KHR_MATERIALS_IRIDESCENCE: 'KHR_materials_iridescence',
	KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
	KHR_MATERIALS_VOLUME: 'KHR_materials_volume',
	KHR_TEXTURE_BASISU: 'KHR_texture_basisu',
	KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
	KHR_MESH_QUANTIZATION: 'KHR_mesh_quantization',
	KHR_MATERIALS_EMISSIVE_STRENGTH: 'KHR_materials_emissive_strength',
	EXT_TEXTURE_WEBP: 'EXT_texture_webp',
	EXT_TEXTURE_AVIF: 'EXT_texture_avif',
	EXT_MESHOPT_COMPRESSION: 'EXT_meshopt_compression',
	EXT_MESH_GPU_INSTANCING: 'EXT_mesh_gpu_instancing'
};

/**
 * Punctual Lights Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
 */
class GLTFLightsExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;

		// Object3D instance caches
		this.cache = { refs: {}, uses: {} };

	}

	_markDefs() {

		const parser = this.parser;
		const nodeDefs = this.parser.json.nodes || [];

		for ( let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

			const nodeDef = nodeDefs[ nodeIndex ];

			if ( nodeDef.extensions
					&& nodeDef.extensions[ this.name ]
					&& nodeDef.extensions[ this.name ].light !== undefined ) {

				parser._addNodeRef( this.cache, nodeDef.extensions[ this.name ].light );

			}

		}

	}

	_loadLight( lightIndex ) {

		const parser = this.parser;
		const cacheKey = 'light:' + lightIndex;
		let dependency = parser.cache.get( cacheKey );

		if ( dependency ) return dependency;

		const json = parser.json;
		const extensions = ( json.extensions && json.extensions[ this.name ] ) || {};
		const lightDefs = extensions.lights || [];
		const lightDef = lightDefs[ lightIndex ];
		let lightNode;

		const color = new Color( 0xffffff );

		if ( lightDef.color !== undefined ) color.fromArray( lightDef.color );

		const range = lightDef.range !== undefined ? lightDef.range : 0;

		switch ( lightDef.type ) {

			case 'directional':
				lightNode = new DirectionalLight( color );
				lightNode.target.position.set( 0, 0, - 1 );
				lightNode.add( lightNode.target );
				break;

			case 'point':
				lightNode = new PointLight( color );
				lightNode.distance = range;
				break;

			case 'spot':
				lightNode = new SpotLight( color );
				lightNode.distance = range;
				// Handle spotlight properties.
				lightDef.spot = lightDef.spot || {};
				lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== undefined ? lightDef.spot.innerConeAngle : 0;
				lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== undefined ? lightDef.spot.outerConeAngle : Math.PI / 4.0;
				lightNode.angle = lightDef.spot.outerConeAngle;
				lightNode.penumbra = 1.0 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
				lightNode.target.position.set( 0, 0, - 1 );
				lightNode.add( lightNode.target );
				break;

			default:
				throw new Error( 'THREE.GLTFLoader: Unexpected light type: ' + lightDef.type );

		}

		// Some lights (e.g. spot) default to a position other than the origin. Reset the position
		// here, because node-level parsing will only override position if explicitly specified.
		lightNode.position.set( 0, 0, 0 );

		lightNode.decay = 2;

		assignExtrasToUserData( lightNode, lightDef );

		if ( lightDef.intensity !== undefined ) lightNode.intensity = lightDef.intensity;

		lightNode.name = parser.createUniqueName( lightDef.name || ( 'light_' + lightIndex ) );

		dependency = Promise.resolve( lightNode );

		parser.cache.add( cacheKey, dependency );

		return dependency;

	}

	getDependency( type, index ) {

		if ( type !== 'light' ) return;

		return this._loadLight( index );

	}

	createNodeAttachment( nodeIndex ) {

		const self = this;
		const parser = this.parser;
		const json = parser.json;
		const nodeDef = json.nodes[ nodeIndex ];
		const lightDef = ( nodeDef.extensions && nodeDef.extensions[ this.name ] ) || {};
		const lightIndex = lightDef.light;

		if ( lightIndex === undefined ) return null;

		return this._loadLight( lightIndex ).then( function ( light ) {

			return parser._getNodeRef( self.cache, lightIndex, light );

		} );

	}

}

/**
 * Unlit Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
 */
class GLTFMaterialsUnlitExtension {

	constructor() {

		this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;

	}

	getMaterialType() {

		return MeshBasicMaterial;

	}

	extendParams( materialParams, materialDef, parser ) {

		const pending = [];

		materialParams.color = new Color( 1.0, 1.0, 1.0 );
		materialParams.opacity = 1.0;

		const metallicRoughness = materialDef.pbrMetallicRoughness;

		if ( metallicRoughness ) {

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				const array = metallicRoughness.baseColorFactor;

				materialParams.color.fromArray( array );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture, sRGBEncoding ) );

			}

		}

		return Promise.all( pending );

	}

}

/**
 * Materials Emissive Strength Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/blob/5768b3ce0ef32bc39cdf1bef10b948586635ead3/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md
 */
class GLTFMaterialsEmissiveStrengthExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const emissiveStrength = materialDef.extensions[ this.name ].emissiveStrength;

		if ( emissiveStrength !== undefined ) {

			materialParams.emissiveIntensity = emissiveStrength;

		}

		return Promise.resolve();

	}

}

/**
 * Clearcoat Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_clearcoat
 */
class GLTFMaterialsClearcoatExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.clearcoatFactor !== undefined ) {

			materialParams.clearcoat = extension.clearcoatFactor;

		}

		if ( extension.clearcoatTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'clearcoatMap', extension.clearcoatTexture ) );

		}

		if ( extension.clearcoatRoughnessFactor !== undefined ) {

			materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;

		}

		if ( extension.clearcoatRoughnessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'clearcoatRoughnessMap', extension.clearcoatRoughnessTexture ) );

		}

		if ( extension.clearcoatNormalTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'clearcoatNormalMap', extension.clearcoatNormalTexture ) );

			if ( extension.clearcoatNormalTexture.scale !== undefined ) {

				const scale = extension.clearcoatNormalTexture.scale;

				materialParams.clearcoatNormalScale = new Vector2( scale, scale );

			}

		}

		return Promise.all( pending );

	}

}

/**
 * Iridescence Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_iridescence
 */
class GLTFMaterialsIridescenceExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.iridescenceFactor !== undefined ) {

			materialParams.iridescence = extension.iridescenceFactor;

		}

		if ( extension.iridescenceTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'iridescenceMap', extension.iridescenceTexture ) );

		}

		if ( extension.iridescenceIor !== undefined ) {

			materialParams.iridescenceIOR = extension.iridescenceIor;

		}

		if ( materialParams.iridescenceThicknessRange === undefined ) {

			materialParams.iridescenceThicknessRange = [ 100, 400 ];

		}

		if ( extension.iridescenceThicknessMinimum !== undefined ) {

			materialParams.iridescenceThicknessRange[ 0 ] = extension.iridescenceThicknessMinimum;

		}

		if ( extension.iridescenceThicknessMaximum !== undefined ) {

			materialParams.iridescenceThicknessRange[ 1 ] = extension.iridescenceThicknessMaximum;

		}

		if ( extension.iridescenceThicknessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'iridescenceThicknessMap', extension.iridescenceThicknessTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Sheen Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen
 */
class GLTFMaterialsSheenExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_SHEEN;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		materialParams.sheenColor = new Color( 0, 0, 0 );
		materialParams.sheenRoughness = 0;
		materialParams.sheen = 1;

		const extension = materialDef.extensions[ this.name ];

		if ( extension.sheenColorFactor !== undefined ) {

			materialParams.sheenColor.fromArray( extension.sheenColorFactor );

		}

		if ( extension.sheenRoughnessFactor !== undefined ) {

			materialParams.sheenRoughness = extension.sheenRoughnessFactor;

		}

		if ( extension.sheenColorTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'sheenColorMap', extension.sheenColorTexture, sRGBEncoding ) );

		}

		if ( extension.sheenRoughnessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'sheenRoughnessMap', extension.sheenRoughnessTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Transmission Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_transmission
 * Draft: https://github.com/KhronosGroup/glTF/pull/1698
 */
class GLTFMaterialsTransmissionExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.transmissionFactor !== undefined ) {

			materialParams.transmission = extension.transmissionFactor;

		}

		if ( extension.transmissionTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'transmissionMap', extension.transmissionTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Materials Volume Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_volume
 */
class GLTFMaterialsVolumeExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		materialParams.thickness = extension.thicknessFactor !== undefined ? extension.thicknessFactor : 0;

		if ( extension.thicknessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'thicknessMap', extension.thicknessTexture ) );

		}

		materialParams.attenuationDistance = extension.attenuationDistance || Infinity;

		const colorArray = extension.attenuationColor || [ 1, 1, 1 ];
		materialParams.attenuationColor = new Color( colorArray[ 0 ], colorArray[ 1 ], colorArray[ 2 ] );

		return Promise.all( pending );

	}

}

/**
 * Materials ior Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_ior
 */
class GLTFMaterialsIorExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_IOR;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const extension = materialDef.extensions[ this.name ];

		materialParams.ior = extension.ior !== undefined ? extension.ior : 1.5;

		return Promise.resolve();

	}

}

/**
 * Materials specular Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_specular
 */
class GLTFMaterialsSpecularExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		materialParams.specularIntensity = extension.specularFactor !== undefined ? extension.specularFactor : 1.0;

		if ( extension.specularTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'specularIntensityMap', extension.specularTexture ) );

		}

		const colorArray = extension.specularColorFactor || [ 1, 1, 1 ];
		materialParams.specularColor = new Color( colorArray[ 0 ], colorArray[ 1 ], colorArray[ 2 ] );

		if ( extension.specularColorTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'specularColorMap', extension.specularColorTexture, sRGBEncoding ) );

		}

		return Promise.all( pending );

	}

}

/**
 * BasisU Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_basisu
 */
class GLTFTextureBasisUExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_TEXTURE_BASISU;

	}

	loadTexture( textureIndex ) {

		const parser = this.parser;
		const json = parser.json;

		const textureDef = json.textures[ textureIndex ];

		if ( ! textureDef.extensions || ! textureDef.extensions[ this.name ] ) {

			return null;

		}

		const extension = textureDef.extensions[ this.name ];
		const loader = parser.options.ktx2Loader;

		if ( ! loader ) {

			if ( json.extensionsRequired && json.extensionsRequired.indexOf( this.name ) >= 0 ) {

				throw new Error( 'THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures' );

			} else {

				// Assumes that the extension is optional and that a fallback texture is present
				return null;

			}

		}

		return parser.loadTextureImage( textureIndex, extension.source, loader );

	}

}

/**
 * WebP Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_texture_webp
 */
class GLTFTextureWebPExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
		this.isSupported = null;

	}

	loadTexture( textureIndex ) {

		const name = this.name;
		const parser = this.parser;
		const json = parser.json;

		const textureDef = json.textures[ textureIndex ];

		if ( ! textureDef.extensions || ! textureDef.extensions[ name ] ) {

			return null;

		}

		const extension = textureDef.extensions[ name ];
		const source = json.images[ extension.source ];

		let loader = parser.textureLoader;
		if ( source.uri ) {

			const handler = parser.options.manager.getHandler( source.uri );
			if ( handler !== null ) loader = handler;

		}

		return this.detectSupport().then( function ( isSupported ) {

			if ( isSupported ) return parser.loadTextureImage( textureIndex, extension.source, loader );

			if ( json.extensionsRequired && json.extensionsRequired.indexOf( name ) >= 0 ) {

				throw new Error( 'THREE.GLTFLoader: WebP required by asset but unsupported.' );

			}

			// Fall back to PNG or JPEG.
			return parser.loadTexture( textureIndex );

		} );

	}

	detectSupport() {

		if ( ! this.isSupported ) {

			this.isSupported = new Promise( function ( resolve ) {

				const image = new Image();

				// Lossy test image. Support for lossy images doesn't guarantee support for all
				// WebP images, unfortunately.
				image.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';

				image.onload = image.onerror = function () {

					resolve( image.height === 1 );

				};

			} );

		}

		return this.isSupported;

	}

}

/**
 * AVIF Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_texture_avif
 */
class GLTFTextureAVIFExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.EXT_TEXTURE_AVIF;
		this.isSupported = null;

	}

	loadTexture( textureIndex ) {

		const name = this.name;
		const parser = this.parser;
		const json = parser.json;

		const textureDef = json.textures[ textureIndex ];

		if ( ! textureDef.extensions || ! textureDef.extensions[ name ] ) {

			return null;

		}

		const extension = textureDef.extensions[ name ];
		const source = json.images[ extension.source ];

		let loader = parser.textureLoader;
		if ( source.uri ) {

			const handler = parser.options.manager.getHandler( source.uri );
			if ( handler !== null ) loader = handler;

		}

		return this.detectSupport().then( function ( isSupported ) {

			if ( isSupported ) return parser.loadTextureImage( textureIndex, extension.source, loader );

			if ( json.extensionsRequired && json.extensionsRequired.indexOf( name ) >= 0 ) {

				throw new Error( 'THREE.GLTFLoader: AVIF required by asset but unsupported.' );

			}

			// Fall back to PNG or JPEG.
			return parser.loadTexture( textureIndex );

		} );

	}

	detectSupport() {

		if ( ! this.isSupported ) {

			this.isSupported = new Promise( function ( resolve ) {

				const image = new Image();

				// Lossy test image.
				image.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
				image.onload = image.onerror = function () {

					resolve( image.height === 1 );

				};

			} );

		}

		return this.isSupported;

	}

}

/**
 * meshopt BufferView Compression Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_meshopt_compression
 */
class GLTFMeshoptCompression {

	constructor( parser ) {

		this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
		this.parser = parser;

	}

	loadBufferView( index ) {

		const json = this.parser.json;
		const bufferView = json.bufferViews[ index ];

		if ( bufferView.extensions && bufferView.extensions[ this.name ] ) {

			const extensionDef = bufferView.extensions[ this.name ];

			const buffer = this.parser.getDependency( 'buffer', extensionDef.buffer );
			const decoder = this.parser.options.meshoptDecoder;

			if ( ! decoder || ! decoder.supported ) {

				if ( json.extensionsRequired && json.extensionsRequired.indexOf( this.name ) >= 0 ) {

					throw new Error( 'THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files' );

				} else {

					// Assumes that the extension is optional and that fallback buffer data is present
					return null;

				}

			}

			return buffer.then( function ( res ) {

				const byteOffset = extensionDef.byteOffset || 0;
				const byteLength = extensionDef.byteLength || 0;

				const count = extensionDef.count;
				const stride = extensionDef.byteStride;

				const source = new Uint8Array( res, byteOffset, byteLength );

				if ( decoder.decodeGltfBufferAsync ) {

					return decoder.decodeGltfBufferAsync( count, stride, source, extensionDef.mode, extensionDef.filter ).then( function ( res ) {

						return res.buffer;

					} );

				} else {

					// Support for MeshoptDecoder 0.18 or earlier, without decodeGltfBufferAsync
					return decoder.ready.then( function () {

						const result = new ArrayBuffer( count * stride );
						decoder.decodeGltfBuffer( new Uint8Array( result ), count, stride, source, extensionDef.mode, extensionDef.filter );
						return result;

					} );

				}

			} );

		} else {

			return null;

		}

	}

}

/**
 * GPU Instancing Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
 *
 */
class GLTFMeshGpuInstancing {

	constructor( parser ) {

		this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING;
		this.parser = parser;

	}

	createNodeMesh( nodeIndex ) {

		const json = this.parser.json;
		const nodeDef = json.nodes[ nodeIndex ];

		if ( ! nodeDef.extensions || ! nodeDef.extensions[ this.name ] ||
			nodeDef.mesh === undefined ) {

			return null;

		}

		const meshDef = json.meshes[ nodeDef.mesh ];

		// No Points or Lines + Instancing support yet

		for ( const primitive of meshDef.primitives ) {

			if ( primitive.mode !== WEBGL_CONSTANTS.TRIANGLES &&
				 primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP &&
				 primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN &&
				 primitive.mode !== undefined ) {

				return null;

			}

		}

		const extensionDef = nodeDef.extensions[ this.name ];
		const attributesDef = extensionDef.attributes;

		// @TODO: Can we support InstancedMesh + SkinnedMesh?

		const pending = [];
		const attributes = {};

		for ( const key in attributesDef ) {

			pending.push( this.parser.getDependency( 'accessor', attributesDef[ key ] ).then( accessor => {

				attributes[ key ] = accessor;
				return attributes[ key ];

			} ) );

		}

		if ( pending.length < 1 ) {

			return null;

		}

		pending.push( this.parser.createNodeMesh( nodeIndex ) );

		return Promise.all( pending ).then( results => {

			const nodeObject = results.pop();
			const meshes = nodeObject.isGroup ? nodeObject.children : [ nodeObject ];
			const count = results[ 0 ].count; // All attribute counts should be same
			const instancedMeshes = [];

			for ( const mesh of meshes ) {

				// Temporal variables
				const m = new Matrix4();
				const p = new Vector3();
				const q = new Quaternion();
				const s = new Vector3( 1, 1, 1 );

				const instancedMesh = new InstancedMesh( mesh.geometry, mesh.material, count );

				for ( let i = 0; i < count; i ++ ) {

					if ( attributes.TRANSLATION ) {

						p.fromBufferAttribute( attributes.TRANSLATION, i );

					}

					if ( attributes.ROTATION ) {

						q.fromBufferAttribute( attributes.ROTATION, i );

					}

					if ( attributes.SCALE ) {

						s.fromBufferAttribute( attributes.SCALE, i );

					}

					instancedMesh.setMatrixAt( i, m.compose( p, q, s ) );

				}

				// Add instance attributes to the geometry, excluding TRS.
				for ( const attributeName in attributes ) {

					if ( attributeName !== 'TRANSLATION' &&
						 attributeName !== 'ROTATION' &&
						 attributeName !== 'SCALE' ) {

						mesh.geometry.setAttribute( attributeName, attributes[ attributeName ] );

					}

				}

				// Just in case
				Object3D.prototype.copy.call( instancedMesh, mesh );

				// https://github.com/mrdoob/three.js/issues/18334
				instancedMesh.frustumCulled = false;
				this.parser.assignFinalMaterial( instancedMesh );

				instancedMeshes.push( instancedMesh );

			}

			if ( nodeObject.isGroup ) {

				nodeObject.clear();

				nodeObject.add( ... instancedMeshes );

				return nodeObject;

			}

			return instancedMeshes[ 0 ];

		} );

	}

}

/* BINARY EXTENSION */
const BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
const BINARY_EXTENSION_HEADER_LENGTH = 12;
const BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

class GLTFBinaryExtension {

	constructor( data ) {

		this.name = EXTENSIONS.KHR_BINARY_GLTF;
		this.content = null;
		this.body = null;

		const headerView = new DataView( data, 0, BINARY_EXTENSION_HEADER_LENGTH );
		const textDecoder = new TextDecoder();

		this.header = {
			magic: textDecoder.decode( new Uint8Array( data.slice( 0, 4 ) ) ),
			version: headerView.getUint32( 4, true ),
			length: headerView.getUint32( 8, true )
		};

		if ( this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC ) {

			throw new Error( 'THREE.GLTFLoader: Unsupported glTF-Binary header.' );

		} else if ( this.header.version < 2.0 ) {

			throw new Error( 'THREE.GLTFLoader: Legacy binary file detected.' );

		}

		const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
		const chunkView = new DataView( data, BINARY_EXTENSION_HEADER_LENGTH );
		let chunkIndex = 0;

		while ( chunkIndex < chunkContentsLength ) {

			const chunkLength = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			const chunkType = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON ) {

				const contentArray = new Uint8Array( data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength );
				this.content = textDecoder.decode( contentArray );

			} else if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN ) {

				const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
				this.body = data.slice( byteOffset, byteOffset + chunkLength );

			}

			// Clients must ignore chunks with unknown types.

			chunkIndex += chunkLength;

		}

		if ( this.content === null ) {

			throw new Error( 'THREE.GLTFLoader: JSON content not found.' );

		}

	}

}

/**
 * DRACO Mesh Compression Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
 */
class GLTFDracoMeshCompressionExtension {

	constructor( json, dracoLoader ) {

		if ( ! dracoLoader ) {

			throw new Error( 'THREE.GLTFLoader: No DRACOLoader instance provided.' );

		}

		this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
		this.json = json;
		this.dracoLoader = dracoLoader;
		this.dracoLoader.preload();

	}

	decodePrimitive( primitive, parser ) {

		const json = this.json;
		const dracoLoader = this.dracoLoader;
		const bufferViewIndex = primitive.extensions[ this.name ].bufferView;
		const gltfAttributeMap = primitive.extensions[ this.name ].attributes;
		const threeAttributeMap = {};
		const attributeNormalizedMap = {};
		const attributeTypeMap = {};

		for ( const attributeName in gltfAttributeMap ) {

			const threeAttributeName = ATTRIBUTES[ attributeName ] || attributeName.toLowerCase();

			threeAttributeMap[ threeAttributeName ] = gltfAttributeMap[ attributeName ];

		}

		for ( const attributeName in primitive.attributes ) {

			const threeAttributeName = ATTRIBUTES[ attributeName ] || attributeName.toLowerCase();

			if ( gltfAttributeMap[ attributeName ] !== undefined ) {

				const accessorDef = json.accessors[ primitive.attributes[ attributeName ] ];
				const componentType = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

				attributeTypeMap[ threeAttributeName ] = componentType.name;
				attributeNormalizedMap[ threeAttributeName ] = accessorDef.normalized === true;

			}

		}

		return parser.getDependency( 'bufferView', bufferViewIndex ).then( function ( bufferView ) {

			return new Promise( function ( resolve ) {

				dracoLoader.decodeDracoFile( bufferView, function ( geometry ) {

					for ( const attributeName in geometry.attributes ) {

						const attribute = geometry.attributes[ attributeName ];
						const normalized = attributeNormalizedMap[ attributeName ];

						if ( normalized !== undefined ) attribute.normalized = normalized;

					}

					resolve( geometry );

				}, threeAttributeMap, attributeTypeMap );

			} );

		} );

	}

}

/**
 * Texture Transform Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform
 */
class GLTFTextureTransformExtension {

	constructor() {

		this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;

	}

	extendTexture( texture, transform ) {

		if ( transform.texCoord !== undefined ) {

			console.warn( 'THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.' );

		}

		if ( transform.offset === undefined && transform.rotation === undefined && transform.scale === undefined ) {

			// See https://github.com/mrdoob/three.js/issues/21819.
			return texture;

		}

		texture = texture.clone();

		if ( transform.offset !== undefined ) {

			texture.offset.fromArray( transform.offset );

		}

		if ( transform.rotation !== undefined ) {

			texture.rotation = transform.rotation;

		}

		if ( transform.scale !== undefined ) {

			texture.repeat.fromArray( transform.scale );

		}

		texture.needsUpdate = true;

		return texture;

	}

}

/**
 * Mesh Quantization Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization
 */
class GLTFMeshQuantizationExtension {

	constructor() {

		this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;

	}

}

/*********************************/
/********** INTERPOLATION ********/
/*********************************/

// Spline Interpolation
// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
class GLTFCubicSplineInterpolant extends Interpolant {

	constructor( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		super( parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	copySampleValue_( index ) {

		// Copies a sample value to the result buffer. See description of glTF
		// CUBICSPLINE values layout in interpolate_() function below.

		const result = this.resultBuffer,
			values = this.sampleValues,
			valueSize = this.valueSize,
			offset = index * valueSize * 3 + valueSize;

		for ( let i = 0; i !== valueSize; i ++ ) {

			result[ i ] = values[ offset + i ];

		}

		return result;

	}

	interpolate_( i1, t0, t, t1 ) {

		const result = this.resultBuffer;
		const values = this.sampleValues;
		const stride = this.valueSize;

		const stride2 = stride * 2;
		const stride3 = stride * 3;

		const td = t1 - t0;

		const p = ( t - t0 ) / td;
		const pp = p * p;
		const ppp = pp * p;

		const offset1 = i1 * stride3;
		const offset0 = offset1 - stride3;

		const s2 = - 2 * ppp + 3 * pp;
		const s3 = ppp - pp;
		const s0 = 1 - s2;
		const s1 = s3 - pp + p;

		// Layout of keyframe output values for CUBICSPLINE animations:
		//   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
		for ( let i = 0; i !== stride; i ++ ) {

			const p0 = values[ offset0 + i + stride ]; // splineVertex_k
			const m0 = values[ offset0 + i + stride2 ] * td; // outTangent_k * (t_k+1 - t_k)
			const p1 = values[ offset1 + i + stride ]; // splineVertex_k+1
			const m1 = values[ offset1 + i ] * td; // inTangent_k+1 * (t_k+1 - t_k)

			result[ i ] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;

		}

		return result;

	}

}

const _q = new Quaternion();

class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {

	interpolate_( i1, t0, t, t1 ) {

		const result = super.interpolate_( i1, t0, t, t1 );

		_q.fromArray( result ).normalize().toArray( result );

		return result;

	}

}


/*********************************/
/********** INTERNALS ************/
/*********************************/

/* CONSTANTS */

const WEBGL_CONSTANTS = {
	FLOAT: 5126,
	//FLOAT_MAT2: 35674,
	FLOAT_MAT3: 35675,
	FLOAT_MAT4: 35676,
	FLOAT_VEC2: 35664,
	FLOAT_VEC3: 35665,
	FLOAT_VEC4: 35666,
	LINEAR: 9729,
	REPEAT: 10497,
	SAMPLER_2D: 35678,
	POINTS: 0,
	LINES: 1,
	LINE_LOOP: 2,
	LINE_STRIP: 3,
	TRIANGLES: 4,
	TRIANGLE_STRIP: 5,
	TRIANGLE_FAN: 6,
	UNSIGNED_BYTE: 5121,
	UNSIGNED_SHORT: 5123
};

const WEBGL_COMPONENT_TYPES = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array
};

const WEBGL_FILTERS = {
	9728: NearestFilter,
	9729: LinearFilter,
	9984: NearestMipmapNearestFilter,
	9985: LinearMipmapNearestFilter,
	9986: NearestMipmapLinearFilter,
	9987: LinearMipmapLinearFilter
};

const WEBGL_WRAPPINGS = {
	33071: ClampToEdgeWrapping,
	33648: MirroredRepeatWrapping,
	10497: RepeatWrapping
};

const WEBGL_TYPE_SIZES = {
	'SCALAR': 1,
	'VEC2': 2,
	'VEC3': 3,
	'VEC4': 4,
	'MAT2': 4,
	'MAT3': 9,
	'MAT4': 16
};

const ATTRIBUTES = {
	POSITION: 'position',
	NORMAL: 'normal',
	TANGENT: 'tangent',
	TEXCOORD_0: 'uv',
	TEXCOORD_1: 'uv2',
	COLOR_0: 'color',
	WEIGHTS_0: 'skinWeight',
	JOINTS_0: 'skinIndex',
};

const PATH_PROPERTIES = {
	scale: 'scale',
	translation: 'position',
	rotation: 'quaternion',
	weights: 'morphTargetInfluences'
};

const INTERPOLATION = {
	CUBICSPLINE: undefined, // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
		                        // keyframe track will be initialized with a default interpolation type, then modified.
	LINEAR: InterpolateLinear,
	STEP: InterpolateDiscrete
};

const ALPHA_MODES = {
	OPAQUE: 'OPAQUE',
	MASK: 'MASK',
	BLEND: 'BLEND'
};

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
 */
function createDefaultMaterial( cache ) {

	if ( cache[ 'DefaultMaterial' ] === undefined ) {

		cache[ 'DefaultMaterial' ] = new MeshStandardMaterial( {
			color: 0xFFFFFF,
			emissive: 0x000000,
			metalness: 1,
			roughness: 1,
			transparent: false,
			depthTest: true,
			side: FrontSide
		} );

	}

	return cache[ 'DefaultMaterial' ];

}

function addUnknownExtensionsToUserData( knownExtensions, object, objectDef ) {

	// Add unknown glTF extensions to an object's userData.

	for ( const name in objectDef.extensions ) {

		if ( knownExtensions[ name ] === undefined ) {

			object.userData.gltfExtensions = object.userData.gltfExtensions || {};
			object.userData.gltfExtensions[ name ] = objectDef.extensions[ name ];

		}

	}

}

/**
 * @param {Object3D|Material|BufferGeometry} object
 * @param {GLTF.definition} gltfDef
 */
function assignExtrasToUserData( object, gltfDef ) {

	if ( gltfDef.extras !== undefined ) {

		if ( typeof gltfDef.extras === 'object' ) {

			Object.assign( object.userData, gltfDef.extras );

		} else {

			console.warn( 'THREE.GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras );

		}

	}

}

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
 *
 * @param {BufferGeometry} geometry
 * @param {Array<GLTF.Target>} targets
 * @param {GLTFParser} parser
 * @return {Promise<BufferGeometry>}
 */
function addMorphTargets( geometry, targets, parser ) {

	let hasMorphPosition = false;
	let hasMorphNormal = false;
	let hasMorphColor = false;

	for ( let i = 0, il = targets.length; i < il; i ++ ) {

		const target = targets[ i ];

		if ( target.POSITION !== undefined ) hasMorphPosition = true;
		if ( target.NORMAL !== undefined ) hasMorphNormal = true;
		if ( target.COLOR_0 !== undefined ) hasMorphColor = true;

		if ( hasMorphPosition && hasMorphNormal && hasMorphColor ) break;

	}

	if ( ! hasMorphPosition && ! hasMorphNormal && ! hasMorphColor ) return Promise.resolve( geometry );

	const pendingPositionAccessors = [];
	const pendingNormalAccessors = [];
	const pendingColorAccessors = [];

	for ( let i = 0, il = targets.length; i < il; i ++ ) {

		const target = targets[ i ];

		if ( hasMorphPosition ) {

			const pendingAccessor = target.POSITION !== undefined
				? parser.getDependency( 'accessor', target.POSITION )
				: geometry.attributes.position;

			pendingPositionAccessors.push( pendingAccessor );

		}

		if ( hasMorphNormal ) {

			const pendingAccessor = target.NORMAL !== undefined
				? parser.getDependency( 'accessor', target.NORMAL )
				: geometry.attributes.normal;

			pendingNormalAccessors.push( pendingAccessor );

		}

		if ( hasMorphColor ) {

			const pendingAccessor = target.COLOR_0 !== undefined
				? parser.getDependency( 'accessor', target.COLOR_0 )
				: geometry.attributes.color;

			pendingColorAccessors.push( pendingAccessor );

		}

	}

	return Promise.all( [
		Promise.all( pendingPositionAccessors ),
		Promise.all( pendingNormalAccessors ),
		Promise.all( pendingColorAccessors )
	] ).then( function ( accessors ) {

		const morphPositions = accessors[ 0 ];
		const morphNormals = accessors[ 1 ];
		const morphColors = accessors[ 2 ];

		if ( hasMorphPosition ) geometry.morphAttributes.position = morphPositions;
		if ( hasMorphNormal ) geometry.morphAttributes.normal = morphNormals;
		if ( hasMorphColor ) geometry.morphAttributes.color = morphColors;
		geometry.morphTargetsRelative = true;

		return geometry;

	} );

}

/**
 * @param {Mesh} mesh
 * @param {GLTF.Mesh} meshDef
 */
function updateMorphTargets( mesh, meshDef ) {

	mesh.updateMorphTargets();

	if ( meshDef.weights !== undefined ) {

		for ( let i = 0, il = meshDef.weights.length; i < il; i ++ ) {

			mesh.morphTargetInfluences[ i ] = meshDef.weights[ i ];

		}

	}

	// .extras has user-defined data, so check that .extras.targetNames is an array.
	if ( meshDef.extras && Array.isArray( meshDef.extras.targetNames ) ) {

		const targetNames = meshDef.extras.targetNames;

		if ( mesh.morphTargetInfluences.length === targetNames.length ) {

			mesh.morphTargetDictionary = {};

			for ( let i = 0, il = targetNames.length; i < il; i ++ ) {

				mesh.morphTargetDictionary[ targetNames[ i ] ] = i;

			}

		} else {

			console.warn( 'THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.' );

		}

	}

}

function createPrimitiveKey( primitiveDef ) {

	const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ];
	let geometryKey;

	if ( dracoExtension ) {

		geometryKey = 'draco:' + dracoExtension.bufferView
				+ ':' + dracoExtension.indices
				+ ':' + createAttributesKey( dracoExtension.attributes );

	} else {

		geometryKey = primitiveDef.indices + ':' + createAttributesKey( primitiveDef.attributes ) + ':' + primitiveDef.mode;

	}

	return geometryKey;

}

function createAttributesKey( attributes ) {

	let attributesKey = '';

	const keys = Object.keys( attributes ).sort();

	for ( let i = 0, il = keys.length; i < il; i ++ ) {

		attributesKey += keys[ i ] + ':' + attributes[ keys[ i ] ] + ';';

	}

	return attributesKey;

}

function getNormalizedComponentScale( constructor ) {

	// Reference:
	// https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#encoding-quantized-data

	switch ( constructor ) {

		case Int8Array:
			return 1 / 127;

		case Uint8Array:
			return 1 / 255;

		case Int16Array:
			return 1 / 32767;

		case Uint16Array:
			return 1 / 65535;

		default:
			throw new Error( 'THREE.GLTFLoader: Unsupported normalized accessor component type.' );

	}

}

function getImageURIMimeType( uri ) {

	if ( uri.search( /\.jpe?g($|\?)/i ) > 0 || uri.search( /^data\:image\/jpeg/ ) === 0 ) return 'image/jpeg';
	if ( uri.search( /\.webp($|\?)/i ) > 0 || uri.search( /^data\:image\/webp/ ) === 0 ) return 'image/webp';

	return 'image/png';

}

const _identityMatrix = new Matrix4();

/* GLTF PARSER */

class GLTFParser {

	constructor( json = {}, options = {} ) {

		this.json = json;
		this.extensions = {};
		this.plugins = {};
		this.options = options;

		// loader object cache
		this.cache = new GLTFRegistry();

		// associations between Three.js objects and glTF elements
		this.associations = new Map();

		// BufferGeometry caching
		this.primitiveCache = {};

		// Node cache
		this.nodeCache = {};

		// Object3D instance caches
		this.meshCache = { refs: {}, uses: {} };
		this.cameraCache = { refs: {}, uses: {} };
		this.lightCache = { refs: {}, uses: {} };

		this.sourceCache = {};
		this.textureCache = {};

		// Track node names, to ensure no duplicates
		this.nodeNamesUsed = {};

		// Use an ImageBitmapLoader if imageBitmaps are supported. Moves much of the
		// expensive work of uploading a texture to the GPU off the main thread.

		let isSafari = false;
		let isFirefox = false;
		let firefoxVersion = - 1;

		if ( typeof navigator !== 'undefined' ) {

			isSafari = /^((?!chrome|android).)*safari/i.test( navigator.userAgent ) === true;
			isFirefox = navigator.userAgent.indexOf( 'Firefox' ) > - 1;
			firefoxVersion = isFirefox ? navigator.userAgent.match( /Firefox\/([0-9]+)\./ )[ 1 ] : - 1;

		}

		if ( typeof createImageBitmap === 'undefined' || isSafari || ( isFirefox && firefoxVersion < 98 ) ) {

			this.textureLoader = new TextureLoader( this.options.manager );

		} else {

			this.textureLoader = new ImageBitmapLoader( this.options.manager );

		}

		this.textureLoader.setCrossOrigin( this.options.crossOrigin );
		this.textureLoader.setRequestHeader( this.options.requestHeader );

		this.fileLoader = new FileLoader( this.options.manager );
		this.fileLoader.setResponseType( 'arraybuffer' );

		if ( this.options.crossOrigin === 'use-credentials' ) {

			this.fileLoader.setWithCredentials( true );

		}

	}

	setExtensions( extensions ) {

		this.extensions = extensions;

	}

	setPlugins( plugins ) {

		this.plugins = plugins;

	}

	parse( onLoad, onError ) {

		const parser = this;
		const json = this.json;
		const extensions = this.extensions;

		// Clear the loader cache
		this.cache.removeAll();
		this.nodeCache = {};

		// Mark the special nodes/meshes in json for efficient parse
		this._invokeAll( function ( ext ) {

			return ext._markDefs && ext._markDefs();

		} );

		Promise.all( this._invokeAll( function ( ext ) {

			return ext.beforeRoot && ext.beforeRoot();

		} ) ).then( function () {

			return Promise.all( [

				parser.getDependencies( 'scene' ),
				parser.getDependencies( 'animation' ),
				parser.getDependencies( 'camera' ),

			] );

		} ).then( function ( dependencies ) {

			const result = {
				scene: dependencies[ 0 ][ json.scene || 0 ],
				scenes: dependencies[ 0 ],
				animations: dependencies[ 1 ],
				cameras: dependencies[ 2 ],
				asset: json.asset,
				parser: parser,
				userData: {}
			};

			addUnknownExtensionsToUserData( extensions, result, json );

			assignExtrasToUserData( result, json );

			Promise.all( parser._invokeAll( function ( ext ) {

				return ext.afterRoot && ext.afterRoot( result );

			} ) ).then( function () {

				onLoad( result );

			} );

		} ).catch( onError );

	}

	/**
	 * Marks the special nodes/meshes in json for efficient parse.
	 */
	_markDefs() {

		const nodeDefs = this.json.nodes || [];
		const skinDefs = this.json.skins || [];
		const meshDefs = this.json.meshes || [];

		// Nothing in the node definition indicates whether it is a Bone or an
		// Object3D. Use the skins' joint references to mark bones.
		for ( let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex ++ ) {

			const joints = skinDefs[ skinIndex ].joints;

			for ( let i = 0, il = joints.length; i < il; i ++ ) {

				nodeDefs[ joints[ i ] ].isBone = true;

			}

		}

		// Iterate over all nodes, marking references to shared resources,
		// as well as skeleton joints.
		for ( let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

			const nodeDef = nodeDefs[ nodeIndex ];

			if ( nodeDef.mesh !== undefined ) {

				this._addNodeRef( this.meshCache, nodeDef.mesh );

				// Nothing in the mesh definition indicates whether it is
				// a SkinnedMesh or Mesh. Use the node's mesh reference
				// to mark SkinnedMesh if node has skin.
				if ( nodeDef.skin !== undefined ) {

					meshDefs[ nodeDef.mesh ].isSkinnedMesh = true;

				}

			}

			if ( nodeDef.camera !== undefined ) {

				this._addNodeRef( this.cameraCache, nodeDef.camera );

			}

		}

	}

	/**
	 * Counts references to shared node / Object3D resources. These resources
	 * can be reused, or "instantiated", at multiple nodes in the scene
	 * hierarchy. Mesh, Camera, and Light instances are instantiated and must
	 * be marked. Non-scenegraph resources (like Materials, Geometries, and
	 * Textures) can be reused directly and are not marked here.
	 *
	 * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
	 */
	_addNodeRef( cache, index ) {

		if ( index === undefined ) return;

		if ( cache.refs[ index ] === undefined ) {

			cache.refs[ index ] = cache.uses[ index ] = 0;

		}

		cache.refs[ index ] ++;

	}

	/** Returns a reference to a shared resource, cloning it if necessary. */
	_getNodeRef( cache, index, object ) {

		if ( cache.refs[ index ] <= 1 ) return object;

		const ref = object.clone();

		// Propagates mappings to the cloned object, prevents mappings on the
		// original object from being lost.
		const updateMappings = ( original, clone ) => {

			const mappings = this.associations.get( original );
			if ( mappings != null ) {

				this.associations.set( clone, mappings );

			}

			for ( const [ i, child ] of original.children.entries() ) {

				updateMappings( child, clone.children[ i ] );

			}

		};

		updateMappings( object, ref );

		ref.name += '_instance_' + ( cache.uses[ index ] ++ );

		return ref;

	}

	_invokeOne( func ) {

		const extensions = Object.values( this.plugins );
		extensions.push( this );

		for ( let i = 0; i < extensions.length; i ++ ) {

			const result = func( extensions[ i ] );

			if ( result ) return result;

		}

		return null;

	}

	_invokeAll( func ) {

		const extensions = Object.values( this.plugins );
		extensions.unshift( this );

		const pending = [];

		for ( let i = 0; i < extensions.length; i ++ ) {

			const result = func( extensions[ i ] );

			if ( result ) pending.push( result );

		}

		return pending;

	}

	/**
	 * Requests the specified dependency asynchronously, with caching.
	 * @param {string} type
	 * @param {number} index
	 * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
	 */
	getDependency( type, index ) {

		const cacheKey = type + ':' + index;
		let dependency = this.cache.get( cacheKey );

		if ( ! dependency ) {

			switch ( type ) {

				case 'scene':
					dependency = this.loadScene( index );
					break;

				case 'node':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadNode && ext.loadNode( index );

					} );
					break;

				case 'mesh':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadMesh && ext.loadMesh( index );

					} );
					break;

				case 'accessor':
					dependency = this.loadAccessor( index );
					break;

				case 'bufferView':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadBufferView && ext.loadBufferView( index );

					} );
					break;

				case 'buffer':
					dependency = this.loadBuffer( index );
					break;

				case 'material':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadMaterial && ext.loadMaterial( index );

					} );
					break;

				case 'texture':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadTexture && ext.loadTexture( index );

					} );
					break;

				case 'skin':
					dependency = this.loadSkin( index );
					break;

				case 'animation':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadAnimation && ext.loadAnimation( index );

					} );
					break;

				case 'camera':
					dependency = this.loadCamera( index );
					break;

				default:
					dependency = this._invokeOne( function ( ext ) {

						return ext != this && ext.getDependency && ext.getDependency( type, index );

					} );

					if ( ! dependency ) {

						throw new Error( 'Unknown type: ' + type );

					}

					break;

			}

			this.cache.add( cacheKey, dependency );

		}

		return dependency;

	}

	/**
	 * Requests all dependencies of the specified type asynchronously, with caching.
	 * @param {string} type
	 * @return {Promise<Array<Object>>}
	 */
	getDependencies( type ) {

		let dependencies = this.cache.get( type );

		if ( ! dependencies ) {

			const parser = this;
			const defs = this.json[ type + ( type === 'mesh' ? 'es' : 's' ) ] || [];

			dependencies = Promise.all( defs.map( function ( def, index ) {

				return parser.getDependency( type, index );

			} ) );

			this.cache.add( type, dependencies );

		}

		return dependencies;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	loadBuffer( bufferIndex ) {

		const bufferDef = this.json.buffers[ bufferIndex ];
		const loader = this.fileLoader;

		if ( bufferDef.type && bufferDef.type !== 'arraybuffer' ) {

			throw new Error( 'THREE.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.' );

		}

		// If present, GLB container is required to be the first buffer.
		if ( bufferDef.uri === undefined && bufferIndex === 0 ) {

			return Promise.resolve( this.extensions[ EXTENSIONS.KHR_BINARY_GLTF ].body );

		}

		const options = this.options;

		return new Promise( function ( resolve, reject ) {

			loader.load( LoaderUtils.resolveURL( bufferDef.uri, options.path ), resolve, undefined, function () {

				reject( new Error( 'THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".' ) );

			} );

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferViewIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	loadBufferView( bufferViewIndex ) {

		const bufferViewDef = this.json.bufferViews[ bufferViewIndex ];

		return this.getDependency( 'buffer', bufferViewDef.buffer ).then( function ( buffer ) {

			const byteLength = bufferViewDef.byteLength || 0;
			const byteOffset = bufferViewDef.byteOffset || 0;
			return buffer.slice( byteOffset, byteOffset + byteLength );

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
	 * @param {number} accessorIndex
	 * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
	 */
	loadAccessor( accessorIndex ) {

		const parser = this;
		const json = this.json;

		const accessorDef = this.json.accessors[ accessorIndex ];

		if ( accessorDef.bufferView === undefined && accessorDef.sparse === undefined ) {

			const itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
			const TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];
			const normalized = accessorDef.normalized === true;

			const array = new TypedArray( accessorDef.count * itemSize );
			return Promise.resolve( new BufferAttribute( array, itemSize, normalized ) );

		}

		const pendingBufferViews = [];

		if ( accessorDef.bufferView !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.bufferView ) );

		} else {

			pendingBufferViews.push( null );

		}

		if ( accessorDef.sparse !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.indices.bufferView ) );
			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.values.bufferView ) );

		}

		return Promise.all( pendingBufferViews ).then( function ( bufferViews ) {

			const bufferView = bufferViews[ 0 ];

			const itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
			const TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

			// For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
			const elementBytes = TypedArray.BYTES_PER_ELEMENT;
			const itemBytes = elementBytes * itemSize;
			const byteOffset = accessorDef.byteOffset || 0;
			const byteStride = accessorDef.bufferView !== undefined ? json.bufferViews[ accessorDef.bufferView ].byteStride : undefined;
			const normalized = accessorDef.normalized === true;
			let array, bufferAttribute;

			// The buffer is not interleaved if the stride is the item size in bytes.
			if ( byteStride && byteStride !== itemBytes ) {

				// Each "slice" of the buffer, as defined by 'count' elements of 'byteStride' bytes, gets its own InterleavedBuffer
				// This makes sure that IBA.count reflects accessor.count properly
				const ibSlice = Math.floor( byteOffset / byteStride );
				const ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType + ':' + ibSlice + ':' + accessorDef.count;
				let ib = parser.cache.get( ibCacheKey );

				if ( ! ib ) {

					array = new TypedArray( bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes );

					// Integer parameters to IB/IBA are in array elements, not bytes.
					ib = new InterleavedBuffer( array, byteStride / elementBytes );

					parser.cache.add( ibCacheKey, ib );

				}

				bufferAttribute = new InterleavedBufferAttribute( ib, itemSize, ( byteOffset % byteStride ) / elementBytes, normalized );

			} else {

				if ( bufferView === null ) {

					array = new TypedArray( accessorDef.count * itemSize );

				} else {

					array = new TypedArray( bufferView, byteOffset, accessorDef.count * itemSize );

				}

				bufferAttribute = new BufferAttribute( array, itemSize, normalized );

			}

			// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
			if ( accessorDef.sparse !== undefined ) {

				const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
				const TypedArrayIndices = WEBGL_COMPONENT_TYPES[ accessorDef.sparse.indices.componentType ];

				const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
				const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;

				const sparseIndices = new TypedArrayIndices( bufferViews[ 1 ], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices );
				const sparseValues = new TypedArray( bufferViews[ 2 ], byteOffsetValues, accessorDef.sparse.count * itemSize );

				if ( bufferView !== null ) {

					// Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
					bufferAttribute = new BufferAttribute( bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized );

				}

				for ( let i = 0, il = sparseIndices.length; i < il; i ++ ) {

					const index = sparseIndices[ i ];

					bufferAttribute.setX( index, sparseValues[ i * itemSize ] );
					if ( itemSize >= 2 ) bufferAttribute.setY( index, sparseValues[ i * itemSize + 1 ] );
					if ( itemSize >= 3 ) bufferAttribute.setZ( index, sparseValues[ i * itemSize + 2 ] );
					if ( itemSize >= 4 ) bufferAttribute.setW( index, sparseValues[ i * itemSize + 3 ] );
					if ( itemSize >= 5 ) throw new Error( 'THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.' );

				}

			}

			return bufferAttribute;

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
	 * @param {number} textureIndex
	 * @return {Promise<THREE.Texture|null>}
	 */
	loadTexture( textureIndex ) {

		const json = this.json;
		const options = this.options;
		const textureDef = json.textures[ textureIndex ];
		const sourceIndex = textureDef.source;
		const sourceDef = json.images[ sourceIndex ];

		let loader = this.textureLoader;

		if ( sourceDef.uri ) {

			const handler = options.manager.getHandler( sourceDef.uri );
			if ( handler !== null ) loader = handler;

		}

		return this.loadTextureImage( textureIndex, sourceIndex, loader );

	}

	loadTextureImage( textureIndex, sourceIndex, loader ) {

		const parser = this;
		const json = this.json;

		const textureDef = json.textures[ textureIndex ];
		const sourceDef = json.images[ sourceIndex ];

		const cacheKey = ( sourceDef.uri || sourceDef.bufferView ) + ':' + textureDef.sampler;

		if ( this.textureCache[ cacheKey ] ) {

			// See https://github.com/mrdoob/three.js/issues/21559.
			return this.textureCache[ cacheKey ];

		}

		const promise = this.loadImageSource( sourceIndex, loader ).then( function ( texture ) {

			texture.flipY = false;

			texture.name = textureDef.name || sourceDef.name || '';

			const samplers = json.samplers || {};
			const sampler = samplers[ textureDef.sampler ] || {};

			texture.magFilter = WEBGL_FILTERS[ sampler.magFilter ] || LinearFilter;
			texture.minFilter = WEBGL_FILTERS[ sampler.minFilter ] || LinearMipmapLinearFilter;
			texture.wrapS = WEBGL_WRAPPINGS[ sampler.wrapS ] || RepeatWrapping;
			texture.wrapT = WEBGL_WRAPPINGS[ sampler.wrapT ] || RepeatWrapping;

			parser.associations.set( texture, { textures: textureIndex } );

			return texture;

		} ).catch( function () {

			return null;

		} );

		this.textureCache[ cacheKey ] = promise;

		return promise;

	}

	loadImageSource( sourceIndex, loader ) {

		const parser = this;
		const json = this.json;
		const options = this.options;

		if ( this.sourceCache[ sourceIndex ] !== undefined ) {

			return this.sourceCache[ sourceIndex ].then( ( texture ) => texture.clone() );

		}

		const sourceDef = json.images[ sourceIndex ];

		const URL = self.URL || self.webkitURL;

		let sourceURI = sourceDef.uri || '';
		let isObjectURL = false;

		if ( sourceDef.bufferView !== undefined ) {

			// Load binary image data from bufferView, if provided.

			sourceURI = parser.getDependency( 'bufferView', sourceDef.bufferView ).then( function ( bufferView ) {

				isObjectURL = true;
				const blob = new Blob( [ bufferView ], { type: sourceDef.mimeType } );
				sourceURI = URL.createObjectURL( blob );
				return sourceURI;

			} );

		} else if ( sourceDef.uri === undefined ) {

			throw new Error( 'THREE.GLTFLoader: Image ' + sourceIndex + ' is missing URI and bufferView' );

		}

		const promise = Promise.resolve( sourceURI ).then( function ( sourceURI ) {

			return new Promise( function ( resolve, reject ) {

				let onLoad = resolve;

				if ( loader.isImageBitmapLoader === true ) {

					onLoad = function ( imageBitmap ) {

						const texture = new Texture( imageBitmap );
						texture.needsUpdate = true;

						resolve( texture );

					};

				}

				loader.load( LoaderUtils.resolveURL( sourceURI, options.path ), onLoad, undefined, reject );

			} );

		} ).then( function ( texture ) {

			// Clean up resources and configure Texture.

			if ( isObjectURL === true ) {

				URL.revokeObjectURL( sourceURI );

			}

			texture.userData.mimeType = sourceDef.mimeType || getImageURIMimeType( sourceDef.uri );

			return texture;

		} ).catch( function ( error ) {

			console.error( 'THREE.GLTFLoader: Couldn\'t load texture', sourceURI );
			throw error;

		} );

		this.sourceCache[ sourceIndex ] = promise;
		return promise;

	}

	/**
	 * Asynchronously assigns a texture to the given material parameters.
	 * @param {Object} materialParams
	 * @param {string} mapName
	 * @param {Object} mapDef
	 * @return {Promise<Texture>}
	 */
	assignTexture( materialParams, mapName, mapDef, encoding ) {

		const parser = this;

		return this.getDependency( 'texture', mapDef.index ).then( function ( texture ) {

			if ( ! texture ) return null;

			// Materials sample aoMap from UV set 1 and other maps from UV set 0 - this can't be configured
			// However, we will copy UV set 0 to UV set 1 on demand for aoMap
			if ( mapDef.texCoord !== undefined && mapDef.texCoord != 0 && ! ( mapName === 'aoMap' && mapDef.texCoord == 1 ) ) {

				console.warn( 'THREE.GLTFLoader: Custom UV set ' + mapDef.texCoord + ' for texture ' + mapName + ' not yet supported.' );

			}

			if ( parser.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ] ) {

				const transform = mapDef.extensions !== undefined ? mapDef.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ] : undefined;

				if ( transform ) {

					const gltfReference = parser.associations.get( texture );
					texture = parser.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ].extendTexture( texture, transform );
					parser.associations.set( texture, gltfReference );

				}

			}

			if ( encoding !== undefined ) {

				texture.encoding = encoding;

			}

			materialParams[ mapName ] = texture;

			return texture;

		} );

	}

	/**
	 * Assigns final material to a Mesh, Line, or Points instance. The instance
	 * already has a material (generated from the glTF material options alone)
	 * but reuse of the same glTF material may require multiple threejs materials
	 * to accommodate different primitive types, defines, etc. New materials will
	 * be created if necessary, and reused from a cache.
	 * @param  {Object3D} mesh Mesh, Line, or Points instance.
	 */
	assignFinalMaterial( mesh ) {

		const geometry = mesh.geometry;
		let material = mesh.material;

		const useDerivativeTangents = geometry.attributes.tangent === undefined;
		const useVertexColors = geometry.attributes.color !== undefined;
		const useFlatShading = geometry.attributes.normal === undefined;

		if ( mesh.isPoints ) {

			const cacheKey = 'PointsMaterial:' + material.uuid;

			let pointsMaterial = this.cache.get( cacheKey );

			if ( ! pointsMaterial ) {

				pointsMaterial = new PointsMaterial();
				Material.prototype.copy.call( pointsMaterial, material );
				pointsMaterial.color.copy( material.color );
				pointsMaterial.map = material.map;
				pointsMaterial.sizeAttenuation = false; // glTF spec says points should be 1px

				this.cache.add( cacheKey, pointsMaterial );

			}

			material = pointsMaterial;

		} else if ( mesh.isLine ) {

			const cacheKey = 'LineBasicMaterial:' + material.uuid;

			let lineMaterial = this.cache.get( cacheKey );

			if ( ! lineMaterial ) {

				lineMaterial = new LineBasicMaterial();
				Material.prototype.copy.call( lineMaterial, material );
				lineMaterial.color.copy( material.color );

				this.cache.add( cacheKey, lineMaterial );

			}

			material = lineMaterial;

		}

		// Clone the material if it will be modified
		if ( useDerivativeTangents || useVertexColors || useFlatShading ) {

			let cacheKey = 'ClonedMaterial:' + material.uuid + ':';

			if ( useDerivativeTangents ) cacheKey += 'derivative-tangents:';
			if ( useVertexColors ) cacheKey += 'vertex-colors:';
			if ( useFlatShading ) cacheKey += 'flat-shading:';

			let cachedMaterial = this.cache.get( cacheKey );

			if ( ! cachedMaterial ) {

				cachedMaterial = material.clone();

				if ( useVertexColors ) cachedMaterial.vertexColors = true;
				if ( useFlatShading ) cachedMaterial.flatShading = true;

				if ( useDerivativeTangents ) {

					// https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995
					if ( cachedMaterial.normalScale ) cachedMaterial.normalScale.y *= - 1;
					if ( cachedMaterial.clearcoatNormalScale ) cachedMaterial.clearcoatNormalScale.y *= - 1;

				}

				this.cache.add( cacheKey, cachedMaterial );

				this.associations.set( cachedMaterial, this.associations.get( material ) );

			}

			material = cachedMaterial;

		}

		// workarounds for mesh and geometry

		if ( material.aoMap && geometry.attributes.uv2 === undefined && geometry.attributes.uv !== undefined ) {

			geometry.setAttribute( 'uv2', geometry.attributes.uv );

		}

		mesh.material = material;

	}

	getMaterialType( /* materialIndex */ ) {

		return MeshStandardMaterial;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
	 * @param {number} materialIndex
	 * @return {Promise<Material>}
	 */
	loadMaterial( materialIndex ) {

		const parser = this;
		const json = this.json;
		const extensions = this.extensions;
		const materialDef = json.materials[ materialIndex ];

		let materialType;
		const materialParams = {};
		const materialExtensions = materialDef.extensions || {};

		const pending = [];

		if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ] ) {

			const kmuExtension = extensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ];
			materialType = kmuExtension.getMaterialType();
			pending.push( kmuExtension.extendParams( materialParams, materialDef, parser ) );

		} else {

			// Specification:
			// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

			const metallicRoughness = materialDef.pbrMetallicRoughness || {};

			materialParams.color = new Color( 1.0, 1.0, 1.0 );
			materialParams.opacity = 1.0;

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				const array = metallicRoughness.baseColorFactor;

				materialParams.color.fromArray( array );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture, sRGBEncoding ) );

			}

			materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
			materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

			if ( metallicRoughness.metallicRoughnessTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'metalnessMap', metallicRoughness.metallicRoughnessTexture ) );
				pending.push( parser.assignTexture( materialParams, 'roughnessMap', metallicRoughness.metallicRoughnessTexture ) );

			}

			materialType = this._invokeOne( function ( ext ) {

				return ext.getMaterialType && ext.getMaterialType( materialIndex );

			} );

			pending.push( Promise.all( this._invokeAll( function ( ext ) {

				return ext.extendMaterialParams && ext.extendMaterialParams( materialIndex, materialParams );

			} ) ) );

		}

		if ( materialDef.doubleSided === true ) {

			materialParams.side = DoubleSide;

		}

		const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

		if ( alphaMode === ALPHA_MODES.BLEND ) {

			materialParams.transparent = true;

			// See: https://github.com/mrdoob/three.js/issues/17706
			materialParams.depthWrite = false;

		} else {

			materialParams.transparent = false;

			if ( alphaMode === ALPHA_MODES.MASK ) {

				materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;

			}

		}

		if ( materialDef.normalTexture !== undefined && materialType !== MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'normalMap', materialDef.normalTexture ) );

			materialParams.normalScale = new Vector2( 1, 1 );

			if ( materialDef.normalTexture.scale !== undefined ) {

				const scale = materialDef.normalTexture.scale;

				materialParams.normalScale.set( scale, scale );

			}

		}

		if ( materialDef.occlusionTexture !== undefined && materialType !== MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'aoMap', materialDef.occlusionTexture ) );

			if ( materialDef.occlusionTexture.strength !== undefined ) {

				materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;

			}

		}

		if ( materialDef.emissiveFactor !== undefined && materialType !== MeshBasicMaterial ) {

			materialParams.emissive = new Color().fromArray( materialDef.emissiveFactor );

		}

		if ( materialDef.emissiveTexture !== undefined && materialType !== MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'emissiveMap', materialDef.emissiveTexture, sRGBEncoding ) );

		}

		return Promise.all( pending ).then( function () {

			const material = new materialType( materialParams );

			if ( materialDef.name ) material.name = materialDef.name;

			assignExtrasToUserData( material, materialDef );

			parser.associations.set( material, { materials: materialIndex } );

			if ( materialDef.extensions ) addUnknownExtensionsToUserData( extensions, material, materialDef );

			return material;

		} );

	}

	/** When Object3D instances are targeted by animation, they need unique names. */
	createUniqueName( originalName ) {

		const sanitizedName = PropertyBinding.sanitizeNodeName( originalName || '' );

		let name = sanitizedName;

		for ( let i = 1; this.nodeNamesUsed[ name ]; ++ i ) {

			name = sanitizedName + '_' + i;

		}

		this.nodeNamesUsed[ name ] = true;

		return name;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
	 *
	 * Creates BufferGeometries from primitives.
	 *
	 * @param {Array<GLTF.Primitive>} primitives
	 * @return {Promise<Array<BufferGeometry>>}
	 */
	loadGeometries( primitives ) {

		const parser = this;
		const extensions = this.extensions;
		const cache = this.primitiveCache;

		function createDracoPrimitive( primitive ) {

			return extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ]
				.decodePrimitive( primitive, parser )
				.then( function ( geometry ) {

					return addPrimitiveAttributes( geometry, primitive, parser );

				} );

		}

		const pending = [];

		for ( let i = 0, il = primitives.length; i < il; i ++ ) {

			const primitive = primitives[ i ];
			const cacheKey = createPrimitiveKey( primitive );

			// See if we've already created this geometry
			const cached = cache[ cacheKey ];

			if ( cached ) {

				// Use the cached geometry if it exists
				pending.push( cached.promise );

			} else {

				let geometryPromise;

				if ( primitive.extensions && primitive.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ] ) {

					// Use DRACO geometry if available
					geometryPromise = createDracoPrimitive( primitive );

				} else {

					// Otherwise create a new geometry
					geometryPromise = addPrimitiveAttributes( new BufferGeometry(), primitive, parser );

				}

				// Cache this geometry
				cache[ cacheKey ] = { primitive: primitive, promise: geometryPromise };

				pending.push( geometryPromise );

			}

		}

		return Promise.all( pending );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
	 * @param {number} meshIndex
	 * @return {Promise<Group|Mesh|SkinnedMesh>}
	 */
	loadMesh( meshIndex ) {

		const parser = this;
		const json = this.json;
		const extensions = this.extensions;

		const meshDef = json.meshes[ meshIndex ];
		const primitives = meshDef.primitives;

		const pending = [];

		for ( let i = 0, il = primitives.length; i < il; i ++ ) {

			const material = primitives[ i ].material === undefined
				? createDefaultMaterial( this.cache )
				: this.getDependency( 'material', primitives[ i ].material );

			pending.push( material );

		}

		pending.push( parser.loadGeometries( primitives ) );

		return Promise.all( pending ).then( function ( results ) {

			const materials = results.slice( 0, results.length - 1 );
			const geometries = results[ results.length - 1 ];

			const meshes = [];

			for ( let i = 0, il = geometries.length; i < il; i ++ ) {

				const geometry = geometries[ i ];
				const primitive = primitives[ i ];

				// 1. create Mesh

				let mesh;

				const material = materials[ i ];

				if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
						primitive.mode === undefined ) {

					// .isSkinnedMesh isn't in glTF spec. See ._markDefs()
					mesh = meshDef.isSkinnedMesh === true
						? new SkinnedMesh( geometry, material )
						: new Mesh( geometry, material );

					if ( mesh.isSkinnedMesh === true ) {

						// normalize skin weights to fix malformed assets (see #15319)
						mesh.normalizeSkinWeights();

					}

					if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ) {

						mesh.geometry = toTrianglesDrawMode( mesh.geometry, TriangleStripDrawMode );

					} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ) {

						mesh.geometry = toTrianglesDrawMode( mesh.geometry, TriangleFanDrawMode );

					}

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINES ) {

					mesh = new LineSegments( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ) {

					mesh = new Line( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_LOOP ) {

					mesh = new LineLoop( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.POINTS ) {

					mesh = new Points( geometry, material );

				} else {

					throw new Error( 'THREE.GLTFLoader: Primitive mode unsupported: ' + primitive.mode );

				}

				if ( Object.keys( mesh.geometry.morphAttributes ).length > 0 ) {

					updateMorphTargets( mesh, meshDef );

				}

				mesh.name = parser.createUniqueName( meshDef.name || ( 'mesh_' + meshIndex ) );

				assignExtrasToUserData( mesh, meshDef );

				if ( primitive.extensions ) addUnknownExtensionsToUserData( extensions, mesh, primitive );

				parser.assignFinalMaterial( mesh );

				meshes.push( mesh );

			}

			for ( let i = 0, il = meshes.length; i < il; i ++ ) {

				parser.associations.set( meshes[ i ], {
					meshes: meshIndex,
					primitives: i
				} );

			}

			if ( meshes.length === 1 ) {

				return meshes[ 0 ];

			}

			const group = new Group();

			parser.associations.set( group, { meshes: meshIndex } );

			for ( let i = 0, il = meshes.length; i < il; i ++ ) {

				group.add( meshes[ i ] );

			}

			return group;

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
	 * @param {number} cameraIndex
	 * @return {Promise<THREE.Camera>}
	 */
	loadCamera( cameraIndex ) {

		let camera;
		const cameraDef = this.json.cameras[ cameraIndex ];
		const params = cameraDef[ cameraDef.type ];

		if ( ! params ) {

			console.warn( 'THREE.GLTFLoader: Missing camera parameters.' );
			return;

		}

		if ( cameraDef.type === 'perspective' ) {

			camera = new PerspectiveCamera( MathUtils.radToDeg( params.yfov ), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6 );

		} else if ( cameraDef.type === 'orthographic' ) {

			camera = new OrthographicCamera( - params.xmag, params.xmag, params.ymag, - params.ymag, params.znear, params.zfar );

		}

		if ( cameraDef.name ) camera.name = this.createUniqueName( cameraDef.name );

		assignExtrasToUserData( camera, cameraDef );

		return Promise.resolve( camera );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
	 * @param {number} skinIndex
	 * @return {Promise<Skeleton>}
	 */
	loadSkin( skinIndex ) {

		const skinDef = this.json.skins[ skinIndex ];

		const pending = [];

		for ( let i = 0, il = skinDef.joints.length; i < il; i ++ ) {

			pending.push( this._loadNodeShallow( skinDef.joints[ i ] ) );

		}

		if ( skinDef.inverseBindMatrices !== undefined ) {

			pending.push( this.getDependency( 'accessor', skinDef.inverseBindMatrices ) );

		} else {

			pending.push( null );

		}

		return Promise.all( pending ).then( function ( results ) {

			const inverseBindMatrices = results.pop();
			const jointNodes = results;

			// Note that bones (joint nodes) may or may not be in the
			// scene graph at this time.

			const bones = [];
			const boneInverses = [];

			for ( let i = 0, il = jointNodes.length; i < il; i ++ ) {

				const jointNode = jointNodes[ i ];

				if ( jointNode ) {

					bones.push( jointNode );

					const mat = new Matrix4();

					if ( inverseBindMatrices !== null ) {

						mat.fromArray( inverseBindMatrices.array, i * 16 );

					}

					boneInverses.push( mat );

				} else {

					console.warn( 'THREE.GLTFLoader: Joint "%s" could not be found.', skinDef.joints[ i ] );

				}

			}

			return new Skeleton( bones, boneInverses );

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
	 * @param {number} animationIndex
	 * @return {Promise<AnimationClip>}
	 */
	loadAnimation( animationIndex ) {

		const json = this.json;

		const animationDef = json.animations[ animationIndex ];

		const pendingNodes = [];
		const pendingInputAccessors = [];
		const pendingOutputAccessors = [];
		const pendingSamplers = [];
		const pendingTargets = [];

		for ( let i = 0, il = animationDef.channels.length; i < il; i ++ ) {

			const channel = animationDef.channels[ i ];
			const sampler = animationDef.samplers[ channel.sampler ];
			const target = channel.target;
			const name = target.node;
			const input = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.input ] : sampler.input;
			const output = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.output ] : sampler.output;

			pendingNodes.push( this.getDependency( 'node', name ) );
			pendingInputAccessors.push( this.getDependency( 'accessor', input ) );
			pendingOutputAccessors.push( this.getDependency( 'accessor', output ) );
			pendingSamplers.push( sampler );
			pendingTargets.push( target );

		}

		return Promise.all( [

			Promise.all( pendingNodes ),
			Promise.all( pendingInputAccessors ),
			Promise.all( pendingOutputAccessors ),
			Promise.all( pendingSamplers ),
			Promise.all( pendingTargets )

		] ).then( function ( dependencies ) {

			const nodes = dependencies[ 0 ];
			const inputAccessors = dependencies[ 1 ];
			const outputAccessors = dependencies[ 2 ];
			const samplers = dependencies[ 3 ];
			const targets = dependencies[ 4 ];

			const tracks = [];

			for ( let i = 0, il = nodes.length; i < il; i ++ ) {

				const node = nodes[ i ];
				const inputAccessor = inputAccessors[ i ];
				const outputAccessor = outputAccessors[ i ];
				const sampler = samplers[ i ];
				const target = targets[ i ];

				if ( node === undefined ) continue;

				node.updateMatrix();

				let TypedKeyframeTrack;

				switch ( PATH_PROPERTIES[ target.path ] ) {

					case PATH_PROPERTIES.weights:

						TypedKeyframeTrack = NumberKeyframeTrack;
						break;

					case PATH_PROPERTIES.rotation:

						TypedKeyframeTrack = QuaternionKeyframeTrack;
						break;

					case PATH_PROPERTIES.position:
					case PATH_PROPERTIES.scale:
					default:

						TypedKeyframeTrack = VectorKeyframeTrack;
						break;

				}

				const targetName = node.name ? node.name : node.uuid;

				const interpolation = sampler.interpolation !== undefined ? INTERPOLATION[ sampler.interpolation ] : InterpolateLinear;

				const targetNames = [];

				if ( PATH_PROPERTIES[ target.path ] === PATH_PROPERTIES.weights ) {

					node.traverse( function ( object ) {

						if ( object.morphTargetInfluences ) {

							targetNames.push( object.name ? object.name : object.uuid );

						}

					} );

				} else {

					targetNames.push( targetName );

				}

				let outputArray = outputAccessor.array;

				if ( outputAccessor.normalized ) {

					const scale = getNormalizedComponentScale( outputArray.constructor );
					const scaled = new Float32Array( outputArray.length );

					for ( let j = 0, jl = outputArray.length; j < jl; j ++ ) {

						scaled[ j ] = outputArray[ j ] * scale;

					}

					outputArray = scaled;

				}

				for ( let j = 0, jl = targetNames.length; j < jl; j ++ ) {

					const track = new TypedKeyframeTrack(
						targetNames[ j ] + '.' + PATH_PROPERTIES[ target.path ],
						inputAccessor.array,
						outputArray,
						interpolation
					);

					// Override interpolation with custom factory method.
					if ( sampler.interpolation === 'CUBICSPLINE' ) {

						track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline( result ) {

							// A CUBICSPLINE keyframe in glTF has three output values for each input value,
							// representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
							// must be divided by three to get the interpolant's sampleSize argument.

							const interpolantType = ( this instanceof QuaternionKeyframeTrack ) ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant;

							return new interpolantType( this.times, this.values, this.getValueSize() / 3, result );

						};

						// Mark as CUBICSPLINE. `track.getInterpolation()` doesn't support custom interpolants.
						track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;

					}

					tracks.push( track );

				}

			}

			const name = animationDef.name ? animationDef.name : 'animation_' + animationIndex;

			return new AnimationClip( name, undefined, tracks );

		} );

	}

	createNodeMesh( nodeIndex ) {

		const json = this.json;
		const parser = this;
		const nodeDef = json.nodes[ nodeIndex ];

		if ( nodeDef.mesh === undefined ) return null;

		return parser.getDependency( 'mesh', nodeDef.mesh ).then( function ( mesh ) {

			const node = parser._getNodeRef( parser.meshCache, nodeDef.mesh, mesh );

			// if weights are provided on the node, override weights on the mesh.
			if ( nodeDef.weights !== undefined ) {

				node.traverse( function ( o ) {

					if ( ! o.isMesh ) return;

					for ( let i = 0, il = nodeDef.weights.length; i < il; i ++ ) {

						o.morphTargetInfluences[ i ] = nodeDef.weights[ i ];

					}

				} );

			}

			return node;

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
	 * @param {number} nodeIndex
	 * @return {Promise<Object3D>}
	 */
	loadNode( nodeIndex ) {

		const json = this.json;
		const parser = this;

		const nodeDef = json.nodes[ nodeIndex ];

		const nodePending = parser._loadNodeShallow( nodeIndex );

		const childPending = [];
		const childrenDef = nodeDef.children || [];

		for ( let i = 0, il = childrenDef.length; i < il; i ++ ) {

			childPending.push( parser.getDependency( 'node', childrenDef[ i ] ) );

		}

		const skeletonPending = nodeDef.skin === undefined
			? Promise.resolve( null )
			: parser.getDependency( 'skin', nodeDef.skin );

		return Promise.all( [
			nodePending,
			Promise.all( childPending ),
			skeletonPending
		] ).then( function ( results ) {

			const node = results[ 0 ];
			const children = results[ 1 ];
			const skeleton = results[ 2 ];

			if ( skeleton !== null ) {

				// This full traverse should be fine because
				// child glTF nodes have not been added to this node yet.
				node.traverse( function ( mesh ) {

					if ( ! mesh.isSkinnedMesh ) return;

					mesh.bind( skeleton, _identityMatrix );

				} );

			}

			for ( let i = 0, il = children.length; i < il; i ++ ) {

				node.add( children[ i ] );

			}

			return node;

		} );

	}

	// ._loadNodeShallow() parses a single node.
	// skin and child nodes are created and added in .loadNode() (no '_' prefix).
	_loadNodeShallow( nodeIndex ) {

		const json = this.json;
		const extensions = this.extensions;
		const parser = this;

		// This method is called from .loadNode() and .loadSkin().
		// Cache a node to avoid duplication.

		if ( this.nodeCache[ nodeIndex ] !== undefined ) {

			return this.nodeCache[ nodeIndex ];

		}

		const nodeDef = json.nodes[ nodeIndex ];

		// reserve node's name before its dependencies, so the root has the intended name.
		const nodeName = nodeDef.name ? parser.createUniqueName( nodeDef.name ) : '';

		const pending = [];

		const meshPromise = parser._invokeOne( function ( ext ) {

			return ext.createNodeMesh && ext.createNodeMesh( nodeIndex );

		} );

		if ( meshPromise ) {

			pending.push( meshPromise );

		}

		if ( nodeDef.camera !== undefined ) {

			pending.push( parser.getDependency( 'camera', nodeDef.camera ).then( function ( camera ) {

				return parser._getNodeRef( parser.cameraCache, nodeDef.camera, camera );

			} ) );

		}

		parser._invokeAll( function ( ext ) {

			return ext.createNodeAttachment && ext.createNodeAttachment( nodeIndex );

		} ).forEach( function ( promise ) {

			pending.push( promise );

		} );

		this.nodeCache[ nodeIndex ] = Promise.all( pending ).then( function ( objects ) {

			let node;

			// .isBone isn't in glTF spec. See ._markDefs
			if ( nodeDef.isBone === true ) {

				node = new Bone();

			} else if ( objects.length > 1 ) {

				node = new Group();

			} else if ( objects.length === 1 ) {

				node = objects[ 0 ];

			} else {

				node = new Object3D();

			}

			if ( node !== objects[ 0 ] ) {

				for ( let i = 0, il = objects.length; i < il; i ++ ) {

					node.add( objects[ i ] );

				}

			}

			if ( nodeDef.name ) {

				node.userData.name = nodeDef.name;
				node.name = nodeName;

			}

			assignExtrasToUserData( node, nodeDef );

			if ( nodeDef.extensions ) addUnknownExtensionsToUserData( extensions, node, nodeDef );

			if ( nodeDef.matrix !== undefined ) {

				const matrix = new Matrix4();
				matrix.fromArray( nodeDef.matrix );
				node.applyMatrix4( matrix );

			} else {

				if ( nodeDef.translation !== undefined ) {

					node.position.fromArray( nodeDef.translation );

				}

				if ( nodeDef.rotation !== undefined ) {

					node.quaternion.fromArray( nodeDef.rotation );

				}

				if ( nodeDef.scale !== undefined ) {

					node.scale.fromArray( nodeDef.scale );

				}

			}

			if ( ! parser.associations.has( node ) ) {

				parser.associations.set( node, {} );

			}

			parser.associations.get( node ).nodes = nodeIndex;

			return node;

		} );

		return this.nodeCache[ nodeIndex ];

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
	 * @param {number} sceneIndex
	 * @return {Promise<Group>}
	 */
	loadScene( sceneIndex ) {

		const extensions = this.extensions;
		const sceneDef = this.json.scenes[ sceneIndex ];
		const parser = this;

		// Loader returns Group, not Scene.
		// See: https://github.com/mrdoob/three.js/issues/18342#issuecomment-578981172
		const scene = new Group();
		if ( sceneDef.name ) scene.name = parser.createUniqueName( sceneDef.name );

		assignExtrasToUserData( scene, sceneDef );

		if ( sceneDef.extensions ) addUnknownExtensionsToUserData( extensions, scene, sceneDef );

		const nodeIds = sceneDef.nodes || [];

		const pending = [];

		for ( let i = 0, il = nodeIds.length; i < il; i ++ ) {

			pending.push( parser.getDependency( 'node', nodeIds[ i ] ) );

		}

		return Promise.all( pending ).then( function ( nodes ) {

			for ( let i = 0, il = nodes.length; i < il; i ++ ) {

				scene.add( nodes[ i ] );

			}

			// Removes dangling associations, associations that reference a node that
			// didn't make it into the scene.
			const reduceAssociations = ( node ) => {

				const reducedAssociations = new Map();

				for ( const [ key, value ] of parser.associations ) {

					if ( key instanceof Material || key instanceof Texture ) {

						reducedAssociations.set( key, value );

					}

				}

				node.traverse( ( node ) => {

					const mappings = parser.associations.get( node );

					if ( mappings != null ) {

						reducedAssociations.set( node, mappings );

					}

				} );

				return reducedAssociations;

			};

			parser.associations = reduceAssociations( scene );

			return scene;

		} );

	}

}

/**
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 */
function computeBounds( geometry, primitiveDef, parser ) {

	const attributes = primitiveDef.attributes;

	const box = new Box3();

	if ( attributes.POSITION !== undefined ) {

		const accessor = parser.json.accessors[ attributes.POSITION ];

		const min = accessor.min;
		const max = accessor.max;

		// glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

		if ( min !== undefined && max !== undefined ) {

			box.set(
				new Vector3( min[ 0 ], min[ 1 ], min[ 2 ] ),
				new Vector3( max[ 0 ], max[ 1 ], max[ 2 ] )
			);

			if ( accessor.normalized ) {

				const boxScale = getNormalizedComponentScale( WEBGL_COMPONENT_TYPES[ accessor.componentType ] );
				box.min.multiplyScalar( boxScale );
				box.max.multiplyScalar( boxScale );

			}

		} else {

			console.warn( 'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.' );

			return;

		}

	} else {

		return;

	}

	const targets = primitiveDef.targets;

	if ( targets !== undefined ) {

		const maxDisplacement = new Vector3();
		const vector = new Vector3();

		for ( let i = 0, il = targets.length; i < il; i ++ ) {

			const target = targets[ i ];

			if ( target.POSITION !== undefined ) {

				const accessor = parser.json.accessors[ target.POSITION ];
				const min = accessor.min;
				const max = accessor.max;

				// glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

				if ( min !== undefined && max !== undefined ) {

					// we need to get max of absolute components because target weight is [-1,1]
					vector.setX( Math.max( Math.abs( min[ 0 ] ), Math.abs( max[ 0 ] ) ) );
					vector.setY( Math.max( Math.abs( min[ 1 ] ), Math.abs( max[ 1 ] ) ) );
					vector.setZ( Math.max( Math.abs( min[ 2 ] ), Math.abs( max[ 2 ] ) ) );


					if ( accessor.normalized ) {

						const boxScale = getNormalizedComponentScale( WEBGL_COMPONENT_TYPES[ accessor.componentType ] );
						vector.multiplyScalar( boxScale );

					}

					// Note: this assumes that the sum of all weights is at most 1. This isn't quite correct - it's more conservative
					// to assume that each target can have a max weight of 1. However, for some use cases - notably, when morph targets
					// are used to implement key-frame animations and as such only two are active at a time - this results in very large
					// boxes. So for now we make a box that's sometimes a touch too small but is hopefully mostly of reasonable size.
					maxDisplacement.max( vector );

				} else {

					console.warn( 'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.' );

				}

			}

		}

		// As per comment above this box isn't conservative, but has a reasonable size for a very large number of morph targets.
		box.expandByVector( maxDisplacement );

	}

	geometry.boundingBox = box;

	const sphere = new Sphere();

	box.getCenter( sphere.center );
	sphere.radius = box.min.distanceTo( box.max ) / 2;

	geometry.boundingSphere = sphere;

}

/**
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 * @return {Promise<BufferGeometry>}
 */
function addPrimitiveAttributes( geometry, primitiveDef, parser ) {

	const attributes = primitiveDef.attributes;

	const pending = [];

	function assignAttributeAccessor( accessorIndex, attributeName ) {

		return parser.getDependency( 'accessor', accessorIndex )
			.then( function ( accessor ) {

				geometry.setAttribute( attributeName, accessor );

			} );

	}

	for ( const gltfAttributeName in attributes ) {

		const threeAttributeName = ATTRIBUTES[ gltfAttributeName ] || gltfAttributeName.toLowerCase();

		// Skip attributes already provided by e.g. Draco extension.
		if ( threeAttributeName in geometry.attributes ) continue;

		pending.push( assignAttributeAccessor( attributes[ gltfAttributeName ], threeAttributeName ) );

	}

	if ( primitiveDef.indices !== undefined && ! geometry.index ) {

		const accessor = parser.getDependency( 'accessor', primitiveDef.indices ).then( function ( accessor ) {

			geometry.setIndex( accessor );

		} );

		pending.push( accessor );

	}

	assignExtrasToUserData( geometry, primitiveDef );

	computeBounds( geometry, primitiveDef, parser );

	return Promise.all( pending ).then( function () {

		return primitiveDef.targets !== undefined
			? addMorphTargets( geometry, primitiveDef.targets, parser )
			: geometry;

	} );

}

THREE.GLTFLoader = GLTFLoader;

// Adapted from examples/jsm/loaders/FontLoader.js (three.js r150) for use
// as a plain concatenated global script. See BufferGeometryUtils.js for
// the rationale -- same approach applied here.
var FileLoader = THREE.FileLoader,
	Loader = THREE.Loader,
	ShapePath = THREE.ShapePath;

class FontLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );
		loader.load( url, function ( text ) {

			const font = scope.parse( JSON.parse( text ) );

			if ( onLoad ) onLoad( font );

		}, onProgress, onError );

	}

	parse( json ) {

		return new Font( json );

	}

}

//

class Font {

	constructor( data ) {

		this.isFont = true;

		this.type = 'Font';

		this.data = data;

	}

	generateShapes( text, size = 100 ) {

		const shapes = [];
		const paths = createPaths( text, size, this.data );

		for ( let p = 0, pl = paths.length; p < pl; p ++ ) {

			shapes.push( ...paths[ p ].toShapes() );

		}

		return shapes;

	}

}

function createPaths( text, size, data ) {

	const chars = Array.from( text );
	const scale = size / data.resolution;
	const line_height = ( data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness ) * scale;

	const paths = [];

	let offsetX = 0, offsetY = 0;

	for ( let i = 0; i < chars.length; i ++ ) {

		const char = chars[ i ];

		if ( char === '\n' ) {

			offsetX = 0;
			offsetY -= line_height;

		} else {

			const ret = createPath( char, scale, offsetX, offsetY, data );
			offsetX += ret.offsetX;
			paths.push( ret.path );

		}

	}

	return paths;

}

function createPath( char, scale, offsetX, offsetY, data ) {

	const glyph = data.glyphs[ char ] || data.glyphs[ '?' ];

	if ( ! glyph ) {

		console.error( 'THREE.Font: character "' + char + '" does not exists in font family ' + data.familyName + '.' );

		return;

	}

	const path = new ShapePath();

	let x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;

	if ( glyph.o ) {

		const outline = glyph._cachedOutline || ( glyph._cachedOutline = glyph.o.split( ' ' ) );

		for ( let i = 0, l = outline.length; i < l; ) {

			const action = outline[ i ++ ];

			switch ( action ) {

				case 'm': // moveTo

					x = outline[ i ++ ] * scale + offsetX;
					y = outline[ i ++ ] * scale + offsetY;

					path.moveTo( x, y );

					break;

				case 'l': // lineTo

					x = outline[ i ++ ] * scale + offsetX;
					y = outline[ i ++ ] * scale + offsetY;

					path.lineTo( x, y );

					break;

				case 'q': // quadraticCurveTo

					cpx = outline[ i ++ ] * scale + offsetX;
					cpy = outline[ i ++ ] * scale + offsetY;
					cpx1 = outline[ i ++ ] * scale + offsetX;
					cpy1 = outline[ i ++ ] * scale + offsetY;

					path.quadraticCurveTo( cpx1, cpy1, cpx, cpy );

					break;

				case 'b': // bezierCurveTo

					cpx = outline[ i ++ ] * scale + offsetX;
					cpy = outline[ i ++ ] * scale + offsetY;
					cpx1 = outline[ i ++ ] * scale + offsetX;
					cpy1 = outline[ i ++ ] * scale + offsetY;
					cpx2 = outline[ i ++ ] * scale + offsetX;
					cpy2 = outline[ i ++ ] * scale + offsetY;

					path.bezierCurveTo( cpx1, cpy1, cpx2, cpy2, cpx, cpy );

					break;

			}

		}

	}

	return { offsetX: glyph.ha * scale, path: path };

}

THREE.FontLoader = FontLoader;
THREE.Font = Font;

/**
 * Text = 3D Text
 *
 * parameters = {
 *  font: <THREE.Font>, // font
 *
 *  size: <float>, // size of the text
 *  depth: <float>, // thickness to extrude text
 *  curveSegments: <int>, // number of points on the curves
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into text bevel goes
 *  bevelSize: <float>, // how far from text outline (including bevelOffset) is bevel
 *  bevelOffset: <float> // how far from text outline does bevel start
 * }
 */

// Adapted from examples/jsm/geometries/TextGeometry.js (three.js r170) for
// use as a plain concatenated global script. See BufferGeometryUtils.js
// for the rationale -- same approach applied here.
var ExtrudeGeometry = THREE.ExtrudeGeometry;

class TextGeometry extends ExtrudeGeometry {

	constructor( text, parameters = {} ) {

		const font = parameters.font;

		if ( font === undefined ) {

			super(); // generate default extrude geometry

		} else {

			const shapes = font.generateShapes( text, parameters.size );

			// translate parameters to ExtrudeGeometry API

			if ( parameters.depth === undefined && parameters.height !== undefined ) {

				console.warn( 'THREE.TextGeometry: .height is now depreciated. Please use .depth instead' ); // @deprecated, r163

			}

			parameters.depth = parameters.depth !== undefined ?
				parameters.depth : parameters.height !== undefined ?
					parameters.height : 50;

			// defaults

			if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
			if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
			if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

			super( shapes, parameters );

		}

		this.type = 'TextGeometry';

	}

}


THREE.TextGeometry = TextGeometry;

// This THREEx helper makes it easy to handle the mouse events in your 3D scene
//
// * CHANGES NEEDED
//   * handle drag/drop
//   * notify events not object3D - like DOM
//     * so single object with property
//   * DONE bubling implement bubling/capturing
//   * DONE implement event.stopPropagation()
//   * DONE implement event.type = "click" and co
//   * DONE implement event.target
//
// # Lets get started
//
// First you include it in your page
//
// ```<script src='threex.domevent.js'></script>```
//
// # use the object oriented api
//
// You bind an event like this
// 
// ```mesh.on('click', function(object3d){ ... })```
//
// To unbind an event, just do
//
// ```mesh.off('click', function(object3d){ ... })```
//
// As an alternative, there is another naming closer DOM events.
// Pick the one you like, they are doing the same thing
//
// ```mesh.addEventListener('click', function(object3d){ ... })```
// ```mesh.removeEventListener('click', function(object3d){ ... })```
//
// # Supported Events
//
// Always in a effort to stay close to usual pratices, the events name are the same as in DOM.
// The semantic is the same too.
// Currently, the available events are
// [click, dblclick, mouseup, mousedown](http://www.quirksmode.org/dom/events/click.html),
// [mouseover and mouse out](http://www.quirksmode.org/dom/events/mouseover.html).
//
// # use the standalone api
//
// The object-oriented api modifies THREE.Object3D class.
// It is a global class, so it may be legitimatly considered unclean by some people.
// If this bother you, simply do ```THREEx.DomEvent.noConflict()``` and use the
// standalone API. In fact, the object oriented API is just a thin wrapper
// on top of the standalone API.
//
// First, you instanciate the object
//
// ```var domEvent = new THREEx.DomEvent();```
// 
// Then you bind an event like this
//
// ```domEvent.bind(mesh, 'click', function(object3d){ object3d.scale.x *= 2; });```
//
// To unbind an event, just do
//
// ```domEvent.unbind(mesh, 'click', callback);```
//
// 
// # Code

//

/** @namespace */
var THREEx		= THREEx 		|| {};

// # Constructor
THREEx.DomEvent	= function(camera)
{
	this._camera	= camera || null;
	this._domElement= null;
	this._projector	= new THREE.Projector();
	this._selected	= null;
	this._boundObjs	= {};
	this.setBoundContext('_');
	this.mouseIsDown = false;
	this.mouseDragNotified = false;
	this.lastDownTime = 0;

	// Bind dom event for mouse and touch
	var _this	= this;
	//this._$onClick		= function(){ _this._onClick.apply(_this, arguments);		};
	//this._$onDblClick	= function(){ _this._onDblClick.apply(_this, arguments);	};
	this._$onMouseMove	= function(){ _this._onMouseMove.apply(_this, arguments);	};
	this._$onMouseDown	= function(){ _this._onMouseDown.apply(_this, arguments);	};
	this._$onMouseUp	= function(){ _this._onMouseUp.apply(_this, arguments);		};
	this._$onTouchMove	= function(){ _this._onTouchMove.apply(_this, arguments);	};
	this._$onTouchStart	= function(){ _this._onTouchStart.apply(_this, arguments);	};
	this._$onTouchEnd	= function(){ _this._onTouchEnd.apply(_this, arguments);	};
}

THREEx.DomEvent.prototype.setDOMElement = function(domElement) {
	if(this._domElement)
		this.unsetDOMElement();
	this._domElement=domElement;
	//this._domElement.addEventListener( 'click'	, this._$onClick	, false );
	//this._domElement.addEventListener( 'dblclick'	, this._$onDblClick	, false );
	this._domElement.addEventListener( 'mousemove'	, this._$onMouseMove	, false );
	this._domElement.addEventListener( 'mousedown'	, this._$onMouseDown	, false );
	this._domElement.addEventListener( 'mouseup'	, this._$onMouseUp	, false );
	this._domElement.addEventListener( 'touchmove'	, this._$onTouchMove	, false );
	this._domElement.addEventListener( 'touchstart'	, this._$onTouchStart	, false );
	this._domElement.addEventListener( 'touchend'	, this._$onTouchEnd	, false );
}

THREEx.DomEvent.prototype.unsetDOMElement = function() {
	if(this._domElement) {
		//this._domElement.removeEventListener( 'click'		, this._$onClick	, false );
		//this._domElement.removeEventListener( 'dblclick'	, this._$onDblClick	, false );
		this._domElement.removeEventListener( 'mousemove'	, this._$onMouseMove	, false );
		this._domElement.removeEventListener( 'mousedown'	, this._$onMouseDown	, false );
		this._domElement.removeEventListener( 'mouseup'		, this._$onMouseUp	, false );
		this._domElement.removeEventListener( 'touchmove'	, this._$onTouchMove	, false );
		this._domElement.removeEventListener( 'touchstart'	, this._$onTouchStart	, false );
		this._domElement.removeEventListener( 'touchend'	, this._$onTouchEnd	, false );
		this._domElement=null;
	}
}

THREEx.DomEvent.prototype.setBoundContext = function(boundContext) {
	this._boundContext=boundContext;
	if(this._boundObjs[boundContext]===undefined)
		this._boundObjs[boundContext]=[];
}

THREEx.DomEvent.prototype.unsetBoundContext = function(boundContext) {
	if(this._boundObjs[boundContext]!==undefined) {
		var boundObjs=this._boundObjs[boundContext];
		for(var i=0;i<boundObjs.length;i++) {
			var object3d=boundObjs[i];
			if(object3d._3xDomEvent) {
				for(var f in object3d._3xDomEvent) {
					var m=/^(.*)Handlers$/.exec(f);
					if(m) {
						var event=m[1];
						var handlers=object3d._3xDomEvent[f];
						for(var j=0;j<handlers.length;j++) {
							var handler=handlers[j];
							this.unbind(object3d,event,handler.callback,handler.useCapture);
						}
					}
				}
			}
		}
	}
}


// # Destructor
THREEx.DomEvent.prototype.destroy	= function()
{
	for(var bc in this._boundObjs)
		this.unsetBoundContext(bc);
	
	// unBind dom event for mouse and touch
	this.unsetDOMElement();
}

THREEx.DomEvent.eventNames	= [
	//"click",
	//"dblclick",
	//"holdclick",
	//"mouseover",
	//"mouseout",
	"mousedown",
	"mouseup",
	"mousemove",
	"touchmove",
	"touchstart",
	"touchend",
];

/********************************************************************************/
/*		domevent context						*/
/********************************************************************************/

// handle domevent context in object3d instance

THREEx.DomEvent.prototype._objectCtxInit	= function(object3d){
	object3d._3xDomEvent = {};
}
THREEx.DomEvent.prototype._objectCtxDeinit	= function(object3d){
	delete object3d._3xDomEvent;
}
THREEx.DomEvent.prototype._objectCtxIsInit	= function(object3d){
	return object3d._3xDomEvent ? true : false;
}
THREEx.DomEvent.prototype._objectCtxGet	= function(object3d){
	return object3d._3xDomEvent;
}

/********************************************************************************/
/*										*/
/********************************************************************************/

/**
 * Getter/Setter for camera
*/
THREEx.DomEvent.prototype.camera	= function(value)
{
	if( value )	this._camera	= value;
	return this._camera;
}

THREEx.DomEvent.prototype.bind	= function(object3d, eventName, callback, useCapture)
{
	var $this=this;
	console.assert( THREEx.DomEvent.eventNames.indexOf(eventName) !== -1, "not available events:"+eventName );

	if( !this._objectCtxIsInit(object3d) )	this._objectCtxInit(object3d);
	var objectCtx	= this._objectCtxGet(object3d);	
	if( !objectCtx[eventName+'Handlers'] )	objectCtx[eventName+'Handlers']	= [];

	objectCtx[eventName+'Handlers'].push({
		callback	: callback,
		useCapture	: useCapture
	});
	
	function AddToBoundObjs(object3d) {
		$this._boundObjs[$this._boundContext].push(object3d);
		for(var i=0;i<object3d.children.length;i++)
			AddToBoundObjs(object3d.children[i]);
	}
	
	// add this object in this._boundObjs
	AddToBoundObjs(object3d);
	//console.log("boundObjs",this._boundObjs)
}

THREEx.DomEvent.prototype.unbind	= function(object3d, eventName, callback)
{
	var $this=this;
	console.assert( THREEx.DomEvent.eventNames.indexOf(eventName) !== -1, "not available events:"+eventName );

	if( !this._objectCtxIsInit(object3d) )	this._objectCtxInit(object3d);

	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx[eventName+'Handlers'] )	objectCtx[eventName+'Handlers']	= [];

	function RemoveFromBoundObjs(object3d) {
		var index = $this._boundObjs[$this._boundContext].indexOf(object3d);
		if(index>=0)
			$this._boundObjs[$this._boundContext].splice(index, 1);
		for(var i=0;i<object3d.children.length;i++)
			RemoveFromBoundObjs(object3d.children[i]);
	}
	
	var handlers	= objectCtx[eventName+'Handlers'];
	for(var i = 0; i < handlers.length; i++){
		var handler	= handlers[i];
		if( callback && callback != handler.callback )	continue;
		//if( useCapture != handler.useCapture )	continue;
		handlers.splice(i, 1)
		// from this object from this._boundObjs
		RemoveFromBoundObjs(object3d);
		break;
	}
}

THREEx.DomEvent.prototype._bound	= function(eventName, object3d)
{
	var objectCtx	= this._objectCtxGet(this.getRootObject(object3d));
	if( !objectCtx )	return false;
	return objectCtx[eventName+'Handlers'] ? true : false;
}

THREEx.DomEvent.prototype.getRootObject = function(object3d) {
	var object3d0=object3d;
	while(object3d && !object3d._3xDomEvent)
		object3d=object3d.parent;
	if(!object3d)
		console.error("Could not find root object for",object3d0);
	return object3d;
}

THREEx.DomEvent.prototype.isTHREExTarget = function(clientX, clientY) {
	var domElement=$(this._domElement);
	var offset=domElement.offset();
	var mouseX	= +((clientX-offset.left) / domElement.width() ) * 2 - 1;
	var mouseY	= -((clientY-offset.top) / domElement.height()) * 2 + 1;

	var vector	= new THREE.Vector3( mouseX, mouseY, 1 );
	vector.unproject( this._camera );
    var worldPos = new THREE.Vector3();
    this._camera.getWorldPosition( worldPos );
	vector.sub( worldPos ).normalize()
	var ray		= new THREE.Raycaster( worldPos, vector );
	var intersects	= ray.intersectObjects( this._boundObjs[this._boundContext] );
	return intersects.length !== 0;
}

THREEx.DomEvent.prototype.lockObject = function(event,enableDrag) {
	if(/^mouse/.test(event.type) && event.button!=0)
		return false;
	var domElement=$(this._domElement);
	var offset=domElement.offset();
	var x, y;
	if(event.clientX!==undefined && event.clientY!==undefined) {
		x = event.clientX;
		y = event.clientY;
	} else if(event.touches && event.touches.length>0) {
		x = event.touches[0].pageX;
		y = event.touches[0].pageY;
	} else if(event.changedTouches && event.changedTouches.length>0) {
		x = event.changedTouches[0].pageX;
		y = event.changedTouches[0].pageY;
	} else {
		console.warn("Unable to get event position");
		return false;
	}
		
	var mouseX	= +((x-offset.left) / domElement.width() ) * 2 - 1;
	var mouseY	= -((y-offset.top) / domElement.height()) * 2 + 1;
	
	var vector	= new THREE.Vector3( mouseX, mouseY, 1 );
	vector.unproject( this._camera );
    var worldPos = new THREE.Vector3();
    this._camera.getWorldPosition( worldPos );
    //vector.sub( this._camera.position ).normalize()
    vector.sub( worldPos ).normalize()
	var ray		= new THREE.Raycaster( worldPos, vector );
	var intersects	= ray.intersectObjects( this._boundObjs[this._boundContext] );
	this.objectLocked = intersects.length !== 0;
	this.enableDrag = this.objectLocked && enableDrag;
	return this.objectLocked;
}

/********************************************************************************/
/*		onEvent								*/
/********************************************************************************/

// # handle click kind of events

THREEx.DomEvent.prototype._onEvent	= function(eventName, mouseX, mouseY, origDomEvent, eventX, eventY)
{
	//console.log("_onEvent",eventName,mouseX,mouseY);

	if(eventName=="mouseup") {
		this.mouseIsDown = false;		
		if(!this.objectLocked)
			return null;
	} else if(eventName=="mousedown") {
		this.mouseIsDown = true;
		this.mouseDownPos = [eventX, eventY];
		this.mouseDragNotified = false;
		this.lastDownTime = Date.now();
	} else if(eventName=="mousemove") {
		if(this.mouseIsDown) {
			var dx = this.mouseDownPos[0] - eventX;
			var dy = this.mouseDownPos[1] - eventY;
			var distSq = dx * dx + dy * dy;
			if(this.enableDrag) {
				if(distSq < 100)
					return null;
				if(!this.mouseDragNotified) {
					if(Date.now()-this.lastDownTime<50)
						return null;
					this.mouseDragNotified = true;
					return this._onEvent("mouseup", this.mouseEventPos[0], this.mouseEventPos[1], origDomEvent, eventX, eventY);
				}
			} else {
				if(distSq > 100) {
					this.objectLocked = false;
					return null;
				}
			}
		}
	}

	var vector	= new THREE.Vector3( mouseX, mouseY, 1 );
	vector.unproject( this._camera );
    var worldPos = new THREE.Vector3();
    this._camera.getWorldPosition( worldPos );
	vector.sub( worldPos ).normalize()
	var ray		= new THREE.Raycaster( worldPos, vector );
	var intersects	= ray.intersectObjects( this._boundObjs[this._boundContext] );
	
	//console.log("camera",this._camera.position,"ray",ray,"bound",this._boundObjs)

	// if there are no intersections, return now
	if( intersects.length === 0 )	{
		//console.warn("THREEx",eventName,"No hit");
		return null;
	}
	
	// init some vairables
	var intersect	= intersects[0];
	var object3d	= this.getRootObject(intersect.object);
	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx )	return null;

	// notify handlers
	this._notify(eventName, object3d, origDomEvent, intersect.point);
}

THREEx.DomEvent.prototype._notify	= function(eventName, object3d, origDomEvent, point)
{
	//console.log("notify",eventName,"to",object3d.id)
	var objectCtx	= this._objectCtxGet(object3d);
	var handlers	= objectCtx ? objectCtx[eventName+'Handlers'] : null;

	// do bubbling
	if( !objectCtx || !handlers || handlers.length === 0 ) {
		if(object3d.parent)
			this._notify(eventName, object3d.parent);
		return;
	}
	
	// notify all handlers
	var handlers	= objectCtx[eventName+'Handlers'];
	for(var i = 0; i < handlers.length; i++){
		var handler	= handlers[i];
		var toPropagate	= true;
		handler.callback({
			type		: eventName,
			target		: object3d,
			origDomEvent	: origDomEvent,
			stopPropagation	: function(){
				toPropagate	= false;
			},
			point: point
		});
		if( !toPropagate )	continue;
		// do bubbling
		if( handler.useCapture === false ){
			object3d.parent && this._notify(eventName, object3d.parent, origDomEvent, point);
		}
	}
}

/********************************************************************************/
/*		handle mouse events						*/
/********************************************************************************/
// # handle mouse events

//THREEx.DomEvent.longClickTimer=null;

THREEx.DomEvent.prototype._onMouseDown	= function(event) {
	//console.log("_onMouseDown",event.type)
	var $this=this;
	
	if(event.button!==0)
		return;
	/*
	if(THREEx.DomEvent.longClickTimer)
		clearTimeout(THREEx.DomEvent.longClickTimer);
	THREEx.DomEvent.longClickTimer=setTimeout(function() {
		THREEx.DomEvent.longClickTimer=null;
		$this._onMouseEvent('holdclick', event);
	},500);
	*/
	return this._onMouseEvent('mousedown', event);	
}
THREEx.DomEvent.prototype._onMouseUp	= function(event) {

	if(event.button!==0)
		return;

	//console.log("_onMouseUp",event.type)
	/*
	if(THREEx.DomEvent.longClickTimer) {
		clearTimeout(THREEx.DomEvent.longClickTimer);
		THREEx.DomEvent.longClickTimer=null;
	}
	*/
	return this._onMouseEvent('mouseup'	, event);	
}

THREEx.DomEvent.prototype._onMouseMove	= function(event)
{
	//console.log("_onMouseMove",event.type)
	if(!this.mouseIsDown)
		return null;
	/*
	if(THREEx.DomEvent.longClickTimer) {
		clearTimeout(THREEx.DomEvent.longClickTimer);
		THREEx.DomEvent.longClickTimer = null;
	}
	*/
	return this._onMouseEvent('mousemove', event);	
}

THREEx.DomEvent.prototype._onMouseEvent	= function(eventName, domEvent)
{
	var domElement=$(this._domElement);
	var offset=domElement.offset();
	var mouseX	= +((domEvent.clientX-offset.left) / domElement.width() ) * 2 - 1;
	var mouseY	= -((domEvent.clientY-offset.top) / domElement.height()) * 2 + 1;
	this.mouseEventPos = [ mouseX, mouseY ];
	return this._onEvent(eventName, mouseX, mouseY, domEvent, domEvent.clientX-offset.left, domEvent.clientY-offset.top);
}

/*
THREEx.DomEvent.prototype._onClick		= function(event)
{
	// TODO handle touch ?
	return this._onMouseEvent('click'	, event);
}
THREEx.DomEvent.prototype._onDblClick		= function(event)
{
	// TODO handle touch ?
	return this._onMouseEvent('dblclick'	, event);
}
*/

/********************************************************************************/
/*		handle touch events						*/
/********************************************************************************/
// # handle touch events


THREEx.DomEvent.prototype._onTouchStart	= function(event){ return this._onTouchEvent('mousedown', event);	}
THREEx.DomEvent.prototype._onTouchEnd	= function(event){ return this._onTouchEvent('mouseup'	, event);	}
THREEx.DomEvent.prototype._onTouchMove	= function(event){ 	
	if(!this.mouseIsDown) 
		return null; 
	else 
		return this._onTouchEvent('mousemove', event);	
}

/*
THREEx.DomEvent.prototype._onTouchMove	= function(domEvent)
{
	if( domEvent.touches.length != 1 )	return undefined;

	domEvent.preventDefault();

	var mouseX	= +(domEvent.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(domEvent.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
	return this._onMove('mousemove', mouseX, mouseY, domEvent);
}
*/

THREEx.DomEvent.prototype._onTouchEvent	= function(eventName, domEvent)
{
	var domElement=$(this._domElement);
	var offset=domElement.offset();
	var mouseX=0, mouseY=0, eventX=0, eventY=0;
	if(domEvent.touches && domEvent.touches.length>0) {
		mouseX	= +((domEvent.touches[0].clientX-offset.left) / domElement.width() ) * 2 - 1;
		mouseY	= -((domEvent.touches[0].clientY-offset.top) / domElement.height()) * 2 + 1;
		eventX = domEvent.touches[0].clientX-offset.left;
		eventY = domEvent.touches[0].clientY-offset.top;
	} else if(domEvent.changedTouches && domEvent.changedTouches.length>0) {
		mouseX	= +((domEvent.changedTouches[0].clientX-offset.left) / domElement.width() ) * 2 - 1;
		mouseY	= -((domEvent.changedTouches[0].clientY-offset.top) / domElement.height()) * 2 + 1;
		eventX = domEvent.changedTouches[0].clientX-offset.left;
		eventY = domEvent.changedTouches[0].clientY-offset.top;
	}
	this.mouseEventPos = [ mouseX, mouseY ];
	return this._onEvent(eventName, mouseX, mouseY, domEvent, eventX, eventY);
}


/********************************************************************************/
// # Patch THREE.Object3D
/********************************************************************************/

// handle noConflit.
THREEx.DomEvent.noConflict	= function(){
	THREEx.DomEvent.noConflict.symbols.forEach(function(symbol){
		THREE.Object3D.prototype[symbol]	= THREEx.DomEvent.noConflict.previous[symbol]
	})
}
// Backup previous values to restore them later if needed.
THREEx.DomEvent.noConflict.symbols	= ['on', 'off', 'addEventListener', 'removeEventListener'];
THREEx.DomEvent.noConflict.previous	= {};
THREEx.DomEvent.noConflict.symbols.forEach(function(symbol){
	THREEx.DomEvent.noConflict.previous[symbol]	= THREE.Object3D.prototype[symbol]
})

// begin the actual patching of THREE.Object3D

// create the global instance of THREEx.DomEvent
//THREE.Object3D._threexDomEvent	= new THREEx.DomEvent();

// # wrap mouseevents.bind()
THREE.Object3D.prototype._addEventListener = THREE.Object3D.prototype.addEventListener;
THREE.Object3D.prototype.on	=
THREE.Object3D.prototype.addEventListener = function(eventName, callback){
	THREE.Object3D._threexDomEvent.bind(this, eventName, callback);
	return this;
}

// # wrap mouseevents.unbind()
THREE.Object3D.prototype._removeEventListener = THREE.Object3D.prototype.removeEventListener;
THREE.Object3D.prototype.off	=
THREE.Object3D.prototype.removeEventListener	= function(eventName, callback){
	THREE.Object3D._threexDomEvent.unbind(this, eventName, callback);
	return this;
}

/**
 * @author alteredq / http://alteredqualia.com/
 * @authod mrdoob / http://mrdoob.com/
 * @authod arodic / http://aleksandarrodic.com/
 * @authod fonserbc / http://fonserbc.github.io/
*/

THREE.StereoEffect = function ( renderer ) {

	var _stereo = new THREE.StereoCamera();
	_stereo.aspect = 0.5;

	this.setEyeSeparation = function ( eyeSep ) {

		_stereo.eyeSep = eyeSep;

	};

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		_stereo.update( camera );

		var size = renderer.getSize();

		if ( renderer.autoClear ) renderer.clear();
		renderer.setScissorTest( true );

		renderer.setScissor( 0, 0, size.width / 2, size.height );
		renderer.setViewport( 0, 0, size.width / 2, size.height );
		renderer.render( scene, _stereo.cameraL );

		renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
		renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
		renderer.render( scene, _stereo.cameraR );

		renderer.setScissorTest( false );

	};

};

/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 * @author tschw
 */

THREE.AnaglyphEffect = function ( renderer, width, height ) {

	// Matrices generated with angler.js https://github.com/tschw/angler.js/
	// (in column-major element order, as accepted by WebGL)

	this.colorMatrixLeft = new THREE.Matrix3().fromArray( [

			1.0671679973602295, 	-0.0016435992438346148,		 0.0001777536963345483, // r out
			-0.028107794001698494,	-0.00019593400065787137,	-0.0002875397040043026, // g out
			-0.04279090091586113,	 0.000015809757314855233,	-0.00024287120322696865 // b out

	] );

	//		red						green 						blue  						in

	this.colorMatrixRight = new THREE.Matrix3().fromArray( [

			-0.0355340838432312,	-0.06440307199954987,		 0.018319187685847282,	// r out
			-0.10269022732973099,	 0.8079727292060852,		-0.04835830628871918,	// g out
			0.0001224992738571018,	-0.009558862075209618,		 0.567823588848114		// b out

	] );

	var _camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

	var _scene = new THREE.Scene();

	var _stereo = new THREE.StereoCamera();

	var _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

	if ( width === undefined ) width = 512;
	if ( height === undefined ) height = 512;

	var _renderTargetL = new THREE.WebGLRenderTarget( width, height, _params );
	var _renderTargetR = new THREE.WebGLRenderTarget( width, height, _params );

	var _material = new THREE.ShaderMaterial( {

		uniforms: {

			"mapLeft": { value: _renderTargetL.texture },
			"mapRight": { value: _renderTargetR.texture },

			"colorMatrixLeft": { value: this.colorMatrixLeft },
			"colorMatrixRight": { value: this.colorMatrixRight }

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

			"	vUv = vec2( uv.x, uv.y );",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform sampler2D mapLeft;",
			"uniform sampler2D mapRight;",
			"varying vec2 vUv;",

			"uniform mat3 colorMatrixLeft;",
			"uniform mat3 colorMatrixRight;",

			// These functions implement sRGB linearization and gamma correction

			"float lin( float c ) {",
			"	return c <= 0.04045 ? c * 0.0773993808 :",
			"			pow( c * 0.9478672986 + 0.0521327014, 2.4 );",
			"}",

			"vec4 lin( vec4 c ) {",
			"	return vec4( lin( c.r ), lin( c.g ), lin( c.b ), c.a );",
			"}",

			"float dev( float c ) {",
			"	return c <= 0.0031308 ? c * 12.92",
			"			: pow( c, 0.41666 ) * 1.055 - 0.055;",
			"}",


			"void main() {",

			"	vec2 uv = vUv;",

			"	vec4 colorL = lin( texture2D( mapLeft, uv ) );",
			"	vec4 colorR = lin( texture2D( mapRight, uv ) );",

			"	vec3 color = clamp(",
			"			colorMatrixLeft * colorL.rgb +",
			"			colorMatrixRight * colorR.rgb, 0., 1. );",

			"	gl_FragColor = vec4(",
			"			dev( color.r ), dev( color.g ), dev( color.b ),",
			"			max( colorL.a, colorR.a ) );",

			"}"

		].join( "\n" )

	} );

	var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), _material );
	_scene.add( mesh );

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );

		var pixelRatio = renderer.getPixelRatio();

		_renderTargetL.setSize( width * pixelRatio, height * pixelRatio );
		_renderTargetR.setSize( width * pixelRatio, height * pixelRatio );

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		_stereo.update( camera );

		renderer.render( scene, _stereo.cameraL, _renderTargetL, true );
		renderer.render( scene, _stereo.cameraR, _renderTargetR, true );
		renderer.render( _scene, _camera );

	};

	this.dispose = function() {

		if ( _renderTargetL ) _renderTargetL.dispose();
		if ( _renderTargetR ) _renderTargetR.dispose();

	};

};


function VRGamepads(opts) {
    var options = Object.assign({
        drag: function(position,direction) {
            return false;
        },
        click: function(position,direction) {
        },
        reset: function() {
        },
        speed: 10,
        move: function(delta) {
        },
        visionCrosshairAngle: -Math.PI/8,
        movementMin: .2,
    },opts);

    var harborpad = null;

    function VRGamepad(gamepad) {

        THREE.Object3D.call( this );

        this.matrixAutoUpdate = false;
        this.isVRPad = false;

        var axes = [];
        var buttons = [];
        var buttonsIndexes = {
            move: -1,
            click: -1,
            reset: -1
        }

        this.getGamepad = function () {
            return gamepad;
        }

        this.getButtonState = function ( button ) {
            return false;
        }

        this.drag = function() {
            var pointer = this.getPointer();
            var progress = this.progressObject;
            var pointed = options.drag(pointer.position,pointer.direction);
            if(pointed) {
                if(this.pointerRescale) {
                    var distance = pointer.position.distanceTo(pointed.point);
                    var thickness = harborpad ? .1 : 1;
                    this.pointerObject.scale.set(thickness,distance,thickness);
                }
                this.pointerObject.material.color.setRGB(0,1,0);

                if(progress) {
                    var oid = pointed.object.id;
                    if(this.pointedId==oid) {
                        const pointingTime = 2000;
                        var now = Date.now();
                        var ratio = 1-(now-this.pointedTime)/pointingTime;
                        if(ratio<0) {
                            options.click(pointer.position,pointer.direction);
                            this.pointedId = null;
                        } else
                            progress.scale.set(ratio,ratio,ratio);
                    } else {
                        this.pointedId = oid;
                        progress.scale.set(1,1,1);
                        this.pointedTime = Date.now();
                        progress.visible = true;
                    }
                }
            } else {
                this.pointerObject.material.color.setRGB(1,.75,0);
                if(this.pointerRescale) {
                    var thickness = harborpad ? .1 : 1;
                    this.pointerObject.scale.set(thickness,100,thickness);
                }

                if(progress && this.pointedId) {
                    progress.visible = false;
                    this.pointedId = null;
                }

            }
        }

        this.update = function() {
            var $this = this;

            if(this.crosshairNeedsUpdate) {
                var pointer = this.getPointer();
                this.pointerObject.position.copy(pointer.position);
                this.pointerObject.position.add(pointer.direction);
            }

            if(this.progressNeedsUpdate) {
                var pointer = this.getPointer();
                this.progressObject.position.copy(pointer.position);
                this.progressObject.position.add(pointer.direction);
            }

			var pose = gamepad.pose;
            if(pose) {
                if(pose.position)
                    this.position.fromArray(pose.position);
                if(pose.orientation)
                    this.quaternion.fromArray(pose.orientation);
                this.matrix.compose(this.position,this.quaternion,this.scale );
                this.matrixWorldNeedsUpdate = true;
            }
            if(gamepad.buttons) {
                var changedButtons = false;
                gamepad.buttons.forEach(function(button,index) {
                    if(index===buttonsIndexes.click && button.pressed)
                        $this.drag();
                    if(button.pressed!==buttons[index]) {
                        buttons[index] = button.pressed;
                        if(buttons[index]!==undefined) {
                            changedButtons = true;
                            if(index===buttonsIndexes.move)
                                $this.moveButtonChanged(button.pressed);
                            if(index===buttonsIndexes.click)
                                $this.clickButtonChanged(button.pressed);
                            if(index===buttonsIndexes.reset)
                                $this.resetButtonChanged(button.pressed);
                        }
                    }
                });
            }
            if(gamepad.axes) {
                var changedAxes = false;
                gamepad.axes.forEach(function(axe,index) {
                    if(axe!==axes[index]) {
                        axes[index] = axe;
                        changedAxes = true;
                    }
                });
                if(buttonsIndexes.move>=0 && buttons[buttonsIndexes.move]) {
                    var now = window.performance.now();
                    var last = this.lastThumbpadTimestamp;
                    var deltaT = now - last;
                    var rotation = new THREE.Matrix4().extractRotation(this.matrixWorld);
                    var direction = new THREE.Vector3(axes[0],0,-axes[1]).applyMatrix4(rotation);
                    direction.multiplyScalar(options.speed*deltaT/1000);
                    options.move(direction);
                    this.lastThumbpadTimestamp = now;
                }
                if(buttonsIndexes.move<0) {
                    var now = window.performance.now();
                    var movement = new THREE.Vector3(axes[0],0,axes[1]);
                    if(movement.length()>options.movementMin) {
                        var last = this.lastThumbpadTimestamp;
                        var deltaT = now - last;
                        // yeah i know, it could have been simpler
                        var direction = options.camera.getWorldDirection();
                        var xzDirection = new THREE.Vector3(direction.x,0,direction.z);
                        xzDirection.normalize();
                        xzDirection.applyAxisAngle(new THREE.Vector3(0,1,0),-Math.PI/2);
                        var rotateAxis = new THREE.Vector3(xzDirection.x,0,xzDirection.z)
                        rotateAxis.normalize();
                        var rotateAxis2 = new THREE.Vector3().copy(direction);
                        rotateAxis2.applyAxisAngle(rotateAxis,Math.PI/2);
                        var angle = Math.atan2(-axes[0],-axes[1]);
                        direction.applyAxisAngle(rotateAxis2,angle);
                        direction.multiplyScalar(options.speed*deltaT/1000);
                        options.move(direction);
                    }
                    this.lastThumbpadTimestamp = now;
                }
            }

            if(this.alwaysDrag)
                this.drag();
        }

        this.getPointer = function() {
            var position = this.getWorldPosition();
            if(gamepad.pose && gamepad.pose.hasOrientation) {
                var line = this.pointerObject;
                var pos0 = new THREE.Vector3(0,0,0);
                pos0.applyMatrix4(line.matrixWorld);
                var direction = new THREE.Vector3(0,-1,0);
                direction.applyMatrix4(line.matrixWorld);
                direction.sub(pos0);
                direction.normalize();
                return {
                    position: position,
                    direction: direction
                }
            } else {
                var position = options.camera.getWorldPosition();
                var direction = options.camera.getWorldDirection();
                position.add(direction);
                return {
                    position: position,
                    direction: direction
                }
            }
        }

        this.moveButtonChanged = function(on) {
            if(on)
                this.lastThumbpadTimestamp = window.performance.now();
        }

        this.clickButtonChanged = function(on) {
            if(on)
                this.pointerObject.visible = true;
            else {
                this.pointerObject.visible = false;
                var pointer = this.getPointer();
                options.click(pointer.position,pointer.direction);
            }
        }

        this.resetButtonChanged = function(on) {

        }

        this.destroyGamepad = function() {
            if(this.parent)
                this.parent.remove(this);
            if(this.pointerObject && this.pointerObject.parent)
                this.pointerObject.parent.remove(this.pointerObject);
            if(this.progressObject && this.progressObject.parent)
                this.progressObject.parent.remove(this.progressObject);
        }

        var cache = {}

        this.createCrosshair = function() {
            var crosshair = cache["crosshair"];
            if(crosshair===undefined) {
                var geometry = new THREE.SphereGeometry(.02);
                var material = new THREE.MeshBasicMaterial( {color: 0xff0000 } );
                crosshair = new THREE.Mesh(geometry,material);
                cache["crosshair"] = crosshair;
            }
            crosshair = crosshair.clone();
            this.crosshairNeedsUpdate = true;
            this.pointerObject = crosshair;
            options.scene.add(crosshair);
            this.pointerRescale = false;
        }

        this.createProgress = function() {
            var progress = cache["progress"];
            if(progress===undefined) {
                var geometry = new THREE.SphereGeometry(.2,16,12);
                var material = new THREE.MeshBasicMaterial( {
                    color: 0xff0000,
                    opacity: .5,
                    transparent: true
                } );
                progress = new THREE.Mesh(geometry,material);
                progress.visible = false;
                cache["progress"] = progress;
            }
            progress = progress.clone();
            this.progressNeedsUpdate = true;
            this.progressObject = progress;
            options.scene.add(progress);
        }

        this.createViveControllerMesh = function() {

            var $this = this;
            // create clicking ray
            var line = cache["vive-controller-ray"];
            if(line===undefined) {
                var geometry = new THREE.CylinderGeometry(.008,.008,1,8);
                geometry.translate(0,-.5,0);
                var material = new THREE.MeshBasicMaterial( {color: 0x80ff80} );
                line = new THREE.Mesh( geometry, material );
                line.scale.set(1,100,1);
                line.rotateX(Math.PI/6);
                line.visible = false;
                cache["vive-controller-ray"] = line;
            }
            this.pointerObject = line.clone();
            this.add(this.pointerObject);
            this.pointerRescale = true;

            // create controller
            function AddController(object) {
                $this.add(object);
            }
            var controllerObject = cache["vive-controller"];
            if(controllerObject===undefined) {
                cache["vive-controller"] = [AddController];
                var loader = new THREE.JSONLoader();
                loader.load( options.resBase + 'vive-controller/vr_controller_vive_1_5.js',
                    function(geometry) {
                        var loader = new THREE.TextureLoader();
                        loader.setPath( options.resBase + 'vive-controller/' );
                        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                        material.map = loader.load( 'onepointfive_texture.png');
                        material.specularMap = loader.load( 'onepointfive_spec.png');
                        var controller = new THREE.Mesh(geometry,material);
                        var object = new THREE.Object3D();
                        object.add(controller);
                        cache["vive-controller"].forEach(function(callback) {
                            callback(object.clone());
                        });
                        cache["vive-controller"] = object;
                });
            } else if(Array.isArray(controllerObject)) {
                cache["vive-controller"].push(AddController);
            } else
                AddController(controllerObject.clone());
            options.camera.parent.add(this);
        }

        this.createOculusTouchMesh = function() {
            var $this = this;
            // create clicking ray
            var line = cache["touch-controller-ray"];
            if(line===undefined) {
                var geometry = new THREE.CylinderGeometry(.008,.008,1,8);
                geometry.translate(0,-.5,0);
                var material = new THREE.MeshBasicMaterial( {color: 0x80ff80} );
                line = new THREE.Mesh( geometry, material );
                line.scale.set(1,100,1);
                line.rotateX(Math.PI/6);
                line.visible = false;
                cache["touch-controller-ray"] = line;
            }
            this.pointerObject = line.clone();
            this.add(this.pointerObject);
            this.pointerRescale = true;

            // create controller
            function AddController(object) {
                $this.add(object);
            }
			var cacheName = "touch-controller-"+this.whichHand;
            var controllerObject = cache[cacheName];
            if(controllerObject===undefined) {
                cache[cacheName] = [AddController];
				var loader = new THREE.MTLLoader();
				loader.setPath(options.resBase + 'touch-controller/');
				loader.load("oculus-touch-controller-"+this.whichHand+".mtl",function(materials) {
					materials.preload();
					var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials( materials );
					objLoader.setPath(options.resBase + 'touch-controller/');
					objLoader.load( "oculus-touch-controller-"+$this.whichHand+".obj" , function ( controller ) {
                        var object = new THREE.Object3D();
						controller.position.add(new THREE.Vector3(.008,0.03,-.03));
                        object.add(controller);
                        cache[cacheName].forEach(function(callback) {
                            callback(object.clone());
                        });
                        cache[cacheName] = object;				
					});

				});
            } else if(Array.isArray(controllerObject)) {
                cache[cacheName].push(AddController);
            } else
                AddController(controllerObject.clone());
            options.camera.parent.add(this);
		}

        this.getAxes = function() {
            return axes;
        }

		if(/left/i.test(gamepad.id))
			this.whichHand = "left";
		if(/right/i.test(gamepad.id))
			this.whichHand = "right";
		
        if(/openvr/i.test(gamepad.id)) {
            this.createViveControllerMesh();
            buttonsIndexes = {
                move: 0,
                click: 1,
                reset: 3
            }
            this.isVRPad = true;
        } else if(/touch/i.test(gamepad.id)) {
            this.createOculusTouchMesh();
            buttonsIndexes = {
                move: -1,
                click: 1,
                reset: 3
            }
            this.isVRPad = true;
        } else if(gamepad.id=="simulated") {
            this.createCrosshair();
            this.createProgress();
            this.alwaysDrag = true;
        } else if(gamepad.id==/gear vr/i.test(gamepad.id)) {
            this.createCrosshair();
            buttonsIndexes = {
                move: -1,
                click: 1,
                reset: 1
            }
        } else {
            this.createCrosshair();
            buttonsIndexes = {
                move: -1,
                click: 7,
                reset: 1
            }
        }

    };

    VRGamepad.prototype = Object.create( THREE.Object3D.prototype );
    VRGamepad.prototype.constructor = VRGamepad;

    var knownGamepads = [];

    function mapGamepads() {
        var newGamepads = [];
        if(typeof navigator.getGamepads=="function") {
            var gamepadsList = navigator.getGamepads();
            for(var i = 0;i<gamepadsList.length;i++) {
                var gamepad = gamepadsList[i];
                if(gamepad) {
                    var isNewGamepad = true;
                    for(var j=0;j<knownGamepads.length;j++) {
                        var knownGamepad = knownGamepads[j];
                        if(gamepad===knownGamepad.getGamepad()) {
                            newGamepads.push(knownGamepad);
                            knownGamepads.splice(j,1);
                            isNewGamepad = false;
                            break;
                        }
                    }
                    if(isNewGamepad)
                        newGamepads.push(new VRGamepad(gamepad));
                }
            }
        }
        if(newGamepads.length==0) {
            var needSimulated = true;
            for(var j=0;j<knownGamepads.length;j++) {
                var knownGamepad = knownGamepads[j];
                if(knownGamepad.getGamepad().id=="simulated") {
                    newGamepads.push(knownGamepad);
                    knownGamepads.splice(j,1);
                    needSimulated = false;
                }
            }
            if(needSimulated)
                newGamepads.push(new VRGamepad({
                    id: "simulated"
                }));
        }
        knownGamepads.forEach(function(gamepad) {
            gamepad.destroyGamepad();
        });
        knownGamepads = newGamepads;
        harborpad = null;
        var firstVRPad = null;
        for(var i=0;i<knownGamepads.length;i++) {
            var gamepad = knownGamepads[i];
            if(gamepad.isVRPad) {
                if(firstVRPad) {
                    harborpad = gamepad;
                    break;
                } else
                    firstVRPad = gamepad;
            }
        }
        if(harborpad) {
			if(harborpad.whichHand=="right" && firstVRPad.whichHand=="left") {
				var tmpPad = harborpad;
				harborpad = firstVRPad;
				firstVRPad = tmpPad;
			}
            firstVRPad.pointerObject.scale.setX(.1);
            firstVRPad.pointerObject.scale.setZ(.1);
        } else if(firstVRPad) {
            firstVRPad.pointerObject.scale.setX(1);
            firstVRPad.pointerObject.scale.setZ(1);
        }

    }

    this.getHarborPad = function() {
        return harborpad;
    }

    this.update = function() {
        mapGamepads();
        knownGamepads.forEach(function(gamepad) {
            gamepad.update();
        });
    }

    this.clearAll = function() {
        knownGamepads.forEach(function(gamepad) {
            gamepad.destroyGamepad();
        });
        knownGamepads = [];
    }

}

/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 */

THREE.VRControls = function ( object, onError ) {

	var scope = this;

	var vrDisplay, vrDisplays;

	var standingMatrix = new THREE.Matrix4();

	var frameData = null;

	if ( 'VRFrameData' in window ) {

		frameData = new VRFrameData();

	}

	function gotVRDisplays( displays ) {

		vrDisplays = displays;

		if ( displays.length > 0 ) {

			vrDisplay = displays[ 0 ];

		} else {

			if ( onError ) onError( 'VR input not available.' );

		}

	}

	if ( navigator.getVRDisplays ) {

		navigator.getVRDisplays().then( gotVRDisplays ).catch ( function () {

			console.warn( 'THREE.VRControls: Unable to get VR Displays' );

		} );

	}

	// the Rift SDK returns the position in meters
	// this scale factor allows the user to define how meters
	// are converted to scene units.

	this.scale = 1;

	// If true will use "standing space" coordinate system where y=0 is the
	// floor and x=0, z=0 is the center of the room.
	this.standing = false;

	// Distance from the users eyes to the floor in meters. Used when
	// standing=true but the VRDisplay doesn't provide stageParameters.
	this.userHeight = 1.6;

	this.getVRDisplay = function () {

		return vrDisplay;

	};

	this.setVRDisplay = function ( value ) {

		vrDisplay = value;

	};

	this.getVRDisplays = function () {

		console.warn( 'THREE.VRControls: getVRDisplays() is being deprecated.' );
		return vrDisplays;

	};

	this.getStandingMatrix = function () {

		return standingMatrix;

	};

	this.update = function () {

		if ( vrDisplay ) {

			var pose;

			if ( vrDisplay.getFrameData ) {

				vrDisplay.getFrameData( frameData );
				pose = frameData.pose;

			} else if ( vrDisplay.getPose ) {

				pose = vrDisplay.getPose();

			}

			if ( pose.orientation !== null ) {

				object.quaternion.fromArray( pose.orientation );

			}

			if ( pose.position !== null ) {

				object.position.fromArray( pose.position );

			} else {

				object.position.set( 0, 0, 0 );

			}

			if ( this.standing ) {

				if ( vrDisplay.stageParameters ) {

					object.updateMatrix();

					standingMatrix.fromArray( vrDisplay.stageParameters.sittingToStandingTransform );
					object.applyMatrix( standingMatrix );

				} else {

					object.position.setY( object.position.y + this.userHeight );

				}

			}

			object.position.multiplyScalar( scope.scale );

		}

	};

	this.resetPose = function () {

		if ( vrDisplay ) {

			vrDisplay.resetPose();

		}

	};

	this.resetSensor = function () {

		console.warn( 'THREE.VRControls: .resetSensor() is now .resetPose().' );
		this.resetPose();

	};

	this.zeroSensor = function () {

		console.warn( 'THREE.VRControls: .zeroSensor() is now .resetPose().' );
		this.resetPose();

	};

	this.dispose = function () {

		vrDisplay = null;

	};

};

/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 *
 * WebVR Spec: http://mozvr.github.io/webvr-spec/webvr.html
 *
 * Firefox: http://mozvr.com/downloads/
 * Chromium: https://webvr.info/get-chrome
 *
 */

THREE.VREffect = function( renderer, onError ) {

	var vrDisplay, vrDisplays;
	var eyeTranslationL = new THREE.Vector3();
	var eyeTranslationR = new THREE.Vector3();
	var renderRectL, renderRectR;

	var frameData = null;

	if ( 'VRFrameData' in window ) {

		frameData = new window.VRFrameData();

	}

	function gotVRDisplays( displays ) {

		vrDisplays = displays;

		if ( displays.length > 0 ) {

			vrDisplay = displays[ 0 ];

		} else {

			if ( onError ) onError( 'HMD not available' );

		}

	}

	if ( navigator.getVRDisplays ) {

		navigator.getVRDisplays().then( gotVRDisplays ).catch( function() {

			console.warn( 'THREE.VREffect: Unable to get VR Displays' );

		} );

	}

	//

	this.isPresenting = false;
	this.scale = 1;

	var scope = this;

	var rendererSize = renderer.getSize();
	var rendererUpdateStyle = false;
	var rendererPixelRatio = renderer.getPixelRatio();

	this.getVRDisplay = function() {

		return vrDisplay;

	};

	this.setVRDisplay = function( value ) {

		vrDisplay = value;

	};

	this.getVRDisplays = function() {

		console.warn( 'THREE.VREffect: getVRDisplays() is being deprecated.' );
		return vrDisplays;

	};

	this.setSize = function( width, height, updateStyle ) {

		rendererSize = { width: width, height: height };
		rendererUpdateStyle = updateStyle;

		if ( scope.isPresenting ) {

			var eyeParamsL = vrDisplay.getEyeParameters( 'left' );
			renderer.setPixelRatio( 1 );
			renderer.setSize( eyeParamsL.renderWidth * 2, eyeParamsL.renderHeight, false );

		} else {

			renderer.setPixelRatio( rendererPixelRatio );
			renderer.setSize( width, height, updateStyle );

		}

	};

	// VR presentation

	var canvas = renderer.domElement;
	var defaultLeftBounds = [ 0.0, 0.0, 0.5, 1.0 ];
	var defaultRightBounds = [ 0.5, 0.0, 0.5, 1.0 ];

	function onVRDisplayPresentChange() {

		var wasPresenting = scope.isPresenting;
		scope.isPresenting = vrDisplay !== undefined && vrDisplay.isPresenting;

		if ( scope.isPresenting ) {

			var eyeParamsL = vrDisplay.getEyeParameters( 'left' );
			var eyeWidth = eyeParamsL.renderWidth;
			var eyeHeight = eyeParamsL.renderHeight;

			if ( ! wasPresenting ) {

				rendererPixelRatio = renderer.getPixelRatio();
				rendererSize = renderer.getSize();

				renderer.setPixelRatio( 1 );
				renderer.setSize( eyeWidth * 2, eyeHeight, false );

			}

		} else if ( wasPresenting ) {

			renderer.setPixelRatio( rendererPixelRatio );
			renderer.setSize( rendererSize.width, rendererSize.height, rendererUpdateStyle );

		}

	}

	window.addEventListener( 'vrdisplaypresentchange', onVRDisplayPresentChange, false );

	this.setFullScreen = function( boolean ) {

		return new Promise( function( resolve, reject ) {

			if ( vrDisplay === undefined ) {

				reject( new Error( 'No VR hardware found.' ) );
				return;

			}

			if ( scope.isPresenting === boolean ) {

				resolve();
				return;

			}

			if ( boolean ) {

				resolve( vrDisplay.requestPresent( [ { source: canvas } ] ) );

			} else {

				resolve( vrDisplay.exitPresent() );

			}

		} );

	};

	this.requestPresent = function() {

		return this.setFullScreen( true );

	};

	this.exitPresent = function() {

		return this.setFullScreen( false );

	};

	this.requestAnimationFrame = function( f ) {

		if ( vrDisplay !== undefined ) {

			return vrDisplay.requestAnimationFrame( f );

		} else {

			return window.requestAnimationFrame( f );

		}

	};

	this.cancelAnimationFrame = function( h ) {

		if ( vrDisplay !== undefined ) {

			vrDisplay.cancelAnimationFrame( h );

		} else {

			window.cancelAnimationFrame( h );

		}

	};

	this.submitFrame = function() {

		if ( vrDisplay !== undefined && scope.isPresenting ) {

			vrDisplay.submitFrame();

		}

	};

	this.autoSubmitFrame = true;

	// render

	var cameraL = new THREE.PerspectiveCamera();
	cameraL.layers.enable( 1 );

	var cameraR = new THREE.PerspectiveCamera();
	cameraR.layers.enable( 2 );

	this.render = function( scene, camera, renderTarget, forceClear ) {

		if ( vrDisplay && scope.isPresenting ) {

			var autoUpdate = scene.autoUpdate;

			if ( autoUpdate ) {

				scene.updateMatrixWorld();
				scene.autoUpdate = false;

			}

			var eyeParamsL = vrDisplay.getEyeParameters( 'left' );
			var eyeParamsR = vrDisplay.getEyeParameters( 'right' );

			eyeTranslationL.fromArray( eyeParamsL.offset );
			eyeTranslationR.fromArray( eyeParamsR.offset );

			if ( Array.isArray( scene ) ) {

				console.warn( 'THREE.VREffect.render() no longer supports arrays. Use object.layers instead.' );
				scene = scene[ 0 ];

			}

			// When rendering we don't care what the recommended size is, only what the actual size
			// of the backbuffer is.
			var size = renderer.getSize();
			var layers = vrDisplay.getLayers();
			var leftBounds;
			var rightBounds;

			if ( layers.length ) {

				var layer = layers[ 0 ];

				leftBounds = layer.leftBounds !== null && layer.leftBounds.length === 4 ? layer.leftBounds : defaultLeftBounds;
				rightBounds = layer.rightBounds !== null && layer.rightBounds.length === 4 ? layer.rightBounds : defaultRightBounds;

			} else {

				leftBounds = defaultLeftBounds;
				rightBounds = defaultRightBounds;

			}

			renderRectL = {
				x: Math.round( size.width * leftBounds[ 0 ] ),
				y: Math.round( size.height * leftBounds[ 1 ] ),
				width: Math.round( size.width * leftBounds[ 2 ] ),
				height: Math.round( size.height * leftBounds[ 3 ] )
			};
			renderRectR = {
				x: Math.round( size.width * rightBounds[ 0 ] ),
				y: Math.round( size.height * rightBounds[ 1 ] ),
				width: Math.round( size.width * rightBounds[ 2 ] ),
				height: Math.round( size.height * rightBounds[ 3 ] )
			};

			if ( renderTarget ) {

				renderer.setRenderTarget( renderTarget );
				renderTarget.scissorTest = true;

			} else {

				renderer.setRenderTarget( null );
				renderer.setScissorTest( true );

			}

			if ( renderer.autoClear || forceClear ) renderer.clear();

			if ( camera.parent === null ) camera.updateMatrixWorld();

			camera.matrixWorld.decompose( cameraL.position, cameraL.quaternion, cameraL.scale );
			camera.matrixWorld.decompose( cameraR.position, cameraR.quaternion, cameraR.scale );

			var scale = this.scale;
			cameraL.translateOnAxis( eyeTranslationL, scale );
			cameraR.translateOnAxis( eyeTranslationR, scale );

			if ( vrDisplay.getFrameData ) {

				vrDisplay.depthNear = camera.near;
				vrDisplay.depthFar = camera.far;

				vrDisplay.getFrameData( frameData );

				cameraL.projectionMatrix.elements = frameData.leftProjectionMatrix;
				cameraR.projectionMatrix.elements = frameData.rightProjectionMatrix;

			} else {

				cameraL.projectionMatrix = fovToProjection( eyeParamsL.fieldOfView, true, camera.near, camera.far );
				cameraR.projectionMatrix = fovToProjection( eyeParamsR.fieldOfView, true, camera.near, camera.far );

			}

			// render left eye
			if ( renderTarget ) {

				renderTarget.viewport.set( renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height );
				renderTarget.scissor.set( renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height );

			} else {

				renderer.setViewport( renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height );
				renderer.setScissor( renderRectL.x, renderRectL.y, renderRectL.width, renderRectL.height );

			}
			renderer.render( scene, cameraL, renderTarget, forceClear );

			// render right eye
			if ( renderTarget ) {

				renderTarget.viewport.set( renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height );
				renderTarget.scissor.set( renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height );

			} else {

				renderer.setViewport( renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height );
				renderer.setScissor( renderRectR.x, renderRectR.y, renderRectR.width, renderRectR.height );

			}
			renderer.render( scene, cameraR, renderTarget, forceClear );

			if ( renderTarget ) {

				renderTarget.viewport.set( 0, 0, size.width, size.height );
				renderTarget.scissor.set( 0, 0, size.width, size.height );
				renderTarget.scissorTest = false;
				renderer.setRenderTarget( null );

			} else {

				renderer.setViewport( 0, 0, size.width, size.height );
				renderer.setScissorTest( false );

			}

			if ( autoUpdate ) {

				scene.autoUpdate = true;

			}

			if ( scope.autoSubmitFrame ) {

				scope.submitFrame();

			}

			return;

		}

		// Regular render mode if not HMD

		renderer.render( scene, camera, renderTarget, forceClear );

	};

	this.dispose = function() {

		window.removeEventListener( 'vrdisplaypresentchange', onVRDisplayPresentChange, false );

	};

	//

	function fovToNDCScaleOffset( fov ) {

		var pxscale = 2.0 / ( fov.leftTan + fov.rightTan );
		var pxoffset = ( fov.leftTan - fov.rightTan ) * pxscale * 0.5;
		var pyscale = 2.0 / ( fov.upTan + fov.downTan );
		var pyoffset = ( fov.upTan - fov.downTan ) * pyscale * 0.5;
		return { scale: [ pxscale, pyscale ], offset: [ pxoffset, pyoffset ] };

	}

	function fovPortToProjection( fov, rightHanded, zNear, zFar ) {

		rightHanded = rightHanded === undefined ? true : rightHanded;
		zNear = zNear === undefined ? 0.01 : zNear;
		zFar = zFar === undefined ? 10000.0 : zFar;

		var handednessScale = rightHanded ? - 1.0 : 1.0;

		// start with an identity matrix
		var mobj = new THREE.Matrix4();
		var m = mobj.elements;

		// and with scale/offset info for normalized device coords
		var scaleAndOffset = fovToNDCScaleOffset( fov );

		// X result, map clip edges to [-w,+w]
		m[ 0 * 4 + 0 ] = scaleAndOffset.scale[ 0 ];
		m[ 0 * 4 + 1 ] = 0.0;
		m[ 0 * 4 + 2 ] = scaleAndOffset.offset[ 0 ] * handednessScale;
		m[ 0 * 4 + 3 ] = 0.0;

		// Y result, map clip edges to [-w,+w]
		// Y offset is negated because this proj matrix transforms from world coords with Y=up,
		// but the NDC scaling has Y=down (thanks D3D?)
		m[ 1 * 4 + 0 ] = 0.0;
		m[ 1 * 4 + 1 ] = scaleAndOffset.scale[ 1 ];
		m[ 1 * 4 + 2 ] = - scaleAndOffset.offset[ 1 ] * handednessScale;
		m[ 1 * 4 + 3 ] = 0.0;

		// Z result (up to the app)
		m[ 2 * 4 + 0 ] = 0.0;
		m[ 2 * 4 + 1 ] = 0.0;
		m[ 2 * 4 + 2 ] = zFar / ( zNear - zFar ) * - handednessScale;
		m[ 2 * 4 + 3 ] = ( zFar * zNear ) / ( zNear - zFar );

		// W result (= Z in)
		m[ 3 * 4 + 0 ] = 0.0;
		m[ 3 * 4 + 1 ] = 0.0;
		m[ 3 * 4 + 2 ] = handednessScale;
		m[ 3 * 4 + 3 ] = 0.0;

		mobj.transpose();

		return mobj;

	}

	function fovToProjection( fov, rightHanded, zNear, zFar ) {

		var DEG2RAD = Math.PI / 180.0;

		var fovPort = {
			upTan: Math.tan( fov.upDegrees * DEG2RAD ),
			downTan: Math.tan( fov.downDegrees * DEG2RAD ),
			leftTan: Math.tan( fov.leftDegrees * DEG2RAD ),
			rightTan: Math.tan( fov.rightDegrees * DEG2RAD )
		};

		return fovPortToProjection( fovPort, rightHanded, zNear, zFar );

	}

};

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.OBJLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

	this.materials = null;

	this.regexp = {
		// v float float float
		vertex_pattern           : /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
		// vn float float float
		normal_pattern           : /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
		// vt float float
		uv_pattern               : /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
		// f vertex vertex vertex
		face_vertex              : /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
		// f vertex/uv vertex/uv vertex/uv
		face_vertex_uv           : /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
		// f vertex/uv/normal vertex/uv/normal vertex/uv/normal
		face_vertex_uv_normal    : /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
		// f vertex//normal vertex//normal vertex//normal
		face_vertex_normal       : /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
		// o object_name | g group_name
		object_pattern           : /^[og]\s*(.+)?/,
		// s boolean
		smoothing_pattern        : /^s\s+(\d+|on|off)/,
		// mtllib file_reference
		material_library_pattern : /^mtllib /,
		// usemtl material_name
		material_use_pattern     : /^usemtl /
	};

};

THREE.OBJLoader.prototype = {

	constructor: THREE.OBJLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.FileLoader( scope.manager );
		loader.setPath( this.path );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text ) );

		}, onProgress, onError );

	},

	setPath: function ( value ) {

		this.path = value;

	},

	setMaterials: function ( materials ) {

		this.materials = materials;

	},

	_createParserState : function () {

		var state = {
			objects  : [],
			object   : {},

			vertices : [],
			normals  : [],
			uvs      : [],

			materialLibraries : [],

			startObject: function ( name, fromDeclaration ) {

				// If the current object (initial from reset) is not from a g/o declaration in the parsed
				// file. We need to use it for the first parsed g/o to keep things in sync.
				if ( this.object && this.object.fromDeclaration === false ) {

					this.object.name = name;
					this.object.fromDeclaration = ( fromDeclaration !== false );
					return;

				}

				var previousMaterial = ( this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined );

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize( true );

				}

				this.object = {
					name : name || '',
					fromDeclaration : ( fromDeclaration !== false ),

					geometry : {
						vertices : [],
						normals  : [],
						uvs      : []
					},
					materials : [],
					smooth : true,

					startMaterial : function( name, libraries ) {

						var previous = this._finalize( false );

						// New usemtl declaration overwrites an inherited material, except if faces were declared
						// after the material, then it must be preserved for proper MultiMaterial continuation.
						if ( previous && ( previous.inherited || previous.groupCount <= 0 ) ) {

							this.materials.splice( previous.index, 1 );

						}

						var material = {
							index      : this.materials.length,
							name       : name || '',
							mtllib     : ( Array.isArray( libraries ) && libraries.length > 0 ? libraries[ libraries.length - 1 ] : '' ),
							smooth     : ( previous !== undefined ? previous.smooth : this.smooth ),
							groupStart : ( previous !== undefined ? previous.groupEnd : 0 ),
							groupEnd   : -1,
							groupCount : -1,
							inherited  : false,

							clone : function( index ) {
								var cloned = {
									index      : ( typeof index === 'number' ? index : this.index ),
									name       : this.name,
									mtllib     : this.mtllib,
									smooth     : this.smooth,
									groupStart : 0,
									groupEnd   : -1,
									groupCount : -1,
									inherited  : false
								};
								cloned.clone = this.clone.bind(cloned);
								return cloned;
							}
						};

						this.materials.push( material );

						return material;

					},

					currentMaterial : function() {

						if ( this.materials.length > 0 ) {
							return this.materials[ this.materials.length - 1 ];
						}

						return undefined;

					},

					_finalize : function( end ) {

						var lastMultiMaterial = this.currentMaterial();
						if ( lastMultiMaterial && lastMultiMaterial.groupEnd === -1 ) {

							lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
							lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
							lastMultiMaterial.inherited = false;

						}

						// Ignore objects tail materials if no face declarations followed them before a new o/g started.
						if ( end && this.materials.length > 1 ) {

							for ( var mi = this.materials.length - 1; mi >= 0; mi-- ) {
								if ( this.materials[mi].groupCount <= 0 ) {
									this.materials.splice( mi, 1 );
								}
							}

						}

						// Guarantee at least one empty material, this makes the creation later more straight forward.
						if ( end && this.materials.length === 0 ) {

							this.materials.push({
								name   : '',
								smooth : this.smooth
							});

						}

						return lastMultiMaterial;

					}
				};

				// Inherit previous objects material.
				// Spec tells us that a declared material must be set to all objects until a new material is declared.
				// If a usemtl declaration is encountered while this new object is being parsed, it will
				// overwrite the inherited material. Exception being that there was already face declarations
				// to the inherited material, then it will be preserved for proper MultiMaterial continuation.

				if ( previousMaterial && previousMaterial.name && typeof previousMaterial.clone === "function" ) {

					var declared = previousMaterial.clone( 0 );
					declared.inherited = true;
					this.object.materials.push( declared );

				}

				this.objects.push( this.object );

			},

			finalize : function() {

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize( true );

				}

			},

			parseVertexIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseNormalIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseUVIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 2 ) * 2;

			},

			addVertex: function ( a, b, c ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ a + 2 ] );
				dst.push( src[ b + 0 ] );
				dst.push( src[ b + 1 ] );
				dst.push( src[ b + 2 ] );
				dst.push( src[ c + 0 ] );
				dst.push( src[ c + 1 ] );
				dst.push( src[ c + 2 ] );

			},

			addVertexLine: function ( a ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ a + 2 ] );

			},

			addNormal : function ( a, b, c ) {

				var src = this.normals;
				var dst = this.object.geometry.normals;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ a + 2 ] );
				dst.push( src[ b + 0 ] );
				dst.push( src[ b + 1 ] );
				dst.push( src[ b + 2 ] );
				dst.push( src[ c + 0 ] );
				dst.push( src[ c + 1 ] );
				dst.push( src[ c + 2 ] );

			},

			addUV: function ( a, b, c ) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ b + 0 ] );
				dst.push( src[ b + 1 ] );
				dst.push( src[ c + 0 ] );
				dst.push( src[ c + 1 ] );

			},

			addUVLine: function ( a ) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );

			},

			addFace: function ( a, b, c, d, ua, ub, uc, ud, na, nb, nc, nd ) {

				var vLen = this.vertices.length;

				var ia = this.parseVertexIndex( a, vLen );
				var ib = this.parseVertexIndex( b, vLen );
				var ic = this.parseVertexIndex( c, vLen );
				var id;

				if ( d === undefined ) {

					this.addVertex( ia, ib, ic );

				} else {

					id = this.parseVertexIndex( d, vLen );

					this.addVertex( ia, ib, id );
					this.addVertex( ib, ic, id );

				}

				if ( ua !== undefined ) {

					var uvLen = this.uvs.length;

					ia = this.parseUVIndex( ua, uvLen );
					ib = this.parseUVIndex( ub, uvLen );
					ic = this.parseUVIndex( uc, uvLen );

					if ( d === undefined ) {

						this.addUV( ia, ib, ic );

					} else {

						id = this.parseUVIndex( ud, uvLen );

						this.addUV( ia, ib, id );
						this.addUV( ib, ic, id );

					}

				}

				if ( na !== undefined ) {

					// Normals are many times the same. If so, skip function call and parseInt.
					var nLen = this.normals.length;
					ia = this.parseNormalIndex( na, nLen );

					ib = na === nb ? ia : this.parseNormalIndex( nb, nLen );
					ic = na === nc ? ia : this.parseNormalIndex( nc, nLen );

					if ( d === undefined ) {

						this.addNormal( ia, ib, ic );

					} else {

						id = this.parseNormalIndex( nd, nLen );

						this.addNormal( ia, ib, id );
						this.addNormal( ib, ic, id );

					}

				}

			},

			addLineGeometry: function ( vertices, uvs ) {

				this.object.geometry.type = 'Line';

				var vLen = this.vertices.length;
				var uvLen = this.uvs.length;

				for ( var vi = 0, l = vertices.length; vi < l; vi ++ ) {

					this.addVertexLine( this.parseVertexIndex( vertices[ vi ], vLen ) );

				}

				for ( var uvi = 0, l = uvs.length; uvi < l; uvi ++ ) {

					this.addUVLine( this.parseUVIndex( uvs[ uvi ], uvLen ) );

				}

			}

		};

		state.startObject( '', false );

		return state;

	},

	parse: function ( text ) {

		console.time( 'OBJLoader' );

		var state = this._createParserState();

		if ( text.indexOf( '\r\n' ) !== - 1 ) {

			// This is faster than String.split with regex that splits on both
			text = text.replace( /\r\n/g, '\n' );

		}

		if ( text.indexOf( '\\\n' ) !== - 1) {

			// join lines separated by a line continuation character (\)
			text = text.replace( /\\\n/g, '' );

		}

		var lines = text.split( '\n' );
		var line = '', lineFirstChar = '', lineSecondChar = '';
		var lineLength = 0;
		var result = [];

		// Faster to just trim left side of the line. Use if available.
		var trimLeft = ( typeof ''.trimLeft === 'function' );

		for ( var i = 0, l = lines.length; i < l; i ++ ) {

			line = lines[ i ];

			line = trimLeft ? line.trimLeft() : line.trim();

			lineLength = line.length;

			if ( lineLength === 0 ) continue;

			lineFirstChar = line.charAt( 0 );

			// @todo invoke passed in handler if any
			if ( lineFirstChar === '#' ) continue;

			if ( lineFirstChar === 'v' ) {

				lineSecondChar = line.charAt( 1 );

				if ( lineSecondChar === ' ' && ( result = this.regexp.vertex_pattern.exec( line ) ) !== null ) {

					// 0                  1      2      3
					// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

					state.vertices.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);

				} else if ( lineSecondChar === 'n' && ( result = this.regexp.normal_pattern.exec( line ) ) !== null ) {

					// 0                   1      2      3
					// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

					state.normals.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);

				} else if ( lineSecondChar === 't' && ( result = this.regexp.uv_pattern.exec( line ) ) !== null ) {

					// 0               1      2
					// ["vt 0.1 0.2", "0.1", "0.2"]

					state.uvs.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] )
					);

				} else {

					throw new Error( "Unexpected vertex/normal/uv line: '" + line  + "'" );

				}

			} else if ( lineFirstChar === "f" ) {

				if ( ( result = this.regexp.face_vertex_uv_normal.exec( line ) ) !== null ) {

					// f vertex/uv/normal vertex/uv/normal vertex/uv/normal
					// 0                        1    2    3    4    5    6    7    8    9   10         11         12
					// ["f 1/1/1 2/2/2 3/3/3", "1", "1", "1", "2", "2", "2", "3", "3", "3", undefined, undefined, undefined]

					state.addFace(
						result[ 1 ], result[ 4 ], result[ 7 ], result[ 10 ],
						result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
						result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
					);

				} else if ( ( result = this.regexp.face_vertex_uv.exec( line ) ) !== null ) {

					// f vertex/uv vertex/uv vertex/uv
					// 0                  1    2    3    4    5    6   7          8
					// ["f 1/1 2/2 3/3", "1", "1", "2", "2", "3", "3", undefined, undefined]

					state.addFace(
						result[ 1 ], result[ 3 ], result[ 5 ], result[ 7 ],
						result[ 2 ], result[ 4 ], result[ 6 ], result[ 8 ]
					);

				} else if ( ( result = this.regexp.face_vertex_normal.exec( line ) ) !== null ) {

					// f vertex//normal vertex//normal vertex//normal
					// 0                     1    2    3    4    5    6   7          8
					// ["f 1//1 2//2 3//3", "1", "1", "2", "2", "3", "3", undefined, undefined]

					state.addFace(
						result[ 1 ], result[ 3 ], result[ 5 ], result[ 7 ],
						undefined, undefined, undefined, undefined,
						result[ 2 ], result[ 4 ], result[ 6 ], result[ 8 ]
					);

				} else if ( ( result = this.regexp.face_vertex.exec( line ) ) !== null ) {

					// f vertex vertex vertex
					// 0            1    2    3   4
					// ["f 1 2 3", "1", "2", "3", undefined]

					state.addFace(
						result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
					);

				} else {

					throw new Error( "Unexpected face line: '" + line  + "'" );

				}

			} else if ( lineFirstChar === "l" ) {

				var lineParts = line.substring( 1 ).trim().split( " " );
				var lineVertices = [], lineUVs = [];

				if ( line.indexOf( "/" ) === - 1 ) {

					lineVertices = lineParts;

				} else {

					for ( var li = 0, llen = lineParts.length; li < llen; li ++ ) {

						var parts = lineParts[ li ].split( "/" );

						if ( parts[ 0 ] !== "" ) lineVertices.push( parts[ 0 ] );
						if ( parts[ 1 ] !== "" ) lineUVs.push( parts[ 1 ] );

					}

				}
				state.addLineGeometry( lineVertices, lineUVs );

			} else if ( ( result = this.regexp.object_pattern.exec( line ) ) !== null ) {

				// o object_name
				// or
				// g group_name

				// WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
				// var name = result[ 0 ].substr( 1 ).trim();
				var name = ( " " + result[ 0 ].substr( 1 ).trim() ).substr( 1 );

				state.startObject( name );

			} else if ( this.regexp.material_use_pattern.test( line ) ) {

				// material

				state.object.startMaterial( line.substring( 7 ).trim(), state.materialLibraries );

			} else if ( this.regexp.material_library_pattern.test( line ) ) {

				// mtl file

				state.materialLibraries.push( line.substring( 7 ).trim() );

			} else if ( ( result = this.regexp.smoothing_pattern.exec( line ) ) !== null ) {

				// smooth shading

				// @todo Handle files that have varying smooth values for a set of faces inside one geometry,
				// but does not define a usemtl for each face set.
				// This should be detected and a dummy material created (later MultiMaterial and geometry groups).
				// This requires some care to not create extra material on each smooth value for "normal" obj files.
				// where explicit usemtl defines geometry groups.
				// Example asset: examples/models/obj/cerberus/Cerberus.obj

				var value = result[ 1 ].trim().toLowerCase();
				state.object.smooth = ( value === '1' || value === 'on' );

				var material = state.object.currentMaterial();
				if ( material ) {

					material.smooth = state.object.smooth;

				}

			} else {

				// Handle null terminated files without exception
				if ( line === '\0' ) continue;

				throw new Error( "Unexpected line: '" + line  + "'" );

			}

		}

		state.finalize();

		var container = new THREE.Group();
		container.materialLibraries = [].concat( state.materialLibraries );

		for ( var i = 0, l = state.objects.length; i < l; i ++ ) {

			var object = state.objects[ i ];
			var geometry = object.geometry;
			var materials = object.materials;
			var isLine = ( geometry.type === 'Line' );

			// Skip o/g line declarations that did not follow with any faces
			if ( geometry.vertices.length === 0 ) continue;

			var buffergeometry = new THREE.BufferGeometry();

			buffergeometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry.vertices ), 3 ) );

			if ( geometry.normals.length > 0 ) {

				buffergeometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( geometry.normals ), 3 ) );

			} else {

				buffergeometry.computeVertexNormals();

			}

			if ( geometry.uvs.length > 0 ) {

				buffergeometry.addAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry.uvs ), 2 ) );

			}

			// Create materials

			var createdMaterials = [];

			for ( var mi = 0, miLen = materials.length; mi < miLen ; mi++ ) {

				var sourceMaterial = materials[mi];
				var material = undefined;

				if ( this.materials !== null ) {

					material = this.materials.create( sourceMaterial.name );

					// mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.
					if ( isLine && material && ! ( material instanceof THREE.LineBasicMaterial ) ) {

						var materialLine = new THREE.LineBasicMaterial();
						materialLine.copy( material );
						material = materialLine;

					}

				}

				if ( ! material ) {

					material = ( ! isLine ? new THREE.MeshPhongMaterial() : new THREE.LineBasicMaterial() );
					material.name = sourceMaterial.name;

				}

				material.shading = sourceMaterial.smooth ? THREE.SmoothShading : THREE.FlatShading;

				createdMaterials.push(material);

			}

			// Create mesh

			var mesh;

			if ( createdMaterials.length > 1 ) {

				for ( var mi = 0, miLen = materials.length; mi < miLen ; mi++ ) {

					var sourceMaterial = materials[mi];
					buffergeometry.addGroup( sourceMaterial.groupStart, sourceMaterial.groupCount, mi );

				}

				mesh = ( ! isLine ? new THREE.Mesh( buffergeometry, createdMaterials ) : new THREE.LineSegments( buffergeometry, createdMaterials ) );

			} else {

				mesh = ( ! isLine ? new THREE.Mesh( buffergeometry, createdMaterials[ 0 ] ) : new THREE.LineSegments( buffergeometry, createdMaterials[ 0 ] ) );
			}

			mesh.name = object.name;

			container.add( mesh );

		}

		console.timeEnd( 'OBJLoader' );

		return container;

	}

};

/**
 * Loads a Wavefront .mtl file specifying materials
 *
 * @author angelxuanchang
 */

THREE.MTLLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.MTLLoader.prototype = {

	constructor: THREE.MTLLoader,

	/**
	 * Loads and parses a MTL asset from a URL.
	 *
	 * @param {String} url - URL to the MTL file.
	 * @param {Function} [onLoad] - Callback invoked with the loaded object.
	 * @param {Function} [onProgress] - Callback for download progress.
	 * @param {Function} [onError] - Callback for download errors.
	 *
	 * @see setPath setTexturePath
	 *
	 * @note In order for relative texture references to resolve correctly
	 * you must call setPath and/or setTexturePath explicitly prior to load.
	 */
	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.FileLoader( this.manager );
		loader.setPath( this.path );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text ) );

		}, onProgress, onError );

	},

	/**
	 * Set base path for resolving references.
	 * If set this path will be prepended to each loaded and found reference.
	 *
	 * @see setTexturePath
	 * @param {String} path
	 *
	 * @example
	 *     mtlLoader.setPath( 'assets/obj/' );
	 *     mtlLoader.load( 'my.mtl', ... );
	 */
	setPath: function ( path ) {

		this.path = path;

	},

	/**
	 * Set base path for resolving texture references.
	 * If set this path will be prepended found texture reference.
	 * If not set and setPath is, it will be used as texture base path.
	 *
	 * @see setPath
	 * @param {String} path
	 *
	 * @example
	 *     mtlLoader.setPath( 'assets/obj/' );
	 *     mtlLoader.setTexturePath( 'assets/textures/' );
	 *     mtlLoader.load( 'my.mtl', ... );
	 */
	setTexturePath: function ( path ) {

		this.texturePath = path;

	},

	setBaseUrl: function ( path ) {

		console.warn( 'THREE.MTLLoader: .setBaseUrl() is deprecated. Use .setTexturePath( path ) for texture path or .setPath( path ) for general base path instead.' );

		this.setTexturePath( path );

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	},

	setMaterialOptions: function ( value ) {

		this.materialOptions = value;

	},

	/**
	 * Parses a MTL file.
	 *
	 * @param {String} text - Content of MTL file
	 * @return {THREE.MTLLoader.MaterialCreator}
	 *
	 * @see setPath setTexturePath
	 *
	 * @note In order for relative texture references to resolve correctly
	 * you must call setPath and/or setTexturePath explicitly prior to parse.
	 */
	parse: function ( text ) {

		var lines = text.split( '\n' );
		var info = {};
		var delimiter_pattern = /\s+/;
		var materialsInfo = {};

		for ( var i = 0; i < lines.length; i ++ ) {

			var line = lines[ i ];
			line = line.trim();

			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

				// Blank line or comment ignore
				continue;

			}

			var pos = line.indexOf( ' ' );

			var key = ( pos >= 0 ) ? line.substring( 0, pos ) : line;
			key = key.toLowerCase();

			var value = ( pos >= 0 ) ? line.substring( pos + 1 ) : '';
			value = value.trim();

			if ( key === 'newmtl' ) {

				// New material

				info = { name: value };
				materialsInfo[ value ] = info;

			} else if ( info ) {

				if ( key === 'ka' || key === 'kd' || key === 'ks' ) {

					var ss = value.split( delimiter_pattern, 3 );
					info[ key ] = [ parseFloat( ss[ 0 ] ), parseFloat( ss[ 1 ] ), parseFloat( ss[ 2 ] ) ];

				} else {

					info[ key ] = value;

				}

			}

		}

		var materialCreator = new THREE.MTLLoader.MaterialCreator( this.texturePath || this.path, this.materialOptions );
		materialCreator.setCrossOrigin( this.crossOrigin );
		materialCreator.setManager( this.manager );
		materialCreator.setMaterials( materialsInfo );
		return materialCreator;

	}

};

/**
 * Create a new THREE-MTLLoader.MaterialCreator
 * @param baseUrl - Url relative to which textures are loaded
 * @param options - Set of options on how to construct the materials
 *                  side: Which side to apply the material
 *                        THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
 *                  wrap: What type of wrapping to apply for textures
 *                        THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
 *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
 *                                Default: false, assumed to be already normalized
 *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
 *                                  Default: false
 * @constructor
 */

THREE.MTLLoader.MaterialCreator = function ( baseUrl, options ) {

	this.baseUrl = baseUrl || '';
	this.options = options;
	this.materialsInfo = {};
	this.materials = {};
	this.materialsArray = [];
	this.nameLookup = {};

	this.side = ( this.options && this.options.side ) ? this.options.side : THREE.FrontSide;
	this.wrap = ( this.options && this.options.wrap ) ? this.options.wrap : THREE.RepeatWrapping;

};

THREE.MTLLoader.MaterialCreator.prototype = {

	constructor: THREE.MTLLoader.MaterialCreator,

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	},

	setManager: function ( value ) {

		this.manager = value;

	},

	setMaterials: function ( materialsInfo ) {

		this.materialsInfo = this.convert( materialsInfo );
		this.materials = {};
		this.materialsArray = [];
		this.nameLookup = {};

	},

	convert: function ( materialsInfo ) {

		if ( ! this.options ) return materialsInfo;

		var converted = {};

		for ( var mn in materialsInfo ) {

			// Convert materials info into normalized form based on options

			var mat = materialsInfo[ mn ];

			var covmat = {};

			converted[ mn ] = covmat;

			for ( var prop in mat ) {

				var save = true;
				var value = mat[ prop ];
				var lprop = prop.toLowerCase();

				switch ( lprop ) {

					case 'kd':
					case 'ka':
					case 'ks':

						// Diffuse color (color under white light) using RGB values

						if ( this.options && this.options.normalizeRGB ) {

							value = [ value[ 0 ] / 255, value[ 1 ] / 255, value[ 2 ] / 255 ];

						}

						if ( this.options && this.options.ignoreZeroRGBs ) {

							if ( value[ 0 ] === 0 && value[ 1 ] === 0 && value[ 2 ] === 0 ) {

								// ignore

								save = false;

							}

						}

						break;

					default:

						break;

				}

				if ( save ) {

					covmat[ lprop ] = value;

				}

			}

		}

		return converted;

	},

	preload: function () {

		for ( var mn in this.materialsInfo ) {

			this.create( mn );

		}

	},

	getIndex: function ( materialName ) {

		return this.nameLookup[ materialName ];

	},

	getAsArray: function () {

		var index = 0;

		for ( var mn in this.materialsInfo ) {

			this.materialsArray[ index ] = this.create( mn );
			this.nameLookup[ mn ] = index;
			index ++;

		}

		return this.materialsArray;

	},

	create: function ( materialName ) {

		if ( this.materials[ materialName ] === undefined ) {

			this.createMaterial_( materialName );

		}

		return this.materials[ materialName ];

	},

	createMaterial_: function ( materialName ) {

		// Create material

		var scope = this;
		var mat = this.materialsInfo[ materialName ];
		var params = {

			name: materialName,
			side: this.side

		};

		function resolveURL( baseUrl, url ) {

			if ( typeof url !== 'string' || url === '' )
				return '';

			// Absolute URL
			if ( /^https?:\/\//i.test( url ) ) return url;

			return baseUrl + url;

		}

		function setMapForType( mapType, value ) {

			if ( params[ mapType ] ) return; // Keep the first encountered texture

			var texParams = scope.getTextureParams( value, params );
			var map = scope.loadTexture( resolveURL( scope.baseUrl, texParams.url ) );

			map.repeat.copy( texParams.scale );
			map.offset.copy( texParams.offset );

			map.wrapS = scope.wrap;
			map.wrapT = scope.wrap;

			params[ mapType ] = map;

		}

		for ( var prop in mat ) {

			var value = mat[ prop ];

			if ( value === '' ) continue;

			switch ( prop.toLowerCase() ) {

				// Ns is material specular exponent

				case 'kd':

					// Diffuse color (color under white light) using RGB values

					params.color = new THREE.Color().fromArray( value );

					break;

				case 'ks':

					// Specular color (color when light is reflected from shiny surface) using RGB values
					params.specular = new THREE.Color().fromArray( value );

					break;

				case 'map_kd':

					// Diffuse texture map

					setMapForType( "map", value );

					break;

				case 'map_ks':

					// Specular map

					setMapForType( "specularMap", value );

					break;

				case 'map_bump':
				case 'bump':

					// Bump texture map

					setMapForType( "bumpMap", value );

					break;

				case 'ns':

					// The specular exponent (defines the focus of the specular highlight)
					// A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

					params.shininess = parseFloat( value );

					break;

				case 'd':

					if ( value < 1 ) {

						params.opacity = value;
						params.transparent = true;

					}

					break;

				case 'Tr':

					if ( value > 0 ) {

						params.opacity = 1 - value;
						params.transparent = true;

					}

					break;

				default:
					break;

			}

		}

		this.materials[ materialName ] = new THREE.MeshPhongMaterial( params );
		return this.materials[ materialName ];

	},

	getTextureParams: function ( value, matParams ) {

		var texParams = {

			scale: new THREE.Vector2( 1, 1 ),
			offset: new THREE.Vector2( 0, 0 )

		 };

		var items = value.split( /\s+/ );
		var pos;

		pos = items.indexOf( '-bm' );

		if ( pos >= 0 ) {

			matParams.bumpScale = parseFloat( items[ pos + 1 ] );
			items.splice( pos, 2 );

		}

		pos = items.indexOf( '-s' );

		if ( pos >= 0 ) {

			texParams.scale.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
			items.splice( pos, 4 ); // we expect 3 parameters here!

		}

		pos = items.indexOf( '-o' );

		if ( pos >= 0 ) {

			texParams.offset.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
			items.splice( pos, 4 ); // we expect 3 parameters here!

		}

		texParams.url = items.join( ' ' ).trim();
		return texParams;

	},

	loadTexture: function ( url, mapping, onLoad, onProgress, onError ) {

		var texture;
		var loader = THREE.Loader.Handlers.get( url );
		var manager = ( this.manager !== undefined ) ? this.manager : THREE.DefaultLoadingManager;

		if ( loader === null ) {

			loader = new THREE.TextureLoader( manager );

		}

		if ( loader.setCrossOrigin ) loader.setCrossOrigin( this.crossOrigin );
		texture = loader.load( url, onLoad, onProgress, onError );

		if ( mapping !== undefined ) texture.mapping = mapping;

		return texture;

	}

};

/**
* KalmanFilter
* @class
* @author Wouter Bulten
* @see {@link http://github.com/wouterbulten/kalmanjs}
* @version Version: 1.0.0-beta
* @copyright Copyright 2015 Wouter Bulten
* @license GNU LESSER GENERAL PUBLIC LICENSE v3
* @preserve
*/



function KalmanFilter(params) {
	/**
	* Create 1-dimensional kalman filter
	* @param  {Number} options.R Process noise
	* @param  {Number} options.Q Measurement noise
	* @param  {Number} options.A State vector
	* @param  {Number} options.B Control vector
	* @param  {Number} options.C Measurement vector
	* @return {KalmanFilter}
	*/

	this.R = typeof params.R == "undefined" ? 1 : params.R; // noise power desirable
	this.Q = typeof params.Q == "undefined" ? 1 : params.Q; // noise power estimated

	this.A = typeof params.A == "undefined" ? 1 : params.A;
	this.C = typeof params.C == "undefined" ? 1 : params.C;
	this.B = typeof params.B == "undefined" ? 0 : params.B;
	this.cov = NaN;
	this.x = NaN; // estimated signal without noise
}

/**
* Filter a new value
* @param  {Number} z Measurement
* @param  {Number} u Control
* @return {Number}
*/
KalmanFilter.prototype.filter = function (z, u) {
	if (typeof u == "undefined")
		u = 0;
	if (isNaN(this.x)) {
		this.x = (1 / this.C) * z;
		this.cov = (1 / this.C) * this.Q * (1 / this.C);
	}
	else {

		// Compute prediction
		const predX = (this.A * this.x) + (this.B * u);
		const predCov = ((this.A * this.cov) * this.A) + this.R;

		// Kalman gain
		const K = predCov * this.C * (1 / ((this.C * predCov * this.C) + this.Q));

		// Correction
		this.x = predX + K * (z - (this.C * predX));
		this.cov = predCov - (K * this.C * predCov);
	}

	return this.x;
}

/**
* Return the last filtered measurement
* @return {Number}
*/
KalmanFilter.prototype.lastMeasurement = function () {
	return this.x;
}

/**
* Set measurement noise Q
* @param {Number} noise
*/
KalmanFilter.prototype.setMeasurementNoise = function (noise) {
	this.Q = noise;
}

/**
* Set the process noise R
* @param {Number} noise
*/
KalmanFilter.prototype.setProcessNoise = function (noise) {
	this.R = noise;
}


/*    Copyright 2017 Jocly
 *
 *    This program is free software: you can redistribute it and/or  modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *    As a special exception, the copyright holders give permission to link the
 *    code of portions of this program with the OpenSSL library under certain
 *    conditions as described in each individual source file and distribute
 *    linked combinations including the program with the OpenSSL library. You
 *    must comply with the GNU Affero General Public License in all respects
 *    for all of the code used other than as permitted herein. If you modify
 *    file(s) with this exception, you may extend this exception to your
 *    version of the file(s), but you are not obligated to do so. If you do not
 *    wish to do so, delete this exception statement from your version. If you
 *    delete this exception statement from all source files in the program,
 *    then also delete it in the license file.
 */

JoclyAR = (function($) {

    var running = false;
    var videoElement = null;
    var canvas, context;
    var width = 320, height = 240;
    var modelSize = 5;
    var scale = .2;
    var threeCtx = null;
    var processing = false;
    var arWorker = null;
    var oposition = new THREE.Vector3();
    var oeuler = new THREE.Euler();

    function AnimationFrame() {
        if(!running)
            return;
        if(!processing && videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
            processing = true;
            context.drawImage(videoElement,0,0,width,height);
            var imageData = context.getImageData(0, 0, width, height);
            arWorker.postMessage({
                type: "Detect",
                imageData: imageData,
                vwidth: videoElement.clientWidth,
                vheight: videoElement.clientHeight
            });
        } else
            requestAnimationFrame(AnimationFrame);
    }

    var mouseDownY = null, scale0 = scale;
    function MouseMove(event) {
        var y = event.clientY;
        var ratio = (y-mouseDownY) / event.target.clientHeight;
        scale = scale0 * (1 - ratio);
        threeCtx.animControl.trigger();
    }
    function Mouse(event) {
        switch(event.type) {
            case 'mousedown':
                if(event.button==1 || event.button==2) {
                    mouseDownY = event.clientY;
                    scale0 = scale;
                    event.target.addEventListener('mousemove',MouseMove);
                }
                break;
            case 'mouseup':
            case 'mouseout':
                event.target.removeEventListener('mousemove',MouseMove);
        }
    }

    var exports = {
        start: function() {
            JoclyPlazza.webrtc.startLocal(true,{
                video: {
                    width: { ideal: width },
                    height: { ideal: height },
                    facingMode: "environment",
                    frameRate: {ideal: 24 }
                }
            });
        },
        stop: function() {
            JoclyPlazza.webrtc.setChannel(null);
        },
        attach: function(data) {
            videoElement = data.element;
            JoclyPlazza.webrtc.attachMediaStream(data.element,data.stream);
            canvas = document.createElement("canvas");
            canvas.setAttribute("width",width);
            canvas.setAttribute("height",height);
            Object.assign(canvas.style,{
                width: width,
                height: height,
                visibility : "hidden",
                position: "absolute",
                "z-index": -2,
                top: 0,
            });
            document.body.appendChild(canvas);
            /*
            $("<canvas/>")
                .attr("width", width).attr("height",height)
                .width(width).height(height)
                .css({
                    visibility : "hidden",
                    position: "absolute",
                    "z-index": -2,
                    top: 0,
            }).appendTo("body");
            */
            context = canvas.getContext("2d");
            threeCtx = data.threeCtx;
            running = true;
            processing = false;
            threeCtx.renderer.domElement.addEventListener("mousedown",Mouse);
            threeCtx.renderer.domElement.addEventListener("mouseup",Mouse);
            threeCtx.renderer.domElement.addEventListener("mouseout",Mouse);

       		arWorker = new Worker(JoclyPlazza.config.baseURL+JoclyPlazza.config.joclyPath+'/jocly.arworker.js');
            arWorker.onmessage = function(e) {
                processing = false;
                var message = e.data;
                switch(message.type) {
                    case "Pose": 
                        var rotation = message.rotation;
                        var translation = message.translation;

                        threeCtx.body.position.set(0,0,0);
                        threeCtx.camera.lookAt(new THREE.Vector3(0,-1,0));

                        threeCtx.harbor.scale.set(modelSize*scale,modelSize*scale,modelSize*scale);

                        threeCtx.harbor.rotation.set(
                            -Math.asin(-rotation[1][2]),
                            Math.atan2(rotation[1][0], rotation[1][1]),
                            -Math.atan2(rotation[0][2], rotation[2][2])                            
                        );
                        threeCtx.harbor.position.set(
                            translation[0],
                            -translation[2],
                            -translation[1]                            
                        );
                        if(!threeCtx.harbor.position.equals(oposition) || 
                            !threeCtx.harbor.rotation.equals(oeuler))
                            threeCtx.animControl.trigger();
                        oposition.copy(threeCtx.harbor.position);
                        oeuler.copy(threeCtx.harbor.rotation);
                        break;
                    case "NoPose":
                        break;
                }
                setTimeout(AnimationFrame,20);
            }
            arWorker.postMessage({
                type: "Init",
                baseUrl: JoclyPlazza.config.baseURL+JoclyPlazza.config.joclyPath,
                modelSize: modelSize,
                width: width,
                height: height
            });
            requestAnimationFrame(AnimationFrame);
        },
        detach: function(data) {
            threeCtx.renderer.domElement.removeEventListener("mousedown",Mouse);
            threeCtx.renderer.domElement.removeEventListener("mouseup",Mouse);
            threeCtx.renderer.domElement.removeEventListener("mouseout",Mouse);
            JoclyPlazza.webrtc.detachMediaStream(data.element);
            videoElement = null;
            running = false;
            canvas.parentNode.removeChild(canvas);
            context = null;
            threeCtx = null;
            arWorker.terminate();
            arWorker = null;
        }
    }

    return exports;


})();


/*    Copyright 2017 Jocly
 *
 *    This program is free software: you can redistribute it and/or  modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *    As a special exception, the copyright holders give permission to link the
 *    code of portions of this program with the OpenSSL library under certain
 *    conditions as described in each individual source file and distribute
 *    linked combinations including the program with the OpenSSL library. You
 *    must comply with the GNU Affero General Public License in all respects
 *    for all of the code used other than as permitted herein. If you modify
 *    file(s) with this exception, you may extend this exception to your
 *    version of the file(s), but you are not obligated to do so. If you do not
 *    wish to do so, delete this exception statement from your version. If you
 *    delete this exception statement from all source files in the program,
 *    then also delete it in the license file.
 */

function JHStateMachine() {
}

JHStateMachine.prototype={}

JHStateMachine.prototype.init=function() {
	this.smState=null;
	this.smStates={};
	this.smEventQueue=[];
	this.smScheduled=false;
	this.smPauseNotified=false;
	this.smPaused=true;
	this.smHistory=[];
	this.smGroups={};
}

JHStateMachine.prototype.smDebug=function() {}
JHStateMachine.prototype.smWarning=function() {}
JHStateMachine.prototype.smError=function() {}

JHStateMachine.prototype.smTransition=function(states,events,newState,methods) {
	states=this.smSolveStates(states);
	if(typeof(events)=="string") {
		events=[events];
	}
	if(typeof(methods)=="string") {
		methods=[methods];
	}
	for(var s in states) {
		var stateName=states[s];
		if(typeof(this.smStates[stateName])=="undefined") {
			this.smStates[stateName]={
				transitions: {},
				enteringMethods: [],
				leavingMethods: []
			}
		}
		for(var e in events) {
			var eventName=events[e];
			if(typeof(this.smStates[stateName].transitions[eventName])=="undefined") {
				this.smStates[stateName].transitions[eventName]={
					state: (newState!=null)?newState:stateName,
					methods: []
				};
			}
			for(var m in methods) {
				var methodName=methods[m];
				this.smStates[stateName].transitions[eventName].methods.push(methodName);				
			}
		}
	}
	if(newState!=null && typeof(this.smStates[newState])=="undefined") {
		this.smStates[newState]={
			transitions: {},
			enteringMethods: [],
			leavingMethods: []				
		}
	}
}

JHStateMachine.prototype.smEntering=function(states,methods) {
	if(typeof(states)=="string") {
		states=[states];
	}
	if(typeof(methods)=="string") {
		methods=[methods];
	}
	for(var s in states) {
		var stateName=states[s];
		if(typeof(this.smStates[stateName])=="undefined") {
			this.smStates[stateName]={
				transitions: {},
				enteringMethods: [],
				leavingMethods: []
			}
		}
		for(var m in methods) {
			var methodName=methods[m];
			this.smStates[stateName].enteringMethods.push(methodName);				
		}
	}
}

JHStateMachine.prototype.smLeaving=function(states,methods) {
	if(typeof(states)=="string") {
		states=[states];
	}
	if(typeof(methods)=="string") {
		methods=[methods];
	}
	for(var s in states) {
		var stateName=states[s];
		if(typeof(this.smStates[stateName])=="undefined") {
			this.smStates[stateName]={
				transitions: {},
				enteringMethods: [],
				leavingMethods: []
			}
		}
		for(var m in methods) {
			var methodName=methods[m];
			this.smStates[stateName].leavingMethods.push(methodName);				
		}
	}
}

JHStateMachine.prototype.smStateGroup=function(group,states) {
	if(typeof(states)=="string")
		states=[states];
	if(typeof(this.smGroups[group])=="undefined")
		this.smGroups[group]=[];
	states=this.smSolveStates(states);
	for(var i in states) {
		var state=states[i];
		if(!this.smContained(state,this.smGroups[group]))
			this.smGroups[group].push(state);
	}
}

JHStateMachine.prototype.smSetInitialState=function(state) {
	this.smState=state;
}

JHStateMachine.prototype.smGetState=function() {
	return this.smState;
}

JHStateMachine.prototype.smHandleEvent=function(event,args) {
	
	if(typeof(this.smStates[this.smState])=="undefined") {
		console.error("Unknown state '",this.smState,"'");
		return;
	}
	var hEntry={
			date: new Date().getTime(),
			fromState: this.smState,
			event: event,
			methods: []
	}
	try {
		hEntry.args=JSON.stringify(args);
	} catch(e) {
		//console.error("handleEvent(event,...) JSON.stringify(args): ",e);
	}
	
	var transition=this.smStates[this.smState].transitions[event];
	if(typeof(transition)=="undefined") {
		console.warn("JHStateMachine: Event '",event,"' not handled in state '",this.smState,"'");
		return;
	}

	this.smCurrentEvent=event;
	
	var stateChanged=(this.smState!=transition.state);

	if(stateChanged) {
		var leavingMethods=this.smStates[this.smState].leavingMethods;
		for(var i in leavingMethods) {
			try {
				hEntry.methods.push(leavingMethods[i]);
				if(typeof leavingMethods[i]=="function")
					leavingMethods[i].call(this,args);
				else
					this['$'+leavingMethods[i]](args);
			} catch(e) {
				console.error("Exception in leaving [",this.smState,"] --> "+
						(typeof leavingMethods[i]=="function"?leavingMethods[i].name:leavingMethods[i])
				+"(",args,"): ",e);
				throw e;
			}		
		}
	}
	
	for(var i in transition.methods) {
		try {
			hEntry.methods.push(transition.methods[i]);
			if(typeof transition.methods[i]=="function")
				transition.methods[i].call(this,args);
			else
				this['$'+transition.methods[i]](args);
		} catch(e) {
			console.error("Exception in ["+this.smState+"] -- "+event+" --> "+
					(typeof transition.methods[i]=="function"?transition.methods[i].name:transition.methods[i])
				+"(",args,"): ",
					e);
			throw e;
		}
	}
	
	this.smJHStateMachineLeavingState(this.smState,event,args);


	this.smDebug("{",this.smState,"} == [",event,"] ==> {",transition.state,"}");


	this.smState=transition.state;

	if(stateChanged) {
		var enteringMethods=this.smStates[this.smState].enteringMethods;
		for(var i in enteringMethods) {
			try {
				hEntry.methods.push(enteringMethods[i]);
				if(typeof enteringMethods[i]=="function")
					enteringMethods[i].call(this,args);
				else
					this['$'+enteringMethods[i]](args);
			} catch(e) {
				console.error("Exception in entering ["+this.smState+"] --> "+
						(typeof enteringMethods[i]=="function"?enteringMethods[i].name:enteringMethods[i])
				+"(",args,"): ",e);
				throw e;
			}		
		}
	}
	
	this.smCurrentEvent=null;

	this.smJHStateMachineEnteringState(this.smState,event,args);
	
	hEntry.toState=this.smState;
	this.smHistory.splice(0,0,hEntry);
	while(this.smHistory.length>50)
		this.smHistory.pop();	
}

JHStateMachine.prototype.smPlay=function() {
	var $this=this;
	if(this.smPaused) {
		this.smPaused=false;
		setTimeout(function() {
			$this.smRun();
		},0);
	}
}

JHStateMachine.prototype.smPause=function() {
	this.smPaused=true;
}

JHStateMachine.prototype.smStep=function() {
	this.smPauseNotified=false;
	if(this.smEventQueue.length>0) {
		var eventItem=this.smEventQueue.shift();
		this.smHandleEvent(eventItem.event,eventItem.args);
	}
	this.smNotifyPause();
}

JHStateMachine.prototype.smRun=function() {
	this.smScheduled=false;

	var stepCount=0;
	while(this.smEventQueue.length>0) {
		if(this.smPaused) {
			this.smRunEnd(stepCount);
			return;
		} else {
			stepCount++;
			this.smStep();
		}
	}
	while(this.smPaused==false && this.smEventQueue.length>0) {
		stepCount++;
		this.smStep();
	}
	this.smRunEnd(stepCount);
}

JHStateMachine.prototype.smRunEnd=function() {
}

JHStateMachine.prototype.smQueueEvent=function(event,args) {
	var self=this;
	this.smEventQueue.push({event: event, args: args});
	this.smNotifyPause();
	if(!this.smScheduled) {
		this.smScheduled=true;
		setTimeout(function() {
			self.smRun();
		},0);
	}
}

JHStateMachine.prototype.smNotifyPause=function() {
	if(this.smEventQueue.length>0 && this.smPaused==true) {
		var item=this.smEventQueue[0];
		this.smJHStateMachinePaused(item.event,item.args);
	}
}

JHStateMachine.prototype.smJHStateMachineEnteringState=function(state,event,args) {
}

JHStateMachine.prototype.smJHStateMachineLeavingState=function(state,event,args) {
}

JHStateMachine.prototype.smJHStateMachinePaused=function(state,event,args) {
}

JHStateMachine.prototype.smGetTable=function() {
	var cells={}
	for(var s in this.smStates) {
		var state=this.smStates[s];
		for(var e in state.transitions) {
			var toState=state.transitions[e].state;
			var cellname=s+"/"+toState;
			if(typeof(cells[cellname])=="undefined") {
				cells[cellname]={};
			}
			cells[cellname][e]=[];
			if(s!=toState) {
				for(var m in state.leavingMethods) {
					cells[cellname][e].push(state.leavingMethods[m]);
				}
			}
			for(var m in state.transitions[e].methods) {
				cells[cellname][e].push(state.transitions[e].methods[m]);
			}
			if(s!=toState) {
				for(var m in this.smStates[toState].enteringMethods) {
					cells[cellname][e].push(this.smStates[toState].enteringMethods[m]);
				}
			}
		}
	}
	var table=["<table><tr><td></td>"];
	for(var s in this.smStates) {
		table.push("<td class='state'>"+s+"</td>");
	}
	table.push("</tr>");
	for(var s1 in this.smStates) {
		table.push("<tr><td class='state'>"+s1+"</td>");
		var state1=this.smStates[s1];
		for(var s2 in this.smStates) {
			var state2=this.smStates[s2];
			var cellname=s1+"/"+s2;
			if(typeof(cells[cellname])=="undefined") {
				table.push("<td class='empty'></td>");
			} else {
				table.push("<td class='transition'>");
				for(var e in cells[cellname]) {
					table.push("<div class='event'>");
					table.push("<div class='eventname'>"+e+"</div>");
					for(var m in cells[cellname][e]) {
						table.push("<div class='method'>"+cells[cellname][e][m]+"</div>");
					}
					table.push("</div>");
				}
				table.push("</td>");
			}
		}
		table.push("</tr>");
	}
	table.push("</table>");
	return table.join("");
}

JHStateMachine.prototype.smGetHistoryTable=function() {
	var table=["<table><tr><th>Date</th><th>To</th><th>Event</th><th>Methods</th><th>From</th></tr>"];
	for(var i in this.smHistory) {
		var hEntry=this.smHistory[i];
		table.push("<tr>");
		var date=new Date(hEntry.date);
		var timestamp=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"."+date.getMilliseconds();
		table.push("<td class='timestamp'>"+timestamp+"</td>");
		table.push("<td class='to'>"+hEntry.toState+"</td>");
		table.push("<td><div class='event'>"+hEntry.event+"</div><div class='args'>("+hEntry.args+")</div></td>");
		table.push("<td class='methods'>");
		for(var j in hEntry.methods) {
			table.push(hEntry.methods[j]+"<br/>");
		}
		table.push("</td>");
		table.push("<td class='from'>"+hEntry.fromState+"</td>");
		table.push("</tr>");		
	}
	table.push("</table>");
	return table.join("");
}

JHStateMachine.prototype.smSolveStates=function(states) {
	var states0=[];
	if(typeof(states)=="string") {
		states=[states];
	}
	for(var s in states) {
		var state=states[s];
		if(typeof(this.smGroups[state])=="undefined") {
			if(!this.smContained(state,states0))
				states0.push(state);
		} else {
			for(var s0 in this.smGroups[state])
				if(!this.smContained(this.smGroups[state][s0]),states0)
					states0.push(this.smGroups[state][s0]);
		}
	}
	return states0;
}

JHStateMachine.prototype.smContained=function(state,group) {
	for(var i in group) {
		if(state==group[i])
			return true;
	}
	return false;
}

JHStateMachine.prototype.smCheck=function() {
	var result={
		missing: [],
		unused: []
	}
	var existingFnt=[];
	for(var s in this.smStates) {
		for(var i in this.smStates[s].enteringMethods) {
			var fnt=this.smStates[s].enteringMethods[i];
			existingFnt[fnt]=true;
		}
		for(var i in this.smStates[s].leavingMethods) {
			var fnt=this.smStates[s].leavingMethods[i];
			existingFnt[fnt]=true;
		}
		for(var e in this.smStates[s].transitions) {
			var event=this.smStates[s].transitions[e];
			for(var i in event.methods) {
				var fnt=event.methods[i];
				existingFnt[fnt]=true;
			}
		}
	}
	for(var fnt in existingFnt) {
		if(typeof(this['$'+fnt])!="function") {
			result.missing.push(fnt);
			console.error("JHStateMachine: missing function $",fnt);
		}
	}
	for(var k in this) {
		try {
			if(k[0]=='$' && typeof(this[k])=="function") {
				var fnt=k.substr(1);
				if(typeof(existingFnt[fnt])=="undefined") {
					//this.warning("JHStateMachine.check "+this.target.name+": unused function "+k);
					result.unused.push(fnt);
				}
			}
		} catch(e) {}
	}
	return result;
}

/*    Copyright 2017 Jocly
 *
 *    This program is free software: you can redistribute it and/or  modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *    As a special exception, the copyright holders give permission to link the
 *    code of portions of this program with the OpenSSL library under certain
 *    conditions as described in each individual source file and distribute
 *    linked combinations including the program with the OpenSSL library. You
 *    must comply with the GNU Affero General Public License in all respects
 *    for all of the code used other than as permitted herein. If you modify
 *    file(s) with this exception, you may extend this exception to your
 *    version of the file(s), but you are not obligated to do so. If you do not
 *    wish to do so, delete this exception statement from your version. If you
 *    delete this exception statement from all source files in the program,
 *    then also delete it in the license file.
 */

exports.view = View = {
	Game: {},
	Board: {},
};

if (window.JoclyXdViewCleanup)
	window.JoclyXdViewCleanup();

(function () {

	// Empirically chosen compromise for useLegacyLights removal (r165):
	// no single factor satisfies every game (some, like
	// yohoho/raumschach/pensoc, were overexposed at 10*PI while others,
	// like reversi/kids-draughts/scrum, were still too dark) -- 7*PI
	// settled on as a reasonable default. Per-game/per-module tuning is
	// layered on top below rather than touching each game's own
	// world.lightIntensity/skyLightIntensity config, which stays at its
	// original (pre-r165) value throughout.
	var LIGHT_INTENSITY_FACTOR_DEFAULT = Math.PI;

	// Override by module (this.mViewOptions.fullPath ends in
	// "games/<module>"), applied to every game in that module unless a
	// more specific per-game override below also matches.
	//
	// Currently set to the same value as the global default (neutral,
	// no actual override) -- kept here as a ready-to-use lever for the
	// whole module if a shared adjustment is ever needed again, without
	// having to rediscover this mechanism. Raise/lower this single
	// number to retest the whole module at once; individual games in
	// it (raumschach, 3dchess) are tuned independently below/in their
	// own cbExtraLights instead, since their issues turned out not to
	// be module-wide.
	var LIGHT_INTENSITY_FACTOR_BY_MODULE = {
		"chessbase": Math.PI
	};

	// Override by exact game name (this.name on the game instance),
	// takes precedence over the module-level override above.
	var LIGHT_INTENSITY_FACTOR_BY_GAME = {
		"raumschach": Math.PI,
		"pensoc": Math.PI,
		"yohoho": Math.PI,
		"mana": Math.PI
	};

	function GetLightFactor(game) {
		game = game || xdv.game;
		if (game && LIGHT_INTENSITY_FACTOR_BY_GAME.hasOwnProperty(game.name))
			return LIGHT_INTENSITY_FACTOR_BY_GAME[game.name];
		if (game && game.mViewOptions && game.mViewOptions.fullPath) {
			var m = /games\/([^\/]+)/.exec(game.mViewOptions.fullPath);
			if (m && LIGHT_INTENSITY_FACTOR_BY_MODULE.hasOwnProperty(m[1]))
				return LIGHT_INTENSITY_FACTOR_BY_MODULE[m[1]];
		}
		return LIGHT_INTENSITY_FACTOR_DEFAULT;
	}
	window.JoclyGetLightFactor = GetLightFactor;

	// Kept for the 3 shared/base lights created once for the whole
	// engine (not per-game) -- see CreateThree() below -- which have no
	// single "current game" to look up an override for.
	var LIGHT_INTENSITY_FACTOR = LIGHT_INTENSITY_FACTOR_DEFAULT;
	window.JOCLY_LIGHT_FACTOR = LIGHT_INTENSITY_FACTOR;

	window.JoclyXdViewCleanup = function () {
		var renderer = threeCtx && threeCtx.renderer;
		if (renderer) {
			renderer.forceContextLoss();
			renderer.context = null;
			renderer.domElement = null;
			delete threeCtx.renderer;
		}
		if (arStream)
			AR(null);
	}

	var area, currentSkin, logger, xdv, VSIZE, VHALF, htStateMachine, threeCtx = null,
		SCALE3D = 0.001, resourcesMap = {}, resources, arStream = null;

	// hack to ensure mouse and touch events do not collide
	var lastTouchStart = 0, lastJoclyclick = 0;

	/* ======================================== */

	var LOADING_TEXT_RESOURCE = "";

	if (typeof CustomEvent == "undefined") {
		function CustomEvent(event, params) {
			params = params || { bubbles: false, cancelable: false };
			var evt = document.createEvent('Event');
			evt.initEvent(event, params.bubbles, params.cancelable);
			return evt;
		};
		CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent;
	}

	var Class = function () {
	};
	(function () {
		var initializing = false, fnTest = /xyz/.test(function () {
		}) ? /\b_super\b/ : /.*/;
		Class.extend = function (prop) {
			var _super = this.prototype;
			initializing = true;
			var prototype = new this();
			initializing = false;
			for (var name in prop) {
				prototype[name] = typeof prop[name] == "function"
					&& typeof _super[name] == "function"
					&& fnTest.test(prop[name]) ? (function (name, fn) {
						return function () {
							var tmp = this._super;
							this._super = _super[name];
							var ret = fn.apply(this, arguments);
							this._super = tmp;
							return ret;
						};
					})(name, prop[name]) : prop[name];
			}
			function Class(args) {
				if (!initializing && this.init)
					if (arguments.length > 0 && args.jBlocksArgsList)
						this.init.apply(this, args);
					else
						this.init.apply(this, arguments);
			}
			Class.prototype = prototype;
			Class.prototype.constructor = Class;
			Class.extend = arguments.callee;
			return Class;
		};
	})();

	/* ======================================== */

	var WebRTC;
	var logResourcesLoad = false;

	function Log() {
		console.info.apply(console, arguments);
	}

	View.Board.Log = Log;
	View.Game.Log = Log;

	function HTStateMachine() { }
	HTStateMachine.prototype = new JHStateMachine();

	HTStateMachine.prototype.smError = function () {
		//console.info("=>",arguments);
	}
	HTStateMachine.prototype.smWarning = function () {
		//console.info("=>",arguments);
	};
	HTStateMachine.prototype.smDebug = function () {
		//console.info("=>",arguments);
	}

	function Diff(oOld, oNew) {
		var diff = {};
		var diffSet = false;
		for (var i in oNew) {
			if (oNew.hasOwnProperty(i)) {
				if (!oOld.hasOwnProperty(i)) {
					diff[i] = oNew[i];
					diffSet = true;
				} else if (typeof oNew[i] == "object") {
					var diff0 = Diff(oOld[i], oNew[i]);
					if (diff0) {
						diff[i] = diff0;
						diffSet = true;
					}
				} else if (oNew[i] != oOld[i]) {
					diff[i] = oNew[i];
					diffSet = true;
				}
			}
		}
		return diffSet ? diff : null;
	}

	var resLoadingMask = null;
	var resLoadingCount = 0;
	function IncrementResLoading() {
		if (resLoadingCount++ == 0) {
			resLoadingMask = $(".jocly-res-loading-mask");
			if (resLoadingMask.length == 0)
				resLoadingMask = $("<div/>").addClass("jocly-res-loading-mask").css({
					position: "absolute",
					top: 0,
					left: 0,
					width: $("body").width(),
					height: $("body").height(),
					"background-color": "rgba(0,0,0,.8)",
					"background-image": "url(" + LOADING_TEXT_RESOURCE + ")",
					"background-position": "center center",
					"background-repeat": "no-repeat",
					"z-index": 100000,
				}).appendTo($("body"));
			else
				resLoadingMask.show();
		}
	}
	function DecrementResLoading() {
		if (--resLoadingCount == 0) {
			if (resLoadingMask)
				resLoadingMask.hide();
		}
	}

	var materialMaps = {};
	function GetMaterialMap(map, callback) {
		var $this = this;
		if (materialMaps[map])
			callback(materialMaps[map]);
		else {
			var loader = new THREE.TextureLoader();
			loader.setCrossOrigin("anonymous");
			if (logResourcesLoad)
				console.log("Loading map", map);
			IncrementResLoading();
			loader.load(
				// ressource url
				map,
				// Function when resource is loaded
				function (texture) {
					texture.colorSpace = THREE.SRGBColorSpace;
					materialMaps[map] = texture;
					if (logResourcesLoad)
						console.log("Loaded", map);
					DecrementResLoading();
					threeCtx.animControl.trigger();
					callback(materialMaps[map]);
				},
				// Function called when download progresses
				function (xhr) {
					//console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
				},
				// Function called when download errors
				function (xhr) {
					if (logResourcesLoad)
						console.log("(not) Loaded", map);
					DecrementResLoading();
					threeCtx.animControl.trigger();
					callback(null);
				});
		}
	}

	// Adapt a loaded glTF (gltf.scene, a tree of Group/Mesh nodes — one Mesh
	// per primitive/material, per the glTF spec) into the same flat
	// {geometry, materials} shape that the rest of this file expects from
	// the old LegacyJSONLoader/THREE.Geometry pipeline. Concretely: merge
	// all the primitive's BufferGeometry into a single one with the right
	// groups (start/count/materialIndex), so the existing call sites
	// (new THREE.Mesh(geometry, materials), materials[i].clone(), etc.)
	// keep working unchanged regardless of geometry type.
	function AdaptGltfToGeoMat(gltf) {
		var meshNodes = [];
		gltf.scene.traverse(function (obj) {
			if (obj.isMesh) meshNodes.push(obj);
		});

		if (meshNodes.length === 0)
			return { geometry: new THREE.BufferGeometry(), materials: null };

		var materials = meshNodes.map(function (m) { return m.material; });

		if (meshNodes.length === 1) {
			var singleGeo = meshNodes[0].geometry;
			if (!singleGeo.groups || singleGeo.groups.length === 0) {
				singleGeo.groups = [{ start: 0, count: singleGeo.index ? singleGeo.index.count : singleGeo.attributes.position.count, materialIndex: 0 }];
			}
			return { geometry: singleGeo, materials: materials };
		}

		// Several primitives can reference the same named glTF material.
		// Whether that ends up as the same JS object instance is NOT
		// reliable across all models, even on a single three.js version:
		// confirmed empirically that GLTFLoader shares the instance for
		// simple models (e.g. piece-v2.gltf, 4 primitives/2 materials) but
		// clones it for others (e.g. mana-piece-smoothed2.gltf, 353
		// primitives/2 materials — instance-based dedup left all 353 as
		// "unique"). The three.js GLTFLoader issue tracker confirms
		// materials get cloned in some cases (e.g. for skinned meshes).
		// Dedupe by material *name* instead, which is robust regardless of
		// the loader's instance-sharing behavior. This matters because game
		// code sometimes substitutes its own materials array (e.g.
		// checkers-xd-view.js builds `[matborder, mattop]` for a model with
		// 2 distinct materials spread over several primitives); if
		// materialIndex isn't correctly collapsed to the real material
		// count, indices would point past the end of that array and crash
		// the BufferGeometry raycaster.
		var uniqueMaterials = [];
		var materialIndexByName = {};
		var materialIndexByInstance = [];
		meshNodes.forEach(function (m) {
			var name = m.material.name;
			var idx;
			if (Object.prototype.hasOwnProperty.call(materialIndexByName, name)) {
				idx = materialIndexByName[name];
			} else {
				idx = uniqueMaterials.length;
				materialIndexByName[name] = idx;
				uniqueMaterials.push(m.material);
			}
			materialIndexByInstance.push(idx);
		});

		// Merge multiple per-primitive geometries into one indexed
		// BufferGeometry with one group per original mesh/material.
		var mergedPositions = [], mergedNormals = [], mergedUvs = [], mergedColors = [];
		var hasNormals = meshNodes.every(function (m) { return !!m.geometry.attributes.normal; });
		var hasUvs = meshNodes.every(function (m) { return !!m.geometry.attributes.uv; });
		var hasColors = meshNodes.every(function (m) { return !!m.geometry.attributes.color; });
		var groups = [];
		var vertexOffset = 0;

		meshNodes.forEach(function (m, i) {
			var posAttr = m.geometry.attributes.position;
			var count = posAttr.count;
			for (var i2 = 0; i2 < posAttr.array.length; i2++) mergedPositions.push(posAttr.array[i2]);
			if (hasNormals) {
				var nAttr = m.geometry.attributes.normal;
				for (var i2 = 0; i2 < nAttr.array.length; i2++) mergedNormals.push(nAttr.array[i2]);
			}
			if (hasUvs) {
				var uAttr = m.geometry.attributes.uv;
				for (var i2 = 0; i2 < uAttr.array.length; i2++) mergedUvs.push(uAttr.array[i2]);
			}
			if (hasColors) {
				var cAttr = m.geometry.attributes.color;
				for (var i2 = 0; i2 < cAttr.array.length; i2++) mergedColors.push(cAttr.array[i2]);
			}
			groups.push({ start: vertexOffset, count: count, materialIndex: materialIndexByInstance[i] });
			vertexOffset += count;
		});

		var merged = new THREE.BufferGeometry();
		merged.setAttribute('position', new THREE.BufferAttribute(new Float32Array(mergedPositions), 3));
		if (hasNormals) merged.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(mergedNormals), 3));
		if (hasUvs) merged.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(mergedUvs), 2));
		if (hasColors) merged.setAttribute('color', new THREE.BufferAttribute(new Float32Array(mergedColors), meshNodes[0].geometry.attributes.color.itemSize));
		groups.forEach(function (g) { merged.addGroup(g.start, g.count, g.materialIndex); });

		return { geometry: merged, materials: uniqueMaterials };
	}

	var pendingGetResource = [];
	function GetResource(res, callback) {
		var resource = resources[res];
		if (resource === undefined) {
			resource = resources[res] = {
				pending: [callback],
				status: "loading",
			}

			var getResFnt = null;
			var m = /^(.*\|)(.*?)$/.exec(res);
			if (m) {
				var prefix = m[1];
				var url = m[2];
				for (var r in resourcesMap) {
					var m2 = /^(.*\|)(.*?)$/.exec(r);
					if (m2)
						if (prefix == m[1] && url.substr(-m2[2].length) == m2[2]) {
							getResFnt = resourcesMap[r];
							break;
						}
				}
			}

			if (/^image\|/.test(res)) {
				var imgSrc = /^image\|(.*)/.exec(res)[1];
				if (logResourcesLoad)
					console.log("Loading resource", res);
				function HandleImage(image) {
					resource.image = image;
					if (logResourcesLoad)
						console.log("Loaded", res);
					resource.status = "loaded";
					resource.imgSrc = imgSrc;
					DecrementResLoading();
					for (var i = 0; i < resource.pending.length; i++)
						resource.pending[i](resource.image, imgSrc);
					resource.pending = null;
					if (threeCtx)
						threeCtx.animControl.trigger();
				}
				IncrementResLoading();
				if (getResFnt) {
					getResFnt(function (data) {
						var image = new Image();
						image.onload = function () {
							HandleImage(image);
						}
						image.src = data;
					});
				} else {
					var image = new Image();
					image.onload = function () {
						HandleImage(image)
					}
					image.src = imgSrc;
				}
			} else if (/^smoothedfilegeo\|/.test(res)) {
				if (logResourcesLoad)
					console.log("Loading resource", res);
				if (!threeCtx) {
					delete resources[res];
					pendingGetResource.push([res, callback]);
					return;
				}
				var m = /^smoothedfilegeo\|([^\|]*)\|(.*)$/.exec(res);
				// The smooth level is no longer applied here: subdivision is
				// now pre-baked into the .gltf file itself at conversion time
				// (SubdivisionModifier depends on THREE.Geometry, which is
				// gone from three.js as of r125). The level is kept in the
				// resource key only for backwards-compatible cache lookups.
				var file = m[2].replace(/\.js$/, '.gltf');
				IncrementResLoading();
				function HandleGeoMat(geometry, materials) {
					if (logResourcesLoad)
						console.log("Loaded", res);

					// Textures loaded via GLTFLoader still need an explicit
					// sRGB color space to render with correct
					// brightness/color (see renderer.outputColorSpace
					// elsewhere in this file).
					if (materials) {
						for (var i = 0; i < materials.length; i++) {
							if (materials[i].map)
								materials[i].map.colorSpace = THREE.SRGBColorSpace;
						}
					}

					resource.status = "loaded";
					DecrementResLoading();
					resource.geometry = geometry;
					resource.materials = materials;
					for (var i = 0; i < resource.pending.length; i++)
						resource.pending[i](geometry, materials);
					resource.pending = null;
					threeCtx.animControl.trigger(3000);
				}
				if (getResFnt) {
					getResFnt(function (data) {
						try {
							threeCtx.loader.parse(data, "", function (gltf) {
								var adapted = AdaptGltfToGeoMat(gltf);
								HandleGeoMat(adapted.geometry, adapted.materials);
							}, function (err) {
								if (logResourcesLoad)
									console.log("(not) Loaded", res);
								DecrementResLoading();
								resource.status = "error";
								for (var i = 0; i < resource.pending.length; i++)
									resource.pending[i](null, null);
								resource.pending = null;
								threeCtx.animControl.trigger();
							});
						} catch (e) {
							if (logResourcesLoad)
								console.log("(not) Loaded", res);
							DecrementResLoading();
							resource.status = "error";
							for (var i = 0; i < resource.pending.length; i++)
								resource.pending[i](null, null);
							resource.pending = null;
							threeCtx.animControl.trigger();
						}
					});
				} else
					threeCtx.loader.load(file, function (gltf) {
						var adapted = AdaptGltfToGeoMat(gltf);
						HandleGeoMat(adapted.geometry, adapted.materials);
					}, undefined, function (err) {
						if (logResourcesLoad)
							console.log("(not) Loaded", res);
						DecrementResLoading();
						resource.status = "error";
						for (var i = 0; i < resource.pending.length; i++)
							resource.pending[i](null, null);
						resource.pending = null;
						threeCtx.animControl.trigger();
					});
			} else if (/^json\|/.test(res)) {
				if (logResourcesLoad)
					console.log("Loading resource", res);
				IncrementResLoading();
				var url = /^json\|(.*)/.exec(res)[1];
				function JSONResult(event, data) {
					if (logResourcesLoad)
						console.log("Loaded", res);
					var path = /^(\.)?(.*)$/.exec(url);
					if (data.url.substr(-path[2].length) == path[2]) {
						$(document).unbind("jocly.json-resource", JSONResult);
						resource.status = "loaded";
						DecrementResLoading();
						resource.data = data.data;
						for (var i = 0; i < resource.pending.length; i++)
							resource.pending[i](resource.data);
						resource.pending = null;
						if (threeCtx)
							threeCtx.animControl.trigger();
					} else
						console.warn("Expecting", url, "got", data.url)

				}
				$(document).bind("jocly.json-resource", JSONResult);
				$("<script/>").attr("type", "text/javascript").attr("jocly-type", "json-resource").attr("src", url).appendTo($("head"));
			} else if (/^json2\|/.test(res)) {
				if (logResourcesLoad)
					console.log("Loading resource", res);
				IncrementResLoading();
				var url = /^json2\|(.*)/.exec(res)[1];
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState == XMLHttpRequest.DONE) {
						if (logResourcesLoad)
							console.log("Loaded", res);
						var data = JSON.parse(xhr.responseText);
						resource.status = "loaded";
						DecrementResLoading();
						resource.data = data;
						for (var i = 0; i < resource.pending.length; i++)
							resource.pending[i](resource.data);
						resource.pending = null;
						if (threeCtx)
							threeCtx.animControl.trigger();
					}
				}
				xhr.open('GET', url, true);
				xhr.send(null);

			} else if (/^font\|/.test(res)) {
				if (logResourcesLoad)
					console.info("font path", fontPath);
				var fontPath = /^font\|(.*)/.exec(res)[1];
				IncrementResLoading();
				var fontLoader = new THREE.FontLoader();
				fontLoader.load(fontPath, function (font) {
					DecrementResLoading();
					resource.status = "loaded";
					resource.font = font;
					for (var i = 0; i < resource.pending.length; i++)
						resource.pending[i](font);
					resource.pending = null;
					if (threeCtx)
						threeCtx.animControl.trigger();
				}, undefined, function (err) {
					if (logResourcesLoad)
						console.log("(not) Loaded", res);
					DecrementResLoading();
					resource.status = "error";
					for (var i = 0; i < resource.pending.length; i++)
						resource.pending[i](null);
					resource.pending = null;
					if (threeCtx)
						threeCtx.animControl.trigger();
				});
			}
		} else if (resource.status == "loading") {
			resource.pending.push(callback);
		} else {
			if (/^image\|/.test(res)) {
				callback(resource.image, resource.imgSrc);
			} else if (/^smoothedfilegeo\|/.test(res)) {
				callback(resource.geometry, resource.materials);
			} else if (/^json\|/.test(res)) {
				callback(resource.data);
			} else if (/^json2\|/.test(res)) {
				callback(resource.data);
			} else if (/^font\|/.test(res)) {
				callback(resource.font);
			}
		}
	}

	function ResumePendingResources() {
		if (threeCtx)
			while (pendingGetResource.length) {
				var call = pendingGetResource.shift();
				GetResource.call(null, call[0], call[1]);
			}
	}


	/* ======================================== */

	var XDView = Class.extend({
		init: function () {
			this.gadgets = {};
			this.resources = {};
			this.game = null;
			this.initDone = false;
			this.ratio = 0;
			this.center = null;
			this.getMaterialMap = GetMaterialMap;
		},
		createGadget: function (id, options) {
			if (this.ratio > 0) {
				if (options.base === undefined)
					options.base = {};
				options.base.ratio = this.ratio;
				options.base.center = this.center;
			}
			this.gadgets[id] = new Gadget(id, options);
		},
		updateGadget: function (id, options, delay, callback) {
			var gadget = this.gadgets[id];
			if (gadget) {
				if (arguments.length < 3 || delay === undefined)
					delay = 0;
				if (arguments.length < 4 || callback === undefined)
					callback = function () { }
				gadget.update(options, delay, callback);
			}
		},
		removeGadget: function (id) {
			var gadget = this.gadgets[id];
			if (gadget) {
				gadget.unbuild();
				delete this.gadgets[id];
			}
		},
		showGadget: function (id) {
			this.updateGadget(id, {
				base: {
					visible: true,
				},
			});
		},
		hideGadget: function (id) {
			this.updateGadget(id, {
				base: {
					visible: false,
				},
			});
		},
		updateArea: function (ratio, center) {
			this.ratio = ratio;
			this.center = center;
			for (var gi in this.gadgets)
				this.gadgets[gi].update({
					base: {
						ratio: ratio,
						center: center,
					},
				});
		},
		redisplayGadgets: function () {
			for (var gi in this.gadgets) {
				var gadget = this.gadgets[gi];
				gadget.update({});
			}
		},
		unbuildGadgets: function () {
			for (var gi in this.gadgets)
				this.gadgets[gi].unbuild();
		},
		saveGadgetProps: function (id, props, saveName) {
			var gadget = this.gadgets[id];
			if (gadget)
				gadget.saveProps(props, saveName);
		},
		restoreGadgetProps: function (id, saveName, delay, callback) {
			var gadget = this.gadgets[id];
			if (gadget)
				gadget.restoreProps(saveName, delay, callback);
			else if (callback)
				callback();
		},
		listScene: function () {
			console.log("listScene:");
			var accu = [];
			accu["faces"] = 0;
			//var crlf="<br>";
			var crlf = " :: ";
			var output = "========= Scene summary ===========";
			var nbLights = -1;


			function getFaces(obj, nbFaces) {
				if (obj.geometry) {
					var gg = obj.geometry;
					if (gg.faces) nbFaces += gg.faces.length;
				}
				if (obj.getDescendants) {
					var children = obj.getDescendants();
					if (children) nbFaces += getFaces(children, nbFaces);
				}
				return nbFaces;
			}
			if (threeCtx) if (threeCtx.scene) {
				var threeScene = threeCtx.scene;
				nbLights = threeScene.__lights.length;
				console.log(threeScene);
				var obj = threeScene.getDescendants();
				for (var o in obj) {
					var nbf = getFaces(obj[o], 0);
					accu["faces"] += nbf;
					//console.log(obj[o].name+" has "+nbf+" faces");
					/*if(obj[o].geometry){
						var gg=obj[o].geometry;
						if (gg.faces) accu["faces"]+=gg.faces.length;
						console.log(obj[o].name+" has "+gg.faces.length+" faces");
					}*/
				}
			}
			output += crlf + "nb lights: " + nbLights;
			output += crlf + "Nb faces: " + accu["faces"];
			console.log(output);
		},
	})

	/* ======================================== */

	function InitGlobals() {
		xdv = new XDView();
		VSIZE = 12600;
		VHALF = VSIZE / 2;
		htStateMachine = null;
		threeCtx = null;
		SCALE3D = 0.001;
		resourcesMap = {};
		resources = {};
		area = null;
		currentSkin = null;
		logger = null;
	}
	InitGlobals();

	/* ======================================== */

	var Gadget = Class.extend({
		init: function (id, options) {
			this.id = id;
			this.options = $.extend(true, {
				base: {
					visible: false,
				}
			}, options);
			this.avatar = null;
			this.savedProps = {};
		},
		mergeOptions: function () {
			return $.extend(true,
				{
					x: 0,
					y: 0,
					z: 0,
				},
				this.options.base,
				currentSkin["3d"] ? this.options["3d"] : this.options["2d"],
				this.options[currentSkin.name]);
		},
		build: function (options) {
			if (this.avatar)
				return;
			if (arguments.length == 0)
				options = this.mergeOptions();
		},
		unbuild: function () {
			if (this.avatar) {
				this.avatar.remove();
				this.avatar = null;
			}
		},
		canDisplay: function (options) {
			if (currentSkin === undefined || currentSkin === null)
				return false;
			if (arguments.length == 0)
				options = this.mergeOptions();
			return options.visible &&
				((!currentSkin["3d"] && options.ratio !== undefined && options.center !== undefined) ||
					(currentSkin["3d"] /* && 3D requirements */));
		},
		update: function (options, delay, callback) {
			if (arguments.length < 2 || delay === undefined)
				delay = 0;
			if (arguments.length < 3 || callback === undefined)
				callback = function () { };
			if (currentSkin !== undefined && currentSkin !== null) {
				var xdMap = currentSkin["3d"] ? "3d" : "2d";
				if (options.base)
					for (var i in options.base) {
						if (this.options[xdMap])
							delete this.options[xdMap][i];
						if (this.options[currentSkin.name])
							delete this.options[currentSkin.name][i];
					}
				if (options[xdMap])
					for (var i in options[xdMap])
						if (this.options[currentSkin.name])
							delete this.options[currentSkin.name][i];
				$.extend(true, this.options, options);
				var aOptions = this.mergeOptions();
				if (!this.avatar && this.canDisplay(aOptions)) {
					var avatarType = avatarTypes[aOptions.type];
					if (avatarType !== undefined)
						this.avatar = new avatarType(this, aOptions);
				}
				if (typeof delay == "object") {
					if (delay[currentSkin.name] !== undefined)
						delay = delay[currentSkin.name];
					else if (delay[xdMap] !== undefined)
						delay = delay[xdMap];
					else if (delay.base !== undefined)
						delay = delay.base;
					else
						delay = 0;
				}
				if (this.avatar)
					this.avatar.update(aOptions, delay, callback);
			} else
				$.extend(true, this.options, options);
		},
		saveProps: function (props, saveName) {
			var save = {};
			for (var oi in this.options) {
				var optCat = this.options[oi];
				for (var i in props) {
					var prop = props[i];
					if (optCat[prop] !== undefined) {
						save[oi] = save[oi] || {};
						save[oi][prop] = optCat[prop];
					}
				}
			}
			this.savedProps[saveName] = save;
		},
		restoreProps: function (saveName, delay, callback) {
			if (this.savedProps[saveName] !== undefined)
				this.update(this.savedProps[saveName], delay, callback);
			else if (callback)
				callback();
		},
	});

	/* ======================================== */

	var updateOp = 1;

	var GadgetAvatar = Class.extend({
		init: function (gadget, options) {
			this.gadget = gadget;
			this.options = options;
			this.SCALE3D = SCALE3D;
			this.animCounts = {};
		},
		remove: function () {
		},
		display: function (options) {
		},
		update: function (options, delay, callback) {
			var aOptions = $.extend(true, {}, this.options, options);
			aOptions.updateOp = updateOp++;
			aOptions.updateCallback = callback;
			this.display(aOptions, delay, callback);
			if (aOptions.visible)
				this.show();
			else
				this.hide();
			this.options = aOptions;
		},
		show: function () {
		},
		hide: function () {
		},
		animStart: function (options) {
			if (options === undefined) {
				console.error("animStart without options");
				debugger;
				return;
			}
			if (options.updateOp === undefined) {
				console.error("animStart without options");
				debugger;
				return;
			}
			if (this.object3d)
				this.object3d.matrixAutoUpdate = true;
			if (this.animCounts[options.updateOp] === undefined)
				this.animCounts[options.updateOp] = 1;
			else
				this.animCounts[options.updateOp]++;
		},
		animEnd: function (options) {
			if (options === undefined) {
				console.error("animEnd without options");
				debugger;
				return;
			}
			if (options.updateOp === undefined) {
				console.error("animEnd without options");
				debugger;
				return;
			}
			if (this.animCounts[options.updateOp] === undefined) {
				console.error("animEnd without animCount");
				debugger;
				return;
			}
			if (--this.animCounts[options.updateOp] == 0) {
				if (this.object3d)
					this.object3d.matrixAutoUpdate = false;
				options.updateCallback();
				delete this.animCounts[options.updateOp];
			}
		},
		getResource: GetResource,
	});

	var GadgetElement = GadgetAvatar.extend({
		init: function (gadget, options) {
			options = $.extend(true, {
				display: function () { },
			}, options);
			this._super.apply(this, arguments);
			this.options = $.extend(true, {
				x: 0,
				y: 0,
				z: 0,
				width: 1000,
				height: 1000,
				tag: "div",
				opacity: 1,
				rotate: 0,
				css: {},
			}, options);
			this.element = $("<" + this.options.tag + "/>").css({
				"position": "absolute",
				"z-index": this.options.z,
			}).hide().addClass("jocly-gadget").appendTo(area);
			if (this.options.initialClasses)
				this.element.addClass(this.options.initialClasses);
		},
		display: function (options, delay) {
			var $this = this;
			if (this.element) {
				this.displayElement.call(this, !this.displayCalled, options, delay);
				this.displayCalled = true;
			} else if (delay) {
				this.animStart(options);
				setTimeout(function () { $this.animEnd(options); }, delay);
			}
		},
		displayElement: function (force, options, delay) {
			var $this = this;
			this.element.css($.extend(true, this.options.css, options.css));
			if (
				force ||
				this.aWidth === undefined || this.aHeight === undefined ||
				options.ratio != this.options.ratio ||
				options.center.x != this.options.center.x ||
				options.center.y != this.options.center.y ||
				options.width != this.options.width ||
				options.height != this.options.height ||
				options.x != this.options.x ||
				options.y != this.options.y ||
				options.z != this.options.z
			) {
				this.aWidth = options.width * options.ratio;
				this.aHeight = options.height * options.ratio;
				var left = options.x * options.ratio + options.center.x - this.aWidth / 2;
				var top = options.y * options.ratio + options.center.y - this.aHeight / 2;
				if (delay) {
					this.animStart(options);
					this.element.css({
						"z-index": options.z,
					}).animate({
						width: this.aWidth,
						height: this.aHeight,
						left: left,
						top: top,
					}, delay, function () { $this.animEnd(options); });
				} else {
					this.element.css({
						width: this.aWidth,
						height: this.aHeight,
						left: left,
						top: top,
						"z-index": options.z,
					});
				}
				this.options.display(this.element, this.aWidth, this.aHeight);
			}
			if (force ||
				options.classes != this.options.classes) {
				if (this.options.classes)
					this.element.removeClass(this.options.classes);
				this.element.addClass(options.classes);
			}
			if (force ||
				options.click != this.options.click) {
				//this.element.unbind(JocGame.CLICK);
				this.element.unbind(JocGame.MOUSEMOVE_EVENT);
				this.element.unbind(JocGame.MOUSEDOWN_EVENT);
				this.element.unbind(JocGame.MOUSEUP_EVENT);
				if (options.click) {
					var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
					(function () {
						var mouseDown = false;
						var notified = false;
						var downPosition = [0, 0];
						$this.element.bind(JocGame.MOUSEDOWN_EVENT, function (event) {
							event.preventDefault();
							if (iOS && event.type == "mousedown")
								return;
							if (event.type == "touchstart")
								lastTouchStart = Date.now();
							if (event.type == "mousedown" && Date.now() - lastTouchStart < 500)
								return;
							mouseDown = true;
							downPosition = GetEventPosition(event);
						});
						$this.element.bind(JocGame.MOUSEUP_EVENT, function (event) {
							event.preventDefault();
							if (iOS && event.type == "mouseup")
								return;
							mouseDown = false;
							if (event.type == "joclyclick")
								lastJoclyclick = Date.now();
							if (event.type == "mouseup" && Date.now() - lastJoclyclick < 500)
								return;
							if (event.type == 'mouseup' || event.type == 'joclyclick') {
								options.click.call($this);
							} else {
								event.stopPropagation();
								var newevent = new CustomEvent("joclyclick", {});
								var x, y;
								if (event.originalEvent.changedTouches && event.originalEvent.changedTouches.length > 0) {
									x = event.originalEvent.changedTouches[0].pageX;
									y = event.originalEvent.changedTouches[0].pageY;
								} else if (event.originalEvent.touches && event.originalEvent.touches.length > 0) {
									x = event.originalEvent.touches[0].pageX;
									y = event.originalEvent.touches[0].pageY;
								} else {
									console.warn("Invalid touch event");
									return;
								}
								var target = document.elementFromPoint(x, y);
								target.dispatchEvent(newevent);
							}
						});
						$this.element.bind(JocGame.MOUSEMOVE_EVENT, function (event) {
							event.preventDefault();
							if (iOS && event.type == "mousemove")
								return;
							if (mouseDown && !notified) {
								var position = GetEventPosition(event);
								var dx = position[0] - downPosition[0];
								var dy = position[1] - downPosition[1];
								if (dx * dx + dy * dy > 100) {
									notified = true;
									options.click.call($this);
								}
							}
						});
					})();
				}
			}
			/*
			if(force ||
					options.holdClick != this.options.holdClick) {
				this.element.unbind("holdclick");
				if(options.holdClick)
					this.element.bind("holdclick",options.holdClick);
			}
			*/
			if (force ||
				options.rotate != this.options.rotate) {
				while (options.rotate < 0)
					options.rotate += 360;
				options.rotate %= 360;
				var rotate = options.rotate;
				var rotate0 = this.options.rotate;
				if (rotate - this.options.rotate > 180)
					rotate0 = 360;
				else if (this.options.rotate - rotate > 180)
					rotate += 360;
				if (delay) {
					this.animStart(options);
					$({ deg: rotate0 }).animate({ deg: rotate }, {
						step: function (now) {
							$this.element.css('transform', 'rotate(' + now + 'deg)');
						},
						duration: delay,
						complete: function () {
							$this.animEnd(options);
						},
					});
				} else
					this.element.css({
						"transform": "rotate(" + options.rotate + "deg)",
					});
			} else if (delay) {
				this.animStart(options);
				setTimeout(function () {
					$this.animEnd(options);
				}, 0);
			}
			if (force ||
				options.opacity != this.options.opacity) {
				if (delay) {
					this.animStart(options);
					this.element.stop().animate({
						"opacity": options.opacity,
					}, delay, function () { $this.animEnd(options); });
				} else
					this.element.css({
						"opacity": options.opacity,
					});
			}
		},
		show: function () {
			this.element.show();
		},
		hide: function () {
			this.element.hide();
		},
		remove: function () {
			this._super.apply(this, arguments);
			this.element.unbind(JocGame.CLICK);
			//this.element.unbind("holdclick");
			this.element.remove();
		},
	});

	var GadgetImage = GadgetElement.extend({
		displayElement: function (force, options) {
			var $this = this;
			this._super.apply(this, arguments);
			if (force || this.options.file != options.file) {
				this.options.file = options.file;
				GetResource("image|" + options.file, function (image, imgSrc) {
					if (imgSrc == $this.options.file)
						$this.element.css({
							"background-image": "url(" + image.src + ")",
							"background-size": "100% 100%",
							"background-repeat": "no-repeat",
						});
					else
						console.log("file has changed to", $this.options.file, "(", imgSrc, ")");
				});
			}
		},
	});

	var GadgetCanvas = GadgetElement.extend({
		init: function (gadget, options) {
			options = $.extend({
				tag: "canvas",
				draw: function () { },
			}, options);
			this._super.call(this, gadget, options);
			this.canvasContext = this.element[0].getContext("2d");
		},
		displayElement: function (force, options) {
			this._super.apply(this, arguments);
			this.element.attr("width", this.aWidth).attr("height", this.aHeight);
			//this.canvasContext.save();
			this.canvasContext.clearRect(0, 0, options.width, options.height);
			this.canvasContext.translate(this.aWidth / 2, this.aHeight / 2);
			this.canvasContext.scale(options.ratio, options.ratio);
			this.options.draw.call(this, this.canvasContext, 1 / options.ratio);
			//this.canvasContext.restore();
		}
	});

	var GadgetHexagon = GadgetCanvas.extend({
		init: function (gadget, options) {
			var $this = this;
			var R = options.radius;
			var L = R * Math.sqrt(3) / 2;
			options = $.extend({
				lineWidthFactor: 1,
			}, options, {
					draw: function (ctx, pixSize) {
						ctx.lineWidth = pixSize * $this.options.lineWidthFactor;
						ctx.beginPath();
						ctx.moveTo(-L, L / 2);
						ctx.lineTo(0, R);
						ctx.lineTo(L, L / 2);
						ctx.lineTo(L, -L / 2);
						ctx.lineTo(0, -R);
						ctx.lineTo(-L, -L / 2);
						ctx.closePath();
						if ($this.options.strokeStyle) {
							ctx.strokeStyle = $this.options.strokeStyle;
							ctx.stroke();
						}
						if ($this.options.fillStyle) {
							ctx.fillStyle = $this.options.fillStyle;
							ctx.fill();
						}
					},
				});
			this._super.call(this, gadget, options);
			this.element.attr("width", options.width).attr("height", options.height);
			this.canvasContext = this.element[0].getContext("2d");
		},
	});

	/*
	var GadgetSprite=GadgetCanvas.extend({
		init: function(gadget,options) {
			this._super.apply(this,arguments);
			this.displayArgs=null;
		},
		displayElement: function(force,options) {
			var $this=this;
			this._super.apply(this,arguments);
			if(force || this.options.file!=options.file) {
				GetResource("image|"+options.file, function(image) {
					$this.image=image;
					if($this.displayArgs && $this.options.clipx!==undefined && $this.options.clipy!==undefined && 
							$this.options.clipwidth!==undefined && $this.options.clipheight!==undefined)
						$this.drawImage.apply($this,$this.displayArgs);
				});
			}
			if(force || this.options.clipx!=options.clipx
					|| this.options.clipy!=options.clipy
					|| this.options.clipwidth!=options.clipwidth
					|| this.options.clipheight!=options.clipheight
					) {
				if(this.image && options.clipx!==undefined && options.clipy!==undefined && 
						options.clipwidth!==undefined && options.clipheight!==undefined) {
					this.drawImage.call(this,force,options);
				} else 
					this.displayArgs=arguments;
			}
			if(this.image && options.clipx!==undefined && options.clipy!==undefined && 
					options.clipwidth!==undefined && options.clipheight!==undefined)
				this.drawImage.apply(this,arguments);
			else
				this.displayArgs=arguments;
		},
		drawImage: function(force,options) {
			this.canvasContext.save();
			var x0=parseInt(options.clipx+.5);
			var y0=parseInt(options.clipy+.5);
			var cx0=parseInt(options.clipwidth+.5);
			var cy0=parseInt(options.clipheight+.5);
			var x1=0;
			var y1=0;
			var cx1=parseInt(this.aWidth+.5);
			var cy1=parseInt(this.aHeight+.5);
			
			this.canvasContext.scale(cx1,cy1);
			this.canvasContext.imageSmoothingEnabled=true;
        	
			this.canvasContext.drawImage(this.image,x0,y0,cx0,cy0,x1,y1,1,1);
			//this.canvasContext.drawImage(this.image,x0,y0,cx0,cy0,x1,y1,cx1,cy1);
			this.canvasContext.restore();
			this.displayArgs=null;
		},
	});
	*/

	var GadgetSprite = GadgetCanvas.extend({
		init: function (gadget, options) {
			this._super.apply(this, arguments);
			this.displayArgs = null;
		},
		displayElement: function (force, options) {
			var $this = this;
			this._super.apply(this, arguments);
			if (force || this.options.file != options.file) {
				GetResource("image|" + options.file, function (image, imgSrc) {
					if (imgSrc == $this.options.file) {
						$this.image = image;
						$this.element.css({
							"background-image": "url(" + image.src + ")",
							"background-size": "100% 100%",
							"background-repeat": "no-repeat",
						});
					}
					if ($this.displayArgs && $this.options.clipx !== undefined && $this.options.clipy !== undefined &&
						$this.options.clipwidth !== undefined && $this.options.clipheight !== undefined)
						$this.drawImage.apply($this, $this.displayArgs);
				});
			}
			if (force || this.options.clipx != options.clipx
				|| this.options.clipy != options.clipy
				|| this.options.clipwidth != options.clipwidth
				|| this.options.clipheight != options.clipheight
			) {
				if (this.image && options.clipx !== undefined && options.clipy !== undefined &&
					options.clipwidth !== undefined && options.clipheight !== undefined) {
					this.drawImage.call(this, force, options);
				} else
					this.displayArgs = arguments;
			}
			if (this.image && options.clipx !== undefined && options.clipy !== undefined &&
				options.clipwidth !== undefined && options.clipheight !== undefined)
				this.drawImage.apply(this, arguments);
			else
				this.displayArgs = arguments;
		},
		drawImage: function (force, options) {
			var rx = (options.clipwidth / this.aWidth);
			var ry = (options.clipheight / this.aHeight);
			var bcx = parseInt(this.image.width / rx + .5);
			var bcy = parseInt(this.image.height / ry + .5);
			var bs = "" + bcx + "px " + bcy + "px";
			this.element.css({
				"width": parseInt(this.aWidth + .5),
				"height": parseInt(this.aHeight + .5),
				"background-image": options.file,
				"background-size": bs,
				"background-position": "-" + (parseInt(options.clipx / rx + .5)) + "px -" + (parseInt(options.clipy / ry + .5)) + "px",
			});
		},
	});

	var GadgetDisk = GadgetElement.extend({
		init: function (gadget, options) {
			this._super.apply(this, arguments);
		},
		displayElement: function (force, options) {
			this._super.apply(this, arguments);
			this.element.css({
				"border-radius": "50%",
			});
		},
	});

	var GadgetObject3D = GadgetAvatar.extend({
		init: function (gadget, options) {
			var $this = this;
			this._super.apply(this, arguments);
			this.displayCalled = false;
			this.options = $.extend(true, {
				x: 0.0,
				y: 0.0,
				z: 0.0,
				color: null,
				castShadow: true,
				receiveShadow: false,
				harbor: true,
			}, options);
			this.createObject();
		},
		createObject: function () {
		},
		objectReady: function (object3d) {
			var $this = this;
			this.object3d = object3d;
			object3d.castShadow = this.options.castShadow;
			object3d.receiveShadow = this.options.receiveShadow;
			object3d.name = this.gadget.id;
			object3d.matrixAutoUpdate = false;
			this.shouldUpdate = true;
			this.update(this.options);
			//object3d.visible=this.options.visible;
			if (this.options.harbor)
				threeCtx.harbor.add(object3d);
			else
				threeCtx.scene.add(object3d);
		},
		display: function (options, delay) {
			var $this = this;
			if (this.object3d) {
				this.shouldUpdate = false;
				this.displayObject3D.call(this, !this.displayCalled, options, delay);
				this.displayCalled = true;
				if (this.shouldUpdate)
					this.object3d.updateMatrix();
			}
			if (delay) {
				$this.animStart(options);
				setTimeout(function () { $this.animEnd(options); }, delay);
			}
		},
		displayObject3D: function (force, options, delay) {
			var $this = this;
			threeCtx.animControl.trigger((isNaN(delay) ? 0 : delay) + 200);
			if (force ||
				options.x != this.options.x ||
				options.y != this.options.y ||
				options.z != this.options.z
			) {
				this.shouldUpdate = true;
				if (delay) {
					this.animStart(options);
					new TWEEN.Tween(this.object3d.position).to({
						x: options.x * SCALE3D,
						y: options.z * SCALE3D,
						z: options.y * SCALE3D,
					}, delay).easing(options.positionEasing ? options.positionEasing : TWEEN.Easing.Cubic.EaseInOut).onComplete(function () {
						$this.animEnd(options);
					}).onUpdate(function (ratio) {
						if (options.positionEasingUpdate)
							options.positionEasingUpdate.call($this, ratio);
					}).start();
				} else {
					this.object3d.position.x = options.x * SCALE3D;
					this.object3d.position.y = options.z * SCALE3D;
					this.object3d.position.z = options.y * SCALE3D;
				}
			}
			if (force ||
				options.click != this.options.click) {
				if (this.options.click)
					this.object3d.off("mouseup");
				if (options.click) {
					//if(!threeCtx.cameraControls.hasBeenDragged())
					this.object3d.on("mouseup", function () {
						//if(!threeCtx.cameraControls.hasBeenDragged())
						options.click.call();
					});
				}
			}
			/*
			if(force || 
					options.holdClick != this.options.holdClick) {
				if(this.options.holdClick)
					this.object3d.off("holdclick");
				if(options.holdClick) {
					//if(!threeCtx.cameraControls.hasBeenDragged())
						this.object3d.on("holdclick",function(eventData){
							if(!threeCtx.cameraControls.hasBeenDragged())
								options.holdClick.call($this,eventData);
							}
						);
				}
			}
			*/
			if (force ||
				options.castShadow != this.options.castShadow) {
				this.object3d.castShadow = options.castShadow
			}
			if (force ||
				options.receiveShadow != this.options.receiveShadow) {
				this.object3d.receiveShadow = options.receiveShadow
			}
		},
		show: function () {
			if (arStream && !this.options.harbor)
				return this.hide();
			if (this.object3d) {
				this.object3d.visible = true;
				if (this.object3d.children) {
					for (var c = 0; c < this.object3d.children.length; c++) {
						var part = this.object3d.children[c];
						if (part.joclyVisible === undefined || part.joclyVisible)
							part.visible = true;
						else
							part.visible = false;
					}
				}
			}
		},
		hide: function () {
			if (this.object3d) {
				this.object3d.visible = false;
				if (this.object3d.children) {
					for (var c = 0; c < this.object3d.children.length; c++)
						this.object3d.children[c].visible = false;
				}
			}
		},
		remove: function () {
			this._super.apply(this, arguments);
			if (this.object3d) {
				if (this.options.click)
					this.object3d.off("mouseup");
				/*
				if(this.options.holdClick)
					this.object3d.off("holdclick");
				*/
				if (this.object3d.parent)
					this.object3d.parent.remove(this.object3d);
				this.object3d = null;
			}
		},
		getMaterialMap: GetMaterialMap,
	});

	var GadgetMesh = GadgetObject3D.extend({
		init: function (gadget, options) {
			options = $.extend(true, {
				rotate: 0,
				rotateX: 0,
				rotateY: 0,
				scale: [1, 1, 1],
				materials: {},
				smooth: 0,
				opacity: 1,
				flatShading: false,
				morphing: [],
			}, options, {
				});
			this._super.call(this, gadget, options);
		},
		displayObject3D: function (force, options, delay) {
			var $this = this;
			this._super.apply(this, arguments);
			if (force ||
				options.rotate != this.options.rotate ||
				options.rotateX != this.options.rotateX ||
				options.rotateY != this.options.rotateY
			) {
				this.shouldUpdate = true;
				var delta = options.rotate - this.options.rotate;
				if (delta > 180)
					options.rotate -= 360;
				else if (delta < -180)
					options.rotate += 360;
				delta = options.rotateX - this.options.rotateX;
				if (delta > 180)
					options.rotateX -= 360;
				else if (delta < -180)
					options.rotateX += 360;
				delta = options.rotateY - this.options.rotateY;
				if (delta > 180)
					options.rotateY -= 360;
				else if (delta < -180)
					options.rotateY += 360;
				if (delay) {
					this.animStart(options);
					new TWEEN.Tween(this.object3d.rotation).to({
						x: options.rotateX * (Math.PI / 180),
						y: options.rotate * (Math.PI / 180),
						z: options.rotateY * (Math.PI / 180),
					}, delay).easing(options.rotateEasing ? options.rotateEasing : TWEEN.Easing.Cubic.EaseInOut).onComplete(function () {
						$this.animEnd(options);
					}).start();
				} else {
					this.object3d.rotation.x = options.rotateX * (Math.PI / 180);
					this.object3d.rotation.y = options.rotate * (Math.PI / 180);
					this.object3d.rotation.z = options.rotateY * (Math.PI / 180);
				}
			}
			if (force ||
				options.scale[0] != this.options.scale[0] ||
				options.scale[1] != this.options.scale[1] ||
				options.scale[2] != this.options.scale[2]
			) {
				this.shouldUpdate = true;
				if (delay) {
					this.animStart(options);
					new TWEEN.Tween(this.object3d.scale).to({
						x: options.scale[0],
						y: options.scale[2],
						z: options.scale[1],
					}, delay).easing(options.scaleEasing ? options.scaleEasing : TWEEN.Easing.Cubic.EaseInOut).onComplete(function () {
						$this.animEnd(options);
					}).start();
				} else {
					this.object3d.scale.set(options.scale[0], options.scale[2], options.scale[1]);
					/*if ((options.scale[0] > 0) &&
						(options.scale[1] > 0) &&
						(options.scale[2] > 0)
					)
						this.object3d.scale.set(options.scale[0],options.scale[2],options.scale[1]);
					else{
						var g=this.object3d.geometry;
						g.dynamic = true;
						for(var i = 0; i<g.faces.length; i++) {
						    g.faces[i].normal.x = -1*g.faces[i].normal.x;
						    g.faces[i].normal.y = -1*g.faces[i].normal.y;
						    g.faces[i].normal.z = -1*g.faces[i].normal.z;
						}
						g.computeVertexNormals();
						g.computeFaceNormals();
						g.applyMatrix(new THREE.Matrix4().makeScale( options.scale[0], options.scale[2], options.scale[1] ) );						
					}*/
				}
			}
			if (force ||
				options.color != this.options.color
			) {
				if (this.object3d.material && this.object3d.material.color !== undefined)
					if (options.color !== null) {
						this.object3d.material.color.setHex(options.color);
						this.object3d.material.color.convertSRGBToLinear();
					}

				/*
									if(options.color===null)
										this.object3d.material.color.setHex(0xffffff);
									else 
										this.object3d.material.color.setHex(options.color);
				*/
			}
			if (force ||
				options.opacity != this.options.opacity
			) {
				if (this.object3d.material && this.object3d.material.opacity !== undefined) {
					if (options.opacity === null)
						options.opacity = 1;
					if (delay) {
						this.animStart(options);
						new TWEEN.Tween(this.object3d.material).to({
							opacity: options.opacity,
						}, delay).easing(options.opacityEasing ? options.opacityEasing : TWEEN.Easing.Cubic.EaseInOut).onComplete(function () {
							$this.animEnd(options);
						}).start();
					} else
						this.object3d.material.opacity = options.opacity;

				}
			}
			if (force ||
				options.morphing.toString() != this.options.morphing.toString()
			) {
				this.shouldUpdate = true;
				if (options.morphing.length > 0 && this.object3d.morphTargetInfluences) {
					if (this.object3d.material && Array.isArray(this.object3d.material) &&
						this.object3d.material.length > 0 && !this.object3d.material[0].morphTargets) {
						for (var i = 0; i < this.object3d.material.length; i++)
							this.object3d.material[i].morphTargets = true;
					}
					if (delay) {
						this.animStart(options);
						new TWEEN.Tween(this.object3d.morphTargetInfluences).to(options.morphing,
							delay).easing(options.morphingEasing ? options.morphingEasing : TWEEN.Easing.Cubic.EaseInOut).onComplete(function () {
								$this.animEnd(options);
							}).start();
					} else {
						for (var i = 0; i < options.morphing.length && i < this.object3d.morphTargetInfluences.length; i++)
							this.object3d.morphTargetInfluences[i] = options.morphing[i];
					}
				}
			}
			if (this.object3d.material && options.materials) {
				if (force) {
					if (this.object3d.material && Array.isArray(this.object3d.material)) {
						for (var m in this.object3d.material) {
							var mat = $this.object3d.material[m];
							if (options.materials[mat.name]) {
								for (var mpi in options.materials[mat.name]) {
									var newMatProp = options.materials[mat.name][mpi];
									(function (mat, mpi) {
										if (mpi == "map") {
											GetMaterialMap(newMatProp, function (matMpi) {
												mat[mpi] = matMpi;
												mat.needsUpdate = true;
											});
										} else if (mpi == "color") {
											if (typeof mat["ambient"] != "undefined") {
												mat["ambient"].setHex(newMatProp);
												mat["ambient"].convertSRGBToLinear();
											}
											mat[mpi].setHex(newMatProp);
											mat[mpi].convertSRGBToLinear();
										}
										else
											mat[mpi] = newMatProp;
									})(mat, mpi, m);
								}
							}
						}
					}
				} else {
					var diffMat = Diff(this.options.materials, options.materials);
					if (diffMat) {
						for (var mi in diffMat) {
							var newMat = diffMat[mi];
							if (this.object3d.material && Array.isArray(this.object3d.material)) {
								for (var m in this.object3d.material) {
									var mat = $this.object3d.material[m];
									if (mat.name == mi) {
										if (newMat) {
											for (var mpi in newMat) {
												var newMatProp = newMat[mpi];
												if (newMatProp !== null) {
													(function (mat, mpi) {
														if (mpi == "map")
															GetMaterialMap(newMatProp, function (matMpi) {
																mat[mpi] = matMpi;
																mat.needsUpdate = true;
															});
														else if (mpi == "color") {
															if (typeof mat["ambient"] != "undefined") {
																mat["ambient"].setHex(newMatProp);
																mat["ambient"].convertSRGBToLinear();
															}
															mat[mpi].setHex(newMatProp);
															mat[mpi].convertSRGBToLinear();
														} else {
															if (delay) {
																$this.animStart(options);
																if (mat[mpi] === undefined || isNaN(newMatProp)) {
																	mat[mpi] = newMatProp;
																	setTimeout(function () {
																		$this.animEnd(options);
																	});
																} else {
																	var change = {};
																	change[mpi] = newMatProp;
																	new TWEEN.Tween(mat).to(change, delay).easing(options.materialEasing ? options.materialEasing :
																		TWEEN.Easing.Cubic.EaseInOut).onComplete(function () {
																			$this.animEnd(options);
																		}).start();
																}
															} else
																mat[mpi] = newMatProp;
														}
													})(mat, mpi);
												} else
													delete mat[mpi];
											}
										} else {
											delete mat.map;
											delete mat.opacity;
											delete mat.color;
										}
									}
								}
							}
						}
					}
				}
			}
		},
	});

	var GadgetCustomMesh3D = GadgetMesh.extend({
		init: function (gadget, options) {
			options = $.extend(true, {
				create: function () { return null },
				display: function () { },
			}, options, {
				});
			this._super.call(this, gadget, options);
		},
		createObject: function () {
			var $this = this;
			function Callback(object3d) {
				$this.objectReady(object3d);
			}
			var object3d = this.options.create.call(this, Callback);
			if (object3d)
				this.objectReady(object3d);
		},
		displayObject3D: function (force, options, delay) {
			this._super.apply(this, arguments);
			this.options.display.call(this, force, options, delay);
		},
		replaceMesh: function (mesh, options, delay) {
			if (this.object3d) {
				if (this.options.click)
					this.object3d.off("mouseup");
				/*
				if(this.options.holdClick)
					this.object3d.off("holdclick");
				*/
				if (this.object3d.parent)
					this.object3d.parent.remove(this.object3d);
			}
			this.object3d = mesh;
			if (this.options.visible)
				this.show();
			else
				this.hide();
			if (this.options.harbor)
				threeCtx.harbor.add(this.object3d);
			else
				threeCtx.scene.add(this.object3d);
			if (delay) {
				this.displayObject3D(true, this.options);
				this.displayObject3D(true, options, delay);
			} else
				this.displayObject3D(true, options);
		},
	});

	var GadgetPlane3D = GadgetMesh.extend({
		init: function (gadget, options) {
			options = $.extend(true, {
				display: function () { },
				sx: 1000,
				sy: 1000,
				color: 0xffffff,
				horizontal: true,
				texture: null,
				material: "basic",
				side: null,

			}, options, {
				});
			this._super.call(this, gadget, options);
		},
		createObject: function () {
			var gg = new THREE.PlaneGeometry(this.options.sx * SCALE3D, this.options.sy * SCALE3D, 1, 1);
			var matData = {
				color: this.options.data,
				opacity: 0,
			}
			if (this.options.texture) {
				var tOptions = this.options.texture;
				if (tOptions.file) {
					GetMaterialMap(tOptions.file, function (texture) {
						if (tOptions.wrapS !== undefined)
							texture.wrapS = tOptions.wrapS;
						if (tOptions.wrapT !== undefined)
							texture.wrapT = tOptions.wrapT;
						if (tOptions.repeat)
							texture.repeat.set.apply(texture.repeat, tOptions.repeat);
						matData.map = texture;
					});
				}
			}
			if (this.options.side !== undefined)
				matData.side = this.options.side;
			if (this.options.transparent !== undefined)
				matData.transparent = this.options.transparent;
			var gm;
			switch (this.options.material) {
				case "phong":
					gm = new THREE.MeshPhongMaterial(matData);
					break;
				default:
					gm = new THREE.MeshBasicMaterial(matData);
			}
			var mesh = new THREE.Mesh(gg, gm);
			this.objectReady(mesh);
		},
	});

	// should this class be obsoleted in favor of GadgetCustomMesh3D
	var GadgetCustom3D = GadgetObject3D.extend({
		init: function (gadget, options) {
			options = $.extend(true, {
				create: function () { return null },
				display: function () { },
			}, options, {
				});
			this._super.call(this, gadget, options);
		},
		createObject: function () {
			var $this = this;
			function Callback(object3d) {
				$this.objectReady(object3d);
			}
			var object3d = this.options.create.call(this, Callback);
			if (object3d)
				this.objectReady(object3d);
		},
		displayObject3D: function (force, options, delay) {
			this._super.apply(this, arguments);
			this.options.display.call(this, force, options, delay);
		},
	});

	var GadgetMeshFile = GadgetMesh.extend({
		init: function (gadget, options) {
			this._super.apply(this, arguments);
			this.meshFileForceDisplay = false;
		},
		createObject: function () {
			var $this = this;
			var file = this.options.file;
			var smooth = this.options.smooth;
			GetResource("smoothedfilegeo|" + this.options.smooth + "|" + file, function (geometry, materials) {
				if (file != $this.options.file)
					return;
				var materials0 = []
				if (materials)
					for (var i = 0; i < materials.length; i++)
						materials0.push(materials[i].clone());
				materials = materials0;
				if ($this.options.flatShading)
					for (var m = 0; m < materials.length; m++) {
						materials[m].flatShading = true;
					}
				var mesh = new THREE.Mesh(geometry, materials);
				$this.objectReady(mesh);
				if ($this.meshFileForceDisplay) {
					$this.displayObject3D(true, $this.meshFileForceDisplay);
					$this.meshFileForceDisplay = false;
				}
			});
		},
		displayObject3D: function (force, options, delay) {
			var fileChange = (options.file != this.options.file);
			if (fileChange) {
				options.click = null;
				//options.holdClick=null;
			}
			this._super.apply(this, arguments);
			if (fileChange) {
				if (this.object3d) {
					if (this.options.click)
						this.object3d.off("mouseup");
					/*
					if(this.options.holdClick)
						this.object3d.off("holdclick");
					*/
					if (this.object3d.parent)
						this.object3d.parent.remove(this.object3d);
					this.object3d = null;
				}
				this.options.file = options.file;
				this.meshFileForceDisplay = options;
				this.createObject();
			}
		},
	});

	var Gadget3DVideo = GadgetMesh.extend({
		init: function (gadget, options) {
			options = $.extend(true, {
				scale: [1, 1, 1],
				playerSide: 1,
				makeMesh: function (videoTexture, ccvVideoTexture) {
					var material = new THREE.MeshBasicMaterial({
						map: videoTexture,
						overdraw: true,
						// side:THREE.DoubleSide
					});
					var geometry = new THREE.PlaneGeometry(12, 9, 1, 1);
					var mesh = new THREE.Mesh(geometry, material);

					return mesh;
				},
				videoPlaying: function (on) {
				},
				ccvLocked: function (on) {
				},
				ccv: false,
				ccvMargin: [.10, .10, .30, .10],
				ccvWidth: 80,
				ccvHeight: 60,
				hideBeforeFirstLock: true,
			}, options);
			this._super.call(this, gadget, options);
			this.videoConnected = false;
			this.videoErrorCount = 0;
			this.videoSkipError = false;
			this.shouldBeVisible = false;
			this.gotFirstLock = false;
		},
		objectReady: function (mesh) {
			mesh.visible = false;
			for (var i = 0; i < mesh.children.length; i++)
				mesh.children[i].visible = false;
			this.streamReady(Gadget3DVideo.isStreamReady(this.options.playerSide));
			this._super.apply(this, arguments);
		},
		createObject: function () {
			Gadget3DVideo.addAvatar(this, this.options.playerSide);
			var ccvTexture = null;
			if (this.ccvContextKey)
				ccvTexture = Gadget3DVideo.getCCVVideoTexture(this.options.playerSide, this.ccvContextKey)
			var mesh = this.options.makeMesh.call(this,
				Gadget3DVideo.getVideoTexture(this.options.playerSide), ccvTexture);
			if (mesh)
				this.objectReady(mesh);
		},
		remove: function () {
			Gadget3DVideo.removeAvatar(this, this.options.playerSide);
			this._super.apply(this, arguments);
		},
		show: function () {
			this.shouldBeVisible = true;
			if (this.videoConnected && (this.options.ccv == false || this.gotFirstLock || !this.options.hideBeforeFirstLock))
				this._super();
		},
		hide: function () {
			this.shouldBeVisible = false;
			this._super();
		},
		streamReady: function (on) {
			this.videoConnected = on;
			if (on)
				this.show();
			else
				this.hide();
		},
		ccvLocked: function (locked) {
			if (locked && this.shouldBeVisible) {
				this.gotFirstLock = true;
				this.show();
			}
			this.options.ccvLocked(locked);
		},
	});

	Gadget3DVideo.streams = {};
	Gadget3DVideo.avatars = { "1": [], "-1": [] };
	Gadget3DVideo.textures = { "1": null, "-1": null };
	Gadget3DVideo.renderLoopHooked = false;
	Gadget3DVideo.ccvLibRequested = false;
	Gadget3DVideo.getStream = function (playerSide) {
		if (!this.streams[playerSide]) {
			var vStream = {
				stream: null,
				avatars: this.avatars[playerSide],
				video: null,
				videoImage: null,
				videoContext: null,
				videoTexture: null,
				streamReady: false,
				ownVideoElement: false,
				errorCount: 0,
				loopCount: 0,
				local: false,
				ccvVideoImage: null,
				ccvInProgress: false,
				ccvLock: null,
				ccvContexts: {},
				ccvLastAnalyzed: null,
				ccvLastSuccess: null,
			}
			var video = $("video[joclyhub-video='" + playerSide + "']");
			if (video.length > 0) {
				vStream.video = video;
			} else {
				vStream.ownVideoElement = true;
				vStream.video = $("<video/>").attr("autoplay", "autoplay").width(
					160).height(120).css({
						visibility: "hidden",
						position: "absolute",
						"z-index": -1,
						top: 0,
					}).attr("joclyhub-video", playerSide).appendTo("body");
			}
			var canvas = $("canvas[joclyhub-video-canvas='" + playerSide + "']");
			if (canvas.length > 0) {
				vStream.videoImage = canvas;
				if (this.textures[playerSide])
					vStream.videoTexture = this.textures[playerSide];
				else {
					vStream.videoTexture = new THREE.Texture(vStream.videoImage[0]);
					this.textures[playerSide] = vStream.videoTexture;
				}
			} else {
				vStream.videoImage = this.makeCanvas(160, 120).attr("joclyhub-video-canvas", playerSide);
				vStream.videoTexture = new THREE.Texture(vStream.videoImage[0]);
				this.textures[playerSide] = vStream.videoTexture;
			}
			vStream.videoTexture.minFilter = THREE.LinearFilter;
			vStream.videoTexture.magFilter = THREE.LinearFilter;
			vStream.videoImageContext = vStream.videoImage[0].getContext('2d');
			this.streams[playerSide] = vStream;
		}
		return this.streams[playerSide];
	}
	Gadget3DVideo.addStream = function (playerSide, stream, local) {
		var $this = this;
		var vStream = this.getStream(playerSide);
		vStream.stream = stream;
		vStream.local = local;
		if (threeCtx)
			threeCtx.animControl.trigger(3000);
		if (!this.renderLoopHooked) {
			this.renderLoopHooked = true;
			if (threeCtx)
				threeCtx.animateCallbacks["Gadget3DVideo"] = {
					_this: $this,
					callback: $this.animate,
				}
		}
	}
	Gadget3DVideo.removeStream = function (playerSide) {
		var vStream = this.streams[playerSide];
		if (vStream) {
			if (vStream.streamReady)
				for (var i = 0; i < vStream.avatars.length; i++)
					vStream.avatars[i].streamReady(false);
			if (vStream.ccvLastSuccess)
				vStream.ccvLastSuccess.videoImage.remove();
			if (vStream.ccvLastAnalyzed)
				vStream.ccvLastAnalyzed.remove();
			delete this.streams[playerSide];
			if (this.renderLoopHooked) {
				var streamCount = 0;
				for (var s in this.streams)
					streamCount++;
				if (streamCount == 0) {
					if (threeCtx)
						delete threeCtx.animateCallbacks["Gadget3DVideo"];
					this.renderLoopHooked = false;
				}
			}
		}
	}
	Gadget3DVideo.addAvatar = function (avatar, playerSide) {
		this.avatars[playerSide].push(avatar);
		var vStream = this.getStream(playerSide);
		if (!avatar.ccvContextKey)
			avatar.ccvContextKey = "" + avatar.options.ccvWidth + "," + avatar.options.ccvHeight + "," + JSON.stringify(avatar.options.ccvMargin);
		if (!vStream.ccvContexts[avatar.ccvContextKey]) {
			var ccvContext = {
				width: avatar.options.ccvWidth,
				height: avatar.options.ccvHeight,
				margin: avatar.options.ccvMargin,
			}
			ccvContext.videoImage = this.makeCanvas(ccvContext.width, ccvContext.height);
			ccvContext.videoImageContext = ccvContext.videoImage[0].getContext('2d');
			ccvContext.videoImageContext.fillStyle = "rgb(0,255,0)";
			ccvContext.videoImageContext.fillRect(0, 0, ccvContext.width, ccvContext.height);
			ccvContext.videoTexture = new THREE.Texture(ccvContext.videoImage[0]);
			ccvContext.videoTexture.minFilter = THREE.LinearFilter;
			ccvContext.videoTexture.magFilter = THREE.LinearFilter;
			ccvContext.videoTexture.needsUpdate = true;
			vStream.ccvContexts[avatar.ccvContextKey] = ccvContext;
			//debugger;
		}
		return vStream.streamReady;
	}
	Gadget3DVideo.getVideoTexture = function (playerSide) {
		var vStream = this.streams[playerSide];
		if (vStream)
			return vStream.videoTexture;
		else
			return null;
	}
	Gadget3DVideo.getCCVVideoTexture = function (playerSide, contextKey) {
		var vStream = this.streams[playerSide];
		if (vStream) {
			var ccvContext = vStream.ccvContexts[contextKey];
			if (ccvContext)
				return ccvContext.videoTexture;
		}
		return null;
	}
	Gadget3DVideo.isStreamReady = function (playerSide) {
		return this.streams[playerSide] && this.streams[playerSide].streamReady;
	}
	Gadget3DVideo.isCCVLocked = function (playerSide) {
		return this.streams[playerSide] && this.streams[playerSide].ccvLock;
	}
	Gadget3DVideo.removeAvatar = function (avatar, playerSide) {
		var vStream = this.streams[playerSide];
		if (vStream)
			for (var i = 0; i < vStream.avatars.length; i++)
				if (avatar == vStream.avatars[i]) {
					vStream.avatars.splice(i, 1);
					break;
				}
	}
	Gadget3DVideo.animate = function () {
		for (var side in this.streams) {
			var vStream = this.streams[side];
			try {
				vStream.loopCount++;
				if (vStream.video[0].getAttribute("webrtc-attached") === "1" &&
					vStream.video[0].readyState === vStream.video[0].HAVE_ENOUGH_DATA) {
					vStream.videoImageContext.drawImage(vStream.video[0], 0, 0,
						vStream.videoImage[0].width, vStream.videoImage[0].height);
					if (vStream.videoTexture) {
						vStream.videoTexture.needsUpdate = true;
						if (!vStream.streamReady) {
							vStream.streamReady = true;
							for (var i = 0; i < vStream.avatars.length; i++)
								vStream.avatars[i].streamReady(true);
						}
					}
					var ccvLocalRequested = false;
					var ccvRequested = false;
					for (var i = 0; i < vStream.avatars.length; i++)
						if (vStream.avatars[i].options.ccv) {
							ccvRequested = true;
							if (vStream.local) {
								ccvLocalRequested = true;
								break;
							}
						}
					if (ccvLocalRequested) {
						if (typeof (ccv) == "undefined") { // ccv library not loaded
							if (!this.ccvLibRequested) {
								var path = null;
								console.error("No CCV path available");
								this.ccvLibRequested = true;
								if (path) {
									$("<script/>").attr("src", path + "/face.js").attr("type", "text/javascript")
										.appendTo($("head"));
									$("<script/>").attr("src", path + "/ccv.js").attr("type", "text/javascript")
										.appendTo($("head"));
								}
							}
						} else {
							if (!vStream.ccvInProgress)
								this.ccvPoll(vStream);
						}
					}
					if (ccvRequested)
						this.ccvAnimate(vStream);
					threeCtx.animControl.trigger();
				}
			} catch (e) {
				if (vStream.errorCount % 1000000 == 0)
					console.warn("Gadget3DVideo.animate error", vStream.errorCount, side, e);
				vStream.errorCount++;
			}
		}
	}
	Gadget3DVideo.ccvLocked = function (vStream, locking) {
		for (var i = 0; i < vStream.avatars.length; i++)
			vStream.avatars[i].ccvLocked(locking);
	}
	Gadget3DVideo.ccvPoll = function (vStream) {
		vStream.ccvInProgress = true;
		var width = vStream.videoImage[0].width;
		var height = vStream.videoImage[0].height;
		var now = Date.now();
		function CCVResult(comp) {
			if (comp.length == 0) {
				if (vStream.ccvLock) {
					vStream.ccvLock = null;
					Gadget3DVideo.ccvLocked(vStream, false);
					WebRTC.sendCCVMessage({
						locked: false,
					});
				}
			} else {
				var face = comp[0];
				var lock = vStream.ccvLock;
				vStream.ccvLock = {
					x: face.x,
					y: face.y,
					width: face.width,
					height: face.height,
				}
				if (vStream.ccvLastSuccess)
					vStream.ccvLastSuccess.videoImage.remove();
				vStream.ccvLastSuccess = $.extend({
					videoImage: vStream.ccvLastAnalyzed,
					copied: false,
				}, vStream.ccvLock);
				vStream.ccvLastAnalyzed = null;
				vStream.ccvLastAnalyzedContext = null;

				if (!lock)
					Gadget3DVideo.ccvLocked(vStream, true);
				WebRTC.sendCCVMessage({
					locked: true,
					x: face.x,
					y: face.y,
					width: face.width,
					height: face.height,
				});
			}
			ReschedulePoll();
		}
		function ReschedulePoll() {
			setTimeout(function () {
				vStream.ccvInProgress = false;
			}, 200);
		}
		if (!vStream.ccvLastAnalyzed) {
			vStream.ccvLastAnalyzed = this.makeCanvas(vStream.videoImage[0].width, vStream.videoImage[0].height);
			vStream.ccvLastAnalyzedContext = vStream.ccvLastAnalyzed[0].getContext("2d");
		}
		vStream.ccvLastAnalyzedContext.drawImage(vStream.videoImage[0], 0, 0, vStream.videoImage[0].width, vStream.videoImage[0].height);

		/*
		if(WebRTC.webrtcDetectedBrowser=="firefox")
			ccv.detect_objects({
				//"canvas" : ccv.grayscale(vStream.ccvLastAnalyzed[0]),
				"canvas" : ccv.grayscale(vStream.videoImage[0]),
				"cascade" : cascade,
				"interval" : 5,
				"min_neighbors" : 1,
				"async" : false,
				"async" : true,
				"worker" : 1
			})(CCVResult);
		else
		*/
		CCVResult(ccv.detect_objects({
			//"canvas" : ccv.grayscale(vStream.ccvLastAnalyzed[0]),
			"canvas": ccv.grayscale(vStream.videoImage[0]),
			"cascade": cascade,
			"interval": 5,
			"min_neighbors": 1,
			"async": false,
			"worker": 1
		}));
	}
	Gadget3DVideo.makeCanvas = function (width, height) {
		return $("<canvas/>").attr("width", width).attr("height", height).width(width).height(height)
			.css({
				visibility: "hidden",
				position: "absolute",
				"z-index": -1,
				top: 0,
			}).appendTo("body");
	}
	Gadget3DVideo.ccvAnimate = function (vStream) {
		function DrawImage(ccvContext, ccvLock, source) {
			var width = ccvLock.width * (1 + ccvContext.margin[1] + ccvContext.margin[3]);
			var height = ccvLock.height * (1 + ccvContext.margin[0] + ccvContext.margin[2]);
			var x = ccvLock.x - ccvLock.width * ccvContext.margin[3];
			var y = ccvLock.y - ccvLock.height * ccvContext.margin[0];
			if (x < 0) {
				width += x;
				x = 0;
			}
			if (y < 0) {
				height += y;
				y = 0;
			}
			if (x + width > source.width)
				width = source.width - x;
			if (y + height > source.height)
				height = source.height - y;
			ccvContext.videoImageContext.drawImage(source,
				x, y, width, height,
				0, 0,
				ccvContext.width, ccvContext.height);
			ccvContext.videoTexture.needsUpdate = true;
		}

		for (var contextKey in vStream.ccvContexts) {
			var ccvContext = vStream.ccvContexts[contextKey];
			if (vStream.ccvLock)
				DrawImage(ccvContext, vStream.ccvLock, vStream.videoImage[0]);
			else if (vStream.ccvLastSuccess && !vStream.ccvLastSuccess.copied) {
				vStream.ccvLastSuccess.copied = true;
				DrawImage(ccvContext, vStream.ccvLastSuccess, vStream.ccvLastSuccess.videoImage[0]);
			}
		}
	}
	Gadget3DVideo.receiveRemoteLock = function (message) {
		for (var side in this.streams) {
			var vStream = this.streams[side];
			if (vStream.local)
				continue;
			var lock = vStream.ccvLock;
			if (message.locked) {
				vStream.ccvLock = {
					x: message.x,
					y: message.y,
					width: message.width,
					height: message.height,
				};
				if (vStream.ccvLastSuccess)
					vStream.ccvLastSuccess.videoImage.remove();
				var videoImage = this.makeCanvas(vStream.videoImage[0].width, vStream.videoImage[0].height);
				var videoImageContext = videoImage[0].getContext("2d");
				videoImageContext.drawImage(vStream.videoImage[0], 0, 0, vStream.videoImage[0].width, vStream.videoImage[0].height);
				vStream.ccvLastSuccess = $.extend({
					videoImage: videoImage,
					copied: false,
				}, vStream.ccvLock);
				if (!lock)
					Gadget3DVideo.ccvLocked(vStream, true);
			} else {
				if (lock) {
					vStream.ccvLock = null;
					Gadget3DVideo.ccvLocked(vStream, false);
				}
			}
		}
	}

	function WebRTCHandler(event, data) {
		try {
			if (data.webrtcType == "mediaOn") {
				if (data.ar)
					AR(data.stream);
				else
					Gadget3DVideo.addStream(data.side, data.stream, data.local);
			} if (data.webrtcType == "mediaOff") {
				if (arStream)
					AR(null);
				else
					Gadget3DVideo.removeStream(data.side);
			} if (data.webrtcType == "ccv")
				Gadget3DVideo.receiveRemoteLock(data.message);
		} catch (e) {
			console.error("xd-view webrtc error", e);
		}
	}
	$(document).bind("joclyhub.webrtc", WebRTCHandler);

	var Gadget3DVideoFile = GadgetCustomMesh3D.extend({
		init: function (gadget, options) {
			options = $.extend(true, {
				scale: [1, 1, 1],
				makeMesh: function (videoTexture) {
					var material = new THREE.MeshBasicMaterial({
						map: videoTexture,
						overdraw: true,
					});
					var geometry = new THREE.PlaneGeometry(this.options.width * this.SCALE3D, this.options.height * this.SCALE3D, 1, 1);
					var mesh = new THREE.Mesh(geometry, material);

					return mesh;
				},
				width: 12,
				height: 9,
			}, options);
			this.videoPlayer = Gadget3DVideoFile.GetVideoPlayer(options.src);
			this._super.call(this, gadget, options);
		},
		createObject: function () {
			var mesh = this.options.makeMesh.call(this, this.videoPlayer.texture);
			if (mesh)
				this.objectReady(mesh);
		},
		remove: function () {
			var videoPlayer = videoPlayers[this.options.src];
			if (videoPlayer) {
				videoPlayer.count--;
				if (videoPlayer.count == 0) {
					delete threeCtx.animateCallbacks["Gadget3DVideoFile." + this.options.src];
					videoPlayer.tag.remove();
					videoPlayer.canvas.remove();
					delete videoPlayers[this.options.src];
				}
			}
			this._super.apply(this, arguments);
		},
	});

	var videoPlayers = {};
	Gadget3DVideoFile.GetVideoPlayer = function (url) {
		var videoPlayer = videoPlayers[url];
		if (!videoPlayer) {
			var width = 638;
			var height = 360;
			var videoTag = $("<video/>").attr("autoplay", "autoplay")./*attr("muted","muted").*/attr("loop", "loop").css({
				width: width,
				height: height,
				position: "absolute",
			}).append($("<source/>").attr("src", url).attr("type", "video/webm")).appendTo("body");
			videoPlayer = {
				count: 1,
				tag: videoTag,
				canvas: Gadget3DVideo.makeCanvas(width, height),
			}
			videoPlayer.context = videoPlayer.canvas[0].getContext('2d');
			videoPlayer.context.fillStyle = "rgb(0,255,0)";
			videoPlayer.context.fillRect(0, 0, width, height);

			videoPlayer.texture = new THREE.Texture(videoPlayer.canvas[0]);
			videoPlayer.texture.minFilter = THREE.LinearFilter;
			videoPlayer.texture.magFilter = THREE.LinearFilter;
			videoPlayer.texture.needsUpdate = true;

			function Animate() {
				var ctx = videoPlayer.context;
				ctx.drawImage(videoPlayer.tag[0], 0, 0,
					width, height);
				videoPlayer.texture.needsUpdate = true;
			}
			threeCtx.animateCallbacks["Gadget3DVideoFile." + url] = {
				_this: null,
				callback: Animate,
			}

			videoPlayers[url] = videoPlayer;
		} else
			videoPlayer.count++;

		return videoPlayer;
	}


	var GadgetCamera = GadgetObject3D.extend({
		init: function (gadget, options) {
			this._super.call(this, gadget, options);
			//this.object3d=threeCtx.camera;
			this.object3d = threeCtx.body;
			this.cameraObject = this.object3d.children[0];
			this.targetAnim = null;
			this.camTarget = threeCtx.camTarget;
		},
		displayObject3D: function (force, options, delay) {
			var $this = this;
			this.options.x = this.object3d.position.x / SCALE3D;
			this.options.y = this.object3d.position.z / SCALE3D;
			this.options.z = this.object3d.position.y / SCALE3D;
			this._super.apply(this, arguments);
			if (force ||
				options.targetX * SCALE3D != threeCtx.cameraControls.camTarget.x ||
				options.targetY * SCALE3D != threeCtx.cameraControls.camTarget.z ||
				options.targetZ * SCALE3D != threeCtx.cameraControls.camTarget.y
			) {
				if (delay) {
					var traveling = options.traveling;
					var x0 = threeCtx.cameraControls.camTarget.x;
					var y0 = threeCtx.cameraControls.camTarget.y;
					var z0 = threeCtx.cameraControls.camTarget.z;

					options.traveling = false;
					if (this.targetAnim) {
						this.targetAnim.stop();
						//this.animEnd(this.targetCallback);
						this.animEnd(options);
					}
					//this.targetCallback=callback;
					this.animStart(options);
					this.targetAnim = new TWEEN.Tween(threeCtx.cameraControls.camTarget).to({
						x: options.targetX * SCALE3D,
						y: options.targetZ * SCALE3D,
						z: options.targetY * SCALE3D,
					}, delay).easing(options.targetEasing ? options.targetEasing : TWEEN.Easing.Cubic.EaseInOut).onComplete(function () {
						$this.targetAnim = null;
						$this.animEnd(options);
					}).onUpdate(function (ratio) {
						if (options.targetEasingUpdate)
							options.targetEasingUpdate.call($this, ratio);
						if (traveling) {
							var dx = threeCtx.cameraControls.camTarget.x - x0;
							var dy = threeCtx.cameraControls.camTarget.y - y0;
							var dz = threeCtx.cameraControls.camTarget.z - z0;
							x0 = threeCtx.cameraControls.camTarget.x;
							y0 = threeCtx.cameraControls.camTarget.y;
							z0 = threeCtx.cameraControls.camTarget.z;
							//$this.object3d.position.add(new THREE.Vector3(dx,dy,dz));
						}
						//$this.object3d.lookAt(threeCtx.cameraControls.camTarget);
						$this.cameraObject.lookAt(threeCtx.cameraControls.camTarget);
					}).start();
				} else {
					threeCtx.cameraControls.camTarget.x = options.targetX * SCALE3D;
					threeCtx.cameraControls.camTarget.y = options.targetZ * SCALE3D;
					threeCtx.cameraControls.camTarget.z = options.targetY * SCALE3D;
				}
			}
		},
	});

	function CreateCameraGadget() {
		xdv.createGadget("camera", {
			"3d": {
				type: "camera3d",
				x: threeCtx.camera.position.x / SCALE3D,
				y: threeCtx.camera.position.z / SCALE3D,
				z: threeCtx.camera.position.y / SCALE3D,
				targetX: threeCtx.cameraControls.camTarget.x / SCALE3D,
				targetY: threeCtx.cameraControls.camTarget.z / SCALE3D,
				targetZ: threeCtx.cameraControls.camTarget.y / SCALE3D,
			},
		});
		xdv.saveGadgetProps("camera", ["targetX", "targetY", "targetZ"], "initial");
		xdv.updateGadget("camera", {
			"3d": {
				visible: true,
			},
		});
	}

	/* ======================================== */

	var avatarTypes = {
		"image": GadgetImage,
		"element": GadgetElement,
		"canvas": GadgetCanvas,
		"hexagon": GadgetHexagon,
		"sprite": GadgetSprite,
		"disk": GadgetDisk,
		"meshfile": GadgetMeshFile,
		"custom3d": GadgetCustom3D,
		"plane3d": GadgetPlane3D,
		"custommesh3d": GadgetCustomMesh3D,
		"video3d": Gadget3DVideo,
		"camera3d": GadgetCamera,
		"videofile3d": Gadget3DVideoFile,
	}


	/* ======================================== */

	var areaElements = null;

	View.Game.CamAnim = {
		isSupported: function () {
			return !!threeCtx;
		},
		isRunning: function () {
			return threeCtx && threeCtx.camAnim;
		},
		set: function (on) {
			if (threeCtx)
				threeCtx.setCamAnim(on);
		},
	}

	View.Game.InitView = function () {

		resourcesMap = this.resources || {};

		if (this != xdv.game) {
			xdv.game = this;
			if (this.mWidget.find(".jocly-xdv-area").length == 0) {
				area = $("<div/>").css({
					"position": "absolute",
					"z-index": 0,
					"overflow": "hidden",
				}).addClass("jocly-xdv-area").appendTo(this.mWidget);
			}
		}
		if (areaElements) {
			areaElements.appendTo(area);
			areaElements = null;
		}

		if (!xdv.initDone) {
			this.xdInit(xdv);
			xdv.initDone = true;
		}

		var needs3DUpdate = false;
		if (!currentSkin || this.mSkin != currentSkin.name) {
			currentSkin = null;
			for (var i = 0; i < this.mViewOptions.skins.length; i++) {
				var skin = this.mViewOptions.skins[i];
				if (skin.name == this.mSkin) {
					currentSkin = skin;
					break;
				}
			}
			if (currentSkin == null) {
				Log("!!! InitView", "skin", this.mSkin, "not found");
				return;
			}
			xdv.unbuildGadgets();
			areaElements = null;
			if (currentSkin["3d"])
				needs3DUpdate = true;
		}

		var areaWidth = Math.min(this.mGeometry.width, this.mGeometry.height
			* (this.mViewOptions.preferredRatio || 1));
		var areaHeight = Math.min(this.mGeometry.width / (this.mViewOptions.preferredRatio || 1), this.mGeometry.height);
		var areaCenter;
		if (currentSkin["3d"]) {
			area.css({
				left: 0,
				top: 0,
				width: this.mGeometry.width,
				height: this.mGeometry.height,
			});
			areaCenter = {
				x: this.mGeometry.width / 2,
				y: this.mGeometry.height / 2,
			};
			if (!threeCtx) {
				if (!THREE.Object3D._threexDomEvent) {
					THREE.Object3D._threexDomEvent = new THREEx.DomEvent();
				}
				threeCtx = BuildThree(this, areaWidth, areaHeight);
				CreateCameraGadget();
				threeCtx.camera.updateProjectionMatrix();
			} else {
				threeCtx.renderer.setSize(this.mGeometry.width, this.mGeometry.height);
				threeCtx.anaglyphEffect.setSize(this.mGeometry.width, this.mGeometry.height);
				threeCtx.camera.aspect = this.mGeometry.width / this.mGeometry.height;
				threeCtx.camera.updateProjectionMatrix();
			}

			THREE.Object3D._threexDomEvent.setDOMElement(threeCtx.renderer.domElement);
			THREE.Object3D._threexDomEvent.setBoundContext(THREEx_boundContext);
			THREE.Object3D._threexDomEvent.camera(threeCtx.camera);

			ResumePendingResources();

			threeCtx.animControl.trigger();
			if (needs3DUpdate) {

				var cameraData = $.extend(true, {
					radius: 12,
					elevationAngle: 60,
					rotationAngle: 90,
					distMax: 20,
					distMin: 0,
					elevationMax: 89,
					elevationMin: 10,
					startAngle: 90,
					camAnim: false,
					limitCamMoves: true,
					enableDrag: true,
					targetBounds: [3000, 3000, 3000],
					target: [0, 0, 800],
					fov: 55,
					near: .01
				}, currentSkin.camera);

				// update FOV
				threeCtx.camera.fov = cameraData.fov;
				threeCtx.camera.near = cameraData.near;
				threeCtx.camera.updateProjectionMatrix();

				$.extend(threeCtx.cameraControls, {
					minDistance: cameraData.distMin,
					maxDistance: cameraData.distMax,
					minPolarAngle: (90 - cameraData.elevationMax) * Math.PI / 180,
					maxPolarAngle: (90 - cameraData.elevationMin) * Math.PI / 180,
					enableDrag: cameraData.enableDrag,
					targetBounds: [cameraData.targetBounds[0] * SCALE3D, cameraData.targetBounds[2] * SCALE3D, cameraData.targetBounds[1] * SCALE3D],
				});

				var camPosition = {
					x: cameraData.radius * Math.cos(cameraData.elevationAngle * Math.PI / 180) * Math.cos(cameraData.rotationAngle * Math.PI / 180),
					z: cameraData.radius * Math.cos(cameraData.elevationAngle * Math.PI / 180) * Math.sin(cameraData.rotationAngle * Math.PI / 180),
					y: cameraData.radius * Math.sin(cameraData.elevationAngle * Math.PI / 180),
				}

				var camTarget = {
					x: cameraData.target[0],
					y: cameraData.target[1],
					z: cameraData.target[2],
				}
				xdv.updateGadget("camera", {
					"3d": {
						x: camPosition.x / SCALE3D,
						y: camPosition.z / SCALE3D,
						z: camPosition.y / SCALE3D,
						targetX: camTarget.x,
						targetY: camTarget.y,
						targetZ: camTarget.z,
					},
				});
				threeCtx.cameraControls.camTarget.copy(camTarget);
				//threeCtx.cameraControls.camera.position.copy(camPosition);
				threeCtx.cameraControls.update();

				var world = {
					color: 0x205D7C,
					fog: true,
					fogNear: 10,
					fogFar: 100,
					lightCastShadow: true,
					lightIntensity: 1.75,
					lightPosition: { x: -12, y: 12, z: 12 },
					//lightShadowDarkness: 0.75,
					ambientLightColor: 0xbbbbbb,
					skyLightPosition: { x: -45, y: 45, z: 45 },
					skyLightIntensity: 2,
				}
				$.extend(true, world, currentSkin.world);
				if (threeCtx.scene.fog) {
					threeCtx.scene.remove(threeCtx.scene.fog);
					delete threeCtx.scene.fog;
				}
				if (world.fog) {
					var fogColor = world.color;
					if (world.fogColor) fogColor = world.fogColor;
					var fogColorObj = new THREE.Color(fogColor);
					fogColorObj.convertSRGBToLinear();
					threeCtx.scene.fog = new THREE.Fog(fogColorObj, world.fogNear, world.fogFar);
				}

				threeCtx.world = world;
				var clearColorObj = new THREE.Color(world.color);
				clearColorObj.convertSRGBToLinear();
				threeCtx.renderer.setClearColor(clearColorObj, 1);
				threeCtx.light.castShadow = world.lightCastShadow;
				threeCtx.light.intensity = world.lightIntensity * GetLightFactor(this);
				threeCtx.light.position.set(world.lightPosition.x, world.lightPosition.y, world.lightPosition.z);
				//threeCtx.light.shadowDarkness=world.lightShadowDarkness;
				threeCtx.ambientLight.color.setHex(world.ambientLightColor);
				threeCtx.ambientLight.color.convertSRGBToLinear();
				threeCtx.skyLight.intensity = world.skyLightIntensity * GetLightFactor(this);
				threeCtx.skyLight.position.set(world.skyLightPosition.x, world.skyLightPosition.y, world.skyLightPosition.z);
			}
			threeCtx.renderer.domElement.style.display = "block";
		} else {
			area.css({
				left: (this.mGeometry.width - areaWidth) / 2,
				top: (this.mGeometry.height - areaHeight) / 2,
				width: areaWidth,
				height: areaHeight,
			});
			areaCenter = {
				x: areaWidth / 2,
				y: areaHeight / 2,
			}
			if (threeCtx)
				threeCtx.renderer.domElement.style.display = "none";
		}

		this.xdBuildScene(xdv);
		//xdv.updateArea(Math.min(areaWidth,areaHeight)/VSIZE,areaCenter);
		xdv.updateArea(Math.max(areaWidth, areaHeight) / VSIZE, areaCenter);
	}

	View.Game.DestroyView = function () {
		if (!xdv.game) {
			Log("!!! InitView", "game already unset");
			return;
		}
		if (resLoadingMask)
			resLoadingMask.hide();
		xdv.game = null;
		areaElements = area.children().detach();
		if (threeCtx) {
			if (threeCtx.cameraControls.autoRotate)
				threeCtx.cameraControls.autoRotate = false;
		}
		//threeCtx.animControl.stop();
	}

	View.Game.CloseView = function () {
		xdv.unbuildGadgets();

		if (threeCtx) {
			THREE.Object3D._threexDomEvent.unsetBoundContext(THREEx_boundContext);
			threeCtx.cameraControls.destroy();
			threeCtx = null;
		}
		InitGlobals();
	}

	View.Game.xdResourceLoaded = function (res) {
		if (/^map\|/.test(res))
			return false;
		if (resources[res] && resources[res].status == "loaded")
			return true;
		else
			return false;
	}

	View.Game.xdLoadResources = function (ress, callback) {
		var resCount = 0;
		function ResLoaded() {
			if (--resCount == 0)
				callback();
		}
		for (var i = 0; i < ress.length; i++) {
			resCount++;
			var m = /^map\|(.*)$/.exec(ress[i]);
			if (m)
				GetMaterialMap(m[1], function () {
					setTimeout(ResLoaded, 0);
				});
			else
				GetResource(ress[i], function () {
					setTimeout(ResLoaded, 0);
				});
		}
	}

	View.Game.xdExternalCommand = function (cmd, scope) {
		switch (cmd.type) {
			case 'updateCamera':
				xdv.updateGadget("camera", {
					"3d": cmd.camera,
				}, cmd.delay || 0);
				break;
			case 'getCamera':
				var resp = {
					type: "camera",
					cameraId: cmd.cameraId,
				}
				if (threeCtx) {
					resp.camera = {
						x: threeCtx.camera.position.x / SCALE3D,
						y: threeCtx.camera.position.z / SCALE3D,
						z: threeCtx.camera.position.y / SCALE3D,
						targetX: threeCtx.cameraControls.camTarget.x / SCALE3D,
						targetY: threeCtx.cameraControls.camTarget.z / SCALE3D,
						targetZ: threeCtx.cameraControls.camTarget.y / SCALE3D,
					}
				} else {
					console.warn("cannot get camera without 3D context");
					resp.camera = null;
				}
				scope.sendEmbed(resp);
				break;
			case 'snapshot':
				var resp = {
					type: "snapshot",
					snapshotId: cmd.snapshotId,
				}
				if (threeCtx) {
					var renderer = threeCtx.renderer;
					var canvas = renderer.domElement;
					renderer.render(threeCtx.scene, threeCtx.camera);
					resp.image = canvas.toDataURL("image/png");
				} else {
					console.warn("cannot get snapshot without 3D context");
					resp.image = null;
				}
				scope.sendEmbed(resp);
				break;
		}
	}

	View.Game.ViewControl = function (cmd, options) {
		options = options || {};
		var promise = new Promise(function (resolve, reject) {
			switch (cmd) {
				case "enterAnaglyph":
					if (threeCtx) {
						threeCtx.anaglyph = true;
						var factor = 2.5;
						threeCtx.scene.scale.set(1 / factor, 1 / factor, 1 / factor);
						threeCtx.camera.scale.set(factor, factor, factor);
						threeCtx.animControl.trigger();
					};
					resolve();
					break;

				case "exitAnaglyph":
					if (threeCtx) {
						threeCtx.anaglyph = false;
						threeCtx.scene.scale.set(1, 1, 1);
						threeCtx.camera.scale.set(1, 1, 1);
						threeCtx.animControl.trigger();
					};
					resolve();
					break;

				case "stopAnimations":
					var animCount = 0;
					var toBeDeleted = [];
					TWEEN.getAll().forEach(function(tween) {
						animCount++;
						if(tween !== threeCtx.dolly)
							toBeDeleted.push(tween);
					});
					toBeDeleted.forEach(function(tween) {
						TWEEN.remove(tween);
					});
					resolve(animCount > 0);
					break;

				case "setPanorama":
					if (options.pictureUrl || options.pictureData) {
						xdv.removeGadget("panorama");
						xdv.createGadget("panorama", {
							"3d": {
								type: "custommesh3d",
								harbor: false,
								rotate: options.rotate || 0,
								create: function (callback) {
									var geometry = new THREE.SphereGeometry(500, 60, 40);
									geometry.scale(- 1, 1, 1);
									new Promise(function (resolve, reject) {
										if (options.pictureData) {
											var image = new Image;
											image.src = options.pictureData;
											var texture = new THREE.Texture(image);
											texture.colorSpace = THREE.SRGBColorSpace;
											image.onload = function () {
												texture.needsUpdate = true;
												resolve(texture);
											}
										} else {
											var urlTexture = new THREE.TextureLoader().load(options.pictureUrl);
											urlTexture.colorSpace = THREE.SRGBColorSpace;
											resolve(urlTexture);
										}
									}).then(function (texture) {
										var material = new THREE.MeshBasicMaterial({
											map: texture
										});
										mesh = new THREE.Mesh(geometry, material);
										callback(mesh);
									})
								},
							}
						});
						xdv.updateGadget("panorama", {
							"3d": {
								visible: true
							},
						});
					} else {
						xdv.updateGadget("panorama", {
							"3d": {
								visible: false
							},
						});
						xdv.removeGadget("panorama");
					}
					resolve();
					break;

				case "takeSnapshot":
					if (threeCtx) {
						var canvas = threeCtx.renderer.domElement;
						threeCtx.renderer.render(threeCtx.scene, threeCtx.camera);
						resolve(canvas.toDataURL("image/" + (options.format || "png"), options.quality || undefined));
					} else
						reject(new Error("Snapshot only available on 3D views"));
					break;

				case "getCamera":
					if (threeCtx)
						resolve({
							x: threeCtx.body.position.x / SCALE3D,
							y: threeCtx.body.position.z / SCALE3D,
							z: threeCtx.body.position.y / SCALE3D,
							targetX: threeCtx.cameraControls.camTarget.x / SCALE3D,
							targetY: threeCtx.cameraControls.camTarget.z / SCALE3D,
							targetZ: threeCtx.cameraControls.camTarget.y / SCALE3D
						});
					else 
						reject(new Error("Camera only available on 3D views"));
					break;

				case 'setCamera':
					if(!threeCtx)
						return reject(new Error("Camera only available on 3D views"));

					switch(options.type) {
						case "spin":
							resolve(SpinCamera(options));
							break;
						case "stop":
							if(threeCtx.dolly) {
								delete threeCtx.animateCallbacks["dolly"];
								TWEEN.remove(threeCtx.dolly);
								delete threeCtx.dolly;
								threeCtx.animControl.stop(0);
							}
							break;
						case "move":
						default:
							resolve(MoveCamera(options));
					}

					break;


				default:
					reject(new Error("ViewControl: unsupported command " + cmd));
			}
		});
		return promise;
	}

	function SpinCamera(options) {
		function GetKalman() {
			var R = .001;
			if(typeof options.smooth!="undefined")
				R = options.smooth;
			return new KalmanFilter({R: R});
		}
		var kalman = {
			x: GetKalman(),
			y: GetKalman(),
		}
		var x0 = threeCtx.cameraControls.camTarget.x;
		var y0 = threeCtx.cameraControls.camTarget.z;
		var x1 = threeCtx.body.position.x;
		var y1 = threeCtx.body.position.z;
		var angle0 = Math.atan2(y1-y0,x1-x0);
		var angle1 = angle0 - 2 * Math.PI;
		if(options.direction=="ccw")
			angle1 = angle0 + 2 * Math.PI;
		var radius = Math.sqrt((x1-x0)*(x1-x0)+(y1-y0)*(y1-y0));
		if(threeCtx.dolly) 
			TWEEN.remove(threeCtx.dolly);
		var state = {};
		function StartSpinning() {
			state.angle = angle0;
			threeCtx.dolly = new TWEEN.Tween(state).to({ angle: angle1 }, (options.speed || 30) * 1000)
					.onComplete( function() {
						StartSpinning();
					})
					.onUpdate( function() {
						threeCtx.animControl.trigger();
					}).start();
		}
		threeCtx.animateCallbacks["dolly"] = {
			_this: null,
			callback: function() {
				threeCtx.body.position.x = kalman.x.filter(x0 + radius * Math.cos(state.angle));
				threeCtx.body.position.z = kalman.y.filter(y0 + radius * Math.sin(state.angle));
			}
		};
		StartSpinning();
		threeCtx.animControl.trigger();

	}

	function MoveCamera(options) {
		function GetKalman() {
			var R = .001;
			if(typeof options.smooth!="undefined")
				R = options.smooth;
			return new KalmanFilter({R: R});
		}
		var kalman = {
			x: GetKalman(),
			y: GetKalman(),
			z: GetKalman(),
			targetX: GetKalman(),
			targetY: GetKalman(),
			targetZ: GetKalman()
		}
		var state = {
			x: threeCtx.body.position.x,
			y: threeCtx.body.position.y,
			z: threeCtx.body.position.z,
			targetX: threeCtx.cameraControls.camTarget.x,
			targetY: threeCtx.cameraControls.camTarget.y,
			targetZ: threeCtx.cameraControls.camTarget.z
		}
		var state1 = {
			x: options.camera.x * SCALE3D,
			z: options.camera.y * SCALE3D,
			y: options.camera.z * SCALE3D,
			targetX: options.camera.targetX * SCALE3D,
			targetZ: options.camera.targetY * SCALE3D,
			targetY: options.camera.targetZ * SCALE3D
		}
		var finalCamera = new THREE.Vector3(state1.x, state1.y, state1.z);
		var finalTarget = new THREE.Vector3(state1.targetX, state1.targetY, state1.targetZ);
		if(threeCtx.dolly)
			TWEEN.remove(threeCtx.dolly);
		threeCtx.dolly = new TWEEN.Tween(state).to(state1, options.speed * 1000)
				.onUpdate( function() {
					threeCtx.animControl.trigger();
				}).start();
		threeCtx.animateCallbacks["dolly"] = {
			_this: null,
			callback: function() {
				threeCtx.body.position.x = kalman.x.filter(state.x);
				threeCtx.body.position.y = kalman.y.filter(state.y);
				threeCtx.body.position.z = kalman.z.filter(state.z);
				threeCtx.cameraControls.camTarget.x = kalman.targetX.filter(state.targetX);
				threeCtx.cameraControls.camTarget.y = kalman.targetY.filter(state.targetY);
				threeCtx.cameraControls.camTarget.z = kalman.targetZ.filter(state.targetZ);
				var cameraVec = new THREE.Vector3(
					threeCtx.body.position.x,
					threeCtx.body.position.y,
					threeCtx.body.position.z);
				if(cameraVec.distanceTo(finalCamera)<.1) {
					var targetVec = new THREE.Vector3(
						threeCtx.cameraControls.camTarget.x,
						threeCtx.cameraControls.camTarget.y,
						threeCtx.cameraControls.camTarget.z);
					if(targetVec.distanceTo(finalTarget)<.1) {
						delete threeCtx.animateCallbacks["dolly"];
						TWEEN.remove(threeCtx.dolly);
						delete threeCtx.dolly;
					}
				}
			}
		}
		threeCtx.animControl.trigger();
	}

	View.Board.Display = function (aGame) {
		//Log("### View.Board.Display");
		this.xdDisplay(xdv, aGame);
		//xdv.listScene();
	}

	View.Board.xdInput = function (xdv, aGame) {
		console.error("View.Board.xdInput must be overriden");
		return {
			initial: {},
			getActions: function (moves, currentInput) {
				return {};
			},
		}
	}

	View.Board.xdBuildHTStateMachine = function (xdv, htsm, aGame) {
		var $this = this;
		var inputSpec;
		var clickGadgets = {}, viewGadgets = {}, highlightGadgets = [];
		var inputStack, movesStack, actionStack;
		function Click(action, mode) {
			if (mode == "select")
				htsm.smQueueEvent("E_ACTION", { action: action });
			else if (mode == "cancel")
				htsm.smQueueEvent("E_CANCEL", { action: action });
		}
		function Init(args) {
			inputSpec = $this.xdInput(xdv, aGame);
			inputStack = [inputSpec.initial];
			// ensures moves are not duplicated
			var movesMap = {};
			$this.mMoves.forEach(function (move) {
				movesMap[JSON.stringify(move)] = move;
			});
			var moves = [];
			for (var m in movesMap)
				moves.push(movesMap[m]);
			movesStack = [moves];
			actionStack = [];
		}
		function ShowFurnitures(args) {
			if (inputSpec.furnitures)
				inputSpec.furnitures.forEach(function (gadget) {
					xdv.updateGadget(gadget, {
						base: {
							visible: true,
						},
					});
				});
		}
		function HideFurnitures(args) {
			if (inputSpec.furnitures)
				inputSpec.furnitures.forEach(function (gadget) {
					xdv.updateGadget(gadget, {
						base: {
							visible: false,
						},
					});
				});
		}
		function SetAction(action, mode) {
			if (mode == "select") {
				if (action.pre)
					action.pre.call($this);
				if (action.cancel)
					action.cancel.forEach(function (gid) {
						clickGadgets[gid] = true;
						xdv.updateGadget(gid, {
							base: {
								click: function () {
									Click(action, "cancel");
								},
							},
						});
					});
			}
			if (action.click)
				action.click.forEach(function (gid) {
					clickGadgets[gid] = true;
					xdv.updateGadget(gid, {
						base: {
							click: function () {
								Click(action, mode);
							},
						},
					});
				});
			if (typeof action.highlight == "function") {
				if (typeof action.unhighlight != "function")
					console.warn("No unhighlight function defined for", action);
				else
					highlightGadgets.push(function () {
						action.unhighlight.call($this, mode);
					});
				action.highlight.call($this, mode);
			}
			if (action.view)
				action.view.forEach(function (gid) {
					viewGadgets[gid] = true;
					xdv.updateGadget(gid, {
						base: {
							visible: true,
						},
					})
				});
		}
		function PrepareAction(args) {
			var nextActions = inputSpec.getActions.call($this, movesStack[movesStack.length - 1], inputStack[inputStack.length - 1]);
			if (nextActions == null) {
				htsm.smQueueEvent("E_MOVE_DONE", { move: movesStack[movesStack.length - 1][0] });
				return;
			}
			var actionsCount = 0;
			var action0;
			for (var action in nextActions) {
				action0 = nextActions[action];
				actionsCount++;
			}
			if (actionsCount > 1 || (inputStack.length == 1 && !inputSpec.allowForced) || (actionsCount == 1 && !aGame.mAutoComplete && !action0.skipable)) {
				for (var actId in nextActions) {
					var action = nextActions[actId];
					action.forced = false;
					SetAction(action, "select");
				}
			} else if (actionsCount == 0) {
				htsm.smQueueEvent("E_MOVE_DONE", { move: actionStack[actionStack.length - 1].moves[0] });
			} else {
				action0.forced = true;
				htsm.smQueueEvent("E_ACTION", { action: action0 });
			}
		}
		function SendMove(args) {
			aGame.HumanMove(args.move);
		}
		function Clean(args) {
			for (var gid in clickGadgets)
				xdv.updateGadget(gid, {
					base: {
						click: null,
					},
				});
			clickGadgets = {};
			for (var gid in viewGadgets)
				xdv.updateGadget(gid, {
					base: {
						visible: false,
					},
				});
			viewGadgets = {};
			for (var i = 0; i < highlightGadgets.length; i++)
				highlightGadgets[i].call($this);
		}
		function Execute(action, callback) {
			if (action.execute) {
				var actions = action.execute;
				if (typeof actions == "function")
					actions = [actions];
				var actionsCount = 0;
				function ActionDone(action) {
					if (--actionsCount == 0)
						callback();
				}
				actions.forEach(function (action) {
					actionsCount++;
					setTimeout(function () {
						action.call($this, ActionDone);
					}, 0);
				});
			} else
				callback();
		}
		function Action(args) {
			movesStack.push(args.action.moves);
			Execute(args.action, function () {
				htsm.smQueueEvent("E_DONE", { action: args.action });
			});
		}
		function PostAction(args) {
			if (args.action.post)
				args.action.post.call($this);
		}
		function SetCancel(args) {
			if (actionStack.length > 0 && !actionStack[actionStack.length - 1].noAutoCancel)
				SetAction(actionStack[actionStack.length - 1], "cancel");
		}
		function Validate(args) {
			inputStack.push($.extend(true, {}, inputStack[inputStack.length - 1], args.action.validate));
		}
		function Cancel(args) {
			while (actionStack.length > 0) {
				var action = actionStack.pop();
				inputStack.pop();
				movesStack.pop();
				if (action.unexecute)
					action.unexecute.call($this);
				if (action.post)
					action.post.call($this);
				if (action.forced == false)
					break;
			}
		}
		function PushAction(args) {
			actionStack.push(args.action);
		}
		htsm.smTransition("S_INIT", "E_INIT", "S_WAIT_ACTION", [Init, ShowFurnitures]);
		htsm.smEntering("S_WAIT_ACTION", [PrepareAction, SetCancel]);
		htsm.smLeaving("S_WAIT_ACTION", [Clean]);
		htsm.smTransition("S_WAIT_ACTION", "E_ACTION", "S_ACTION", [PushAction, Validate, Action]);
		htsm.smTransition("S_WAIT_ACTION", "E_CANCEL", null, [Cancel, Clean, PrepareAction, SetCancel]);
		htsm.smTransition("S_WAIT_ACTION", "E_MOVE_DONE", "S_DONE", [SendMove, HideFurnitures]);
		htsm.smTransition(["S_WAIT_ACTION", "S_ACTION"], "E_END", "S_DONE", []);
		htsm.smTransition("S_ACTION", "E_DONE", "S_WAIT_ACTION", [PostAction]);
		htsm.smTransition("S_DONE", "E_END", null, [HideFurnitures]);
	}

	View.Board.HumanTurn = function (aGame) {
		//Log("### View.Board.HumanTurn");
		var $this = this;
		htStateMachine = new HTStateMachine();
		htStateMachine.init();
		this.xdBuildHTStateMachine(xdv, htStateMachine, aGame);
		htStateMachine.smSetInitialState("S_INIT");
		htStateMachine.smQueueEvent("E_INIT", {});
		htStateMachine.smPlay();
	}

	View.Board.HumanTurnEnd = function (aGame) {
		//Log("### View.Board.HumanTurnEnd");
		if (htStateMachine) {
			htStateMachine.smQueueEvent("E_END", {});
			htStateMachine = null;
		}
	}

	View.Board.PlayedMove = function (aGame, aMove) {
		//Log("### View.Board.PlayedMove");
		return this.xdPlayedMove(xdv, aGame, aMove);
	}

	View.Board.xdShowEnd = function (xdv, aGame) {
		return true;
	}

	View.Board.ShowEnd = function (aGame) {
		return this.xdShowEnd(xdv, aGame);
	}

	/* ======================================== */

	var THREEx_boundContext = "" + Math.random();

	function BuildThree(aGame, areaWidth, areaHeight) {

		var camera = new THREE.PerspectiveCamera(55, (area.width() / area.height()), 1, 4000);

		var scene = new THREE.Scene();

		var body = new THREE.Object3D();
		scene.add(body);
		body.add(camera);

		var harbor = new THREE.Object3D();
		scene.add(harbor);

		var ambientLight = new THREE.AmbientLight(0xbbbbbb, LIGHT_INTENSITY_FACTOR);
		ambientLight.color.convertSRGBToLinear();
		harbor.add(ambientLight);

		var light = new THREE.SpotLight(0xffffff, 1.75 * LIGHT_INTENSITY_FACTOR, 0, 1.05, 1, 0);  // test params here https://threejs.org/docs/?q=SpotLight#Reference/Lights/SpotLight
		light.color.convertSRGBToLinear();
		light.position.set(-12, 12, 12);

		light.castShadow = true;
		//light.shadowDarkness = .75;

		light.shadow.camera.near = 1;
		light.shadow.camera.far = 27;
		light.shadow.camera.fov = 90;

		light.shadow.mapSize.width = 4096;
		light.shadow.mapSize.height = 4096;

		light.target = harbor;

		harbor.add(light);

		var skylight = new THREE.PointLight(0xcccccc, 2 * LIGHT_INTENSITY_FACTOR, 150, 0);//, Math.PI/5, 10);
		skylight.color.convertSRGBToLinear();
		skylight.position.set(-45, 45, 45);
		harbor.add(skylight);

		//light.shadowCameraVisible = false;
		// skylight.shadowCameraVisible = true; nonsens! PointLight objects don't have shadow feature

		var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(area.width(), area.height());
		//renderer.setClearColor( scene.fog.color, 1 );

		var projector = new THREE.Projector();

		area.append($(renderer.domElement));

		renderer.outputColorSpace = THREE.SRGBColorSpace;
		// renderer.useLegacyLights was removed entirely at r165 (not just
		// deprecated) -- assigning it is now a silent no-op. Light
		// intensities are compensated directly at their creation site
		// instead (multiplied by Math.PI), per the officially recommended
		// migration path.
		//renderer.shadowMapEnabled = true;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		//renderer.physicallyBasedShading = true; // gives high level of shininess specular
		//renderer.shadowMapCascade = true;

		var stereo = false;
		var stereoEffect = new THREE.StereoEffect(renderer);
		stereoEffect.setSize(area.width(), area.height());

		var anaglyphEffect = new THREE.AnaglyphEffect(renderer);
		anaglyphEffect.setSize(area.width(), area.height());

		var gamepads = new VRGamepads({
			camera: camera,
			scene: scene,
			resBase: aGame.config.baseURL + "res/vr/",
			drag: function (position, direction, pointerObject, pointerRescale) {
				var intersectPoint = null;
				var pointedObject = null;
				VRGetIntersect(position, direction, function (object, point) {
					intersectPoint = point;
					pointedObject = object;
				});
				return intersectPoint ? {
					point: intersectPoint,
					object: pointedObject
				} : null;
			},
			click: function (position, direction) {
				VRGetIntersect(position, direction, function (object, point) {
					if (object)
						THREE.Object3D._threexDomEvent._notify("mouseup", object, null, point);
				});
			},
			move: function (step) {
				body.position.add(step);
			}
		});

		var vrRay = new THREE.Raycaster();

		var camAnim = !!aGame.mViewOptions.camAnim;

		var animateCallbacks = {};

		var frameBacklog = 0;

		function AnimControl() {
			this.animating = false;
			this.animateTimer = null;
			this.nextStop = 0;
		}
		AnimControl.prototype = {
			start: function () {
				body.updateMatrixWorld();
				if (this.animateTimer != null) {
					clearTimeout(this.animateTimer);
					this.animateTimer = null;
				}
				if (this.animating == false) {
					this.animating = true;
					this.animate();
				}
			},
			stop: function (delay) {
				if (threeCtx && vr.vrEffect && vr.vrEffect.isPresenting) {
					if (this.animateTimer != null) {
						clearTimeout(this.animateTimer);
						this.animateTimer = null;
					}
					return;
				}
				if (delay === undefined)
					delay = 200;
				var now = Date.now();
				var $this = this;
				if (this.animating) {
					if (this.animateTimer != null) {
						if (this.nextStop < now + delay)
							clearTimeout(this.animateTimer);
						else
							return;
					}
					this.nextStop = Math.max(this.nextStop, now + delay);
					this.animateTimer = setTimeout(function () {
						$this.animateTimer = null;
						$this.animating = false;
					}, this.nextStop - now);
				}
			},
			trigger: function () {
				if (!this.animating || this.animateTimer != null) {
					this.start();
					this.stop.apply(this, arguments);
				}
			},
			animate: function () {
				var $this = this;
				var statsCurrentSec = 0;
				var statsTic = 0;
				var renderSum = 0;
				var renderCount = 0;

				function Animate(timestamp) {
					frameBacklog--;
					var t0, t1;
					var showStats = false;
					if (showStats) {
						var sec = Math.floor(Date.now() / 1000);
						if (sec == statsCurrentSec)
							statsTic++;
						else {
							if (statsTic > 0) {
								var rate = Math.round(1000 * renderSum / renderCount) / 1000;
								var lag = Math.round(1000 * (window.performance.now() - timestamp)) / 1000;
								/*
                                console.log("fps",statsTic,"render",rate,"ms","",
                                            "lag",lag,"ms","",
                                            "frame backlog",frameBacklog);
								*/
								$(statsPanel).text("fps " + statsTic);
							}
							statsTic = 1;
							statsCurrentSec = sec;
						}
					}
					if ($this.animating) {
						frameBacklog++;
						requestAnimationFrame(Animate);
					}
					TWEEN.update();
					if (showStats)
						t0 = Date.now();
					if (vr.vrEffect && vr.vrEffect.isPresenting) {
						gamepads.update();
						var harborpad = gamepads.getHarborPad();
						if (harborpad) {
							harborpad.visible = false;
							harborpad.getWorldPosition(ctx.harbor.position);
							var scale = (harborpad.getAxes()[1] + 1.1) * .03;
							ctx.harbor.scale.set(scale, scale, scale);
							harborpad.getWorldQuaternion(ctx.harbor.quaternion);
						} else {
							ctx.harbor.position.set(0, 0, 0);
							ctx.harbor.scale.set(1, 1, 1);
							ctx.harbor.quaternion.copy(ctx.defaultHarborQuaternion);
						}
						vr.vrControls.update();
						vr.vrEffect.render(scene, camera);
					} else {
						if (!arStream) {
							ctx.harbor.position.set(0, 0, 0);
							ctx.harbor.scale.set(1, 1, 1);
							ctx.harbor.quaternion.copy(ctx.defaultHarborQuaternion);
						}
						/*
                        if(gamepads)
                            gamepads.clearAll();
						*/
						if (!arStream) {
							cameraControls.update();
							cameraOrientationControls.update();
						}
						if (stereo) {
							gamepads.update();
							stereoEffect.render(scene, camera);
						} else if (ctx.anaglyph || aGame.mAnaglyph)
							anaglyphEffect.render(scene, camera);
						else
							renderer.render(scene, camera);
					}
					if (showStats) {
						t1 = Date.now();
						renderSum += t1 - t0;
						renderCount++;
					}

					for (var cbi in animateCallbacks) {
						var cb = animateCallbacks[cbi];
						cb.callback.call(cb._this);
					}
				}
				frameBacklog++;
				Animate(window.performance.now());
			},
		}
		var animControl = new AnimControl();

		var statsPanel = null;

		var cameraControls = new THREE.OrbitControls(camera, body, renderer.domElement);

		$.extend(cameraControls, {
			autoRotate: camAnim,
			animControl: animControl,
		});
		cameraControls.camTarget.set(0, 0.8, 0);

		var canOrientation = false;
		// Le mode VR/cardboard n'a de sens que sur un device tactile ; on évite
		// d'enregistrer le listener 'deviceorientation' sur desktop, ce qui
		// supprime le warning "OrientationEventWarning" de Firefox (API
		// dépréciée/désactivée côté navigateur) et l'overhead inutile pour
		// tous les visiteurs qui ne s'en servent jamais.
		var supportsOrientation = (typeof window.DeviceOrientationEvent !== "undefined")
			&& window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
		var cameraOrientationControls = supportsOrientation
			? new THREE.DeviceOrientationControls(body, function (controls) {
				if (typeof vr != "undefined")
					animControl.trigger();
				if (!canOrientation && controls.enabled) {
					canOrientation = true;
					area.find(".vr-button").show();
				}
			})
			: { update: function () {}, connect: function () {}, disconnect: function () {} };


		if (typeof cameraControls.addEventListener == "function")
			cameraControls.addEventListener('change', function () {
				animControl.trigger();
			});

		var ctx = {
			scene: scene,
			renderer: renderer,
			light: light,
			skyLight: skylight,
			ambientLight: ambientLight,
			loader: new THREE.GLTFLoader(),
			camera: camera,
			cameraControls: cameraControls,
			animateCallbacks: animateCallbacks,
			camTarget: cameraControls.camTarget,
			animControl: animControl,
			body: body,
			harbor: harbor,
			defaultHarborQuaternion: harbor.quaternion.clone(),
			anaglyphEffect: anaglyphEffect,
			anaglyph: false
		};

		function VRGetIntersect(position, direction, callback) {
			var threexDomEvent = THREE.Object3D._threexDomEvent;
			vrRay.set(position, direction);
			try {
				var intersects = vrRay.intersectObjects(threexDomEvent._boundObjs[threexDomEvent._boundContext]);
			} catch (e) {
				return callback(null, null);
			}
			if (intersects.length == 0)
				return callback(null, null);
			var intersect = intersects[0];
			var object3d = threexDomEvent.getRootObject(intersect.object);
			var objectCtx = threexDomEvent._objectCtxGet(object3d);
			if (!objectCtx)
				callback(null, null);
			else
				callback(object3d, intersect.point);
		}

		function VRSetup(ctx) {

			function LookAtHarbor() {
				vr.vrControls.resetPose();
			}

			function MakeButton() {
				ctx.vrButton = document.createElement("img");
				ctx.vrButton.className = "vr-button";
				ctx.vrButton.setAttribute("data-vr-enter-src", aGame.config.baseURL + "res/vr/vr-enter.png");
				ctx.vrButton.setAttribute("data-vr-exit-src", aGame.config.baseURL + "res/vr/vr-exit.png");
				ctx.vrButton.setAttribute("src", ctx.vrButton.getAttribute("data-vr-enter-src"));
				Object.assign(ctx.vrButton.style, {
					position: "absolute",
					bottom: "8px",
					right: "8px",
					cursor: "pointer",
					"z-index": 2147483647
				});
				area[0].appendChild(ctx.vrButton);
			}

			function CardboardVR() {
				MakeButton();
				ctx.vrButton.style.display = "none";
				ctx.vrButton.addEventListener("click", function () {
					if (stereo) {
						stereo = false;
						ctx.vrButton.setAttribute("src", ctx.vrButton.getAttribute("data-vr-enter-src"));
						var size = renderer.getSize();
						renderer.setViewport(0, 0, size.width, size.height);
					} else {
						stereo = true;
						ctx.vrButton.setAttribute("src", ctx.vrButton.getAttribute("data-vr-exit-src"));
					}
					animControl.trigger();
				});
			}

			function PureVR() {
				MakeButton();
				var vrControls = new THREE.VRControls(ctx.camera);
				vr.vrControls = vrControls;
				if (window.lastVrEffect) {
					if (window.lastVrEffect.isPresenting)
						window.lastVrEffect.exitPresent();
				}
				var vrEffect = new THREE.VREffect(ctx.renderer);
				vr.vrEffect = vrEffect;
				window.lastVrEffect = vrEffect;

				window.addEventListener('vrdisplaypresentchange', function (event) {
					ctx.animControl.trigger()
				}, false);

				ctx.vrButton.addEventListener("click", function () {
					if (vrEffect.isPresenting) {
						vrEffect.exitPresent();
						ctx.vrButton.setAttribute("src", ctx.vrButton.getAttribute("data-vr-enter-src"));
					} else {
						vrEffect.requestPresent();
						ctx.vrButton.setAttribute("src", ctx.vrButton.getAttribute("data-vr-exit-src"));
						LookAtHarbor();
					}
					animControl.trigger();
				});

			}

			vr = {};

			if (typeof navigator.getVRDisplays != "undefined") {
				navigator.getVRDisplays()
					.then(function (displays) {
						if (displays.length == 0)
							CardboardVR();
						else
							PureVR();
					}).catch(function () {
						CardboardVR();
					});
			} else
				CardboardVR();

			return vr;
		}

		var vr = VRSetup(ctx);

		return $.extend(ctx, vr);
	}


	function GetEventPosition(event) {
		if (event.originalEvent)
			return GetEventPosition(event.originalEvent);
		if (event.changedTouches && event.changedTouches.length > 0)
			return [event.changedTouches[0].pageX, event.changedTouches[0].pageY];
		if (event.touches && event.touches.length > 0)
			return [event.touches[0].pageX, event.touches[0].pageY];
		return [event.pageX, event.pageY];
	}

	function AR(stream) {
		if (!!arStream == !!stream) {
			console.warn("AR is already", !!stream);
			return;
		}
		arStream = stream;
		if (arStream) {
			var video = $("<video/>").addClass("ar-video").attr("autoplay", "autoplay").css({
				position: "absolute",
				top: 0,
				width: "100%",
				height: "100%",
				left: 0,
				"z-index": -1,
				backgroundColor: "#0f0",
				objectFit: "cover"
			}).appendTo(area.parent());
			JoclyAR.attach({
				element: video[0],
				stream: arStream,
				threeCtx: threeCtx
			});
			xdv.redisplayGadgets();
			threeCtx.renderer.setClearColor(new THREE.Color(threeCtx.world.color), 0);
			threeCtx.animControl.trigger();
		} else {
			var video = area.parent().find(".ar-video");
			if (video.length) {
				JoclyAR.detach({
					element: video[0]
				});
				video.remove();
			}
			xdv.redisplayGadgets();
			threeCtx.renderer.setClearColor(new THREE.Color(threeCtx.world.color), 1);
			threeCtx.animControl.trigger();
		}
	}

})();

//# sourceMappingURL=jocly-xdview.js.map
