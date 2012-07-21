function deg2rad (degrees) { return degrees * (Math.PI / 180); }
function loc2str (loc) { return loc.lat + '|' + loc.lon; }

var R = 3958.76;

// Haversine formula for doing 'as the crow flies' distance
function distancify (center, locations) {
  var centerstr = loc2str(center);

  return locations.map(function (item) {
    item.distances = item.distances || {};

    var dLat = deg2rad(item.lat - center.lat);
    var dLon = deg2rad(item.lon - center.lon);
    var lat1 = deg2rad(item.lat);
    var lat2 = deg2rad(center.lat);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;

    item.distances[loc2str(center)] = d;

    return item;
  });
}

// Simple object cloning
function clone (item) {
  var copy = {};
  if (Array.isArray(item)) return item.slice();
  for (var v in item) {
    if (Array.isArray(item[v])) copy[v] = item[v].slice(); 
    else if (typeof item[v] == 'object') copy[v] = clone(item[v]); 
    else copy[v] = item[v];
  }
  return copy;
}

// # of iterations
var iterations = 5;

// Model is an object that looks like this:
// {
//   // locations we've visited
//   "locations":[{"lat": 234, "lon": 23, "name": "sushi place"}, 
//
//   "distance": 38,
//
//   // categories we've visited
//   "categories": {"sushi": true, "gas": true}
// }
//
// Returns an array of models that satisfy the location and category set.

function solve (model, locations, categories) {  

  // If we've visited every category, we're done.
  if (categories.every(function (item) { return model.categories[item]; })) 
    return [model];

  locations = clone(locations);

  var curr = model.locations[model.locations.length - 1];

  // Sort the remaining locations by their distance to the current node.
  if (!(locations[0].distances && locations[0].distances[loc2str(curr)]))
    distancify(curr, locations);

  locations.sort(function(a, b) { return a.distance - b.distance; });

  var results = [];
  var tries = 0;

  // Now, the top n locations of our array are the ones we will explore.
  while (locations.length > 0 && tries < iterations) {
    // Pop one location off.
    var next = locations.pop();

    // If we've already visited this category, continue
    if (model.categories[next.category]) continue;

    // We're actually trying something!
    tries += 1;

    // Clone the model for recursion
    var nextModel = clone(model);

    // Add its distance to the total.
    nextModel.distance += next.distances[loc2str(curr)];

    // Mark its category as visited.
    nextModel.categories[next.category] = true;

    // Add this location into the list in the current model
    nextModel.locations.push(next);

    // Add its result to the results array.
    results = results.concat(solve(nextModel, locations, categories));
  }

  // Sort results by distance.  Return the one with the smallest distance.
  results.sort(function (a, b) { return a.distance - b.distance; });

  return results;
}

exports.distancify = distancify;
exports.loc2str = loc2str;
exports.deg2rad = deg2rad;
exports.solve = solve;
exports.clone = clone;

