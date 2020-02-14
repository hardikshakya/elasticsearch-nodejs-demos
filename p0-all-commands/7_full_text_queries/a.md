# Introduction to full text queries
GET /recipe/_mapping


# Flexible matching with match query
GET /recipe/_search
{
  "query": {
    "match": {
      "title": "Recipes with pasta or spaghetti"
    }
  }
}

GET /recipe/_search
{
  "query": {
    "match": {
      "title": {
        "query": "pasta or spaghetti",
        "operator": "and"
      }
    }
  }
}


# Matching phrases
GET /recipe/_search
{
  "query": {
    "match_phrase": {
      "title": "spaghetti puttanesca"
    }
  }
}


# Searching multiple fields
GET /recipe/_search
{
  "query": {
    "multi_match": {
      "query": "pasta",
      "fields": [ "title", "description" ]
    }
  }
}