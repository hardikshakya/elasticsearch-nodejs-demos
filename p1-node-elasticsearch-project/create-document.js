const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'http://localhost:9200'
});

client.index({
    index: 'student',
    type: '_doc',
    body: {
      name: 'Hardik Shakya',
      age: 22,
      hobby: 'football'
    }
  })
  .catch(err => console.error(err));