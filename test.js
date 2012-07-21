var assert = require('assert');
var nnn = require('./nnn');

/*

{
   "location": {lat: 3, lon: 4},
   "key": "203fs98fj20389fjd0fg2038j24fg092",
   "category": "laundry",
   "items": [
      "name": "laundromat in the town thing",
      "location": {"lat": 3, "lon": 4},

   ]
}


{
   "items": [
      {
         "name"
   ]
}

*/
suite('distancify', function () {

  var locations = [
    {"lat": "37.765871", "lon": "-122.410711", "name": "Mikado Sushi"},
    {"lat": "37.771403", "lon": "-122.423814", "name": "Sushi Zone"},
    {"lat": "37.764596", "lon": "-122.431069", "name": "Daimaru Sushi"}
  ];

  var center = {lat: "37.771403", lon: "-122.423814"};

  test('functional', function () {
    var res = nnn.distancify(center, locations);

    assert(res.length === 3);

    res.forEach(function (item) { 
      assert(typeof item.distances[nnn.loc2str(center)] == 'number'); 
    });
  });
});

suite('clone', function () {
  test('all objects', function () {
    var obj = {test: 'foo', bar: 'baz', loc: {cat: 'dog'}};
    var clone = nnn.clone(obj);

    assert(obj.loc.cat == clone.loc.cat);
    assert(obj.test == clone.test);
  });

  test('arrays', function () {
    var obj = {test: ['test1', 'foo', 'bar']};
    var clone = nnn.clone(obj);

    assert(Array.isArray(clone.test));
  });
});

suite('solve', function () {

  var locations = [
    {name: "Laundry Locker", lat: "37.770888", lon: "-122.422287", category:"laundry"},
    {name: "Jack's Laundry", lat: "37.765973", lon: "-122.433382", category:"laundry"},
    {name: "Guerrero Laundry", lat: "37.763255", lon: "-122.424031", category:"laundry"},
    {lat: "37.765871", lon: "-122.410711", "name": "Mikado Sushi", category:"sushi"},
    {lat: "37.771403", lon: "-122.423814", "name": "Sushi Zone", category:"sushi"},
    {lat: "37.764596", lon: "-122.431069", "name": "Daimaru Sushi", category:"sushi"}
  ];

  var categories = ['sushi', 'laundry'];

  test('functional', function () {
    var model = {
      locations:[{name: "start", lat: "37.771403", lon: "-122.423814", category: false}],
      distance: 0,
      categories: {}
    };
    var res = nnn.solve(model, locations, categories);

    assert(res instanceof Array);

    var last = 0;
    res.forEach(function (item) {
      assert(item.distance >= last);
      last = item.distance;
    });

    console.log(JSON.stringify(res, false, 2));
  });
});

