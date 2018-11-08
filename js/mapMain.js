function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
};
var gmarkers = [];
var markers = [];
var gmarkersTop = [];
var markersTop = [];
var markersUrl = [];
var markersUrlTop = [];
var filterSwitch = [1, 1, 1, 1, 1, 1];

function initMap() {
    var lilis = [];
    var imglilitype = ['', '../img/icon_red.png', '../img/icon_blue.png', '../img/icon_lightblue.png', '../img/icon_yellow.png', '../img/icon_lime.png'];
    $.getJSON('https://spreadsheets.google.com/feeds/list/1ihryY0swLxIIB6DqRFIP7COvNwg9Ejx50oqKKi7TnGs/1/public/values?alt=json', function (dataLog) {
            var ltype = GetURLParameter("liliType");

            //            console.log("gJson");
            var dataAmount = dataLog.feed.entry.length;
            console.log(dataAmount);
            for (var i = 0; i < dataAmount; i++) {
                if (i == dataAmount - 1) $(".lilisSet:first").remove();
                var aZ = dataLog.feed.entry[i].gsx$z.$t;
                var aName = dataLog.feed.entry[i].gsx$liliname.$t;
                var aLatitude = dataLog.feed.entry[i].gsx$lati.$t;
                var aLongtitude = dataLog.feed.entry[i].gsx$longi.$t;
                var alilitype = dataLog.feed.entry[i].gsx$lilitype.$t;
                var aWhere = dataLog.feed.entry[i].gsx$wherecome.$t;
                var aWhen = dataLog.feed.entry[i].gsx$whencome.$t;
                var aI = i + 1;
                var avatarImg = "./img/avatar/" + aI + ".png";
                //                lilis[i] = [aName, aLatitude, aLongtitude, alilitype, aZ];
                //                console.log(lilis[i]);

                if (ltype == alilitype || ltype == null) {
                    $(".lilisSet:first").clone().appendTo("#liliList");
                    $(".lilisSet:last").attr("href", "./lili.html?liliID=" + aZ);
                    $(".lilisSet:last .liName").text(aName);
                    $(".lilisSet:last .liImg").attr("src", avatarImg);
                    $(".lilisSet:last .tagSet").html(aWhen + "  " + aWhere + "<br/>");
                    if (alilitype == 1) $(".lilisSet:last .tagSet").append("<img src='./img/mark_1.png'/>築城記憶點");
                    if (alilitype == 2) $(".lilisSet:last .tagSet").append("<img src='./img/mark_2.png'/>築城學校");
                    if (alilitype == 3) $(".lilisSet:last .tagSet").append("<img src='./img/mark_3.png'/>築城藝術家");
                }

                var marker = new google.maps.Marker({
                    url: './lili.html?liliID=' + aZ,
                    position: {
                        lat: parseFloat(aLatitude),
                        lng: parseFloat(aLongtitude)
                    },
                    map: map,
                    title: aName,
                    icon: {
                        url: imglilitype[alilitype],
                        //url: './img/avatar/' + aZ + '.png',
                        scaledSize: new google.maps.Size(70, 100)
                    },

                });
                var markerTop = new google.maps.Marker({
                    url: './lili.html?liliID=' + aZ,
                    position: {
                        lat: parseFloat(aLatitude),
                        lng: parseFloat(aLongtitude)
                    },
                    map: map,
                    title: aName,
                    icon: {
                        //url: imglilitype[alilitype],
                        url: './img/avatar_circle/' + aZ + '.png',
                        scaledSize: new google.maps.Size(52, 52),
                        anchor: new google.maps.Point(26, 95),
                    },

                });
                //                marker2.bindTo("position", marker);
                markers.push(alilitype);
                gmarkers.push(marker);
                markersTop.push(alilitype);
                gmarkersTop.push(markerTop);
                markersUrl.push(aZ);
                markersUrlTop.push(aZ);

                marker.addListener('click', function () {
                    location.href = this.url;
                });
                markerTop.addListener('click', function () {
                    location.href = this.url;
                });
            } //end for
            checkLiliType();
        } //end function data
    ); //end get JSON

    var myLatLng = {
        lat: 24.9943068,
        lng: 121.313817
    };


    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 24.9943068,
            lng: 121.313817
        },
        zoom: 15,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#accfe2"
      }
    ]
  },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8ec3b9"
      }
    ]
  },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1a3646"
      }
    ]
  },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
      }
    ]
  },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#64779e"
      }
    ]
  },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
      }
    ]
  },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#334e87"
      }
    ]
  },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#accfe2"
      }
    ]
  },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e7aea2"
      }
    ]
  },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6f9ba5"
      }
    ]
  },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
      }
    ]
  },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#94c792"
      }
    ]
  },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3C7680"
      }
    ]
  },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e7aea2"
      }
    ]
  },
            {
                "featureType": "poi.school",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4b89b1"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
      },
                    {
                        "weight": 0.5
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
      }
    ]
  },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
      },
                    {
                        "weight": 2
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#b0d5ce"
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#023e58"
      }
    ]
  },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
      }
    ]
  },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
      }
    ]
  },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dddddd"
      },
                    {
                        "weight": 3
      }
    ]
  },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e7aea2"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#9dd5f4"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#4e6d70"
      }
    ]
  }
]
    });
}

function switchFilter(ind) {
    filterSwitch[ind] *= -1;
    for (i = 0; i < markers.length; i++) {
        if (filterSwitch[ind] < 0) {
            if (markers[i] == ind) gmarkers[i].setVisible(false);
            if (markersTop[i] == ind) gmarkersTop[i].setVisible(false);
            $("#navBar a:nth-child(" + ind + ")").addClass("switchOff");
        } else {
            if (markers[i] == ind) gmarkers[i].setVisible(true);
            if (markersTop[i] == ind) gmarkersTop[i].setVisible(true);
            $("#navBar a:nth-child(" + ind + ")").removeClass("switchOff");
        }
    }
}

function checkLiliType() {
    var litype = GetURLParameter("liliType");
    if (litype != null) {
        console.log(litype);
        for (var z = 1; z <= 5; z++) {
            if (z != litype) {
                switchFilter(z);
            }
        }
    }
}
