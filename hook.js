// import the setup file
var setup = {
	'github': {
		'repo': 'owner/reponame', // locaion of the repo on github
		'branch': 'master',
		'remote': 'origin'
	},
	'listingPort': 9001,
	'appLocation': '../platosPlate'
};

var gith = require('gith').create(setup.listingPort);
var Q = require('q');
var exec = require('child_process').exec;

doesSystemHaveGit().then(
	//yes
	function(sucObj){
		gith({
			repo: setup.github.repo
		}).on('all', function(payload) {
			pullNewCommitFromGithub(payload).then(
				//success
				function(sucObj){
					console.log('success updating repot');
				},
				//error
				function(errObj){
					console.log('oops there was an error');
				}
			);
		});
		console.log('here');
	}, 
	//no
	function(errObj){
		console.log('you don\'t have git installed');
		process.exit(1);
	}
);

function doesSystemHaveGit() {
	var defer = Q.defer();
	exec('which git', function(error, stdout, stderr) {
		if( stdout.length > 0){
			defer.resolve();
		}else{
			defer.reject();
		}
	});
	return defer.promise;
}

function pullNewCommitFromGithub(payload){
	var defer = Q.defer();
	if (payload.branch === setup.github.branch) {
		var command = [
			'cd ' + setup.path,
			'git fetch ' + setup.github.remote + ' ' + setup.github.branch,
			'git checkout ' + setup.github.branch,
			'git reset --hard ' + setup.github.remote + '/' + setup.github.branch
		].join(' && ');
		exec(command, function(error, stdout, stderr) {
			if(stdout.error > 0){
				defer.reject();
			}else{
				defer.resolve();
			}
		});
	}else{
		defer.reject();
	}
	return defer.promise;
}