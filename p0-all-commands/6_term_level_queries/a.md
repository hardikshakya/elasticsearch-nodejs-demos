# Searching for a term
GET /products/_search
{
  "query": {
    "term": {
      "is_active": true
    }
  }
}


# Searching for multiple terms
GET /products/_search
{
  "query": {
    "terms": {
      "tags.keyword": [ "Soup", "Cake" ]
    }
  }
}


# Retrieving documents based on IDs
GET /products/_search
{
  "query": {
    "ids": {
      "values": [1, 2, 3]
    }
  }
}


# Matching documents with range values
GET /products/_search
{
  "query": {
    "range": {
      "in_stock": {
        "gte": 1,
        "lte": 5
      }
    }
  }
}

GET /products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "2010/01/01",
        "lte": "2010/12/31"
      }
    }
  }
}

GET /products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "01-01-2010",
        "lte": "31-12-2010",
        "format": "dd-MM-yyyy"
      }
    }
  }
}


# Working with relative dates
GET /products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "2010/01/01||-1y"
      }
    }
  }
}

GET /product/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "2010/01/01||-1y-1d"
      }
    }
  }
}

GET /product/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "2010/01/01||-1y/M"
      }
    }
  }
}

GET /product/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "2010/01/01||/M-1y"
      }
    }
  }
}

GET /product/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "now/M-1y"
      }
    }
  }
}

GET /product/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "now"
      }
    }
  }
}


# Matching documents with non-null values
GET /products/_search
{
  "query": {
    "exists": {
      "field": "tags"
    }
  }
}


# Matching based on prefixes
GET /products/_search
{
  "query": {
    "prefix": {
      "tags.keyword": {
        "value": "Veg"
      }
    }
  }
}


# Searching with wildcards
GET /products/_search
{
  "query": {
    "wildcard": {
      "tags.keyword": {
        "value": "Veg*e"
      }
    }
  }
}

GET /products/_search
{
  "query": {
    "wildcard": {
      "tags.keyword": {
        "value": "Veg?e"
      }
    }
  }
}


# Searching with regular expressions
GET /products/_search
{
  "query": {
    "regexp": {
      "tags.keyword": "Veg[a-zA-Z]+ble"
    }
  }
}