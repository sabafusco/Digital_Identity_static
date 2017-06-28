var DATE_INVALID = "Inserire una data nel formato dd/mm/yyyy.";
var DATE_INVALID2 = "La data inserita deve essere antecedente o uguale a quella odierna";
var IMPRESA_ANAG_NOME_REQUIRED = "Denominazione e' un campo obbligatorio";
var IMPRESA_ANAG_DATI_FISCALI_REQUIRED = "Dati Fiscali e' un campo obbligatorio";
var IMPRESA_ANAG_DATI_FISCALI_NOT_VALID = "La Partita IVA non e' corretta (campo Dati Fiscali)";
var IMPRESA_PROV_RESPONSABILE_NOME_REQUIRED = "Nome responsabile e' un campo obbligatorio";
var IMPRESA_PROV_RESPONSABILE_COGNOME_REQUIRED = "Cognome responsabile e' un campo obbligatorio";
var IMPRESA_PROV_NOME_UFFICIO_REQUIRED = "Denominazione ufficio responsabile e' un campo obbligatorio";
var IMPRESA_PROV_CODICE_UNITA_REQUIRED = "Codice Unita' e' un campo obbligatorio";
var IMPRESA_PROV_CODICE_UNITA_NUMBER = "Codice Unita' e' un campo numerico";
var IMPRESA_PROV_NOME_REQUIRED = "Nome provvedimento e' un campo obbligatorio";
var IMPRESA_PROV_DATA_REQUIRED = "Data e' un campo obbligatorio";
var IMPRESA_PROG_IMPORTO_AMMESSO_NUMBER = "Importo Ammesso e' un campo numerico intero o con 2 cifre decimali separate da virgola";
var IMPRESA_PROG_IMPORTO_AMMESSO_REQUIRED = "Importo Ammesso e' un campo obbligatorio";
var IMPRESA_PROG_IMPORTO_EROGATO_NUMBER = "Importo Erogato e' un campo numerico intero o con 2 cifre decimali separate da virgola";
var IMPRESA_PROG_FILE_REQUIRED = "Dati Progetto : Va inserito Nome Progetto e almeno uno tra Link Progetto e Allegato";
var IMPRESA_REVO_FILE_REQUIRED = "Dati Revoca : Va inserito Nome Atto e almeno uno tra Link Atto e Allegato";
var CUP_MAX_15 = "La lunghezza del campo Codice Unico di Progetto e' al massimo di 15 caratteri";
var PERSONA_ANAG_NOME_REQUIRED = "Nome e' un campo obbligatorio";
var PERSONA_ANAG_COGNOME_REQUIRED = "Cognome e' un campo obbligatorio";
var PERSONA_ANAG_CODICE_FISCALE_REQUIRED = "Codice Fiscale e' un campo obbligatorio";
var PERSONA_ANAG_CODICE_FISCALE_NOT_VALID = "Il campo Codice Fiscale non e' corretto";
var PERSONA_PROV_RESPONSABILE_NOME_REQUIRED = "Nome responsabile e' un campo obbligatorio";
var PERSONA_PROV_RESPONSABILE_COGNOME_REQUIRED = "Cognome responsabile e' un campo obbligatorio";
var PERSONA_PROV_NOME_UFFICIO_REQUIRED = "Denominazione ufficio responsabile e' un campo obbligatorio";
var PERSONA_ANAG_NOME_LENGTH = "Nome non può essere più lungo 150 caratteri";
var LINK_NOT_VALID_PROV = "Dati Provvedimento: Il valore inserito nel campo link non è valido";
var LINK_NOT_VALID_PROG = "Dati Progetto: Il valore inserito nel campo link non è valido";
var LINK_NOT_VALID_REVO = "Dati Revoca: Il valore inserito nel campo link non è valido";
var RICERCA_SENZA_RISULTATO = "La ricerca non ha prodotto risultati";
var MODIFICA_EFFETTUATA = "La modifica e' stata effettuata";
var DATI_PROV_OBBLIG = "Dati Provvedimento: Va inserito almeno uno tra Link e Allegato";
var DATI_PROG_OBBLIG = "Dati Progetto : Vanno inseriti Nome Progetto e almeno uno tra Link Progetto e Allegato";
var DATI_REVO_OBBLIG = "Dati Revoca : Vanno inseriti Nome Atto e almeno uno tra Link Atto e Allegato";
var ALLEGATO_LINK_PROV = "Dati provvedimento : E' possibile inserire un solo campo tra link e allegato";
var ALLEGATO_LINK_PROG = "Dati progetto : E' possibile inserire un solo campo tra link e allegato";
var ALLEGATO_LINK_REVO = "Dati revoca : E' possibile inserire un solo campo tra link e allegato";
var DATI_PROG_PROTOCOLLO = "Dati progetto : Se Numero Protocollo e' valorizzato va valorizzato anche Nome Progetto e almeno uno tra Link Progetto e Allegato ";
var DATI_PROG_PROTOCOLLO2 = "Dati progetto : Se Numero Protocollo e Nome Progetto sono valorizzati va valorizzato almeno uno tra Link Progetto e Allegato ";
var DATI_REVO_PROTOCOLLO = "Dati revoca : Se Numero Protocollo e' valorizzato va valorizzato anche Nome Atto e almeno uno tra Link Atto e Allegato ";
var DATI_REVO_PROTOCOLLO2 = "Dati revoca : Se Numero Protocollo e Nome Atto sono valorizzati va valorizzato almeno uno tra Link Atto e Allegato ";

var DATI_PROG_NOME = "Dati progetto : Se Nome Progetto è valorizzato va valorizzato almeno uno tra Link Progetto e Allegato ";
var DATI_REVO_NOME = "Dati revoca : Se Nome Atto è valorizzato va valorizzato almeno uno tra Link Atto e Allegato ";
var FILE_ESTENSIONE_NON_VALIDA = "File non valido. Sono ammesse le estensioni: .pdf ";

//var estensioniAmmesseRegEx=/\.(pdf|doc|docx|zip|xls|xlsx)$/i;
var estensioniAmmesseRegEx=/\.(pdf)$/i;

