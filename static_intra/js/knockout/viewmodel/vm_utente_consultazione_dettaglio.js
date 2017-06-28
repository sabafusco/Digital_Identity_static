//*****************************************************************
//VIEMODEL PRICIPALE - INIT PAGINA
//***************************************************************** 
function UtenteConsultazioneProfiloViewModel(params) {

  //INIZIALIZZO LE VARIABILE DEL VIEMODEL
	
	var noData = "Dato non presente";
	
	
	var self = this;	
	
	self.dipendenteDetail=ko.observable();
	
	self.cognomeRicerca	=	ko.observable("");
	self.nomeRicerca	=	ko.observable("");
	self.campoUnicoUtenteRicerca	=	ko.observable("");
	self.campoUnicoStrutturaRicerca	=	ko.observable("");
	self.codiceUnitaRicerca	=	ko.observable("");
	self.rpvRicerca	=	ko.observable("");
	self.telefonoRicerca	=	ko.observable("");
	self.usernameRicerca	=	ko.observable("");
	self.unitaRicerca	=	ko.observable("");
	


	//Carico lista dipendente
	self.loadDipendente=function(){
		
		showLoadingAnimation();
		var dipendenteListTemp=ko.observableArray([]);
		var matricolaParam = getUrlParameter('matricola');
		var url = urlRest + "personeStrutture/pagListDipendete?page=0" + 
		"&offset=1"+
		"&cognome="  + 
		"&matricola=" + matricolaParam + 
		"&unita=";
		_successEvent = function(data){
			$.each(data.list, function( key, item ){
				var dipendenteTemp=ko.observable(new Dipendente(item));

				//modifica per inserire la prima allocazione a parte
				if(dipendenteTemp().allocazioneDipendenteList().length>0){
					dipendenteTemp().firstAllocazioneDipendente(dipendenteTemp().allocazioneDipendenteList()[0]());
					dipendenteTemp().allocazioneDipendenteList(dipendenteTemp().allocazioneDipendenteList.slice(1));				
				}

				self.dipendenteDetail = dipendenteTemp;
			});	
			hideLoadingAnimation();
		 };
		 getAjaxWithJSONResponse(_successEvent, url);
	}
	
	//CHIAMO I METODI DI INIZIALIZZAZIONE
	self.create = function(){
		self.loadDipendente();
		hideLoadingAnimation();
	}
	self.create();
 // FINE -CHIAMO I METODI DI INIZIALIZZAZIONE
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
	self.linkProfilo  = ko.observable("");
	
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
			self.linkProfilo("1_intranet_cerca_persona_dettaglio.html/"+self.matricola());
			
		}
		
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
	self.tipoAllocazione = ko.observable("");
	self.descrTipoAllocazione = ko.observable("");
	self.processo = ko.observable("");
	self.subProcesso = ko.observable("");
	self.userNome = ko.observable("");
	self.userCognome = ko.observable("");
	self.allocazioneLink = ko.observable("");
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
		self.tipoAllocazione(dataJSON.tipoAllocazione);
		switch(self.tipoAllocazione()){
			case "INCARICO":
				self.descrTipoAllocazione("(Unit&agrave; di assegnazione)");
				break;
			case "DISTACCO":
				self.descrTipoAllocazione("(Unit&agrave;)");
				break;
			case "PRINCIPALE":
				self.descrTipoAllocazione("(Unit&agrave; di appartenenza)");
				break;
			
		}
		self.processo(dataJSON.processo);
		self.subProcesso = (dataJSON.subProcesso);
		self.allocazioneLink = ("1_intranet_cerca_struttura_dettaglio.html/"+self.codiceUnita());
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}
