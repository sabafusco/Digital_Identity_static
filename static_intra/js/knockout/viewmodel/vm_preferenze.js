
function GestionePreferenzeViewModel() {
	var self = this;
	
	self.preferenzaNomeColonnaTitolo=ko.observable("");
	self.preferenzaNomeColonnaDescrizione=ko.observable("");
	
	self.categoryList = ko.observableArray([]);
	self.categorySelected = ko.observable(new Category());

	self.preferenzeSearchList = ko.observableArray([]);
	self.preferenzaSelected = ko.observable(new Preferenza());

	self.searchFormLegend = ko.observable("");
	self.searchFormText = ko.observable("");

	self.formPreferenzaLegend = ko.observable("");
	self.formPreferenzaLink = ko.observable("");
	self.formPreferenzaLabel = ko.observable("");
	self.formPreferenzaNome = ko.observable("");
	self.formPreferenzaTel = ko.observable("");
	self.formPreferenzaDes = ko.observable("");
	self.formPreferenzaImg = ko.observable("");
	self.formPreferenzaCategoria = ko.observable("");
	self.formPreferenzaConsenso = ko.observable("");
	self.formPreferenzaNascosta = ko.observable(false);
	self.formPreferenzaVisibilehp = ko.observable(true);

	self.formPreferenzaOperazione = ko.observable("");

	self.isInsPrefrenza = ko.observable(false);
	self.level1visible = ko.observable(false);
	self.level2visible = ko.observable(false);
	self.level3visible = ko.observable(false);

	self.btnModificaVisible = ko.observable(true);
	self.btnEliminaVisible = ko.observable(true);
	
	self.loadListaCategory = function() {
		showLoadingAnimation();
		var categoryListTemp = ko.observableArray([]);

		var url = urlWS + "/meta/metadatapreference/category";
		_successEvent = function(data) {
			$.each(data, function(key, item) {
				var com = ko.observable(new Category(item));
				if(com().stato() == 'A'){
					categoryListTemp.push(com);
				}
			});
			self.categoryList(categoryListTemp.slice(0));
			hideLoadingAnimation();
		};

		getAjaxWithJSONResponse(_successEvent, url, self.gestioneErrore);
	}

	self.loadListaPreferenze = function() {
		showLoadingAnimation();
		var preferenzeSearchListTemp = ko.observableArray([]);
		var tagCategoria = self.categorySelected().tag();
		var url = urlWS + "/meta/metadatapreference/category/" + tagCategoria + "?adm=true";
		_successEvent = function(data) {
			$.each(data, function(key, item) {
				var com = ko.observable(new Preferenza(item));
				preferenzeSearchListTemp.push(com);
			});
			self.preferenzeSearchList(preferenzeSearchListTemp.slice(0));
			hideLoadingAnimation();
		};

		getAjaxWithJSONResponse(_successEvent, url, self.gestioneErrore);
	}

	self.setFormPreferenza = function() {
		self.formPreferenzaLink(decodeInputValue(self.preferenzaSelected().value_object().link()));
		self.formPreferenzaLabel(decodeInputValue(self.preferenzaSelected().value_object().label()));
		self.formPreferenzaNome(decodeInputValue(self.preferenzaSelected().value_object().nome()));
		self.formPreferenzaTel(decodeInputValue(self.preferenzaSelected().value_object().tel()));
		self.formPreferenzaDes(decodeInputValue(self.preferenzaSelected().value_object().des()));
		self.formPreferenzaImg(decodeInputValue(self.preferenzaSelected().value_object().img()));
		self.formPreferenzaCategoria(decodeInputValue(self.preferenzaSelected().value_object().categoria()));
		self.formPreferenzaConsenso(decodeInputValue(self.preferenzaSelected().value_object().consenso()));
self.formPreferenzaNascosta(self.preferenzaSelected().stato() == "N" ? true : false);
self.formPreferenzaVisibilehp((self.preferenzaSelected().visibile_hp()=="" || self.preferenzaSelected().visibile_hp() == "S") ? true : false);
	}

	self.resetFormPreferenza = function() {
		self.setFormPreferenza();
	}

	self.btnNew = function() {
		self.preferenzaSelected(new Preferenza());
		self.setFormPreferenza();
		self.formPreferenzaOperazione("INS");
		self.goToLiv3();
	}

	self.btnModifica = function(preferenza) {
		self.preferenzaSelected(preferenza);
		self.setFormPreferenza();
		self.formPreferenzaOperazione("EDIT");
		self.goToLiv3();
	}

	self.btnElimina = function(preferenza) {
		if (confirm("Eliminare la prefereza selezionata?")) {
			self.preferenzaSelected(preferenza);
			self.formPreferenzaOperazione("DEL");
			self.submitPreferenzaForm();
		}
	}

	self.emptyFormSearch = function() {
		self.searchFormText("");
	}

	self.searchPreferenzaDisp = function(idInput, classList) {
		var filtro = $(idInput).val();
		var trovataPreferenza=false;
		$(classList).each(function() {
			if ($(this).text().search(new RegExp(filtro, "i")) < 0) {
				$(this).parent().hide();
			} else {
				$(this).parent().show();
				trovataPreferenza=true;
			}
		});
		
		if(!trovataPreferenza){
			showMessage("fail","La ricerca non ha prodotto risultati.");
		}
	}

	self.submitPreferenzaForm = function() {
		showLoadingAnimation();
		var urlService = urlWS + "/meta/metadatapreference/";
		var operazione = self.formPreferenzaOperazione();

		if (operazione == "INS") {
			urlService = urlService + "nuovapreferenza"
			var jsonObj = {
				tagCategoria : self.categorySelected().tag(),
				stato : self.formPreferenzaNascosta() ? "N" : "A",
				visibile_hp : self.formPreferenzaVisibilehp() ? "S" : "N" ,
				sottocategoria : self.formPreferenzaCategoria() != "" ? self.formPreferenzaCategoria() : null ,
				value_object : {
					//link : self.formPreferenzaLink() != "" ? checkUrl(self.formPreferenzaLink()) : null,
					link : self.formPreferenzaLink() != "" ? self.formPreferenzaLink() : null,
					label : self.formPreferenzaLabel() != "" ? self.formPreferenzaLabel() : null,
					nome : self.formPreferenzaNome() != "" ? self.formPreferenzaNome() : null,
					tel : self.formPreferenzaTel() != "" ? self.formPreferenzaTel() : null,
					des : self.formPreferenzaDes() != "" ? self.formPreferenzaDes() : null,
					img : self.formPreferenzaImg() != "" ? self.formPreferenzaImg() : null,
					categoria : self.formPreferenzaCategoria() != "" ? self.formPreferenzaCategoria() : null,
					consenso : self.formPreferenzaConsenso() != "" ? self.formPreferenzaConsenso() : null
				}
			};
			_successEvent = function(response) {
				showMessage("OK", "Dati inseriti correttamente.");
				self.resetFormPreferenza();
				hideLoadingAnimation();
			}
		} else if (operazione == "EDIT") {
			urlService = urlService + "modificapreferenza";
			var jsonObj = {
				tagPreferenza : self.preferenzaSelected().tagPreferenza(),
				stato : self.formPreferenzaNascosta() ? "N" : "A",
				visibile_hp : self.formPreferenzaVisibilehp() ? "S" : "N" ,
				sottocategoria : self.formPreferenzaCategoria() != "" ? self.formPreferenzaCategoria() : null ,
				value_object : {
					//link : self.formPreferenzaLink() != "" ? checkUrl(self.formPreferenzaLink()) : null,
					link : self.formPreferenzaLink() != "" ? self.formPreferenzaLink() : null,
					label : self.formPreferenzaLabel() != "" ? self.formPreferenzaLabel() : null,
					nome : self.formPreferenzaNome() != "" ? self.formPreferenzaNome() : null,
					tel : self.formPreferenzaTel() != "" ? self.formPreferenzaTel() : null,
					des : self.formPreferenzaDes() != "" ? self.formPreferenzaDes() : null,
					img : self.formPreferenzaImg() != "" ? self.formPreferenzaImg() : null,
					categoria : self.formPreferenzaCategoria() != "" ? self.formPreferenzaCategoria() : null,
					consenso : self.formPreferenzaConsenso() != "" ? self.formPreferenzaConsenso() : null
				}
			};

			_successEvent = function(response) {
				showMessage("OK", "Dati modificati correttamente.");
				hideLoadingAnimation();
			}
		} else if (operazione == "DEL") {
			urlService = urlService + "eliminapreferenza";
			var jsonObj = {
				tagPreferenza : self.preferenzaSelected().tagPreferenza()
			};
			_successEvent = function(response) {
				showMessage("OK", "Dati eliminati correttamente.");
				self.loadListaPreferenze();
				hideLoadingAnimation();
			}
		}

		_errorEvent = function() {
			showMessage("fail", "L'operazione non e' andata a buon fine.");
			hideLoadingAnimation();
		}

		var jsonObj_ = JSON.stringify(jsonObj);
		
		//postAjaxWithToken(_successEvent, _errorEvent, urlService, jsonObj_, self.token());
		
		var tokenParam = new TokenHeader("ANTIFORGERYTOKEN","",urlWS+"/token");
		postAjaxWithGetToken(_successEvent, errorEventDefault, urlService, jsonObj_, tokenParam);
		
		return false;
	}

	self.goToLiv1 = function() {
		self.level1visible(true);
		self.level2visible(false);
		self.level3visible(false);

		self.emptyFormSearch();

		if (!self.categoryList().length) {
			self.loadListaCategory();
		}
	}

	self.goToLiv2 = function(categoria) {
		if (categoria) {
			self.categorySelected(categoria);
			self.preferenzaNomeColonnaTitolo(categoria.nomeColonnaTitolo());
			self.preferenzaNomeColonnaDescrizione(categoria.nomeColonnaDescrizione());
			
			if(self.categorySelected().tag() =="APPLICA_STRUMENTI"){
				self.isInsPrefrenza(false);
				self.btnEliminaVisible(false);
			}else{
				self.isInsPrefrenza(true);
				self.btnEliminaVisible(true);				
			}

		}
		self.preferenzaSelected(new Preferenza());
		self.formPreferenzaOperazione("");
		self.searchFormLegend("Cerca preferenze di tipo " + self.categorySelected().descrizione());
		// effettuare la ricerca delle preferenze
		self.loadListaPreferenze();
		// mostrare il livello 2
		self.level1visible(false);
		self.level2visible(true);
		self.level3visible(false);
	}

	self.goToLiv3 = function() {
		if (self.formPreferenzaOperazione() && self.formPreferenzaOperazione() === 'EDIT') {
			self.formPreferenzaLegend("Modifica i dati della preferenza di tipo: " + self.categorySelected().descrizione());//self.categorySelected().tag()
		} else {
			self.formPreferenzaLegend("Inserisci i dati della nuova preferenza di tipo: " + self.categorySelected().descrizione());//self.categorySelected().tag()
		}
		self.level1visible(false);
		self.level2visible(false);
		self.level3visible(true);
	}

	self.getTokenOk = function() {
		self.goToLiv1();
	}
	
	
	self.gestioneErrore = function(xhr, textStatus) {
		if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
			showMessageUnauthorized("Gestione preferenze");
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

	initToken(self, urlWS + "/token", self.getTokenOk, self.gestioneErrore);

}

function Category(dataJSON) {
	var self = this;
	self.tag = ko.observable("");
	self.descrizione = ko.observable("");
	self.stato = ko.observable("");

	self.flagShowLink = ko.observable(false);
	self.flagShowLabel = ko.observable(false);
	self.flagShowNome = ko.observable(false);
	self.flagShowTel = ko.observable(false);
	self.flagShowDes = ko.observable(false);
	self.flagShowImg = ko.observable(false);
	self.flagShowConsenso = ko.observable(false);
	self.flagShowCategoria = ko.observable(false);
	self.flagShowVisibileHp = ko.observable(false);

	self.nomeColonnaTitolo=ko.observable("");;
	self.nomeColonnaDescrizione=ko.observable("");
	
	self.create = function(dataJSON) {
		self.tag(dataJSON.tagCategoria);
		self.descrizione(dataJSON.desCategoria);
		self.stato(dataJSON.stato);

		switch (dataJSON.tagCategoria) {
		case "CRUSCOTTI":
			self.flagShowLink(true);
			self.flagShowLabel(true);
			self.flagShowDes(true);
			self.flagShowCategoria(true);
			self.nomeColonnaTitolo("Label");
			self.nomeColonnaDescrizione("Link");
			break;
		case "APPLICA_STRUMENTI":
			self.flagShowLink(true);
			self.flagShowLabel(true);
      self.flagShowVisibileHp(true);
			self.nomeColonnaTitolo("Label");
			self.nomeColonnaDescrizione("Link");
			break;
		case "ANGOLO_DIPENDENTE":
			self.flagShowLink(true);
			self.flagShowLabel(true);
			self.flagShowDes(true);
			self.flagShowCategoria(true);
			self.flagShowVisibileHp(true);
			self.nomeColonnaTitolo("Label");
			self.nomeColonnaDescrizione("Link");
			break;
		case "NUMERI_UTILI":
			self.flagShowNome(true);
			self.flagShowTel(true);
			self.nomeColonnaTitolo("Nome");
			self.nomeColonnaDescrizione("Telefono");
			break;
		case "MINISITI":
			self.flagShowLink(true);
			self.flagShowNome(true);
			self.flagShowDes(true);
			self.flagShowImg(true);
			self.nomeColonnaTitolo("Nome");
			self.nomeColonnaDescrizione("Link");
			break;
		}
	}

	if (dataJSON) {
		self.create(dataJSON);
	}
}

function Preferenza(dataJSON) {
	var self = this;
	// colonna_titolo e colonna_descrzione sono due attributi che non si
	// derivano dal JSON ma vengono costruiti per la visualizzazione
	self.colonna_titolo = ko.observable("");
	self.colonna_descrizione = ko.observable("");

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
	self.visibile_hp = ko.observable("");

	self.create = function(dataJSON) {
		self.tagCategoria(model.categorySelected().tag());
		self.value_object(new ValueObject(dataJSON.value_object));
		self.idPreferenza(dataJSON.idPreferenza);
		self.isCustom(dataJSON.isCustom);
		self.tagPreferenza(dataJSON.tagPreferenza);
		self.value(dataJSON.value);
		self.user(dataJSON.user);
		self.metadataCategory(dataJSON.metadataCategory);
		self.preferences(dataJSON.preferences);
		self.stato(dataJSON.stato);
		self.visibile_hp(dataJSON.visibile_hp);	//console.log('----------> dataJSON.visibile_hp: '+dataJSON.visibile_hp);

		switch (model.categorySelected().tag()) {
		case "CRUSCOTTI":
			self.colonna_titolo(self.value_object().label());
			self.colonna_descrizione(self.value_object().link());
			break;
		case "APPLICA_STRUMENTI":
			self.colonna_titolo(self.value_object().label());
			self.colonna_descrizione(self.value_object().link());
			break;
		case "ANGOLO_DIPENDENTE":
			self.colonna_titolo(self.value_object().label());
			self.colonna_descrizione(self.value_object().link());
			break;
		case "NUMERI_UTILI":
			self.colonna_titolo(self.value_object().nome());
			self.colonna_descrizione(self.value_object().tel());
			break;
		case "MINISITI":
			self.colonna_titolo(self.value_object().nome());
			self.colonna_descrizione(self.value_object().link());
			break;
		}
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
	self.categoria = ko.observable("");


	self.create = function(dataJSON) {
		self.link(dataJSON.link);
		self.label(dataJSON.label);
		self.nome(dataJSON.nome);
		self.tel(dataJSON.tel);
		self.des(dataJSON.des);
		self.img(dataJSON.img);
		self.consenso(dataJSON.consenso);
		self.categoria(dataJSON.categoria);
	}

	//decodifica dei valori che sono codificai lato BE
	/*
	self.create = function(dataJSON) {
		self.link(decodeInputValue(dataJSON.link));
		self.label(decodeInputValue(dataJSON.label));
		self.nome(decodeInputValue(dataJSON.nome));
		self.tel(decodeInputValue(dataJSON.tel));
		self.des(decodeInputValue(dataJSON.des));
		self.img(decodeInputValue(dataJSON.img));
		self.consenso(decodeInputValue(dataJSON.consenso));
		self.categoria(decodeInputValue(dataJSON.categoria));		
	}
	*/

	if (dataJSON) {
		self.create(dataJSON);
	}

}