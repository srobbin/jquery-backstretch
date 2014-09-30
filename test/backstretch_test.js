/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

    /*
     ======== A Handy Little QUnit Reference ========
     http://docs.jquery.com/QUnit
     
     Test methods:
     expect(numAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     raises(block, [expected], [message])
     */

    var global = {
        elems: $('#qunit-fixture').children(),
        img1: 'image1.jpg',
        img2: 'image2.jpg',
        imgs: ['image1.jpg', 'image2.jpg'],
        destroy: function() {
            try {
                $(':backstretch').data('backstretch').destroy();
            } catch (err) { /* Do nothing */
            }
        }
    };

    /* Backstretch tests
     * ========================= */
    module('Backstretch', {
        teardown: global.destroy
    });

    test('instantiation', function() {
        strictEqual(global.elems.backstretch(global.img1), global.elems, 'chaninable when executed on elements');
        strictEqual($.backstretch(global.img1).constructor, Object, 'returns Backstretch object');
    });

    test('images', function() {
        raises(function() {
            $.backstretch();
        }, 'raise an error when no image is supplied');
        raises(function() {
            $.backstretch([]);
        }, 'raise an error when an empty image array is supplied');
    });

    test('options', function() {
        // Make sure previous instances are destroyed
        global.destroy();

        var duration = 999999;
        var start = 1;
        var lazyload = false;
        var paused = true;
        var instance = $.backstretch(global.imgs, {
            duration: duration,
            lazyload: lazyload,
            start: start,
            paused: paused,
        });

        // Test to make sure the options are being set
        strictEqual(instance.options.duration, duration, 'passed option duration is being set');
        strictEqual(instance.options.lazyload, lazyload, 'passed option lazyload is being set');
        strictEqual(instance.options.start, start, 'passed option start is being set');
        strictEqual(instance.options.paused, paused, 'passed option paused is being set');
    });

    test('optionValidation', function() {
        var instance = $.backstretch(global.imgs, {
            start: 100
        });
        strictEqual(instance.options.start, global.imgs.length - 1, 'start-option is validated correctly');
        var instance = $.backstretch(global.imgs, {
            start: -12
        });
        strictEqual(instance.options.start, 0, 'start-option is validated correctly');
    });

}(jQuery));
