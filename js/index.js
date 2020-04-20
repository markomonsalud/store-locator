//            var map;
var marker;

// same as window.onload = function() {}
window.onload = () => {
    displayStores();
}

function initMap() {
    var melbourne = {
        lat: -37.840935, 
        lng: 144.946457
    };
    var store1 = {
        lat: -37.74964,
        lng: 144.861553
    }
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: melbourne,
        zoom: 12,
        mapTypeId: 'roadmap'
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: store1
    });
    marker.addListener('click', toggleBounce);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function displayStores(){

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