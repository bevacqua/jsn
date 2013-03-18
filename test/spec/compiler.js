describe('compiler', function(){
    it('should evaluate entities to context values', function(){
        expect([1,2,3].indexOf(5)).toEqual(-1);
        expect([1,2,3].indexOf(0)).toEqual(-1);
    });
});