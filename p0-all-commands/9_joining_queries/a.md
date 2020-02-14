# Querying nested objects
PUT /department
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text"
      },
      "employees": {
        "type": "nested"
      }
    }
  }
}

PUT /department/_doc/1
{
  "name": "Development",
  "employees": [
    {
      "name": "Eric Green",
      "age": 39,
      "gender": "M",
      "position": "Big Data Specialist"
    },
    {
      "name": "James Taylor",
      "age": 27,
      "gender": "M",
      "position": "Software Developer"
    },
    {
      "name": "Gary Jenkins",
      "age": 21,
      "gender": "M",
      "position": "Intern"
    },
    {
      "name": "Julie Powell",
      "age": 26,
      "gender": "F",
      "position": "Intern"
    },
    {
      "name": "Benjamin Smith",
      "age": 46,
      "gender": "M",
      "position": "Senior Software Engineer"
    }
  ]
}

PUT /department/_doc/2
{
  "name": "HR & Marketing",
  "employees": [
    {
      "name": "Patricia Lewis",
      "age": 42,
      "gender": "F",
      "position": "Senior Marketing Manager"
    },
    {
      "name": "Maria Anderson",
      "age": 56,
      "gender": "F",
      "position": "Head of HR"
    },
    {
      "name": "Margaret Harris",
      "age": 19,
      "gender": "F",
      "position": "Intern"
    },
    {
      "name": "Ryan Nelson",
      "age": 31,
      "gender": "M",
      "position": "Marketing Manager"
    },
    {
      "name": "Kathy Williams",
      "age": 49,
      "gender": "F",
      "position": "Senior Marketing Manager"
    },
    {
      "name": "Jacqueline Hill",
      "age": 28,
      "gender": "F",
      "position": "Junior Marketing Manager"
    },
    {
      "name": "Donald Morris",
      "age": 39,
      "gender": "M",
      "position": "SEO Specialist"
    },
    {
      "name": "Evelyn Henderson",
      "age": 24,
      "gender": "F",
      "position": "Intern"
    },
    {
      "name": "Earl Moore",
      "age": 21,
      "gender": "M",
      "position": "Junior SEO Specialist"
    },
    {
      "name": "Phillip Sanchez",
      "age": 35,
      "gender": "M",
      "position": "SEM Specialist"
    }
  ]
}

GET /department/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "employees.position": "Intern"
          }
        },
        {
          "term": {
            "employees.gender.keyword": {
              "value": "F"
            }
          }
        }
      ]
    }
  }
}

GET /department/_search
{
  "query": {
    "nested": {
      "path": "employees",
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "employees.position": "Intern"
              }
            },
            {
              "term": {
                "employees.gender.keyword": {
                  "value": "F"
                }
              }
            }
          ]
        }
      }
    }
  }
}


# Nested inner hits
GET /department/_search
{
  "_source": false,
  "query": {
    "nested": {
      "path": "employees",
      "inner_hits": {},
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "employees.position": "intern"
              }
            },
            {
              "term": {
                "employees.gender.keyword": {
                  "value": "F"
                }
              }
            }
          ]
        }
      }
    }
  }
}


# Mapping document relationships


# Adding documents

DELETE /department

PUT /department
{
  "mappings": {
    "properties": {
      "join_field": { 
        "type": "join",
        "relations": {
          "department": "employee"
        }
      }
    }
  }
}

PUT /department/_doc/1
{
  "name": "Development",
  "join_field": "department"
}
PUT /department/_doc/2
{
  "name": "Marketing",
  "join_field": "department"
}

PUT /department/_doc/3?routing=1
{
  "name": "Bo Andersen",
  "age": 28,
  "gender": "M",
  "join_field": {
    "name": "employee",
    "parent": 1
  }
}
PUT /department/_doc/4?routing=2
{
  "name": "John Doe",
  "age": 44,
  "gender": "M",
  "join_field": {
    "name": "employee",
    "parent": 2
  }
}
PUT /department/_doc/5?routing=1
{
  "name": "James Evans",
  "age": 32,
  "gender": "M",
  "join_field": {
    "name": "employee",
    "parent": 1
  }
}
PUT /department/_doc/6?routing=1
{
  "name": "Daniel Harris",
  "age": 52,
  "gender": "M",
  "join_field": {
    "name": "employee",
    "parent": 1
  }
}
PUT /department/_doc/7?routing=2
{
  "name": "Jane Park",
  "age": 23,
  "gender": "F",
  "join_field": {
    "name": "employee",
    "parent": 2
  }
}
PUT /department/_doc/8?routing=1
{
  "name": "Christina Parker",
  "age": 29,
  "gender": "F",
  "join_field": {
    "name": "employee",
    "parent": 1
  }
}


