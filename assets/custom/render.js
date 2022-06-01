function onEachState(feature, layer) {

    var popup = L.popup();
    popup.setContent(feature.properties.STATE_NAME);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
        this.setStyle({
            'fillColor': '#FF6B6B'
        });
    });

    layer.on('mouseout', function(e) {
        e.target.closePopup();
        this.setStyle({
            'fillColor': '#009DAE'
        });
    });

    layer.on('mousemove', function (e) {
        popup.setLatLng(e.latlng).openOn(map);
    });

    layer.on('click', function (event) {

        if(selectedStates.includes(feature.properties.STATE_NAME)){
            console.log("exists. remove selected");
            var index = selectedStates.indexOf(feature.properties.STATE_NAME);
            if (index !== -1) {
                selectedStates.splice(index, 1);
            }
            this.setStyle(styleState);
            
        } else{
            console.log("does not exists. add selected");
            selectedStates.push(feature.properties.STATE_NAME);
            this.setStyle(styleSelect);
        }
        console.log(selectedStates);

        if(selectedStates.length>0)
            btnFilter.enable();
        else{
            btnFilter.disable();
        }

        filteredCounties = _.filter(us_counties.features, function (county) {
            return selectedStates.indexOf(county.properties.STATE_NAME) !== -1; // -1 means not present
          });
        filteredCities = _.filter(us_cities.features, function (city) {
            return selectedStates.indexOf(city.properties.STATE_NAME) !== -1;
          });
        
        if(us_countyLayer){
            map.removeLayer(us_countyLayer);
        }
    });
    
}
function onEachCounty(feature, layer) {
    var popup = L.popup();
    popup.setContent(feature.properties.NAME);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
        this.setStyle({
            'fillColor': '#FFD93D'
        });
    });

    layer.on('mouseout', function(e) {
        e.target.closePopup();
        this.setStyle({
            'fillColor': '#FD5D5D'
        });
    });

    layer.on('mousemove', function (e) {
        popup.setLatLng(e.latlng).openOn(map);
    });

    layer.on('click', function (event) {

        if(selectedCounties.includes(feature.properties.FIPS)){
            console.log("exists. remove selected");
            var index = selectedCounties.indexOf(feature.properties.FIPS);
            if (index !== -1) {
                selectedCounties.splice(index, 1);
            }
            this.setStyle(styleState);
            
        } else{
            console.log("does not exists. add selected");
            selectedCounties.push(feature.properties.FIPS);
            this.setStyle(styleSelect);
        }
        console.log(selectedCounties);

        if(selectedCounties.length>0)
            btnFilter.enable();
        else{
            btnFilter.disable();
        }

        filteredCities = _.filter(us_cities.features, function (city) {
            return selectedCounties.indexOf(city.properties.FIPS) !== -1;
        });

        console.log(filteredCities);

    });
}

function onEachCity(feature, layer) {
    
    var popup = L.popup();
    popup.setContent(feature.properties.NAME10);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
        this.setStyle({
            'fillColor': '#FFD93D'
        });
    });

    layer.on('mouseout', function(e) {
        e.target.closePopup();
        this.setStyle({
            'fillColor': '#00B4D8'
        });
    });

    layer.on('mousemove', function (e) {
        popup.setLatLng(e.latlng).openOn(map);
    });

    layer.on('click', function (event) {

        if(selectedCities.includes(feature.properties.AFFGEOID10)){
            console.log("exists. remove selected");
            var index = selectedCities.indexOf(feature.properties.AFFGEOID10);
            if (index !== -1) {
                selectedCities.splice(index, 1);
            }
            this.setStyle(styleState);
            
        } else{
            console.log("does not exists. add selected");
            selectedCities.push(feature.properties.AFFGEOID10);
            this.setStyle(styleSelect);
        }
        console.log(selectedCities);

        if(selectedCities.length>0)
            btnFilter.enable();
        else{
            btnFilter.disable();
        }

        filteredZips = _.filter(us_zips.features, function (zip) {
            return selectedCities.indexOf(zip.properties.AFFGEOID10) !== -1;
        });

        console.log(filteredZips);

    });
}

function onEachZip(feature, layer) {
    
    var popup = L.popup();
    popup.setContent(feature.properties.GEOID10);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
        this.setStyle({
            'fillColor': '#FFD93D'
        });
    });
    layer.on('mouseout', function(e) {
        e.target.closePopup();
        this.setStyle({
            'fillColor': '#00C897'
        });
    });

    layer.on('mousemove', function (e) {
        popup.setLatLng(e.latlng).openOn(map);
    });
    
}
