const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'http://localhost:9200'
});

client.ping()
  .then(res => console.log('connection success', res))
  .catch(err => console.error('wrong connection', err));