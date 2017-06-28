/* Classe Preferenza */
function ItemHome(label,link,nome,tel,des,img,tagPreferenza,email,allegato_link,label_link,sezione) {
	var item= this;
	
	item.nome = ko.observable(nome);
	item.link = ko.observable(link);
	item.label = ko.observable(label);
	item.tel = ko.observable(tel);
	item.des = ko.observable(des);
	item.img = ko.observable(img);
	item.email = ko.observable(email);
	item.allegato_link = ko.observable(allegato_link);
	item.label_link = ko.observable(label_link);
	item.categoria = ko.observable(sezione);
	
	item.tagPreferenza = ko.observable(tagPreferenza);
	item.selected = ko.observable(false);
	
   }
function HomePrefsViewModel(params) {
	var self = this;
	
	
	/* ############################ ARRAY VISUALIZZAZIONE / EDIT  ############################# */
	
	
	self.angoloDipendente = ko.observableArray( []);
	self.angoloDipendenteEdit = ko.observableArray( []);
	self.angoloDipendenteDisp = ko.observableArray( []);
	
	self.strumenti = ko.observableArray( []);
	self.strumentiEdit = ko.observableArray( []);
	self.strumentiDisp = ko.observableArray( []);
	
	self.cruscotti = ko.observableArray( []);
	self.cruscottiEdit = ko.observableArray( []);
	self.cruscottiDisp = ko.observableArray( []);
	
	self.minisiti = ko.observableArray( []);
	self.minisitiEdit = ko.observableArray( []);
	self.minisitiDisp = ko.observableArray( []);
	
	self.numeriutili = ko.observableArray( []);
	self.numeriutiliEdit = ko.observableArray( []);
	self.numeriutiliDisp = ko.observableArray( []);
	
	self.preferiti = ko.observableArray( []);
	self.preferitiEdit = ko.observableArray( []);

	
	/* ################################# COUNTER CHECK ################################ */
	
	self.angoloDipendenteCkText = ko.observable('Applicazioni selezionate: ');
	self.angoloDipendenteCkClass = ko.observable('checkbox-counter');
	
	self.minisitiCkText = ko.observable('Applicazioni selezionate: ');
	self.minisitiCkClass = ko.observable('checkbox-counter');
	
	self.strumentiCkText = ko.observable('Applicazioni selezionate: ');
	self.strumentiCkClass = ko.observable('checkbox-counter');
	
	self.cruscottiCkText = ko.observable('Applicazioni selezionate: ');
	self.cruscottiCkClass = ko.observable('checkbox-counter');
	
	self.preferitiCkText = ko.observable('');
	self.preferitiCkClass = ko.observable('');

	self.numeriutiliCkText = ko.observable('');
	self.numeriutiliCkClass = ko.observable('');

	
	/* ################################### TOKEN ############################################ */
	
//			self.token = ko.observable("");
//
//			//set del token
//			self.setToken=function(self){
//				var _successEvent=function(data) {
//					self.token(data.token);
//				};
//				getAjaxWithJSONPResponse(_successEvent, urlToken);		
//			}
	
	
	
	/* ######################### ANGOLO DIPENDENTE ############################### */
	self.loadAngoloDipDisp = function(){

		showLoadingAnimation("#edit-angolo-dipendente-loading");

		 _successEvent = function(data){

				self.angoloDipendenteDisp.removeAll();
				self.angoloDipendenteEdit.removeAll();
				$.each(data, function(i, preferenza) {
					var value=preferenza.value_object;
					if (preferenza.visibile_hp == null || preferenza.visibile_hp == 'S'){
						var preferenzaDisp = new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza);
						
						ko.utils.arrayForEach(self.angoloDipendente(), function(item) {
							  if(item.tagPreferenza() == preferenzaDisp.tagPreferenza() ){
								  preferenzaDisp.selected(true);
								  self.addPreferToArray(preferenzaDisp, self.angoloDipendenteEdit);
							  } 
						});
	
						self.angoloDipendenteDisp.push(preferenzaDisp);
						self.angoloDipendenteCkText('Applicazioni selezionate: '+self.angoloDipendenteEdit().length);
					}
				});

				  hideLoadingAnimation("#edit-angolo-dipendente-loading");  
		} 	
		 
		 
		//getAjaxWithJSONPResponse(_successEvent, urlLoadPreferenceDISP+"ANGOLO_DIPENDENTE"); 
		 getAjaxWithJSONResponse(_successEvent, urlLoadPreferenceDISP+"ANGOLO_DIPENDENTE");
	}
	

	
	self.checkAngoloDipPref = function(preferenza){
		
			if (preferenza.selected() == false){
				self.removePreferFromArray(preferenza, self.angoloDipendenteEdit);
				self.angoloDipendenteCkText('Applicazioni selezionate: '+self.angoloDipendenteEdit().length);
				self.angoloDipendenteCkClass('checkbox-counter');
			
			} else if(self.angoloDipendenteEdit().length < numMaxApplicativi) {
				self.addPreferToArray(preferenza, self.angoloDipendenteEdit);
				self.angoloDipendenteCkText('Applicazioni selezionate:'+self.angoloDipendenteEdit().length);
				self.angoloDipendenteCkClass('checkbox-counter');
		   
			} else {
				self.angoloDipendenteCkText('Non &egrave; possibile selezionare pi&ugrave; di '+numMaxApplicativi+' applicazioni');
				self.angoloDipendenteCkClass('checkbox-counter error');
				preferenza.selected(false);
			} 
	
		return true;
	}
	

	/* ######################### STRUMENTI ############################### */
	var index_categoria = "";
	self.stampaCategoria = function(data) {
		 if(index_categoria==data.categoria())
				return "";
		 else {
				index_categoria=data.categoria();
				return "<h3>"+data.categoria()+"</h3>";
		 }  
	}
	
	self.loadStrumentiDisp = function(){
		
		showLoadingAnimation("#edit-applicativi-loading");

		 _successEvent = function(data){

				self.strumentiDisp.removeAll();
				self.strumentiEdit.removeAll();
				$.each(data, function(i, preferenza) {
					var value=preferenza.value_object;
					var preferenzaDisp = new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza, null, null, null, preferenza.sezione);
					console.log("sez--->"+preferenza.sezione);
					ko.utils.arrayForEach(self.strumenti(), function(item) {
						  if(item.tagPreferenza() == preferenzaDisp.tagPreferenza() ){
							  preferenzaDisp.selected(true);
							  self.addPreferToArray(preferenzaDisp, self.strumentiEdit);
						  } 
					});

					self.strumentiDisp.push(preferenzaDisp);
					self.strumentiCkText('Applicazioni selezionate: '+self.strumentiEdit().length);

				});

				hideLoadingAnimation("#edit-applicativi-loading"); 
		} 	
		 
		 getAjaxWithJSONResponse(_successEvent, urlLoadPreferenceDISP+"APPLICA_STRUMENTI?getall=true");
