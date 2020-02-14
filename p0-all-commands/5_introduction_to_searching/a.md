# Searching with the request URI
GET /products/_search?q=*

GET /products/_search?q=name:Lobster

GET /products/_search?q=tags:Meat

GET /products/_search?q=tags:Meat AND name:Tuna


# Introducing the Query DSL
GET /products/_search
{
  "query": {
    "match_all": {}
  }
}


# Understanding relevance scores
GET /products/_search
{
  "explain": true,
  "query": {
    "term": {
      "name":  "lobster"
    }
  }
}


# Debugging unexpected search results
GET /products/_doc/1/_explain
{
  "query": {
    "term": {
      "name":  "lobster"
    }
  }
}


# Full text queries vs term level queries
GET /products/_search
{
  "query": {
    "term": {
      "name": "lobster"
    }
  }
}

GET /products/_search
{
  "query": {
    "term": {
      "name": "Lobster"
    }
  }
}

GET /products/_search
{
  "query": {
    "match": {
      "name": "Lobster"
    }
  }
}