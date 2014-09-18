/**

/*
  Este ejemplo muestra como agregar una capa de calor y aumentar la intensidad de la marca de los puntos
  @author: Joel Humberto GÃ³mez Paredes
**/


var map, heatmap, mvc;
var puntos=[];

var tmpHeat = null;

function initialize() {

  /**Opciones para inicializar el mapa**/
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(25.646210, -100.321993),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

/**
Inicializa el mapa
**/
  map = new google.maps.Map(document.getElementById('mapa'),mapOptions);
  visualizar();

}


function visualizar () {
  mvc = new google.maps.MVCArray(puntos);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: mvc
  });

  heatmap.setMap(map);
  getTiposArboles();
  $("#tipo_arbol").on("change", limpiaMapa);
}

function getTiposArboles () {
  $.ajax({
            async: false,
            dataType: 'json',
            type: 'get',
            url: 'db/estilos.txt',
            success: function(json){
                for (i in json) {
                  $("#tipo_arbol").append("<option value='"+json[i]+"'>"+json[i]+"</option>");
                }
        }
      });
}

function getArboles (cb) {
  tipo = $("#tipo_arbol").val().replace(/ /g,"_");
    $.ajax({
            async: false,
            dataType: 'json',
            type: 'get',
            crossDomain: true,
            url: 'db/' + tipo + '.txt',
            success: function(json){
              //$("#data textarea").val(JSON.stringify(json))
              cb(json)
        }
      });

}


function limpiaMapa () {
  tmpHeat && tmpHeat.setMap(null);
  getArboles(function (json){
    var heatmapData = [];
    for (i in json){
      json[i].lat && heatmapData.push(new google.maps.LatLng(json[i].lat, json[i].lon));
     }
     console.log(heatmapData)
     tmpHeat =  heatmap1 = new google.maps.visualization.HeatmapLayer({
       data: heatmapData
     });
    heatmap1.setMap(map);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);