var index_categoria="";
function ApplicazioniProcedureViewModel() {
	var self = this;
	
	self.applicazioniProcedureList = ko.observableArray([]);
	self.applicazioniProcedureListTemp = ko.observableArray([]);
	
	self.options = ko.observableArray([]);
	self.optionsTemp = ko.observableArray([]);
	
	self.formApplicazioniProcedureNome = ko.observable("");
	self.formApplicazioniProcedureCategoria = ko.observable("");
	  
	self.stampaCategoria = function(categoria) {
 if(index_categoria==categoria())
 
 
 return "";
 else {

   index_categoria=categoria();
   return "<h3>"+categoria()+"</h3>";
 }  }
 
 
 
 
	self.loadListaApplicazioniProcedure = function() {
		showLoadingAnimation();
		var url = urlWS;
		 self.options = ko.observableArray([]);
		self.optionsTemp = ko.observableArray([]);
		self.formApplicazioniProcedureNome("");
		 self.formApplicazioniProcedureCategoria = ko.observable("0");
		_successEvent = function(data) {
      self.applicazioniProcedureListTemp = ko.observableArray([]);
			$.each(data, function(key, item){
				var com = ko.observable(new Servizio(item));
				self.applicazioniProcedureListTemp.push(com);
				self.optionsTemp.push(item.sezione);
			});			
			self.applicazioniProcedureList(self.applicazioniProcedureListTemp.slice(0));
     
     
      
        $('.ko_form_cerca_ap_categoria option[value=0]').attr('selected','selected');
			hideLoadingAnimation();
      	
		};
		
		getAjaxWithJSONResponseComplete(_successEvent, url, self.errorEvent, self.completeFunc);

	}
	
	self.errorEvent = function(xhr, textStatus) {
		if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
			showMessageUnauthorized("Applicazioni e Procedure");
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
	
	self.completeFunc = function() {
		if (self.optionsTemp().length > 0){
			for (i=0;i<self.optionsTemp().length; i++){
				if (self.options.indexOf(self.optionsTemp()[i]) == -1) {
					self.options.push(self.optionsTemp()[i]);
				}
			}
			self.options.splice(0, 0, "0");
		}
	$('.ko_form_cerca_ap_categoria option[value=0]').attr('selected','selected');
   
	};
	
				
	self.search = function() {

		showLoadingAnimation();
		var nome = self.formApplicazioniProcedureNome();
		var cat = $(".ko_form_cerca_ap_categoria").val();
		var applicazioniProcedureListFilter = ko.observableArray([]);
	
		var trovataApplicazione=false;
		
		ko.utils.arrayForEach(self.applicazioniProcedureListTemp(), function(item) {
			if (
				((cat=="0") || (item().categoria() == cat)) && 
				((nome=="") || ((item().label().toUpperCase()).indexOf(nome.toUpperCase()) != -1))
			){
				applicazioniProcedureListFilter.push(item);
				trovataApplicazione=true;
			}
		});
		
		self.applicazioniProcedureList(applicazioniProcedureListFilter.slice(0));
		hideLoadingAnimation();
		
		if(!trovataApplicazione){
			showMessage("fail","La ricerca non ha prodotto risultati.");
		}
	}
	
	self.resetForm = function() {
	
 
self.formApplicazioniProcedureNome("");
		self.formApplicazioniProcedureCategoria("0");	
  self.loadListaApplicazioniProcedure();
  self.formApplicazioniProcedureCategoria("-1");	
  	self.options.splice(0, 0, "-1");
  $('.ko_form_cerca_ap_categoria option[value=0]').attr('selected','selected');	
 document.getElementById('categoria').selectedIndex=0;
	}
	
	self.loadListaApplicazioniProcedure();
}



function Servizio(dataJSON) {
	var self = this;
	self.label = ko.observable("");
	self.categoria = ko.observable("");
	self.link = ko.observable("");
	
	self.create = function(dataJSON) {
		self.label(dataJSON.value_object.label);
		//self.categoria(dataJSON.tagPreferenza ? dataJSON.tagPreferenza : "");
		self.categoria(dataJSON.sezione ? dataJSON.sezione : "");
		//self.link(dataJSON.value_object.link);
		self.link(dataJSON.value_object.link ? dataJSON.value_object.link : "#");
	}
	
	if (dataJSON) {
		self.create(dataJSON);
	}
}
