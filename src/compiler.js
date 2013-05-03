'use strict';

var text = require('./text.js'),
    regex = /@@|@[a-z0-9._\-]*/gim;

function parse(source, context, cb){
    if(typeof source !== 'string'){
        throw new Error('source must be defined');
    }
    if(context === undefined){
        throw new Error('context can\'t be undefined');
    }
    if(typeof cb !== 'function'){
        throw new Error('you must provide a callback');
    }

    var replace = text.replace(context),
        parsed = source.replace(regex, replace);

    process.nextTick(function(){
        cb(null, parsed);
    });
}

module.exports = {
    parse: parse
};