const allocine = require('../lib/allocine-api');

(async () => {
	const results = await allocine.api('search', {q: 'spiderman', filter: 'movie'});
	if (results.error) return console.log('Error #' + results.error.code + ' : ' + results.error.$)
	console.log('Success !');
	console.log(results);
})()
