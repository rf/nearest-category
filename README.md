# nearest-category

It solves instances of the traveling salesman problem which have categories, ie,
we have two categories of cities and we want to hit each category once.

This code is used in [runr](http://runr.stevenlu.com), a Facebook Summer of Hack
NY 2012 hackathon entry by Russ Frank, Steve Lu and Wayne Sun.

```javascript

var nnn = require('nearest-category');

// List of locations
var locations = [
  {name: "Laundry Locker", lat: "37.770888", lon: "-122.422287", category: "laundry"},
  {name: "Jack's Laundry", lat: "37.765973", lon: "-122.433382", category: "laundry"},
  {name: "Guerrero Laundry", lat: "37.763255", lon: "-122.424031", category: "laundry"},
  {name: "Mikado Sushi", lat: "37.765871", lon: "-122.410711", category: "sushi"},
  {name: "Sushi Zone", lat: "37.771403", lon: "-122.423814", category: "sushi"},
  {name: "Daimaru Sushi", lat: "37.764596", lon: "-122.431069", category: "sushi"}
];

// List of categories
var categories = ['sushi', 'laundry'];

// Base model.  We could solve based on a set of assumptions by setting 
// `locations` to some partial trip.  `categories` is the list of categories
// we've visited thus far in the model, mapped to true (ie {sushi: true} would
// mean we've visited a sushi place).
var model = {
  locations:[{name: "start", lat: "37.771403", lon: "-122.423814", category: false}],
  distance: 0,
  categories: {}
};

var res = nnn.solve(model, locations, categories);

```

It'll return an array of the best trips we could calulate. Currently
it explores 5 iterations inward; this may eventually be
configurable.

One trip is a complete `model`; see the above for an idea of what `model`s
look like.

Here's some sample output:

```json
[
  {
    "locations": [
      {
        "name": "start",
        "lat": "37.771403",
        "lon": "-122.423814",
        "category": false
      },
      {
        "lat": "37.771403",
        "lon": "-122.423814",
        "name": "Sushi Zone",
        "category": "sushi",
        "distances": {
          "37.771403|-122.423814": 0,
          "37.764596|-122.431069": 0.614993836167184
        }
      },
      {
        "name": "Laundry Locker",
        "lat": "37.770888",
        "lon": "-122.422287",
        "category": "laundry",
        "distances": {
          "37.771403|-122.423814": 0.09067216308196652,
          "37.764596|-122.431069": 0.6473538616708492,
          "37.765871|-122.410711": 0.721046744534902,
          "37.763255|-122.424031": 0.5359231831388118,
          "37.765973|-122.433382": 0.694652117158943
        }
      }
    ],
    "distance": 0.09067216308196652,
    "categories": {
      "sushi": true,
      "laundry": true
    }
  },
  {
    "locations": [
      {
        "name": "start",
        "lat": "37.771403",
        "lon": "-122.423814",
        "category": false
      },
      {
        "lat": "37.771403",
        "lon": "-122.423814",
        "name": "Sushi Zone",
        "category": "sushi",
        "distances": {
          "37.771403|-122.423814": 0,
          "37.764596|-122.431069": 0.614993836167184
        }
      },
      {
        "name": "Guerrero Laundry",
        "lat": "37.763255",
        "lon": "-122.424031",
        "category": "laundry",
        "distances": {
          "37.771403|-122.423814": 0.5630977415498589,
          "37.764596|-122.431069": 0.395431827865439,
          "37.765871|-122.410711": 0.7496633627304206
        }
      }
    ],
    "distance": 0.5630977415498589,
    "categories": {
      "sushi": true,
      "laundry": true
    }
  },
  {
    "locations": [
      {
        "name": "start",
        "lat": "37.771403",
        "lon": "-122.423814",
        "category": false
      },
      {
        "lat": "37.771403",
        "lon": "-122.423814",
        "name": "Sushi Zone",
        "category": "sushi",
        "distances": {
          "37.771403|-122.423814": 0,
          "37.764596|-122.431069": 0.614993836167184
        }
      },
      {
        "name": "Jack's Laundry",
        "lat": "37.765973",
        "lon": "-122.433382",
        "category": "laundry",
        "distances": {
          "37.771403|-122.423814": 0.6433111817661769,
          "37.764596|-122.431069": 0.15815438129689982,
          "37.765871|-122.410711": 1.2383026155014534,
          "37.763255|-122.424031": 0.5441880046398461
        }
      }
    ],
    "distance": 0.6433111817661769,
    "categories": {
      "sushi": true,
      "laundry": true
    }
  },
  {
    "locations": [
      {
        "name": "start",
        "lat": "37.771403",
        "lon": "-122.423814",
        "category": false
      },
      {
        "lat": "37.764596",
        "lon": "-122.431069",
        "name": "Daimaru Sushi",
        "category": "sushi",
        "distances": {
          "37.771403|-122.423814": 0.614993836167184
        }
      },
      {
        "name": "Jack's Laundry",
        "lat": "37.765973",
        "lon": "-122.433382",
        "category": "laundry",
        "distances": {
          "37.771403|-122.423814": 0.6433111817661769,
          "37.764596|-122.431069": 0.15815438129689982,
          "37.765871|-122.410711": 1.2383026155014534,
          "37.763255|-122.424031": 0.5441880046398461
        }
      }
    ],
    "distance": 0.7731482174640838,
    "categories": {
      "sushi": true,
      "laundry": true
    }
  },
  {
    "locations": [
      {
        "name": "start",
        "lat": "37.771403",
        "lon": "-122.423814",
        "category": false
      },
      {
        "lat": "37.764596",
        "lon": "-122.431069",
        "name": "Daimaru Sushi",
        "category": "sushi",
        "distances": {
          "37.771403|-122.423814": 0.614993836167184
        }
      },
      {
        "name": "Guerrero Laundry",
        "lat": "37.763255",
        "lon": "-122.424031",
        "category": "laundry",
        "distances": {
          "37.771403|-122.423814": 0.5630977415498589,
          "37.764596|-122.431069": 0.395431827865439,
          "37.765871|-122.410711": 0.7496633627304206
        }
      }
    ],
    "distance": 1.010425664032623,
    "categories": {
      "sushi": true,
      "laundry": true
    }
  },
  {
    "locations": [
      {
        "name": "start",
        "lat": "37.771403",
        "lon": "-122.423814",
        "category": false
      },
      {
        "lat": "37.764596",
        "lon": "-122.431069",
        "name": "Daimaru Sushi",
        "category": "sushi",
        "distances": {
          "37.771403|-122.423814": 0.614993836167184
        }
      },
      {
        "name": "Laundry Locker",
        "lat": "37.770888",
        "lon": "-122.422287",
        "category": "laundry",
        "distances": {
          "37.771403|-122.423814": 0.09067216308196652,
          "37.764596|-122.431069": 0.6473538616708492,
          "37.765871|-122.410711": 0.721046744534902,
          "37.763255|-122.424031": 0.5359231831388118,
          "37.765973|-122.433382": 0.694652117158943
        }
      }
    ],
    "distance": 1.2623476978380332,
    "categories": {
      "sushi": true,
      "laundry": true
    }
  },
  {
    "locations": [
      {
        "name": "start",
        "lat": "37.771403",
        "lon": "-122.423814",
        "category": false
      },
      {
        "lat": "37.765871",
        "lon": "-122.410711",
        "name": "Mikado Sushi",
        "category": "sushi",
        "distances": {
          "37.771403|-122.423814": 0.8113311097470637,
          "37.764596|-122.431069": 1.115441751898565
        }
      },
      {
        "name": "Laundry Locker",
        "lat": "37.770888",
        "lon": "-122.422287",
        "category": "laundry",
        "distances": {
          "37.771403|-122.423814": 0.09067216308196652,
          "37.764596|-122.431069": 0.6473538616708492,
          "37.765871|-122.410711": 0.721046744534902,
          "37.763255|-122.424031": 0.5359231831388118,
          "37.765973|-122.433382": 0.694652117158943
        }
      }
    ],
    "distance": 1.5323778542819657,
    "categories": {
      "sushi": true,
      "laundry": true
    }
  },
  {
    "locations": [
      {
        "name": "start",
        "lat": "37.771403",
        "lon": "-122.423814",
        "category": false
      },
      {
        "lat": "37.765871",
        "lon": "-122.410711",
        "name": "Mikado Sushi",
        "category": "sushi",
        "distances": {
          "37.771403|-122.423814": 0.8113311097470637,
          "37.764596|-122.431069": 1.115441751898565
        }
      },
      {
        "name": "Guerrero Laundry",
        "lat": "37.763255",
        "lon": "-122.424031",
        "category": "laundry",
        "distances": {
          "37.771403|-122.423814": 0.5630977415498589,
          "37.764596|-122.431069": 0.395431827865439,
          "37.765871|-122.410711": 0.7496633627304206
        }
      }
    ],
    "distance": 1.5609944724774842,
    "categories": {
      "sushi": true,
      "laundry": true
    }
  },
  {
    "locations": [
      {
        "name": "start",
        "lat": "37.771403",
        "lon": "-122.423814",
        "category": false
      },
      {
        "lat": "37.765871",
        "lon": "-122.410711",
        "name": "Mikado Sushi",
        "category": "sushi",
        "distances": {
          "37.771403|-122.423814": 0.8113311097470637,
          "37.764596|-122.431069": 1.115441751898565
        }
      },
      {
        "name": "Jack's Laundry",
        "lat": "37.765973",
        "lon": "-122.433382",
        "category": "laundry",
        "distances": {
          "37.771403|-122.423814": 0.6433111817661769,
          "37.764596|-122.431069": 0.15815438129689982,
          "37.765871|-122.410711": 1.2383026155014534,
          "37.763255|-122.424031": 0.5441880046398461
        }
      }
    ],
    "distance": 2.0496337252485173,
    "categories": {
      "sushi": true,
      "laundry": true
    }
  }
]
```

# License

MIT
