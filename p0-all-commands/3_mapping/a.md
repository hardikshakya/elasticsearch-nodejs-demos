# Dynamic Mapping
GET /products/_mapping


# Adding mappings to existing indices
PUT /products/_mapping
{
  "properties": {
    "discount": {
      "type": "double"
    }
  }
}


# Changing existing mappings
DELETE /products

PUT /product
{
  "mappings": {
    "dynamic": false,
    "properties": {
      "in_stock": {
        "type": "integer"
      },
      "is_active": {
        "type": "boolean"
      },
      "price": {
        "type": "integer"
      },
      "sold": {
        "type": "long"
      }
    }
  }
}


# Adding multi-fields mappings
PUT /product/_mapping
{
  "properties": {
    "description": {
      "type": "text"
    },
    "name": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "tags": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    }
  }
}

GET /product/_mapping


# Defining custom date formats
PUT /product/_mapping
{
  "properties": {
    "created": {
      "type": "date",
      "format": "yyyy/MM/dd HH:mm:ss||yyyy/MM/dd"
    }
  }
}


# Picking Up new fields without dynamic mapping
PUT /product/_doc/2000
{
  "description": "Test",
  "discount": 20
}

PUT /product/_mapping
{
  "properties": {
    "discount": {
      "type": "integer"
    }
  }
}

GET /product/_search
{
  "query": {
    "match": {
      "description": "Test"
    }
  }
}

GET /product/_search
{
  "query": {
    "term": {
      "discount": 20
    }
  }
}

POST /product/_update_by_query?conflicts=proceed

DELETE /product/_doc/2000
