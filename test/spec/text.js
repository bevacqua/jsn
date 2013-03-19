'use strict';

var text = require('../../src/text.js');

describe('text', function(){
    describe('replace#beforeAll', function(){
        it('should be any function, and return any function', function(){
            expect(text.replace).toBeDefined();
            expect(text.replace).toEqual(jasmine.any(Function));

            expect(function(){
                text.replace();
            }).toThrow();

            expect(function(){
                text.replace({});
            }).not.toThrow();

            expect(text.replace({})).toEqual(jasmine.any(Function));
        });
    });

    describe('replace#unit', function(){
        var context, replace, replaceWrapper;

        beforeEach(function(){
            context = {
                plain: 'plain',
                foo: {
                    bar: 'baz',
                    undef: undefined
                }
            };

            replace = function(expression){
                var replaceFunction = text.replace(context);
                return replaceFunction(expression);
            };

            replaceWrapper = function(expression){
                return function(){
                    replace(expression);
                };
            };
        });

        describe('exceptions', function(){
            it('should throw on non-object context', function(){
                var such = function(context){
                    return function(){
                        text.replace(context);
                    };
                };

                expect(such(null)).toThrow();
                expect(such(0)).toThrow();
                expect(such(1)).toThrow();
                expect(such('1')).toThrow();
                expect(such('')).toThrow();
                expect(such(function(){})).toThrow();
            });

            it('should throw on undeclared property', function(){
                expect(replaceWrapper('@foo.tar')).toThrow();
            });

            it('should not throw on undefined property', function(){
                expect(replaceWrapper('@foo.undef')).not.toThrow();
            });

            it('should throw on malformed expression', function(){
                expect(replaceWrapper('@foo..tar')).toThrow();
                expect(replaceWrapper('@foo.tar.')).toThrow();
            });
        });

        describe('text replacement', function(){
            it('should replace entity with context', function(){
                expect(replace('@plain')).toEqual(context.plain);
            });

            it('should walk a context path', function(){
                expect(replace('@foo.bar')).toEqual(context.foo.bar);
            });
        });

        describe('text escaping', function(){
            it('should unescape @@ expressions', function(){
                expect(replace('@@')).toEqual('@');
                expect(replace('@@foo')).toEqual('@foo');
            });
        });
    });
});
