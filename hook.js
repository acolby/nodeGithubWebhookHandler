// import the setup file
var setup = {
	'github':{
		'repo': 'acolby/platosPlate',
		'branch': 'master',
		'remote': 'origin'
	},
	'listingPort': 9001,
	'appLocation': '../platosPlate'
};

var gith = require('gith').create(setup.listingPort);
var shell = require('shelljs');

shell.echo('Sorry, this script requires git');

/*
if (!shell.which('git')) {
	shell.echo('Sorry, this script requires git');
	shell.exit(1);
} else {
	gith({
		repo: setup.github.repo
	}).on('all', function(payload) {
		if (payload.branch === setup.github.branch) {
			shell.cd('..');
			shell.cd(setup.github.repo);

			shell.git('fetch ' + setup.github.remote + ' ' + setup.github.branch);

			shell.git('checkout')
		}
	});
}
*/