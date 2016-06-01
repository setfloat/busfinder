(function(){
  'use strict'
  $(".button-collapse").sideNav();
  $("select").material_select();
  // $('select').material_select('destroy');

  // load/pull the api. make first in program to load quicker.

  // Below is the stopId JSON pull
var stopId = {};

  $.ajaxSetup({
    headers: {
      'x-requested-with': 'whatever.com'
    }
  });

  var $xhr = $.getJSON('https://cors-anywhere.herokuapp.com/api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_26340.json?key=TEST');
  //stopId JSON pull end

$xhr;


  $xhr.done(function(data) {
    console.log( "xhr status is " + $xhr.status)
    if ($xhr.status !== 200) {
    }
    stopId = data;
    console.log(stopId);

    // to be populated information as functions.

    //first predicted time of arrival function

    var predictTime = function(){
      predictTime = stopId.data.entry.arrivalsAndDepartures[0].predictedArrivalTime;
      if (stopId.data.entry.arrivalsAndDepartures[0].predictedArrivalTime === 0)
      {
        predictTime = "NOW";
      }
      return predictTime;
    };


    // display the bus info function
    var busDisplay = function(){
      return stopId.data.entry.arrivalsAndDepartures[0].routeShortName + ' ' + stopId.data.entry.arrivalsAndDepartures[0].tripHeadsign;
    }
    // display the address of the stop function
    var stopAddy = function(){
      return stopId.data.references.stops[0].name
    }
    var stopLat = stopId.data.references.stops[0].lat;
    var stopLon = stopId.data.references.stops[0].lon;


    // display the google busbackground function

    var busBackground = function(){

       return `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${stopLat},${stopLon}&heading=151.78&pitch=-0.76&key=AIzaSyC7mnD1MCwxepaSfwFH9d8nUtHCMCEiMCo`
  }


    var addCard = $('.addCard').append(`<div class="col s12 m6 l4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src=${busBackground()}></div><div class="card-content"><span class=" activator grey-text text-darken-4">${busDisplay()}<i class="material-icons right">more_vert</i></span><p>${predictTime()}</p><p>${predictTime}</p><p>${predictTime}</p><h6 class="right-align">${stopAddy()}</h6></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span></div></div></div>`);


addCard;



});  // end xhr done
})();






  // var loadgMapApi = $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC7mnD1MCwxepaSfwFH9d8nUtHCMCEiMCo');




  // loadgMapApi.done(function( script, textStatus ){
//
//     console.log(loadgMapApi);
//     // possible if statement.
//
//     // actually create the map
//     // initGoogMap(){
//     //    google.maps.places.RadarSearchRequest
//     // };
//

//     ;
//     addCard();
//
//
//
//
// // this is where everything goes
//
//
//
//
//
//
//
//
//
//
//
//
//     loadgMapApi();
//
//
//
//
//
//

// .initGoogMap()
// .done(function( script, textStatus ){
// })
// // {
// //
// // }
// ;


// })  // end gmaps done
// .fail(function( jqxhr, settings, exception){
//   console.log('Triggered ajaxError handler.')
// })
