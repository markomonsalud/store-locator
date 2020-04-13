//            var map;

function initMap() {
    var melbourne = {
        lat: -37.840935, 
        lng: 144.946457
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: melbourne,
        zoom: 11,
        mapTypeId: 'roadmap',
    });
}