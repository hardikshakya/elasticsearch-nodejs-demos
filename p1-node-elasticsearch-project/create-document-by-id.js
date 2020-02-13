const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'http://localhost:9200'
});

client.index({
    index: 'student',
    id: 1,  
    body: {
      name: 'C. Ronaldo',
      age: 35,
      hobby: 'football'
    }
  })
  .catch(err => console.error(err));