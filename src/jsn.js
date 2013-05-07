'use strict';

var compiler = require('./compiler.js'),
	fs = require('fs');

module.exports = {
	parse: compiler.parse,
	parseFile: function(absolute, context, done){
		fs.readFile(absolute, function(err, data){
			if(err){
				return cb(err);
			}
			compiler.parse(data, context, done);
		});
	}
};