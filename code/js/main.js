
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW1hcnRvciIsImEiOiJjajdoZm1taGcxam5jMnF1dzl3bjNrbWdjIn0.JRRqwtR--FrcimiNx-kc-w';

  var satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
    streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr});

  var mymap = L.map('mapid', {
    center: [40.48935,-3.68274],
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


function onEachFeature( feature, layer) {
  layer.bindPopup(feature.properties.hour);
}

  //Add a layer for markerClusterGroup
  var markers=L.markerClusterGroup();



  var twitterLayer = L.geoJson(geojsonFeature);

  /*var traficoLayer = L.geoJson(int_loc, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.intensidad);
    }
  });*/
  var socialLayer = L.geoJson(socialFeature, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    style: function (feature) {
      switch (feature.properties.hour) {
        case 4: return { radius: 8,fillColor: "#990000",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        case 5: return { radius: 8,fillColor: "#000099",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        case 6: return { radius: 8,fillColor: "#006600",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        case 7: return { radius: 8,fillColor: "#ff0000",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        case 8: return { radius: 8,fillColor: "#990099",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        case 9: return { radius: 8,fillColor: "#ff0099",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
      }
    }
  });
  var trafficLayer = L.geoJson(trafficFeature);

  /*var geojson = L.geoJson(geojsonSample, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });*/




   /*L.geoJson(atlanta, {
     pointToLayer: function (feature, latlng) {
       return L.circleMarker(latlng, geojsonMarkerOptions);
     }
   }).addTo(mymap);*/
    //Add geoJsonLayer to markercluster group
    markers.addLayer(socialLayer);
    //ADD the markercluster group to the map
    mymap.addLayer(markers);
    //mymap.fitBounds(markers.getBounds());
    //markers.addTo(mymap);
//});
