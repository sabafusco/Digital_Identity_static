function BiblionWebViewModel(page) {
	
	var self = this;
	
	// store top community
	self.topComunityArr = ko.observableArray([new Community()]);
	self.topComunityLoaded = 'false';
	
	self.collapseDocId = 0;
	self.topComunityArr.removeAll();
	
	// ****** home page *********
	self.loadHomePageBiblionWeb = function(){		
	
	self.topComunityLoaded = 'false';
	var urlLoadTocCom = "/rest-biblion-fe-rs-web/rest/api/biblionweb/top-community/CRD/parentCommunity";
	
	showLoadingAnimation();
	
	_successEvent = function(data){
		self.topComunityArr.removeAll();

		$.each(data, function(i, item) {
			self.loadTopComunity(item);
		});
		self.loadHomePageDocs();
		hideLoadingAnimation();
	};
	
	getAjaxWithJSONPResponse(_successEvent, urlLoadTocCom );
	}

	self.homePageDocsArr = new Array();
	self.homeItemsArr = ko.observableArray([new Item()]);
	
	self.loadHomePageDocs = function(){		
		
		var urlLoadHomeDocs = "/rest-biblion-fe-rs-web/rest/api/biblionweb/getSearchLastPublished/CRD/5";
		showLoadingAnimation();
	
		_successEvent = function(data){
		
			$.each(data.docFounded, function(i, docHome) {
				self.homePageDocsArr.push(new DocHomePage(docHome));
			});
			
			$.each(self.homePageDocsArr, function(i, item) {
				self.loadItemById(item);
			});
				
		hideLoadingAnimation();
	};
	
	getAjaxWithJSONPResponse(_successEvent, urlLoadHomeDocs );
	}
	
	self.loadItemById = function (docHome){
		
		var urlLoadItemById = "/rest-biblion-fe-rs-web/rest/api/biblionweb/getItemById/"+docHome.system()+"/"+docHome.resourceId()+"/all";
		self.homeItemsArr.removeAll();	
		
		_successEvent = function(data){
			self.homeItemsArr.push(new Item(data));
		};

		getAjaxWithJSONPResponse(_successEvent, urlLoadItemById );	
	}
	
	// ****** lista_alberatura *********

	self.loadListaAlberaturaBiblionWeb = function(){		
	
	self.topComunityLoaded = 'false';
	var urlLoadTocCom = "/rest-biblion-fe-rs-web/rest/api/biblionweb/top-community/CRD/parentCommunity";
	
	showLoadingAnimation();
	
	_successEvent = function(data){
		self.topComunityArr.removeAll();

		$.each(data, function(i, item) {
			self.loadTopComunity(item);
		});
		self.topComunityLoaded = 'true';
		hideLoadingAnimation();
	};
	
	getAjaxWithJSONPResponse(_successEvent, urlLoadTocCom ,  self.gestioneErrore);
	}
	
	
	
	self.loadTopComunity = function  (topCom){
		self.collapseDocId++;
		self.topComunityArr.push(new Community(topCom));
	}
	
	self.loadCommunityDetail = function (idTopCom){
		
		if ('false' == self.topComunityLoaded) return ;
		
		showLoadingAnimation();
	    $( "#collapse_doc"+idTopCom ).html('');
		
		var urlLoadDetTocCom = "/rest-biblion-fe-rs-web/rest/api/biblionweb/getCommunityById/CRD/all/"+idTopCom;

		_successEvent = function(data){
			
			// valorizzazione html inner dettaglio topo communities
			var html=self.loadHtmlDetailComunity(data).replace("undefined","");
			
			$( "#collapse_doc"+idTopCom ).html( html );
			hideLoadingAnimation();
		};
	
		getAjaxWithJSONPResponse(_successEvent, urlLoadDetTocCom, self.gestioneErrore);
	}
	
	self.loadHtmlDetailComunity = function(data)
	{
		var html = '';
		var treeStructureId = 'tree-structure-a'+data.id;
		
		html += '<div class="panel-group sub-panel" id="'+treeStructureId+'">';
			
			$.each(data.subcommunities, function(i, subCom) {
			
			self.subCollOfCom = subCom.subcollection;
			
			if (self.subCollOfCom==null)
				self.subCollOfComLen = 0;
			else
				self.subCollOfComLen = self.subCollOfCom.length;
			
			// se non sono presenti subCollection
			if(self.subCollOfComLen<1){
				html += '<div class="panel panel-default">';
				html += '<a href="' +listaSottoComunita+ '&id='+subCom.id+'" title="...">'+subCom.name+'</a>';
				html += '</div>'; // fine panel panel-default
			}
			else{
				// per ogni subCom creare div container dettaglio sub com
				html += '<div class="panel panel-default">';
				html += '<a data-toggle="collapse" data-parent="#'+treeStructureId+'" href="#collapse_doc_a3" class="" aria-expanded="false">';
				html += '<span>'+subCom.name+'</span></a>';
				html += '<a href="' +listaSottoComunita+ '&id='+subCom.id+'" title="...">'+subCom.name+'</a>';
				
				// e 1 div ed un ul con n li per ogni subColl
				
				html += '<div id="collapse_doc_a3" class="collapsed collapse" aria-expanded="false">';
				html += '<ul>';
				
				$.each(self.subCollOfCom, function(i, subCol) {
					html += '<li>';
					html += '<a href="'+collection+'&id='+subCol.id+'" title="...">'+subCol.name+'</a>';
					html += '</li>';
				});
				
				html += '</ul>';  // fine ul list of collections
				
				html += '</div>'; // fine panel panel-default
			}	
			// se sono presenti subCollOfCom	
		});
		
		html += '</div>';
		return html;
	}
	// ****** lista_alberatura *********
	
	// ****** dettaglio comunita *********

	self.topSottoComunityLoaded = 'false';
	self.topComSelected = 0;
	self.comNameValue = ko.observable("");
	self.comIntroductoryTextValue = ko.observable("");
	self.subComunityArr = ko.observableArray([new Community()]);
	self.subCollectionyArr = ko.observableArray([new Collection()]);
	
	self.subComunityArr.removeAll();
	self.subCollectionyArr.removeAll();
	
	self.loadSottoComunita = function (){
		
		self.topComSelected = getQueryStringParamValue('id') ;
		console.log('loadSottoComunita self.topComSelected'+self.topComSelected);
		//showLoadingAnimation();
		
		var urlLoadSottoComunita = "/rest-biblion-fe-rs-web/rest/api/biblionweb/getCommunityById/CRD/all/"+self.topComSelected;
		_successEvent = function(data){
		
			self.comNameValue(data.name) ;
			self.comIntroductoryTextValue(data.introductoryText);
		
			self.subComunityArr.removeAll();
			$.each(data.subcommunities, function(i, subCom) {
				self.subComunityArr.push(new Community(subCom));
			});
			
			self.subCollectionyArr.removeAll();
			if (data.subcollection!=null){
				$.each(data.subcollection, function(i, subCol) {
					self.subCollectionyArr.push(new Collection(subCol));
				});
			}
			hideLoadingAnimation();
		};
	
		getAjaxWithJSONPResponse(_successEvent, urlLoadSottoComunita, self.gestioneErrore);
	}
	
	// ****** dettaglio comunita *********
	
	// INIT 
	if ( 'homePageBiblionWeb' == page )
	{	
		self.loadHomePageBiblionWeb();
	}
	if ( 'lista_alberatura' == page )
	{	
		self.loadListaAlberaturaBiblionWeb();
	}	
	if ( 'lista_sotto_comunita' == page ) {
		self.loadSottoComunita();
	}
	// INIT 

}

function RegisterComponent(page){
	
	
	if ( 'homePageBiblionWeb' == page )
	{
		var templateElement = document.getElementById("homePageBiblionWeb");
		
		ko.components.register('homePageBiblionWeb', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new BiblionWebViewModel(page,params);
				return model;
			}
		},
		template : {element : templateElement}
		});
	}
	if ( 'lista_alberatura' == page )
	{
		var templateElement = document.getElementById("listaAlberaturaBiblionWeb");
		
		ko.components.register('listaAlberaturaBiblionWeb', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new BiblionWebViewModel(page,params);
				return model;
			}
		},
		template : {element : templateElement}
		});
	}
	if ( 'lista_sotto_comunita' == page ) {
		
		var templateElement = document.getElementById("listaSottoComunitaBiblionWeb");
		
		ko.components.register('listaSottoComunitaBiblionWeb', {
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
