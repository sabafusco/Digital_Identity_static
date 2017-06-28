//*****************************************************************
//VIEMODEL PRICIPALE - INIT PAGINA
//***************************************************************** 
function StrutturaConsultazioneViewModel(params) {

  //INIZIALIZZO LE VARIABILE DEL VIEMODEL
	var noData = "Dato non presente";
  
	var self = this;	
	
	self.struttureList=ko.observableArray([]);
	self.nomeStutturaForm = ko.observable("");
	self.codiceUnitaForm = ko.observable(""); 
	self.capForm = ko.observable("");
	self.tipoStrutturaForm = ko.observable("");
	
	self.strutturaDettaglio = ko.observable(new StrutturaDettaglio());

	self.emailList=ko.observableArray([]);
	self.emailSelected = ko.observable(Email);
	self.telList=ko.observableArray([]);	
	self.telSelected = ko.observable(Telefono);
	self.orarioList=ko.observableArray([]);	
	self.orarioSelected = ko.observable(OrarioSportello);
	self.orarioOptions=ko.observableArray([]);
	self.dettaglioStrutturaCorrellataCodice = ko.observable("");
	self.errore = ko.observable("");
	self.isError		=	ko.observable(false);
	self.erroreRisultatoRicerca = ko.observable("");

	//Carico lista strutture
	self.loadListaStrutture=function(){
		showLoadingAnimation();
		var struttureListTemp=ko.observableArray([]);
		var max32BitRepresentableInt = "2147483647";
		var url = urlRest + "personeStrutture/pagListStrutture?page=0"  + 
			"&offset=" + max32BitRepresentableInt +
			"&nome=" + self.nomeStutturaForm() + 
			"&tipo=" + self.tipoStrutturaForm() + 
			"&unita=" + self.codiceUnitaForm() + 
			"&cap=" + self.capForm();
		
		_successEvent = function(data){
			self.isError(false);
			self.erroreRisultatoRicerca("");

			
			$.each(data.list, function( key, item ){
				var com = ko.observable(new Struttura(item));
				com().setNumElementi(data.list.length);
				com().setIndice(key);
				struttureListTemp.push(com);
			});	
			self.struttureList(struttureListTemp.slice(0));
			hideLoadingAnimation();
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
	
	
	//Carico la lista delle email
	self.loadStruttura=function(codiceUnita){
		showLoadingAnimation();
		
		var url = urlRest + "personeStrutture/getFullDettaglioStruttura?codiceUnita=" +codiceUnita;

		_successEvent = function(data){
			
			self.strutturaDettaglio(new StrutturaDettaglio(data));
			var valore=$('#correlate_selection :selected').attr('value');
		        self.dettaglioStrutturaCorrellataCodice(urlDettaglio+"?codiceUnita="+valore);
			self.errore("");
			hideLoadingAnimation();			
		};
		
		_errorEvent = function(data){
			self.errore("Nessun dato trovato");
			hideLoadingAnimation();	
		};

		getAjaxWithJSONResponse(_successEvent, url, _errorEvent);
	}
	
	
	self.emptyStruttureList=function(email,operation){
		var struttureListT=ko.observableArray([]);
		self.struttureList(struttureListT.slice(0)); //svuoto i risultati ricerca
	}		
	
	self.annullaOperazione=function(){
		//window.location.href=urlBack;
		$('.ko_form_struttura_indietro').attr('action', urlBack);
		$('.ko_form_struttura_indietro').submit();
	}
	
	
	self.search=function(){
		self.struttureList.removeAll();
	
		self.nomeStutturaForm (encodeUrlValue($("#nome").val()));
		self.codiceUnitaForm(encodeUrlValue($("#unita").val())); 
		self.capForm(encodeUrlValue($("#CAP").val()));
		self.tipoStrutturaForm (encodeUrlValue($("#tipo").val()));
			
		
		self.loadListaStrutture();
		window.location.hash = '';		
		//self.cleanSearchFields();
	}

	self.clearFieldsAndResults = function(){

		self.cleanSearchFields();

		self.struttureList.removeAll();
		window.location.hash = '';		
	}
	self.cleanSearchFields = function (){
		
		self.struttureList.removeAll();
		self.nomeStutturaForm ('');
		self.codiceUnitaForm(''); 
		self.capForm('');
		self.tipoStrutturaForm ('');
		
		$("#nome").val('');
		$("#unita").val('');
		$("#CAP").val('');
		$("#tipo").val('');
		
	}
	
	self.initSearch=function(){
		var codiceUnita = getUrlParameter('codiceUnita');
		var nome = getUrlParameter('nome');
		if(nome != null && nome != 'undefined' && nome != '')
		{	showLoadingAnimation();
			self.nomeStutturaForm(nome);
			self.loadListaStrutture();
		}else if(codiceUnita != null && codiceUnita != 'undefined' && codiceUnita != ''){
			self.loadStruttura(codiceUnita);
			$('#correlate_selection').change(function ()
			{
		    
		   	 var valore=encodeUrlValue($('#correlate_selection :selected').attr('value'));
		         self.dettaglioStrutturaCorrellataCodice(urlDettaglio+"?codiceUnita="+valore);		 	
			});
		}else{
			//Questa variabile viene considerata nella pagina di dettaglio ma non in quella di ricerca
			self.errore("Nessun risultato trovato");
			hideLoadingAnimation();
		}
		
		
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
		
		self.initSearch();

	}
	self.create();
 // FINE -CHIAMO I METODI DI INIZIALIZZAZIONE
}

//*****************************************************************
//OGGETTO Email 
//*****************************************************************
function Email(dataJSON){
	var self=this;
	self.eMail = ko.observable("");
	self.tipoEMail = ko.observable("");
	self.descrizioneTipoEMail = ko.observable("");
	self.numElementi =  ko.observable(""); 
	self.indice = ko.observable("");
	self.setNumElementi = function (elementi) {
		self.numElementi (elementi);
	}
	self.setIndice = function (indice) {
		self.indice (indice);
	} 

	self.create = function(dataJSON){
		self.eMail(dataJSON.eMail);
		self.tipoEMail(dataJSON.tipoEMail);
		var descrizioneEmailByTipo; 
		switch(dataJSON.tipoEMail){
			case "0":
				descrizioneEmailByTipo = "Indirizzo di posta secondario";
			break;
			case "1": 
				descrizioneEmailByTipo = "Indirizzo di posta principale";
			break;
			case "2": 
				descrizioneEmailByTipo = "Indirizzo di posta certificata";
			break;
		}
		self.descrizioneTipoEMail(descrizioneEmailByTipo);
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
	self.numElementi =  ko.observable(""); 
	self.indice = ko.observable("");
	self.setNumElementi = function (elementi) {
		self.numElementi (elementi);
	}
	self.setIndice = function (indice) {
		self.indice (indice);
	}
	self.create = function(dataJSON){
		self.numeroTelefono(dataJSON.numeroTelefono);
		self.tipoTelefono(dataJSON.tipoTelefono);
		self.descrizioneTipoTelefono(dataJSON.descrizioneTipoTelefono);
		self.descrizioneAggiuntiva(dataJSON.descrizioneAggiuntiva);
		self.piano(dataJSON.piano);
		self.stanza(dataJSON.stanza);
		self.numeroTelefonoOld(dataJSON.numeroTelefonoOld);
	}

	if(dataJSON){
		self.create(dataJSON);
	}
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
//OGGETTO OrarioSportello 
//*****************************************************************
function OrarioSportello(dataJSON){
	var self=this;
	self.sportello = ko.observable("");
	self.codiceArea = ko.observable("");
	self.descrizioneArea = ko.observable("");
	self.listaOrari = ko.observableArray([]);
	self.stringaOrari = ko.observable("");
	self.numElementi =  ko.observable(""); 
	self.indice = ko.observable("");
	self.setNumElementi = function (elementi) {
		self.numElementi (elementi);
	}
	self.setIndice = function (indice) {
		self.indice (indice);
	}
	self.create = function(dataJSON){
		self.sportello(dataJSON.sportello);
		self.codiceArea(dataJSON.codiceArea);
		self.descrizioneArea(dataJSON.descrizioneArea);
		var orari = '';
		$.each(dataJSON.listaOrari, function( key, item ){
			self.listaOrari.push(new OrarioSportelloGiorno(item));
			orari=orari+item.descrizioneGiorno+'<br>'+item.da+' - '+item.a+' <br> ';
		});
		self.stringaOrari(orari);
		
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

	self.a =  ko.observable("");
	self.da = ko.observable("");
	self.descrizioneGiorno = ko.observable("");
	self.note = ko.observable("");	
	

	self.create = function(dataJSON){
		self.da(dataJSON.da);
		self.a(dataJSON.a);
		self.descrizioneGiorno(dataJSON.descrizioneGiorno);
		self.note(dataJSON.note);
		
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
	self.pec   = ko.observable("");
	self.linkDettaglio   = ko.observable("");
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
		self.barriereArchitettoniche(dataJSON.barriereArchitettoniche);
		self.note(dataJSON.note);
		self.pec(dataJSON.pec);
		self.santoGG(dataJSON.santoGG);
		self.santoMM(dataJSON.santoMM);	
		self.linkDettaglio(urlDettaglio+"?codiceUnita="+dataJSON.codiceUnita);
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}

//*****************************************************************
//OGGETTO Struttura Dettaglio 
//*****************************************************************
function StrutturaDettaglio(dataJSON){
	var self=this;
	
	self.nome = ko.observable("");
	self.tipologia = ko.observable("");
	self.codice_unita = ko.observable("");
	self.descrizione_unita = ko.observable("");
	self.responsabile = ko.observable("");
	self.centralino = ko.observable("");
	self.segreteria = ko.observable("");
	self.email = ko.observable("");
	self.indirizzo = ko.observable("");
	self.fax = ko.observable("");
	self.rpv = ko.observable("");
	self.pec = ko.observable("");
	self.netfax = ko.observable("");
	self.patrono = ko.observable("");
	self.barriere = ko.observable("");
	self.note = ko.observable("");
	self.codiceUnitaMadre = ko.observable("");
	self.descrizioneUnitaMadre = ko.observable("");
	self.unitaMadreIsVisible = ko.observable(false);
	self.orari = ko.observableArray([]);
	self.numeri_servizio = ko.observableArray([]);
	self.emails = ko.observableArray([]);
	self.figli = ko.observableArray([]);
	self.linkDettaglioResponsabile = ko.observable("");	
	self.linkDettaglioStrutturaMadre = ko.observable("");
	self.linkRicercaPersonale = ko.observable("");

	self.create = function(dataJSON){
		self.nome(dataJSON.descrizioneUnita);
		self.tipologia(dataJSON.descrizioneTipoUnita);
		self.codice_unita(dataJSON.codiceUnita);
		self.descrizione_unita(dataJSON.descrizioneUnita);
		self.responsabile(dataJSON.responsabile.nome + ' '+dataJSON.responsabile.cognome );
		self.centralino(dataJSON.centralino);
		self.segreteria(dataJSON.segreteria);
		if(dataJSON.email != null && dataJSON.email != 'null' && dataJSON.email != 'undefined'){
			self.email(dataJSON.email);
		}
		self.indirizzo(estraiIndirizzo (dataJSON.indirizzo,dataJSON.cap,dataJSON.citta,dataJSON.provincia));
		self.fax(dataJSON.fax);
		self.rpv(dataJSON.rpv);
		self.pec(dataJSON.pec);
		self.codiceUnitaMadre(dataJSON.codiceUnitaMadre);
		self.descrizioneUnitaMadre(dataJSON.descrizioneUnitaMadre);
		if(dataJSON.codiceUnitaMadre != null &&
			dataJSON.codiceUnitaMadre != 'undefined' &&
			dataJSON.codiceUnitaMadre != '0' &&
			dataJSON.codiceUnitaMadre != dataJSON.codiceUnita){
			self.unitaMadreIsVisible(true); 
		}
		self.netfax(dataJSON.netfax);
		if( dataJSON.santoGG != null && dataJSON.santoMM != null){
			self.patrono(dataJSON.santoGG+ '/' + dataJSON.santoMM); 
		}
		if( dataJSON.barriereArchitettoniche == false){
			self.barriere("NO");
		}else{
			self.barriere("SI");
		}
		self.note(dataJSON.note);
		
		if(dataJSON.orariSportelli){		
			$.each(dataJSON.orariSportelli, function( key, item ){
				var orario = new OrarioSportello(item);
				orario.setNumElementi(dataJSON.orariSportelli.length);
				orario.setIndice(key);
				self.orari.push(orario);
			});
		}
		if(dataJSON.telefoni){
			$.each(dataJSON.telefoni, function( key, item ){
				var telefono = new Telefono(item);
				telefono.setNumElementi(dataJSON.telefoni.length);
				telefono.setIndice(key);
				self.numeri_servizio.push(telefono);
			});
		}
		if(dataJSON.emails){
			$.each(dataJSON.emails, function( key, item ){
				var email = new Email(item);
				email.setNumElementi(dataJSON.emails.length);
				email.setIndice(key);
				self.emails.push(email);
			});
		}
		if(dataJSON.figli ){
			$.each(dataJSON.figli, function( key, item ){
				var figlio = new Struttura(item);
				self.figli.push(figlio);
			});
		}
		self.linkDettaglioResponsabile(urlDettaglioPersona+"?matricola="+dataJSON.responsabile.matricola);
		self.linkDettaglioStrutturaMadre(urlDettaglio+"?codiceUnita="+dataJSON.codiceUnitaMadre);
		self.linkRicercaPersonale(urlCercaPersone+"?codiceUnita="+dataJSON.codiceUnita);
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}
