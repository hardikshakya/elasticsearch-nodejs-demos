# Using the _analyze API
POST _analyze
{
  "tokenizer": "standard",
  "text": "I'm in the mood for drinking semi-dry red wine!"
}

POST _analyze
{
  "filter": [ "lowercase" ],
  "text": "I'm in the mood for drinking semi-dry red wine!"
}

POST _analyze
{
  "analyzer": "standard",
  "text": "I'm in the mood for drinking semi-dry red wine!"
}


# Configuring built-in analyzers
PUT /analyzers_test
{
  "settings": {
    "analysis": {
      "analyzer": {
        "english_stop": {
          "type": "standard",
          "stopwords": "_english_"
        }
      },
      "filter": {
        "my_stemmer": {
          "type": "stemmer",
          "name": "english"
        }
      }
    }
  }
}

POST /analyzers_test/_analyze
{
  "analyzer": "english_stop",
  "text": "I'm in the mood for drinking semi-dry red wine!"
}

POST /analyzers_test/_analyze
{
  "tokenizer": "standard",
  "filter": [ "my_stemmer" ],
  "text": "I'm in the mood for drinking semi-dry red wine!"
}


# Creating custom analyzers
DELETE /analyzers_test

PUT /analyzers_test
{
  "settings": {
    "analysis": {
      "filter": {
        "my_stemmer": {
          "type": "stemmer",
          "name": "english"
        }
      },
      "analyzer": {
        "english_stop": {
          "type": "standard",
          "stopwords": "_english_"
        },
        "my_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "char_filter": [
            "html_strip"
          ],
          "filter": [
            "lowercase",
            "trim",
            "my_stemmer"
          ]
        }
      }
    }
  }
}

POST /analyzers_test/_analyze
{
  "analyzer": "my_analyzer",
  "text": "I'm in the mood for drinking <strong>semi-dry</strong> red wine!"
}


# Using analyzers in mappings
PUT /analyzers_test/_doc/_mapping
{
  "properties": {
    "description": {
      "type": "text",
      "analyzer": "my_analyzer"
    },
    "teaser": {
      "type": "text",
      "analyzer": "standard"
    }
  }
}


# Adding analyzers to exiting indices
POST /analyzers_test/_close

PUT /analyzers_test/_settings
{
  "analysis": {
    "analyzer": {
      "french_stop": {
        "type": "standard",
        "stopwords": "_french_"
      }
    }
  }
}

POST /analyzers_test/_open