var formToken = "";
function SovvenzioneViewModel(params) {
	var self = this;
	self.sovvenzioneSelected = ko.observable(new Sovvenzione());	
	self.sovvenzioneList=ko.observableArray([]);
	self.formSovvenzioneOperazione = ko.observable("");
	
	//form operazione add e edit
	//self.disableBtnAddSovvenzione = ko.observable("");
	self.formOperationSovvenzioneTipo = ko.observable("");
	self.formOperationSovvenzioneId = ko.observable("");
	
	//form ricerca
	self.searchFormCognome = ko.observable("");
	self.searchFormCodiceCaso = ko.observable("");
	self.searchFormCodiceFiscale = ko.observable("");
	self.searchFormDenominazioneImpresa = ko.observable("");
	self.searchFormDatiFiscali = ko.observable("");

	//
	self.disableSovvenzioni = ko.observable(true);
	
	
	//VALIDAZIONE ED INVIO FORM
	$(document).ready(function() 
	{ 		
			
	});

	
	
	//form impresa / ente

	self.linkProvvedimentoStartHttp = ko.computed(function() {
        if(self.sovvenzioneSelected() && self.sovvenzioneSelected().linkProvvedimento()) {
			var link = self.sovvenzioneSelected().linkProvvedimento();
			if(link.indexOf("http") != 0){
				return ("http://" + link);
			} else {
				return link;
			}
		} else {
			return null;
		}
    }, self);
	self.linkProgettoStartHttp = ko.computed(function() {
        if(self.sovvenzioneSelected() && self.sovvenzioneSelected().linkProgetto()) {
			var link = self.sovvenzioneSelected().linkProgetto();
			if(link.indexOf("http") != 0){
				return ("http://" + link);
			} else {
				return link;
			}
		} else {
			return null;
		}
    }, self);
	self.linkRevocaStartHttp = ko.computed(function() {
        if(self.sovvenzioneSelected() && self.sovvenzioneSelected().linkRevoca()) {
			var link = self.sovvenzioneSelected().linkRevoca();
			if(link.indexOf("http") != 0){
				return ("http://" + link);
			} else {
				return link;
			}
		} else {
			return null;
		}
    }, self);

	self.formImpresaOperazione = ko.observable("");
	self.formImpresaId = ko.observable("");
	self.formImpresaAnagDenominazione = ko.observable("");
	self.formImpresaAnagDatiFiscali = ko.observable("");
	self.formImpresaAnagCurriculum = ko.observable("");
	self.formImpresaAnagNome = ko.observable("");
	self.formImpresaAnagCognome = ko.observable("");
	self.formImpresaAnagCodiceFiscale = ko.observable("");
	self.formImpresaAnagCodiceCaso = ko.observable("");
	self.formImpresaProvUfficio = ko.observable("");
	self.formImpresaProvCodiceUnita = ko.observable("");
	self.formImpresaProvResponsabileNome = ko.observable("");
	self.formImpresaProvResponsabileCognome = ko.observable("");
	self.formImpresaProvData = ko.observable("");
	self.formImpresaProvModalita = ko.observable("");
	self.formImpresaProvImportoAmmesso = ko.observable("");
	self.formImpresaProvNormaAssegnazione = ko.observable("");
	self.formImpresaProvNumeroProtocollo = ko.observable("");
	self.formImpresaProvNome = ko.observable("");
	self.formImpresaProvFile = ko.observable("");
	self.formImpresaProvFileUrl = ko.observable("");
	self.formImpresaProvFileUrlNome = ko.observable("");
	self.formImpresaProvFileNome = ko.observable("");
	self.formImpresaProvLink = ko.observable("");
	self.formImpresaProgCup = ko.observable("");
	self.formImpresaProgImportoErogato = ko.observable("");
	self.formImpresaProgNumeroProtocollo = ko.observable("");
	self.formImpresaProgNome = ko.observable("");
	self.formImpresaProgFile = ko.observable("");
	self.formImpresaProgFileNome = ko.observable("");
	self.formImpresaProgFileUrl = ko.observable("");
	self.formImpresaProgFileUrlNome = ko.observable("");
	self.formImpresaProgLink = ko.observable("");
	self.formImpresaRevoAtto = ko.observable("");
	self.formImpresaRevoNumeroProtocollo = ko.observable("");
	self.formImpresaRevoNome = ko.observable("");
	self.formImpresaRevoFile = ko.observable("");
	self.formImpresaRevoFileNome = ko.observable("");
	self.formImpresaRevoFileUrl = ko.observable("");
	self.formImpresaRevoFileUrlNome = ko.observable("");
	self.formImpresaRevoLink = ko.observable("");
	
	
	//submit form ricerca
	self.searchSovvenzione=function(){
		self.setSearchParams("cognome", encodeUrlValue(self.searchFormCognome()));
		self.setSearchParams("codiceCaso", encodeUrlValue(self.searchFormCodiceCaso()));
		self.setSearchParams("codiceFiscale", encodeUrlValue(self.searchFormCodiceFiscale()));
		self.setSearchParams("denominazioneImpresa", encodeUrlValue(self.searchFormDenominazioneImpresa()));
		self.setSearchParams("datiFiscali", encodeUrlValue(self.searchFormDatiFiscali()));
		self.loadPage(1);
	}
	
	self.initSearch=function(){		
		var isSearchInit = false;
		var searchCognome = getUrlVars()["searchCognome"];
		var searchCodiceCaso = getUrlVars()["searchCodiceCaso"];
		var searchCodiceFiscale = getUrlVars()["searchCodiceFiscale"];
		var searchDenominazioneImpresa = getUrlVars()["searchDenominazioneImpresa"];
		var searchDatiFiscali = getUrlVars()["searchDatiFiscali"];
		var searchItemsPerPage = getUrlVars()["searchItemsPerPage"];
		var searchCurrentPage = getUrlVars()["searchCurrentPage"];
		var searchNumElementi = getUrlVars()["searchNumElementi"];
		
		if(searchCognome && searchCognome!=""){
			self.searchFormCognome(searchCognome);
			isSearchInit = true;
		}
		if(searchCodiceCaso && searchCodiceCaso!=""){
			self.searchFormCodiceCaso(searchCodiceCaso);
			isSearchInit = true;
		}
		if(searchCodiceFiscale && searchCodiceFiscale!=""){
			self.searchFormCodiceFiscale(searchCodiceFiscale);
			isSearchInit = true;
		}
		if(searchDenominazioneImpresa && searchDenominazioneImpresa!=""){
			self.searchFormDenominazioneImpresa(searchDenominazioneImpresa);
			isSearchInit = true;
		}
		if(searchDatiFiscali && searchDatiFiscali!=""){
			self.searchFormDatiFiscali(searchDatiFiscali);
			isSearchInit = true;
		}
		
		if(searchItemsPerPage && searchItemsPerPage!=""){
			self.itemsPerPage(searchItemsPerPage);
		}
		
		if(searchCurrentPage && searchCurrentPage!=""){
			self.currentPage(searchCurrentPage);
			isSearchInit = true;
		}
		
		if(searchNumElementi && searchNumElementi!=""){
			self.numElementi(searchNumElementi);
			isSearchInit = true;
		}
	
		if(isSearchInit){
			self.setSearchParams("cognome", self.searchFormCognome());
			self.setSearchParams("codiceCaso", self.searchFormCodiceCaso());
			self.setSearchParams("codiceFiscale", self.searchFormCodiceFiscale());
			self.setSearchParams("denominazioneImpresa", self.searchFormDenominazioneImpresa());
			self.setSearchParams("datiFiscali", self.searchFormDatiFiscali());
			self.loadPage(searchCurrentPage ? parseInt(searchCurrentPage) : 1);
		}else{
			hideLoadingAnimation();
		}
	}
	
	//dettaglio sovvenzione
	self.newDettaglioSovvenzione=function(){
		self.sovvenzioneSelected(new Sovvenzione());
		self.sovvenzioneSelected().tipo(self.formOperationSovvenzioneTipo());
		hideLoadingAnimation();
	}
	
	
	self.initOperation=function(operation){
		showLoadingAnimation();
		self.formSovvenzioneOperazione(operation);
		if(operation == "ADD_IMPRESA"){
			self.formOperationSovvenzioneTipo("IMPRESA");
			jQuery('#form-sovvenzione').show();
			self.newDettaglioSovvenzione();
			hideLoadingAnimation();
		}else if(operation == "ADD_PERSONA_FISICA"){
			self.formOperationSovvenzioneTipo("PERSONA_FISICA");
			jQuery('#form-sovvenzione').show();
			self.newDettaglioSovvenzione();
			hideLoadingAnimation();
		}else if(operation == "EDIT"){
			self.formImpresaOperazione("MOD");
			self.sovvenzioneDettaglio(idSovvenzione);
		}else if(operation == "SEARCH"){
			initPagination(self,self.loadListaSovvenzioni);
			//hideLoadingAnimation();
            self.initSearch();
		}
		
	}
	
	self.btnNew=function(tipoSovvenzione){
		self.formOperationSovvenzioneTipo(tipoSovvenzione);
//		$('.ko_form_sovvenzione_op').attr('action', urlNew);
//		$('.ko_form_sovvenzione_op').submit();
		
		urlNew += "?tipoSovvenzione=" + tipoSovvenzione;
		urlNew += "&searchCognome=" + self.searchFormCognome();
		urlNew += "&searchCodiceCaso=" + self.searchFormCodiceCaso();
		urlNew += "&searchCodiceFiscale=" + self.searchFormCodiceFiscale();
		urlNew += "&searchDenominazioneImpresa=" + self.searchFormDenominazioneImpresa();
		urlNew += "&searchDatiFiscali=" + self.searchFormDatiFiscali();
		urlNew += "&searchNumElementi=" + self.numElementi();
		urlNew += "&searchCurrentPage=" + self.currentPage();
		urlNew += "&searchItemsPerPage=" + self.itemsPerPage();
		window.location.href = urlNew;

	}
	
	self.btnModifica=function(idSovvenzione,tipoSovvenzione){
//		self.formOperationSovvenzioneId(idSovvenzione);
//		self.formOperationSovvenzioneTipo(tipoSovvenzione);
//		$('.ko_form_sovvenzione_op').attr('action', urlEdit);
//		$('.ko_form_sovvenzione_op').submit();
		//alert('tipoSovvenzione '+tipoSovvenzione);
		showLoadingAnimation();	
		var url= URL_DETTAGLIO_SOVVENZIONE + idSovvenzione;
		//alert ('url '+url);
		_successEvent = function(data){
			sovvenzioneTemp = new Sovvenzione(data);
		self.formOperationSovvenzioneId(idSovvenzione);
		self.formOperationSovvenzioneTipo(tipoSovvenzione);
//		$('.ko_form_sovvenzione_op').attr('action', urlEdit);
//		$('.ko_form_sovvenzione_op').submit();
		
		urlEdit += "?idSovvenzione=" + idSovvenzione;
		urlEdit += "&tipoSovvenzione=" + sovvenzioneTemp.tipo();
		urlEdit += "&searchCognome=" + self.searchFormCognome();
		urlEdit += "&searchCodiceCaso=" + self.searchFormCodiceCaso();
		urlEdit += "&searchCodiceFiscale=" + self.searchFormCodiceFiscale();
		urlEdit += "&searchDenominazioneImpresa=" + self.searchFormDenominazioneImpresa();
		urlEdit += "&searchDatiFiscali=" + self.searchFormDatiFiscali();
		urlEdit += "&searchNumElementi=" + self.numElementi();
		urlEdit += "&searchCurrentPage=" + self.currentPage();
		urlEdit += "&searchItemsPerPage=" + self.itemsPerPage();
		window.location.href = urlEdit;
          
		};
		getAjaxWithJSONResponse(_successEvent, url);
	}
	
	//Elimino la sovvenzione
	self.btnElimina=function(idSovvenzione,tipoSovvenzione){
		if(confirm("Eliminare la sovvenzione selezionata?")){
			var idTemp ;
			if(typeof id === 'function')
				idTemp = idSovvenzione();
			else 
				idTemp = idSovvenzione;
			showLoadingAnimation();
		
			var url= URL_ELIMINA_SOVVENZIONE + idTemp;
			_successEvent = function(data){
				self.loadPage(1);
				hideLoadingAnimation();
			};
			
			_errorEvent = function(data){
				showMessage("fail");
				hideLoadingAnimation();
			};
			
			
			var tokenHeader = new TokenHeader("ADMINTRASP_TOKEN", self.token());
			getAjaxWithJSONResponseToken(_successEvent, url, _errorEvent, tokenHeader);
		}  
	}
	//visualizzazione in edit
	self.setFormSovvenzione=function(){
		self.formImpresaId(decodeInputValue(self.sovvenzioneSelected().id()));
		self.formImpresaAnagDenominazione(decodeInputValue(self.sovvenzioneSelected().denominazioneImpresa()));
		self.formImpresaAnagDatiFiscali(decodeInputValue(self.sovvenzioneSelected().datiFiscaliImpresa()));
		self.formImpresaAnagCurriculum(decodeInputValue(self.sovvenzioneSelected().curriculum()));		
		self.formImpresaAnagNome(decodeInputValue(self.sovvenzioneSelected().nomePersonaFisica()));
		self.formImpresaAnagCognome(decodeInputValue(self.sovvenzioneSelected().cognomePersonaFisica()));
		self.formImpresaAnagCodiceFiscale(decodeInputValue(self.sovvenzioneSelected().codiceFiscale()));
		self.formImpresaAnagCodiceCaso(decodeInputValue(self.sovvenzioneSelected().codiceCaso()));
		self.formImpresaProvUfficio(decodeInputValue(self.sovvenzioneSelected().ufficio()));
		self.formImpresaProvCodiceUnita(decodeInputValue(self.sovvenzioneSelected().codiceUnita()));
		self.formImpresaProvResponsabileNome(decodeInputValue(self.sovvenzioneSelected().responsabileNome()));
		self.formImpresaProvResponsabileCognome(decodeInputValue(self.sovvenzioneSelected().responsabileCognome()));
		self.formImpresaProvData(decodeInputValue(self.sovvenzioneSelected().dataProvvedimento()));
		self.formImpresaProvModalita(decodeInputValue(self.sovvenzioneSelected().modalita()));
		 
		self.formImpresaProvImportoAmmesso(decodeInputValue(self.sovvenzioneSelected().importoAmmesso()));
		
		self.formImpresaProvImportoAmmesso( decodeInputValue(  $.number( self.sovvenzioneSelected().importoAmmesso(), 2, ',', '.' )  )   );
		
		self.formImpresaProvNormaAssegnazione(decodeInputValue(self.sovvenzioneSelected().norma()));
		self.formImpresaProvNumeroProtocollo(decodeInputValue(self.sovvenzioneSelected().numeroProtocolloProvvedimento()));
		self.formImpresaProvNome(decodeInputValue(self.sovvenzioneSelected().nomeProvvedimento()));
		self.formImpresaProvFileNome(decodeInputValue(self.sovvenzioneSelected().nomeFileProvvedimento()));
		self.formImpresaProvFileUrl(decodeInputValue(self.sovvenzioneSelected().urlProvvedimento()));
		self.formImpresaProvLink(decodeInputValue(self.sovvenzioneSelected().linkProvvedimento()));
		self.formImpresaProgCup(decodeInputValue(self.sovvenzioneSelected().cup()));

		self.formImpresaProgImportoErogato( decodeInputValue( self.sovvenzioneSelected().importoErogato() ) );
		
		self.formImpresaProgNumeroProtocollo(decodeInputValue(self.sovvenzioneSelected().numeroProtocolloProgetto()));
		self.formImpresaProgNome(decodeInputValue(self.sovvenzioneSelected().nomeProgetto()));
		self.formImpresaProgFileNome(decodeInputValue(self.sovvenzioneSelected().nomeFileProgetto()));
		self.formImpresaProgFileUrl(decodeInputValue(self.sovvenzioneSelected().urlProgetto()));
		self.formImpresaProgLink(decodeInputValue(self.sovvenzioneSelected().linkProgetto()));
		self.formImpresaRevoAtto(decodeInputValue(self.sovvenzioneSelected().nomeAttoRevoca()));
		self.formImpresaRevoNumeroProtocollo(decodeInputValue(self.sovvenzioneSelected().numeroProtocolloRevoca()));
		self.formImpresaRevoNome(decodeInputValue(self.sovvenzioneSelected().nomeRevoca()));
		self.formImpresaRevoFileNome(decodeInputValue(self.sovvenzioneSelected().nomeFileRevoca()));
		self.formImpresaRevoFileUrl(decodeInputValue(self.sovvenzioneSelected().urlRevoca()));
		self.formImpresaRevoLink(decodeInputValue(self.sovvenzioneSelected().linkRevoca()));
	}
	
	self.updateSovvenzioneSelected=function(sovvenzioneTemp){
		self.sovvenzioneSelected().id(sovvenzioneTemp ? sovvenzioneTemp.id() : "");
		self.sovvenzioneSelected().ragioneSociale(sovvenzioneTemp ? sovvenzioneTemp.ragioneSociale() : "");
		self.sovvenzioneSelected().anno(sovvenzioneTemp ? sovvenzioneTemp.anno() : "");
		self.sovvenzioneSelected().partitaIva(sovvenzioneTemp ? sovvenzioneTemp.partitaIva() : "");
		self.sovvenzioneSelected().importoAmmesso(sovvenzioneTemp ? sovvenzioneTemp.importoAmmesso() : "");
		self.sovvenzioneSelected().importoErogato(sovvenzioneTemp ? sovvenzioneTemp.importoErogato() : "");
		self.sovvenzioneSelected().codiceUnita(sovvenzioneTemp ? sovvenzioneTemp.codiceUnita() : "");
		self.sovvenzioneSelected().ufficio(sovvenzioneTemp ? sovvenzioneTemp.ufficio() : "");
		self.sovvenzioneSelected().cognomeFunzionario(sovvenzioneTemp ? sovvenzioneTemp.cognomeFunzionario() : "");
		self.sovvenzioneSelected().nomeFunzionario(sovvenzioneTemp ? sovvenzioneTemp.nomeFunzionario() : "");
		self.sovvenzioneSelected().modalita(sovvenzioneTemp ? sovvenzioneTemp.modalita() : "");
		self.sovvenzioneSelected().norma(sovvenzioneTemp ? sovvenzioneTemp.norma() : "");
		self.sovvenzioneSelected().dataProvvedimento(sovvenzioneTemp ? sovvenzioneTemp.dataProvvedimento() : "");
		self.sovvenzioneSelected().modalita(sovvenzioneTemp ? sovvenzioneTemp.modalita() : "");
		self.sovvenzioneSelected().nomePersonaFisica(sovvenzioneTemp ? sovvenzioneTemp.nomePersonaFisica() : "");
		self.sovvenzioneSelected().cognomePersonaFisica(sovvenzioneTemp ? sovvenzioneTemp.cognomePersonaFisica() : "");
		self.sovvenzioneSelected().codiceCaso(sovvenzioneTemp ? sovvenzioneTemp.codiceCaso() : "");
		self.sovvenzioneSelected().codiceFiscale(sovvenzioneTemp ? sovvenzioneTemp.codiceFiscale() : "");
		self.sovvenzioneSelected().denominazioneImpresa(sovvenzioneTemp ? sovvenzioneTemp.denominazioneImpresa() : "");
		self.sovvenzioneSelected().datiFiscaliImpresa(sovvenzioneTemp ? sovvenzioneTemp.datiFiscaliImpresa() : "");
		self.sovvenzioneSelected().numeroProtocolloProvvedimento(sovvenzioneTemp ? sovvenzioneTemp.numeroProtocolloProvvedimento() : "");
		self.sovvenzioneSelected().numeroProtocolloProgetto(sovvenzioneTemp ? sovvenzioneTemp.numeroProtocolloProgetto() : "");
		self.sovvenzioneSelected().cup(sovvenzioneTemp ? sovvenzioneTemp.cup() : "");
		self.sovvenzioneSelected().curriculum(sovvenzioneTemp ? sovvenzioneTemp.curriculum() : "");
		self.sovvenzioneSelected().responsabileNome(sovvenzioneTemp ? sovvenzioneTemp.responsabileNome() : "");
		self.sovvenzioneSelected().responsabileCognome(sovvenzioneTemp ? sovvenzioneTemp.responsabileCognome() : "");
		self.sovvenzioneSelected().linkProgetto(sovvenzioneTemp ? sovvenzioneTemp.linkProgetto() : "");
		self.sovvenzioneSelected().nomeAttoRevoca(sovvenzioneTemp ? sovvenzioneTemp.nomeAttoRevoca() : "");
		self.sovvenzioneSelected().numeroProtocolloRevoca(sovvenzioneTemp ? sovvenzioneTemp.numeroProtocolloRevoca() : "");		
		self.sovvenzioneSelected().nomeProvvedimento(sovvenzioneTemp ? sovvenzioneTemp.nomeProvvedimento() : "");
		self.sovvenzioneSelected().urlProvvedimento(sovvenzioneTemp ? sovvenzioneTemp.urlProvvedimento() : "");
		self.sovvenzioneSelected().nomeFileProvvedimento(sovvenzioneTemp ? sovvenzioneTemp.nomeFileProvvedimento() : "");
		self.sovvenzioneSelected().linkProvvedimento(sovvenzioneTemp ? sovvenzioneTemp.linkProvvedimento() : "");
		self.sovvenzioneSelected().nomeProgetto(sovvenzioneTemp ? sovvenzioneTemp.nomeProgetto() : "");
		self.sovvenzioneSelected().urlProgetto(sovvenzioneTemp ? sovvenzioneTemp.urlProgetto() : "");
		self.sovvenzioneSelected().nomeFileProgetto(sovvenzioneTemp ? sovvenzioneTemp.nomeFileProgetto() : "");
		self.sovvenzioneSelected().linkProgetto(sovvenzioneTemp ? sovvenzioneTemp.linkProgetto() : "");
		self.sovvenzioneSelected().nomeAttoRevoca(sovvenzioneTemp ? sovvenzioneTemp.nomeRevoca() : "");
		self.sovvenzioneSelected().urlRevoca(sovvenzioneTemp ? sovvenzioneTemp.urlRevoca() : "");
		self.sovvenzioneSelected().nomeFileRevoca(sovvenzioneTemp ? sovvenzioneTemp.nomeFileRevoca() : "");
		self.sovvenzioneSelected().linkRevoca(sovvenzioneTemp ? sovvenzioneTemp.linkRevoca() : "");

		
		if(self.sovvenzioneSelected().ragioneSociale() && self.sovvenzioneSelected().ragioneSociale()!=""){
			self.sovvenzioneSelected().tipo("impresa");
		}else{
			self.sovvenzioneSelected().tipo("persona");
		}
		
		
	}
	
	//Carico lista sovvenzioni
	self.loadListaSovvenzioni=function(){
		showLoadingAnimation();
		var sovvenzioneListTemp = ko.observableArray([]);
		var url = URL_RICERCA_SOVVENZIONE + "?pageNumber=" + self.currentPage() + "&pageSize=" + self.itemsPerPage() + 
				"&cognome=" + self.getSearchParams("cognome") + "&codiceCaso=" + self.getSearchParams("codiceCaso") + 
				"&codiceFiscale=" + self.getSearchParams("codiceFiscale") + "&denominazioneImpresa=" + self.getSearchParams("denominazioneImpresa") + 
				"&datiFiscali=" + self.getSearchParams("datiFiscali") ;
		
		_successEvent = function(data){
		   if(data.resultsCount <= 0){
			   showMessage("fail",RICERCA_SENZA_RISULTATO);
		   }
			//paginazione
			if(self.currentPage() == 1){
				self.numElementi(data.resultsCount);
			}
			self.numPagineMax(Math.ceil(parseInt(self.numElementi()) / parseInt(self.itemsPerPage())));
			self.paginazioneNumber();			
			//paginazione end

			if(data.listaRiepilogoSovvenzioni){
				if (data.listaRiepilogoSovvenzioni instanceof Array) {
					$.each( data.listaRiepilogoSovvenzioni, function( key, item ){
						var sovvenzione = ko.observable(new Sovvenzione(item));
						sovvenzioneListTemp.push(sovvenzione);
					});				
                } else {
					var sovvenzione = ko.observable(new Sovvenzione(data.listaRiepilogoSovvenzioni));
					sovvenzioneListTemp.push(sovvenzione);
				}   

			}
			self.sovvenzioneList(sovvenzioneListTemp.slice(0));
			hideLoadingAnimation();
		 };
		 getAjaxWithJSONResponse(_successEvent, url);
		
	}

	//Carico il dettaglio di una singola sovvenzione
	self.sovvenzioneDettaglio=function(id){
		showLoadingAnimation();	
		var url= URL_DETTAGLIO_SOVVENZIONE + id;

		_successEvent = function(data){
			sovvenzioneTemp = new Sovvenzione(data);
			self.updateSovvenzioneSelected(sovvenzioneTemp);
			self.setFormSovvenzione();
			hideLoadingAnimation();
		};
		getAjaxWithJSONResponse(_successEvent, url);

	}	

	self.resetFormSovvenzione=function(){
		self.setFormSovvenzione();
		self.emptyFormImpresa();
	}
	
	self.annullaOperazione=function(){
		$('.ko_form_sovvenzione_indietro').attr('action', urlBack);
		$('.ko_form_sovvenzione_indietro').submit();
	}	
	
	self.emptyFormSearch=function(){
		self.searchFormCognome("");
		self.searchFormCodiceCaso("");
		self.searchFormCodiceFiscale("");
		self.searchFormDenominazioneImpresa("");
		self.searchFormDatiFiscali("");
	}
	
	self.emptyFormImpresa=function(){
		self.formImpresaOperazione("");
		self.formImpresaId("");
		self.formImpresaAnagDenominazione("");
		self.formImpresaAnagDatiFiscali("");
		self.formImpresaAnagCurriculum("");
		self.formImpresaAnagNome("");
		self.formImpresaAnagCognome("");
		self.formImpresaAnagCodiceFiscale("");
		self.formImpresaAnagCodiceCaso("");
		self.formImpresaProvUfficio("");
		self.formImpresaProvCodiceUnita("");
		self.formImpresaProvResponsabileNome("");
		self.formImpresaProvResponsabileCognome("");
		self.formImpresaProvData("");
		self.formImpresaProvModalita("");
		self.formImpresaProvImportoAmmesso("");
		self.formImpresaProvNormaAssegnazione("");
		self.formImpresaProvNumeroProtocollo("");
		self.formImpresaProvNome("");
		self.formImpresaProvFile("")
		self.formImpresaProvFileNome("")
		self.formImpresaProvFileUrl("")
		self.formImpresaProvLink("");
		self.formImpresaProgCup("");
		self.formImpresaProgImportoErogato("");
		self.formImpresaProgNumeroProtocollo("");
		self.formImpresaProgNome("");
		self.formImpresaProgFile("");
		self.formImpresaProgFileNome("");
		self.formImpresaProgFileUrl("");
		self.formImpresaProgLink("");
		self.formImpresaRevoAtto("");
		self.formImpresaRevoNumeroProtocollo("");
		self.formImpresaRevoNome("");
		self.formImpresaRevoFile("");
		self.formImpresaRevoFileNome("");
		self.formImpresaRevoFileUrl("");
		self.formImpresaRevoLink("");
	}
	
	//SELECT
	self.selectUfficioOptions = ko.observableArray([
		{name: "Seleziona ufficio", value: ""},
		{name: "D.C. Acquisti", value: "D.C. Acquisti"},
		{name: "D.C. Patrimonio", value: "D.C. Patrimonio"},
		{name: "D.C. Prestazioni", value: "D.C. Prestazioni"},
		{name: "D.C. Prevenzione", value: "D.C. Prevenzione"},
		{name: "D.C. Programmazione Organizzazione e Controllo", value: "D.C. Programmazione Organizzazione e Controllo"},
		{name: "D.C. Ragioneria", value: "D.C. Ragioneria"},
		{name: "D.C. Riabilitazione e protesi", value: "D.C. Riabilitazione e protesi"},
		{name: "D.C. Rischi", value: "D.C. Rischi"},
		{name: "D.C. Risorse Umane", value: "D.C. Risorse Umane"},
		{name: "D.C. Servizi Informativi e Telecomunicazioni", value: "D.C. Servizi Informativi e Telecomunicazioni"},
		{name: "D.C. Supporto Organi", value: "D.C. Supporto Organi"},
		{name: "D.R. Abruzzo", value: "D.R. Abruzzo"},
		{name: "D.R. Alto Adige", value: "D.R. Alto Adige"},
		{name: "D.R. Basilicata", value: "D.R. Basilicata"},
		{name: "D.R. Calabria", value: "D.R. Calabria"},
		{name: "D.R. Campania", value: "D.R. Campania"},
		{name: "D.R. Emilia Romagna", value: "D.R. Emilia Romagna"},
		{name: "D.R. Friuli Venezia Giulia", value: "D.R. Friuli Venezia Giulia"},
		{name: "D.R. Lazio", value: "D.R. Lazio"},
		{name: "D.R. Liguria", value: "D.R. Liguria"},
		{name: "D.R. Lombardia", value: "D.R. Lombardia"},
		{name: "D.R. Marche", value: "D.R. Marche"},
		{name: "D.R. Molise", value: "D.R. Molise"},
		{name: "D.R. Piemonte", value: "D.R. Piemonte"},
		{name: "D.R. Puglia", value: "D.R. Puglia"},
		{name: "D.R. Sardegna", value: "D.R. Sardegna"},
		{name: "D.R. Sicilia", value: "D.R. Sicilia"},
		{name: "D.R. Toscana", value: "D.R. Toscana"},
		{name: "D.R. Trentino", value: "D.R. Trentino"},
		{name: "D.R. Umbria", value: "D.R. Umbria"},
		{name: "D.R. Valle d'Aosta", value: "D.R. Valle d'Aosta"},
		{name: "D.R. Veneto", value: "D.R. Veneto"},
		{name: "D.P. Bolzano", value: "D.P. Bolzano"},
		{name: "D.P. Trento", value: "D.P. Trento"},
		{name: "Avvocatura Generale", value: "Avvocatura Generale"},
		{name: "Casellario Centrale Infortuni", value: "Casellario Centrale Infortuni"},
		{name: "Centro protesi Vigorso di Budrio", value: "Centro protesi Vigorso di Budrio"},
		{name: "Comitato pari opportunità", value: "Comitato pari opportunità"},
		{name: "Comitato per il mobbing", value: "Comitato per il mobbing"},
		{name: "Consulenza per l'innovazione tecnologica", value: "Consulenza per l'innovazione tecnologica"},
		{name: "Consulenza statistico attuariale", value: "Consulenza statistico attuariale"},
		{name: "Consulenza tecnica rischi e prevenzione", value: "Consulenza tecnica rischi e prevenzione"},
		{name: "Consulenza tecnica per l'edilizia", value: "Consulenza tecnica per l'edilizia"},
		{name: "Settore Navigazione", value: "Settore Navigazione"},
		{name: "Settore Ricerca, Certificazione e Verifica", value: "Settore Ricerca, Certificazione e Verifica"},
		{name: "Servizio Comunicazione", value: "Servizio Comunicazione"},
		{name: "Servizio Ispettorato", value: "Servizio Ispettorato"},
		{name: "Servizio Formazione", value: "Servizio Formazione"},
		{name: "Sovrintendenza Medica Generale", value: "Sovrintendenza Medica Generale"},
		{name: "S.T.A.S.C.I.V.", value: "S.T.A.S.C.I.V."},
		{name: "Ufficio Stampa", value: "Ufficio Stampa"},
		{name: "Ufficio rapporti assicurativi extranazionali", value: "Ufficio rapporti assicurativi extranazionali"}
	]);
	
	self.getTokenOk=function(){
		self.disableSovvenzioni(false);
		formToken = self.token();

		var optionsImpresa = 
		{ 
			dataType: 'json',
			beforeSubmit: function() {
				
				/*
				showMessageSovv4("fail",IMPRESA_PROV_FILE_REQUIRED);
				showMessageSovv4("fail",IMPRESA_PROG_FILE_REQUIRED);
				showMessageSovv4("fail",IMPRESA_REVO_FILE_REQUIRED);
				
				ko_form_impresa_prog_numero_protocollo
				
				ko_form_impresa_prov_nome
				ko_form_impresa_prov_file
				ko_form_impresa_prov_link
				ko_form_impresa_prov_file_url
				
				ko_form_impresa_prog_link
				
				ko_form_impresa_revo_link
				*/
				
				//controlli provvedimento
				if( $(".ko_form_impresa_prov_file_url").attr("href")=="" && $(".ko_form_impresa_prov_file").val()=="" && $(".ko_form_impresa_prov_link").val() == "" )  {
							showMessageSovv4("fail",DATI_PROV_OBBLIG);
							return false;
				}
				if(	self.formImpresaOperazione() != "MOD" ){	
					if  ( $(".ko_form_impresa_prov_file").val() !=""  && $(".ko_form_impresa_prov_link").val() != "" )  
					{
						showMessageSovv4("fail",DATI_PROV_OBBLIG);
							self.formImpresaProvFile("");
							return false;
					}
				}
				else{//caso modifica
					if ($(".ko_form_impresa_prov_file_url").attr("href")!=""  &&  
						($(".ko_form_impresa_prov_file").val() !=""  || $(".ko_form_impresa_prov_link").val() != "")  )
					{
						showMessageSovv4("fail",DATI_PROV_OBBLIG);
							self.formImpresaProvFile("");
							self.formImpresaProvLink("");
						return false;
					}
					
					
					
				}
				if (    ( $(".ko_form_impresa_prov_file_url").attr("href")!=""  &&    $(".ko_form_impresa_prov_link").val() !=""  ) || 
					( $(".ko_form_impresa_prov_link").val() !="" &&  $(".ko_form_impresa_prov_file").val() !="")  ||  
					( $(".ko_form_impresa_prov_file_url").attr("href")!="" && $(".ko_form_impresa_prov_file").val() !="")   
						){
							self.formImpresaProgFile("");
							showMessageSovv4("fail",ALLEGATO_LINK_PROV);
								//self.formImpresaProgLink("");
							return false;
						}
					
				
				var esitoProg = true;
				//controlli progetto
				if(	self.formImpresaOperazione() != "MOD" ){	
						if(  $(".ko_form_impresa_prog_file").val() != "" ||
							$(".ko_form_impresa_prog_link").val() != ""  || $(".ko_form_impresa_prog_nome").val() != ""	)  {
								
								if (  $(".ko_form_impresa_prog_nome").val()!=""  )
								{
									esitoProg = true;
								}
								else{
									showMessageSovv4("fail",IMPRESA_PROG_FILE_REQUIRED);
									return false;
								}

						}
				}else{//caso modifica				
					if(    $(".ko_form_impresa_prog_file").val() != "" ||
							$(".ko_form_impresa_prog_link").val() != ""  || $(".ko_form_impresa_prog_nome").val() != ""	)  {
								
								if(   (
								
								     $(".ko_form_impresa_prog_link").val() != ""
								||   $(".ko_form_impresa_prog_file_url").attr("href") != "" 
								||   $(".ko_form_impresa_prog_file").val() != ""
								) && $(".ko_form_impresa_prog_nome").val() != ""	

								){
									
									esitoProg = true;
								}
								else{
									showMessageSovv4("fail",IMPRESA_PROG_FILE_REQUIRED);
									return false;
								}
						}
				
				}
				
				if (    ( $(".ko_form_impresa_prog_file_url").attr("href")!=""  &&    $(".ko_form_impresa_prog_link").val() !=""  ) || 
					( $(".ko_form_impresa_prog_link").val() !="" &&  $(".ko_form_impresa_prog_file").val() !="")  ||  
					( $(".ko_form_impresa_prog_file_url").attr("href")!="" && $(".ko_form_impresa_prog_file").val() !="")   
						){
							self.formImpresaProgFile("");
							showMessageSovv4("fail",ALLEGATO_LINK_PROG);
								//self.formImpresaProgLink("");
							return false;
						}
						
						//ko_form_impresa_prog_numero_protocollo    ko_form_impresa_revo_numero_protocollo
				if($(".ko_form_impresa_prog_numero_protocollo").val()!="" ){
				
					if( $(".ko_form_impresa_prog_nome").val()=="" )
					{
							showMessageSovv4("fail",DATI_PROG_PROTOCOLLO);
						return false;
					}else{
						
						if(  $(".ko_form_impresa_prog_file").val() ==""  &&  $(".ko_form_impresa_prog_link").val() =="" && $(".ko_form_impresa_prog_file_url").attr("href")=="" ) {
							showMessageSovv4("fail",DATI_PROG_PROTOCOLLO2);
						return false;
							
						}
					}
				}		
				
				if( $(".ko_form_impresa_prog_nome").val()!="" && $(".ko_form_impresa_prog_file").val()=="" 
						&& $(".ko_form_impresa_prog_link").val()==""
					    && $(".ko_form_impresa_prog_file_url").attr("href")==""	){
							showMessageSovv4("fail",DATI_PROG_NOME);
						return false;					
				}
				
				
				//controlli revoca
				var esitoRevo = true;
			
				if(	self.formImpresaOperazione() != "MOD" ){	
						if(  $(".ko_form_impresa_revo_file").val() != "" ||
							$(".ko_form_impresa_revo_link").val() != ""  || $(".ko_form_impresa_revo_nome").val() != ""	)  {
								
								if ( $(".ko_form_impresa_revo_nome").val()!=""    &&
										(  $(".ko_form_impresa_revo_file").val() != ""  ||  $(".ko_form_impresa_revo_link").val() != ""   )
								)
								{
									esitoRevo = true;
								}
								else{
									showMessageSovv4("fail",IMPRESA_REVO_FILE_REQUIRED);
									return false;
								}

						}
				}else{//caso modifica				
					if(  $(".ko_form_impresa_revo_file").val() != "" ||
							$(".ko_form_impresa_revo_link").val() != ""  || $(".ko_form_impresa_revo_atto").val() != ""
							)
							  {							
								if(   ( $(".ko_form_impresa_revo_link").val() != "" ||  $(".ko_form_impresa_revo_file").val() != "" ||
								$(".ko_form_impresa_revo_file_url").attr("href") ) && $(".ko_form_impresa_revo_atto").val() != ""
											){
									esitoRevo = true;
								}
								else{
									showMessageSovv4("fail",IMPRESA_REVO_FILE_REQUIRED);
									return false;
								}
						}
				
				if (    ( $(".ko_form_impresa_revo_file_url").attr("href")!=""  &&    $(".ko_form_impresa_revo_link").val() !=""  ) || 
					( $(".ko_form_impresa_revo_link").val() !="" &&  $(".ko_form_impresa_revo_file").val() !="")  ||  
					( $(".ko_form_impresa_revo_file_url").attr("href")!="" && $(".ko_form_impresa_revo_file").val() !="")   
						){
							self.formImpresaRevoFile("");
							showMessageSovv4("fail",ALLEGATO_LINK_REVO);
								//self.formImpresaProgLink("");
							return false;
						}
				
				
				}
								
				if($(".ko_form_impresa_revo_numero_protocollo").val()!="" ){
				
					if( $(".ko_form_impresa_revo_atto").val()=="" )
					{
							showMessageSovv4("fail",DATI_REVO_PROTOCOLLO);
						return false;
					}else{
						
						if(  $(".ko_form_impresa_revo_file").val() ==""  &&  $(".ko_form_impresa_revo_link").val() =="" && $(".ko_form_impresa_revo_file_url").attr("href")=="" ) {
							showMessageSovv4("fail",DATI_REVO_PROTOCOLLO2);
						return false;
							
						}
					}
				}		
						
				if( $(".ko_form_impresa_revo_atto").val()!="" && $(".ko_form_impresa_revo_file").val()=="" && $(".ko_form_impresa_revo_link").val()==""
				&&  $(".ko_form_impresa_revo_file_url").attr("href")=="" ){
						showMessageSovv4("fail",DATI_REVO_NOME);
						return false;				
				}	
					
				if (!(/^[0-9]*$/.test($(".ko_form_impresa_prov_codice_unita").val()))){
					showMessage("fail",IMPRESA_PROV_CODICE_UNITA_NUMBER);
					return false;
				}

				if (
					$(".ko_form_impresa_prov_importo_ammesso").val() != "" &&
					//!(/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test($(".ko_form_impresa_prov_importo_ammesso").val()))
					//!(/(^\d{1,3}(\.?\d{3})*(,\d{2})?$)|(^\d{1,3}(,?\d{3})*(\.\d{2})?$)/.test($(".ko_form_impresa_prov_importo_ammesso").val()))
					//^\d+([\,]\d{1,2})?$
					!(/^[1-9][0-9]{0,2}(?:\.?[0-9]{3}){0,3}(,[0-9]{2})?$/.test($(".ko_form_impresa_prov_importo_ammesso").val().trim()))
				){
					showMessage("fail",IMPRESA_PROG_IMPORTO_AMMESSO_NUMBER);
					return false;
				}

				if (
					$(".ko_form_impresa_prog_importo_erogato").val()!="" &&
					!(/^[1-9][0-9]{0,2}(?:\.?[0-9]{3}){0,3}(,[0-9]{2})?$/.test($(".ko_form_impresa_prog_importo_erogato").val().trim()))
				){
					showMessage("fail",IMPRESA_PROG_IMPORTO_EROGATO_NUMBER);
					return false;
				}
				
				//VALIDAZIONE DATA 
				var dataImmessa = stringToDate($(".ko_form_impresa_prov_data").val(),'dd/MM/yyyy','/');
				//alert('data immessa '+dataImmessa);
				var oggi = new Date();
				//alert('data oggi '+oggi); 
				if ( $(".ko_form_impresa_prov_data").val()!="" && !$(".ko_form_impresa_prov_data").val().match(/^\d\d?\/\d\d?\/\d\d\d\d$/) ){
					showMessage("fail",DATE_INVALID);
					return false;
				}

				if (dataImmessa > oggi){
					showMessage("fail",DATE_INVALID2);
					return false;
				}
				
				
				//VALIDAZIONE PARTITA_IVA
				if (
					$(".ko_form_impresa_anag_dati_fiscali").val() &&
					$(".ko_form_impresa_anag_dati_fiscali").val()!="" &&
					!($(".ko_form_impresa_anag_dati_fiscali").val().length ==11)
				){
					showMessage("fail",IMPRESA_ANAG_DATI_FISCALI_NOT_VALID);
					return false;
				}

				//VALIDAZIONE CUP
				if (
					$(".ko_form_impresa_prog_cup").val()!="" &&
					$(".ko_form_impresa_prog_cup").val().length > 15
				){
					showMessage("fail",CUP_MAX_15);
					return false;
				}
				
				//VALIDAZIONE CODICE_FISCALE
 				if (
 					$(".ko_form_impresa_anag_codice_fiscale").val() &&
 					$(".ko_form_impresa_anag_codice_fiscale").val()!="" &&
 					!$(".ko_form_impresa_anag_codice_fiscale").val().match(/^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/)
 				){
 					showMessage("fail",PERSONA_ANAG_CODICE_FISCALE_NOT_VALID);
					return false;
				}
				 				
				//VALIDAZIONE link
 				if (
 					$(".ko_form_impresa_prov_link").val() &&
 					$(".ko_form_impresa_prov_link").val()!="" &&
 					!$(".ko_form_impresa_prov_link").val().match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
 				){
 					showMessage("fail",LINK_NOT_VALID_PROV);
					return false;
				}//  ko_form_impresa_prog_link  ko_form_impresa_revo_link
 				
 				//VALIDAZIONE link
 				if (
 					$(".ko_form_impresa_prog_link").val() &&
 					$(".ko_form_impresa_prog_link").val()!="" &&
 					!$(".ko_form_impresa_prog_link").val().match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
 				){
 					showMessage("fail",LINK_NOT_VALID_PROG);
					return false;
				}//  ko_form_impresa_prog_link  ko_form_impresa_revo_link
 				
 				//VALIDAZIONE link
 				if (
 					$(".ko_form_impresa_revo_link").val() &&
 					$(".ko_form_impresa_revo_link").val()!="" &&
 					!$(".ko_form_impresa_revo_link").val().match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
 				){
 					showMessage("fail",LINK_NOT_VALID_REVO);
					return false;
				}//  ko_form_impresa_prog_link  ko_form_impresa_revo_link
 				

				//VALIDAZIONE FILE IMPRESA PROVVEDIMENTO
				if (
					$(".ko_form_impresa_prov_file").val() &&
					$(".ko_form_impresa_prov_file").val()!="" &&
					!$(".ko_form_impresa_prov_file").val().match(estensioniAmmesseRegEx)
				){
					showMessage("fail",FILE_ESTENSIONE_NON_VALIDA);
					return false;
				}
				
				//VALIDAZIONE FILE PROGETTO 
				if (
					$(".ko_form_impresa_prog_file").val() &&
					$(".ko_form_impresa_prog_file").val()!="" &&
					!$(".ko_form_impresa_prog_file").val().match(estensioniAmmesseRegEx)
				){
					showMessage("fail",FILE_ESTENSIONE_NON_VALIDA);
					return false;
				}
				
				//VALIDAZIONE FILE REVOCA 
				if (
					$(".ko_form_impresa_revo_file").val() &&
					$(".ko_form_impresa_revo_file").val()!="" &&
					!$(".ko_form_impresa_revo_file").val().match(estensioniAmmesseRegEx)
				){
					showMessage("fail",FILE_ESTENSIONE_NON_VALIDA);
					return false;
				}
				//se true viene effettuato l'invio
				showLoadingAnimation();
				return true;
			},
			complete: function(xhr,status) {
				if(xhr.status > 199 && xhr.status < 300){	
					hideLoadingAnimation();
					//self.viewGestioniSovvenzioni();
					//self.loadSovvenzione();
			
					if(self.formSovvenzioneOperazione() == "ADD_IMPRESA" || self.formSovvenzioneOperazione() == "ADD_PERSONA_FISICA"){
						jQuery('#form-sovvenzione').remove();
						jQuery('h2').remove();
						showMessageSovv("OK","Operazione avvenuta con successo.");
						//self.resetFormSovvenzione();
						//self.delay(3000);
						//jQuery('#contenutoprincipale').delay(6000);
						//window.setTimeout(self.annullaOperazione(), 8000);
						
					}
					
					if(self.formImpresaOperazione() == "MOD"){
						showMessage("OK","Operazione avvenuta con successo.");
					}
					
					//jQuery('#form-sovvenzione').show();
					//var hostName = $(location).attr('hostname');
					//var protocol = $(location).attr('protocol');
										
					//window.location.href = protocol+'//'+hostName+'/cs/intranet/servizi-e-applicazioni/amministrazione/cerca-sovvenzione-amministrazione.html';
					//$(location).attr('protocol');
					//click:function() {return annullaOperazione()}
					//self.annullaOperazione();
				}else{
					
					var json_obj = JSON.parse(xhr.responseText);
						showMessage("fail",json_obj.message);
					
					//showMessage("fail");
					//self.viewGestioniSovvenzioni();
					//self.loadSovvenzione();
					hideLoadingAnimation();
				}
			},
			
		    headers: {"ADMINTRASP_TOKEN": formToken}
		}; 

		// callback del submit asincrono
		//Setto la action del form
		$('.ko_sovvenzione_form').attr("action", URL_NUOVA_SOVVENZIONE);
		//Submit asincrono
		$('.ko_sovvenzione_form').ajaxForm(optionsImpresa);		
		
	}

	self.gestioneErrore = function(xhr, textStatus) {
		if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
			showMessageUnauthorized("Gestione sovvenzioni");
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
		initToken(self,URL_SOVVENZIONE_REST + "token",self.getTokenOk, self.gestioneErrore);
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
//OGGETTO Sovvenzione
//*****************************************************************
function Sovvenzione(dataJSON){
	var self=this;
	self.tipo = ko.observable("");
	self.id = ko.observable("");
	self.ragioneSociale = ko.observable("");
	self.anno = ko.observable("");
	self.partitaIva = ko.observable("");
	self.importoAmmesso = ko.observable("");
	self.importoErogato = ko.observable("");
	self.codiceUnita = ko.observable("");
	self.ufficio = ko.observable("");
	self.cognomeFunzionario = ko.observable("");
	self.nomeFunzionario = ko.observable("");
	self.modalita = ko.observable("");
	self.norma = ko.observable("");
	self.dataProvvedimento = ko.observable("");
	self.modalita = ko.observable("");
	self.nomePersonaFisica = ko.observable("");
	self.cognomePersonaFisica = ko.observable("");
	self.codiceCaso = ko.observable("");
	self.codiceFiscale = ko.observable("");
	self.denominazioneImpresa = ko.observable("");
	self.datiFiscaliImpresa = ko.observable("");
	self.numeroProtocolloProgetto = ko.observable("");
	self.numeroProtocolloProvvedimento = ko.observable("");
	self.cup = ko.observable("");
	self.curriculum = ko.observable("");
	self.responsabileNome = ko.observable("");
	self.responsabileCognome = ko.observable("");
	//TODO
	self.nomeProvvedimento = ko.observable("");
	self.urlProvvedimento = ko.observable("");
	self.nomeFileProvvedimento = ko.observable("");
	self.linkProvvedimento = ko.observable("");
	self.nomeProgetto = ko.observable("");
	self.urlProgetto = ko.observable("");
	self.nomeFileProgetto = ko.observable("");
	self.linkProgetto = ko.observable("");
	self.nomeRevoca = ko.observable("");
	self.urlRevoca = ko.observable("");
	self.nomeFileRevoca = ko.observable("");
	self.linkRevoca = ko.observable("");
	self.nomeAttoRevoca = ko.observable("");
	self.numeroProtocolloRevoca = ko.observable("");	
	//campi aggiuntivi ricerca
	self.beneficiario = ko.observable("");
	self.datiFiscali = ko.observable("");
	self.provvedimento = ko.observable("");
	//
	self.permessi = ko.observable(new Permessi());

	self.create = function(dataJSON){
		self.id(dataJSON.id);
		self.ragioneSociale(dataJSON.ragioneSociale);
		self.anno(dataJSON.anno);
		self.partitaIva(dataJSON.partitaIva);
		if(dataJSON.importoAmmesso){
            self.importoAmmesso(dataJSON.importoAmmesso.replace(".",","));
		}		
		if(dataJSON.importoErogato){
            self.importoErogato(dataJSON.importoErogato.replace(".",","));
		}
		self.codiceUnita(dataJSON.codiceUnita);
		self.ufficio(dataJSON.ufficio);
		self.cognomeFunzionario(dataJSON.cognomeFunzionario);
		self.nomeFunzionario(dataJSON.nomeFunzionario);
		self.modalita(dataJSON.modalita);
		self.norma(dataJSON.norma);
		//self.dataProvvedimento(dataJSON.dataProvvedimento);
		//self.dataProvvedimento(moment(dataJSON.dataProvvedimento).format("DD/MM/YYYY"));		
		var dateFormat = $.datepicker.formatDate('dd/mm/yy', new Date(dataJSON.dataProvvedimento));
		self.dataProvvedimento(dateFormat);		
		
		self.modalita(dataJSON.modalita);
		self.nomePersonaFisica(dataJSON.nomePersonaFisica);
		self.cognomePersonaFisica(dataJSON.cognomePersonaFisica);
		self.codiceCaso(dataJSON.codiceCaso);
		self.codiceFiscale(dataJSON.codiceFiscale);
		self.denominazioneImpresa(dataJSON.denominazioneImpresa);
		self.datiFiscaliImpresa(dataJSON.datiFiscaliImpresa);
		self.numeroProtocolloProgetto(dataJSON.numeroProtocolloProgetto);
		self.numeroProtocolloProvvedimento(dataJSON.numeroProtocolloProvvedimento);
		self.nomeProvvedimento(dataJSON.nomeProvvedimento);
		self.urlProvvedimento(getUrlFile(dataJSON.urlProvvedimento));
		self.nomeFileProvvedimento(dataJSON.nomeFileProvvedimento);
		self.linkProvvedimento(dataJSON.linkProvvedimento);
		self.nomeProgetto(dataJSON.nomeProgetto);
		self.nomeFileProgetto(dataJSON.nomeFileProgetto);
		self.urlProgetto(getUrlFile(dataJSON.urlProgetto));
		self.linkProgetto(dataJSON.linkProgetto);
		self.nomeRevoca(dataJSON.nomeRevoca);
		self.nomeFileRevoca(dataJSON.nomeFileRevoca);
		self.urlRevoca(getUrlFile(dataJSON.urlRevoca));
		self.linkRevoca(dataJSON.linkRevoca);
		self.nomeAttoRevoca(dataJSON.nomeAttoRevoca);
		self.numeroProtocolloRevoca(dataJSON.numeroProtocolloRevoca);	
		
		self.cup(dataJSON.cup);
		self.curriculum(dataJSON.curriculum);
		
		self.responsabileNome(dataJSON.nomeFunzionario);
		self.responsabileCognome(dataJSON.cognomeFunzionario);

		//campi aggiuntivi ricerca
		self.beneficiario(dataJSON.beneficiario);
		self.datiFiscali(dataJSON.datiFiscali);
		self.provvedimento(dataJSON.provvedimento);
		
		//
		if(self.ragioneSociale() && self.ragioneSociale()!=""){
			self.tipo("impresa");
		}else{
			self.tipo("persona");
		}
		
		self.permessi().isAdd(true);
		self.permessi().isEdit(true);
		self.permessi().isDel(true);	
	}
	
	if(dataJSON){
		self.create(dataJSON);
	}
}

function getUrlLink(linkFile){
	var urlLink = linkFile;
	if(urlLink.indexOf("http") === 0){
		urlLink = "http://" + urlLink;
	}
	return urlLink;
}

function getUrlFile(idFile){
	var urlFile = "";
	if(idFile){
		urlFile = URL_RECUPERA_ALLEGATO + idFile
	}
	return urlFile;
}


function postXMLHttpRequestResponse(_successEvent, wcpResourcesSite, objSelf, jsonObj){
//	new XMLHttpRequest();
//	var request = request.open('POST', wcpResourcesSite, true);
	var request = createCORSRequest('POST', wcpResourcesSite)	
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			_successEvent(JSON.parse(request.responseText));
		}
	}
//	request.setRequestHeader("Content-length", 0);
//	request.setRequestHeader("Connection", "close");//
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.send(JSON.stringify(jsonObj));	
}

