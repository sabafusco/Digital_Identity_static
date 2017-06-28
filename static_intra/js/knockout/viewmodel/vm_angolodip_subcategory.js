function AngoloDipendenteViewModel() {
	var self = this;
	
	self.dipendenteSubcategorySearchList = ko.observableArray([]);
	
	self.loadListaAngolodipendenteSubcategory = function() {
		if (subcat != '') {
			showLoadingAnimation();
			var url = urlWS + subcat;
			var dipendenteSubcategorySearchListTemp = ko.observableArray([]);
			
			_successEvent = function(data) {
				$.each(data, function(key, item){
					var com = ko.observable(new ItemServizioAD(item));
					dipendenteSubcategorySearchListTemp.push(com);
				});
				self.dipendenteSubcategorySearchList(dipendenteSubcategorySearchListTemp.slice(0));
				hideLoadingAnimation();
			};
			
			//getAjaxWithJSONResponse(_successEvent, url, self.errorEvent);
			
			_completeEvent = function() {
				if (self.dipendenteSubcategorySearchList().length == 0) {
					var messNoRisultati = 'Nessun elemento trovato per la sottocategoria ';//+subcat.replace(/\_/g, ' ');
					insertMessage(messNoRisultati);
				}
			}
			getAjaxWithJSONResponseComplete(_successEvent, url, self.errorEvent, _completeEvent);
		}
	}
	
	self.errorEvent = function(xhr, textStatus) {
		if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
			showMessageUnauthorized("Gestisco la mia posizione");
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
	
	self.loadListaAngolodipendenteSubcategory();
	
}

function ItemServizioAD(dataJSON) {
	var self = this;
	self.label = ko.observable("");
	self.desc = ko.observable("");
	self.link = ko.observable("");
	
	self.create = function(dataJSON) {
		self.label(dataJSON.value_object.label);
		self.desc(dataJSON.value_object.des);
		self.link(dataJSON.value_object.link ? dataJSON.value_object.link : "#");
	}
	
	if (dataJSON) {
		self.create(dataJSON);
	}
}

insertMessage = function(mess) {
	var el = $(document.createElement('h3'));
//	el.addClass('risultatoRicerca');
	el.html(mess);
	var divCont = $('.ko_div_subcat_list');
	if (divCont != null) {
		divCont.after(el);
	}
}

