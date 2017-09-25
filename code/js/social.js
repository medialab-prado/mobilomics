
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW1hcnRvciIsImEiOiJjajdoZm1taGcxam5jMnF1dzl3bjNrbWdjIn0.JRRqwtR--FrcimiNx-kc-w';
    mbUrlN = 'https://api.mapbox.com/styles/v1/vicvalley/cj7x938mi4r2j2so72l105xp3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmljdmFsbGV5IiwiYSI6ImNqN3Vqd2tkMTRqb3Ayd3FrYmJoM3pzbjgifQ.bZx6kqMZzO49FfFef-kZsw'
  var satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
    streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr});
    dark = L.tileLayer(mbUrlN, {attribution: mbAttr});

  var mymap = L.map('mapid', {
    center: [40.48935,-3.68274],
    zoom: 10,
    layers: [satellite, streets],
    timeDimension: true,
    timeDimensionControl: true,
    pitch: 80
  });
  var baseLayers = {
    "Satellite": satellite,
    "Streets": streets,
    "Dark": dark
  };


  L.control.layers(baseLayers).addTo(mymap)

  mymap.on('click', function(e) {
    alert(e.latlng);
  });

  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

mymap.on("contextmenu", function (event) {
  console.log("Coordinates: " + event.latlng.toString());
  L.marker(event.latlng).addTo(mymap);
})
function onEachFeature( feature, layer) {
  layer.bindPopup(feature.properties.hour);
}

  //Add a layer for markerClusterGroup
  //var markers=L.markerClusterGroup();



  //var twitterLayer = L.geoJson(geojsonFeature);

  /*var traficoLayer = L.geoJson(int_loc, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.intensidad);
    }
  });*/
  var socialLayer = L.geoJson(socialFeature, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  /*  style: function (feature) {
      var x = (feature.properties.hour);
      switch (true) {
        case (x<7) : return { radius: 8,fillColor: "#990000",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        case (x>7 && x<15) : return { radius: 8,fillColor: "#000099",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        case (x>15 && x<18): return { radius: 8,fillColor: "#006600",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        case (x>18 && x<20): return { radius: 8,fillColor: "#ff0000",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        case (x>20 && x<24): return { radius: 8,fillColor: "#990099",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
        default: return { radius: 8,fillColor: "#ff0099",color: "#000",weight: 1,opacity: 1,fillOpacity: 0.8};
      }
    }*/
  });
  L.markerClusterGroup.layerSupport().addTo(mymap).checkIn(socialLayer);
  //Create a marker layer
  var sliderControl = L.control.sliderControl({position: "topleft", layer: socialLayer, range: true});
  //add the slider to the map
  mymap.addControl(sliderControl);
  //initialize the slider
  sliderControl.startSlider();


  //$('#slider-timestamp').html(options.)


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
    //markers.addLayer(sliderControl);
    //ADD the markercluster group to the map
    //mymap.addLayer(markers);

//});
