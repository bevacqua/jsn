'use strict';

var text = require('../../src/text.js');

describe('text', function(){
    var context, replace;

    beforeEach(function(){
        context = {
            plain: 'plain',
            foo: {
                bar: 'baz'
            }
        };

        replace = function(expression){
            var replaceFunction = text.replace(context);
            return replaceFunction(expression);
        };
    });

    describe('undefined', function(){
        it('should throw', function(){
            var expression = '@@';

            expect(replace(expression)).toEqual('@');
        });
    });

    describe('text replacement', function(){
        it('should replace entity with context', function(){
            var expression = '@plain';

            expect(replace(expression)).toEqual(context.plain);
        });

        it('should walk a context path', function(){
            var expression = '@foo.bar';

            expect(replace(expression)).toEqual(context.foo.bar);
        });
    });

    describe('text escaping', function(){
        it('should unescape @@', function(){
            var expression = '@@';

            expect(replace(expression)).toEqual('@');
        });

        it('should unescape @@foo', function(){
            var expression = '@@foo';

            expect(replace(expression)).toEqual('@foo');
        });
    });
});
