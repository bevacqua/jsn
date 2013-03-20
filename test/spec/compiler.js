'use strict';

var proxyquire = require('proxyquire').noCallThru(),
    text = require('../../src/text.js'), // the real dependency
    stub,
    stubReplace = function(context){
        return stub ? stub(context) : text.replace(context);
    },
    compiler = proxyquire('../../src/compiler.js', {
        './text.js': {
            replace: stubReplace
        }
    });

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
            });

            it('should throw on undefined arguments', function(){
                expect(wrapped()).toThrow();
                expect(wrapped('')).toThrow();
                expect(wrapped('',{})).toThrow();
            });

            it('should not throw with valid arguments', function(done){
                stub = jasmine.createSpy('stub').andReturn(function(){});
                expect(wrapped('',{},done)).not.toThrow();
                expect(stub).toHaveBeenCalled();
                stub = undefined;
            });
        });

        describe('input/output integration test cases', function(){
            var cases = [],
                context = {
                    plain: 'plain',
                    foo: { bar: 'baz', nil: null, num: 12 },
                    color: 'red',
                    how: { awesome: 'very' }
                };

            function include(input,output){ cases.push({ input: input, output: output }); }

            include('an@foo.nil','annull');
            include('Roses are @color!','Roses are red!');
            include('var thatMuch = "@how.awesome";', 'var thatMuch = "very";');
            include('var @foo.bar = @foo.num;', 'var baz = 12;');

            cases.forEach(function(testCase,i){
                it('should return expected output for integration case #' + (i+1), function(done){
                    compiler.parse(testCase.input, Object.create(context), function(err,result){
                        expect(err).toBeNull();
                        expect(result).toEqual(testCase.output);
                        done();
                    });
                });
            });
        });
    });
});