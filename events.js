/**
 * events.js
 * =========
 *
 * Copyright (c) 2014 Theopolisme <theopolismewiki@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global define,exports,module */

( function ( root, factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define( [], factory );
    } else if ( typeof exports === 'object' ) {
        module.exports = factory();
    } else {
        root.Events = factory();
    }
}( this, function () {

    /**
     * The main Events object.
     * @param {array} [eventNames] Optional -- if specified, a list of event names. Attempts
     *                             to use any event in on/off/fire not in this list will result
     *                             in an error being thrown.
     */
    function Events ( eventNames ) {
        var i, handlers = {},
            STRICT_EVENTS = typeof eventNames !== 'undefined';

        // Set up handler-holder-thing if applicable
        if ( STRICT_EVENTS ) {
            for ( i = 0; i < eventNames.length; i++ ) {
                handlers[ eventNames[i] ] = [];
            }
        }

        /**
         * If an event hasn't been used before, add it. If STRICT_EVENTS,
         * throw an error if a not-previously-defined event is used.
         * @param {string} eventName
         */
        function addEvent ( eventName ) {
            if ( !handlers.hasOwnProperty( eventName ) ) {
                if ( STRICT_EVENTS ) {
                    throw 'Events: The event "' + eventName + '" is not defined.';
                } else {
                    handlers[eventName] = [];
                }
            }
        }

        return {
            /**
             * Adds an event handler.
             * @param {string} eventName
             * @param {function} handler function to call
             */
            on: function ( eventName, handler ) {
                addEvent( eventName );
                handlers[eventName].push( handler );
            },

            /**
             * Adds a one-time-only event handler.
             * @param {string} eventName
             * @param {function} handler function to call
             */
            one: function ( eventName, handler ) {
                addEvent( eventName );
                handlers[eventName].push( function () {
                    // Call the handler...
                    handler.apply( null, arguments );
                    // ...and splice ourselves outta here!
                    handlers[eventName].splice( handlers[eventName].indexOf( this ), 1 );
                } );
            },

            /**
             * Removes an event handler(s).
             * @param {string} eventName
             * @param {function} handler (optional) If specified, only this specific function is
             *                           removed. If not specified, all handlers for
             *                           eventName will be removed.
             */
            off: function ( eventName, handler ) {
                var index;

                addEvent( eventName );

                // If a handler was provided, remove only that handler
                if ( handler ) {
                    index = handlers[eventName].indexOf( handler );
                    if ( index !== -1 ) {
                        handlers[eventName].splice( index, 1 );
                    }

                // Otherwise, remove all handlers for this event
                } else {
                    handlers[eventName] = [];
                }
            },

            /**
             * Fires an event, calling all handlers for it.
             *
             * @param {string} eventName
             * @param {...mixed} (optional) argument(s) to pass to handlers
             */
            fire: function ( eventName ) {
                var i, eventHandlers;

                addEvent( eventName );

                eventHandlers = handlers[eventName];
                for ( i = 0; i < eventHandlers.length; i++ ) {
                    eventHandlers[i].apply( null, Array.prototype.slice.call( arguments, 1 ) );
                }
            }
        };
    }

    return function () {
        // In order to allow passing of arguments to the constructor
        return Events.apply( Object.create( Events.prototype ), arguments);
    };
} ) );
