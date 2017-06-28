function BiblionWebSearchViewModel(page) {
	
	var self = this;
	
	self.buttonFiltraLabel= "filtra";
	self.buttonAnnullaLabel= "Annulla";
	
	self.anno 		= ko.observable('');
	self.autore 	= ko.observable('');
	self.titolo 	= ko.observable('');
	self.soggetto 	= ko.observable('');
	
	self.numeroItemTotali = ko.observable(0);
	self.itemsArr = ko.observableArray([new DocRicerca()]);
		
	// submit form ricerca
	self.submitRicercaAvanzata = function (){
		self.anno = $("#anno_pubblicazione").val();
		self.autore = $("#autore").val();
		self.titolo = $("#titolo").val();
		self.soggetto = $("#soggetto").val();
		initPagination(self,self.loadRisultatiRicerca);
		self.loadPage(1);
	}
	
	self.loadRisultatiRicerca = function () {
		
		showLoadingAnimation();
		
		self.limit = 10;
		self.start = 0;
		
		self.limit =  ( ( self.currentPage() * self.itemsPerPage()) )  ;
		self.start =  ( (self.currentPage()-1) * self.itemsPerPage() ) ;
		
		var url = "/rest-biblion-fe-rs-web/rest/api/biblionweb/ricercaAvanzata";
		
		url+="?system=CRD";
		url+="&start="+self.start;
		url+="&rows="+self.limit;
		
		if ( self.anno != null && self.anno !=""){
			url+="&anno="+self.anno;
		}
		
		if ( self.autore != null && self.autore !=""){
			url+="&autore="+self.autore;
		}
			
		if ( self.titolo != null && self.titolo !=""){
			url+="&titolo="+self.titolo;
		}

		if ( self.soggetto != null && self.soggetto !=""){
			url+="&soggetto="+self.soggetto;
		}
		
		console.log('loadRisultatiRicerca url '+url);
		_successEvent = function(data){
		
			self.itemsArr.removeAll();
			self.numeroItemTotali = data.numFound;
			
			console.log('numeroItemTotali '+self.numeroItemTotali );
			//paginazione
			//if(self.currentPage() == 1){
			self.numElementi(self.numeroItemTotali);
			self.numPagineMax(Math.ceil(self.numElementi() / self.itemsPerPage()));
			self.numPagineMax(Math.ceil(parseInt(self.numElementi()) / parseInt(self.itemsPerPage())));
			self.paginazioneNumber();			
			//paginazione end
			
			$.each(data.docFounded, function(i, doc) {
				self.itemsArr.push(new DocRicerca(doc));
			});
			
			hideLoadingAnimation();
		};
		
		getAjaxWithJSONPResponse(_successEvent, url);
	}
	
	// reset form ricerca
	self.resetRicercaAvanzata = function (){
		$("#anno_pubblicazione").val('');
		$("#autore").val('');
		$("#titolo").val('');
		$("#soggetto").val('');
	}
}

function RegisterSearchComponents(page){
var model;
	if ( 'ricerca' == page )
	{
		var templateElement = document.getElementById("form_ricerca");
		
		ko.components.register('form_ricerca', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new BiblionWebSearchViewModel(page,params);
				return model;
			}
		},
		template : {element : templateElement}
		});	
		 
		templateElement = document.getElementById("ricerca");
		
		ko.components.register('ricerca', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				return model;
			}
		},
		template : {element : templateElement}
		});	
	}
}