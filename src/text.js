module.exports = {
    replace: function(context){
        return function(m, i){
            if(m.indexOf('@@') === 0){
                return m.substr(1);
            }

            var path = m.substr(1).split('.'),
                local = context;

            path.forEach(function(property){
                if(property.length === 0){
                    throw new Error('unexpected length zero for property name');
                }
                local = local[property];

                if(local === undefined){
                    throw new Error('undefined property: ' + property);
                }
            });
            return local;
        };
    }
};