var model;

function initBiblionWeb(page){
	BindBiblionWeb(page);
	RegisterComponent(page);
	ko.applyBindings();
}

function BindBiblionWeb(page){
	
	if ( 'collection' == page )
	{	
		$(".ko-colldetail-coll-name").dataBind({html : "name"});
		$(".ko-colldetail-coll-text").dataBind({html : "introductoryText"});
		$(".ko-colldetail-item-main").dataBind({visible : "collectionItemsArr().length"});
		$(".ko-colldetail-item-list").dataBind({foreach : "collectionItemsArr()"});
		$(".ko-colldetail-item-list-img").dataBind({attr: { src: "$data.thumbnailImg"}});	
		$(".ko-colldetail-item-name").dataBind({html : "$data.name", attr: { href: "$data.detailItemHref" }});
		$(".ko-colldetail-item-data").dataBind({html : "$data.dataIssuedItem"});
		$(".ko-colldetail-item-authors").dataBind({html : "$data.authorsItem"});
		$(".ko-colldetail-item-abstract").dataBind({html : "$data.abstractItem"});
		//$(".ko-colldetail-item-uri").dataBind({html : "$data.uriItem"});
		$(".ko-colldetail-item-relColl").dataBind({html : "$data.collectionItem"});
		$(".ko-colldetail-item-attachment-none").dataBind({visible : "!shouldShowAllegatiBox"});
		$(".ko-colldetail-item-attachment").dataBind({ foreach : "attachmentsArr()"});
		$(".ko-colldetail-item-attachment-item").dataBind({ html : "$data.name" , attr: { href: "$data.downloadLink" } });
		$(".ko-colldetail-metadata-href").dataBind({ html : "$data.metaDataLinkValue" , attr: { href: "$data.metaDataHrefValue" } });
		
		//paginazione
		$(".ko_col_detail_pagination_current_page").dataBind({value : "currentPage"});
		//$(".ko_dipendente_pagination_num").dataBind({value : "itemsPerPage",  event:{ change: "function() {loadPage(1)}"}});
		$(".ko_col_detail_pagination").dataBind({foreach : "pages()"});
		$(".ko_col_detail_pagination_li").dataBind({css : "$data.css"});
		$(".ko_col_detail_pagination_a").dataBind({html : "$data.text", click : "function() {$parent.loadPage($data.text)}"});
	}
	if ( 'metadata' == page ) 
	{
		$(".ko-metadata-item-name").dataBind({html : "nameItemSelected"});
		$(".ko-metadata-list-main").dataBind({visible : "metadataItemArr().length"});
		$(".ko-metadata-list").dataBind({foreach : "metadataItemArr()"});
		$(".label-cell").dataBind({html : "$data.key"});
		$(".word-break").dataBind({html : "$data.value"});
		$(".ko-colldetail-item-abstract").dataBind({html : "$data.lang"});
	}
	
}


