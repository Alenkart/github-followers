'use strict';

const request = require('request');
const cheerio = require('cheerio');

function requestTab(user, tab) {

	const api = `https://github.com/${user}`;

	return new Promise((res, rej) => {

		request(`${api}?tab=${tab}`, (err, request, body) => {

			if(err) {
				rej(err);
			} else {
				res(body);
			}
			
		});

	});

}

function scrapTable(selector, body) {

	const $ = cheerio.load(body);

	return $(selector).map(function() {
		return $(this).text();
	}).get();
}

module.exports = { requestTab, scrapTable }