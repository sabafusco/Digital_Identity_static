var model;

function initPagina(){	
	BindPreferenze();
	RegisterComponent();
	ko.applyBindings();
}

function BindPreferenze(){

//bindig pagina delle categorie - livello 1
	$(".ko_div_gestione_preferenze_lev1").dataBind({foreach : "categoryList()", visible : "level1visible"});
	$(".ko_div_gestione_preferenze_titolo").dataBind({html : "descrizione", click : "function() {$parent.goToLiv2($data)}"});
	$(".ko_div_gestione_preferenze_descrizione").dataBind({html : "descrizione"});
	$(".ko_div_gestione_preferenze_accedi").dataBind({click : "function() {$parent.goToLiv2($data)}"});

	// livello 2
	$(".ko_div_gestione_preferenze_lev2").dataBind({visible : "level2visible"});
	//$(".ko_form_prefereza_op_ins").dataBind({click : "function() {btnNew()}", attr : {disabled : "isInsPrefrenza() ? undefined : 'disabled'"}});
	$(".ko_form_prefereza_op_ins").dataBind({click : "function() {btnNew()}", visible : "isInsPrefrenza"});

	//form ricerca sovvenzioni
	$(".ko_preferenza_form_searchLegend").dataBind({html: "searchFormLegend"});
	$(".ko_preferenza_form_searchedText").dataBind({value: "searchFormText"});
	$(".ko_preferenza_search_annulla").dataBind({click : "function() {emptyFormSearch()}"});
	$(".ko_preferenza_search_indietro").dataBind({click : "function() {goToLiv1()}"});
	$(".ko_preferenza_search").dataBind({submit : "function() {searchPreferenzaDisp('#cercaPreferenza','.ko_preferenza_colonna_titolo')}" });
	//Risultato ricerca
	$(".ko_risultato_ricerca_preferenza").dataBind({visible : "preferenzeSearchList().length"});
	
	//creazione riga tabella sovvenzioni
	$(".ko_preferenza_nome_colonna_titolo").dataBind({html: "preferenzaNomeColonnaTitolo"});
	$(".ko_preferenza_nome_colonna_descrizione").dataBind({html: "preferenzaNomeColonnaDescrizione"});
	$(".ko_preferenza_list").dataBind({foreach : "preferenzeSearchList()"});
	$(".ko_preferenza_colonna_titolo").dataBind({html : "colonna_titolo"});
	$(".ko_preferenza_colonna_descrizione").dataBind({html : "colonna_descrizione"});	
	$(".ko_preferenza_func_edit").dataBind({click : "function() {$parent.btnModifica($data)}", visible : "$parent.btnModificaVisible"});
	$(".ko_preferenza_func_del").dataBind({click : "function() {$parent.btnElimina($data)}", visible : "$parent.btnEliminaVisible"});
	
	//livello 3
	$(".ko_div_gestione_preferenze_lev3").dataBind({visible : "level3visible"});
	$(".legend-form-preferenza").dataBind({html: "formPreferenzaLegend"});
	
	//visibilita' input form
	$(".ko_preferenza_form_p_label").dataBind({visible : "categorySelected().flagShowLabel()"});
 	$(".ko_preferenza_form_p_nome").dataBind({visible : "categorySelected().flagShowNome()"});
	$(".ko_preferenza_form_p_descrizione").dataBind({visible : "categorySelected().flagShowDes()"});
	$(".ko_preferenza_form_p_categoria").dataBind({visible : "categorySelected().flagShowCategoria()"});
	$(".ko_preferenza_form_p_link").dataBind({visible : "categorySelected().flagShowLink()"});
	$(".ko_preferenza_form_p_telefono").dataBind({visible : "categorySelected().flagShowTel()"});
	$(".ko_preferenza_form_p_immagine").dataBind({visible : "categorySelected().flagShowImg()"});
	$(".ko_preferenza_form_p_consenso").dataBind({visible : "categorySelected().flagShowConsenso()"});
	$(".ko_preferenza_form_p_visibilehp").dataBind({visible : "categorySelected().flagShowVisibileHp()"});
	
	//binding input form
 	$(".ko_preferenza_form_label").dataBind({value: "formPreferenzaLabel", attr : {disabled : "categorySelected().flagShowLabel() ? undefined : 'disabled'"}});
 	$(".ko_preferenza_form_nome").dataBind({value: "formPreferenzaNome", attr : {disabled : "categorySelected().flagShowNome() ? undefined : 'disabled'"}});
	$(".ko_preferenza_form_descrizione").dataBind({value: "formPreferenzaDes", attr : {disabled : "categorySelected().flagShowDes() ? undefined : 'disabled'"}});
	$(".ko_preferenza_form_link").dataBind({value: "formPreferenzaLink", attr : {disabled : "categorySelected().flagShowLink() ? undefined : 'disabled'"}});
	$(".ko_preferenza_form_telefono").dataBind({value: "formPreferenzaTel", attr : {disabled : "categorySelected().flagShowTel() ? undefined : 'disabled'"}});
	$(".ko_preferenza_form_immagine").dataBind({value: "formPreferenzaImg", attr : {disabled : "categorySelected().flagShowImg() ? undefined : 'disabled'"}});
	$(".ko_preferenza_form_categoria").dataBind({value: "formPreferenzaCategoria", attr : {disabled : "categorySelected().flagShowCategoria() ? undefined : 'disabled'"}});
	$(".ko_preferenza_form_consenso").dataBind({value: "formPreferenzaConsenso", attr : {disabled : "categorySelected().flagShowConsenso() ? undefined : 'disabled'"}});
	$(".ko_preferenza_form_nascosta").dataBind({checked: "formPreferenzaNascosta"});
	$(".ko_preferenza_form_visibilehp").dataBind({checked: "formPreferenzaVisibilehp"});
	
	$(".ko_preferenza_form_annulla").dataBind({click : "function() {return resetFormPreferenza()}"});
	$(".ko_preferenza_form_indietro").dataBind({click : "function() {goToLiv2()}"});
	$(".ko_preferenza_form").dataBind({submit : "submitPreferenzaForm"});
	
}

function RegisterComponent(){
	var templateElement = document.getElementById("contenutoprincipale");
	ko.components.register('gestionePreferenze', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new GestionePreferenzeViewModel(params);
				return model;
			}
		},
		template : {element : templateElement}
	});
}