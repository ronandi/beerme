//NOTE: Do not commit this with a key in it!
//If you choose to put your API key here, DO NOT commit the file to version
//control! Otherwise, put API key in BREWERY_API environment variable
var config = {};
config.breweryApiKey = process.env.BREWERY_API || 'your key here'
module.exports = config;
