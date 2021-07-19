$(document).ready(function () {

	/* ////////////////// RUTA API ////////////////// */

	//Ruta servidor y carpeta
	var nombreHost = document.location.hostname; //Nombre del host (Ejemplo: localhost)
	var localizacionIndexHTML = window.location.pathname; //Ruta del index.html (Ejemplo: /m10.2-leafletFiltres/index.html)
	var carpetaProyecto = localizacionIndexHTML.substring(0, localizacionIndexHTML.lastIndexOf('/')); //Con esto cogemos lo que vaya antes de la segunda / (por ejemplo: /m10.2-leafletFiltres)

	var pathAPI = `http://${nombreHost}${carpetaProyecto}/api/apiRestaurants.php`; //Ruta de la API

	//console.log(pathAPI);
	
	
	
	/* ////////////////// CREACIÓN MAPA ////////////////// */

	var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 9);
	//map.locate({setView: true, maxZoom: 17});
		
	var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

	//en el clusters almaceno todos los markers
	var markers = L.markerClusterGroup();
	var data_markers = [];	


//Por cada elemento de data (cada objeto restaurante)
			/*$.each(data, function (index, element) {
				//Creamos marcador
				marker = L.marker([element.lat, element.lng]);

				//AñadimospopUp al marcador
				marker.bindPopup(`<b>${element.name}</b><br><br>
				${element.address}<br>`);
				
				//
			});  */

	/* ////////////////// FASE 3.1 ////////////////// */	

	function onMapLoad() {
		console.log("Mapa cargado");

		let restaurantTypes = [];
		let restaurantTypesNoRepeated = [];

		let kindOfFoodHasComa = false;

		$.getJSON(pathAPI, function (data) {

			// 1) Relleno el data_markers con una petición a la api
			$.each(data, function (index, element) { 
				 data_markers.push(element);
			});			  
			
			
			// 2) Añado de forma dinámica en el select los posibles tipos de restaurantes						
			
			$.each(data_markers, function (index, element) {// Recorremos el array data_markers y guardamos todos los tipos de restaurantes en un nuevo array
				for (let i = 0; i <= element.kind_foot.length; i++){
					if (element.kind_foot[i] == ",") {
						kindOfFoodHasComa = true;
						break;
					}
				}
				
				if (kindOfFoodHasComa == true) {
					let arrStringSplited = element.kind_foot.split(",");
					$.each(arrStringSplited, function (index, element) { 
						restaurantTypes.push(element);
					});
				}
				else {
					restaurantTypes.push(element.kind_foot);
				}

				kindOfFoodHasComa = false;
			});

			 // Filtramos elementos repetidos de data_markers
			restaurantTypesNoRepeated = restaurantTypes.filter((value, index) => {
				return restaurantTypes.indexOf(value) === index;
				//El método indexOf retorna el índice de la PRIMERA ocurrencia de un elemento en un array
				//Si el índice del elemento que estamos iterando con filter es igual al índice de la primera ocurrencia de ese elemento (arrValidaciones.indexOf(value)), se cumplirá la condición de filter para que nos retorne el valor en el nuevo array que se está generando. Si el índice del elemento que estamos iterando con filter es diferente al índice de la primera ocurrencia de ese elemento(arrValidaciones.indexOf(value)), significa que es una repetición.
			});

			
			// 3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
			
		});

	}
		



//Agregamos nuevo marcador y ///NIVEL 3 /// le añadimos mi icono
  //marker = L.marker([latLng.lat, latLng.lng]).addTo(mapFase1); 

    //Agregamos popUp al nuevo marcador, queremos que se abra automáticamente
    //marker.bindPopup("<b>Mis coordenadas son:</b><br><br>Lat: " + latLng.lat + "<br>Lng: " + latLng.lng).openPopup();


	/* ////////////////// EVENTO ON CHANGE PARA FILTAR MARCADORES ////////////////// */

	$('#kind_food_selector').on('change', function() {
	console.log(this.value);
	render_to_map(data_markers, this.value);
	});



	/* ////////////////// FASE 3.2 ////////////////// */

	function render_to_map(data_markers,filter){
		
		/*
		FASE 3.2
			1) Limpio todos los marcadores
			2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
		*/	
				
	}	
}); 
