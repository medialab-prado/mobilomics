'use strict'
$().ready(init)

function init(){
  //load JSON
  $.getJSON('data/17_00_intensidad_localizada.geojson',function(geojson){

    var mymap = L.map('mapid').setView([40.40705674206096, -3.7177885415391936], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibW1hcnRvciIsImEiOiJjajdoZm1taGcxam5jMnF1dzl3bjNrbWdjIn0.JRRqwtR--FrcimiNx-kc-w'
    }).addTo(mymap);



    var pointsLayer = L.geoJSON(geojson, {

  		pointToLayer: function (feature, latlng) {

        if( feature.properties.intensidad == null
        || feature.properties.intensidad < 0 ){

          return
        }

        let clusterMagnitude

        if ( feature.properties.intensidad < 500 ){
          clusterMagnitude = 'small'
        }else if ( feature.properties.intensidad < 1000 ){
          clusterMagnitude = 'medium'
        }else{
          clusterMagnitude = 'large'
        }

        let icon = new L.DivIcon(
          { html: '<div><span>' + feature.properties.intensidad + '</span></div>',
           className: 'marker-cluster marker-cluster-'+clusterMagnitude,
           iconSize: new L.Point(40, 40)
          })
        return L.marker(latlng, { icon: icon })
  		}
    })

    var markers = L.markerClusterGroup({

	     iconCreateFunction: function(cluster) {

         let markers = cluster.getAllChildMarkers()
         let sumIntensidad = 0
         let numIntensidad = 0

         for( let marker of markers ){
           if( marker.feature.properties.intensidad > 0 ){
             sumIntensidad += marker.feature.properties.intensidad
             numIntensidad ++
           }
         }

         let avgIntensidad = sumIntensidad / numIntensidad
         let clusterMagnitude
         if ( avgIntensidad < 500 ){
           clusterMagnitude = 'small'
         }else if ( avgIntensidad < 1000 ){
           clusterMagnitude = 'medium'
         }else{
           clusterMagnitude = 'large'
         }

         let intensidadDesc = sumIntensidad

         if(sumIntensidad > 1000000){
           intensidadDesc = Math.round(sumIntensidad / 1000000.0)+'M'
         }else if( sumIntensidad > 1000 ){
           intensidadDesc = Math.round(sumIntensidad / 1000.0)+'K'
         }

         let icon = new L.DivIcon(
           { html: '<div><span>' + intensidadDesc + '</span></div>',
            className: 'marker-cluster marker-cluster-' + clusterMagnitude,
            iconSize: new L.Point(40, 40)
           });
          return icon
	      }
    });

    markers.addLayer(pointsLayer)
    mymap.addLayer(markers)

  })



}
