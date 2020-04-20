//            var map;
var marker;

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
