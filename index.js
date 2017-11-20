const https    = require('https');
const notifier = require('node-notifier');
const settings = require('./settings.json');

// Get Balance to determine if you have at least $25
let options = {
	host: 'api.lendingclub.com',
	port: 443,
	path: '/api/investor/v1/accounts/' + settings.AccountID + '/availablecash',
	method: 'GET',
	headers: {
		Authorization: settings.Token
	}
};

let req = https.request(options, (res) => {
	res.setEncoding('utf8');
	let response = '';

	res.on('data', (chunk) => response += chunk);
	res.on('error', e => console.log('Error' + e));
	res.on('end', () => {
		response = JSON.parse(response);

		if (response.availableCash >= 25) {
			notifier.notify({
				title   : 'Lending Club',
				message : "It's time to reinvest!"
			});
		}
	});
});

req.end();
