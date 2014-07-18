events.js
=========

*Stupidly simple events.*

I found myself writing this code over and over again, so figured I'd zip it up in a library and save myself the trouble of doing it again.  Just about 430 bytes gzipped (don't worry, there aren't any dependencies either), `events.js` implements a -- stupidly simple, and appropriately tiny -- event interface.

How simple? This simple.

```js
var events = Events();

events.on( 'cupcake', function () {
	alert( 'yum!' );
} );

events.fire( 'cupcake' );

// yum!
```

Just four simple methods:

* `on()`
* `one()`
* `off()`
* `fire()`

They do... what you would expect them to do.

## API documentation
### Events.prototype.on( eventName, handler )

Parameters:

 - **eventName** {string}
 - **handler** {function}

Attaches a handler a given event. When the event is fired, (surprise suprise) the handler will be called.

```js
events.on( 'cookie', function ( cookie ) {
	eat( cookie );
} );

events.on( 'full', function () {
	stopEating();
} );
```

### Events.prototype.one( eventName, handler )

Parameters:

 - **eventName** {string}
 - **handler** {function}

Like `.on()`, but with a twist &ndash; the handler is only called once. If `eventName` is fired subseqent times, the handler won't be called again.

```js
events.one( 'bloated', function () {
	die();
} );
```

### Events.prototype.off( eventName[, handler] )

Parameters:

 - **eventName** {string}
 - **handler** {function} (optional)

This function is used to remove event handler(s). If you would like to remove all event handlers attached to a particular event, use:

```js
events.off( 'cookie' );
```

If you only want to remove one specific handler:

```js
var handler = function () { alert( 'yay!' ) };
events.on( 'cookie', handler );

[...]

events.off( 'cookie', handler );
```

### Events.prototype.fire( eventName[, arguments] )

Parameters:

 - **eventName** {string}
 - **arguments** {...mixed} (optional)

Trying to fire an event? You're in luck! In its simplest form:

```js
events.fire( 'cheese' );
```

This calls all handlers previously attached to the `cheese` event using `.on()` (and `.one()`) with no arguments. If you want to pass arguments...

```js
events.on( 'cookie', function ( cookie ) {
	eat( cookie );
} );

[...]

var cookie = new Cookie();
events.fire( 'cookie', cookie );
```

You can pass an unlimited number of arguments &ndash; that's right, knock yourself out!

## Bonus feature
You can restrict the names of events available by passing in an array when initializing:

```js
var limitedEvents = Events( [ 'joy', 'celebration' ] );

limitedEvents.on( 'death', function () {
	alert( ':(' );
} );
// Error: The event "death" is not defined
```

If you later attempt to fire or add a handler to an event that wasn't in the initial array, an error will be thrown.
