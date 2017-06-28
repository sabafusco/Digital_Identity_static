var model;

function initDetailItemBiblionWeb(){
	BindDetailItemBiblionWeb();
	RegisterDetailItemComponent();
	ko.applyBindings();
}

function BindDetailItemBiblionWeb(){
	
	$(".ko-detail-item-list-img").dataBind({attr: { src: "detailItem().thumbnailImg()"}});	
	$(".ko-detail-item-name").dataBind({html : "detailItem().name()"});
	$(".ko-detail-item-data").dataBind({html : "detailItem().dataIssuedItem()"});
	$(".ko-detail-item-metadata-href").dataBind({ html : "detailItem().metaDataLinkValue" , attr: { href: "detailItem().metaDataHrefValue()" } });
	$(".ko-detail-item-authors").dataBind({html : "detailItem().authorsItem()"});
	$(".ko-detail-item-abstract").dataBind({html : "detailItem().abstractItem()"});
	$(".ko-detail-item-relColl").dataBind({html : "detailItem().collectionItem()"});
	$(".ko-detail-item-attachment-none").dataBind({visible : "!detailItem().shouldShowAllegatiBox()"});
	$(".ko-detail-item-attachment").dataBind({ foreach : "detailItem().attachmentsArr()"});
	$(".ko-detail-item-attachment-item").dataBind({ html : "$data.name()" , attr: { href: "$data.downloadLink()" } });

}


