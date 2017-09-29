'use strict'
$().ready(init)

function init(){
  //load JSON

 var hours = []
 for(let i=0;i<50;i++){
   let hour = ""+(19 + Math.floor(i/2)) % 24 +":"
   if(i % 2 == 0){
     hour += "00"
   }else{
     hour += "30"
   }
   if(hour.length < 5){
     hour = '0' + hour
   }
   hours.push(hour)

 }
  var densityIndex = 0

  $.getJSON('data/trafico.geojson',function(geojson){

    var mymap = L.map('mapid').setView([40.40705674206096, -3.7177885415391936], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoibW1hcnRvciIsImEiOiJjajdoZm1taGcxam5jMnF1dzl3bjNrbWdjIn0.JRRqwtR--FrcimiNx-kc-w'
    }).addTo(mymap);

    //https://gka.github.io/palettes/#colors=lightyellow,orange,deeppink,darkred|steps=10|bez=1|coL=1
    let hexcolors = ['#ffffe0','#ffe3af','#ffc58a','#ffa474','#fa8266','#ed645c','#db4551','#c52940','#aa0e27','#8b0000']

    let roadLayer = L.geoJSON(geojson, {
      style: function(feature) {

        let hexcolor = hexcolors[feature.properties.density[densityIndex]]

        return {color: hexcolor/*stroke:false,strokeOpacity:0.8,fillOpacity:0.8*/};

      }
    })

    roadLayer.addTo(mymap)

    let btnNext, btnPrev, btnPlay

    function btnHandler(btn,map){

      if(btn == btnPrev){
        densityIndex = (densityIndex + 50 - 1) % 50
      }else{
        densityIndex = (densityIndex + 1) % 50
      }
      $('#time').text(hours[densityIndex])
      roadLayer.eachLayer(function (layer) {
        let properties = layer.feature.properties
        layer.setStyle({color:hexcolors[properties.density[densityIndex]]})
      })

    }
    $('#time').text(hours[densityIndex])
    let timer = null
    /* hide buttons
    btnNext = L.easyButton('fa-step-forward',  btnHandler).addTo( mymap )
    btnPrev = L.easyButton('fa-step-backward', btnHandler).addTo( mymap )
    */
    btnNext = 'BTN_NEXT'
    btnPrev = 'BTN_PREV'

    btnPlay = L.easyButton('fa-play', function(){

      if(timer == null){
        btnHandler(btnNext,mymap)
        timer = setInterval(function(){btnHandler(btnNext,mymap)},500)
      }else{
        clearInterval(timer)
        timer = null
      }
    }).addTo( mymap )


  })



}
