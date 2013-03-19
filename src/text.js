'use strict';

function walk(location,property){
    if(!property.length){
        throw new Error('unexpected length zero for property name');
    }

    if(!location){ // can't walk any further
        throw new Error('undefined property: ' + property);
    }

    return location[property];
}

module.exports = {
    replace: function(context){
        return function(m, i){
            if(m.indexOf('@@') === 0){
                return m.substr(1);
            }

            var path = m.substr(1).split('.'),
                local = context;

            path.forEach(function(property){
                local = walk(local, property);
            });
            return local;
        };
    }
};