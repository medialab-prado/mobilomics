var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW1hcnRvciIsImEiOiJjajdoZm1taGcxam5jMnF1dzl3bjNrbWdjIn0.JRRqwtR--FrcimiNx-kc-w';

  var satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
    streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr});

  var mymap = L.map('mapid', {
    center: [139.742,24.515364],
    zoom: 6,
    layers: [satellite, streets]
  });
  var baseLayers = {
    "Satellite": satellite,
    "Streets": streets
  };

  L.control.layers(baseLayers).addTo(mymap)


  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };




  //Add a layer for markerClusterGroup

  var markers=L.markerClusterGroup();

  /*var atlantaLayer = L.geoJson(atlanta, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });*/

  var atlantaLayer = L.geoJson(atlanta);



/*  for (var i=0; i< atlanta.length; i++) {
    var a = atlanta[i];
    var marker = L.marker(new L.LatLng)
  }*/
  //User jQuery to load date from GeoJSON file
  /*$.getJSON('prueba.json', function(data) {
    var geoJsonLayer = L.geoJson(data, {
      onEachFeature: function(feature, layer){
        layer.setIcon(icon);
      }
    });*/
  /*  L.geoJson(atlanta,{
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    }).addTo(mymap);*/
    //Add geoJsonLayer to markercluster group
    markers.addLayer(atlantaLayer);
    //ADD the markercluster group to the map
    mymap.addLayer(markers);
    //mymap.fitBounds(markers.getBounds());
    //markers.addTo(mymap);
//});
