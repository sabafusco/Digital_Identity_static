//*****************************************************************

//VIEMODEL PRICIPALE - INIT PAGINA

//***************************************************************** 

function UtenteConsultazioneViewModel(params) {



  //INIZIALIZZO LE VARIABILE DEL VIEMODEL

	

	var noData = "Dato non presente";

	var self = this;
	var rootContext = this;	

	self.dipendenteList=ko.observableArray([]);

	self.dipendenteDetail=ko.observable(new Dipendente());

	self.cognomeRicerca	=	ko.observable("");

	self.nomeRicerca	=	ko.observable("");

	self.campoUnicoUtenteRicerca	=	ko.observable("");

	self.campoUnicoStrutturaRicerca	=	ko.observable("");

	self.codiceUnitaRicerca	=	ko.observable("");

	self.rpvRicerca	=	ko.observable("");

	self.telefonoRicerca	=	ko.observable("");

	self.usernameRicerca	=	ko.observable("");

	self.unitaRicerca	=	ko.observable("");

	self.isError		=	ko.observable(false);
	self.erroreRisultatoRicerca = ko.observable("");
	self.struttureList = ko.observableArray([]);

	self.errore = ko.observable("");
	self.numeroRisultati = ko.observable("");
	self.descrizioneNumeroRisultati = ko.observable("");



	//Carico lista dipendente

	self.loadListaDipendente=function(){

		showLoadingAnimation();

		var dipendenteListTemp=ko.observableArray([]);



		

		var url = urlRest + "personeStrutture/pagListDipendeteDetail" + 

		"?cognome=" + self.cognomeRicerca() + 

		"&matricola=" + self.usernameRicerca() + 

		"&unita=" + self.unitaRicerca() +

		"&telefono=" + self.telefonoRicerca()+
		"&campoUnico=" + self.campoUnicoUtenteRicerca()+

		"&rpv=" + self.rpvRicerca();

		_successEvent = function(data){

			self.isError(false);
			self.erroreRisultatoRicerca("");

			self.struttureList.removeAll();
			self.numeroRisultati(data.list.length);
			self.descrizioneNumeroRisultati(" utenti ");

			$.each(data.list, function( key, item ){

				var dipendenteTemp=ko.observable(new Dipendente(item,rootContext,key,data.list.length));
				//modifica per inserire la prima allocazione a parte

				if(dipendenteTemp().allocazioneDipendenteList().length>0){

					dipendenteTemp().firstAllocazioneDipendente(dipendenteTemp().allocazioneDipendenteList()[0]());

					dipendenteTemp().allocazioneDipendenteList(dipendenteTemp().allocazioneDipendenteList.slice(1));				

				}



				dipendenteListTemp.push(dipendenteTemp);

			});	

			

			self.dipendenteList(dipendenteListTemp.slice(0));

			hideLoadingAnimation();
			//Quest'ultime chiamate sono necessari per riparare al comportamento automatico dei template JSP 
			$(".tabella_cerca_utenti").show();
			$(".risultatoRicerca").show();		
			window.location.hash = 'risultatoRicerca';

		 };
		_errorEvent = function(data){
			self.isError(true);
			self.erroreRisultatoRicerca(data.responseJSON.message);
			hideLoadingAnimation();	
		};

		 getAjaxWithJSONResponse(_successEvent, url,_errorEvent);

	}
	//Carico lista dipendente

	self.loadListaStrutture=function(){

		showLoadingAnimation();

		var dipendenteListTemp=ko.observableArray([]);

		

		var url = urlRest + "personeStrutture/listDettagliStrutture" + 

		"?campoUnicoStruttura=" + self.campoUnicoStrutturaRicerca();

		_successEvent = function(data){
				self.isError(false);
			self.erroreRisultatoRicerca("");

			self.dipendenteList.removeAll();				
			self.numeroRisultati(data.length);
			self.descrizioneNumeroRisultati(" strutture ");

			$.each(data, function( key, item ){
				var struttura = new Struttura(item);
				struttura.setNumElementi(data.length); 
				struttura.setIndice(key);

				self.struttureList.push(struttura);
			});	

		

			hideLoadingAnimation();
			//Quest'ultime chiamate sono necessari per riparare al comportamento automatico dei template JSP 
			$(".tabella_cerca_utenti").show();
			$(".risultatoRicerca").show();		
			window.location.hash = 'risultatoRicerca';

	 	};
		_errorEvent = function(data){
			self.isError(true);
			self.erroreRisultatoRicerca(data.responseJSON.message);
			hideLoadingAnimation();	
		};	

		

		 getAjaxWithJSONResponse(_successEvent, url,_errorEvent);

	}

	//Carico dettaglio dipendente

	self.loadDetailDipendente=function(matricolaParam){

		

		showLoadingAnimation();

		var dipendenteListTemp=ko.observableArray([]);

		

		var _urlService = urlRest + "personeStrutture/pagListDipendeteDettagliStrutture?page=0" + 

		"&offset=1"+

		"&cognome="  + 

		"&matricola=" + matricolaParam + 

		"&unita=";

		_successEvent = function(data){

				

			$.each(data.list, function( key, item ){

				self.dipendenteDetail().create(item);

			});

			self.errore("");		
			hideLoadingAnimation();
			

		 };
		_errorEvent = function(data){
			self.errore(data.responseJSON.message);
			hideLoadingAnimation();	
		};

		getAjaxWithJSONResponse(_successEvent, _urlService,_errorEvent);

	}

	
	

	self.search=function(){
		
		var campoUnicoStruttura = encodeUrlValue($("#Campo_unico_struttura").val());

		if(campoUnicoStruttura != null && campoUnicoStruttura != 'undefined' && campoUnicoStruttura != '' && !campoUnicoStruttura.length < 2){
			//Eseguo la chiamata per campo unico struttura
			self.campoUnicoStrutturaRicerca(campoUnicoStruttura);
			self.loadListaStrutture();
			self.cleanSearchFields();
			window.location.hash = '';
		}else{ 
			var error = self.validaCampi();	
			if(error == false){

				self.dipendenteList.removeAll();

		

				self.cognomeRicerca(encodeUrlValue($("#cognome").val()));

				self.campoUnicoUtenteRicerca(encodeUrlValue($("#Campo_unico").val()));

				self.rpvRicerca(encodeUrlValue($("#rpv").val()));

				self.telefonoRicerca(encodeUrlValue($("#Telefono").val()));

				self.usernameRicerca(encodeUrlValue($("#username").val()));

		

				var codiceUnita = encodeUrlValue($("#CodiceUnita").val());

				var unita = encodeUrlValue($("#unita").val());

				if(codiceUnita!= null && codiceUnita!= "undefined" && codiceUnita!=""){

					self.codiceUnitaRicerca(encodeUrlValue($("#CodiceUnita").val()));

				}else if(unita!= null && unita!= "undefined" && unita!= "" ){

					self.unitaRicerca(encodeUrlValue($("#unita").val()));

				}
		

				self.loadListaDipendente();

				//self.cleanSearchFields();
				window.location.hash = '';
			}
		}

	}
	

	self.searchDipendentiDiUnita = function(unita){
		var codiceUnita = encodeUrlValue(unita);
		$("#CodiceUnita").val(codiceUnita);

		if(codiceUnita!= null && codiceUnita!= "undefined" && codiceUnita!=""){

			self.unitaRicerca(codiceUnita);

			self.loadListaDipendente();		
		}

		window.location.hash = '';
	}
	self.validaCampi = function (){
		
		var campi  = ['cognome','Campo_unico','rpv','Telefono','username','CodiceUnita','unita'];
		var error = false;
		var value;
		$.each(campi, function( index, item ){
			value = $('#'+item).val(); 

			if(value != null && value!= 'undefined' && value != '' ){
			   if(value.length < 2){
				error = true;				   	
				self.isError(true);
				self.erroreRisultatoRicerca('I parametri di ricerca devono contenere almeno 2 caratteri.');
			   }
			}		

		});
		if(!error){
			self.isError(false);
			self.erroreRisultatoRicerca('');
		}			
		return error;
	}



	self.cleanSearchFields = function (){

		$("#cognome").val('');

		$("#Campo_unico").val('');

		$("#Campo_unico_struttura").val('');

		$("#rpv").val('');

		$("#Telefono").val('');

		$("#username").val('');

		$("#CodiceUnita").val('');

		$("#unita").val('');

		self.cognomeRicerca('');

		self.campoUnicoUtenteRicerca('');

		self.campoUnicoStrutturaRicerca('');

		self.rpvRicerca('');

		self.telefonoRicerca('');

		self.usernameRicerca('');

		self.codiceUnitaRicerca('');

		self.unitaRicerca('');

	}

	

	self.clearFieldsAndResults = function(){

		self.cleanSearchFields();

		self.dipendenteList.removeAll();
		self.struttureList.removeAll();
		window.location.hash = '';		
	}

	

	//CHIAMO I METODI DI INIZIALIZZAZIONE

	self.create = function(){

		var matricolaParam = getUrlParameter('matricola');
		var codiceUnita = getUrlParameter('codiceUnita');
		var campoUnico = getUrlParameter('campo_unico');

		if(matricolaParam != null && matricolaParam != 'undefined' && matricolaParam != ''){

			self.loadDetailDipendente(matricolaParam);

		}else if (codiceUnita != null && codiceUnita != 'undefined' && codiceUnita != ''){
			self.searchDipendentiDiUnita(codiceUnita);
		} else if(campoUnico != null && campoUnico != 'undefined' && campoUnico != ''){
			self.campoUnicoUtenteRicerca(campoUnico);			
			self.loadListaDipendente();
		}else{
			//Questa variabile viene considerata nella pagina di dettaglio ma non in quella di ricerca
			self.errore("Nessun risultato trovato");

			hideLoadingAnimation();

		}

	}

	self.create();

 // FINE -CHIAMO I METODI DI INIZIALIZZAZIONE

}

