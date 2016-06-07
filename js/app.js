(function() {
  'use strict';
  $('.button-collapse').sideNav();
  $('select').material_select();

  // $('select').material_select('destroy');

  let stopId = {};
  let stopHref;
  let map;
  let clickLat;
  let clickLong;
  let hello;
  let current;

    // Below is the mapApi pull
  const loadgMapApi = $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC7mnD1MCwxepaSfwFH9d8nUtHCMCEiMCo&libraries=places');

  const $xhr = $.getJSON('https://cors-anywhere.herokuapp.com/api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_26340.json?key=TEST');

  $xhr.done(function(data) {
    current = data.currentTime;
    stopId = data;

    hello = function() {
      if ($xhr.status !== 200) {
        console.log($xhr.status);
      }

      var predictTime = function() {  // google requires var
        let predicted =
        Math.floor(
            (stopId.data.entry.arrivalsAndDepartures[0].scheduledArrivalTime -
              current) / 60000);

        if (predicted === 0 || predicted === 1) {
          predicted = 'NOW';
        }
        if (predicted === -1 || predicted === -2 || predicted === -3) {
          predicted = 'Missed'
        }

        return predicted;
      };

      const busDisplay = function() {
        return `${stopId.data.entry.arrivalsAndDepartures[0].routeShortName} ${stopId.data.entry.arrivalsAndDepartures[0].tripHeadsign}`;
      };

      const stopAddy = function() {
        return stopId.data.references.stops[0].name;
      };

      let stopLat = stopId.data.references.stops[0].lat;
      let stopLon = stopId.data.references.stops[0].lon;

      // display the google busbackground function
      const busBackground = function() {
        return `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${stopLat},${stopLon}&heading=151.78&pitch=-0.76&key=AIzaSyC7mnD1MCwxepaSfwFH9d8nUtHCMCEiMCo`;
      };

      let addCard = function() {
        $('.addCard').append(`<div class="col s12 l6"><div class="card">
        <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src=${busBackground()}></div>
        <div class="card-content">
        <span class=" activator grey-text text-darken-4">${busDisplay()}
        <i class="material-icons right">more_vert</i></span>
        <p>${predictTime()}</p><h6 class="right-align">
        <a href="${stopHref}">${stopAddy()}</a></h6></div>
        <div class="card-reveal" style="background:url(${busBackground()})">
        <span class="card-title grey-text text-darken-4">
        <i class="material-icons right">close</i></span></div></div></div>`);
      };

      return addCard();
    };
    hello();

    loadgMapApi.done(function() {
      function initMap() {
        // google and overlay can't be redefined via googles requirements
        map = new google.maps.Map(document.getElementById('map'),
          {
            center: { lat: 47.658707, lng: -122.326317 },
            scrollwheel: true,
            zoom: 11
          });
      }

      let returnCord = function() {
        let overlay;

        overlay = new google.maps.OverlayView();
        overlay.draw = function() {};
        overlay.setMap(map);

        $('#map').click(function(event) {
          let point = new google.maps.Point(event.pageX, event.pageY);
          let location =
          overlay.getProjection().fromContainerPixelToLatLng(point);

          stopHref =
          $('#map').children(0).children(1)[1]
            .getElementsByTagName('a')[0].getAttribute('href');

          // function convertLatLon()

          clickLat = stopHref.slice(32, stopHref.indexOf(','));
          clickLong = stopHref.slice(stopHref.indexOf(',') + 1,
            stopHref.indexOf('z') - 1);

          // New xhr request for latlong
          $.ajaxSetup({
            headers: {
              'x-requested-with': 'whatever.com'
            }
          });

          const $xhrlat = $.getJSON(`https://cors-anywhere.herokuapp.com/api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key=TEST&lat=${clickLat}&lon=${clickLong}&radius=70`);

          // console.log($xhrlat)
          $xhrlat.done(function(data) {
            const resp = $xhrlat.responseText;

            if (resp.indexOf('"id"') !== -1) {
              const cello = resp.slice(resp.indexOf('"id"') + 6,
                resp.indexOf('"id"') + 13);

              let thisorthat = function() {
                if (cello !== null) {
                  console.log('this is working');
                  $.ajaxSetup({
                    headers: {
                      'x-requested-with': 'whatever.com'
                    }
                  });

                  const $powxhr = $.getJSON(`https://cors-anywhere.herokuapp.com/api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/${cello}.json?key=TEST`);
                  
                  $powxhr.done(function(data) {
                    current = data.currentTime;
                    stopId = data;
                    hello();
                  });
                }
                else
                {
                  return;
                }
              }();
            }
          });
          $xhrlat.fail(function(jqXHR, textStatus, errorThrown) {
            // console.log('fail' + ' ' + $xhrlat.status);
            console.log(`${jqXHR} ${textStatus} ${errorThrown}`);
          });
        });
      };

      initMap();
      returnCord();
    })
    .fail(console.log(loadgMapApi.status));

    // Below is the stopId JSON pull
    $.ajaxSetup({
      headers: {
        'x-requested-with': 'whatever.com'
      }
    });
  });
})();
