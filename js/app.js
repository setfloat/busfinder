(function(){
  'use strict'
  $(".button-collapse").sideNav();
  $("select").material_select();
    // $('select').material_select('destroy');

  var stopId = {};
  var stopHref;
  var stopAllInfo;
  var map;
  var clickLat;
  var clickLong;
  var hello;
  var current;
  var hella;

    // Below is the mapApi pull
  var loadgMapApi = $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC7mnD1MCwxepaSfwFH9d8nUtHCMCEiMCo&libraries=places');

  loadgMapApi.done(function( script, textStatus ){
    initMap();
    returnCord();

  })
  .fail(function( jqxhr, settings, exception){
    console.log('Triggered ajaxError handler.')
  });

    // Below is the stopId JSON pull
  $.ajaxSetup({
    headers: {
      'x-requested-with': 'whatever.com'
    }
  });


  var $xhr =  $.getJSON(`https://cors-anywhere.herokuapp.com/api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_26340.json?key=TEST`);
    //stopId JSON pull end

  $xhr.done(function(data)
  {
    current = data.currentTime;
    stopId = data;
    hello = function(){

    console.log( "xhr status is " + $xhr.status)
    if ($xhr.status !== 200)
    {
      // I should maybe have something here.
    }

    console.log(stopId);


      // to be populated information as functions.
      //first predicted time of arrival function
    var predictTime = function()
    {
      predictTime = stopId.data.entry.arrivalsAndDepartures[0].predictedArrivalTime;
      if (stopId.data.entry.arrivalsAndDepartures[0].predictedArrivalTime === 0 || 1 )
      {
        if(Math.floor((stopId.data.entry.arrivalsAndDepartures[0].scheduledArrivalTime - data.currentTime)/60000) === 0 || 1){
          return predictTime = "NOW";
        }
      }
      console.log(current);
      console.log(current - predictTime);

      hella = (current - predictTime)/60000;
      current = undefined;
      return Math.floor(-hella);
    }();

      // display the bus info function
    var busDisplay = function()
    {
      return stopId.data.entry.arrivalsAndDepartures[0].routeShortName + ' ' + stopId.data.entry.arrivalsAndDepartures[0].tripHeadsign;
    }

      // display the address of the stop function
    var stopAddy = function()
    {
      return stopId.data.references.stops[0].name
    }

    var stopLat = stopId.data.references.stops[0].lat;
    var stopLon = stopId.data.references.stops[0].lon;

      // display the google busbackground function
    var busBackground = function()
    {
      return `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${stopLat},${stopLon}&heading=151.78&pitch=-0.76&key=AIzaSyC7mnD1MCwxepaSfwFH9d8nUtHCMCEiMCo`
    }

    var addCard = function ()
    {
      $('.addCard').append(`<div class="col s12 m6 l4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src=${busBackground()}></div><div class="card-content"><span class=" activator grey-text text-darken-4">${busDisplay()}<i class="material-icons right">more_vert</i></span><p>${predictTime}</p><h6 class="right-align"><a href="${stopHref}">${stopAddy()}</a></h6></div><div class="card-reveal" style="background:url(${busBackground()})"><span class="card-title grey-text text-darken-4"> Card Title<i class="material-icons right">close</i></span></div></div></div>`);
    }


    return addCard();
  }
  hello();
  });


  function initMap()
  {
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'),
    {
      center: {lat: 47.658707, lng: -122.326317},
      scrollwheel: true,
      zoom: 11
    });
  }

  var returnCord = function() {
    var overlay;

    overlay = new google.maps.OverlayView();
    overlay.draw = function() {};
    overlay.setMap(map);

    $('#map').click(function(event)
    {

      var point = new google.maps.Point(event.pageX,event.pageY);
      var location = overlay.getProjection().fromContainerPixelToLatLng(point); //get map coordinates by click

      console.log(event.currentTarget) // all of the info for #map
      console.log($('#map').children(0).children(1)[1].getElementsByTagName('a')[0].getAttribute('href'))  // href with latlong

      stopHref = $('#map').children(0).children(1)[1].getElementsByTagName('a')[0].getAttribute('href');
      stopAllInfo = $('#map').children(0).children(1)[1];

      // function convertLatLon()
      console.log(  stopHref.slice(32 ,stopHref.indexOf('z')-1))

      clickLat = stopHref.slice(32 , stopHref.indexOf(','));
      clickLong = stopHref.slice(stopHref.indexOf(',')+1, stopHref.indexOf('z')-1);

        // New xhr request for latlong
      $.ajaxSetup({
        headers: {
          'x-requested-with': 'whatever.com'
        }
      });
      var $xhrlat = $.getJSON(`https://cors-anywhere.herokuapp.com/api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key=TEST&lat=${clickLat}&lon=${clickLong}&radius=70`);
      // console.log($xhrlat)
      $xhrlat.done(function(data){
        console.log(data);
        console.log($xhrlat);
        var resp = $xhrlat.responseText;

          if (resp.indexOf('"id"') === -1) {
              return console.log('this works');
              var cello = undefined;

            }
            var cello = resp.slice(resp.indexOf('"id"') + 6, resp.indexOf('"id"') + 13);
         console.log(resp.slice(resp.indexOf('"id"') + 6, resp.indexOf('"id"') + 13));




         var thisorthat = function(){
           if (cello === undefined){
             return
           }
           else
           {
             console.log('this is working');
             $.ajaxSetup({
               headers: {
                 'x-requested-with': 'whatever.com'
               }
             });

             var $powxhr =  $.getJSON(`https://cors-anywhere.herokuapp.com/api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/${cello}.json?key=TEST`);
             $powxhr.done(function(data){
               console.log(data);
               console.log('thats the data')
               current = data.currentTime;
               stopId = data;
               hello();
             })
           }}()





      })
      $xhrlat.fail(function(jqXHR, textStatus, errorThrown) {
        // console.log('fail' + ' ' + $xhrlat.status);
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      });
    });
  }

})();
