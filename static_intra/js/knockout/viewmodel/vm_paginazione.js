function initPagination(self,functionList) {
	self.itemsPerPage=ko.observable(10);
	self.pages=ko.observableArray([]);
	self.currentPage = ko.observable(1);
	self.numElementi = ko.observable(0);
	self.numPagine = ko.observable(5);
	self.numPagineMax = ko.observable(0);
	
	var searchParamsLastRequest=[];
	
	self.setSearchParams=function(key, value){
		searchParamsLastRequest[key] = value;
	}
	self.getSearchParams=function(key){
		return searchParamsLastRequest[key]!=undefined?searchParamsLastRequest[key]:"";
	}	
	
	//paginazione
	self.loadPage=function(page){
		if(page == "prima"){
			self.currentPage(1);
		}else if(page == "indietro"){
			self.currentPage(parseInt(self.currentPage())-1);
		}else if(page == "avanti"){
			self.currentPage(parseInt(self.currentPage())+1);
		}else if(page == "ultima"){
			self.currentPage(parseInt(self.numPagineMax()));
		}else if(self.currentPage() != page){
			self.currentPage(parseInt(page));
		}

		functionList();
	}
	
	self.paginazioneNumber = function ()
	{
		//se c'è una sola pagina non viene mostrata la paginazione
		
		var paginazioneNum = parseInt(self.numPagineMax()) >= parseInt(self.numPagine()) ? parseInt(self.numPagine()) : parseInt(self.numPagineMax()); 
		var position = 2;
		var paginazioneStart = parseInt(self.currentPage());
		self.pages.removeAll();

		if(paginazioneNum > 1){
			var pagText = paginazioneStart;

			if(paginazioneStart != 1){
				//self.pages.push(new Pagination("prima","first"));
				self.pages.push(new Pagination("indietro","indietro"));
				
				if((paginazioneStart+paginazioneNum-position) >= self.numPagineMax()){
					pagText = self.numPagineMax() - paginazioneNum + 1;
				}else if(paginazioneStart+position <= paginazioneNum){
					pagText = 1 ;
				}else{
					pagText = pagText - 1;
				}
			} 



			for(var i=0; i<paginazioneNum; i++){				
				var cssClass = self.currentPage() == pagText ? "active" : "";
				self.pages.push(new Pagination("" + pagText,cssClass));
				pagText++;
			}
			if(paginazioneStart != self.numPagineMax()){
				self.pages.push(new Pagination("avanti","avanti"));
				//self.pages.push(new Pagination("ultima","last"));
			}
		}
	}
	
	self.paginazioneNumberAll = function ()
	{
		//se c'è una sola pagina non viene mostrata la paginazione
		var paginazioneNum = Math.ceil(self.numElementi() / self.itemsPerPage());
		self.pages.removeAll();

		if(paginazioneNum > 1)
		{
			self.pages.push(new Pagination("prima","first"));
			self.pages.push(new Pagination("indietro","indietro"));
			for(var i=0; i<paginazioneNum; i++){
				self.pages.push(new Pagination("" + (i+1),""));
			}
			self.pages.push(new Pagination("avanti","avanti"));
			self.pages.push(new Pagination("ultima","ultima"));
		}
	}

}

function Pagination(text,css){
	var self=this;
	self.text = text;
	self.css = css;
}