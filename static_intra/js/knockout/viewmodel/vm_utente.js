//*****************************************************************
//VIEMODEL PRICIPALE - INIT PAGINA
//***************************************************************** 
function UtenteViewModel(params) {

  //INIZIALIZZO LE VARIABILE DEL VIEMODEL
	
	var noData = "Dato non presente";
	var self = this;	
	self.dipendenteList=ko.observableArray([]);
	self.dipendente=ko.observable(new Dipendente());
	self.allocazioneList=ko.observableArray([]);
	self.allocazioneSelected = ko.observable(Allocazione);
	self.formDipendenteOperazione = ko.observable("");
	
	//gestione profilo e token
//	self.profiloToken = ko.observable(new ProfiloToken());
//	self.token = ko.observable("");

	//form operazione add e  edit
	self.disableBtnAddUtente = ko.observable("");
	self.formOperationDipendenteMatricola = ko.observable("");
	
	//form ricerca
	self.formRicercaDipendenteCognome = ko.observable("");
	self.formRicercaDipendenteMatricola = ko.observable("");
	self.formRicercaDipendenteUnita = ko.observable("");

	//form dipendente
	self.formDipendenteCognome = ko.observable("");
	self.formDipendenteNome = ko.observable("");
	self.formDipendenteSesso = ko.observable("");
	self.formDipendenteDataNascita = ko.observable("");
	self.formDipendenteProvincia = ko.observable("");
	self.formDipendenteComuneNascitDes = ko.observable("");
	self.formDipendenteComuneNascitIstat = ko.observable("");
	self.formDipendenteCodiceFiscale = ko.observable("");
	self.formDipendenteUserName = ko.observable("");
	self.formDipendenteEmail = ko.observable("");
	self.formDipendenteUtenteHR = ko.observable(false);
	self.formDipendenteDisabled = ko.observable("");
	
	//Form allocazione
	self.formAllocazioneOperazione = ko.observable("");
	self.formAllocazioneIncaricoOld = ko.observable("");
	self.formAllocazioneUnitaOld = ko.observable("");
	self.formAllocazioneUfficioOld = ko.observable("");
	self.formAllocazioneUnita = ko.observable("");
	self.formAllocazioneUnitaDes = ko.observable("");
	self.formAllocazioneUfficio = ko.observable("");
	self.formAllocazioneIncarico = ko.observable("");
	self.formAllocazioneInterno = ko.observable("");
	self.formAllocazioneTelefono = ko.observable("");
	self.formAllocazioneFax = ko.observable("");
	self.formAllocazionePiano = ko.observable("");
	self.formAllocazioneStanza = ko.observable("");
	self.formAllocazioneCellulare = ko.observable("");
	self.formAllocazioneNumBreve = ko.observable("");
	self.formAllocazioneDisabled = ko.observable("");

	self.setFormDipendente=function(){
		self.formDipendenteCognome(self.dipendente().cognome());
		self.formDipendenteNome(self.dipendente().nome());
		self.formDipendenteSesso(self.dipendente().sesso());
		self.formDipendenteDataNascita(self.dipendente().dataNascita());
		self.formDipendenteProvincia(self.dipendente().provinciaNascitaIstat());
		self.formDipendenteComuneNascitDes(self.dipendente().comuneNascitaDescr());
		self.formDipendenteComuneNascitIstat(self.dipendente().comuneNascitaIstat());
		self.formDipendenteCodiceFiscale(self.dipendente().codiceFiscale());
		self.formDipendenteUserName(self.dipendente().matricola());
		self.formDipendenteEmail(self.dipendente().email());
		self.formDipendenteUtenteHR(self.dipendente().utenteHR());
		self.formDipendenteDisabled(self.dipendente().utenteHR()?'disabled':undefined);
	}
	
	
	//set del token
//	self.setToken=function(){
//		var url = urlRest +"profile";
//		var _successEvent=function(data) {
//			self.profiloToken(new ProfiloToken(data));
//			self.token(self.profiloToken().token());
//			//se non è amministratore , gestione sede o gestione organi l'utente non può aggiungere strutture
//			self.disableBtnAddUtente(self.profiloToken().isAdmin() || self.profiloToken().isGestioneSede() || self.profiloToken().isGestioneOrgani()?undefined:'disabled');
//		};
//		getAjaxWithJSONResponse(_successEvent, url);
//	}

	self.getTokenOk=function(){
		//se non è amministratore , gestione sede o gestione organi l'utente non può aggiungere strutture
		self.disableBtnAddUtente(self.profiloToken().isAdmin() || self.profiloToken().isGestioneSede() || self.profiloToken().isGestioneOrgani()?undefined:'disabled');
		self.initOperation(operazioneReq);
	}

	
	//Carico lista dipendente
	self.loadListaDipendente=function(){
		showLoadingAnimation();
		//self.emptyDipendenteList();
		var dipendenteListTemp=ko.observableArray([]);

//		var url = urlRest + "personeStrutture/pagListDipendete?page=" + (self.currentPage()-1) + 
//			"&offset=" + self.itemsPerPage() +
//			"&cognome=" + self.formRicercaDipendenteCognome() + 
//			"&matricola=" + self.formRicercaDipendenteMatricola() + 
//			"&unita=" + self.formRicercaDipendenteUnita() ;
//		

		var url = urlRest + "personeStrutture/pagListDipendete?page=" + (self.currentPage()-1) + 
		"&offset=" + self.itemsPerPage() +
		"&cognome=" + self.getSearchParams("cognome") + 
		"&matricola=" + self.getSearchParams("matricola") + 
		"&unita=" + self.getSearchParams("unita") ;


		_successEvent = function(data){
			//paginazione
			//if(self.currentPage() == 1){
			self.numElementi(data.size);
			self.numPagineMax(Math.ceil(self.numElementi() / self.itemsPerPage()));
			self.numPagineMax(Math.ceil(parseInt(self.numElementi()) / parseInt(self.itemsPerPage())));
			self.paginazioneNumber();			
			//paginazione end

			$.each(data.list, function( key, item ){
				var dipendenteTemp=ko.observable(new Dipendente(item));

				//modifica per inserire la prima allocazione a parte
				if(dipendenteTemp().allocazioneDipendenteList().length>0){
					dipendenteTemp().firstAllocazioneDipendente(dipendenteTemp().allocazioneDipendenteList()[0]());
					dipendenteTemp().allocazioneDipendenteList(dipendenteTemp().allocazioneDipendenteList.slice(1));				
				}

				dipendenteListTemp.push(dipendenteTemp);
			});	
			
			
			
			self.dipendenteList(dipendenteListTemp.slice(0));
			hideLoadingAnimation();
		 };
		 getAjaxWithJSONResponse(_successEvent, url);
	}
	
	self.emptyDipendenteList=function(email,operation){
		var dipendenteListT=ko.observableArray([]);
		self.dipendenteList(dipendenteListT.slice(0)); //svuoto i risultati ricerca
	}	
		
	self.emptyFormRicerca=function(){
		self.formRicercaDipendenteCognome = ko.observable("");
		self.formRicercaDipendenteMatricola = ko.observable("");
		self.formRicercaDipendenteUnita = ko.observable("");
	}
	
	self.btnElimina=function(indice){		
		self.formDipendenteOperazione('DEL');
		if(confirm("Eliminare l' utente selezionato?")){
			var dipToDel = self.dipendenteList()[indice]();	
			
			self.dipendente().matricola(dipToDel.matricola());
			self.dipendente().codiceFiscale(dipToDel.codiceFiscale());
			self.dipendente().cognome(dipToDel.cognome());
			self.dipendente().nome(dipToDel.nome());
			self.dipendente().sesso(dipToDel.sesso());
			self.dipendente().dataNascita(dipToDel.dataNascita());
			self.dipendente().comuneNascitaIstat(dipToDel.comuneNascitaIstat());
			self.dipendente().comuneNascitaDescr(dipToDel.comuneNascitaDescr());
			self.dipendente().contratto(dipToDel.contratto());
			self.dipendente().livello(dipToDel.livello());
			self.dipendente().qualifica(dipToDel.qualifica());
			self.dipendente().pec(dipToDel.pec());
			self.dipendente().numeroCellulare(dipToDel.numeroCellulare());
			self.dipendente().numeroCellularePrivato(dipToDel.numeroCellularePrivato());
			self.dipendente().cellulareVisibile(dipToDel.cellulareVisibile());
			self.dipendente().numeroBreve(dipToDel.numeroBreve());
			self.dipendente().email(dipToDel.email());
			self.dipendente().netfax(dipToDel.netfax());
			self.dipendente().isUtenteHR(dipToDel.isUtenteHR());
			self.dipendente().provinciaNascitaIstat(dipToDel.provinciaNascitaIstat());
			self.dipendente().codiceUnita(dipToDel.codiceUnita());
			self.dipendente().descrizioneUnita(dipToDel.descrizioneUnita());
			self.dipendente().dataModificaPU(dipToDel.dataModificaPU());
			self.dipendente().utenteHR(dipToDel.utenteHR());
						
			self.setFormDipendente();
			self.submitDipendenteForm();

		}
	}

	self.btnModifica=function(matricolaId){
//		$('.ko_form_dipendente_op').attr('action', urlEdit);
//		$('.ko_form_dipendente_op').submit();
		
		self.formOperationDipendenteMatricola(matricolaId);
		urlEdit += "?matricolaId=" + matricolaId;
		urlEdit += "&searchUnitaDipendente=" + self.formRicercaDipendenteUnita();
		urlEdit += "&searchCognomeDipendente=" + self.formRicercaDipendenteCognome();
		urlEdit += "&searchMatricolaDipendente=" + self.formRicercaDipendenteMatricola();
		urlEdit += "&searchCurrentPage=" + self.currentPage();
		urlEdit += "&searchItemsPerPage=" + self.itemsPerPage();
		window.location.href = urlEdit;
	}

	self.btnNew=function(){
//		$('.ko_form_dipendente_op').attr('action', urlNew);
//		$('.ko_form_dipendente_op').submit();

		urlNew += "?searchUnitaDipendente=" + self.formRicercaDipendenteUnita();
		urlNew += "&searchCognomeDipendente=" + self.formRicercaDipendenteCognome();
		urlNew += "&searchMatricolaDipendente=" + self.formRicercaDipendenteMatricola();
		urlNew += "&searchCurrentPage=" + self.currentPage();
		urlNew += "&searchItemsPerPage=" + self.itemsPerPage();
		window.location.href = urlNew;

	}
	
	//Carico dettaglio dipendente
	self.loadDettaglioDipendente=function(){
		showLoadingAnimation();
		var allocazioneListTemp=ko.observableArray([]);
		var url = urlRest + "personeStrutture/getDettaglioDipendente/" + matricolaCorrente;

		_successEvent = function(data){
			self.dipendente(new Dipendente(data));
			self.setFormDipendente();
//			self.formDipendenteCognome(data.dipendente.cognome);
//			self.formDipendenteNome(data.dipendente.nome);
//			self.formDipendenteSesso(data.dipendente.sesso);
//			self.formDipendenteDataNascita(data.dipendente.dataNascita);
//			self.formDipendenteProvincia(data.dipendente.provinciaNascitaIstat);
//			self.formDipendenteComuneNascitDes(data.dipendente.comuneNascitaDescr);
//			self.formDipendenteComuneNascitIstat(data.dipendente.comuneNascitaIstat);
//			self.formDipendenteCodiceFiscale(data.dipendente.codiceFiscale);
//			self.formDipendenteUserName(data.dipendente.matricola);
//			self.formDipendenteEmail(data.dipendente.email);
//			self.formDipendenteUtenteHR(data.dipendente.utenteHR);
//			self.formDipendenteDisabled(data.dipendente.utenteHR?'disabled':undefined);
			
			
			$.each(data.allocazioni, function( key, item ){
				var alloc = ko.observable(new Allocazione(item));
				if(!self.dipendente().isUtenteHR()){
					alloc().permessi().isAdd(false);
				}
				
				allocazioneListTemp.push(alloc);
			});	
			self.allocazioneList(allocazioneListTemp.slice(0));
			hideLoadingAnimation();
		 };
		 getAjaxWithJSONResponse(_successEvent, url);
	}
	
	
	


	self.filtraUffici=function(idUnita,idUfficio){
		showLoadingAnimation();
		
		var idSelectUfficio = 'ufficio';
		if(!idSelectUfficio){
			idSelectUfficio = '#ufficio'; //id di default della select
		} else {
			idSelectUfficio = "#"+ idSelectUfficio;
		}
		$(idSelectUfficio).empty();
		
		var url = urlRest + "personeStrutture/ricercaUffici/"+idUnita;	
		
		_successEvent = function(data){
			if(!jQuery.isEmptyObject(data)){
				if($.isArray(data) && data.length) {
					$(idSelectUfficio).append($("<option></option>").attr("value","").text("Seleziona"));

					$.each(data, function(idx, obj) {
						$(idSelectUfficio).append($("<option></option>").attr("value",obj.codiceUnita).text(obj.descrizioneUnita));
					});
				} else {
					$(idSelectUfficio).append($("<option></option>").attr("value","").text("Seleziona"));
				}
			} else {
				$(idSelectUfficio).append($("<option></option>").attr("value","").text("Seleziona"));
			}

			
			$(idSelectUfficio).val(idUfficio);
			self.formAllocazioneUfficio(idUfficio);
			hideLoadingAnimation();
		 };

		_errorEvent = function(){
			$(idSelectUfficio).append($("<option></option>").attr("value","").text("Seleziona"));
			hideLoadingAnimation();
		 };

		 getAjaxWithJSONResponse(_successEvent, url,_errorEvent);
		
	}

	
	self.viewAllocazioneForm=function(allocazione,operation){
		$("#unita").attr("disabled", false);
		$("#ufficio").attr("disabled", false);
		$("#incarico").attr("disabled", false);
		
		self.formAllocazioneDisabled(undefined); 
		//showLoadingAnimation();
		self.formAllocazioneOperazione(operation);
		self.allocazioneSelected(allocazione);
		if(operation == "EDIT"){
			self.formAllocazioneUnita(allocazione.codiceUnita());
			
//			self.formAllocazioneDisabled(self.dipendente().utenteHR()?'disabled':undefined);
//			self.formAllocazioneDisabled(undefined); 

			self.formAllocazioneUnitaOld(allocazione.codiceUnita());
			self.formAllocazioneUfficioOld(allocazione.codiceUfficio());
			self.formAllocazioneIncaricoOld(allocazione.codiceIncarico());
			
			self.formAllocazioneUnitaDes(allocazione.unita());
			self.formAllocazioneUfficio(allocazione.codiceUfficio());
			self.formAllocazioneIncarico(allocazione.codiceIncarico());
			self.formAllocazioneInterno(allocazione.telefono());
			self.formAllocazioneTelefono(allocazione.telefono2());
			self.formAllocazioneFax(allocazione.fax());
			self.formAllocazionePiano(allocazione.piano());
			self.formAllocazioneStanza(allocazione.stanza());
			self.formAllocazioneCellulare(allocazione.numeroCellulare());
			self.formAllocazioneNumBreve(allocazione.numeroBreve());
			
			self.filtraUffici(allocazione.codiceUnita(),allocazione.codiceUfficio());
			$("#unita").attr("disabled", true);
			$("#ufficio").attr("disabled", true);
			$("#incarico").attr("disabled", true);
			
			jQuery('#form-allocazione').show();
			jQuery('#form-allocazione').focus();
		}else if(operation == "ADD"){
			self.formAllocazioneUnitaOld("");
			self.formAllocazioneUfficioOld("");
			self.formAllocazioneIncaricoOld("");
			self.formAllocazioneUnita("");
			self.formAllocazioneUnitaDes("");
			self.formAllocazioneUfficio("");
			self.formAllocazioneIncarico("");
			self.formAllocazioneInterno("");
			self.formAllocazioneTelefono("");
			self.formAllocazioneFax("");
			self.formAllocazionePiano("");
			self.formAllocazioneStanza("");
			self.formAllocazioneCellulare("");
			self.formAllocazioneNumBreve("");
			jQuery('#form-allocazione').show();
			jQuery('#form-allocazione').focus();
		}else if(operation == "DEL"){
			if(confirm("Si desidera eliminare l'allocazione selezionata?")){ 
				self.formAllocazioneUnitaOld(allocazione.codiceUnita());
				self.formAllocazioneUfficioOld(allocazione.codiceUfficio());
				self.formAllocazioneIncaricoOld(allocazione.codiceIncarico());
				
				self.formAllocazioneUnita(allocazione.codiceUnita());
				self.formAllocazioneUnitaDes(allocazione.unita());
				self.formAllocazioneUfficio(allocazione.codiceUfficio());
				self.formAllocazioneIncarico(allocazione.codiceIncarico());
				self.formAllocazioneInterno(allocazione.telefono());
				self.formAllocazioneTelefono(allocazione.telefono2());
				self.formAllocazioneFax(allocazione.fax());
				self.formAllocazionePiano(allocazione.piano());
				self.formAllocazioneStanza(allocazione.stanza());
				self.formAllocazioneCellulare(allocazione.numeroCellulare());
				self.formAllocazioneNumBreve(allocazione.numeroBreve());
				self.submitAllocazioneForm();
			}
		}
	}

	self.submitDipendenteForm=function(){
		showLoadingAnimation();

		if(self.formDipendenteOperazione()=="NEW"){
			var urlService = urlRest + "personeStrutture/salvaNuovoUtente";
			_successEvent = function(response){
				showMessage("Il nuovo utente e' stato aggiunto correttamente.");
				self.resetDipendenteForm();			
			}
			var jsonObj = {
					userName : self.formDipendenteUserName(),
					codiceFiscale : self.formDipendenteCodiceFiscale(),
					cognome : self.formDipendenteCognome(),
					nome : self.formDipendenteNome(),
					sesso : self.formDipendenteSesso(),
					dataDiNascita : self.formDipendenteDataNascita(),
					codiceIstatProvinciaDiNascita : self.formDipendenteProvincia(),
					descrComuneDiNascita : self.formDipendenteComuneNascitDes(),
					codiceIstatComuneDiNascita  : self.formDipendenteComuneNascitIstat(),
					email : self.formDipendenteEmail(),
					codiceUnita : self.formAllocazioneUnita(),
					descrizioneUnita : self.formAllocazioneUnitaDes(),
					codiceUfficio : self.formAllocazioneUfficio()!="" ? self.formAllocazioneUfficio() : null,
					codiceIncarico : self.formAllocazioneIncarico(),
					numeroInterno : self.formAllocazioneInterno(),
					telefono : self.formAllocazioneTelefono(),
					fax : self.formAllocazioneFax(),
					piano : self.formAllocazionePiano(),
					stanza : self.formAllocazioneStanza(),
					cellulare : self.formAllocazioneCellulare(),
					numeroBreveInail : self.formAllocazioneNumBreve()
			};
			
			//postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj,self.token());
			var tokenParam = new TokenHeader("CSCPTOKEN", "", urlRest+"token" );
			postAjaxWithGetToken(_successEvent, null, urlService, jsonObj, tokenParam);
			
		}else if(self.formDipendenteOperazione()=="EDIT"){
			var urlService = urlRest + "personeStrutture/modificaUtente";
			
			
			var allocazione = self.allocazioneList()[0]();
			self.formAllocazioneUnitaOld(allocazione.codiceUnita());
			self.formAllocazioneUfficioOld(allocazione.codiceUfficio());
			self.formAllocazioneIncaricoOld(allocazione.codiceIncarico());
			
			self.formAllocazioneUnita(allocazione.codiceUnita());
			self.formAllocazioneUnitaDes(allocazione.unita());
			self.formAllocazioneUfficio(allocazione.codiceUfficio());
			self.formAllocazioneIncarico(allocazione.codiceIncarico());
			self.formAllocazioneInterno(allocazione.telefono());
			self.formAllocazioneTelefono(allocazione.telefono2());
			self.formAllocazioneFax(allocazione.fax());
			self.formAllocazionePiano(allocazione.piano());
			self.formAllocazioneStanza(allocazione.stanza());
			self.formAllocazioneCellulare(allocazione.numeroCellulare());
			self.formAllocazioneNumBreve(allocazione.numeroBreve());
			
			
			_successEvent = function(response){
				showMessage("OK", "Dati utente modificati correttamente.");
				self.loadDettaglioDipendente();				
			}
			var jsonObj = {
					userName : self.formDipendenteUserName(),
					codiceFiscale : self.formDipendenteCodiceFiscale(),
					cognome : self.formDipendenteCognome(),
					nome : self.formDipendenteNome(),
					sesso : self.formDipendenteSesso(),
					dataDiNascita : self.formDipendenteDataNascita(),
					codiceIstatComuneDiNascita  : self.formDipendenteComuneNascitIstat(),
					descrComuneDiNascita : self.formDipendenteComuneNascitDes(),
					codiceIstatProvinciaDiNascita : self.formDipendenteProvincia(),
					email : self.formDipendenteEmail(),
					codiceUnita : self.formAllocazioneUnita(),
					descrizioneUnita : self.formAllocazioneUnitaDes(),
//					codiceUfficio : self.formAllocazioneUfficio(),
					codiceUfficio : allocazione.codiceUfficio(),
					codiceIncarico : self.formAllocazioneIncarico(),
					numeroInterno : self.formAllocazioneInterno(),
					telefono : self.formAllocazioneTelefono(),
					fax : self.formAllocazioneFax(),
					piano : self.formAllocazionePiano(),
					stanza : self.formAllocazioneStanza(),
					cellulare : self.formAllocazioneCellulare(),
					numeroBreveInail : self.formAllocazioneNumBreve()
			};
			
			//postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj,self.token());
			var tokenParam = new TokenHeader("CSCPTOKEN", "", urlRest+"token" );
			postAjaxWithGetToken(_successEvent, null, urlService, jsonObj, tokenParam);
			
		}else if(self.formDipendenteOperazione()=="DEL"){
			var urlService = urlRest + "personeStrutture/eliminaUtente";
			_successEvent = function(response){
				showMessage("OK", "Dati utente eliminati correttamente.");
				//nel caso di cancellazione dell'unico elemento contenuto nella lista
				//non viene rieffettuata la ricerca, cosi da non mostare il messaggio di "nessun risultato"
				if(self.dipendenteList().length == 1){
					self.emptyDipendenteList();
				}else{
					self.loadPage(1);					
				}
			}
			var jsonObj = {
					userName : self.formDipendenteUserName(),
					codiceFiscale : self.formDipendenteCodiceFiscale(),
					cognome : self.formDipendenteCognome(),
					nome : self.formDipendenteNome(),
					sesso : self.formDipendenteSesso(),
					dataDiNascita : self.formDipendenteDataNascita(),
					codiceIstatComuneDiNascita  : self.formDipendenteComuneNascitIstat(),
					descrComuneDiNascita : self.formDipendenteComuneNascitDes(),
					email : self.formDipendenteEmail(),
					codiceIstatProvinciaDiNascita : self.formDipendenteProvincia()
			};
			
			//postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj,self.token());
			var tokenParam = new TokenHeader("CSCPTOKEN", "", urlRest+"token" );
			postAjaxWithGetToken(_successEvent, null, urlService, jsonObj, tokenParam);
		}
		return false;
	}
	
	self.resetDipendenteForm=function(){
		if(self.formDipendenteOperazione()=="NEW"){
			self.dipendente(new Dipendente());
			self.setFormDipendente
//			self.formDipendenteCognome(self.dipendente().cognome());
//			self.formDipendenteNome(self.dipendente().nome());
//			self.formDipendenteSesso(self.dipendente().sesso());
//			self.formDipendenteDataNascita(self.dipendente().dataNascita());
//			self.formDipendenteProvincia(self.dipendente().provinciaNascitaIstat());
//			self.formDipendenteComuneNascitDes(self.dipendente().comuneNascitaDescr());
//			self.formDipendenteComuneNascitIstat(self.dipendente().comuneNascitaIstat());
//			self.formDipendenteCodiceFiscale(self.dipendente().codiceFiscale());
//			self.formDipendenteUserName(self.dipendente().matricola());
//			self.formDipendenteEmail(self.dipendente().email());
//			self.formDipendenteUtenteHR(self.dipendente().utenteHR());
//			self.formDipendenteDisabled(undefined);

			var allocazione = ko.observable(new Allocazione());
			self.formAllocazioneUnita(allocazione().codiceUnita());
			self.formAllocazioneUnitaDes(allocazione().unita());
			self.formAllocazioneUfficio(allocazione().codiceUfficio());
			self.formAllocazioneIncarico(allocazione().codiceIncarico());
			self.formAllocazioneInterno(allocazione().telefono());
			self.formAllocazioneTelefono(allocazione().telefono2());
			self.formAllocazioneFax(allocazione().fax());
			self.formAllocazionePiano(allocazione().piano());
			self.formAllocazioneStanza(allocazione().stanza());
			self.formAllocazioneCellulare(allocazione().numeroCellulare());
			self.formAllocazioneNumBreve(allocazione().numeroBreve());
			
			$(".ko_dipendente_form_comuneNascitaIstat").empty();
			$(".ko_dipendente_form_comuneNascitaIstat").append($("<option></option>").attr("value","").text("Seleziona"));
			$(".ko_allocazione_form_ufficio").empty();
			$(".ko_allocazione_form_ufficio").append($("<option></option>").attr("value","").text("Seleziona"));
			
		} else if(self.formDipendenteOperazione()=="EDIT"){
			self.setFormDipendente();
//			self.formDipendenteCognome(self.dipendente().cognome());
//			self.formDipendenteNome(self.dipendente().nome());
//			self.formDipendenteSesso(self.dipendente().sesso());
//			self.formDipendenteDataNascita(self.dipendente().dataNascita());
//			self.formDipendenteProvincia(self.dipendente().provinciaNascitaIstat());
//			self.formDipendenteComuneNascitDes(self.dipendente().comuneNascitaDescr());
//			self.formDipendenteComuneNascitIstat(self.dipendente().comuneNascitaIstat());
//			self.formDipendenteCodiceFiscale(self.dipendente().codiceFiscale());
//			self.formDipendenteUserName(self.dipendente().matricola());
//			self.formDipendenteEmail(self.dipendente().email());
//			self.formDipendenteUtenteHR(self.dipendente().utenteHR());
//			self.formDipendenteDisabled(self.dipendente().utenteHR()?'disabled':undefined);
			$(".ko_dipendente_form_comuneNascitaIstat").empty();
			$(".ko_dipendente_form_comuneNascitaIstat").append($("<option></option>").attr("value","").text("Seleziona"));
		}
	}
	
	self.annullaOperazione=function(){
		//window.location.href=urlBack;
		$('.ko_form_dipendente_indietro').attr('action', urlBack);
		$('.ko_form_dipendente_indietro').submit();
	}
	
	self.closeAllocazioneForm=function(){
		jQuery('#form-allocazione').hide();
	}
	
	self.submitAllocazioneForm=function(){
		showLoadingAnimation();

		var jsonObj = {
				userName : self.formDipendenteUserName(),
				codiceUnita : self.formAllocazioneUnita(),
				descrizioneUnita : self.formAllocazioneUnitaDes(),
				codiceUfficio : self.formAllocazioneUfficio(),
				codiceIncarico : self.formAllocazioneIncarico(),
				numeroInterno : self.formAllocazioneInterno(),
				telefono : self.formAllocazioneTelefono(),
				fax : self.formAllocazioneFax(),
				piano : self.formAllocazionePiano(),
				stanza : self.formAllocazioneStanza(),
				cellulare : self.formAllocazioneCellulare(),
				numeroBreveInail : self.formAllocazioneNumBreve(),
				codiceUnitaOld : self.formAllocazioneUnitaOld(),
				codiceUfficioOld : self.formAllocazioneUfficioOld(),
				codiceIncaricoOld : self.formAllocazioneIncaricoOld()
		};

		var operazione = self.formAllocazioneOperazione();
		var urlService;
		var msgOk;
		if(operazione == "EDIT"){
			urlService = urlRest + "personeStrutture/modificaAllocazione";
			msgOk ="Allocazione modificata correttamente.";
		}else if(operazione == "ADD"){
			urlService = urlRest + "personeStrutture/salvaNuovaAllocazione";
			msgOk ="Nuova allocazione aggiunta correttamente.";
		}else if(operazione == "DEL"){
			urlService = urlRest + "personeStrutture/eliminaAllocazione";
			msgOk ="Allocazione eliminata correttamente";
		}
		
		_successEvent = function(response){
			showMessage("OK", msgOk);
			self.closeAllocazioneForm();
			
			//nel caso di cancellazione dell'unico elemento contenuto nella lista
			//non viene rieffettuata la ricerca
			if(operazione == "DEL" && self.allocazioneList().length==1){
				self.setAllocazioneNoData();
			}else{
				self.loadDettaglioDipendente();
			}
			
		}

		//postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj,self.token());
		var tokenParam = new TokenHeader("CSCPTOKEN", "", urlRest+"token" );
		postAjaxWithGetToken(_successEvent, null, urlService, jsonObj, tokenParam);
		
		return false;
	}
	
	self.initOperation=function(operation){
		showLoadingAnimation();
		self.formDipendenteOperazione(operation);
		if(operation == "NEW"){
			self.dipendente(new Dipendente());
			self.formDipendenteDisabled(undefined);
			hideLoadingAnimation();
		}else if(operation == "EDIT"){
			self.loadDettaglioDipendente();
			if(self.allocazioneList().length == 0){
				self.setAllocazioneNoData();
			}
		}else if(operation == "SEARCH"){
			//initPagination(self,self.loadListaDipendente);
			self.initSearch();
			//hideLoadingAnimation();
		}
	}

	self.search=function(){
		self.setSearchParams("cognome", encodeUrlValue(self.formRicercaDipendenteCognome()));
		self.setSearchParams("matricola", encodeUrlValue(self.formRicercaDipendenteMatricola()));
		self.setSearchParams("unita", encodeUrlValue(self.formRicercaDipendenteUnita()));
		self.loadPage(1);
//		if(self.dipendenteList.length == 0){
//			var dipendente = ko.observable(new Dipendente());
//			dipendente().descrizioneUnita(noData);
//			self.dipendenteList.push(dipendente);
//		}
	}

	self.initSearch=function(){
		var isSearchInit = false;
		var searchCognomeDipendente = getUrlVars()["searchCognomeDipendente"];
		var searchMatricolaDipendente = getUrlVars()["searchMatricolaDipendente"];
		var searchUnitaDipendente = getUrlVars()["searchUnitaDipendente"];
		var searchItemsPerPage = getUrlVars()["searchItemsPerPage"];
		var searchCurrentPage = getUrlVars()["searchCurrentPage"];
		
		if(searchCognomeDipendente && searchCognomeDipendente!=""){
			self.formRicercaDipendenteCognome(searchCognomeDipendente);
			isSearchInit = true;
		}

		if(searchMatricolaDipendente && searchMatricolaDipendente!=""){
			self.formRicercaDipendenteMatricola(searchMatricolaDipendente);
			isSearchInit = true;
		}

		if(searchUnitaDipendente && searchUnitaDipendente!=""){
			self.formRicercaDipendenteUnita(searchUnitaDipendente);
			isSearchInit = true;
		}

		if(searchItemsPerPage && searchItemsPerPage!=""){
			self.itemsPerPage(searchItemsPerPage);
		}
		
		if(isSearchInit){
			self.setSearchParams("cognome", self.formRicercaDipendenteCognome());
			self.setSearchParams("matricola", self.formRicercaDipendenteMatricola());
			self.setSearchParams("unita", self.formRicercaDipendenteUnita());
			self.loadPage(searchCurrentPage ? parseInt(searchCurrentPage) : 1);
		}else{
			hideLoadingAnimation();
		}
	}
	
	self.setAllocazioneNoData = function(){
		self.allocazioneList.removeAll();
		var allocazione = ko.observable(new Allocazione());
		allocazione().unita(noData);
		allocazione().permessi().isAdd(true);
		self.allocazioneList.push(allocazione);

	}
	
	self.gestioneErrore = function(xhr, textStatus) {
		if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
			showMessageUnauthorized("Gestione persone");
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
		initProfiloToken(self,self.getTokenOk,self.gestioneErrore);
		if(operazioneReq == "SEARCH"){
			initPagination(self,self.loadListaDipendente);
		}
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
//OGGETTO Dipendente
//*****************************************************************
function Dipendente(dataJSON){
	var self=this;
	self.matricola = ko.observable("");
	self.codiceFiscale = ko.observable("");
	self.cognome = ko.observable("");
	self.nome = ko.observable("");
	self.sesso = ko.observable("");
	self.dataNascita = ko.observable("");
	self.comuneNascitaIstat = ko.observable("");
	self.comuneNascitaDescr = ko.observable("");
	self.contratto = ko.observable("");
	self.livello = ko.observable("");
	self.qualifica = ko.observable("");
	self.pec = ko.observable("");
	self.numeroCellulare = ko.observable("");
	self.numeroCellularePrivato = ko.observable("");
	self.cellulareVisibile = ko.observable("");
	self.numeroBreve = ko.observable("");
	self.email = ko.observable("");
	self.netfax = ko.observable("");
	self.isUtenteHR = ko.observable("");
	self.provinciaNascitaIstat = ko.observable("");
	self.codiceUnita = ko.observable("");
	self.descrizioneUnita = ko.observable("");
	self.dataModificaPU = ko.observable("");
	self.utenteHR = ko.observable("");
	//
	self.firstAllocazioneDipendente=ko.observable(new Allocazione());
	self.allocazioneDipendenteList=ko.observableArray([]);
	self.permessi = ko.observable(new Permessi());

	self.create = function(dataJSON){
		if(dataJSON.dipendente){
			self.matricola(dataJSON.dipendente.matricola);
			self.codiceFiscale(dataJSON.dipendente.codiceFiscale);
			self.cognome(dataJSON.dipendente.cognome);
			self.nome(dataJSON.dipendente.nome);
			self.sesso(dataJSON.dipendente.sesso);
			self.dataNascita(dataJSON.dipendente.dataNascita);
			self.comuneNascitaIstat(dataJSON.dipendente.comuneNascitaIstat);
			self.comuneNascitaDescr(dataJSON.dipendente.comuneNascitaDescr);
			self.contratto(dataJSON.dipendente.contratto);
			self.livello(dataJSON.dipendente.livello);
			self.qualifica(dataJSON.dipendente.qualifica);
			self.pec(dataJSON.dipendente.pec);
			self.numeroCellulare(dataJSON.dipendente.numeroCellulare);
			self.numeroCellularePrivato(dataJSON.dipendente.numeroCellularePrivato);
			self.cellulareVisibile(dataJSON.dipendente.cellulareVisibile);
			self.numeroBreve(dataJSON.dipendente.numeroBreve);
			self.email(dataJSON.dipendente.email);
			self.netfax(dataJSON.dipendente.netfax);
			self.isUtenteHR(dataJSON.dipendente.isUtenteHR);
			self.provinciaNascitaIstat(dataJSON.dipendente.provinciaNascitaIstat);
			self.codiceUnita(dataJSON.dipendente.codiceUnita);
			self.descrizioneUnita(dataJSON.dipendente.descrizioneUnita);
			self.dataModificaPU(dataJSON.dipendente.dataModificaPU);
			self.utenteHR(dataJSON.dipendente.utenteHR);
			//
			self.permessi().isAdd(true);
			self.permessi().isEdit(true);
			if(!dataJSON.dipendente.isUtenteHR){
				self.permessi().isDel(true);		
			}
		}
		//
		if(dataJSON.allocazioni){
			$.each(dataJSON.allocazioni, function( key, item ){
				var alloc = ko.observable(new Allocazione(item));
				self.allocazioneDipendenteList.push(alloc);
			});	
		}
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}	


//*****************************************************************
//OGGETTO Allocazione
//*****************************************************************
function Allocazione(dataJSON){
	var self=this;
	self.codiceUnita = ko.observable("");
	self.unita = ko.observable("");
	self.ufficio = ko.observable("");
	self.codiceUfficio = ko.observable("");
	self.incarico = ko.observable("");
	self.codiceIncarico = ko.observable("");
	self.telefono = ko.observable("");
	self.telefono2 = ko.observable("");
	self.fax = ko.observable("");
	self.piano = ko.observable("");
	self.stanza = ko.observable("");
	self.numeroCellulare = ko.observable("");
	self.numeroBreve = ko.observable("");
	self.allocazioneHR = ko.observable("");
	self.rpvtel = ko.observable("");
	self.permessi = ko.observable(new Permessi());
	
	self.create = function(dataJSON){
		self.codiceUnita(dataJSON.codiceUnita);
		self.unita(dataJSON.unita);
		self.codiceUfficio(dataJSON.codiceUfficio);
		self.ufficio(dataJSON.ufficio);
		self.incarico(dataJSON.incarico);
		self.codiceIncarico(dataJSON.codiceIncarico);
		self.telefono(dataJSON.telefono);
		self.telefono2(dataJSON.telefono2);
		self.fax(dataJSON.fax);
		self.piano(dataJSON.piano);
		self.stanza(dataJSON.stanza);
		self.numeroCellulare(dataJSON.numeroCellulare);
		self.numeroBreve(dataJSON.numeroBreve);
		self.allocazioneHR(dataJSON.allocazioneHR);
		self.rpvtel(dataJSON.rpvtel);

		self.permessi().isAdd(true);
		if(model.profiloToken()){
			if(model.profiloToken().isAdmin() || model.profiloToken().codiciUnita[self.codiceUnita()]){
				self.permessi().isEdit(true);
				self.permessi().isDel(true);		
			}
		}
	}

	if(dataJSON){
		self.create(dataJSON);
	}
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
//	self.codiciUnita = new Array();
//	self.isAdmin = ko.observable(false);
//	self.isGestioneSede = ko.observable(false);
//	self.isGestioneOrgani = ko.observable(false);
//	self.isGestioneComitati = ko.observable(false);
//
//	self.create = function(dataJSON){
//		self.matricola(dataJSON.matricola);
//		self.token(dataJSON.token);
//		self.isAdmin(dataJSON.isAdmin);
//		
//		if(!self.isAdmin()){
//			for(var i=0; i < dataJSON.codiciUnita.length ; i++){
//				self.codiciUnita[dataJSON.codiciUnita[i]] = '1';
//			}
//		}
//		self.isGestioneSede(dataJSON.isGestioneSede);
//		self.isGestioneOrgani(dataJSON.isGestioneOrgani);
//		self.isGestioneComitati(dataJSON.isGestioneComitati);
//	}
//
//	if(dataJSON){
//		self.create(dataJSON);
//	}
//}
	