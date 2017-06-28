function BiblionWebDetailItemViewModel() {
	
	var self = this;
	
	self.loadItemById = function (){
		
		showLoadingAnimation();
	
		self.detailItem  =   ko.observable(new Item());
				
		self.system = getQueryStringParamValue('system');
		self.itemId = getQueryStringParamValue('id');
		
		var urlLoadItemById = "/rest-biblion-fe-rs-web/rest/api/biblionweb/getItemById/"+self.system+"/"+self.itemId+"/all";
		
		_successEvent = function(data){
			self.detailItem ( new Item(data) );
			hideLoadingAnimation();
		};
		
		getAjaxWithJSONPResponse(_successEvent, urlLoadItemById)
	}
	self.loadItemById();
}

function RegisterDetailItemComponent(){
	
	var templateElement = document.getElementById("item");
	
	ko.components.register('item', {
	viewModel: {
		createViewModel: function(params, componentInfo) {
			model = new BiblionWebDetailItemViewModel(params);
			return model;
		}
	},
	template : {element : templateElement}
	});	
}