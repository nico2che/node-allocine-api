const allocine = require('../lib/allocine-api');

(async () => {
	const result = await allocine.api('movie', {code: '143067'});
	if (result.error) return console.log('Error #' + result.error.code + ' : ' + result.error.$)
	console.log('Success !');
	console.log(result.movie.title);
})()