var text = require('./text.js');

function parse(source, context, cb){
    var regex = /@[a-z][a-z._\-]*/gim,
        replace = text.replace(context),
        parsed = source.replace(regex, replace);

    process.nextTick(function(){
        cb(null, parsed);
    });
}

module.exports = {
    parse: parse
};