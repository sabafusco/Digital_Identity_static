function BiblionWebViewModel(page) {
	
	var self = this;
	// ****** dettaglio collection *********
	
	self.colSelected=ko.observable(0);
	self.collectionItemsArr = ko.observableArray([new Item()]);
	self.collectionItemsArr.removeAll();
	
	self.numeroItemTotaliCollection = ko.observable(0);
	self.name = ko.observable("");
	self.introductoryText = ko.observable("");
	
	self.loadCollectionInfo = function (){
		showLoadingAnimation();
		self.colSelected = getQueryStringParamValue('id');
		console.log('loadCollectionInfo self.colSelected'+self.colSelected);
		
		var urlLoadCollectionInfo = "/rest-biblion-fe-rs-web/rest/api/biblionweb/getCollectionById/CRD/"+self.colSelected+"/items";
		
		_successEvent = function(data){
			
			self.numeroItemTotaliCollection = data.numberItems;
			self.name = data.name;
			self.introductoryText = data.introductoryText;
			console.log('numeroItemTotaliCollection'+self.numeroItemTotaliCollection);
			console.log('name'+self.name);
			console.log('introductoryText'+self.introductoryText);
			hideLoadingAnimation();
		};
		
		getAjaxWithJSONPResponse(_successEvent, urlLoadCollectionInfo);
		
	}
	
	self.loadItemCollectionDetail = function (){
		showLoadingAnimation();
		self.colSelected = getQueryStringParamValue('id');
		self.colNameSelected = getQueryStringParamValue('name');
		
		self.limit = 10;
		self.start = 0;
		
		self.limit =  ( ( self.currentPage() * self.itemsPerPage()) )  ;
		self.start =  ( (self.currentPage()-1) * self.itemsPerPage() ) ;
		
		console.log('loadItemCollectionDetail currentPage ' +self.currentPage()+ ' self.limit='+self.limit+' self.start='+self.start);
		
		var urlLoadItemCollectionDetail = "/rest-biblion-fe-rs-web/rest/api/biblionweb/getAllItemsByCollectionId/CRD/all/"+self.limit+"/"+self.start+"/"+self.colSelected;
		
		_successEvent = function(data){
		
			self.collectionItemsArr.removeAll();
			
			//paginazione
			//if(self.currentPage() == 1){
			self.numElementi(self.numeroItemTotaliCollection);
			self.numPagineMax(Math.ceil(self.numElementi() / self.itemsPerPage()));
			self.numPagineMax(Math.ceil(parseInt(self.numElementi()) / parseInt(self.itemsPerPage())));
			self.paginazioneNumber();			
			//paginazione end
			
			$.each(data, function(i, articolo) {
				self.collectionItemsArr.push(new Item(articolo));
			});
			hideLoadingAnimation();
		};
		
		getAjaxWithJSONPResponse(_successEvent, urlLoadItemCollectionDetail);
	}
	
	
	
	// ****** dettaglio collection *********
	
	// ****** dettaglio metadata *********
	
	self.itemSelected = ko.observable("");
	self.nameItemSelected = ko.observable("");
	self.metadataItemArr= ko.observableArray([new MetaData()]);
	
	self.loadMetadataOfItem = function (){
		showLoadingAnimation();
		self.itemSelected = getQueryStringParamValue('id');
		
		console.log('loadMetadataOfItem self.itemSelected'+self.itemSelected);
		
		var urlLoadCollectionDetail = "/rest-biblion-fe-rs-web/rest/api/biblionweb/getMetadataOfItem/CRD/"+self.itemSelected;
		
		_successEvent = function(data){
		
			self.metadataItemArr.removeAll();
		
			// metadati
			self.metadataItemArr.removeAll();
			$.each(data, function(i, metadato) {
				self.metadataItemArr.push(new MetaData(metadato));
			});
			hideLoadingAnimation();
		};
		
		getAjaxWithJSONPResponse(_successEvent, urlLoadCollectionDetail);
	}
	
	// ****** dettaglio metadata *********
	
	// INIT 
	if ( 'collection' == page )
	{	
		// chiamata info dati introduttivi collection
		self.loadCollectionInfo();
		// paginazione degli item della collection (loadItemCollectionDetail)
		initPagination(self,self.loadItemCollectionDetail);
		self.loadPage(1);
	}
	if ( 'metadata' == page )
	{	
		self.loadMetadataOfItem();
	}	
	// INIT 

}

function RegisterComponent(page){
	
	if ( 'collection' == page )
	{
		var templateElement = document.getElementById("collection");
		
		ko.components.register('collection', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new BiblionWebViewModel(page,params);
				return model;
			}
		},
		template : {element : templateElement}
		});	
	}
	
	if ( 'metadata' == page )
	{
		var templateElement = document.getElementById("metadata");
		
		ko.components.register('metadata', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new BiblionWebViewModel(page,params);
				return model;
			}
		},
		template : {element : templateElement}
		});	
	}
	
}