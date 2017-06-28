var model;

function initSearchBiblionWeb(page){
	BindSearchBiblionWeb(page);
	RegisterSearchComponents(page);
	ko.applyBindings();
}

function BindSearchBiblionWeb(page){
	hideLoadingAnimation();

	// submit form ricerca
	$(".ko-ricerca-avanzata-filtra").dataBind({html : "buttonFiltraLabel" , click :"submitRicercaAvanzata"});
	$(".ko-ricerca-avanzata-annulla").dataBind({html : "buttonAnnullaLabel" , click :"resetRicercaAvanzata"});
	
	// item
	$(".ko-ricerca-filter-anno").dataBind({visible : "anno!=''" , html : "annoLabel"});
	$(".ko-ricerca-filter-autore").dataBind({visible : "autore!=''" , html : "autoreLabel"});
	$(".ko-ricerca-filter-titolo").dataBind({visible : "titolo!=''" , html : "titoloLabel"});
	$(".ko-ricerca-filter-soggetto").dataBind({visible : "soggetto!=''" , html : "soggettoLabel"});
	
	$(".ko-ricerca-item-main").dataBind({visible : "itemsArr().length"});
	$(".ko-ricerca-item-list").dataBind({foreach : "itemsArr"});
	$(".ko-ricerca-item-title").dataBind({html : "$data.title" , attr: { href: "$data.detailItemHref" }});
	$(".ko-ricerca-item-data").dataBind({html : "$data.dataInserimento"});
	$(".ko-ricerca-item-authors").dataBind({html : "$data.authors"});
	$(".ko-ricerca-item-abstract").dataBind({html : "$data.sommario"});
	
	//paginazione
	//$(".ko_col_detail_pagination_current_page").dataBind({value : "currentPage"});
	$(".ko-ricerca-pagination").dataBind({foreach : "pages()"});
	$(".ko-ricerca-pagination-li").dataBind({css : "$data.css"});
	$(".ko-ricerca-pagination-a").dataBind({html : "$data.text", click : "function() {$parent.loadPage($data.text)}"});

}


