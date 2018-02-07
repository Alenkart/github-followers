'use strict';

const cTable = require('console.table');
const { requestTab, scrapTable } = require('./lib/scrapper');

let user = process.argv[2] || 'Alenkart';

Promise.all([ 
	requestTab(user, 'following'),
	requestTab(user, 'followers')
]).then(values => {

	const following = scrapTable('.d-table .pl-1', values[0]);
	const followers = scrapTable('.d-table .pl-1', values[1]);		

	let users = following.filter(v => !followers.includes(v));

	users = users.map((username, i) => { 
		return { 
			'#' : i,
			username, 
			profile: `https://github.com/${username}` 
		}
	});

	console.table(users);

}).catch( err => console.log(err) );;