//		getAjaxWithJSONPResponse(_successEvent, urlLoadPreferenceDISP+"APPLICA_STRUMENTI"); 
	}
	

	
	self.checkStrumentiPref = function(preferenza){
		
			if (preferenza.selected() == false){
				self.removePreferFromArray(preferenza, self.strumentiEdit);
				self.strumentiCkText('Applicazioni selezionate: '+self.strumentiEdit().length);
				self.strumentiCkClass('checkbox-counter');
			} 
			else if(self.strumentiEdit().length < numMaxApplicativi) {
				self.addPreferToArray(preferenza, self.strumentiEdit);
				self.strumentiCkText('Applicazioni selezionate:'+self.strumentiEdit().length);
				self.strumentiCkClass('checkbox-counter');
		   }
			else {
				self.strumentiCkText('Non &egrave; possibile selezionare pi&ugrave; di '+numMaxApplicativi+' applicazioni');
				self.strumentiCkClass('checkbox-counter error');
				preferenza.selected(false);
			}
	
		return true;
	}
	
	/* ######################### CRUSCOTTI ############################### */
	self.loadCruscottiDisp = function(){
		
		showLoadingAnimation("#edit-cruscotti-loading");

		 _successEvent = function(data){

				self.cruscottiDisp.removeAll();
				self.cruscottiEdit.removeAll();
				$.each(data, function(i, preferenza) {
					var value=preferenza.value_object;
					var preferenzaDisp = new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza);
					
					ko.utils.arrayForEach(self.cruscotti(), function(item) {
						  if(item.tagPreferenza() == preferenzaDisp.tagPreferenza() ){
							  preferenzaDisp.selected(true);
							  self.addPreferToArray(preferenzaDisp, self.cruscottiEdit);
						  } 
					});

					self.cruscottiDisp.push(preferenzaDisp);
					self.cruscottiCkText('Applicazioni selezionate: '+self.cruscottiEdit().length);

				});

				hideLoadingAnimation("#edit-cruscotti-loading"); 
		} 	
		 
		 getAjaxWithJSONResponse(_successEvent, urlLoadPreferenceDISP+"CRUSCOTTI");
		//getAjaxWithJSONPResponse(_successEvent, urlLoadPreferenceDISP+"CRUSCOTTI"); 
	}
	

	
	self.checkCruscottiPref = function(preferenza){
		
			if (preferenza.selected() == false){
				self.removePreferFromArray(preferenza, self.cruscottiEdit);
				self.cruscottiCkText('Applicazioni selezionate: '+self.cruscottiEdit().length);
				self.cruscottiCkClass('checkbox-counter');
			} 
			else if(self.cruscottiEdit().length < numMaxApplicativi) {
				self.addPreferToArray(preferenza, self.cruscottiEdit);
				self.cruscottiCkText('Applicazioni selezionate:'+self.cruscottiEdit().length);
				self.cruscottiCkClass('checkbox-counter');
		   }
			else {
				self.cruscottiCkText('Non &egrave; possibile selezionare pi&ugrave; di '+numMaxApplicativi+' applicazioni');
				self.cruscottiCkClass('checkbox-counter error');
				preferenza.selected(false);
			}
	
		return true;
	}
	


	/* ######################### MINISITI ############################### */
	self.loadMinisitiDisp = function(){
		
		showLoadingAnimation("#edit-minisiti-loading");

		 _successEvent = function(data){

				self.minisitiDisp.removeAll();
				self.minisitiEdit.removeAll();
				$.each(data, function(i, preferenza) {
					var value=preferenza.value_object;
					var preferenzaDisp = new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza);
					
					ko.utils.arrayForEach(self.minisiti(), function(item) {
						  if(item.tagPreferenza() == preferenzaDisp.tagPreferenza() ){
							  preferenzaDisp.selected(true);
							  self.addPreferToArray(preferenzaDisp, self.minisitiEdit);
						  } 
					});

					self.minisitiDisp.push(preferenzaDisp);
					self.minisitiCkText('Applicazioni selezionate: '+self.minisitiEdit().length);

				});

				hideLoadingAnimation("#edit-minisiti-loading");
		} 	
		 
		 getAjaxWithJSONResponse(_successEvent, urlLoadPreferenceDISP+"MINISITI");
		//getAjaxWithJSONPResponse(_successEvent, urlLoadPreferenceDISP+"MINISITI"); 
	}
	

	
	self.checkMinisitiPref = function(preferenza){
		
			if (preferenza.selected() == false){
				self.removePreferFromArray(preferenza, self.minisitiEdit);
				self.minisitiCkText('Applicazioni selezionate: '+self.minisitiEdit().length);
				self.minisitiCkClass('checkbox-counter');
			} 
			else if(self.minisitiEdit().length < numMaxApplicativi) {
				self.addPreferToArray(preferenza, self.minisitiEdit);
				self.minisitiCkText('Applicazioni selezionate:'+self.minisitiEdit().length);
				self.minisitiCkClass('checkbox-counter');
			}
			else {
				self.minisitiCkText('Non &egrave; possibile selezionare pi&ugrave; di '+numMaxApplicativi+' applicazioni');
				self.minisitiCkClass('checkbox-counter error');
				preferenza.selected(false);

			}
	
		return true;
	}
	

	/* ######################### NUMERI UTILI ############################### */
	self.loadNumeriutiliDisp = function(){
		
		showLoadingAnimation("#edit-numeri-utili-loading");
		
		 _successEvent = function(data){

				self.numeriutiliDisp.removeAll();
				self.numeriutiliEdit.removeAll();
				$.each(data, function(i, preferenza) {
					var value=preferenza.value_object;
					var preferenzaDisp = new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza, value.email, value.allegato_link, value.label_link);
					
					ko.utils.arrayForEach(self.numeriutili(), function(item) {
						  if(item.tagPreferenza() == preferenzaDisp.tagPreferenza() ){
							  preferenzaDisp.selected(true);
							  self.addPreferToArray(preferenzaDisp, self.numeriutiliEdit);
						  } 
					});

					self.numeriutiliDisp.push(preferenzaDisp);
				});

				hideLoadingAnimation("#edit-numeri-utili-loading");
		} 	
		 
		 getAjaxWithJSONResponse(_successEvent, urlLoadPreferenceDISP+"ASS_SISTEMISTICA");
		//getAjaxWithJSONPResponse(_successEvent, urlLoadPreferenceDISP+"ASS_SISTEMISTICA"); 
	}
	

	
	self.checkNumeriutiliPref = function(preferenza){
		
			if (preferenza.selected() == false){
				self.removePreferFromArray(preferenza, self.numeriutiliEdit);
				self.numeriutiliCkText('');
				self.numeriutiliCkClass('');
			} 
			else if(self.numeriutiliEdit().length < numMaxNumeriUtili) {
				self.addPreferToArray(preferenza, self.numeriutiliEdit);
				self.numeriutiliCkText('');
				self.numeriutiliCkClass('');
			}  
			else {
				self.numeriutiliCkText('Non &egrave; possibile selezionare pi&ugrave; di '+numMaxNumeriUtili+' numeri');
				self.numeriutiliCkClass('checkbox-counter error');
				preferenza.selected(false);

			}
	
		return true;
	}
	

	
	/* ############# PREFERITI ################ */
	
	self.removePreferito = function(preferito){
		self.preferitiEdit.remove(preferito)
		self.preferitiCkText('');
		self.preferitiCkClass('');
	}
	
	self.addPreferito = function(){
		if(self.preferitiEdit().length  < numMaxPreferiti){
				var label =  $("#descrizione-preferito").val();
				var link =  $("#link-preferito").val();
				if(label.trim().length == 0){
					self.preferitiCkText('Inserisci descrizione');
					self.preferitiCkClass('checkbox-counter error');
				}else if(link.trim().length == 0){
					self.preferitiCkText('Inserisci indirizzo');
					self.preferitiCkClass('checkbox-counter error');
				}else{
					//link = checkUrl(link);
					self.preferitiCkText('');
					self.preferitiCkClass('');
					label = encodeInputValue(label);
					link = encodeInputValue(link);
					var preferito = new ItemHome (label, link, null, null, null, null, null)
					
					self.preferitiEdit.push(preferito)
					
					$("#descrizione-preferito").val("");
					$("#link-preferito").val("");
				}
					
		}else{
			self.preferitiCkText('Non &egrave; possibile inserire pi&ugrave; di '+numMaxPreferiti+' preferiti');
			self.preferitiCkClass('checkbox-counter error');
		}
		
	}
	
	self.loadPreferitiEdit = function(preferito){
		self.preferitiEdit.removeAll();
		self.preferitiEdit(self.preferiti.slice(0));
	}
	
	
	/* ##################### GENERICO #######################  */
	
	
	
	self.removePreferFromArray = function(preferenza, fromArray){
		fromArray.remove(preferenza)
		preferenza.selected(false);
	}
	
	self.addPreferToArray = function(preferenza, toArray){
		toArray.push(preferenza)
		preferenza.selected(true);
	}
	
	
	self.searchPreferenzaDisp = function(idInput, classList){
		var filtro = $(idInput).val();	
		$(classList ).each(function(){
			if ($(this).text().search(new RegExp(filtro, "i")) < 0) {
				$(this).fadeOut();
			} else {
				$(this).show();
			}
		});
	}
	
	self.loadPreference = function (item){
		if(item.tagCategoria == 'ANGOLO_DIPENDENTE' ){
			
					self.angoloDipendente.removeAll();
					$.each(item.preference, function(i, preferenza) {
						var value=preferenza;
						self.angoloDipendente.push(new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza));
						console.log("Ang DIP: "+preferenza.link + " -- Pref:" +preferenza.tagPreferenza);
					});
					hideLoadingAnimation("#angolo-dipendente-loading");
									
		}else if(item.tagCategoria == 'APPLICA_STRUMENTI' ){
			
					self.strumenti.removeAll();
					$.each(item.preference, function(i, preferenza) {
						var value=preferenza;
						self.strumenti.push(new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza ));
						console.log("Strumenti:  "+value.link + " --  " +value.label);
					});
					hideLoadingAnimation("#applicativi-loading");
			
