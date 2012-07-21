# tsp solving thing

It solves instances of the traveling salesman problem which have categories, ie,
we want to hit each category once.

```javascript

var nnn = require('nearest-category');

var locations = [
  {name: "Laundry Locker", lat: "37.770888", lon: "-122.422287", category:"laundry"},
  {name: "Jack's Laundry", lat: "37.765973", lon: "-122.433382", category:"laundry"},
  {name: "Guerrero Laundry", lat: "37.763255", lon: "-122.424031", category:"laundry"},
  {lat: "37.765871", lon: "-122.410711", "name": "Mikado Sushi", category:"sushi"},
  {lat: "37.771403", lon: "-122.423814", "name": "Sushi Zone", category:"sushi"},
  {lat: "37.764596", lon: "-122.431069", "name": "Daimaru Sushi", category:"sushi"}
];

var categories = ['sushi', 'laundry'];

var model = {
  locations:[{name: "start", lat: "37.771403", lon: "-122.423814", category: false}],
  distance: 0,
  categories: {}
};

var res = nnn.solve(model, locations, categories);

```

It'll return an array of the five best results we were able to calculate.  
Currently it explores 5 iterations inward; this may eventually be
configurable.

# License

MIT
