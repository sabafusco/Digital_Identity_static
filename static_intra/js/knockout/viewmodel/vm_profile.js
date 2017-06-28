var wikicurrentletter="a";


//*****************************************************************
//VIEMODEL PRICIPALE - INIT PAGINA
//***************************************************************** 
function ProfileViewModel(params) {

  //INIZIALIZZO LE VARIABILE DEL VIEMODEL
	var allocazioniList = [];
	var self = this;
	var matricolaCorrente;
	
	self.loaded = ko.observable(false);
	self.selectAllocazioniOptions = ko.observableArray();
	
	self.profileUsername = ko.observable("");
	self.profileFlagConsensoFoto = ko.observable(false);
	self.profileNomeUtente = ko.observable("");
	self.profileEmail = ko.observable("");
	self.profilePec = ko.observable("");
	self.profileNome = ko.observable("");
	self.profileCognome = ko.observable("");
//	self.profileNumeroBreve = ko.observable("");
	self.profileImgBase64 = ko.observable("");
	self.profileCellulare = ko.observable("");
	self.profileCellularePrivato = ko.observable("");
	self.profileCellulareVisibile = ko.observable(false);
	self.profileNetFax = ko.observable("");

	self.profileStrutturaIdSelected = ko.observable("");
	self.profileStrutturaCodiceUnita = ko.observable("");
	self.profileStrutturaCodiceUfficio = ko.observable("");
	self.profileStrutturaCodiceProcesso = ko.observable("");
	self.profileStrutturaCodiceSubProcesso = ko.observable("");
	self.profileStrutturaUnita = ko.observable("");
	self.profileStrutturaUfficio = ko.observable("");
	self.profileStrutturaIncarico = ko.observable("");
	self.profileStrutturaProcesso = ko.observable("");
	self.profileStrutturaSubprocesso = ko.observable("");
	self.profileStrutturaRpvTel = ko.observable("");
	self.profileStrutturaTel = ko.observable("");
	self.profileStrutturaTel2 = ko.observable("");
	self.profileStrutturaCellulareServizio = ko.observable("");
	self.profileNumeroBreve = ko.observable("");
	self.profileStrutturaFax = ko.observable("");
	self.profileStrutturaPiano = ko.observable("");
	self.profileStrutturaStanza = ko.observable("");

	
	
//	$(document).ready(function() 
//	{ 	
		// callback del submit asincrono
		$(".ko_profile_form_modify").click(function (ev) {
			showLoadingAnimation();
		});
		

//	});
	
	//*****************************************************************
	//FUNZIONE LOAD PROFILE
	//EFFETTUA LA CHIAMATA REST PER IL CARICAMENTO DEL PROFILO
	//*****************************************************************
	self.loadProfile=function(){
		showLoadingAnimation();

		var url;
		
		//recupero foto
		url = urlRest + "personeStrutture/getFoto/" + matricolaCorrente;
		$.ajax({
			type: 'GET',
			url: url,
			//data: JSON.stringify(jsonObj),
			complete: function(xhr,status) {
				if(xhr.status > 199 && xhr.status < 300){
					self.profileImgBase64("data:image/png;base64," + xhr.responseText);
				}else{
					self.profileImgBase64("/static_intra/img/anonimo.jpg");
				}
			}
		});

		//recupero consenso foto
		url = urlRest + "personeStrutture/getPreferenceConsensoFoto/" + matricolaCorrente;
		_successEvent = function(data) {
			var preferenza = new Preferenza(data);
			self.profileFlagConsensoFoto("true" == preferenza.consenso());
		};

		getAjaxWithJSONResponse(_successEvent, url, self.gestioneErrore);
		
		
		url = urlRest + "personeStrutture/getDettaglioDipendente/" + matricolaCorrente;
		_successEvent = function( data ) {
			self.profileUsername(data.dipendente.matricola);
			self.profileNomeUtente(data.dipendente.matricola);
			self.profileEmail(data.dipendente.email);
			self.profilePec(data.dipendente.pec);
			self.profileNome(data.dipendente.nome);
			self.profileCognome(data.dipendente.cognome);			
			self.profileNetFax(data.dipendente.netfax);
			self.profileCellulare(data.dipendente.numeroCellulare);
			self.profileCellularePrivato(data.dipendente.numeroCellularePrivato);
			self.profileCellulareVisibile(data.dipendente.cellulareVisibile);
			self.profileNumeroBreve(data.dipendente.numeroBreve);
			
			if(data.allocazioni){
				var selectAllocazioniOptionsTemp=ko.observableArray([]);		
				$.each( data.allocazioni, function( key, item ){
					var allocazione = new Allocazione(item);
					var indice = allocazioniList.length;
					selectAllocazioniOptionsTemp.push(new SelectOption(item.unita + " - " + item.incarico,indice));
					allocazioniList[indice] = allocazione;
				});

				self.selectAllocazioniOptions(selectAllocazioniOptionsTemp.slice(0));
				if(allocazioniList.length>0){
					self.profileStrutturaIdSelected(0);
					self.loadAllocazione();
				}
			}
			self.loaded(true);
			hideLoadingAnimation();
		};
		
		
		 getAjaxWithJSONResponse(_successEvent, url);

		
	}

	//*****************************************************************
	//FINE - FUNZIONE LOAD PROFILE 
	//*****************************************************************


	//*****************************************************************
	//FUNZIONE LOAD ALLOCAZIONE
	//VALORIZZA I DATI DELLA LOCAZIONE HE SONO STATI INSERITI NELL'ARRAY allocazioniList
	//*****************************************************************
	self.loadAllocazione=function(){
//		showLoadingAnimation();
		if(allocazioniList.length > 0){
			var allocazione = allocazioniList[self.profileStrutturaIdSelected()];
			self.profileStrutturaIdSelected(self.profileStrutturaIdSelected());

			self.profileStrutturaCodiceUnita(allocazione.codiceUnita());
			self.profileStrutturaCodiceUfficio(allocazione.codiceUfficio());
			self.profileStrutturaCodiceProcesso(allocazione.codiceProcesso());
			self.profileStrutturaCodiceSubProcesso(allocazione.codiceSubProcesso());
			self.profileStrutturaUnita(allocazione.unita())
			self.profileStrutturaUfficio(allocazione.ufficio());
			self.profileStrutturaIncarico(allocazione.incarico());
			self.profileStrutturaProcesso(allocazione.processo());
			self.profileStrutturaSubprocesso(allocazione.subProcesso());
			self.profileStrutturaRpvTel(allocazione.rpvtel());
			self.profileStrutturaTel(allocazione.telefono());
			self.profileStrutturaTel2(allocazione.telefono2());
			self.profileStrutturaCellulareServizio(allocazione.telefono());
			//self.profileStrutturaNumeroBreve(allocazione.numeroBreve());
			self.profileStrutturaFax(allocazione.fax());
			self.profileStrutturaPiano(allocazione.piano());
			self.profileStrutturaStanza(allocazione.stanza());

		}
		
//		hideLoadingAnimation();
	}
	//*****************************************************************
	//FINE - FUNZIONE LOAD ALLOCAZIONE 
	//*****************************************************************

	self.getTokenOk=function(){
		matricolaCorrente = self.profiloToken().matricola();
		
		var options = 
		{ 
			dataType: 'json',			
			complete: function(xhr,status) {
				if(xhr.status > 199 && xhr.status < 300){
					showMessage();
					hideLoadingAnimation();
					//self.loadProfile();
				}else{
					if(xhr.responseText && xhr.responseText!=""){
						var json_obj = JSON.parse(xhr.responseText);
						showMessage("fail",json_obj.message);
					}else{
						showMessage("fail");
					}
					hideLoadingAnimation();
					self.loadProfile();
				}
			},
		    headers: {
		        "CSCPTOKEN": self.token()
		    }

		}; 

		//Setto la action del form
		$('.ko_profile_form').attr("action", urlRest + "personeStrutture/modificaProfilo/" + matricolaCorrente);
		//Submit asincrono
		$('.ko_profile_form').ajaxForm(options);

		self.loadProfile();

	}

		
	self.create = function(){
		//self.setToken();
		initProfiloToken(self,self.getTokenOk);
	}
	self.create();

  
}