// 				}else if(item.tagCategoria == 'NUMERI_UTILI' ){
			
// 							self.numeriutili.removeAll();
// 							$.each(item.preference, function(i, preferenza) {
// 								var value=preferenza;
// 								self.numeriutili.push(new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza));
// 								console.log(" NUMERI_UTILI :  "+value.nome + " --  " +value.tel);
// 							});
// 							hideLoadingAnimation("#numeri-utili-loading");
			
		}else if(item.tagCategoria == 'ASS_SISTEMISTICA' ){
			
			self.numeriutili.removeAll();
			$.each(item.preference, function(i, preferenza) {
				var value=preferenza;
				self.numeriutili.push(  new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza, value.email, value.allegato_link, value.label_link));
				console.log(" ASS_SISTEMISTICA :  "+value.nome + " --  " +value.tel);
			});
			hideLoadingAnimation("#numeri-utili-loading");
	
		}else if(item.tagCategoria == 'PREFERITI' ){
			
					self.preferiti.removeAll();
					$.each(item.preference, function(i, preferenza) {
						var value=preferenza;
						self.preferiti.push(new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza));
						console.log("Preferiti:  "+preferenza.link + " --  " +preferenza.label);
					});
					hideLoadingAnimation("#preferiti-loading");
			
		}else if(item.tagCategoria == 'MINISITI' ){
			
					self.minisiti.removeAll();
					$.each(item.preference, function(i, preferenza) {
						var value=preferenza;
						self.minisiti.push(new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img , preferenza.tagPreferenza));
						console.log("MINISITI:  "+value.img + " --  " +value.nome+" -- "+ value.des);
					});
					hideLoadingAnimation("#minisiti-loading");
		
		}else if(item.tagCategoria == 'CRUSCOTTI' ){
			
					self.cruscotti.removeAll();
					$.each(item.preference, function(i, preferenza) {
						var value=preferenza;
						self.cruscotti.push(new ItemHome (value.label, value.link, value.nome, value.tel, value.des, value.img, preferenza.tagPreferenza ));
						console.log("cruscotti:  "+value.link + " --  " +value.label);
					});
					hideLoadingAnimation("#cruscotti-loading");
	
		}
	}
	
	self.annullaPreferenza = function(categoria){
	
		if(categoria=='ANGOLO_DIPENDENTE'){
			$("#cercaApplicativiInput").val("");
			self.angoloDipendenteCkText('');
			self.angoloDipendenteCkClass('');
		}else if(categoria=='APPLICA_STRUMENTI'){
			$("#cercaApplicativiInputStr").val("");
			self.strumentiCkText('');
			self.strumentiCkClass('');
		}else if(categoria=='MINISITI'){
			$("#cercaApplicativiInputMinisiti").val("");
			self.minisitiCkText('');
			self.minisitiCkClass('');
		}else if(categoria=='CRUSCOTTI'){
			$("#cercaCruscottiInputStr").val("");
			self.cruscottiCkText('');
			self.cruscottiCkClass('');
		}else if(categoria=='NUMERI_UTILI'){
			$("#cercaNumeroInput").val("");
			self.numeriutiliCkText('');
			self.numeriutiliCkClass('');
		}else if(categoria=='PREFERITI'){
			$("#descrizione-preferito").val("");
			$("#link-preferito").val("");
			self.preferitiCkText('');
			self.preferitiCkClass('');
		}
		
	}
	
	self.savePreferenza = function(prefArray,editArray, tagCategory){
		
		var editArrayDecoded = ko.observableArray( []);
		ko.utils.arrayForEach(editArray(), function(itemPrefrenza) {			
// 					itemPrefrenza.label(decodeInputValue(itemPrefrenza.label()));
// 					itemPrefrenza.link(decodeInputValue(itemPrefrenza.link()));
// 					itemPrefrenza.nome(decodeInputValue(itemPrefrenza.nome()));
// 					itemPrefrenza.tel(decodeInputValue(itemPrefrenza.tel()));
// 					itemPrefrenza.des(decodeInputValue(itemPrefrenza.des()));
// 					itemPrefrenza.img(decodeInputValue(itemPrefrenza.img()));

					var preferenzaDisp = new ItemHome (
							decodeInputValue(itemPrefrenza.label()),
							decodeInputValue(itemPrefrenza.link()),
							decodeInputValue(itemPrefrenza.nome()),
							decodeInputValue(itemPrefrenza.tel()),
							decodeInputValue(itemPrefrenza.des()),
							decodeInputValue(itemPrefrenza.img()), 
							itemPrefrenza.tagPreferenza,
							decodeInputValue(itemPrefrenza.email()), 
							decodeInputValue(itemPrefrenza.allegato_link()),
							decodeInputValue(itemPrefrenza.label_link())
					);
					editArrayDecoded.push(preferenzaDisp);
		});

		var jsonArray = ko.toJSON(editArrayDecoded);
		
		//jsonArray=decodeInputValue(jsonArray);
		var json = '{"tagCategoria":"'+tagCategory+'", "preference" :'+ jsonArray+' }'
		
		
		_successEvent = function(){
			prefArray(editArray.slice(0));
			showMessageInElement("#homePage-prefs-ko","success","Salvataggio riuscito");
			/* hideLoadingAnimation();	 */		 
			}
		
		_errorEvent = function(xhr, textStatus){
			if(xhr && xhr.status && (xhr.status=="401" || xhr.status=="403")){
				showMessageInElement("#homePage-prefs-ko","fail",MSG_USER_UNAUTHORIZED);
			}else if(xhr && xhr.responseText && xhr.responseText!=""){
				try{
					var json_obj = JSON.parse(xhr.responseText);
					showMessageInElement("#homePage-prefs-ko","fail",json_obj.message);

				} catch(e) {
					showMessageInElement("#homePage-prefs-ko","fail","Si &egrave; verificato un errore durante il salvataggio.");
				}
			}else{
				showMessageInElement("#homePage-prefs-ko","fail","Si &egrave; verificato un errore durante il salvataggio.");
			}
			hideLoadingAnimation();
		}
		
		
		//postAjaxWithToken(_successEvent, _errorEvent, salvaPreferenza, json, self.token());
		
		var tokenParam = new TokenHeader("ANTIFORGERYTOKEN","",urlToken);
		postAjaxWithGetToken(_successEvent, _errorEvent, salvaPreferenza, json, tokenParam);
	}
	
	
	self.loadHomePrefs = function(){		
		showLoadingAnimation("#angolo-dipendente-loading");
		showLoadingAnimation("#applicativi-loading");
		showLoadingAnimation("#preferiti-loading");
		showLoadingAnimation("#minisiti-loading");
		showLoadingAnimation("#numeri-utili-loading");
		showLoadingAnimation("#cruscotti-loading");
			
		_successEvent = function(data){
			$.each(data.category, function(i, item) {
				
				self.loadPreference(item);
			});
		};
		
		//self.setToken(self);
		//getAjaxWithJSONPResponse(_successEvent, urlLoadPreference);
		getAjaxWithJSONResponse(_successEvent, urlLoadPreference);
	}
		
	self.loadHomePrefs();

	//INIZIO INTERGAZIONE ESC
	ActivityStream(params,self)
	//FINE INTERGAZIONE ESC

}


/* Registra componente angolo dipendente  */
function RegisterComponent(){
	var templateElement = document.getElementById("homePage-prefs-ko");
	ko.components.register('ko-home-prefs', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new HomePrefsViewModel(params);
				return model;
			}
		},
		template : {
			element : templateElement
		}
	});
}
