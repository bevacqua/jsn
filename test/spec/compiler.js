'use strict';

var compiler = require('../../src/compiler.js'),
    text = require('../../src/text.js');

describe('compiler', function(){
    describe('parse#beforeAll', function(){
        it('should be any function', function(){
            expect(compiler.parse).toBeDefined();
            expect(compiler.parse).toEqual(jasmine.any(Function));
        });
    });

    describe('parse#unit', function(){
        describe('type checks and general validity', function(){
            var wrapped;

            beforeEach(function(){
                wrapped = function(){
                    var args = arguments;
                    return function(){
                        compiler.parse.apply(compiler.parse, args);
                    };
                };

                spyOn(text, 'replace');
            });

            it('should throw on undefined arguments', function(){
                expect(wrapped()).toThrow();
                expect(wrapped('')).toThrow();
                expect(wrapped('',{})).toThrow();
            });

            it('should not throw with valid arguments', function(done){
                expect(wrapped('',{},done)).not.toThrow();
            });
        });

        describe('input/output test cases', function(){
            var cases = [],
                context = {
                    plain: 'plain',
                    foo: {
                        bar: 'baz',
                        undef: undefined,
                        nil: null,
                        num: 12
                    },
                    color: 'red',
                    how: {
                        awesome: 'very'
                    }
                };

            function include(input,output){
                cases.push({
                    input: input,
                    output: output,
                    context: Object.create(context)
                });
            }

            include('@plain','plain');
            include('@foo.bar','baz');
            include('@foo.undef','undefined');
            include('@foo.nil','null');
            include('an@foo.nil','annull');
            include('@foo.num','12');
            include('@@foo.bar','@foo.bar');
            include('Roses are @color!','Roses are red!');
            include('var thatMuch = "@how.awesome";', 'var thatMuch = "very";');

            cases.forEach(function(testCase,i){
                it('should return expected output for case #' + (i+1), function(done){
                    compiler.parse(testCase.input, testCase.context, function(err,result){
                        expect(err).toBeNull();
                        expect(result).toEqual(testCase.output);
                        done();
                    });
                });
            });
        });
    });
});