//*****************************************************************
//OGGETTO Allocazione
//*****************************************************************
function Allocazione(dataJSON){
	var self=this;

	self.codiceProcesso = ko.observable("");
	self.codiceSubProcesso = ko.observable("");
	self.codiceUnita = ko.observable("");
	self.codiceUfficio = ko.observable("");
	self.fax = ko.observable("");
	self.incarico = ko.observable("");
	self.piano = ko.observable("");
	self.processo = ko.observable("");
	self.rpvtel = ko.observable("");
	self.stanza = ko.observable("");
	self.subProcesso = ko.observable("");
	self.telefono = ko.observable("");
	self.telefono2 = ko.observable("");
	self.tipoAllocazione = ko.observable("");
	self.ufficio = ko.observable("");
	self.unita = ko.observable("");
	self.numeroBreve = ko.observable("");
	
	self.create = function(dataJSON){
		self.codiceProcesso(dataJSON.codiceProcesso);
		self.codiceSubProcesso(dataJSON.codiceSubProcesso);
		self.codiceUnita(dataJSON.codiceUnita);
		self.codiceUfficio(dataJSON.codiceUfficio);
		self.fax(dataJSON.fax);
		self.incarico(dataJSON.incarico);
		self.piano(dataJSON.piano);
		self.processo(dataJSON.processo);
		self.rpvtel(dataJSON.rpvtel);
		self.stanza(dataJSON.stanza);
		self.subProcesso(dataJSON.subProcesso);
		self.telefono(dataJSON.telefono);
		self.telefono2(dataJSON.telefono2);
		self.numeroBreve(dataJSON.numeroBreve);
		self.tipoAllocazione(dataJSON.tipoAllocazione);
		self.ufficio(dataJSON.ufficio);
		self.unita(dataJSON.unita);
	}

	if(dataJSON){
		self.create(dataJSON);
	}
}
//*****************************************************************
//FINE - OGGETTO Allocazione 
//*****************************************************************

