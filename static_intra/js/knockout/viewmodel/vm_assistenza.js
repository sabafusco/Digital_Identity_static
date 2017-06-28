function GestioneAssistenzaViewModel() {
	var self = this;

	//self.categorySelected = ko.observable(new Category());
	//self.categoryList = ko.observableArray([]);
	
	self.assistenzaSelected = ko.observable(new Assistenza());
	self.formAssistenzaOperazione = ko.observable("");
	
	self.levelAvisible = ko.observable(false);
	self.levelBvisible = ko.observable(false);
	self.btnModificaVisible = ko.observable(true);
	self.btnEliminaVisible = ko.observable(true);
	self.assistenzaSearchList = ko.observableArray([]);
	self.isInsAssistenza = ko.observable(false);
	
	self.searchFormText = ko.observable("");
	self.searchFormLegend = ko.observable("");
	
	self.formAssistenzaNome = ko.observable("");
	self.formAssistenzaDes = ko.observable("");
	self.formAssistenzaTel = ko.observable("");
	self.formAssistenzaEmail = ko.observable("");
	self.formAssistenzaLink = ko.observable("");
	self.formAssistenzaAllegatoLink = ko.observable("");
	self.formAssistenzaLabel = ko.observable("");
	self.formAssistenzaLabelLink = ko.observable("");
	self.formAssistenzaNascosta = ko.observable(false);
	
	self.goToLiv0 = function() {
		self.levelAvisible(true);
		self.levelBvisible(false);
		self.emptyFormSearch();
		/*if (!self.categoryList().length) {
			self.loadListaCategory();
		}*/
	}
	
	self.goToLivA = function(categoria) {//anche senza arg vedi form insert
		/*if (categoria) {
			self.categorySelected(categoria);
		}*/
		
		self.emptyFormSearch();
		self.isInsAssistenza(true);
		
		self.assistenzaSelected = ko.observable(new Assistenza());
		self.formAssistenzaOperazione("");
		self.loadListaAssistenza();

		self.levelAvisible(true);
		self.levelBvisible(false);
	}
	
	self.goToLivB = function() {
		self.isInsAssistenza(false);
		self.levelAvisible(false);
		self.levelBvisible(true);
	}
	
	/*self.loadListaCategory = function() {
		//voglio solo quella con tagCategoria": "ASS_SISTEMISTICA"
	}*/
	
	self.loadListaAssistenza = function() {///////////////////////////////////
		showLoadingAnimation();
		var assistenzaSearchListTemp = ko.observableArray([]);
		var tagCategoria = "ASS_SISTEMISTICA";
		var url = urlWS + "/meta/metadatapreference/category/" + tagCategoria + "?adm=true";
		_successEvent = function(data) {
			$.each(data, function(key, item) {
				var com = ko.observable(new Assistenza(item));
				assistenzaSearchListTemp.push(com);
			});
			self.assistenzaSearchList(assistenzaSearchListTemp.slice(0));
			hideLoadingAnimation();
		};

		getAjaxWithJSONResponse(_successEvent, url, self.gestioneErrore);
	}
	
	self.loadListaAssistenzaSistemistica = function() {
		showLoadingAnimation();
		var assistenzaSearchListTemp = ko.observableArray([]);
		var tagCategoria = "ASS_SISTEMISTICA";
		var url = urlWS + "/meta/metadatapreference/category/" + tagCategoria;
		_successEvent = function(data) {
			$.each(data, function(key, item) {
				var com = ko.observable(new Assistenza(item));
				assistenzaSearchListTemp.push(com);
			});
			self.assistenzaSearchList(assistenzaSearchListTemp.slice(0));
			hideLoadingAnimation();
		};

		getAjaxWithJSONResponse(_successEvent, url, self.gestioneErrore);
	}
	
	self.setFormAssistenza = function() {
		self.formAssistenzaNome(decodeInputValue(self.assistenzaSelected().value_object().nome()));
		self.formAssistenzaDes(decodeInputValue(self.assistenzaSelected().value_object().des()));
		self.formAssistenzaTel(decodeInputValue(self.assistenzaSelected().value_object().tel()));
		self.formAssistenzaEmail(decodeInputValue(self.assistenzaSelected().value_object().email()));
		self.formAssistenzaLink(decodeInputValue(self.assistenzaSelected().value_object().link()));
		self.formAssistenzaAllegatoLink(decodeInputValue(self.assistenzaSelected().value_object().allegato_link()));
		self.formAssistenzaLabel(decodeInputValue(self.assistenzaSelected().value_object().label()));
		self.formAssistenzaLabelLink(decodeInputValue(self.assistenzaSelected().value_object().label_link()));
		self.formAssistenzaNascosta(self.assistenzaSelected().stato() == "N" ? true : false);
	}
	
	self.btnNew = function() {
		self.assistenzaSelected(new Assistenza());
		self.setFormAssistenza();
		self.formAssistenzaOperazione("INS");
		self.goToLivB();
	}
	
	self.btnModifica = function(assistenza) {
		self.assistenzaSelected(assistenza);
		self.setFormAssistenza();
		self.formAssistenzaOperazione("EDIT");
		self.goToLivB();
	}
	
	self.btnElimina = function(assistenza) {
		if (confirm("Eliminare la voce selezionata?")) {
			self.assistenzaSelected(assistenza);
			self.formAssistenzaOperazione("DEL");
			self.submitAssistenzaForm();
		}
	}
	
	self.btnAnnulla = function() {
		self.emptyFormSearch();
		self.searchAssistenzaDisp('#cercaAssistenza', '.ko_assistenza_colonna_titolo');
	}
	
	self.emptyFormSearch = function() {
		self.searchFormText("");
	}
	
//('#cercaAssistenza', '.ko_assistenza_colonna_titolo')	
	self.searchAssistenzaDisp = function(idInput, classList) {
		var filtro = $(idInput).val();
		var trovataAssistenza = false;
		$(classList).each(function() {
			if ($(this).text().search(new RegExp(filtro, "i")) < 0) {
				$(this).parent().hide();
			} else {
				$(this).parent().show();
				trovataAssistenza = true;
			}	
		});
		if(!trovataAssistenza){
			showMessage("fail","La ricerca non ha prodotto risultati.");
		}
	}
	
	self.submitAssistenzaForm = function() {
		showLoadingAnimation();
		
		var operazione = self.formAssistenzaOperazione();
		var urlService = urlWS + "/meta/metadatapreference/";
		var varlabel = null;
		
		if (operazione == 'INS' || operazione == 'EDIT') {
			initToken(self, urlWS + "/token", self.getTokenOk_B, self.gestioneErrore);
		} else {
			initToken(self, urlWS + "/token", self.getTokenOk_A, self.gestioneErrore);
		}
		
		if (self.formAssistenzaAllegatoLink()) varlabel = self.formAssistenzaAllegatoLink().substr(self.formAssistenzaAllegatoLink().lastIndexOf("/")+1);
		
		if (operazione == "INS") {
			urlService = urlService + "nuovapreferenza";
			var jsonObj = {
				tagCategoria : "ASS_SISTEMISTICA",
				stato : self.formAssistenzaNascosta() ? "N" : "A",
				value_object : {
					nome : self.formAssistenzaNome() != "" ? self.formAssistenzaNome() : null,
					des : self.formAssistenzaDes() != "" ? self.formAssistenzaDes() : null,
					tel : self.formAssistenzaTel() != "" ? self.formAssistenzaTel() : null,
					email : self.formAssistenzaEmail() != "" ? self.formAssistenzaEmail() : null,
					link : self.formAssistenzaLink() != "" ? self.formAssistenzaLink() : null,
					label_link : self.formAssistenzaLabelLink() != "" ? self.formAssistenzaLabelLink() : null,
					allegato_link : self.formAssistenzaAllegatoLink() != "" ? self.formAssistenzaAllegatoLink() : null,
					label : varlabel , 
					categoria : "ASS_SISTEMISTICA"
				}//self.formAssistenzaAllegatoLink()
			};
			_successEvent = function(response) {
				showMessage("OK", "Dati inseriti correttamente.");
				self.resetFormAssistenza();
				hideLoadingAnimation();
			}
		} else if (operazione == "EDIT") {
			urlService = urlService + "modificapreferenza";
			var jsonObj = {
				tagPreferenza : self.assistenzaSelected().tagPreferenza() , 
				stato : self.formAssistenzaNascosta() ? "N" : "A" , 
				value_object : {
					nome : self.formAssistenzaNome() != "" ? self.formAssistenzaNome() : null , 
					des : self.formAssistenzaDes() != "" ? self.formAssistenzaDes() : null , 
					tel : self.formAssistenzaTel() != "" ? self.formAssistenzaTel() : null , 
					email : self.formAssistenzaEmail() != "" ? self.formAssistenzaEmail() : null , 
					link : self.formAssistenzaLink() != "" ? self.formAssistenzaLink() : null,
					label_link : self.formAssistenzaLabelLink() != "" ? self.formAssistenzaLabelLink() : null,
					allegato_link : self.formAssistenzaAllegatoLink() != "" ? self.formAssistenzaAllegatoLink() : null, 
					label : varlabel , 
					categoria : "ASS_SISTEMISTICA"
				}
			};
			_successEvent = function(response) {
				showMessage("OK", "Dati modificati correttamente.");
				hideLoadingAnimation();
			}
		} else if (operazione == "DEL") {
			urlService = urlService + "eliminapreferenza";
			var jsonObj = {
				tagPreferenza : self.assistenzaSelected().tagPreferenza()
			};
			_successEvent = function(response) {
				showMessage("OK", "Dati eliminati correttamente.");
				self.loadListaAssistenza();
				hideLoadingAnimation();
			}
		}
		
//		_errorEvent = function() {
//			showMessage("fail", "L'operazione non e' andata a buon fine.");
//			hideLoadingAnimation();
//		}
		
		_errorEvent = function(xhr, textStatus){
			if(xhr && xhr.status && (xhr.status=="401" || xhr.status=="403")){
				showMessage("fail", MSG_USER_UNAUTHORIZED);
			}else if(xhr && xhr.responseText && xhr.responseText!=""){
				try{
					var json_obj = JSON.parse(xhr.responseText);
					showMessage("fail", json_obj.message);

				} catch(e) {
					showMessage("fail", "L'operazione non e' andata a buon fine.");
				}
			}else{
				showMessage("fail", "L'operazione non e' andata a buon fine.");
			}
			hideLoadingAnimation();
		}
		
		

		var jsonObj_ = JSON.stringify(jsonObj);
		
		var tokenParam = new TokenHeader("ANTIFORGERYTOKEN","",urlWS+"/token");
		postAjaxWithGetToken(_successEvent, _errorEvent, urlService, jsonObj_, tokenParam);
		
		//self.assistenzaSelected(new Assistenza(jsonObj));
		return false;
	}
	
	self.resetFormAssistenza = function() {
		self.setFormAssistenza();
	}
	
	self.getTokenOk_A = function() {
		self.goToLivA();//self.goToLiv0();
	}
	
	self.getTokenOk_B = function() {
		self.goToLivB();
	}
	
	self.gestioneErrore = function(xhr, textStatus) {
		if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
			showMessageUnauthorized("Gestione assistenza");
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
	
}

function Assistenza(dataJSON) {
	var self = this;
	// colonna_titolo e colonna_descrzione sono due attributi che non si derivano dal JSON ma vengono costruiti per la visualizzazione
	self.colonna_titolo = ko.observable("");
	self.colonna_descrizione = ko.observable("");
	
	self.colonna_telefono = ko.observable("");
	self.colonna_email = ko.observable("");
	self.colonna_link = ko.observable("");
	self.colonna_label_link = ko.observable("");
	self.colonna_allegato_link = ko.observable("");
	self.colonna_label = ko.observable("");
	
	self.tagCategoria = ko.observable("");
	self.value_object = ko.observable(new ValueObject());
	self.stato = ko.observable("");
	self.ordinamento = ko.observable("");
	self.idPreferenza = ko.observable("");
	self.tagPreferenza = ko.observable("");
	
	self.create = function(dataJSON) {
		self.tagCategoria("ASS_SISTEMISTICA");
		self.value_object(new ValueObject(dataJSON.value_object));
		self.idPreferenza(dataJSON.idPreferenza);
		self.tagPreferenza(dataJSON.tagPreferenza);
		self.stato(dataJSON.stato);
		self.ordinamento(dataJSON.ordinamento);

			self.colonna_titolo(self.value_object().nome());
			self.colonna_descrizione(self.value_object().des());
			self.colonna_telefono(self.value_object().tel());
			self.colonna_email(self.value_object().email());
			self.colonna_link(self.value_object().link());
			self.colonna_label_link(self.value_object().label_link());
			self.colonna_allegato_link(self.value_object().allegato_link());
			self.colonna_label(self.value_object().label());
			
	}

	if (dataJSON) {
		self.create(dataJSON);
	}
}

function ValueObject(dataJSON) {
	var self = this;
	
	self.nome = ko.observable("");
	self.des = ko.observable("");
	self.tel = ko.observable("");
	self.email = ko.observable("");
	self.link = ko.observable("");
	self.label_link = ko.observable("");
	self.allegato_link = ko.observable("");
	self.label = ko.observable("");
	self.categoria = "ASS_SISTEMISTICA";

	self.create = function(dataJSON) {
		self.nome(dataJSON.nome);
		self.des(dataJSON.des);
		self.tel(dataJSON.tel);
		self.email(dataJSON.email);
		self.link(dataJSON.link);
		self.label_link(dataJSON.label_link);
		self.allegato_link(dataJSON.allegato_link);
		if (dataJSON.allegato_link) {
			self.label(dataJSON.allegato_link.substring(dataJSON.allegato_link.lastIndexOf("/")+1));
		} else {
			self.label("");
		}
		self.categoria = "ASS_SISTEMISTICA";
	}

	if (dataJSON) {
		self.create(dataJSON);
	}

}

/*function Category(dataJSON) {
	var self = this;
	self.tag = ko.observable("");
	self.descrizione = ko.observable("");
	self.stato = ko.observable("");

	self.create = function(dataJSON) {
		self.tag(dataJSON.tagCategoria);
		self.descrizione(dataJSON.desCategoria);
		self.stato(dataJSON.stato);
	}

	if (dataJSON) {
		self.create(dataJSON);
	}
}*/
