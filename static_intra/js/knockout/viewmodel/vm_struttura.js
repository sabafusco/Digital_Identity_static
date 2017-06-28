//*****************************************************************
//VIEMODEL PRICIPALE - INIT PAGINA
//***************************************************************** 
function StrutturaViewModel(params) {

  //INIZIALIZZO LE VARIABILE DEL VIEMODEL
	var noData = "Dato non presente";
  
	var self = this;	
	
	self.struttureList=ko.observableArray([]);
	self.strutturaSelected = ko.observable(new Struttura());
	self.emailList=ko.observableArray([]);
	self.emailSelected = ko.observable(Email);
	self.telList=ko.observableArray([]);	
	self.telSelected = ko.observable(Telefono);
	self.orarioList=ko.observableArray([]);	
	self.orarioSelected = ko.observable(OrarioSportello);
	self.orarioOptions=ko.observableArray([]);

	//gestione profilo e token
//	self.profiloToken = ko.observable(new ProfiloToken());
//	self.token = ko.observable("");

	//form operazione add e  edit
	self.disableBtnAddStruttura = ko.observable("");
	self.formOperationStrutturaCodiceUnita = ko.observable("");
	
	//form ricerca
	self.formRicercaStrutturaNome = ko.observable("");
	self.formRicercaStrutturaTipo = ko.observable("");
	self.formRicercaStrutturaUnita = ko.observable("");
	self.formRicercaStrutturaCap = ko.observable("");

	//struttura form
	self.formStrutturaOperazione = ko.observable("");
	self.formStrutturaUnitaHR = ko.observable("");
	self.formStrutturaCodiceTipoUnita = ko.observable("");
	self.formStrutturaDescrizioneUnita = ko.observable("");
	self.formStrutturaCodiceUnitaMadre = ko.observable("");
	self.formStrutturaSiglaUnita = ko.observable("");
	self.formStrutturaCitta = ko.observable("");
	self.formStrutturaIndirizzo = ko.observable("");
	self.formStrutturaProvincia = ko.observable("");
	self.formStrutturaCap = ko.observable("");
	self.formStrutturaRpv = ko.observable("");
	self.formStrutturaBarriereArchitettoniche = ko.observable(false);
	self.formStrutturaNote = ko.observable("");
	self.formStrutturaSantoGG = ko.observable("");
	self.formStrutturaSantoMM = ko.observable("");
	self.formStrutturaAbilitaModifica = ko.observable(false);

	//email form
	self.formEmailOperazione = ko.observable("");
	self.formEmailOldEmail = ko.observable("");
	self.formEmailNewEmail = ko.observable("");
	self.formEmailNewDesc = ko.observable("");
	self.formEmailNewIdDesc = ko.observable("");
	
	//tel form
	self.formTelOperazione = ko.observable("");
	self.formTelOldTel = ko.observable("");
	self.formTelNewTel = ko.observable("");
	self.formTelNewDesc = ko.observable("");
	self.formTelNewIdDesc = ko.observable("");
	self.formTelNewDescAgg = ko.observable("");
	self.formTelNewPiano = ko.observable("");
	self.formTelNewStanza = ko.observable("");

	//tel orario
	self.formOrarioOperazione = ko.observable("");
	self.formOrarioNote = ko.observable("");
	self.formOrarioLunInizio0 = ko.observable("");
	self.formOrarioLunFine0 = ko.observable("");
	self.formOrarioLunInizio1 = ko.observable("");
	self.formOrarioLunFine1 = ko.observable("");
	self.formOrarioLunInizio2 = ko.observable("");
	self.formOrarioLunFine2 = ko.observable("");
	self.formOrarioLunInizio3 = ko.observable("");
	self.formOrarioLunFine3 = ko.observable("");
	self.formOrarioMarInizio0 = ko.observable("");
	self.formOrarioMarFine0 = ko.observable("");
	self.formOrarioMarInizio1 = ko.observable("");
	self.formOrarioMarFine1 = ko.observable("");
	self.formOrarioMarInizio2 = ko.observable("");
	self.formOrarioMarFine2 = ko.observable("");
	self.formOrarioMarInizio3 = ko.observable("");
	self.formOrarioMarFine3 = ko.observable("");
	self.formOrarioMerInizio0 = ko.observable("");
	self.formOrarioMerFine0 = ko.observable("");
	self.formOrarioMerInizio1 = ko.observable("");
	self.formOrarioMerFine1 = ko.observable("");
	self.formOrarioMerInizio2 = ko.observable("");
	self.formOrarioMerFine2 = ko.observable("");
	self.formOrarioMerInizio3 = ko.observable("");
	self.formOrarioMerFine3 = ko.observable("");
	self.formOrarioGioInizio0 = ko.observable("");
	self.formOrarioGioFine0 = ko.observable("");
	self.formOrarioGioInizio1 = ko.observable("");
	self.formOrarioGioFine1 = ko.observable("");
	self.formOrarioGioInizio2 = ko.observable("");
	self.formOrarioGioFine2 = ko.observable("");
	self.formOrarioGioInizio3 = ko.observable("");
	self.formOrarioGioFine3 = ko.observable("");
	self.formOrarioVenInizio0 = ko.observable("");
	self.formOrarioVenFine0 = ko.observable("");
	self.formOrarioVenInizio1 = ko.observable("");
	self.formOrarioVenFine1 = ko.observable("");
	self.formOrarioVenInizio2 = ko.observable("");
	self.formOrarioVenFine2 = ko.observable("");
	self.formOrarioVenInizio3 = ko.observable("");
	self.formOrarioVenFine3 = ko.observable("");
	self.formOrarioSportello = ko.observable("");
	self.formOrarioCodiceArea = ko.observable("");
	self.formOrarioDescrizioneArea = ko.observable("");

	
	
	//paginazione
//	self.itemsPerPage=ko.observable(10);
//	self.pages=ko.observableArray([]);
//	self.currentPage = ko.observable(1);
//	self.numElementi = ko.observable(0);
//	self.numPagine = ko.observable(5);
//	self.numPagineMax = ko.observable(0);
	//end paginazione

	self.setFormStruttura=function(){
		self.formStrutturaUnitaHR(self.strutturaSelected().unitaHR());
		self.formStrutturaCodiceTipoUnita(self.strutturaSelected().codiceTipoUnita());
		self.formStrutturaDescrizioneUnita(self.strutturaSelected().descrizioneUnita());
		self.formStrutturaCodiceUnitaMadre(self.strutturaSelected().codiceUnitaMadre());
		self.formStrutturaSiglaUnita(self.strutturaSelected().siglaUnita());
		self.formStrutturaCitta(self.strutturaSelected().citta());
		self.formStrutturaIndirizzo(self.strutturaSelected().indirizzo());
		self.formStrutturaProvincia(self.strutturaSelected().provincia());
		self.formStrutturaCap(self.strutturaSelected().cap());
		self.formStrutturaRpv(self.strutturaSelected().rpv());
		self.formStrutturaBarriereArchitettoniche(self.strutturaSelected().barriereArchitettoniche());
		self.formStrutturaNote(self.strutturaSelected().note());
		self.formStrutturaSantoGG(self.strutturaSelected().santoGG());
		self.formStrutturaSantoMM(self.strutturaSelected().santoMM());	
	}
	
	//set del token
//	self.setToken=function(){
//		var url = urlRest +"profile";
//		var _successEvent=function(data) {
//			self.profiloToken(new ProfiloToken(data));
//			self.token(self.profiloToken().token());
//			//se non è amministratore , gestione sede o gestione organi l'utente non può aggiungere strutture
//			self.disableBtnAddStruttura(self.profiloToken().isAdmin() || self.profiloToken().isGestioneSede() || self.profiloToken().isGestioneOrgani()?undefined:'disabled');
//		};
//		getAjaxWithJSONResponse(_successEvent, url);
//	}
	
	self.getTokenOk=function(){
		self.disableBtnAddStruttura(self.profiloToken().isAdmin() || self.profiloToken().isGestioneSede() || self.profiloToken().isGestioneOrgani()?undefined:'disabled');
	}

	//Carico lista strutture
	self.loadListaStrutture=function(){
		showLoadingAnimation();
		var struttureListTemp=ko.observableArray([]);
		//self.emptyStruttureList();
		
		var url = urlRest + "personeStrutture/pagListStrutture?page=" + (self.currentPage()-1) + 
			"&offset=" + self.itemsPerPage() +
			"&nome=" + self.getSearchParams("nome") + 
			"&tipo=" + self.getSearchParams("tipo") + 
			"&unita=" + self.getSearchParams("unita") + 
			"&cap=" + self.getSearchParams("cap");
		
		_successEvent = function(data){
			//paginazione
			//if(self.currentPage() == 1){
			self.numElementi(parseInt(data.size));
			self.numPagineMax(Math.ceil(parseInt(self.numElementi()) / parseInt(self.itemsPerPage())));
			self.paginazioneNumber();			
			//paginazione end

			$.each(data.list, function( key, item ){
				var com = ko.observable(new Struttura(item));
				struttureListTemp.push(com);
			});	
			self.struttureList(struttureListTemp.slice(0));
			hideLoadingAnimation();
		 };
		 getAjaxWithJSONResponse(_successEvent, url);
	}
	
	self.btnElimina=function(codiceUnita){
		self.formOperationStrutturaCodiceUnita(codiceUnita);
		self.formStrutturaOperazione('DEL');
		if(confirm("Eliminare la struttura selezionata?")){
			codiceUnitaCorrente = codiceUnita;
			self.submitStrutturaForm();

		}
	}

	self.btnModifica=function(codiceUnita){
		self.formOperationStrutturaCodiceUnita(codiceUnita);
//		$('.ko_form_struttura_op').attr('action', urlEdit);
//		$('.ko_form_struttura_op').submit();
		
		urlEdit += "?unita=" + codiceUnita;
		urlEdit += "&searchNomeStruttura=" + self.formRicercaStrutturaNome();
		urlEdit += "&searchTipoStruttura=" + self.formRicercaStrutturaTipo();
		urlEdit += "&searchUnitaStruttura=" + self.formRicercaStrutturaUnita();
		urlEdit += "&searchCapStruttura=" + self.formRicercaStrutturaCap();
		urlEdit += "&searchCurrentPage=" + self.currentPage();
		urlEdit += "&searchItemsPerPage=" + self.itemsPerPage();
		window.location.href = urlEdit;
	}

	self.btnNew=function(tipoComitato){
//		$('.ko_form_struttura_op').attr('action', urlNew);
//		$('.ko_form_struttura_op').submit();
		
		urlNew += "?searchNomeStruttura=" + self.formRicercaStrutturaNome();
		urlNew += "&searchTipoStruttura=" + self.formRicercaStrutturaTipo();
		urlNew += "&searchUnitaStruttura=" + self.formRicercaStrutturaUnita();
		urlNew += "&searchCapStruttura=" + self.formRicercaStrutturaCap();
		urlNew += "&searchCurrentPage=" + self.currentPage();
		urlNew += "&searchItemsPerPage=" + self.itemsPerPage();
		window.location.href = urlNew;
	}

	//Carico la lista delle email
	self.loadStruttura=function(){
		showLoadingAnimation();
		var emailListTemp=ko.observableArray([]);
		var url = urlRest + "personeStrutture/getDettaglioStruttura/" + codiceUnitaCorrente;

		_successEvent = function(data){
			self.strutturaSelected(new Struttura(data));
			self.setFormStruttura();
			self.abilitaModifiche();
			hideLoadingAnimation();			
		};
		
		_errorEvent = function(data){
			//nessuna gestione	
		};

		getAjaxWithJSONResponse(_successEvent, url, _errorEvent);
	}
	
	//Carico la lista delle email
	self.loadEmail=function(){
		showLoadingAnimation();
		var emailListTemp=ko.observableArray([]);
		var url = urlRest + "personeStrutture/getMailStruttura/" + codiceUnitaCorrente;

		_successEvent = function(data){
			$.each(data, function( key, item ){
				var email = ko.observable(new Email(item));
				emailListTemp.push(email);
			});	
			self.emailList(emailListTemp.slice(0));

			jQuery('#form-email-struttura').hide();
			hideLoadingAnimation();
		 };

		 _errorEvent = function(data){
				//nessuna gestione	
		};

		getAjaxWithJSONResponse(_successEvent, url, _errorEvent);
	}

	//Carico la lista dei tel
	self.loadTel=function(){
		showLoadingAnimation();
		var telListTemp=ko.observableArray([]);
		var url = urlRest + "personeStrutture/getTelefoniStruttura/" + codiceUnitaCorrente;

		_successEvent = function(data){
			$.each(data, function( key, item ){
				var tel = ko.observable(new Telefono(item));
				telListTemp.push(tel);
			});	
			self.telList(telListTemp.slice(0));

			jQuery('#form-tel-struttura').hide();
			hideLoadingAnimation();
		 };

		 _errorEvent = function(data){
				//nessuna gestione	
		};

		getAjaxWithJSONResponse(_successEvent, url, _errorEvent);
	}

	//Carico la lista degli orari sportello
	self.loadOrarioSportello=function(){
		showLoadingAnimation();
		var orarioListTemp=ko.observableArray([]);
		var url = urlRest + "personeStrutture/getOrarioSportello/" + codiceUnitaCorrente;

		_successEvent = function(data){
			$.each(data, function( key, item ){
				var tel = ko.observable(new OrarioSportello(item));
				orarioListTemp.push(tel);
			});	
			self.orarioList(orarioListTemp.slice(0));

//			jQuery('#form-tel-struttura').hide();
			hideLoadingAnimation();
		 };

		 _errorEvent = function(data){
				//nessuna gestione	
		};

		getAjaxWithJSONResponse(_successEvent, url, _errorEvent);
	}
	
	
	self.emptyStruttureList=function(email,operation){
		var struttureListT=ko.observableArray([]);
		self.struttureList(struttureListT.slice(0)); //svuoto i risultati ricerca
	}	
		
	self.emptyFormRicerca=function(email,operation){
		self.formRicercaStrutturaNome("");
		self.formRicercaStrutturaTipo("");
		self.formRicercaStrutturaUnita("");
		self.formRicercaStrutturaCap("");
	}	
	
	self.viewEmailForm=function(email,operation){
		//showLoadingAnimation();
		self.formEmailOperazione(operation);
		self.emailSelected(email)
		if(operation == "EDIT"){
			jQuery('#label-form-email-struttura').text(labelFormEditEmail);
			self.formEmailOldEmail(email.eMail());
			self.formEmailNewEmail(email.eMail());
			self.formEmailNewDesc(email.descrizioneTipoEMail());
			self.formEmailNewIdDesc(email.tipoEMail());	
			jQuery('#form-email-struttura').show();
			jQuery('#descrizione_email').prop('disabled', 'disabled');
		}else if(operation == "ADD"){
			jQuery('#label-form-email-struttura').text(labelFormAddEmail);
			self.formEmailOldEmail("");
			self.formEmailNewEmail("");
			self.formEmailNewDesc("");
			self.formEmailNewIdDesc("");
			jQuery('#form-email-struttura').show();
			jQuery('#descrizione_email').prop('disabled', false);
		}else if(operation == "DEL"){
			if(confirm("Eliminare l' email selezionata?")){
				jQuery('#descrizione_email').prop('disabled', false);
				self.formEmailOldEmail(email.eMail());
				self.formEmailNewEmail(email.eMail());
				self.formEmailNewDesc(email.descrizioneTipoEMail());
				self.formEmailNewIdDesc(email.tipoEMail());
				self.submitEmailForm();
			}
		}
		//hideLoadingAnimation();
	}
	
	self.viewTelForm=function(tel,operation){
		//showLoadingAnimation();
		self.formTelOperazione(operation);
		self.telSelected(tel)
		if(operation == "EDIT"){
			jQuery('#label-form-tel-struttura').text(labelFormEditTel);
			self.formTelOldTel(tel.numeroTelefono());
			self.formTelNewTel(tel.numeroTelefono());
			self.formTelNewDesc(tel.descrizioneTipoTelefono());
			self.formTelNewIdDesc(tel.tipoTelefono());
			self.formTelNewDescAgg(tel.descrizioneAggiuntiva());
			self.formTelNewPiano(tel.piano());
			self.formTelNewStanza(tel.stanza());			
			jQuery('#form-tel-struttura').show();
			$("html, body").animate({scrollTop: $('#form-tel-struttura').offset().top }, 500);
			jQuery('#descrizione_tel').prop('disabled', 'disabled');
		}else if(operation == "ADD"){
			jQuery('#label-form-tel-struttura').text(labelFormAddTel);
			self.formTelOldTel("");
			self.formTelNewTel("");
			self.formTelNewDesc("");
			self.formTelNewIdDesc("");
			self.formTelNewDescAgg("");
			self.formTelNewPiano("");
			self.formTelNewStanza("");
			jQuery('#form-tel-struttura').show();
			$("html, body").animate({scrollTop: $('#form-tel-struttura').offset().top }, 500);
			jQuery('#descrizione_tel').prop('disabled', false);
		}else if(operation == "DEL"){
			if(confirm("Eliminare il numero selezionato?")){
				jQuery('#descrizione_tel').prop('disabled', false);
				self.formTelOldTel(tel.numeroTelefono());
				self.formTelNewTel(tel.numeroTelefono());
				self.formTelNewDesc(tel.descrizioneTipoTelefono());
				self.formTelNewIdDesc(tel.tipoTelefono());
				self.formTelNewDescAgg(tel.descrizioneAggiuntiva());
				self.formTelNewPiano(tel.piano());
				self.formTelNewStanza(tel.stanza());

				self.submitTelForm();
			}
		}
		//hideLoadingAnimation();
	}
	
	self.viewOrarioForm=function(orario,operation){
		//showLoadingAnimation();
		self.formOrarioOperazione(operation);
		self.orarioSelected(orario)
		if(operation == "EDIT"){
			jQuery('#label-form-orario-struttura').text(labelFormEditOrario);

			self.formOrarioNote(orario.primoGiorno().note());
			self.formOrarioSportello(orario.sportello());
			self.formOrarioCodiceArea(orario.codiceArea());
			self.formOrarioDescrizioneArea(orario.descrizioneArea());
			self.formOrarioLunInizio0(orario.lunedi().inizio0());
			self.formOrarioLunFine0(orario.lunedi().fine0());
			self.formOrarioLunInizio1(orario.lunedi().inizio1());
			self.formOrarioLunFine1(orario.lunedi().fine1());
			self.formOrarioLunInizio2(orario.lunedi().inizio2());
			self.formOrarioLunFine2(orario.lunedi().fine2());
			self.formOrarioLunInizio3(orario.lunedi().inizio3());
			self.formOrarioLunFine3(orario.lunedi().fine3());
			self.formOrarioMarInizio0(orario.martedi().inizio0());
			self.formOrarioMarFine0(orario.martedi().fine0());
			self.formOrarioMarInizio1(orario.martedi().inizio1());
			self.formOrarioMarFine1(orario.martedi().fine1());
			self.formOrarioMarInizio2(orario.martedi().inizio2());
			self.formOrarioMarFine2(orario.martedi().fine2());
			self.formOrarioMarInizio3(orario.martedi().inizio3());
			self.formOrarioMarFine3(orario.martedi().fine3());
			self.formOrarioMerInizio0(orario.mercoledi().inizio0());
			self.formOrarioMerFine0(orario.mercoledi().fine0());
			self.formOrarioMerInizio1(orario.mercoledi().inizio1());
			self.formOrarioMerFine1(orario.mercoledi().fine1());
			self.formOrarioMerInizio2(orario.mercoledi().inizio2());
			self.formOrarioMerFine2(orario.mercoledi().fine2());
			self.formOrarioMerInizio3(orario.mercoledi().inizio3());
			self.formOrarioMerFine3(orario.mercoledi().fine3());
			self.formOrarioGioInizio0(orario.giovedi().inizio0());
			self.formOrarioGioFine0(orario.giovedi().fine0());
			self.formOrarioGioInizio1(orario.giovedi().inizio1());
			self.formOrarioGioFine1(orario.giovedi().fine1());
			self.formOrarioGioInizio2(orario.giovedi().inizio2());
			self.formOrarioGioFine2(orario.giovedi().fine2());
			self.formOrarioGioInizio3(orario.giovedi().inizio3());
			self.formOrarioGioFine3(orario.giovedi().fine3());
			self.formOrarioVenInizio0(orario.venerdi().inizio0());
			self.formOrarioVenFine0(orario.venerdi().fine0());
			self.formOrarioVenInizio1(orario.venerdi().inizio1());
			self.formOrarioVenFine1(orario.venerdi().fine1());
			self.formOrarioVenInizio2(orario.venerdi().inizio2());
			self.formOrarioVenFine2(orario.venerdi().fine2());
			self.formOrarioVenInizio3(orario.venerdi().inizio3());
			self.formOrarioVenFine3(orario.venerdi().fine3());



			jQuery('#form-orario-struttura').show();
		}else if(operation == "DEL"){
			if(confirm("Eliminare l'orario dello sportello selezionato?")){
				self.formOrarioSportello(orario.sportello());
				self.formOrarioCodiceArea(orario.codiceArea());
				self.formOrarioDescrizioneArea(orario.descrizioneArea());
				self.submitOrarioForm();
			}
		}
		//hideLoadingAnimation();
	}

	self.submitStrutturaForm=function(){
		showLoadingAnimation();

		var urlService;
		var jsonObj = {
			codiceUnita : codiceUnitaCorrente,
			codiceTipoUnita : self.formStrutturaCodiceTipoUnita(),
			descrizioneUnita : self.formStrutturaDescrizioneUnita(),
			codiceUnitaMadre : self.formStrutturaCodiceUnitaMadre(),
			siglaUnita : self.formStrutturaSiglaUnita(),
			indirizzo : self.formStrutturaIndirizzo(),
			citta : self.formStrutturaCitta(),
			provincia : self.formStrutturaProvincia(),
			cap : self.formStrutturaCap(),
			rpv : self.formStrutturaRpv(),
			barriereArchitettoniche : self.formStrutturaBarriereArchitettoniche(),
			santoGG : self.formStrutturaSantoGG(),
			santoMM : self.formStrutturaSantoMM(),
			note: self.formStrutturaNote()
		};
		
		var operazione = self.formStrutturaOperazione();

		if(operazione == "EDIT"){
			_successEvent = function(response){
				showMessage("OK","Operazione di modfica struttura avvenuta con successo");
			}		
			urlService = urlRest + "personeStrutture/modificaUnita";
		}else if(operazione == "ADD"){
			_successEvent = function(response){
				showMessage("OK","Operazione di creazione struttura avvenuta con successo");
				self.strutturaSelected(new Struttura()); //reset struttura
				self.setFormStruttura();
			}		
			urlService = urlRest + "personeStrutture/creaUnita";
		}else if(operazione == "DEL"){
			_successEvent = function(response){
				showMessage("OK","Operazione di cancellazione struttura avvenuta con successo");				

				//nel caso di cancellazione dell'unico elemento contenuto nella lista
				//non viene rieffettuata la ricerca, cosi da non mostare il messaggio di "nessun risultato"
				if(self.struttureList().length == 1){
					self.emptyStruttureList();
				}else{
					self.loadPage(1);					
				}
			}
			urlService = urlRest + "personeStrutture/eliminaUnita/" + codiceUnitaCorrente ;
		}

		//postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj,self.token());
		
		var tokenParam = new TokenHeader("CSCPTOKEN", "", urlRest+"token" );
		postAjaxWithGetToken(_successEvent, null, urlService, jsonObj, tokenParam);
		
		return false;

	}
	
	self.submitEmailForm=function(){
		showLoadingAnimation();

		var operazione = self.formEmailOperazione();
		var urlService;
		_successEvent = function(response){
			showMessage("OK","Operazione avvenuta con successo");
			self.closeEmailForm();
			
			//nel caso di cancellazione dell'unico elemento contenuto nella lista
			//non viene rieffettuata la ricerca
			if(operazione == "DEL" && self.emailList().length==1){
				self.setEmailNoData();
			}else{
				self.loadEmail();
			}
		}
		var jsonObj = {
			codiceUnita : codiceUnitaCorrente,
			eMail : self.formEmailNewEmail(),
			eMailOld : self.formEmailOldEmail(),
			tipoEMail : self.formEmailNewIdDesc()
		};

		if(operazione == "EDIT"){
			urlService = urlRest + "personeStrutture/modificaIndirizzoMailUnita";
		}else if(operazione == "ADD"){
			urlService = urlRest + "personeStrutture/salvaIndirizzoMailUnita";
		}else if(operazione == "DEL"){
			urlService = urlRest + "personeStrutture/eliminaMailUnita";
		}

		//postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj,self.token());
		
		var tokenParam = new TokenHeader("CSCPTOKEN", "", urlRest+"token" );
		postAjaxWithGetToken(_successEvent, null, urlService, jsonObj, tokenParam);
		
		return false;

	}

	self.submitTelForm=function(){
		showLoadingAnimation();

		var urlService;
		_successEvent = function(response){
			showMessage("OK","Operazione avvenuta con successo");
			self.closeTelForm();

			//nel caso di cancellazione dell'unico elemento contenuto nella lista
			//non viene rieffettuata la ricerca
			if(operazione == "DEL" && self.telList().length==1){
				self.setTelNoData();
			}else{
				self.loadTel();				
			}

		}

		var jsonObj = {
			codiceUnita : codiceUnitaCorrente,
			numeroTelefono : self.formTelNewTel(),
			numeroTelefonoOld : self.formTelOldTel(),
			tipoTelefono : self.formTelNewIdDesc(),
			descrizioneAggiuntiva : self.formTelNewDescAgg(),
			piano : self.formTelNewPiano(),
			stanza : self.formTelNewStanza()
		};

		var operazione = self.formTelOperazione();

		if(operazione == "EDIT"){
			urlService = urlRest + "personeStrutture/modificaNumeroServizio";
		}else if(operazione == "ADD"){
			urlService = urlRest + "personeStrutture/salvaNumeroServizio";
		}else if(operazione == "DEL"){
			urlService = urlRest + "personeStrutture/eliminaNumeroServizio";
		}

		//postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj,self.token());
		var tokenParam = new TokenHeader("CSCPTOKEN", "", urlRest+"token" );
		postAjaxWithGetToken(_successEvent, null, urlService, jsonObj, tokenParam);
		
		return false;

	}

	self.submitOrarioForm=function(){
		showLoadingAnimation();
		var operazione = self.formOrarioOperazione();
		var urlService;
		_successEvent = function(response){
			showMessage("OK","Operazione avvenuta con successo");
			self.closeOrarioForm();

			//nel caso di cancellazione dell'unico elemento contenuto nella lista
			//non viene rieffettuata la ricerca
			if(operazione == "DEL" && self.orarioList().length==1){
				self.setOrarioNoData();
			}else{
				self.loadOrarioSportello();				
			}

		}
		
		var lunObj;
		if(
			self.formOrarioLunInizio0()!='' || self.formOrarioLunFine0()!='' ||
			self.formOrarioLunInizio1()!='' || self.formOrarioLunFine1()!='' ||
			self.formOrarioLunInizio2()!='' || self.formOrarioLunFine2()!='' ||
			self.formOrarioLunInizio3()!='' || self.formOrarioLunFine3()!='' 
		){
			lunObj = {
				giorno : "LUNEDì",
				giornoNum : "2",
				note : self.formOrarioNote(),
				inizio0 : self.formOrarioLunInizio0(),
				fine0 : self.formOrarioLunFine0(),
				inizio1 : self.formOrarioLunInizio1(),
				fine1 : self.formOrarioLunFine1(),
				inizio2 : self.formOrarioLunInizio2(),
				fine2 : self.formOrarioLunFine2(),
				inizio3 : self.formOrarioLunInizio3(),
				fine3 : self.formOrarioLunFine3()
			}
		}
		
		var marObj;
		if(
			self.formOrarioMarInizio0()!='' || self.formOrarioMarFine0()!='' ||
			self.formOrarioMarInizio1()!='' || self.formOrarioMarFine1()!='' ||
			self.formOrarioMarInizio2()!='' || self.formOrarioMarFine2()!='' ||
			self.formOrarioMarInizio3()!='' || self.formOrarioMarFine3()!='' 
		){
			marObj = {
				giorno : "MARTEDì",
				giornoNum : "3",
				note : self.formOrarioNote(),
				inizio0 : self.formOrarioMarInizio0(),
				fine0 : self.formOrarioMarFine0(),
				inizio1 : self.formOrarioMarInizio1(),
				fine1 : self.formOrarioMarFine1(),
				inizio2 : self.formOrarioMarInizio2(),
				fine2 : self.formOrarioMarFine2(),
				inizio3 : self.formOrarioMarInizio3(),
				fine3 : self.formOrarioMarFine3()
			}
		}
		
		var merObj;
		if(
			self.formOrarioMerInizio0()!='' || self.formOrarioMerFine0()!='' ||
			self.formOrarioMerInizio1()!='' || self.formOrarioMerFine1()!='' ||
			self.formOrarioMerInizio2()!='' || self.formOrarioMerFine2()!='' ||
			self.formOrarioMerInizio3()!='' || self.formOrarioMerFine3()!='' 
		){
			merObj = {
				giorno : "MERCOLEDì",
				giornoNum : "4",
				note : self.formOrarioNote(),
				inizio0 : self.formOrarioMerInizio0(),
				fine0 : self.formOrarioMerFine0(),
				inizio1 : self.formOrarioMerInizio1(),
				fine1 : self.formOrarioMerFine1(),
				inizio2 : self.formOrarioMerInizio2(),
				fine2 : self.formOrarioMerFine2(),
				inizio3 : self.formOrarioMerInizio3(),
				fine3 : self.formOrarioMerFine3()
			}
		}

		var gioObj;
		if(
			self.formOrarioGioInizio0()!='' || self.formOrarioGioFine0()!='' ||
			self.formOrarioGioInizio1()!='' || self.formOrarioGioFine1()!='' ||
			self.formOrarioGioInizio2()!='' || self.formOrarioGioFine2()!='' ||
			self.formOrarioGioInizio3()!='' || self.formOrarioGioFine3()!='' 
		){
			gioObj = {
				giorno : "GIOVEDì",
				giornoNum : "5",
				note : self.formOrarioNote(),
				inizio0 : self.formOrarioGioInizio0(),
				fine0 : self.formOrarioGioFine0(),
				inizio1 : self.formOrarioGioInizio1(),
				fine1 : self.formOrarioGioFine1(),
				inizio2 : self.formOrarioGioInizio2(),
				fine2 : self.formOrarioGioFine2(),
				inizio3 : self.formOrarioGioInizio3(),
				fine3 : self.formOrarioGioFine3()
			}
		}

		var venObj;
		if(
			self.formOrarioVenInizio0()!='' || self.formOrarioVenFine0()!='' ||
			self.formOrarioVenInizio1()!='' || self.formOrarioVenFine1()!='' ||
			self.formOrarioVenInizio2()!='' || self.formOrarioVenFine2()!='' ||
			self.formOrarioVenInizio3()!='' || self.formOrarioVenFine3()!='' 
		){
			venObj = {
				giorno : "VENERDì",
				giornoNum : "6",
				note : self.formOrarioNote(),
				inizio0 : self.formOrarioVenInizio0(),
				fine0 : self.formOrarioVenFine0(),
				inizio1 : self.formOrarioVenInizio1(),
				fine1 : self.formOrarioVenFine1(),
				inizio2 : self.formOrarioVenInizio2(),
				fine2 : self.formOrarioVenFine2(),
				inizio3 : self.formOrarioVenInizio3(),
				fine3 : self.formOrarioVenFine3()
			}
		}

		
		var jsonObj = {
			codiceUnita : codiceUnitaCorrente,				
			sportello:self.formOrarioSportello(),
			codiceArea:self.formOrarioCodiceArea(),
			note : self.formOrarioNote(),
			descrizioneArea:self.formOrarioDescrizioneArea(),
			lunedi:lunObj,
			martedi:marObj,
			mercoledi:merObj,
			giovedi:gioObj,
			venerdi:venObj
		};

		if(operazione == "EDIT"){
			urlService = urlRest + "personeStrutture/modificaOrarioSportello";
		}else if(operazione == "ADD"){
			urlService = urlRest + "personeStrutture/salvaOrarioSportello";
		}else if(operazione == "DEL"){
			urlService = urlRest + "personeStrutture/eliminaOrarioSportello";
		}


		//postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj,self.token());
		
		var tokenParam = new TokenHeader("CSCPTOKEN", "", urlRest+"token" );
		postAjaxWithGetToken(_successEvent, null, urlService, jsonObj, tokenParam);
		
		return false;

	}

	self.abilitaModifiche=function(){
		var checked = self.formStrutturaAbilitaModifica();
		
		$("input[id$='citta']").attr("disabled",!checked);
		$("input[id$='indirizzo']").attr("disabled",!checked);
		$("select[id$='provincia']").attr("disabled",!checked);
		$("input[id$='CAP']").attr("disabled",!checked);
		$("input[id$='RPV']").attr("disabled",!checked);
		$("select[id$='giorno_patrono']").attr("disabled",!checked);
		$("select[id$='mese_patrono']").attr("disabled",!checked);
	}

	self.closeEmailForm=function(){
		jQuery('#form-email-struttura').hide();
	}

	self.closeTelForm=function(){
		jQuery('#form-tel-struttura').hide();
	}
	
	self.closeOrarioForm=function(){
		jQuery('#form-orario-struttura').hide();
	}

	self.annullaOperazione=function(){
		//window.location.href=urlBack;
		$('.ko_form_struttura_indietro').attr('action', urlBack);
		$('.ko_form_struttura_indietro').submit();
	}
	
	//paginazione
//	self.loadPage=function(page){
//		if(page == "prima"){
//			self.currentPage(1);
//		}else if(page == "indietro"){
//			self.currentPage(self.currentPage()-1);
//		}else if(page == "avanti"){
//			self.currentPage(self.currentPage()+1);
//		}else if(page == "ultima"){
//			self.currentPage(self.numPagineMax());
//		}else if(self.currentPage() != page){
//			self.currentPage(page);
//		}
//
//		self.loadListaStrutture();
//	}
//	
//	self.paginazioneNumber = function (){
//		//se c'è una sola pagina non viene mostrata la paginazione
//		
//		var paginazioneNum = parseInt(self.numPagineMax() >= self.numPagine() ? self.numPagine() : self.numPagineMax()); 
//		var position = 2;
//		var paginazioneStart = parseInt(self.currentPage());
//		self.pages.removeAll();
//
//		if(paginazioneNum > 1){
//			var pagText = paginazioneStart;
//
//			if(paginazioneStart != 1){
//				//self.pages.push(new Pagination("prima","first"));
//				self.pages.push(new Pagination("indietro","indietro"));
//				
//				if((paginazioneStart+paginazioneNum-position) >= self.numPagineMax()){
//					pagText = self.numPagineMax() - paginazioneNum + 1;
//				}else if(paginazioneStart+position <= paginazioneNum){
//					pagText = 1 ;
//				}else{
//					pagText = pagText - 1;
//				}
//			} 
//
//
//
//			for(var i=0; i<paginazioneNum; i++){				
//				var cssClass = self.currentPage() == pagText ? "active" : "";
//				self.pages.push(new Pagination("" + pagText,cssClass));
//				pagText++;
//			}
//			if(paginazioneStart != self.numPagineMax()){
//				self.pages.push(new Pagination("avanti","avanti"));
//				//self.pages.push(new Pagination("ultima","last"));
//			}
//		}
//	}
//	
//	self.paginazioneNumberAll = function ()
//	{
//		//se c'è una sola pagina non viene mostrata la paginazione
//		var paginazioneNum = Math.ceil(self.numElementi() / self.itemsPerPage());
//		self.pages.removeAll();
//
//		if(paginazioneNum > 1)
//		{
//			self.pages.push(new Pagination("prima","first"));
//			self.pages.push(new Pagination("indietro","indietro"));
//			for(var i=0; i<paginazioneNum; i++){
//				self.pages.push(new Pagination("" + (i+1),""));
//			}
//			self.pages.push(new Pagination("avanti","avanti"));
//			self.pages.push(new Pagination("ultima","ultima"));
//		}
//	}
	//paginazione end

	self.search=function(){
		self.setSearchParams("nome", encodeUrlValue(self.formRicercaStrutturaNome()));
		self.setSearchParams("tipo", encodeUrlValue(self.formRicercaStrutturaTipo()));
		self.setSearchParams("unita", encodeUrlValue(self.formRicercaStrutturaUnita()));
		self.setSearchParams("cap", encodeUrlValue(self.formRicercaStrutturaCap()));
		self.loadPage(1);
//		if(self.struttureList.length == 0){
//			var struttura = ko.observable(new Struttura());
//			struttura().descrizioneUnita(noData);
//			self.struttureList.push(struttura);
//		}
	}

	self.initSearch=function(){
		var isSearchInit = false;
		var searchNomeStruttura = getUrlVars()["searchNomeStruttura"];
		var searchTipoStruttura = getUrlVars()["searchTipoStruttura"];
		var searchUnitaStruttura = getUrlVars()["searchUnitaStruttura"];
		var searchCapStruttura = getUrlVars()["searchCapStruttura"];
		var searchItemsPerPage = getUrlVars()["searchItemsPerPage"];
		var searchCurrentPage = getUrlVars()["searchCurrentPage"];
		
		if(searchNomeStruttura && searchNomeStruttura!=""){
			self.formRicercaStrutturaNome(searchNomeStruttura);
			isSearchInit = true;
		}

		if(searchTipoStruttura && searchTipoStruttura!=""){
			self.formRicercaStrutturaTipo(searchTipoStruttura);
			isSearchInit = true;
		}

		if(searchUnitaStruttura && searchUnitaStruttura!=""){
			self.formRicercaStrutturaUnita(searchUnitaStruttura);
			isSearchInit = true;
		}

		if(searchCapStruttura && searchCapStruttura!=""){
			self.formRicercaStrutturaCap(searchCapStruttura);
			isSearchInit = true;
		}
		
		if(searchItemsPerPage && searchItemsPerPage!=""){
			self.itemsPerPage(searchItemsPerPage);
		}
		
		if(isSearchInit){
			self.setSearchParams("nome", self.formRicercaStrutturaNome());
			self.setSearchParams("tipo", self.formRicercaStrutturaTipo());
			self.setSearchParams("unita", self.formRicercaStrutturaUnita());
			self.setSearchParams("cap", self.formRicercaStrutturaCap());
			self.loadPage(searchCurrentPage ? parseInt(searchCurrentPage) : 1);
		}else{
			hideLoadingAnimation();
		}
		
	}
	
	self.setEmailNoData = function(){
		self.emailList.removeAll();
		var email = ko.observable(new Email());
		email().eMail(noData);
		email().permessi().isAdd(true);
		self.emailList.push(email);		
	}

	self.setTelNoData = function(){
		self.telList.removeAll();
		var tel = ko.observable(new Telefono());
		tel().descrizioneTipoTelefono(noData);
		tel().permessi().isAdd(true);
		self.telList.push(tel);
	}

	self.setOrarioNoData = function(){
		self.orarioList.removeAll();
		var orario = ko.observable(new OrarioSportello());
		orario().descrizioneArea(noData);
		orario().permessi().isEdit(true);
		self.orarioList.push(tel);
	}


	
	self.gestioneErrore = function(xhr, textStatus) {
		if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
			showMessageUnauthorized("Gestione strutture");
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
		self.formStrutturaOperazione(operazioneCorrente);
		
		//inizializzo l'orario per sportello
		self.orarioOptions.push(new SelectOption("---",""));
		for(i=6;i<23;i++){
			var ora = i<=9 ? "0" + i : i;
			self.orarioOptions.push(new SelectOption(ora + ":00",ora + ":00"));
			self.orarioOptions.push(new SelectOption(ora + ":30",ora + ":30"));			
		}
		
		if(operazioneCorrente == "ADD"){
			hideLoadingAnimation();
		}else if(operazioneCorrente == "EDIT"){
			self.loadEmail();
			self.loadTel();
			self.loadOrarioSportello();
			self.loadStruttura();
			
			if(self.emailList().length == 0){
				self.setEmailNoData();
			}
			if(self.telList().length == 0){
				self.setTelNoData();
			}
			//hideLoadingAnimation();
		}else if(operazioneCorrente == "SEARCH"){
			initPagination(self,self.loadListaStrutture);
			self.initSearch();
//			self.loadPage(1);
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
//OGGETTO Email 
//*****************************************************************
function Email(dataJSON){
	var self=this;
	self.eMail = ko.observable("");
	self.tipoEMail = ko.observable("");
	self.descrizioneTipoEMail = ko.observable("");
	self.permessi = ko.observable(new Permessi());

	self.create = function(dataJSON){
		self.eMail(dataJSON.eMail);
		self.tipoEMail(dataJSON.tipoEMail);
		self.descrizioneTipoEMail(dataJSON.descrizioneTipoEMail);
		self.permessi().isAdd(true);
		self.permessi().isEdit(true);
		self.permessi().isDel(true);
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}	

//*****************************************************************
//OGGETTO Telefono 
//*****************************************************************
function Telefono(dataJSON){
	var self=this;
	self.numeroTelefono = ko.observable("");
	self.tipoTelefono = ko.observable("");
	self.descrizioneTipoTelefono = ko.observable("");
	self.descrizioneAggiuntiva = ko.observable("");
	self.piano = ko.observable("");
	self.stanza = ko.observable("");
	self.numeroTelefonoOld = ko.observable("");
	self.permessi = ko.observable(new Permessi());

	self.create = function(dataJSON){
		self.numeroTelefono(dataJSON.numeroTelefono);
		self.tipoTelefono(dataJSON.tipoTelefono);
		self.descrizioneTipoTelefono(dataJSON.descrizioneTipoTelefono);
		self.descrizioneAggiuntiva(dataJSON.descrizioneAggiuntiva);
		self.piano(dataJSON.piano);
		self.stanza(dataJSON.stanza);
		self.numeroTelefonoOld(dataJSON.numeroTelefonoOld);
		self.permessi().isAdd(true);
		self.permessi().isEdit(true);
		self.permessi().isDel(true);
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}	

//*****************************************************************
//OGGETTO OrarioSportello 
//*****************************************************************
function OrarioSportello(dataJSON){
	var self=this;
	self.sportello = ko.observable("");
	self.codiceArea = ko.observable("");
	self.descrizioneArea = ko.observable("");
	self.lunedi = ko.observable(new OrarioSportelloGiorno());
	self.martedi = ko.observable(new OrarioSportelloGiorno());
	self.mercoledi = ko.observable(new OrarioSportelloGiorno());
	self.giovedi = ko.observable(new OrarioSportelloGiorno());
	self.venerdi = ko.observable(new OrarioSportelloGiorno());
	self.permessi = ko.observable(new Permessi());

	self.giorni=ko.observableArray([]);
	self.primoGiorno = ko.observable(new OrarioSportelloGiorno());
	self.altriGiorni=ko.observableArray([]);

	self.create = function(dataJSON){
		self.sportello(dataJSON.sportello);
		self.codiceArea(dataJSON.codiceArea);
		self.descrizioneArea(dataJSON.descrizioneArea);
		self.lunedi(new OrarioSportelloGiorno(dataJSON.lunedi));
		self.martedi(new OrarioSportelloGiorno(dataJSON.martedi));
		self.mercoledi(new OrarioSportelloGiorno(dataJSON.mercoledi));
		self.giovedi(new OrarioSportelloGiorno(dataJSON.giovedi));
		self.venerdi(new OrarioSportelloGiorno(dataJSON.venerdi));
		
		//
		if(self.lunedi().valid()){self.giorni.push(self.lunedi);}
		if(self.martedi().valid()){self.giorni.push(self.martedi);}
		if(self.mercoledi().valid()){self.giorni.push(self.mercoledi);}
		if(self.giovedi().valid()){self.giorni.push(self.giovedi);}
		if(self.venerdi().valid()){self.giorni.push(self.venerdi);}

		//modifica per inserire il primo giorno a parte
		if(self.giorni().length>0){
			self.primoGiorno(self.giorni()[0]());
			self.altriGiorni(self.giorni.slice(1));
		}


		self.permessi().isAdd(true);
		self.permessi().isEdit(true);
		self.permessi().isDel(true);
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}	


//*****************************************************************
//OGGETTO OrarioSportelloGiorno
//*****************************************************************
function OrarioSportelloGiorno(dataJSON){
	var self=this;

	self.valid =  ko.observable(false);
	self.giorno = ko.observable("");
	self.giornoNum = ko.observable("");
	self.note = ko.observable("");	
	self.inizio0 = ko.observable("");
	self.fine0 = ko.observable("");
	self.inizio1 = ko.observable("");
	self.fine1 = ko.observable("");
	self.inizio2 = ko.observable("");
	self.fine2 = ko.observable("");
	self.inizio3 = ko.observable("");
	self.fine3 = ko.observable("");
	self.permessi = ko.observable(new Permessi());

	self.create = function(dataJSON){
		self.giorno(dataJSON.giorno);
		self.giornoNum(dataJSON.giornoNum);
		self.note(dataJSON.note);
		self.inizio0(dataJSON.inizio0);
		self.fine0(dataJSON.fine0);
		self.inizio1(dataJSON.inizio1);
		self.fine1(dataJSON.fine1);
		self.inizio2(dataJSON.inizio2);
		self.fine2(dataJSON.fine2);
		self.inizio3(dataJSON.inizio3);
		self.fine3(dataJSON.fine3);

		if(self.inizio0()!='' && self.fine0()!=''){
			self.valid(true);
		}

		self.permessi().isAdd(true);
		self.permessi().isEdit(true);
		self.permessi().isDel(true);
		
		
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}


//*****************************************************************
//OGGETTO Struttura 
//*****************************************************************
function Struttura(dataJSON){
	var self=this;
	self.unitaHR = ko.observable("");
	self.codiceTipoUnita = ko.observable("");
	self.descrizioneTipoUnita = ko.observable("");
	self.descrizioneUnita = ko.observable("");
	self.codiceUnita = ko.observable("");
	self.codiceUnitaMadre = ko.observable("");
	self.siglaUnita = ko.observable("");
	self.citta = ko.observable("");
	self.indirizzo = ko.observable("");
	self.provincia = ko.observable("");
	self.cap = ko.observable("");
	self.rpv = ko.observable("");
	self.centralino = ko.observable("");
	self.segreteria = ko.observable("");
	self.email = ko.observable("");
	self.barriereArchitettoniche = ko.observable("");
	self.note = ko.observable("");
	self.santoGG = ko.observable("");
	self.santoMM = ko.observable("");
	self.permessi = ko.observable(new Permessi());

	self.create = function(dataJSON){
		self.unitaHR(dataJSON.isUnitaHR);
		self.codiceTipoUnita(dataJSON.codiceTipoUnita);
		self.descrizioneTipoUnita(dataJSON.descrizioneTipoUnita);
		self.descrizioneUnita(dataJSON.descrizioneUnita);
		self.codiceUnita(dataJSON.codiceUnita);
		self.codiceUnitaMadre(dataJSON.codiceUnitaMadre);
		self.siglaUnita(dataJSON.siglaUnita);
		self.citta(dataJSON.citta);
		self.indirizzo(dataJSON.indirizzo);
		self.provincia(dataJSON.provincia);
		self.cap(dataJSON.cap);
		self.rpv(dataJSON.rpv);
		self.centralino(dataJSON.centralino);
		self.segreteria(dataJSON.segreteria);
		self.email(dataJSON.email);
		self.barriereArchitettoniche(dataJSON.barriereArchitettoniche);
		self.note(dataJSON.note);
		self.santoGG(dataJSON.santoGG);
		self.santoMM(dataJSON.santoMM);
		self.permessi().isAdd(true);

		
		if(model.profiloToken()){
			if(model.profiloToken().isAdmin() || model.profiloToken().codiciUnita[self.codiceUnita()]){
				self.permessi().isAdd(true);
				self.permessi().isEdit(true);
				if(!self.unitaHR()){
					self.permessi().isDel(true);
				}
			}
		}
		
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}

//*****************************************************************
//OGGETTO SelectOption
//*****************************************************************
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



//paginazione
//function Pagination(text,css){
//	var self=this;
//	self.text = text;
//	self.css = css;
//}

	
