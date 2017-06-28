var model;

function initPagina(){	
	BindPage();
	RegisterComponent();
	ko.applyBindings();
}

function RegisterComponent() {
	var templateElement = document.getElementById("contenutoprincipale");//<main>
	ko.components.register('angoloDipendente', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new AngoloDipendenteViewModel(params);
				return model;
			}
		},
		template : {element : templateElement}
	});
}

function BindPage() {
	$(".ko_div_subcat_list").dataBind({visible : "dipendenteSubcategorySearchList().length", foreach : "dipendenteSubcategorySearchList()"});
	$(".ko_a_subcat_titolo").dataBind({html : "label", attr : {href : "decodeInputValue(link())", title : "label"}});
	$(".ko_p_subcat_descrizione").dataBind({html : "desc"});
	$(".ko_a_subcat_accedi").dataBind({attr : {href : "decodeInputValue(link())"}});
}

