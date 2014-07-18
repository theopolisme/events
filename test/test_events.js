/**
 * test_events.js
 * =========
 */
( function ( Events ) {

    function checkNormal () {
        var events = Events();
        console.assert( typeof events !== 'undefined', 'calling Events() gives us a new Events thingamajig' );

        function testOn () {
            var tested;

            events.on( 'cupcake', function () {
                tested = true;
            } );

            events.fire( 'cupcake' );

            console.assert( tested === true, 'event handler is called when event is fired' );
        }
        testOn();

        function testOnMultiple () {
            var count = 0;

            events.on( 'cookies', function () {
                count++;
            } );

            events.fire( 'cookies' );
            events.fire( 'cookies' );

            console.assert( count === 2, 'event handler is called when event is fired' );
        }
        testOnMultiple();

        function testOne () {
            var count = 0;

            events.one( 'chocolate', function () {
                count++;
            } );

            events.fire( 'chocolate' );
            events.fire( 'chocolate' );

            console.assert( count === 1, '.one() handler is called only once' );
        }
        testOne();

        function testOffAll () {
            var count = 0,
                count_b = 0;

            events.on( 'fudge', function () {
                count++;
            } );
            events.on( 'fudge', function () {
                count_b++;
            } );


            events.fire( 'fudge' );

            events.off( 'fudge' );

            events.fire( 'fudge' );

            console.assert( count === 1 && count_b === 1,
                '.off() stops all handlers from being called again' );
        }
        testOffAll();

        function testOffSpecific () {
            var count = 0,
                count_b = 0,

                increment = function () {
                    count++;
                },

                increment_b = function () {
                    count_b++;
                };

            events.on( 'raspberry', increment );
            events.on( 'raspberry', increment_b );

            events.fire( 'raspberry' );

            events.off( 'raspberry', increment );

            events.fire( 'raspberry' );

            console.assert( count === 1 && count_b === 2,
                '.off() stops a specific handler from being called again without affecting others' );
        }
        testOffSpecific();

        function testArgs () {
            var result;

            events.on( 'popsicle', function ( value_1, value_2 ) {
                result = value_1 + value_2;
            } );

            events.fire( 'popsicle', 1, 2 );

            console.assert( result === 3, 'event handler receives data from the fired event' );
        }
        testArgs();

    }

    function checkStrict () {
        var events = Events( [ 'alpha', 'beta' ] );

        function testBadEvent () {
            var stopped;

            try {
                events.on( 'theta', function () {
                    alert( 'your test just failed.' );
                } );
            } catch ( _ ) {
                stopped = true;
            }

            console.assert( stopped === true, 'in strict mode, an error is thrown on an unknown event name' );
        }
        testBadEvent();

        function testGoodEvent () {
            var success;

            try {
                events.fire( 'alpha' );
                success = true;
            } catch ( _ ) {
                // fall through
            }

            console.assert( success === true, 'in strict mode, a known event name is allowed' );
        }
        testGoodEvent();
    }

    // Let's do this
    console.log( 'Running tests...' );
    checkNormal();
    checkStrict();
    console.log( 'All tests completed!' );

}( window.Events ) );