# Querying by parent
GET /department/_search
{
  "query": {
    "parent_id": {
      "type": "employee",
      "id": 1
    }
  }
}


# Querying child documents by parent
GET /department/_search
{
  "query": {
    "has_parent": {
      "parent_type": "department",
      "query": {
        "term": {
          "name.keyword": "Development"
        }
      }
    }
  }
}

GET /department/_search
{
  "query": {
    "has_parent": {
      "parent_type": "department",
      "score": true,
      "query": {
        "term": {
          "name.keyword": "Development"
        }
      }
    }
  }
}


# Querying parent by child documents
GET /department/_search
{
  "query": {
    "has_child": {
      "type": "employee",
      "query": {
        "bool": {
          "must": [
            {
              "range": {
                "age": {
                  "gte": 50
                }
              }
            }
          ],
          "should": [
            {
              "term": {
                "gender.keyword": "M"
              }
            }
          ]
        }
      }
    }
  }
}

GET /department/_search
{
  "query": {
    "has_child": {
      "type": "employee",
      "score_mode": "sum",
      "query": {
        "bool": {
          "must": [
            {
              "range": {
                "age": {
                  "gte": 50
                }
              }
            }
          ],
          "should": [
            {
              "term": {
                "gender.keyword": "M"
              }
            }
          ]
        }
      }
    }
  }
}


# Multi-level relations
PUT /company
{
  "mappings": {
    "properties": {
      "join_field": {
        "type": "join",
        "relations": {
          "company": ["department", "supplier"],
          "department": "employee"
        }
      }
    }
  }
}

PUT /company/_doc/1
{
  "name": "My Company Inc.",
  "join_field": "company"
}

PUT /company/_doc/2?routing=1
{
  "name": "Development",
  "join_field": {
    "name": "department",
    "parent": 1
  }
}

PUT /company/_doc/3?routing=1
{
  "name": "Bo Andersen",
  "join_field": {
    "name": "employee",
    "parent": 2
  }
}

PUT /company/_doc/4
{
  "name": "Another Company, Inc.",
  "join_field": "company"
}
PUT /company/_doc/5?routing=4
{
  "name": "Marketing",
  "join_field": {
    "name": "department",
    "parent": 4
  }
}
PUT /company/_doc/6?routing=4
{
  "name": "John Doe",
  "join_field": {
    "name": "employee",
    "parent": 5
  }
}

GET /company/_search
{
  "query": {
    "has_child": {
      "type": "department",
      "query": {
        "has_child": {
          "type": "employee",
          "query": {
            "term": {
              "name.keyword": "John Doe"
            }
          }
        }
      }
    }
  }
}


#  Parent/child inner hits
GET /department/_search
{
  "query": {
    "has_child": {
      "type": "employee",
      "inner_hits": {},
      "query": {
        "bool": {
          "must": [
            {
              "range": {
                "age": {
                  "gte": 50
                }
              }
            }
          ],
          "should": [
            {
              "term": {
                "gender.keyword": "M"
              }
            }
          ]
        }
      }
    }
  }
}

GET /department/_search
{
  "query": {
    "has_parent": {
      "inner_hits": {},
      "parent_type": "department",
      "query": {
        "term": {
          "name.keyword": "Development"
        }
      }
    }
  }
}


# Terms lookup mechanism
PUT /users/_doc/1
{
  "name": "John Roberts",
  "following" : [2, 3]
}
PUT /users/_doc/2
{
  "name": "Elizabeth Ross",
  "following" : []
}
PUT /users/_doc/3
{
  "name": "Jeremy Brooks",
  "following" : [1, 2]
}
PUT /users/_doc/4
{
  "name": "Diana Moore",
  "following" : [3, 1]
}
PUT /stories/_doc/1
{
  "user": 3,
  "content": "Wow look, a penguin!"
}
PUT /stories/_doc/2
{
  "user": 1,
  "content": "Just another day at the office... #coffee"
}
PUT /stories/_doc/3
{
  "user": 1,
  "content": "Making search great again! #elasticsearch #elk"
}
PUT /stories/_doc/4
{
  "user": 4,
  "content": "Had a blast today! #rollercoaster #amusementpark"
}
PUT /stories/_doc/5
{
  "user": 4,
  "content": "Yay, I just got hired as an Elasticsearch consultant - so excited!"
}
PUT /stories/_doc/6
{
  "user": 2,
  "content": "Chilling at the beach @ Greece #vacation #goodtimes"
}

GET /stories/_search
{
  "query": {
    "terms": {
      "user": {
        "index": "users",
        "id": 1,
        "path": "following"
      }
    }
  }
}