function postAjaxWithJSONPResponse(_successEvent, wcpResourcesSite, objSelf, jsonObj){
	$.ajax({
		type: 'POST',
		url: wcpResourcesSite,
		data: JSON.stringify(jsonObj),
		success: function(data) {
			 _successEvent(data);
		 },
		error: function(xhr, textStatus, errorThrown){

		},
		contentType: "application/json",
		dataType: 'jsonp'
	});	
}


function postAjaxWithJSONResponse(_successEvent, wcpResourcesSite, objSelf, jsonObj){	
	$.ajax({
		type: 'POST',
		url: wcpResourcesSite,
		data: JSON.stringify(jsonObj),
		success: function(data) {
			 _successEvent(data);
		 },
		error: function(xhr, textStatus, errorThrown){
	
		},
		contentType: "application/json",
		dataType: 'json'
	});
}

function stringToDate(_date,_format,_delimiter)
	{
	            var formatLowerCase=_format.toLowerCase();
	            var formatItems=formatLowerCase.split(_delimiter);
	            var dateItems=_date.split(_delimiter);
	            var monthIndex=formatItems.indexOf("mm");
	            var dayIndex=formatItems.indexOf("dd");
	            var yearIndex=formatItems.indexOf("yyyy");
	            var month=parseInt(dateItems[monthIndex]);
	            month-=1;
	            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
	            return formatedDate;
	}
