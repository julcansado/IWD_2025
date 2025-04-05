// Carregar dado percurso afternoon ride
var afternoon_ride_katia = ee.FeatureCollection("users/julcansado/GDE/afternoon_ride_kasia_niewiadoma");
Map.centerObject(afternoon_ride_katia) // Zoom / centralização do mapa

// Degree of Urbanization 
var GHSL = ee.Image("JRC/GHSL/P2023A/GHS_SMOD_V2-0/2025")
var smod_vis = {min: 10,max: 30,palette: ['0a9396', '94d2bd','e9d8a6', 'ee9b00','ca6702', 'bb3e03', 'ae2012', '9b2226']};
Map.addLayer(GHSL,smod_vis,'GHS_SMOD: Degree of Urbanization - 2025')

Map.addLayer(afternoon_ride_katia.style({color:'005f73'}), {},'Afternoon Ride - Katia'); // Adicionando percurso aqui para aparecer no mapa

// Dicionário com valores e significados
var dic = ee.Dictionary({ //-200: 'No data',
            10: 'Water',
            11: 'Very low density rural',
            12: 'Low density rural',
            13: 'Rural cluster',
            21: 'Suburban or peri-urban',
            22: 'Semi-dense urban cluster',
            23: 'Dense urban cluster',
            30: 'Urban centre',
})

// Região a ser analisada
var buffer = afternoon_ride_katia.geometry().buffer(5000)
Map.addLayer(ee.FeatureCollection(buffer).style({color:'005f73', fillColor:'005f7360'}),{}, 'Região Analisada')

// Cálculo da densidade mínima e máxima na região analisada
var minmax_urban_density =  GHSL.reduceRegion({reducer: ee.Reducer.minMax(), geometry: buffer, scale: 1000}) 
print("A menor densidade encontrada foi: " + dic.get(minmax_urban_density.get('smod_code_min')).getInfo())
print("A maior densidade encontrada foi: " +  dic.get(minmax_urban_density.get('smod_code_max')).getInfo())

// Cálculo da densidade média presente na região analisada
var mode_urban_density =  GHSL.reduceRegion({reducer: ee.Reducer.mode(), geometry: buffer, scale: 1000}) 
print("A densidade mais presente na região de treino é: " + dic.get(ee.Number(mode_urban_density.get('smod_code')).round().int()).getInfo())

