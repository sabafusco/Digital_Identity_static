//*****************************************************************
//VIEMODEL PRICIPALE - INIT PAGINA
//***************************************************************** 
function ComitatoViewModel(params) {

  //INIZIALIZZO LE VARIABILE DEL VIEMODEL
	var TIPO_CRC = "CRC";
	var TIPO_COCOPRO = "COCOPRO";
	var noData = "Dato non presente";
                   
	var self = this;	
	self.comitatiList=ko.observableArray([]);
	self.comitatoSelected = ko.observable(new Comitato());
	self.tipoComitatoSelected = ko.observable("");

	//gestione profilo e token
//	self.profiloToken = ko.observable(new ProfiloToken());
//	self.token = ko.observable("");

	//form operazione add e edit
	self.disableBtnAddComitato = ko.observable("");
	self.formOperationComitatoTipo = ko.observable("");
	self.formOperationComitatoRegione = ko.observable("");
	self.formOperationComitatoProvincia = ko.observable("");

	//form ricerca
	self.formRicercaComitatoTipo = ko.observable("");
	self.formRicercaComitatoRegione = ko.observable("");
	
	//old
	self.formComitatoProvinciaDescrOld = ko.observable("");
	self.formComitatoComuneUtente1Old = ko.observable("");
	self.formComitatoComuneUtente2Old = ko.observable("");
	self.formComitatoComuneDescrUtente1Old = ko.observable("");
	self.formComitatoComuneDescrUtente2Old = ko.observable("");

	//form inserisci comitato
	self.formComitatoOperazione = ko.observable("");
	self.formComitatoRegione = ko.observable("");
	self.selectFormComitatoProvincia=ko.observableArray([]);     

	
	self.formComitatoProvincia = ko.observable("");
	self.formComitatoProvinciaDescr = ko.observable("");
	self.formComitatoProvinciaVisible = ko.observable(true);
	self.formComitatoCoordinatore = ko.observable("");
	self.formComitatoVice = ko.observable("");
	self.formComitatoTelefono = ko.observable("");
	self.formComitatoFax = ko.observable("");
	self.formComitatoTipo = ko.observable("");
	self.formComitatoDescrizione = ko.observable("");
	//presidente - coordinatore
	self.formComitatoCognome1 = ko.observable("");
	self.formComitatoNome1 = ko.observable("");
	self.formComitatoSesso1 = ko.observable("");
	self.formComitatoDataNascita1 = ko.observable("");
	self.formComitatoProvinciaNascitaDescr1 = ko.observable("");
	self.formComitatoProvinciaNascita1 = ko.observable("");
	self.selectFormComitatoComuneNascita1=ko.observableArray([]);
	self.formComitatoComuneNascitaDescr1 = ko.observable("");
	self.formComitatoComuneNascita1 = ko.observable("");
	self.formComitatoCodiceFiscale1 = ko.observable("");
	//vice presidente - vicecoordinatore
	self.formComitatoCognome2 = ko.observable("");
	self.formComitatoNome2 = ko.observable("");
	self.formComitatoSesso2 = ko.observable("");
	self.formComitatoDataNascita2 = ko.observable("");
	self.formComitatoProvinciaNascitaDescr2 = ko.observable("");
	self.formComitatoProvinciaNascita2 = ko.observable("");
	self.selectFormComitatoComuneNascita2=ko.observableArray([]);
	self.formComitatoComuneNascitaDescr2 = ko.observable("");
	self.formComitatoComuneNascita2 = ko.observable("");
	self.formComitatoCodiceFiscale2 = ko.observable("");
	
	self.setFormComitatoOld=function(){
		self.formComitatoProvinciaDescrOld(self.comitatoSelected().provincia());
		self.formComitatoComuneUtente1Old(self.comitatoSelected().utente1().comuneNascita());
		self.formComitatoComuneUtente2Old(self.comitatoSelected().utente2().comuneNascita());
		self.formComitatoComuneDescrUtente1Old(self.comitatoSelected().utente1().comuneNascitaDescr());
		self.formComitatoComuneDescrUtente2Old(self.comitatoSelected().utente2().comuneNascitaDescr());
	}

	self.setFormComitato=function(){
		//self.formComitatoRegioneDescr(self.comitatoSelected().regione());
		self.formComitatoRegione(self.comitatoSelected().codiceRegione());
		self.formComitatoProvinciaDescr(self.comitatoSelected().provincia());
		self.formComitatoProvincia(self.comitatoSelected().codiceProvincia());
		self.formComitatoTelefono(self.comitatoSelected().telefono());
		self.formComitatoFax(self.comitatoSelected().fax());
		self.formComitatoTipo(self.comitatoSelected().tipoComitato());
		self.formComitatoDescrizione(self.comitatoSelected().descrizione());
		
		self.formComitatoCognome1(self.comitatoSelected().utente1().cognome());
		self.formComitatoNome1(self.comitatoSelected().utente1().nome());
		self.formComitatoSesso1(self.comitatoSelected().utente1().sesso());
		self.formComitatoDataNascita1(self.comitatoSelected().utente1().dataNascita());
		self.formComitatoProvinciaNascitaDescr1(self.comitatoSelected().utente1().provinciaNascitaDescr());
		self.formComitatoProvinciaNascita1(self.comitatoSelected().utente1().provinciaNascita());
		self.formComitatoComuneNascitaDescr1(self.comitatoSelected().utente1().comuneNascitaDescr());
		self.formComitatoComuneNascita1(self.comitatoSelected().utente1().comuneNascita());
		self.formComitatoCodiceFiscale1(self.comitatoSelected().utente1().codiceFiscale());
		self.formComitatoCognome2(self.comitatoSelected().utente2().cognome());
		self.formComitatoNome2(self.comitatoSelected().utente2().nome());
		self.formComitatoSesso2(self.comitatoSelected().utente2().sesso());
		self.formComitatoDataNascita2(self.comitatoSelected().utente2().dataNascita());
		self.formComitatoProvinciaNascitaDescr2(self.comitatoSelected().utente2().provinciaNascitaDescr());
		self.formComitatoProvinciaNascita2(self.comitatoSelected().utente2().provinciaNascita());
		self.formComitatoComuneNascitaDescr2(self.comitatoSelected().utente2().comuneNascitaDescr());
		self.formComitatoComuneNascita2(self.comitatoSelected().utente2().comuneNascita());
		self.formComitatoCodiceFiscale2(self.comitatoSelected().utente2().codiceFiscale());
	}

	//set del token
//	self.setToken=function(){
//		var url = urlRest +"profile";
//		var _successEvent=function(data) {
//			self.profiloToken(new ProfiloToken(data));
//			self.token(self.profiloToken().token());
//			//se non è amministratore , gestione sede o gestione organi l'utente non può aggiungere strutture
//			self.disableBtnAddComitato(self.profiloToken().isAdmin() || self.profiloToken().isGestioneComitati()?undefined:'disabled');
//		};
//		getAjaxWithJSONResponse(_successEvent, url);
//	}
	

	self.getTokenOk=function(){
		self.disableBtnAddComitato(self.profiloToken().isAdmin() || self.profiloToken().isGestioneComitati()?undefined:'disabled');
	}
	
	//Carico lista comitati
	self.loadListaComitati=function(){
		showLoadingAnimation();
		var comitatiListTemp=ko.observableArray([]);
		//self.emptyComitatiList();
		var url = urlRest + "personeStrutture/pagListComitati?page=" + (self.currentPage()-1) + "&offset=" + self.itemsPerPage() + "&tipo=" + self.getSearchParams("tipo") + "&regione=" + self.getSearchParams("regione");
		
		_successEvent = function(data){
			//paginazione
			//if(self.currentPage() == 1){
			self.numElementi(data.size);
			self.numPagineMax(Math.ceil(parseInt(self.numElementi()) / parseInt(self.itemsPerPage())));
			self.paginazioneNumber();			
			//paginazione end

			$.each(data.list, function( key, item ){
				var com = ko.observable(new Comitato(item));
				comitatiListTemp.push(com);
			});	
			self.comitatiList(comitatiListTemp.slice(0));
			hideLoadingAnimation();
		 };
		 getAjaxWithJSONResponse(_successEvent, url);
	}

	//Carico dettaglio comitato
	self.newDettaglioComitato=function(){
		self.comitatoSelected(new Comitato());
		self.comitatoSelected().tipoComitato(self.tipoComitatoSelected());
		self.setFormComitato();
		hideLoadingAnimation();
	}

	
	//Carico dettaglio comitato
	self.loadDettaglioComitato=function(tipo, regione, provincia){
		showLoadingAnimation();
		var url = urlRest + "personeStrutture/getDettaglioComitato?tipo=" + tipo + "&regione=" + regione + "&provincia=" + provincia;
		_successEvent = function(data){		
			self.comitatoSelected(new Comitato(data));
			self.setFormComitato();
			self.setFormComitatoOld();
			self.filterProvinceComitati();
			self.filterComuniUtente1();
			self.filterComuniUtente2();
			hideLoadingAnimation();
		 };
		 getAjaxWithJSONResponse(_successEvent, url);
	}
	
	self.emptyComitatiList=function(email,operation){
		var comitatiListT=ko.observableArray([]);
		self.comitatiList(comitatiListT.slice(0)); //svuoto i risultati ricerca
	}	
		
	self.emptyFormRicerca=function(email,operation){
		self.formRicercaComitatoTipo("");
		self.formRicercaComitatoRegione("");
	}	

	self.btnElimina=function(tipoComitato, regione, provincia){
		self.comitatoSelected().codiceRegione(regione);
		self.comitatoSelected().provincia(provincia);
		self.comitatoSelected().tipoComitato(tipoComitato);

		self.formComitatoOperazione('DEL');
		if(confirm("Eliminare il comitato selezionato?")){
			self.setFormComitato();
			self.submitComitatoForm();
		}
	}

	self.btnModifica=function(tipoComitato, regione, provincia){
//		self.formOperationComitatoTipo(tipoComitato);
//		self.formOperationComitatoRegione(regione);
//		self.formOperationComitatoProvincia(provincia);
		//window.location.href=urlEdit + "?tipo="+ tipoComitato + "&regione=" + regione + "&provincia=" + provincia;
//		$('.ko_comitato_form_op').attr('action', urlEdit);
//		$('.ko_comitato_form_op').submit();
		
		urlEdit += "&tipo=" + tipoComitato;
		urlEdit += "&regione=" + regione;
		urlEdit += "&provincia=" + provincia;
		urlEdit += "&searchTipoComitato=" + self.formRicercaComitatoTipo();
		urlEdit += "&searchRegioneComitato=" + self.formRicercaComitatoRegione();
		urlEdit += "&searchCurrentPage=" + self.currentPage();
		urlEdit += "&searchItemsPerPage=" + self.itemsPerPage();
		window.location.href = urlEdit;
	}

	self.btnNew=function(tipoComitato){
//		self.formOperationComitatoTipo(tipoComitato);
//		$('.ko_comitato_form_op').attr('action', urlNew);
//		$('.ko_comitato_form_op').submit();

		urlNew += "&tipo=" + tipoComitato;
		urlNew += "&searchTipoComitato=" + self.formRicercaComitatoTipo();
		urlNew += "&searchRegioneComitato=" + self.formRicercaComitatoRegione();
		urlNew += "&searchCurrentPage=" + self.currentPage();
		urlNew += "&searchItemsPerPage=" + self.itemsPerPage();
		window.location.href = urlNew;
	}	
	
	
	self.initOperation=function(operation){
		showLoadingAnimation();
		self.formComitatoOperazione(operation);
		if(operation == "ADD_CRC"){
			jQuery('#label-form-comitato').text("Nuovo Comitato C.R.C.");
			jQuery('#label-form-coordinatore').text("Dati coordinatore");
			jQuery('#label-form-viceCoordinatore').text("Dati vice coordinatore");
			self.formComitatoProvinciaVisible(false);
			self.tipoComitatoSelected("CRC");
			jQuery('#form-comitato').show();
			self.newDettaglioComitato();
		}else if(operation == "ADD_COCOPRO"){
			jQuery('#label-form-comitato').text("Nuovo Comitato CO.CO.PRO.");
			jQuery('#label-form-coordinatore').text("Dati presidente");
			jQuery('#label-form-viceCoordinatore').text("Dati vice presidente");
			self.formComitatoProvinciaVisible(true);
			self.tipoComitatoSelected("COCOPRO");
			jQuery('#form-comitato').show();
			self.newDettaglioComitato();
		}else if(operation == "EDIT_CRC"){
			jQuery('#label-form-comitato').text("Modifica Comitato C.R.C.");
			jQuery('#label-form-coordinatore').text("Dati coordinatore");
			jQuery('#label-form-viceCoordinatore').text("Dati vice coordinatore");
			self.formComitatoProvinciaVisible(false);
			self.tipoComitatoSelected("CRC");
			jQuery('#form-comitato').show();
			self.loadDettaglioComitato(tipoComitatoReq, regioneComitatoReq, provinciaComitatoReq);
		}else if(operation == "EDIT_COCOPRO"){
			jQuery('#label-form-comitato').text("Modifica Comitato CO.CO.PRO.");
			jQuery('#label-form-coordinatore').text("Dati presidente");
			jQuery('#label-form-viceCoordinatore').text("Dati vice presidente");
			self.formComitatoProvinciaVisible(true);
			self.tipoComitatoSelected("COCOPRO");
			jQuery('#form-comitato').show();
			self.loadDettaglioComitato(tipoComitatoReq, regioneComitatoReq, provinciaComitatoReq);
		}else if(operation == "SEARCH"){
			initPagination(self,self.loadListaComitati);
			self.initSearch();
			//hideLoadingAnimation();
		}
		
	}

	self.submitComitatoForm=function(){
		showLoadingAnimation();

		var urlService;

		var jsonObj = {
				tipoComitato : self.formComitatoTipo(),
				descrizioneComitato : self.formComitatoDescrizione(),
				regione : self.formComitatoRegione(), //codice regione
				provincia : self.formComitatoProvinciaDescr(), // descrizione provincia
				numeroTelefono : self.formComitatoTelefono(),
				numeroFax : self.formComitatoFax(),
				utente1 : {
					cognome : self.formComitatoCognome1(),
					nome : self.formComitatoNome1(),
					dataNascita : self.formComitatoDataNascita1(),
					provinciaNascita : self.formComitatoProvinciaNascita1(),
					provinciaNascitaDescr : self.formComitatoProvinciaNascitaDescr1(),
					comuneNascita : self.formComitatoComuneNascita1(),
					comuneNascitaDescr : self.formComitatoComuneNascitaDescr1(),
					sesso : self.formComitatoSesso1(),
					codiceFiscale : self.formComitatoCodiceFiscale1()
				},
				utente2 : {
					cognome : self.formComitatoCognome2(),
					nome : self.formComitatoNome2(),
					dataNascita : self.formComitatoDataNascita2(),
					provinciaNascita : self.formComitatoProvinciaNascita2(),
					provinciaNascitaDescr : self.formComitatoProvinciaNascitaDescr2(),
					comuneNascita : self.formComitatoComuneNascita2(),
					comuneNascitaDescr : self.formComitatoComuneNascitaDescr2(),
					sesso : self.formComitatoSesso2(),
					codiceFiscale : self.formComitatoCodiceFiscale2()
				}
			};
		
		var operazione = self.formComitatoOperazione();

		if(operazione == "EDIT_CRC"){
			urlService = urlRest + "personeStrutture/aggiornaDettaglioComitatoCRC" ;
			_successEvent = function(response){
				showMessage("OK", "Dati comitato CRC modificati correttamente.");		
			}
		}else if(operazione == "EDIT_COCOPRO"){
			urlService = urlRest + "personeStrutture/aggiornaDettaglioComitatoCOCOPRO" ;
			_successEvent = function(response){
				showMessage("OK", "Dati comiato CO.CO.PRO. modificati correttamente.");
			}
		}else if(operazione == "ADD_CRC"){
			urlService = urlRest + "personeStrutture/salvaDettaglioComitatoCRC" ;
			_successEvent = function(response){
				showMessage("OK", "Dati comitato CRC inseriti correttamente.");		
			}
		}else if(operazione == "ADD_COCOPRO"){
			urlService = urlRest + "personeStrutture/salvaDettaglioComitatoCOCOPRO" ;
			_successEvent = function(response){
				showMessage("OK", "Dati comitato COCOPRO inseriti correttamente.");		
			}
		}else if(operazione == "DEL"){
			_successEvent = function(response){
				showMessage("OK","Opereazione di eliminazione avvenuta con successo");
				//nel caso di cancellazione dell'unico elemento contenuto nella lista
				//non viene rieffettuata la ricerca, cosi da non mostare il messaggio di "nessun risultato"
				if(self.comitatiList().length == 1){
					self.emptyComitatiList();
				}else{
					self.loadPage(1);					
				}
			}		

			if(self.formComitatoTipo() == "CRC"){
				urlService = urlRest + "personeStrutture/eliminaDettaglioComitatoCRC" ;
			}else if(self.formComitatoTipo() == "COCOPRO"){
				urlService = urlRest + "personeStrutture/eliminaDettaglioComitatoCOCOPRO" ;
			}
		}
		
		//postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj,self.token());
		
		var tokenParam = new TokenHeader("CSCPTOKEN", "", urlRest+"token" );
		postAjaxWithGetToken(_successEvent, null, urlService, jsonObj, tokenParam);
	
		return false;
	}
	
	self.search=function(){
		self.setSearchParams("tipo", self.formRicercaComitatoTipo());
		self.setSearchParams("regione", self.formRicercaComitatoRegione());
		self.loadPage(1);
//		if(self.comitatiList.length == 0){
//			var comitato = ko.observable(new Comitato());
//			comitato().descrizione(noData);
//			self.comitatiList.push(comitato);
//		}
	}

	self.initSearch=function(){
		var isSearchInit = false;
		var searchTipoComitato = getUrlVars()["searchTipoComitato"];
		var searchRegioneComitato = getUrlVars()["searchRegioneComitato"];
		var searchItemsPerPage = getUrlVars()["searchItemsPerPage"];
		var searchCurrentPage = getUrlVars()["searchCurrentPage"];
		
		if(searchTipoComitato && searchTipoComitato!=""){
			self.formRicercaComitatoTipo(searchTipoComitato);
			isSearchInit = true;
		}

		if(searchRegioneComitato && searchRegioneComitato!=""){
			self.formRicercaComitatoRegione(searchRegioneComitato);
			isSearchInit = true;
		}

		if(searchItemsPerPage && searchItemsPerPage!=""){
			self.itemsPerPage(searchItemsPerPage);
		}
		
		if(isSearchInit){
			self.setSearchParams("tipo", self.formRicercaComitatoTipo());
			self.setSearchParams("regione", self.formRicercaComitatoRegione());
			self.loadPage(searchCurrentPage ? parseInt(searchCurrentPage) : 1);
		}else{
			hideLoadingAnimation();
		}
		
	}
	
	self.resetFormRicerca=function(){
		self.formRicercaComitatoTipo("");
		self.formRicercaComitatoRegione("");
	}
	
	self.resetFormComitato=function(){
		self.setFormComitato();
		self.filterComuniUtente1();
		self.filterComuniUtente2();
	}
	
	self.annullaOperazione=function(){
		//window.location.href=urlBack;
		$('.ko_form_comitato_indietro').attr('action', urlBack);
		$('.ko_form_comitato_indietro').submit();
	}
	
	self.filterProvinceComitati=function(){
		if(self.formComitatoProvinciaVisible()){
			showLoadingAnimation();
			
			var descrRegione = $(".ko_comitato_form_regione option:selected").text();
			var url = urlRest +"personeStrutture/ricercaProvince/"+descrRegione;
			
			var _successEvent=function(json) {
				var selectProvinciaOptionsTemp=ko.observableArray([]);                      
				selectProvinciaOptionsTemp.push(new SelectOption("Seleziona", ""));
				$.each(json, function(idx, obj) {
					selectProvinciaOptionsTemp.push(new SelectOption(obj.descrizioneProvincia, obj.descrizioneProvincia));
				});
				self.selectFormComitatoProvincia(selectProvinciaOptionsTemp.slice(0));
				self.formComitatoProvinciaDescr(self.formComitatoProvinciaDescrOld());
	
				hideLoadingAnimation();
			};
			getAjaxWithJSONResponse(_successEvent, url);
		}
	}
	
	self.onChange_formComitatoProvinciaNascita1=function(){
		self.formComitatoProvinciaNascitaDescr1($(".ko_comitato_form_provinciaNascita1 option:selected").text());
		self.filterComuniUtente1();
	}
	
	self.filterComuniUtente1=function(){
		showLoadingAnimation();
		var codiceProvincia = self.formComitatoProvinciaNascita1();
		var url = urlRest +"personeStrutture/ricercaComuni/"+codiceProvincia;
		
		var _successEvent=function(json) {
			var selectComuniOptionsTemp=ko.observableArray([]);                      
			selectComuniOptionsTemp.push(new SelectOption("Seleziona", ""));
			$.each(json, function(idx, obj) {
				selectComuniOptionsTemp.push(new SelectOption(obj.descrizioneComune, obj.codiceISTATComune));
			});
			self.selectFormComitatoComuneNascita1(selectComuniOptionsTemp.slice(0));
			self.formComitatoComuneNascita1(self.formComitatoComuneUtente1Old());
			self.formComitatoComuneNascitaDescr1(self.formComitatoComuneDescrUtente1Old());
			hideLoadingAnimation();
		};
		getAjaxWithJSONResponse(_successEvent, url);
	}
	
	self.onChange_formComitatoComuneNascita1=function(){
		self.formComitatoComuneNascitaDescr1($(".ko_comitato_form_comuneNascita1 option:selected").text());
	}
	
	self.onChange_formComitatoProvinciaNascita2=function(){
		self.formComitatoProvinciaNascitaDescr2($(".ko_comitato_form_provinciaNascita2 option:selected").text());
		self.filterComuniUtente2();
	}
	
	self.filterComuniUtente2=function(){
		showLoadingAnimation();
		var codiceProvincia = self.formComitatoProvinciaNascita2();
		var url = urlRest +"personeStrutture/ricercaComuni/"+codiceProvincia;
		
		var _successEvent=function(json) {
			var selectComuniOptionsTemp=ko.observableArray([]);                      
			selectComuniOptionsTemp.push(new SelectOption("Seleziona", ""));
			$.each(json, function(idx, obj) {
				selectComuniOptionsTemp.push(new SelectOption(obj.descrizioneComune, obj.codiceISTATComune));
			});
			self.selectFormComitatoComuneNascita2(selectComuniOptionsTemp.slice(0));
			self.formComitatoComuneNascita2(self.formComitatoComuneUtente2Old());
			self.formComitatoComuneNascitaDescr2(self.formComitatoComuneDescrUtente2Old());
			hideLoadingAnimation();
		};
		getAjaxWithJSONResponse(_successEvent, url);
	}
	
	self.onChange_formComitatoComuneNascita2=function(){
		self.formComitatoComuneNascitaDescr2($(".ko_comitato_form_comuneNascita2 option:selected").text());
	}
	
	self.gestioneErrore = function(xhr, textStatus) {
		if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
			showMessageUnauthorized("Gestione comitati");
		}else {
			try{
				var json_obj = JSON.parse(xhr.responseText);
				showMessage("fail",json_obj.message);
			}catch(err){
				showMessage("fail");	
			}
		}
		hideLoadingAnimation();
	};
	
	//CHIAMO I METODI DI INIZIALIZZAZIONE
	self.create = function(){
		//self.setToken();
		initProfiloToken(self,self.getTokenOk, self.gestioneErrore);
		self.initOperation(operazioneReq);
	}
	self.create();
 // FINE -CHIAMO I METODI DI INIZIALIZZAZIONE
}

