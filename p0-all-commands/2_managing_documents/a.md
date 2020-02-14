GET _search
{
  "query": {
    "match_all": {}
  }
}

GET /_cluster/health

GET /_cat/nodes?v

GET /_cat/indices?v

PUT /pages

GET /_cat/shards?v

DELETE /pages

# creating indices
PUT /products
{
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas": 2
  }
}


# indexing documents
POST /products/_doc
{
  "name": "Coffee Maker",
  "price": 64,
  "in_stock": 10
}

PUT /products/_doc/100
{
  "name": "Toaster",
  "price": 49,
  "in_stock": 4
}


# Retrieving documents by ID
GET /products/_doc/100


# Updating Documents
POST /products/_update/100
{
  "doc": {
    "in_stock": 3
  }
}

POST /products/_update/100
{
  "doc": {
    "tags": ["electronics"]
  }
}


# Scripting Update
POST /products/_update/100
{
  "script": {
    "source": "ctx._source.in_stock--"
  }
}

POST /products/_update/100
{
  "script": {
    "source": "ctx._source.in_stock = 10"
  }
}

POST /products/_update/100
{
  "script": {
    "source": "ctx._source.in_stock -= params.quantity",
    "params": {
      "quantity": 4
    }
  }
}


# Upserts
POST /products/_update/101
{
  "script": {
    "source": "ctx._source.in_stock++"
  },
  "upsert": {
    "name": "Blender",
    "price": 399,
    "in_stock": 5
  }
}

GET /products/_doc/101


# Replacing Documents
PUT /products/_doc/100
{
  "name": "Toaster",
  "price": 79,
  "in_stock": 4  
}


DELETE /products/_doc/101


POST /products/_update/100?if_primary_term=1&if_seq_no=9
{
  "doc": {
    "in_stock": 123
  }
}


# update_by_query
POST /products/_update_by_query
{
  "script": {
    "source": "ctx._source.in_stock--"
  },
  "query": {
    "match_all": {}
  }
}


# delete_by_query
POST /products/_delete_by_query
{
  "query": {
    "match_all": { }
  }
}


# Batch processing
POST /_bulk
{ "index": { "_index": "products", "_id": 200 } }
{ "name": "Espresso Machine", "price": 199, "in_stock": 5 }
{ "create": { "_index": "products", "_id": 201 } }
{ "name": "Milk Frother", "price": 149, "in_stock": 14 }


GET /products/_search
{
  "query": {
    "match_all": {}
  }
}

POST /_bulk
{ "update": { "_index": "products", "_id": 201 } }
{ "doc": { "price": 129 } }
{ "delete": { "_index": "products", "_id": 200 } }

POST /products/_bulk
{ "update": { "_id": 201 } }
{ "doc": { "price": 129 } }
{ "delete": { "_id": 200 } }