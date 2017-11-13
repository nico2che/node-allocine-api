# node-allocine-api

Fork from https://github.com/leeroybrun/node-allocine-api

> Module Node.js permettant d'accéder à l'API d'Allociné.

Please, read original package documentation

## Breaking change

- No proxy support anymore
- Add dependencies ([node-fetch](https://github.com/bitinn/node-fetch))

## Usage updates

#### allocine.api(method, options)

Remove third callback parameter and use async/await

Examples from original doc:
```javascript

// Async wrapped funtcion!
(async() => {
	const results = await allocine.api('search', {q: 'spiderman', filter: 'movie'});
	if(results.error) {
		const { code, $: error } = results.error;
		console.log('Error #' + code + ' : ' + error);
		return;
	}
	console.log('Voici les données retournées par l\'API Allociné:');
	console.log(results);
})()

(async() => {
	const result = await allocine.api('movie', {code: '143067'});
	if(result.error) {
		const { code, $: error } = result.error;
		console.log('Error #' + code + ' : ' + error);
		return;
	}
	console.log('Voici les données retournées par l\'API Allociné:');
	console.log(result);
})()
```