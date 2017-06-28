var directionsDisplay;	//SERVIZIO PER LA VISUALIZZAZIONE DELLE INDICAZIONI
var directionsService;	//SERVIZIO PER IL CARICAMENTO DELLE INDICAZIONI
var geocoder;		//CODIFICATORE INDIRIZZO - COORDINATE
var map;			//CONTENITORE MAPPA
var myLatlng;		//COORDINATE INDIRIZZO STRUTTURA INAIL
var idDirection;	//CONTENITORE INDICAZIONI

//CHIAMATA DA googleKeys.js AL CARICAMENTO DELLE API GMAPS
function decodificaIndirizzoStruttura() {
	//INDIRIZZO DI PARTENZA (testuale)
	var indirizzoStruttura = $("#indirizzo_di_arrivo").text();	
	//DECODIFICA INDIRIZZO -> COORDINATE
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': indirizzoStruttura
    }, function(results, status) {
    	//DECODIFICA TERMINATA CON SUCCESSO, CREAZIONE MAPPA
        if (status == google.maps.GeocoderStatus.OK) {
        	var idMap = 'map';												//ID CONTENITORE MAPPA
        	var idPercorso = 'map_directions';								//ID CONTENITORE INDICAZIONI VIAGGIO
            var titleMarker = $(".nome_struttura").text();					//TITOLO MARKER
            var infoMarker = $(".nome_struttura").text();					//TESTO MARKER
        	//CREAZIONE MAPPA
            initialize(idMap, idPercorso, results[0].geometry.location, titleMarker, infoMarker);
        }else{
        	$("#errore_ricerca").text("Errore nella ricerca della posizione della struttura Inail");
			$("#errore_ricerca").show();
        }
    });
}

//INIZIALIZZAZIONE MAPPA
function initialize(div_id_map, div_id_percorso, coordinate, title, info) {
	directionsDisplay = new google.maps.DirectionsRenderer(); 	//RENDERIZZATORE INDICAZIONI
	directionsService = new google.maps.DirectionsService();	//SERVIZIO PER IL CARICAMENTO DELLE INDICAZIONI
	idDirection = div_id_percorso;						
	
	//OPZIONI MAPPA
	var mapOptions = {
		zoom : 17,									//ZOOM
		mapTypeId : google.maps.MapTypeId.ROADMAP,	//MAPPA STRADALE
		center : coordinate							//PASSAGGIO INDIRIZZO STRUTTURA PRECEDENTEMENTE TRADOTTO IN COORDINATE
	}
	//CREAZIONE OGGETTO MAPPA
	map = new google.maps.Map(document.getElementById(div_id_map), mapOptions);
	//MARKER
	var marker = new google.maps.Marker({
		position : coordinate,
		map : map,
		title : title
	});
	//INFORMAZIONI MARKER
	var contentString = info;
	var infowindow = new google.maps.InfoWindow({
		content : contentString
	});
	//VISUALIZZA LE INFORMAZIONI DEL MARKER AL CLICK SULLO STESSO
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});

}

//ELIMINAZIONE INDICAZIONI VIAGGIO
function delRoute() {
	$(".indicazioni_percorso > h3").hide(); 	//NASCONDE L'HEADER INDICAZIONI
	$("#errore_ricerca").hide();		  	//NASCONDE EVENTUALI ERRORI
	directionsDisplay.setMap(null);			//RESET ASSOCIAZIONE PERCORSO VIAGGIO - MAPPA
	directionsDisplay.setPanel(null);	 	//RESET ASSOCIAZIONE CONTAINER INDICAZIONI
}

//CALCOLO INDICAZIONI VIAGGIO
function calcRoute() {
	delRoute();															//ELIMINAZIONE EVENTUALI INDICAZIONI VIAGGIO PRECEDENTE
	directionsDisplay.setMap(map);										//ASSOCIAZIONE PERCORSO VIAGGIO - MAPPA
	directionsDisplay.setPanel(document.getElementById(idDirection));	//ASSOCIAZIONE CONTAINER INDICAZIONI
	var start = $("#indirizzo_di_partenza").val();	//INDIRIZZO DI PARTENZA (input text)
	var end = $("#indirizzo_di_arrivo").text();		//INDIRIZZO DI ARRIVO (STRUTTURA INAIL - semplice testo)
	var mezzo_scelto = $("#scelta_mezzo").val();	//MEZZO SCELTO PER IL VIAGGIO (select)
	//CREAZIONE REQUEST PER VIAGGIO
	var request = {
		origin : start,
		destination : end,
		travelMode : google.maps.TravelMode[mezzo_scelto]
	};
	
	//LETTURA RISPOSTA DA SERVIZI GOOGLE
	directionsService.route(request, function(response, status) {
		//RISULTATI OTTENUTI, STAMPA SU CONTENITORE INDICAZIONI VIAGGIO
		if (status == google.maps.DirectionsStatus.OK) {
			$(".indicazioni_percorso > h3").show(); 	//VISUALIZZAZIONE HEADER
			directionsDisplay.setDirections(response); //VISUALIZZAZIONE INDICAZIONI
		//SI È VERIFICATO UN ERRORE, VISUALIZZAZIONE MESSAGGIO
		} else if (status == google.maps.DirectionsStatus.NOT_FOUND){
			if(start == ""){
				$("#errore_ricerca").text("Inserisci l'indirizzo di partenza");
			}else{
				$("#errore_ricerca").text("Impossibile trovare l'indirizzo di partenza specificato");
			}
			$("#errore_ricerca").show();
		} else if (status == google.maps.DirectionsStatus.ZERO_RESULTS){
			$("#errore_ricerca").text("Nessuna indicazione trovata, prova con un altro mezzo");
			delRoute();	
			$("#errore_ricerca").show();
		} else{
			$("#errore_ricerca").text("Errore nella comunicazione con i servizi Google");
			$("#errore_ricerca").show();
			delRoute();	
		}
	});
}