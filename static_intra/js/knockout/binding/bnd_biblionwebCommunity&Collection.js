var model;

function initBiblionWeb(page){
	BindBiblionWeb(page);
	RegisterComponent(page);
	ko.applyBindings();
}

function BindBiblionWeb(page){
	
	if ( 'homePageBiblionWeb' == page )
	{	
		$(".box").dataBind({visible : "topComunityArr().length>0"});
		$(".ko-home-topcom-list").dataBind({foreach : "topComunityArr()"});
		$(".ko-home-topcom-list-li-a").dataBind({ html : "$data.name" , attr: { href: "$data.href" } });
		
		$(".ko-dochomepage-main").dataBind({visible : "homeItemsArr().length"});
		$(".ko-dochomepage-list").dataBind({foreach : "homeItemsArr()"});
		$(".ko-dochomepage-list-img").dataBind({attr: { src: "$data.thumbnailImg"}});	
		$(".ko-dochomepage-name").dataBind({html : "$data.name", attr: { href: "$data.detailItemHref" }});
		$(".ko-dochomepage-sommario").dataBind({html : "$data.abstractItem"});
		$(".ko-dochomepage-attachment-none").dataBind({visible : "!shouldShowAllegatiBox"});
		$(".ko-dochomepage-attachment").dataBind({ foreach : "attachmentsArr()"});
		$(".ko-dochomepage-attachment-item").dataBind({ html : "$data.name" , attr: { href: "$data.downloadLink" } });
		$(".ko-dochomepage-metadata-href").dataBind({ html : "$data.metaDataLinkValue" , attr: { href: "$data.metaDataHrefValue" } });

	}
	if ( 'lista_alberatura' == page )
	{	
		
		
	}
	if ( 'lista_sotto_comunita' == page ) 
	{
		$(".comName").dataBind({html : "comNameValue"});
		$(".comIntroductoryText").dataBind({html : "comIntroductoryTextValue"});
		
		$(".subComList").dataBind({visible : "subComunityArr().length>0"});
		$(".subColList").dataBind({visible : "subCollectionyArr().length>0"});
	}
}


