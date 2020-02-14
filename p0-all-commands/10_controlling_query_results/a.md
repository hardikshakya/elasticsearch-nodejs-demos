# Specifying the result format
GET /recipe/_search?format=yaml
{
    "query": {
      "match": { "title": "pasta" }
    }
}

GET /recipe/_search?pretty
{
    "query": {
      "match": { "title": "pasta" }
    }
}


# Source filtering
GET /recipe/_search
{
  "_source": "false", 
  "query": {
    "match": {
      "title": "pasta"
    }
  }
}

GET /recipe/_search
{
  "_source": "created", 
  "query": {
    "match": {
      "title": "pasta"
    }
  }
}

GET /recipe/_search
{
  "_source": "ingredients.name", 
  "query": {
    "match": {
      "title": "pasta"
    }
  }
}

GET /recipe/_search
{
  "_source": "ingredients.*", 
  "query": {
    "match": {
      "title": "pasta"
    }
  }
}

GET /recipe/_search
{
  "_source": [ "ingredients.*", "servings" ],
  "query": {
    "match": { "title": "pasta" }
  }
}

GET /recipe/_search
{
  "_source": {
    "includes": "ingredients.*",
    "excludes": "ingredients.name"
  },
  "query": {
    "match": { "title": "pasta" }
  }
}


# Specifying the result size
GET /recipe/_search
{
  "_source": false,
  "size": 2,
  "query": {
    "match": {
      "title": "pasta"
    }
  }
}


# Specifying an offset
GET /recipe/_search
{
  "_source": false,
  "size": 2,
  "from": 1,
  "query": {
    "match": {
      "title": "pasta"
    }
  }
}


# Sorting results
GET /recipe/_search
{
  "_source": false,
  "query": {
    "match_all": {}
  },
  "sort": [
    "preparation_time_minutes"
  ]
}

GET /recipe/_search
{
  "_source": "created",
  "query": {
    "match_all": {}
  },
  "sort": [
    { "created": "desc" }
  ]
}

GET /recipe/_search
{
  "_source": [ "preparation_time_minutes", "created" ],
  "query": {
    "match_all": {}
  },
  "sort": [
    { "preparation_time_minutes": "asc" },
    { "created": "desc" }
  ]
}


# Sorting by multi-value fields
GET /recipe/_search
{
  "_source": "ratings",
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "ratings": {
        "order": "desc",
        "mode": "avg"
      }
    }
  ]
}


# Filters
GET /recipe/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": "pasta"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 15
            }
          }
        }
      ]
    }
  }
}
