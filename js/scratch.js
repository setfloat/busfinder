// development file for current project.

// Current project: build function for populating HTML bus data into card
// Focus: Object Literals

<!-- example cards below will be populated -->
<div class="col s12 m6 l4"> <!-- Template bus card begin -->
  <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="http://lorempixel.com/400/300/">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>
</div>                <!-- Template bus card end

<script>



$('.addCard').append(`<div class="col s12 m6 l4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="${_____________}"></div><div class="card-content"><span class="card-title activator grey-text" text-darken-4>${____CARDTITLE____}<i class="material-icons right">more-vert</i></span></div></div></div>`);


$('.hello').append(`<tr><td>${business.name[i].name}</td><td>${business.rating[i].ratings}</td></tr>`);





~/P/w/http $ http -v GET 'http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_26340.json?key=TEST'
var oba = 'http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_26340.json?key=TEST';

var data = oba."data";

var entry = data."entry";
var arrivals = entry."arrivalsAndDepartures";
var predicted = arrivals."predictedArrivalTime";
var predicted.time = predicted.value;


if (predicted.time === 0){return "NOW"};
