'use strict';

var express = require('express');
var app = express();
var config = require('./.config.json');
var exec = require('child_process').exec;

app.post('/', function (req, res) {
	console.log(req);
});

doesSystemHaveGit()
.then(() => {
	console.log('waiting for github on port ' + config.port || 9001);
	var server = app.listen(config.port || 9001);
}, () => {
	console.log('you don\'t have git installed');
	process.exit(1);
});
	
function pullNewCommitFromGithub(payload){
	return new Promise((resolve, reject) => {
		if (payload.repository.full_name === config.repository) {
			var command = [
				'cd ' + config.path,
				'git pull',
			].join(' && ');
			exec(command, function(error, stdout, stderr) {
				if(stdout.error > 0){
					reject();
				}else{
					resolve();
				}
			});
		}else{
			reject();
		}
	});
}

function doesSystemHaveGit() {
	return new Promise((resolve, reject) => {
		exec('which git', function(error, stdout, stderr) {
			if( stdout.length > 0){
				resolve();
			}else{
				reject();
			}
		});
	});
}
