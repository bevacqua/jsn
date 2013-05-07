'use strict';

var compiler = require('./compiler.js'),
	fs = require('fs');

module.exports = {
	parse: compiler.parse,
	parseFile: function(absolute, context, done){
		fs.readFile(absolute, function(err, data){
			if(err){
				return done(err);
			}
			compiler.parse(data.toString(), context, done);
		});
	}
};