function delay(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
   self.annullaOperazione();
}	
function showMessageSovv(type, message){ //callbackFunction
	 $("html, body").animate({scrollTop: 0}, 500);
	 
	 if(!message){
		message = "L&rsquo;operazione è stata eseguita correttamente";
		if(type && type === "fail"){
			message = "L&rsquo;operazione non è stata eseguita";
		}
	 }
		 
	 var label = "success";
	 var clas = "feedback-header";
	 if(type && type === "fail"){
		 clas = "feedback-header-error";
	 }
	 
	 var messaggioOk = "<div class='" + clas + " col-xs-12 col-sm-8 col-lg-9'><span><span class='fa fa-check white-check'></span>" + message + "</span></div>";
	 
	 //$('main').prepend(messaggioOk);
	 $('main').before(messaggioOk);
	 
	 var dotClas = "." + clas;
	 $(dotClas).delay(2000).queue(function() {
         // $(this).remove();
        $('.ko_form_sovvenzione_indietro').attr('action', urlBack);
		$('.ko_form_sovvenzione_indietro').submit();
		$(dotClas).remove();
      });
	 
	 function next(){
		
	 }
	//callbackFunction(); 
}
function showMessageSovv4(type, message){
	 $("html, body").animate({scrollTop: 0}, 500);
	 
	 if(!message){
		message = "L&rsquo;operazione è stata eseguita correttamente";
		if(type && type === "fail"){
			message = "L&rsquo;operazione non è stata eseguita";
		}
	 }
		 
	 var label = "success";
	 var clas = "feedback-header";
	 if(type && type === "fail"){
		 clas = "feedback-header-error";
	 }
	 
	 var messaggioOk = "<div class='" + clas + " col-xs-12 col-sm-8 col-lg-9'><span><span class='fa fa-check white-check'></span>" + message + "</span></div>";
	 
	 //$('main').prepend(messaggioOk);
	 $('main').before(messaggioOk);
	 
	 var dotClas = "." + clas;
	 $(dotClas).delay(4000).fadeOut("slow", function() {
		$(dotClas).remove();
	  });
}