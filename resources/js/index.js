var map;
var markers = [];
var infoWindow;

const mapStyle = [{
  "elementType": "geometry",
  "stylers": [{
    "color": "#ebe3cd"
  }]
},
{
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#523735"
  }]
},
{
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#f5f1e6"
  }]
},
{
  "featureType": "administrative",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#c9b2a6"
  }]
},
{
  "featureType": "administrative.land_parcel",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#dcd2be"
  }]
},
{
  "featureType": "administrative.land_parcel",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#ae9e90"
  }]
},
{
  "featureType": "landscape.natural",
  "elementType": "geometry",
  "stylers": [{
    "color": "#dfd2ae"
  }]
},
{
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [{
    "color": "#dfd2ae"
  }]
},
{
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#93817c"
  }]
},
{
  "featureType": "poi.business",
  "stylers": [{
    "visibility": "off"
  }]
},
{
  "featureType": "poi.park",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#a5b076"
  }]
},
{
  "featureType": "poi.park",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
},
{
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#447530"
  }]
},
{
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "color": "#f5f1e6"
  }]
},
{
  "featureType": "road.arterial",
  "elementType": "geometry",
  "stylers": [{
    "color": "#fdfcf8"
  }]
},
{
  "featureType": "road.arterial",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
},
{
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#f8c967"
  }]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#e9bc62"
  }]
},
{
  "featureType": "road.highway",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
},
{
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry",
  "stylers": [{
    "color": "#e98d58"
  }]
},
{
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#db8555"
  }]
},
{
  "featureType": "road.local",
  "stylers": [{
    "visibility": "off"
  }]
},
{
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#806b63"
  }]
},
{
  "featureType": "transit.line",
  "elementType": "geometry",
  "stylers": [{
    "color": "#dfd2ae"
  }]
},
{
  "featureType": "transit.line",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#8f7d77"
  }]
},
{
  "featureType": "transit.line",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#ebe3cd"
  }]
},
{
  "featureType": "transit.station",
  "elementType": "geometry",
  "stylers": [{
    "color": "#dfd2ae"
  }]
},
{
  "featureType": "water",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#b9d3c2"
  }]
},
{
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#92998d"
  }]
}
];

function initMap() {
  var losAngeles = {
    lat: 34.063380,
    lng: -118.358080
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: 'roadmap',
    styles: mapStyle
  });
  infoWindow = new google.maps.InfoWindow();

 searchStores();
 setOnKeyUpEnterListener();
}

function displayStores(stores) {

  var storesHtml = '';
  for (var [index, store] of stores.entries()) {
    let address = store['addressLines'];
    let phoneNumber = store['phoneNumber'];

    storesHtml += `
      <div class="store-container">
        <div class="store-container-background">
          <div class="store-info-container">
            <div class="store-address">
              <span>${address[0]}</span>
              <span>${address[1]}</span>
            </div>
            <div class="store-phone-number">
            ${phoneNumber}
            </div>
          </div>
          <div class="store-number-container">
            <div class="store-number">
              ${++index}
            </div>
          </div>
        </div>
      </div>
    `
    document.querySelector('.stores-list').innerHTML = storesHtml;
  }
}

function showStoresMarkers(stores) {
  var bounds = new google.maps.LatLngBounds();
  for (var [index, store] of stores.entries()) {
    var name = store["name"];
    var address = store["addressLines"][0];
    var latlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]);
    var phoneNumber = store["phoneNumber"];
    var openStatusText = store["openStatusText"];

    bounds.extend(latlng);
    createMarker(latlng, name, address, ++index, phoneNumber, openStatusText);
  }

  map.fitBounds(bounds);
}

function createMarker(latlng, name, address, index, phoneNumber, openStatusText) {

  var html = `
      <div class="store-info-window">
        <div class="store-info-name">
          ${name}
        </div>
        <div class="store-info-status">
          ${openStatusText}
        </div>
        <div class="store-info-address">
          <i class="material-icons">location_on</i>${address}
        </div>
        <div class="store-info-phone">
          <i class="material-icons">phone</i>${phoneNumber}
        </div>
      </div>
    `;

  var marker = new google.maps.Marker({
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: latlng,
    label: index.toString()
  });

  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
    map.setCenter(markers[index].getPosition());
  });
  markers.push(marker);
}

function setOnClickListener() {
  var storeElements = document.querySelectorAll('.store-container');
  storeElements.forEach(function(elem, index){
    elem.addEventListener('click', function(){
      new google.maps.event.trigger(markers[index],'click');
    })
  })
}

function setOnKeyUpEnterListener() {
  var input = document.getElementById('zip-code-input');
  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      searchStores();
    }
  });  
}

function searchStores() {
  var foundStores = [];
  var zipCode = document.getElementById('zip-code-input').value;
  if(zipCode){
    for (var store of stores) {
      var postal = store['address']['postalCode'].substring(0,5);
      if (postal == zipCode) {
        foundStores.push(store);
      }
    }  
  } else {
    foundStores = stores;
  }
  clearLocations();
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener();
}

function clearLocations() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}