//*****************************************************************
//OGGETTO SelectOption
//*****************************************************************
function SelectOption(name,value){
	var self=this;
	self.name = name;
	self.value = value;
}
//*****************************************************************
//FINE - OGGETTO SelectOption 
//*****************************************************************


//*****************************************************************
//OGGETTO Preferenza
//*****************************************************************
function Preferenza(dataJSON) {
	var self = this;
	self.tagCategoria = ko.observable("");
	self.value_object = ko.observable(new ValueObject());
	self.idPreferenza = ko.observable("");
	self.isCustom = ko.observable("");
	self.tagPreferenza = ko.observable("");
	self.value = ko.observable("");
	self.user = ko.observable("");
	self.metadataCategory = ko.observable("");
	self.preferences = ko.observable("");
	self.stato = ko.observable("");
  self.consenso= ko.observable("");
	self.create = function(dataJSON) {
		self.value_object(new ValueObject(dataJSON.value_object));
		self.idPreferenza(dataJSON.idPreferenza);
		self.isCustom(dataJSON.isCustom);
		self.tagPreferenza(dataJSON.tagPreferenza);
		self.value(dataJSON.value);
    self.consenso(dataJSON.consenso);
		self.user(dataJSON.user);
		self.metadataCategory(dataJSON.metadataCategory);
		self.preferences(dataJSON.preferences);
		self.stato(dataJSON.stato);
	}

	if (dataJSON) {
		self.create(dataJSON);
	}
}

function ValueObject(dataJSON) {
	var self = this;
	self.link = ko.observable("");
	self.label = ko.observable("");
	self.nome = ko.observable("");
	self.tel = ko.observable("");
	self.des = ko.observable("");
	self.img = ko.observable("");
	self.consenso = ko.observable("");

	self.create = function(dataJSON) {
		self.link(dataJSON.link);
		self.label(dataJSON.label);
		self.nome(dataJSON.nome);
		self.tel(dataJSON.tel);
		self.des(dataJSON.des);
		self.img(dataJSON.img);
		self.consenso(dataJSON.consenso);
	}

	if (dataJSON) {
		self.create(dataJSON);
	}

}
//*****************************************************************
//FINE - OGGETTO SelectOption 
//*****************************************************************
