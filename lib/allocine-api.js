/*
    ------------------------------------------------------------------
    Allocine API module for Node.js
    ------------------------------------------------------------------

    Author :        Leeroy Brun (leeroy.brun@gmail.com)
    Github repo :   https://github.com/leeroybrun/node-allocine-api
    
    Review from:    https://github.com/nico2che/node-allocine-api
    Version :       0.2
    Release date :  13.11.2017
*/


const crypto = require('crypto')
      , fetch = require('node-fetch');

class Allocine {

    constructor() {

        // Configuration
        this.config = {
            apiHostName:  'http://api.allocine.fr',
            apiBasePath:  '/rest/v3/',
            apiPartner:   'V2luZG93czg',
            apiSecretKey: 'e2b7fd293906435aa5dac4be670e7982',
            imgBaseUrl:   'http://images.allocine.fr',
            userAgent:    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; MSAppHost/1.0)'
        }

        // Presets for the API calls
        this.presets = {
            global: {
                partner: this.config.apiPartner,
                format: 'json'
            },
            movielist: { profile: 'large' },
            movie: { profile: 'large' },
            tvserieslist: { filter: 'top', order: 'viewcount' },
            tvseries: { profile: 'large' },
            tvseriesbroadcastlist: { profile: 'large' },
            season: { profile: 'large' },
            seasonlist: { profile: 'small' },
            news: { profile: 'large' },
            newslist: { profile: 'large' },
            media: { mediafmt: 'mp4' },
            feature: { profile: 'large' },
            featurelist: { profile: 'large' },
            picturelist: { profile: 'large' },
            videolist: { mediafmt: 'mp4' },
            search: { filter: 'movie,tvseries,theater,news,video' }
        }
    }

    // Extend an object with other objects
    extend (dst) {
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] !== dst) {
                for(let key in arguments[i]) {
                    dst[key] = arguments[i][key];
                };
            }
        };

        return dst;
    }

    // Build path for accessing Allocine API
    buildPath (route, params) {
        let path = this.config.apiBasePath + route;

        // Extend params with route presets
        params = this.extend({}, this.presets.global, this.presets[route], params);

        if(params) {
            const tokens = [];

            // Fill the tokens array and sort it
            for(let param in params) {
                tokens.push(param +'='+ encodeURIComponent(params[param]));
            }
            tokens.sort();

            path += '?'+ tokens.join('&');

            // Build and encode path
            const date = new Date();
            const sed = date.getFullYear() +''+ ('0'+ (date.getMonth()+1)).slice(-2) +''+ ('0'+ (date.getDate())).slice(-2);
            let sig = this.config.apiSecretKey + tokens.join('&') +'&sed='+ sed;

            // Hash "sig" parameter
            const shasum = crypto.createHash('sha1')
            sig = encodeURIComponent(shasum.update(sig, 'utf-8').digest('base64'));

            return path +'&sed='+ sed +'&sig='+ sig;
        }
        
        return path;
    }

    // Request the API with the given path
    async request (path) {
        const headers = {
            'User-Agent': this.config.userAgent
        }
        const url = this.config.apiHostName + path;
        return fetch(url, { headers }).then(res => res.json())
    }

    // Main method, used to call the API
    async api (method, options) {
        const path = this.buildPath(method, options);
        return await this.request(path);
    }
    
    /**
     * @deprecated
     */
    setProxy (proxyHostName, proxyPort) {
    	this.config.proxyHostName=proxyHostName;
    	this.config.proxyPort=proxyPort;
    }
}

module.exports = new Allocine;