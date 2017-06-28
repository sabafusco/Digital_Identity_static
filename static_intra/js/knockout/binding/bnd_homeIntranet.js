function initPreferenze(){
	BindHomePrefs();
	RegisterComponent();
	ko.applyBindings();
}

function BindHomePrefs(){
	
	/*  VISUALIZZAZIONE  */
	$(".ko-item-angolo-dipendente").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(label())" },html : "label"});

	$(".ko-item-strumenti").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(label())" },html : "label"});
	
	$(".ko-item-cruscotti").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(label())" },html : "label"});
	
	$(".ko-item-preferiti").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(label())" },html : "label"});
	
	$(".ko-item-numeriutili").dataBind({ html : "nome"});
	$(".ko-item-numeriutili-vis-email").dataBind( {attr: { href : "'mailto:'+decodeInputValue(email())", title :"decodeInputValue(nome())"} });
	$(".ko-item-numeriutili-vis-email-label").dataBind({ html : "email"});
	$(".ko-item-numeriutili-vis-link").dataBind( {html:"label_link", attr: { href : "decodeInputValue(link())", title :"decodeInputValue(label_link())"} });
	$(".ko-item-numeriutili-vis-tel").dataBind({ html : "tel"});
	
	$(".ko-item-minisiti-img").dataBind({attr: { alt: "decodeInputValue(nome())", src: "img" }});
	$(".ko-item-minisiti-img-a").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(nome())" }});
	$(".ko-item-minisiti-nome").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(nome())" },html : "nome"});
	$(".ko-item-minisiti-desc").dataBind({html : "des"});
	
	
	/* EDIT */
	
	$(".ko-edit-angolo-dipendente-show").dataBind({click : "function() {loadAngoloDipDisp()}" });
	$(".ko-edit-angolo-dipendente-disp-list").dataBind({foreach : "angoloDipendenteDisp()"});
	$(".ko-edit-angolo-dipendente-disp-val").dataBind({html : "label"});
	$(".ko-edit-angolo-dipendente-disp").dataBind({attr: { value: "link", name: "label", id : "tagPreferenza" } ,   checked:"selected",  click: "$parent.checkAngoloDipPref"});
	$(".ko-edit-angolo-dipendente-disp-label").dataBind({attr: { for: "tagPreferenza"}});
	$(".ko-edit-angolo-dipendente").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(label())" },html : "label"});
	$(".ko-edit-angolo-dipendente-list").dataBind({foreach : "angoloDipendenteEdit()"});
	$(".ko-edit-angolo-dipendente-selected").dataBind({text : "angoloDipendenteEdit().length" });
	$(".ko-edit-angolo-dipendente-button").dataBind({click : "function() {$data.selected(false);$parent.checkAngoloDipPref($data)}" });
	$(".ko-edit-angolo-dipendente-search-button").dataBind({click : "function() {searchPreferenzaDisp('#cercaApplicativiInput','.ko-edit-angolo-dipendente-disp-list li')}" });
	$("#ko-edit-angolo-dipendente-check-counter").dataBind({ css:"angoloDipendenteCkClass",html : "angoloDipendenteCkText"});
	$(".ko-edit-angolo-dipendente-save").dataBind({ click : "function() {savePreferenza(angoloDipendente,angoloDipendenteEdit,'ANGOLO_DIPENDENTE')}" });
	$(".ko-edit-angolo-dipendente-annulla").dataBind({ click : "function() {annullaPreferenza('ANGOLO_DIPENDENTE')}" });

	
	$(".ko-edit-strumenti-show").dataBind({click : "function() {loadStrumentiDisp()}" });
	$(".ko-edit-strumenti-disp-list").dataBind({foreach : "strumentiDisp()"});
	$(".ko-edit-strumenti-disp-val").dataBind({html : "label"});
	$(".ko-edit-strumenti-disp").dataBind({attr: { value: "link", name: "label", id : "tagPreferenza" } ,   checked:"selected",  click: "$parent.checkStrumentiPref"});
	$(".ko-edit-strumenti-disp-label").dataBind({attr: { for: "tagPreferenza"}});
	$(".ko-edit-strumenti").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(label())" },html : "label"});
	$(".ko-edit-strumenti-list").dataBind({foreach : "strumentiEdit()"});
	$(".ko-edit-strumenti-selected").dataBind({text : "strumentiEdit().length" });
	$(".ko-edit-strumenti-button").dataBind({click : "function() {$data.selected(false);$parent.checkStrumentiPref($data)}" });
	$(".ko-edit-strumenti-search-button").dataBind({click : "function() {searchPreferenzaDisp('#cercaApplicativiInputStr','.ko-edit-strumenti-disp-list li')}" });
	$("#ko-edit-strumenti-check-counter").dataBind({ css:"strumentiCkClass",html : "strumentiCkText"});
	$(".ko-edit-strumenti-save").dataBind({ click : "function() {savePreferenza(strumenti,strumentiEdit,'APPLICA_STRUMENTI')}" });
	$(".ko-edit-strumenti-disp-categoria").dataBind({html : "$parent.stampaCategoria($data)"});
	$(".ko-edit-strumenti-annulla").dataBind({ click : "function() {annullaPreferenza('APPLICA_STRUMENTI')}" });

	
	
	$(".ko-edit-minisiti-show").dataBind({click : "function() {loadMinisitiDisp()}" });
	$(".ko-edit-minisiti-disp-list").dataBind({foreach : "minisitiDisp()"});
	$(".ko-edit-minisiti-disp-val").dataBind({html : "nome"});
	$(".ko-edit-minisiti-disp").dataBind({attr: { value: "link", name: "nome", id : "tagPreferenza" } ,   checked:"selected",  click: "$parent.checkMinisitiPref"});
	$(".ko-edit-minisiti-disp-label").dataBind({attr: { for: "tagPreferenza"}});
	$(".ko-edit-minisiti").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(nome())" },html : "nome"});
	$(".ko-edit-minisiti-list").dataBind({foreach : "minisitiEdit()"});
	$(".ko-edit-minisiti-selected").dataBind({text : "minisitiEdit().length" });
	$(".ko-edit-minisiti-button").dataBind({click : "function() {$data.selected(false);$parent.checkMinisitiPref($data)}" });
	$(".ko-edit-minisiti-search-button").dataBind({click : "function() {searchPreferenzaDisp('#cercaApplicativiInputMinisiti','.ko-edit-minisiti-disp-list li')}" });
	$("#ko-edit-minisiti-check-counter").dataBind({ css:"minisitiCkClass",html : "minisitiCkText"});
	$(".ko-edit-minisiti-save").dataBind({ click : "function() {savePreferenza(minisiti,minisitiEdit,'MINISITI')}" });
	$(".ko-edit-minisiti-annulla").dataBind({ click : "function() {annullaPreferenza('MINISITI')}" });

	
	$(".ko-edit-cruscotti-show").dataBind({click : "function() {loadCruscottiDisp()}" });
	$(".ko-edit-cruscotti-disp-list").dataBind({foreach : "cruscottiDisp()"});
	$(".ko-edit-cruscotti-disp-val").dataBind({html : "label"});
	$(".ko-edit-cruscotti-disp").dataBind({attr: { value: "link", name: "label", id : "tagPreferenza" } ,   checked:"selected",  click: "$parent.checkCruscottiPref"});
	$(".ko-edit-cruscotti-disp-label").dataBind({attr: { for: "tagPreferenza"}});
	$(".ko-edit-cruscotti").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(label())" },html : "label"});
	$(".ko-edit-cruscotti-list").dataBind({foreach : "cruscottiEdit()"});
	$(".ko-edit-cruscotti-selected").dataBind({text : "cruscottiEdit().length" });
	$(".ko-edit-cruscotti-button").dataBind({click : "function() {$data.selected(false);$parent.checkCruscottiPref($data)}" });
	$(".ko-edit-cruscotti-search-button").dataBind({click : "function() {searchPreferenzaDisp('#cercaCruscottiInputStr','.ko-edit-cruscotti-disp-list li')}" });
	$("#ko-edit-cruscotti-check-counter").dataBind({ css:"cruscottiCkClass",html : "cruscottiCkText"});
	$(".ko-edit-cruscotti-save").dataBind({ click : "function() {savePreferenza(cruscotti,cruscottiEdit,'CRUSCOTTI')}" });
	$(".ko-edit-cruscotti-annulla").dataBind({ click : "function() {annullaPreferenza('CRUSCOTTI')}" });

	
	$(".ko-edit-numeriutili-show").dataBind({click : "function() {loadNumeriutiliDisp()}" });
	$(".ko-edit-numeriutili-disp-list").dataBind({foreach : "numeriutiliDisp()"});
	$(".ko-edit-numeriutili-disp-val").dataBind({html : "nome"});
	$(".ko-edit-numeriutili-disp-tel").dataBind({html : "tel"});
	$(".ko-edit-numeriutili-disp-email").dataBind({html : "email"});
	$(".ko-edit-numeriutili-disp-link").dataBind({html : "label_link"});
	$(".ko-edit-numeriutili-disp").dataBind({attr: { value: "tel", name: "nome", id : "tagPreferenza" } ,   checked:"selected",  click: "$parent.checkNumeriutiliPref"});
	$(".ko-edit-numeriutili-disp-label").dataBind({attr: { for: "tagPreferenza"}});
	$(".ko-edit-numeriutili-val").dataBind({html : "nome"});
	$(".ko-edit-numeriutili-tel").dataBind({html : "tel"});
	$(".ko-edit-numeriutili-email").dataBind({html : "email"});
	$(".ko-edit-numeriutili-link").dataBind({html : "label_link"});
	$(".ko-edit-numeriutili-list").dataBind({foreach : "numeriutiliEdit()"});
	$(".ko-edit-numeriutili-selected").dataBind({text : "numeriutiliEdit().length" });
	$(".ko-edit-numeriutili-button").dataBind({click : "function() {$data.selected(false);$parent.checkNumeriutiliPref($data)}" });
	$(".ko-edit-numeriutili-search-button").dataBind({click : "function() {searchPreferenzaDisp('#cercaNumeroInput','.ko-edit-numeriutili-disp-list div.media')}" });
	$("#ko-edit-numeriutili-check-counter").dataBind({ css:"numeriutiliCkClass",html : "numeriutiliCkText"});
	$(".ko-edit-numeriutili-save").dataBind({ click : "function() {savePreferenza(numeriutili,numeriutiliEdit,'ASS_SISTEMISTICA')}" });
	$(".ko-edit-numeriutili-annulla").dataBind({ click : "function() {annullaPreferenza('NUMERI_UTILI')}" });
	

	
	$(".ko-edit-preferiti").dataBind({attr: { href: "decodeInputValue(link())", title: "decodeInputValue(label())" },html : "label"});
	$(".ko-edit-preferiti-button").dataBind({click : "function() {$parent.removePreferito($data)}" });
	$(".ko-edit-preferiti-button-add").dataBind({click :"function() {addPreferito()}" });
	$(".ko-edit-preferiti-show").dataBind({click :"function() {loadPreferitiEdit()}" });
	$("#ko-edit-preferiti-check-counter").dataBind({ css:"preferitiCkClass",html : "preferitiCkText"});
	$(".ko-edit-preferiti-save").dataBind({ click : "function() {savePreferenza(preferiti,preferitiEdit,'PREFERITI')}" });
	$(".ko-remove-preferiti-box").dataBind({visible : "preferitiEdit().length"});
	$(".ko-edit-preferiti-annulla").dataBind({ click : "function() {annullaPreferenza('PREFERITI')}" });



	$(".ko_activityStream_activities").dataBind({foreach : "activities()"});
	$(".ko_activity_actor").dataBind({html : "actor", attr: {href: "decodeInputValue(linkActorProfile())"}});
	$(".ko_activity_actoricon").dataBind({attr: {src: "actorIcon", alt: "actor()"}});
	$(".ko_activity_message").dataBind({html : "displayMessage"});
	$(".ko_activity_data").dataBind({html: "createdDate"});
	$(".ko_activity_publish_input").dataBind({value: "activityPublishInput", valueUpdate: "'afterkeydown'"});	
	$(".ko_activity_publish_button").dataBind({enable: "activityPublishInput().length > 0 || activityPublishLinkMessage().length > 0 || isInserimentoImageOpen() === true || isInserimentoDocumentoOpen() === true"});

	$(".ko_activity_comment_set_focus").dataBind({click: "function(){ activityStreamCommentIsFocus(true); isBoxCommentView(true); }" });
	$(".ko_activity_liked").dataBind({click: "like",html : "textLike"});
	$(".ko_activity_likes_count_box").dataBind({html: "likesText"});
	$(".ko_activity_likes_count").dataBind({html: "likesCountPersone"});

	
//			$(".ko_activity_likes_count_box").dataBind({html: "likesText"});
//			$(".ko_activity_likes_count").dataBind({html: "likesCountPersone"});
//			$(".ko_activity_comments_count").dataBind({html: "commentsCount"});	
//			$(".ko_activity_comments_actor").dataBind({html: "actorComment", attr:{href: "actorProfileUrl"}});
//			$(".ko_activity_comments_text").dataBind({html: "commentsText"});
//			$(".ko_activity_comments_date").dataBind({html: "commentsDate"});
//			$(".ko_activity_tag").dataBind({html: "tagName"});


}