#!/usr/bin/env node
'use strict';

function list(val) {
	return val.split('|');
}

const program = require('commander');
program
	.version('1.0.0')
	.option('-u, --users <names>', 'List of users to operate on - separate by |', list )
	.option('-g, --groups <groupnames>', 'Groups to remove the users from', list)
	.option('-r, --reason [reason]', 'Reason for this change')
	.parse(process.argv);

let usernames = program.users || '';
let groupnames = program.groups || '';

if( !usernames.length || !groupnames.length ) {
	console.log( 'Both --users and --groups are required' );
	process.exit( 1 )
}

const bot = require( 'nodemw' ),
	client = new bot('config.json');

function removeUserFromGroups( username, groups, token ) {
	let params = {
		action: 'userrights',
		user: username,
		remove: groups,
		token: token
	};

	client.api.call(
		params,
		function(err, info, next, data) {
			if( err ) {
				console.log( err );
			}
			client.log( info );
		}
		, 'POST'
	);

}


groupnames = groupnames.join('|');

client.logIn( function() {
	client.getToken('', 'userrights', function(err, token) {
		if (err) {
			client.log(err);
			process.exit( 1 )
		}

		usernames.forEach( function( username ) {
			removeUserFromGroups( username, groupnames, token );
		} );

	});
} );

