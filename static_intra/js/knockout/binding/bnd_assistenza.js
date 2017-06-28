var model;

function initPagina(){	
	BindAssistenza();
	RegisterComponent();
	ko.applyBindings();
}

function RegisterComponent(){
	var templateElement = document.getElementById("contenutoprincipale");//<main>
	ko.components.register('gestioneAssistenza', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new GestioneAssistenzaViewModel(params);
model.goToLivA();
				return model;
			}
		},
		template : {element : templateElement}
	});
}

function BindAssistenza(){
//livello A
	$(".ko_div_gestione_assistenza_levA").dataBind({visible : "levelAvisible"});
	$(".ko_form_assistenza_op_ins").dataBind({click : "function() {btnNew()}", visible : "isInsAssistenza"});
	//form ricerca
	$(".ko_assistenza_search").dataBind({submit : "function() {searchAssistenzaDisp('#cercaAssistenza', '.ko_assistenza_colonna_titolo')}" });
	$(".ko_assistenza_form_searchedText").dataBind({value: "searchFormText"});
	$(".ko_assistenza_form_searchLegend").dataBind({html: "searchFormLegend"});
	$(".ko_assistenza_search_annulla").dataBind({click : "function() {btnAnnulla()}"});
	//$(".ko_assistenza_search_indietro").dataBind({click : "function() {goToLiv0()}"});
	
	//div risultati ricerca
	$(".ko_risultati_ricerca_assistenza").dataBind({visible : "assistenzaSearchList().length"});
	//creazione riga tabella
	$(".ko_assistenza_list").dataBind({foreach : "assistenzaSearchList()"});
	$(".ko_assistenza_colonna_titolo").dataBind({html : "colonna_titolo"});
	$(".ko_assistenza_colonna_descrizione").dataBind({html : "colonna_descrizione"});	
	$(".ko_assistenza_func_edit").dataBind({click : "function() {$parent.btnModifica($data)}", visible : "$parent.btnModificaVisible"});
	$(".ko_assistenza_func_del").dataBind({click : "function() {$parent.btnElimina($data)}", visible : "$parent.btnEliminaVisible"});
	
//livello B
	$(".ko_div_gestione_assistenza_levB").dataBind({visible : "levelBvisible"});
	//visibilità elementi input del form
	
	//input form
	$(".ko_assistenza_form").dataBind({submit : "submitAssistenzaForm"});
	$(".ko_assistenza_form_annulla").dataBind({click : "function() {return resetFormAssistenza()}"});
	$(".ko_assistenza_form_indietro").dataBind({click : "function() {goToLivA()}"});
	$(".ko_assistenza_form_nome").dataBind({value: "formAssistenzaNome"});
	$(".ko_assistenza_form_descrizione").dataBind({value: "formAssistenzaDes"});
	$(".ko_assistenza_form_telefono").dataBind({value: "formAssistenzaTel"});
	$(".ko_assistenza_form_email").dataBind({value: "formAssistenzaEmail"});
	$("label[for='assistenzaTecnicaLink']").dataBind({html: "formAssistenzaLabelLink() ? 'Link *' : 'Link'"});
	$(".ko_assistenza_form_link").dataBind({value: "formAssistenzaLink", attr: {required: "formAssistenzaLabelLink() ? 'required' : null"}});
	$(".ko_assistenza_form_allegatolink").dataBind({value: "formAssistenzaAllegatoLink"});
	$(".ko_assistenza_form_nascosta").dataBind({checked: "formAssistenzaNascosta"});
	$("label[for='assistenzaTecnicaLabelLink']").dataBind({html: "formAssistenzaLink() ? 'Etichetta Link *' : 'Etichetta Link'"});
	$(".ko_assistenza_form_labellink").dataBind({value: "formAssistenzaLabelLink", attr: {required: "formAssistenzaLink() ? 'required' : null"}});
}

function initPagina2(){	
	BindAssistenza2();
	RegisterComponent2();
	ko.applyBindings();
}

function RegisterComponent2(){
	var templateElement = document.getElementById("contenutoprincipale");//<main>
	ko.components.register('gestioneAssistenza', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new GestioneAssistenzaViewModel(params);
model.loadListaAssistenzaSistemistica();
				return model;
			}
		},
		template : {element : templateElement}
	});
}

function BindAssistenza2(){
	$(".ko_div_ass_sist").dataBind({visible : "assistenzaSearchList().length"});
	$(".ko_assistenza_list").dataBind({foreach : "assistenzaSearchList()"});
	$(".ko_assistenza_gestione_link_web").dataBind({html : "colonna_label", attr : {href : "colonna_allegato_link", title : "colonna_label"}});
	$(".ko_assistenza_colonna_titolo").dataBind({html : "colonna_titolo"});
	$(".ko_assistenza_colonna_descrizione").dataBind({html : "colonna_descrizione"});	
	$(".ko_assistenza_colonna_telefono").dataBind({html : "colonna_telefono"});
	$(".ko_assistenza_colonna_email").dataBind({html : "colonna_email"});	
	$(".ko_assistenza_colonna_email_HREF").dataBind({visible : "colonna_email() ? true : false" , attr : {href : "'mailto:' + colonna_email()"}});
	$(".ko_assistenza_colonna_site").dataBind({html : "colonna_label_link"});
	$(".ko_assistenza_colonna_site_href").dataBind({attr : {href : "colonna_link", title : "colonna_label_link"}});
	$(".ko_p_tel_email").dataBind({visible : "colonna_email() || colonna_telefono() ? true : false"});
	$(".ko_span_tel").dataBind({visible : "colonna_telefono() ? true : false"});
	$(".ko_p_link").dataBind({visible : "colonna_link() ? true : false"});
	$(".ko_assistenza_colonna_link").dataBind({html : "colonna_link"});
	//$(".ko_assistenza_colonna_allegato_link").dataBind({html : "colonna_allegato_link"});	
	//$(".ko_assistenza_colonna_label").dataBind({html : "colonna_label"});	
}