//*****************************************************************
//OGGETTO Permessi
//*****************************************************************
function Permessi(){
	var self=this;
	self.isAdd = ko.observable(false);
	self.isEdit = ko.observable(false);
	self.isDel = ko.observable(false);
}

//*****************************************************************
//OGGETTO Persona
//*****************************************************************
function Persona(dataJSON){
	var self=this;
	self.cognome = ko.observable("");
	self.nome = ko.observable("");
	self.dataNascita = ko.observable("");
	self.provinciaNascita = ko.observable("");
	self.provinciaNascitaDescr = ko.observable("");
	self.comuneNascita = ko.observable("");
	self.comuneNascitaDescr = ko.observable("");
	self.sesso = ko.observable("");
	self.codiceFiscale = ko.observable("");
	self.stato = ko.observable("");
	self.tipoRuolo = ko.observable("");
	self.uuid = ko.observable("");
	
	self.create = function(dataJSON){
		self.cognome(dataJSON.cognome);
		self.nome(dataJSON.nome);
		self.dataNascita(dataJSON.dataNascita);
		self.provinciaNascita(dataJSON.provinciaNascita);
		self.provinciaNascitaDescr(dataJSON.provinciaNascitaDescr);
		self.comuneNascita(dataJSON.comuneNascita);
		self.comuneNascitaDescr(dataJSON.comuneNascitaDescr);
		self.sesso(dataJSON.sesso);
		self.codiceFiscale(dataJSON.codiceFiscale);
		self.stato(dataJSON.stato);
		self.tipoRuolo(dataJSON.tipoRuolo);
		self.uuid(dataJSON.uuid);
	}
	
	if(dataJSON){
		self.create(dataJSON);
	}
}