function estraiIndirizzo (indirizzo,cap,citta,provincia){
	var address= "";
		if(indirizzo != null && indirizzo != "" && indirizzo != "undefined"){
			address = address +indirizzo;
		}
		if(cap != null && cap != "undefined" && cap != ""){
			address = address +", "+cap;
		}
		if(citta != null && citta != "undefined" && citta != ""){
			address = address +" - "+citta;
		}
		if(provincia != null && provincia != "undefined" && provincia != ""){
			address = address +"("+provincia+")";
		}	
	return address;	
}

//*****************************************************************

//OGGETTO Dipendente

//*****************************************************************

function Dipendente(dataJSON,root,indice,numElementi){

	var self=this;
	var contextRoot = root;

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

	self.numElementi =  ko.observable(""); 
	self.indice = ko.observable("");
	
	self.searchByProcesso = function(processo,unita){
		contextRoot.clearFieldsAndResults();
		var campoUnicoPersona = processo+","+unita;
		
		$("#Campo_unico").val(campoUnicoPersona);
		contextRoot.search();
	}

	self.create = function(dataJSON){

		if(dataJSON.dipendente){
			self.numElementi (numElementi);
			self.indice (indice);

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

			self.linkProfilo(urlDettaglio+"?matricola="+self.matricola());

			

		}

		if(dataJSON.allocazioni){

			var count = Object.keys(dataJSON.allocazioni).length;
			$.each(dataJSON.allocazioni, function( key, item ){

				var alloc = ko.observable(new Allocazione(item));

				alloc().numTotale(count);
				alloc().setTotaleUtenti(self.numElementi());
				alloc().setIndiceUtenti(self.indice());

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

	self.descrTipoAllocazione2 = ko.observable("");

	self.processo = ko.observable("");

	self.subProcesso = ko.observable("");

	self.userNome = ko.observable("");

	self.userCognome = ko.observable("");

	self.allocazioneLink = ko.observable("");

	self.dettagliAllocazione = ko.observable(new Struttura());

	self.numTotale = ko.observable("");
	self.indiceUtente = ko.observable("");
	self.totaleUtenti = ko.observable("");
	self.setIndiceUtenti= function(indice){
		self.indiceUtente(indice);	
	}
	self.setTotaleUtenti= function(totale){
		self.totaleUtenti(totale);	
	}

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

				self.descrTipoAllocazione2("Unit&agrave; di assegnazione");

				break;

			case "DISTACCO":

				self.descrTipoAllocazione("(Unit&agrave;)");

				self.descrTipoAllocazione2("Unit&agrave;");

				break;

			case "PRINCIPALE":

				self.descrTipoAllocazione("(Unit&agrave; di appartenenza)");

				self.descrTipoAllocazione2("Unit&agrave; di appartenenza");

				break;

			

		}

		self.processo(dataJSON.processo);

		self.subProcesso = (dataJSON.subProcesso);

		self.allocazioneLink = (urlDettaglioStruttura+"?codiceUnita="+dataJSON.codiceUnita);

		self.dettagliAllocazione(new Struttura(dataJSON.dettaglioStruttura));

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

	self.pec = ko.observable("");

	self.strutturaLink = ko.observable("");
	self.numElementi =  ko.observable(""); 
	self.indice = ko.observable("");
	self.setNumElementi = function (elementi) {
		self.numElementi (elementi);
	}
	self.setIndice = function (indice) {
		self.indice (indice);
	}

	self.create = function(dataJSON){

		self.unitaHR(dataJSON.isUnitaHR);

		self.codiceTipoUnita(dataJSON.codiceTipoUnita);

		self.descrizioneTipoUnita(dataJSON.descrizioneTipoUnita);

		self.descrizioneUnita(dataJSON.descrizioneUnita);

		self.codiceUnita(dataJSON.codiceUnita);

		self.codiceUnitaMadre(dataJSON.codiceUnitaMadre);

		self.siglaUnita(dataJSON.siglaUnita);

		self.citta(dataJSON.citta);

		self.indirizzo(estraiIndirizzo (dataJSON.indirizzo,dataJSON.cap,dataJSON.citta,dataJSON.provincia));

		self.provincia(dataJSON.provincia);

		self.cap(dataJSON.cap);

		self.rpv(dataJSON.rpv);

		self.centralino(dataJSON.centralino);

		self.segreteria(dataJSON.segreteria);

		self.email(dataJSON.email);
		self.pec(dataJSON.pec);

		if(dataJSON.barriereArchitettoniche == true || dataJSON.barriereArchitettoniche ==="true"){

			self.barriereArchitettoniche(" SI");

		}else{

			self.barriereArchitettoniche(" NO");

		}

		self.note(dataJSON.note);

		self.santoGG(dataJSON.santoGG);

		self.santoMM(dataJSON.santoMM);
		self.strutturaLink(urlDettaglioStruttura+"?codiceUnita="+dataJSON.codiceUnita);

		

	}



	if(dataJSON){

		self.create(dataJSON);

	}

}


