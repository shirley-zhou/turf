const test = require('tape');
const {
    randomPoint,
    randomLineString,
    randomPolygon,
    randomPosition
} = require('./dist/js/index.js');

test('random(points)', t => {
    var points = randomPoint();
    t.equal(points.type, 'FeatureCollection', 'is a featurecollection');
    t.equal(points.features.length, 1, 'right number of features');
    t.equal(points.features[0].geometry.type, 'Point', 'feature type correct');
    t.end();
});

test('random(polygons)', t => {
    var points = randomPolygon();
    t.equal(points.type, 'FeatureCollection', 'is a featurecollection');
    t.equal(points.features.length, 1, 'right number of features');
    t.equal(points.features[0].geometry.type, 'Polygon', 'feature type correct');
    t.end();
});

test('random(polygons, 10)', t => {
    var points = randomPolygon(10);
    t.equal(points.type, 'FeatureCollection', 'is a featurecollection');
    t.equal(points.features.length, 10, 'right number of features');
    t.equal(points.features[0].geometry.type, 'Polygon', 'feature type correct');
    t.end();
});

test('random(polygons, 1, {num_vertices})', t => {
    var points = randomPolygon(10, {num_vertices: 23});
    t.equal(points.type, 'FeatureCollection', 'is a featurecollection');
    t.equal(points.features.length, 10, 'right number of features');
    t.equal(points.features[0].geometry.coordinates[0].length, 24, 'num vertices');
    t.end();
});

test('random(points, 10, {bbox})', t => {
    var points = randomPoint(10, { bbox: [0, 0, 0, 0] });
    t.equal(points.type, 'FeatureCollection', 'is a featurecollection');
    t.equal(points.features.length, 10, 'right number of features');
    t.equal(points.features[0].geometry.type, 'Point', 'feature type correct');
    t.deepEqual(points.features[0].geometry.coordinates, [0, 0], 'feature type correct');
    t.end();
});

test('random(points, 1, {bbox,random_seed})', t => {
    var points1 = randomPoint(1, { bbox: [0, 0, 0, 0], random_seed: 1 });
    var points2 = randomPoint(1, { bbox: [0, 0, 0, 0], random_seed: 1 });
    t.equal(points1.type, 'FeatureCollection', 'is a featurecollection');
    t.equal(points1.features.length, 1, 'right number of features');
    t.equal(points1.features[0].geometry.type, 'Point', 'feature type correct');
    t.equal(points2.type, 'FeatureCollection', 'is a featurecollection');
    t.equal(points2.features.length, 1, 'right number of features');
    t.equal(points2.features[0].geometry.type, 'Point', 'feature type correct');
    // deterministic
    t.equal(points1.features[0].geometry.coordinates[0], points2.features[0].geometry.coordinates[0])
    t.equal(points1.features[0].geometry.coordinates[1], points2.features[0].geometry.coordinates[1])
    t.end();
});
