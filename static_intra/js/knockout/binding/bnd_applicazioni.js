var model;

function initPagina(){	
	BindPage();
	RegisterComponent();
	ko.applyBindings();
}

function RegisterComponent() {
	var templateElement = document.getElementById("contenutoprincipale");//<main>
	ko.components.register('applicazioniProcedure', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new ApplicazioniProcedureViewModel(params);
				return model;
			}
		},
		template : {element : templateElement}
	});
}

function BindPage() {
	$(".ko_form_cerca_ap").dataBind({submit : "function() { search() }"});
	$(".ko_form_cerca_ap_annulla").dataBind({click : "function() { resetForm() }"});
	$(".ko_form_cerca_ap_nome").dataBind({value : "formApplicazioniProcedureNome"});
	$(".ko_form_cerca_ap_categoria").dataBind({options : "options()", optionsText: function(item) {
		return item=="0"?"Tutte le Categorie":item }, value : "0"});
	
	$(".col-sm-12").dataBind({foreach : "applicazioniProcedureList()", visible : "applicazioniProcedureList().length"});
	$(".ko_div_ap_titolo").dataBind({html : "label", attr : {href : "link"}});

  $(".ko_categoria_link_applicazioni_procedure").dataBind({html : "$parent.stampaCategoria($data.categoria)"}); 

 
}