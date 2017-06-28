var model;



function initPagina(){	

	BindUtenteConsultazione();

	RegisterComponent();

	ko.applyBindings();

}

var getUrlParameter = function getUrlParameter(sParam) {

    var sPageURL = decodeURIComponent(window.location.search.substring(1)),

        sURLVariables = sPageURL.split('&'),

        sParameterName,

        i;



    for (i = 0; i < sURLVariables.length; i++) {

        sParameterName = sURLVariables[i].split('=');



        if (sParameterName[0] === sParam) {

            return sParameterName[1] === undefined ? true : sParameterName[1];

        }

    }

};

function BindUtenteConsultazione(){

	//BINDING PER DETTAGLIO UTENTE COMPRESO I DETTAGLI DI OGNI STRUTTURA IN CUI è STATO

	

	//ko_persona_titolo_detail
	
	$(".ko_error").dataBind({visible : "errore() != null && errore()!='' "});
	$(".ko_no_error").dataBind({visible : "errore() == null || errore()=='' "});
	$(".ko_error_message").dataBind({html : "errore()"});

	$(".ko_persona_titolo_detail").dataBind({html: "dipendenteDetail().cognome() + ' ' + dipendenteDetail().nome()+' - '+ dipendenteDetail().matricola()"});

	//ko_nome_utente_detail

	$(".ko_nome_utente_detail").dataBind({html: "dipendenteDetail().nome() + ' '+dipendenteDetail().cognome() + '<span class=\"sr-only\">Utente con '+ (dipendenteDetail().allocazioneDipendenteList().length)+' unit&agrave;</span>'"});

	//ko_numero_unita_sr_detail

	//$(".ko_numero_unita_sr_detail").dataBind({html: "'Utente con '+dipendenteDetail().allocazioneDipendenteList().length + 1+'unit&agrave;'"});

	//ko_matricola_detail

	$(".ko_matricola_detail").dataBind({html: "dipendenteDetail().matricola()"});

	//ko_qualifica_detail

	$(".ko_qualifica_detail").dataBind({html: "dipendenteDetail().qualifica()"});

	//ko_cellulare_detail

	$(".ko_cellulare_detail").dataBind({html: "dipendenteDetail().numeroCellulare()"});

	//ko_cellulare_privato_detail

	$(".ko_cellulare_privato_detail").dataBind({html: "dipendenteDetail().numeroCellularePrivato()"});

	//ko_numero_breve_detail

	$(".ko_numero_breve_detail").dataBind({html: "dipendenteDetail().numeroBreve()"});

	//ko_email_detail

	$(".ko_email_detail").dataBind({html: "dipendenteDetail().email()"});

	//ko_netfax_detail

	$(".ko_netfax_detail").dataBind({html: "dipendenteDetail().netfax()"});

	//ko_pec_detail

	$(".ko_pec_detail").dataBind({html: "dipendenteDetail().pec()"});

	//ko_lista_strutture_detail

	$(".ko_lista_strutture_detail").dataBind({foreach : "dipendenteDetail().allocazioneDipendenteList()"});

	//ko_citta_struttura_detail

	$(".ko_citta_struttura_detail").dataBind({html: "dettagliAllocazione().citta()",attr:{href:"dettagliAllocazione().strutturaLink()"}});

	//ko_citta_struttura_sr_detail

	$(".ko_citta_struttura_sr_detail").dataBind({html: "($index()+1)+' di '+ numTotale()"});

	

	//ko_tipo_allocazione_detail

	$(".ko_tipo_allocazione_detail").dataBind({html: "descrTipoAllocazione2()"});

	//ko_ufficio_detail

	$(".ko_ufficio_detail").dataBind({html: "ufficio()"});

	//ko_incarico_detail

	$(".ko_incarico_detail").dataBind({html: "incarico()"});

	//ko_processo_detail

	$(".ko_processo_detail").dataBind({html: "processo()"});

	//ko_sub_processo_detail

	$(".ko_sub_processo_detail").dataBind({html: "subProcesso"});

	//ko_centralino_detail

	$(".ko_centralino_detail").dataBind({html: "dettagliAllocazione().centralino()"});

	//ko_rpvTel_detail

	$(".ko_rpvTel_detail").dataBind({html: "dettagliAllocazione().rpv() +'/'+ telefono()"});

	//ko_segreteria_detail

	$(".ko_segreteria_detail").dataBind({html: "dettagliAllocazione().segreteria()"});

	//ko_telefono_2_detail

	$(".ko_telefono_2_detail").dataBind({html: "telefono2()"});

	//ko_fax_detail

	$(".ko_fax_detail").dataBind({html: "fax()"});

	//ko_indirizzo_detail

	$(".ko_indirizzo_detail").dataBind({html: "dettagliAllocazione().indirizzo()"});

	//ko_piano_detail

	$(".ko_piano_detail").dataBind({html: "piano()"});

	//ko_stanza_detail

	$(".ko_stanza_detail").dataBind({html: "stanza()"});

	//ko_patrono_detail

	$(".ko_patrono_detail").dataBind({html: "dettagliAllocazione().santoGG() +'/'+dettagliAllocazione().santoMM()"});

	//ko_barriere_detail

	$(".ko_barriere_detail").dataBind({html: "dettagliAllocazione().barriereArchitettoniche()"});

	//ko_note_detail

	$(".ko_note_detail").dataBind({html: "dettagliAllocazione().note()"});

	

	

	

	$("#annulla").dataBind({click : "function() {clearFieldsAndResults()}"});

	//form ricerca dipendente

	$(".ko_form_ricerca_dipendente").dataBind({submit : "function() {search()}"});

	

	$(".boxRisultatiRicerca").dataBind({visible : "(dipendenteList().length > 0 && !isError()) || (struttureList().length > 0 && !isError())"});

	$(".ko_risultato_utenti").dataBind({if : "dipendenteList().length > 0 && !isError()"});

	$(".ko_risultato_strutture").dataBind({if : "struttureList().length > 0 && !isError()"});

	$(".risultatoRicercaSpan").dataBind({html : "numeroRisultati"});
	$(".ko_descrizione_numero_risultati").dataBind({html : "descrizioneNumeroRisultati"});

	$(".erroreRisultatoRicerca").dataBind({html : "erroreRisultatoRicerca()"});
	$(".errorBox").dataBind({visible : "isError()"});

	
		



	//creazione riga tabella dipendente

	$(".ko_table_tbody_dipendente").dataBind({foreach : "dipendenteList()"});

	$(".ko_table_tr_dipendente").dataBind({attr : {class : "$index()%2==0 ? 'tr_odd' : 'tr_even'"
		,id : "($index() == ($data.numElementi() -1) && $data.allocazioneDipendenteList().length  == 0)  ? 'fineTabella1' : null"}});

	$(".ko_table_dipendente_nominativo").dataBind({html: "$data.cognome() + ' ' + $data.nome()",attr:{href:"$data.linkProfilo()"}});

	$(".ko_table_dipendente_nominativo_span").dataBind({text: "'Utente con '+($data.allocazioneDipendenteList().length + 1)+' risultati'"});

	$(".ko_table_dipendente_username").dataBind({html : "matricola"});

	$(".ko_table_dipendente_username_sr").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_table_dipendente_email").dataBind({html : "email",attr:{href: "'mailto:'+email()"}});

	$(".ko_table_dipendente_email_sr").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_table_first_allocazione_rpv_tel").dataBind({text: "(firstAllocazioneDipendente().rpvtel())+'/'+(firstAllocazioneDipendente().telefono())"});

	$(".ko_table_first_allocazione_rpv_tel_sr").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_table_first_tel_2").dataBind({text: "(firstAllocazioneDipendente().telefono2())"});

	$(".ko_table_first_allocazione_rpv_tel_sr_2").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_unita").dataBind({html: "firstAllocazioneDipendente().unita()",attr:{href : "firstAllocazioneDipendente().allocazioneLink"}});

	$(".ko_desc_tipo_appartenenza").dataBind({html: "firstAllocazioneDipendente().descrTipoAllocazione()"});

	$(".ko_desc_tipo_appartenenza_sr").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_ufficio").dataBind({html: "firstAllocazioneDipendente().ufficio()"});

	$(".ko_ufficio_sr").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_incarico").dataBind({html: "firstAllocazioneDipendente().incarico()"});

	$(".ko_incarico_sr").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_processo").dataBind({text: "firstAllocazioneDipendente().processo",click:"function(){searchByProcesso(firstAllocazioneDipendente().processo(),firstAllocazioneDipendente().unita())}"});

	$(".ko_processo_sr").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_sub_processo").dataBind({text: "firstAllocazioneDipendente().subProcesso",click:"function(){searchByProcesso(firstAllocazioneDipendente().subProcesso(),firstAllocazioneDipendente().unita())}"});

	$(".ko_sub_processo_sr").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_cellulare").dataBind({html: "numeroCellulare"});

	$(".ko_cellulare_sr").dataBind({text:"'1 di '+(allocazioneDipendenteList().length + 1)"});

	$(".ko_table_first_allocazione_unita").dataBind({html : "firstAllocazioneDipendente().unita()"});



	$(".ko_tbdy_strutt").dataBind({foreach : "struttureList()"});
	$(".ko_tr_strutt").dataBind({attr : {class : "$index()%2==0 ? 'tr_odd' : 'tr_even'",id : "$index()== ($data.numElementi()-1) ? 'fineTabellaStrutture' : null"}});
	$(".ko_fine_tabella_strutture_elenco").dataBind({if : "$index()== ($data.numElementi()-1)"});
	$(".ko_str_segreteria").dataBind({html : "segreteria"});
	$(".ko_str_centralino").dataBind({html : "centralino"});
	$(".ko_str_indirizzo").dataBind({html : "indirizzo"});	
	$(".ko_str_descrizione").dataBind({html : "descrizioneUnita",attr:{href:"strutturaLink"}});
	$(".ko_str_email").dataBind({html : "email",attr:{href: "'mailto:'+email()"}});
	$(".ko_str_pec").dataBind({html: "pec",attr:{href: "'mailto:'+pec()"}});
	



	

	

}	



function RegisterComponent(){

	var templateElement = document.getElementById("contenutoprincipale");

	ko.components.register('utenteConsultazione', {

		viewModel: {

			createViewModel: function(params, componentInfo) {

				model = new UtenteConsultazioneViewModel(params);

				return model;

			}

		},

		template : {element : templateElement}

	});

}






