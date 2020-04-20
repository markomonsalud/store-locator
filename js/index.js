var map;
var markers = [];
var infoWindow;

// same as window.onload = function() {}
window.onload = () => {
    displayStores();

}

function initMap() {
    var losAngeles = {
        lat: 34.063380, 
        lng: -118.358080
    };
    var melbourne = {
        lat: -37.840935, 
        lng: 144.946457
    };
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        mapTypeId: 'roadmap'
    });

    showStoresMarkers();
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function displayStores() {

    var storesHtml = '';
    for (var [index, store] of stores.entries()){
        let address = store['addressLines'];
        let phoneNumber = store['phoneNumber'];

        storesHtml += `
            <div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phoneNumber}</div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${++index}
                    </div>
                </div>
            </div>
        `
        document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}

function showStoresMarkers() {
    var bounds = new google.maps.LatLngBounds();
    for (var [index, store] of stores.entries()){

        var name = store["name"];
        var address = store["addressLines"][0];
        var latlng = new google.maps.LatLng(
             store["coordinates"]["latitude"],
             store["coordinates"]["longitude"]);
        bounds.extend(latlng);
        createMarker(latlng, name, address,++index);
    }
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address,index) {

    var html = "<b>" + name + "</b><br/>" + address;
    var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: latlng,
        label: index.toString()
    });
    // marker.addListener('click', toggleBounce);
    // google.maps.event.addListener(marker, 'click', function() {
    //     infoWindow.setContent(html);
    //     infoWindow.open(map, marker);
    //   });
      markers.push(marker);
}