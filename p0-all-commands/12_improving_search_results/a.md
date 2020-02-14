# Proximity searches
PUT /proximity/_doc/1
{
  "title": "Spicy Sauce"
}
PUT /proximity/_doc/2
{
  "title": "Spicy Tomato Sauce"
}
PUT /proximity/_doc/3
{
  "title": "Spicy Tomato and Garlic Sauce"
}
PUT /proximity/_doc/4
{
  "title": "Tomato Sauce (spicy)"
}
PUT /proximity/_doc/5
{
  "title": "Spicy and very delicious Tomato Sauce"
}

GET /proximity/_search
{
  "query": {
    "match_phrase": {
      "title": {
        "query": "spicy sauce",
        "slop": 2
      }
    }
  }
}


# Affecting relevance scoring with proximity
GET /proximity/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": {
              "query": "spicy sauce"
            }
          }
        }
      ]
    }
  }
}

GET /proximity/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": {
              "query": "spicy sauce"
            }
          }
        }
      ],
      "should": [
        {
          "match_phrase": {
            "title": {
              "query": "spicy sauce"
            }
          }
        }
      ]
    }
  }
}

GET /proximity/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": {
              "query": "spicy sauce"
            }
          }
        }
      ],
      "should": [
        {
          "match_phrase": {
            "title": {
              "query": "spicy sauce",
              "slop": 5
            }
          }
        }
      ]
    }
  }
}


# Fuzzy match query
GET /products/_search
{
  "query": {
    "match": {
      "name": {
        "query": "l0bster",
        "fuzziness": "auto"
      }
    }
  }
}

GET /products/_search
{
  "query": {
    "match": {
      "name": {
        "query": "lobster",
        "fuzziness": "auto"
      }
    }
  }
}

GET /products/_search
{
  "query": {
    "match": {
      "name": {
        "query": "l0bster love",
        "operator": "and",
        "fuzziness": 1
      }
    }
  }
}

GET /products/_search
{
  "query": {
    "match": {
      "name": {
        "query": "lvie",
        "fuzziness": 1
      }
    }
  }
}

GET /products/_search
{
  "query": {
    "match": {
      "name": {
        "query": "lvie",
        "fuzziness": 1,
        "fuzzy_transpositions": false
      }
    }
  }
}


# fuzzy query
GET /products/_search
{
  "query": {
    "fuzzy": {
      "name": {
        "value": "LOBSTER",
        "fuzziness": "auto"
      }
    }
  }
}

GET /products/_search
{
  "query": {
    "fuzzy": {
      "name": {
        "value": "lobster",
        "fuzziness": "auto"
      }
    }
  }
}


# Adding synonyms
PUT /synonyms
{
  "settings": {
    "analysis": {
      "filter": {
        "synonym_test": {
          "type": "synonym", 
          "synonyms": [
            "awful => terrible",
            "awesome => great, super",
            "elasticsearch, logstash, kibana => elk",
            "weird, strange"
          ]
        }
      },
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "synonym_test"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "description": {
        "type": "text",
        "analyzer": "my_analyzer"
      }
    }
  }
}

POST /synonyms/_analyze
{
  "analyzer": "my_analyzer",
  "text": "awesome"
}
POST /synonyms/_analyze
{
  "analyzer": "my_analyzer",
  "text": "Elasticsearch"
}
POST /synonyms/_analyze
{
  "analyzer": "my_analyzer",
  "text": "weird"
}
POST /synonyms/_analyze
{
  "analyzer": "my_analyzer",
  "text": "Elasticsearch is awesome, but can also seem weird sometimes."
}

POST /synonyms/_doc
{
  "description": "Elasticsearch is awesome, but can also seem weird sometimes."
}

GET /synonyms/_search
{
  "query": {
    "match": {
      "description": "great"
    }
  }
}

GET /synonyms/_search
{
  "query": {
    "match": {
      "description": "awesome"
    }
  }
}

DELETE /synonyms


# Adding synonyms from file
PUT /synonyms
{
  "settings": {
    "analysis": {
      "filter": {
        "synonym_test": {
          "type": "synonym",
          "synonyms_path": "analysis/synonyms.txt"
        }
      },
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "synonym_test"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "description": {
        "type": "text",
        "analyzer": "my_analyzer"
      }
    }
  }
}

POST /synonyms/_analyze
{
  "analyzer": "my_analyzer",
  "text": "Elasticsearch"
}


# Highlighting matches in fields
PUT /highlighting/_doc/1
{
  "description": "Let me tell you a story about Elasticsearch. It's a full-text search engine that is built on Apache Lucene. It's really easy to use, but also packs lots of advanced features that you can use to tweak its searching capabilities. Lots of well-known and established companies use Elasticsearch, and so should you!"
}

GET /highlighting/_search
{
  "_source": false,
  "query": {
    "match": { "description": "Elasticsearch story" }
  },
  "highlight": {
    "fields": {
      "description" : {}
    }
  }
}

GET /highlighting/_search
{
  "_source": false,
  "query": {
    "match": { "description": "Elasticsearch story" }
  },
  "highlight": {
    "pre_tags": [ "<strong>" ],
    "post_tags": [ "</strong>" ],
    "fields": {
      "description" : {}
    }
  }
}


# Stemming
PUT /stemming_test
{
  "settings": {
    "analysis": {
      "filter": {
        "synonym_test": {
          "type": "synonym",
          "synonyms": [
            "firm => company",
            "love, enjoy"
          ]
        },
        "stemmer_test" : {
          "type" : "stemmer",
          "name" : "english"
        }
      },
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "synonym_test",
            "stemmer_test"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "description": {
        "type": "text",
        "analyzer": "my_analyzer"
      }
    }
  }
}

PUT /stemming_test/_doc/1
{
  "description": "I love working for my firm!"
}

GET /stemming_test/_search
{
  "query": {
    "match": {
      "description": "enjoy work"
    }
  }
}

GET /stemming_test/_search
{
  "query": {
    "match": {
      "description": "enjoy work"
    }
  },
  "highlight": {
    "fields": {
      "description": {}
    }
  }
}
