var model;

function initPagina(){	
	BindComitato();
	RegisterComponent();
	ko.applyBindings();
}

function BindComitato(){

	//form ricerca tasti inserisci comitato
	$(".ko_comitato_form_ins_crc").dataBind({attr : {disabled : "disableBtnAddComitato"}, click : "function() {btnNew('CRC')}"});
	$(".ko_comitato_form_ins_cocopro").dataBind({attr : {disabled : "disableBtnAddComitato"}, click : "function() {btnNew('COCOPRO')}"});

	//form operazione add e  edit
	$(".ko_comitato_form_op_tipo").dataBind({value : "formOperationComitatoTipo"});
	$(".ko_comitato_form_op_regione").dataBind({value : "formOperationComitatoRegione"});
	$(".ko_comitato_form_op_provincia").dataBind({value : "formOperationComitatoProvincia"});

	//form ricerca comitati
	$(".ko_comitato_form_ricerca_tipoComitato").dataBind({value : "formRicercaComitatoTipo"});
	$(".ko_comitato_form_ricerca_regione").dataBind({value : "formRicercaComitatoRegione"});
	$(".ko_ricerca_comitato_form").dataBind({submit : "function() {search()}"});
	$(".ko_comitato_form_ricerca_reset").dataBind({click : "function() {resetFormRicerca()}"});
	
	//paginazione
	$(".ko_comitato_pagination_current_page").dataBind({value : "currentPage"});
	$(".ko_comitato_pagination_num").dataBind({value : "itemsPerPage",  event:{ change: "function() {loadPage(1)}"}});
	$(".ko_comitato_pagination").dataBind({foreach : "pages()"});
	$(".ko_comitato_pagination_li").dataBind({css : "$data.css"});
	$(".ko_comitato_pagination_a").dataBind({html : "$data.text", click : "function() {$parent.loadPage($data.text)}"});
	
	//Risultato ricerca
	$(".ko_risultato_ricerca_comitato").dataBind({visible : "comitatiList().length"});
	
	//creazione riga tabella comitati
	$(".ko_table_tbody_comitati").dataBind({foreach : "comitatiList()"});
	$(".ko_table_comitati_descrizione").dataBind({html : "descrizione"});
	$(".ko_table_comitati_regione").dataBind({html : "regione"});
	$(".ko_table_comitati_provincia").dataBind({html : "provincia"});
	$(".ko_table_comitati_coordinatore").dataBind({html : "coordinatore"});
	$(".ko_table_comitati_vice").dataBind({html : "vice"});
	$(".ko_table_comitati_telefono").dataBind({html : "telefono"});	
	$(".ko_table_comitati_fax").dataBind({html : "fax"});	
	$(".ko_table_comitati_func_edit").dataBind({click : "function() {$parent.btnModifica($data.tipoComitato(),$data.codiceRegione(),$data.codiceProvincia())}", visible : "permessi().isEdit"});
	$(".ko_table_comitati_func_del").dataBind({click : "function() {$parent.btnElimina($data.tipoComitato(),$data.codiceRegione(),$data.codiceProvincia())}", visible : "permessi().isDel"});
	
	//form inserisci/modifica comitato
	$(".ko_comitato_form_regione").dataBind({value : "formComitatoRegione", event:{ change: "function() {filterProvinceComitati()}"}});
	$(".ko_comitato_p_provincia").dataBind({visible : "formComitatoProvinciaVisible"});
	$(".ko_comitato_form_provincia").dataBind({options : "selectFormComitatoProvincia", value:"formComitatoProvinciaDescr", optionsText: "'name'", optionsValue : "'value'", attr : {disabled : "formComitatoProvinciaVisible() ? undefined : 'disabled'"}});           
	//$(".ko_comitato_form_coordinatore").dataBind({value : "formComitatoCoordinatore"});
	//$(".ko_comitato_form_vice").dataBind({value : "formComitatoVice"});
	$(".ko_comitato_form_telefono").dataBind({value : "formComitatoTelefono"});
	$(".ko_comitato_form_fax").dataBind({value : "formComitatoFax"});
	$(".ko_comitato_form_tipo").dataBind({value : "formComitatoTipo"});
	$(".ko_comitato_form_cognome1").dataBind({value : "formComitatoCognome1"});
	$(".ko_comitato_form_nome1").dataBind({value : "formComitatoNome1"});
	$(".ko_comitato_form_sesso1").dataBind({value : "formComitatoSesso1"});
	$(".ko_comitato_form_data_nascita1").dataBind({value : "formComitatoDataNascita1", click : "function() {showDatepicker('data1')}"});
	$(".ko_comitato_form_provinciaNascita1").dataBind({value : "formComitatoProvinciaNascita1", event:{ change: "function() {onChange_formComitatoProvinciaNascita1()}"}});
	$(".ko_comitato_form_provinciaNascitaDescr1").dataBind({value : "formComitatoProvinciaNascitaDescr1"});
	$(".ko_comitato_form_comuneNascita1").dataBind({options : "selectFormComitatoComuneNascita1", value:"formComitatoComuneNascita1", optionsText: "'name'", optionsValue : "'value'", event:{ change: "function() {onChange_formComitatoComuneNascita1()}"}});
	$(".ko_comitato_form_comuneNascitaDescr1").dataBind({value : "formComitatoComuneNascitaDescr1"});
	$(".ko_comitato_form_codicefiscale1").dataBind({value : "formComitatoCodiceFiscale1"});
	$(".ko_comitato_form_cognome2").dataBind({value : "formComitatoCognome2"});
	$(".ko_comitato_form_nome2").dataBind({value : "formComitatoNome2"});
	$(".ko_comitato_form_sesso2").dataBind({value : "formComitatoSesso2"});
	$(".ko_comitato_form_data_nascita2").dataBind({value : "formComitatoDataNascita2", click : "function() {showDatepicker('data2')}"});
	$(".ko_comitato_form_provinciaNascita2").dataBind({value : "formComitatoProvinciaNascita2",  event:{ change: "function() {onChange_formComitatoProvinciaNascita2()}"}});
	$(".ko_comitato_form_provinciaNascitaDescr2").dataBind({value : "formComitatoProvinciaNascitaDescr2"});
	$(".ko_comitato_form_comuneNascita2").dataBind({options : "selectFormComitatoComuneNascita2", value:"formComitatoComuneNascita2", optionsText: "'name'", optionsValue : "'value'", event:{ change: "function() {onChange_formComitatoComuneNascita2()}"}});
	$(".ko_comitato_form_comuneNascitaDescr2").dataBind({value : "formComitatoComuneNascitaDescr2"});
	$(".ko_comitato_form_codicefiscale2").dataBind({value : "formComitatoCodiceFiscale2"});	
	
	$(".ko_comitato_form_buttonReset").dataBind({click : "function() {return resetFormComitato()}"});
	$(".ko_comitato_form_buttonIndietro").dataBind({click : "function() {return annullaOperazione()}"});
	$(".ko_comitato_form").dataBind({submit : "submitComitatoForm"});
	
}	

function RegisterComponent(){
	var templateElement = document.getElementById("contenutoprincipale");
	ko.components.register('comitato', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new ComitatoViewModel(params);
				return model;
			}
		},
		template : {element : templateElement}
	});
}
