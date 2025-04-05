// Carregar dado do percurso WTM
var treino_WTM = ee.FeatureCollection("users/julcansado/GDE/treino_WTM_fabi_canedo");
Map.addLayer(treino_WTM, {}, 'Treino WTF - Fabi Canedo');
Map.centerObject(treino_WTM); // Zoom / centralização do mapa

// Definir o que consideramos "próximo" - neste caso 2km
var proximo = 2000;
var buffer_WTM = treino_WTM.geometry().buffer(proximo);
Map.addLayer(buffer_WTM, {}, 'Região até ' + proximo + ' metros do percurso');

// Carregar equipamentos esportivos
var equipamentos_esporte = ee.FeatureCollection('users/julcansado/GDE/equipamentos_esportivos_SP');
Map.addLayer(equipamentos_esporte, {}, 'Todos os equipamentos esportivos', false);

var equipamentos_esporte_proximos = equipamentos_esporte.filterBounds(buffer_WTM); // Filtrar para região de interesse
Map.addLayer(equipamentos_esporte_proximos, {}, 'Equipamentos esportivos próximos');

// Mostrar informações obtidas
print('Foram encontrados ', equipamentos_esporte_proximos.size().getInfo() +
      ' equipamentos esportivos até ', proximo + 'm de distância do percurso das WTMs')

print('As categorias dos equipamentos encontrados são:', equipamentos_esporte_proximos.aggregate_array('layer'))
