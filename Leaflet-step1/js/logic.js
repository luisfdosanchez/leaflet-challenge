var mymap = L.map('map').setView([0, -0.2], 2);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: API_KEY
}).addTo(mymap);

myurl="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(myurl, d=>{
    let EQdata=d.features;  
    console.log(EQdata);
    EQdata.forEach(m=>{
        if(m.geometry.coordinates){
            let kolor="";
            if (m.properties.mag<=1){
                kolor="chartreuse"
            }
            else if (m.properties.mag<=2){
                kolor="greenyellow";
            }
            else if (m.properties.mag<=3){
                kolor="gold";
            }
            else if (m.properties.mag<=4){
                kolor="orange";
            }
            else if (m.properties.mag<=5){
                kolor="red";
            }
            else if (m.properties.mag>5){
                kolor="crimson";
            }

            var sizze=m.properties.mag*15000;
            L.circle([m.geometry.coordinates[1],m.geometry.coordinates[0]], {
                color: kolor,
                fillColor: kolor,
                fillOpacity: 0.35,
                radius: sizze
            }
            ).bindPopup(`<h3>Place: ${(m.properties.place)}</h3><hr><h3>Magnitude: ${(m.properties.mag)}</h3><hr><h3>Date: ${(Date(m.properties.time))}</h3>`)
            .addTo(mymap)
        }   
    })
});

var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        let kolor="";
        if (i===0){
            kolor="chartreuse"
        }
        else if (i===1){
            kolor="greenyellow";
        }
        else if (i===2){
            kolor="gold";
        }
        else if (i===3){
            kolor="orange";
        }
        else if (i===4){
            kolor="red";
        }
        else if (i===5){
            kolor="crimson";
        }
        div.innerHTML +=
            '<i style="background:' + kolor + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(mymap);

