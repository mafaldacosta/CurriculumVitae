//localização no mapa
let map = L.map('mapa', {center: [41.163,-8.621], zoom: 12, zoomControl: false});
 
//zoom
        var zoomHome = L.Control.zoomHome({
            position:'topleft',
            zoomHomeTitle: 'ZoomInicial'
        });
        zoomHome.addTo(map);

//basemaps
        var basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{});
        var basemap2= L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {maxZoom: 20,attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
        basemap.addTo(map);


//icons
        var icon_ebses = L.icon({
            iconUrl:'imgs/escola_icon.jpg',
            iconSize: [15, 15],
            shadowSize: [50, 64],
        });

        var icon_trotis = L.icon({
            iconUrl:'imgs/trotis_icon.jpg',
            iconSize: [15, 15],
            shadowSize: [50, 64],
        });

        var icon_bici = L.icon({
            iconUrl:'imgs/bici_icon.png',
            iconSize: [20, 20],
            shadowSize: [50, 64],
        });

        var icon_wiki = L.icon({
            iconUrl:'imgs/wiki_icon.jpg',
            iconSize: [15, 15],
            shadowSize: [50, 64],
            popupAnchor: [12, -90]
        });

        var icon_wiki2 = L.icon({
            iconUrl:'imgs/wiki_icon.jpg',
            iconSize: [15, 15],
            shadowSize: [50, 64],
            popupAnchor: [1, -34]
        });

//geoJSONS

        var theconcelho = L.geoJSON(concelho, {
            color: '#ffe6e6',
            weight: 3,
            dashArray: '12 8 12',
        });
        theconcelho.bindTooltip('Concelho do Porto');
        theconcelho.addTo(map);       

        var theppartilha = L.geoJSON(ppartilha, {pointToLayer: icontrotis});
        function icontrotis(geoJSON, latlng) {
            var att=geoJSON.properties;
            return L.marker(latlng, {radius:4, icon: icon_trotis}).bindPopup("<h5>Morada: "+ att.toponimo)
        }

        thebicicletarios = L.geoJSON(bicicletarios,  {pointToLayer: iconbici});
        function iconbici(geoJSON, latlng) {
            var att=geoJSON.properties;
            return L.marker(latlng, {radius:4, icon: icon_bici}).bindPopup("<h5>Toponimia: "+ att.PopupInfo)
        }
        trilho_1 = L.geoJSON(trilho,{pointToLayer: iconwiki});
        function iconwiki(geoJSON, latlng) {
            var att=geoJSON.properties;
            return L.marker(latlng, {radius:4, icon: icon_wiki}).bindPopup("<h5>Morada: "+ att.Name + '<img src=" ' + att.PopupInfo +' ">');}
        
        trilho_2 = L.geoJSON(trilho2,{pointToLayer: iconwiki});
        function iconwiki(geoJSON, latlng) {
            var att=geoJSON.properties;
            return L.marker(latlng, {radius:4, icon: icon_wiki}).bindPopup("<h5>Morada: "+ att.Name + '<img src=" ' + att.PopupInfo +' ">');}
        
        escolas_ebses = L.geoJSON(escolas, 
        {pointToLayer: iconebses});
        function iconebses(geoJSON, latlng) {
            var att=geoJSON.properties;
            return L.marker(latlng, {radius:4, icon: icon_ebses}).bindPopup("<h5>Nome da escola: "+ att.Instituica)
        }

        var areas5 = L.geoJSON(areas_5, {color: "#32CD32"});
        areas10 = L.geoJSON(areas_10, {color: "#FFFF00"});
        areas15 = L.geoJSON(areas_15, {color: "#FF0000"});

        var pop = L.geoJSON(jovens, {style: style})
        
    

//heatmap1
        geoJson2heat = function(geojson) {
            return geojson.features.map(function(feature) {
            return [parseFloat(feature.geometry.coordinates[1]), parseFloat(feature.geometry.coordinates[0])];
            });
            }

            var geoData = geoJson2heat(ppartilha, 1);
            var heatMap = new L.heatLayer(geoData,{minOpacity: 0.4,radius: 15, gradient: {0.4: 'blue', 0.5: 'lime', 0.6: 'red'}});

//
//heatmap2
geoJson2heat = function(geojson) {
            return geojson.features.map(function(feature) {
            return [parseFloat(feature.geometry.coordinates[1]), parseFloat(feature.geometry.coordinates[0])];
            });
            }

            var geoData = geoJson2heat(bicicletarios, 1);
            var heatMap2 = new L.heatLayer(geoData,{minOpacity: 0.4,radius: 15, gradient: {0.4: 'blue', 0.5: 'lime', 0.6: 'red'}});

//
//heatmap3
geoJson2heat = function(geojson) {
            return geojson.features.map(function(feature) {
            return [parseFloat(feature.geometry.coordinates[1]), parseFloat(feature.geometry.coordinates[0])];
            });
            }

            var geoData = geoJson2heat(escolas, 1);
            var heatMap3 = new L.heatLayer(geoData,{minOpacity: 0.4,radius: 15, gradient: {0.4: 'blue', 0.5: 'lime', 0.6: 'red'}});

//

//densidade populacional//

//cores densidade
    function getColor(d) {
        return d > 435  ? '#F50000' :
        d > 391 ? '#F53D00' :
        d > 346  ? '#F57A00' :
        d > 309   ? '#FFF500' :
        d > 268   ? '#F5B800' :
              '';
    }

//atribuir cor à densidade
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.dens_pop),
            weight: 2, 
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    
//adicionar a legenda da densidade
        map.on('overlayadd', function(eventLayer){
        if (eventLayer.name === 'Densidade Populacional (14 aos 19 anos)'){
        map.addControl(legend);
        } 
        });

        map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Densidade Populacional (14 aos 19 anos)'){
        map.removeControl(legend);
        } 
        }); 

        var legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 268, 309, 346, 391, 435],
                labels = [];

            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i +1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }
            return div;
        };

//escala
        var scale = L.control.scale()
        scale.addTo(map)

//todas as layers
        var base = {'Mapa Imagery': basemap, 'Mapa Open Street Map': basemap2};
        var shapes = {
            'Pontos de Partilha':theppartilha,
            'Heatmap Pontos de Partilha': heatMap,
            'Bicicletários': thebicicletarios,
            'Heatmap Bicicletários': heatMap2,
            'Escolas EBS e ES': escolas_ebses,
            'Heatmap EBS e ES': heatMap3,
            'Densidade Populacional (14 aos 19 anos)': pop,
            'Áreas 5 minutos': areas5, 
            'Áreas 10 minutos':areas10, 
            'Áreas 15 minutos':areas15,
            'Trilho wikiloc nº1': trilho_1,
            'Trilho wikiloc nº2': trilho_2};
        L.control.layers(base, shapes).addTo(map);

