$(document).ready(function () {

	/* ////////////////// RUTA API ////////////////// */

	//Ruta servidor y carpeta
	var nombreHost = document.location.hostname; //Nombre del host (Ejemplo: localhost)
	var localizacionIndexHTML = window.location.pathname; //Ruta del index.html (Ejemplo: /m10.2-leafletFiltres/index.html)
	var carpetaProyecto = localizacionIndexHTML.substring(0, localizacionIndexHTML.lastIndexOf('/')); //Con esto cogemos lo que vaya antes de la segunda / (por ejemplo: /m10.2-leafletFiltres)

	var pathAPI = `http://${nombreHost}${carpetaProyecto}/api/apiRestaurants.php`; //Ruta de la API

	//console.log(pathAPI);



	/* ////////////////// GEOLOCALIZACIÓN USUARIO PÁGINA////////////////// */ 

	//FORMA ALTERNATIVA A MAP.LOCATE

	/*var userLocation;

	navigator.geolocation.getCurrentPosition( //Puede ser que obtengamos las coordenadas del punto de acceso del proveedor del servicio
		(pos) => {
			var { coords } = pos;
			userLocation = [coords.latitude, coords.longitude];	
		},
		(err) => {
			console.log(err);
		},
		{
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}
	);  */
	
	
	
	/* ////////////////// CREACIÓN MAPA ////////////////// */

	var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 9);

	map.locate({setView: true, maxZoom: 16}); // GEOLOCALIZACIÓN USUARIO: fijamos centro del mapa y zoom
		
	var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

	//en el clusters almaceno todos los markers
	var markers = L.markerClusterGroup();
	var data_markers = [];
	
	
	

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
			
			// Recorremos el array data_markers y guardamos todos los tipos de restaurantes en un nuevo array
			$.each(data_markers, function (index, element) {
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

			//Añadimos una primera opción Todos con value all
			$("#kind_food_selector").append(`<option selected value="all">Todos</option>`); 

			//Añadimos dinámicamente todos los tipos de restaurante
			$.each(restaurantTypesNoRepeated, function (index, element) { 
				$("#kind_food_selector").append(`<option value="${element}">${element}</option>`);
			});
			

			// 3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
			render_to_map(data_markers, 'all');
		});

	}
	



	/* ////////////////// EVENTO ON CHANGE PARA FILTAR MARCADORES ////////////////// */

	$('#kind_food_selector').on('change', function() {
	console.log(this.value);
	render_to_map(data_markers, this.value);
	});



	/* ////////////////// FASE 3.2 ////////////////// */

	function render_to_map(data_markers, filter){
		
		// 1) Limpio todos los marcadores
		markers.clearLayers();

		// 2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
		
		//Si el filter es all, hay que sacar todos los restaurantes
		if (filter == "all") {
			$.each(data_markers, function (index, element) { 
				createMarker(element);
			});
		}
		else {
			$.each(data_markers, function (index, element) {
				//Si la propiedad kind_foot (que es una string) del restaurante que estamos recorriendo contiene los caracteres del filtro que hemos seleccionado, crearemos un marcador para el restaurante y lo añadiremos
				if (element.kind_foot.includes(filter)) {
					createMarker(element);
				}
			});	
		}
		
		
		//Añadimos cluster al mapa
		map.addLayer(markers);
	}
	
	
	function createMarker(element) {

		let marker;
		let photoImg;

		//Creamos marcador
		marker = L.marker([element.lat, element.lng]);

		//Añadimos imagen
		photoImg = `<img src="${element.photo}" style="display: block; margin-left: auto; margin-right: auto; width: 100%; object-fit: contain; margin-top: 25px; margin-bottom: 10px;">`;

		//AñadimospopUp al marcador
		marker.bindPopup(`${photoImg}<b>${element.name}</b><br>${element.address}<br>`);

		//Añadimos evento click al marcador para centrar mapa
		marker.on("click", e => {
			map.setView([element.lat, element.lng]);
		});

		//Añadimos marcador al cluster
		markers.addLayer(marker);
	}
}); 