//*****************************************************************
//OGGETTO Comitato
//*****************************************************************
function Comitato(dataJSON){
	var self=this;
	self.descrizione = ko.observable("");
	self.regione = ko.observable("");
	self.codiceRegione = ko.observable("");
	self.provincia = ko.observable("");
	self.codiceProvincia = ko.observable("");
	self.coordinatore = ko.observable("");
	self.vice = ko.observable("");
	self.telefono = ko.observable("");
	self.fax = ko.observable("");
	self.tipoComitato = ko.observable("");
	self.permessi = ko.observable(new Permessi());
	self.utente1 = ko.observable(new Persona());
	self.utente2 = ko.observable(new Persona());
	
	self.create = function(dataJSON){
		self.descrizione(dataJSON.descrizioneComitato);
		self.regione(dataJSON.regione);
		self.codiceRegione(dataJSON.codiceRegione);
		self.provincia(dataJSON.provincia);
		self.codiceProvincia(dataJSON.codiceProvincia);
		self.telefono(dataJSON.numeroTelefono);
		self.fax(dataJSON.numeroFax);
		self.tipoComitato(dataJSON.tipoComitato);		
		
		self.utente1(new Persona(dataJSON.utente1));
		self.utente2(new Persona(dataJSON.utente2));
		
		if(dataJSON.utente1 && dataJSON.utente1.cognome && dataJSON.utente1.nome){
			self.coordinatore(dataJSON.utente1.cognome + " " +dataJSON.utente1.nome);
		}
		if(dataJSON.utente2 && dataJSON.utente2.cognome && dataJSON.utente2.nome){
			self.vice(dataJSON.utente2.cognome + " " +dataJSON.utente2.nome);
		}

		if(model.profiloToken()){
			if(model.profiloToken().isAdmin() || model.profiloToken().isGestioneComitati()){
				self.permessi().isAdd(true);
				self.permessi().isEdit(true);
				self.permessi().isDel(true);	
			}
		}
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}

function Pagination(text,css){
	var self=this;
	self.text = text;
	self.css = css;
}

function SelectOption(name,value){
    var self=this;
    self.name = name;
    self.value = value;
}

//*****************************************************************
//OGGETTO ProfiloToken
//*****************************************************************
//function ProfiloToken(dataJSON){
//	var self=this;
//	
//	self.matricola = ko.observable("");
//	self.token = ko.observable("");
//	self.ruoli = ko.observableArray([]);
//	self.codiciUnita = ko.observableArray([]);
//	self.isAdmin = ko.observable(false);
//	self.isGestioneSede = ko.observable(false);
//	self.isGestioneOrgani = ko.observable(false);
//	self.isGestioneComitati = ko.observable(false);
//
//	self.create = function(dataJSON){
//		self.matricola(dataJSON.matricola);
//		self.token(dataJSON.token);
//		self.codiciUnita(dataJSON.codiciUnita);
//		self.isAdmin(dataJSON.isAdmin);
//		self.isGestioneSede(dataJSON.isGestioneSede);
//		self.isGestioneOrgani(dataJSON.isGestioneOrgani);
//		self.isGestioneComitati(dataJSON.isGestioneComitati);
//	}
//
//	if(dataJSON){
//		self.create(dataJSON);
//	}
//}