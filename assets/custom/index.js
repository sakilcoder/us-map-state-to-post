
var map = L.map('map').setView([50.0, -124.3], 3);
var us_countyLayer;
var us_cityLayer;
var us_zipLayer;
var tempcityLayer;

let selectedStates=[];
let selectedCounties=[];
let selectedCities=[];

let filteredCounties=[];
let filteredCities=[];
let filteredZips=[];

var stateLayer = L.geoJSON(us_states, {
    style: styleState,
    onEachFeature: onEachState,
}).addTo(map);
    
L.easyButton( 'fa-home fa-lg', function(){
    map.setView([50.0, -124.3], 3);

    if(stateLayer){
        map.removeLayer(stateLayer);
    }
    stateLayer = L.geoJSON(us_states, {
        style: styleState,
        onEachFeature: onEachState,
    }).addTo(map);
    if(us_countyLayer){
        map.removeLayer(us_countyLayer);
    }
    if(us_cityLayer){
        map.removeLayer(us_cityLayer);
    }
    if(us_zipLayer){
        map.removeLayer(us_zipLayer);
    }
    if(tempcityLayer){
        map.removeLayer(tempcityLayer);
    }

    selectedStates=[];
    selectedCounties=[];
    selectedCities=[];

    let filteredCounties=[];
    let filteredCities=[];
    let filteredZips=[];


}).addTo(map)

let btnFilter = L.easyButton( 'fa-eye fa-lg', function(){
    
    if(selectedStates.length>0){
        tempcityLayer = L.geoJSON(filteredCities, {style: styleZipTemp}).addTo(map);
        us_countyLayer = L.geoJson(filteredCounties, {style: styleCounty, onEachFeature: onEachCounty}).addTo(map);
        map.fitBounds(us_countyLayer.getBounds());
        map.removeLayer(stateLayer)
    }

    if(selectedCounties.length>0){
        us_cityLayer = L.geoJson(filteredCities, {style: styleCity, onEachFeature: onEachCity}).addTo(map);
        if(us_cityLayer.getLayers().length>0){
            map.fitBounds(us_cityLayer.getBounds());
            map.removeLayer(us_countyLayer)

            if(tempcityLayer){
                map.removeLayer(tempcityLayer);
            }
        }

    }

    if(selectedCities.length>0){
        us_zipLayer = L.geoJson(filteredZips, {style: styleZip, onEachFeature: onEachZip}).addTo(map);
        console.log(us_zipLayer.getLayers().length);
        if(us_zipLayer.getLayers().length>0){
            map.fitBounds(us_zipLayer.getBounds());
            map.removeLayer(us_cityLayer)
        }
        
    }

    selectedStates=[];
    selectedCounties=[];
    selectedCities=[];

    btnFilter.disable();

}).addTo(map)

btnFilter.disable();

function countyFilter(featureCounty) {
    if (selectedStates.includes(featureCounty.properties.STATE_NAME)) return true
}

function cityFilter(featureCity) {
    if (selectedStates.includes(featureCity.properties.STATE_NAME)) return true
}

