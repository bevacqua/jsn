function parse(source, context, cb){
    var regex = /@[a-z][a-z._-]*/gim;

    var parsed = source.replace(regex, function(m, i){
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
    });

    cb(null, parsed);
}

module.exports = {
    parse: parse
};