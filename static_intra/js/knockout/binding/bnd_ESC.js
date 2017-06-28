var activityStreamVM;
var activityPublishMessageVM;

function initPagina(){	
	BindActivityLoading();
	BindActivityStream();
	BindNewActivityStream();
	RegisterComponent();
}

function BindActivityLoading(){
	//$(".ko_loading_activity").dataBind({visible: "$root.isLoaded === true"});	
	$("#ko_activities_loading").dataBind({css : { "'hidden'" : "isLoaded() === false"}});
	
}

function BindActivityStream(){
	
	var contenitore = $("#ko_activty_stream_container");
	contenitore.dataBind({component : "'activity-stream'"});
	
	//******************* FOREACH *******************
	$(".ko_activity_comments").dataBind({foreach : "activityComments()"});
	$(".ko_activityStream_activities").dataBind({foreach : "activities()"});
	$(".ko_activity_tags").dataBind({foreach : "tagsActivity()"});
	
	//******************* HTML *******************
	$(".ko_activity_actor").dataBind({html : "actor", attr: {href: "linkActorProfile"}});
	$(".ko_activity_message").dataBind({html : "displayMessage"});
	$(".ko_activity_data").dataBind({html: "createdDate"});
	$(".ko_activity_likes_count_box").dataBind({html: "likesText"});
	$(".ko_activity_likes_count").dataBind({html: "likesCountPersone"});
	$(".ko_activity_comments_count").dataBind({html: "commentsCount"});	
	$(".ko_activity_comments_actor").dataBind({html: "actorComment", attr:{href: "actorProfileUrl"}});
	$(".ko_activity_comments_text").dataBind({html: "commentsText"});
	$(".ko_activity_comments_date").dataBind({html: "commentsDate"});
	$(".ko_activity_tag").dataBind({html: "tagName"});
	
	//******************* VALUE *******************
	$(".ko_activity_comments_insert").dataBind({value: "inputComment", valueUpdate: "'afterkeydown'", hasFocus : "activityStreamCommentIsFocus"});
	
	//******************* VISIBLE *******************
	$(".ko_activity_form_post_visible").dataBind({visible : "isVisiblePost()"});
	$(".ko_activity_doc_container").dataBind({html: "activityDocumentContainer"});
	$(".ko_activity_box_commens").dataBind({visible:"commentsCount() > 0 || activityStreamCommentIsFocus() || isBoxCommentView()"});
	$(".ko_activity_comments_view_button").dataBind({visible: "inputComment().length > 0"});	
	$(".ko_activity_comments_delete").dataBind({visible:"isDeleteComment",click: "$parent.deleteComment"});
	$(".ko_activity_visible_message_only").dataBind({visible:"isMessageOnly"});
	$(".ko_activity_visible_image").dataBind({visible:"documentIsImage"});
	$(".ko_activity_visible_document").dataBind({visible:"documentIsDocument"});
	
	//******************* ATTR *******************
	$(".ko_activity_user_icon").dataBind({attr: {src: "userIcon"}});
	$(".ko_activity_actoricon").dataBind({attr: {src: "actorIcon", alt: "actor()"}});
	$(".ko_activity_comments_icon").dataBind({attr: {src: "actorCommentIcon"}});
	$(".ko_activity_doc_link").dataBind({attr:{href: "documentLink", target : "function(){window.open(this.href, '_blank');}"}});
	$(".ko_activity_doc_icon").dataBind({attr:{src: "documentIconSrc", alt : "documentIconAlt"}});
	
	$(".ko_activity_comments_actorprofile").dataBind({attr:{href: "actorProfileUrl"}});
	
	//$(".ko_activity_tag").dataBind({attr:{href: "tagName"}});
	
	//******************* CLICK *******************
	$(".ko_activity_liked").dataBind({click: "like",html : "textLike"});
	$(".ko_activity_is_comments").dataBind({click: "commentsLoad", visible: "commentsCountLast() > 1"});
	$(".ko_activity_list").dataBind({click: "listActivities"});
	$(".ko_activity_delete").dataBind({click: "$parent.deleteActivityStream", visible: "isActivityDeleted"});
	$(".ko_activity_comment_set_focus").dataBind({click: "function(){ activityStreamCommentIsFocus(true); isBoxCommentView(true); }" });
	
	//******************* SUBMIT *******************
	$(".ko_activity_comments_submit").dataBind({submit: "commentSubmit"});
}

function BindNewActivityStream(){
	
	//******************* STYLE *******************
	$(".ko_new_activity_image_collapse_css").dataBind({style : { "'margin-top'" : "newActivityImageView() === false ? '-16px' : '-65px'"}});
	//******************* FOREACH *******************
	$(".ko_new_activity_tags").dataBind({foreach : "newActivityTags()"});
	
	//******************* ATTR *******************
	$(".ko_activity_publish_user_icon").dataBind({attr: {src: "publishIconUser"}});
	$("#ko_new_activity_image_upload_view").dataBind({attr: {src: "newActivityStreamImageUploadView"}});
	//$(".ko_new_activity_document_upload_file").dataBind({attr: {placeholder: "newActivityStreamUploadDocumentGetFileName"}});
	//$(".ko_new_activity_image_upload_file").dataBind({attr: {placeholder: "newActivityStreamUploadImageGetFileName"}});
	
	//******************* VALUE *******************
	$(".ko_activity_publish_input").dataBind({value: "activityPublishInput", valueUpdate: "'afterkeydown'"});	
	$(".ko_new_activity_image_message").dataBind({value: "activityPublishImageMessage", valueUpdate: "'afterkeydown'"});	
	$(".ko_new_activity_link_message").dataBind({value: "activityPublishLinkMessage", valueUpdate: "'afterkeydown'"});	
	$(".ko_new_activity_create_tag_text").dataBind({value: "newActivityStreamCreateTagText", valueUpdate: "'afterkeydown'"});	
	$(".ko_new_activity_publish_tags").dataBind({value: "newActivityStreamPublishTags"});	
	$(".ko_new_activity_info_comunita").dataBind({value: "comunita"});	
	$("#ko_new_activity_message").dataBind({value: "activityMessage"});	
	$("#ko_new_activity_image_name").dataBind({value: "imageFileName"});
	$("#ko_new_activity_document_name").dataBind({value: "documentFileName"});
	$(".ko_new_activity_document_upload_file").dataBind({value: "newActivityStreamUploadDocumentGetFileName"});
	
	//******************* SUBMIT *******************
	//$(".ko_activity_publish_submit").dataBind({submit: "activityPublishSubmit"});
	//$(".ko_activity_publish_button").dataBind({enable: "activityPublishInput().length > 0 || activityPublishImageMessage().length > 0"});
	$(".ko_activity_publish_button").dataBind({enable: "activityPublishInput().length > 0 || activityPublishLinkMessage().length > 0 || isInserimentoImageOpen() === true || isInserimentoDocumentoOpen() === true"});

	//******************* HTML *******************
	$(".ko_new_activity_tag_name").dataBind({html : "newActivityTagNameLink", click : "$parent.newActivityStreamDeleteTag"});
	
	//******************* CLICK *******************

	$("#ko_create_new_activity_upload_image").dataBind({click: "toggleInserimentoImage"});
	$("#ko_create_new_activity_upload_document").dataBind({click: "toggleInserimentoDocumenti"});
	$("#ko_create_new_activity_link").dataBind({click: "toggleInserimentoLink"});
	$(".ko_new_activity_create_tag").dataBind({click: "function(){newActivityStreamCreateTag(); newActivityStreamCreateTagText('');}"});
	$(".ko_new_activity_image_clear").dataBind({click: "newActivityImageClear"});
	$(".ko_new_activity_document_clear").dataBind({click: "newActivityDocumentClear"});
	
	//******************* VISIBLE *******************
	$("#ko_new_activity_istags_exist").dataBind({visible : "newActivityTags().length === 0"});
	$("#ko_new_activity_image_view1").dataBind({visible : "newActivityImageView() === false"});
	$("#ko_new_activity_image_view2").dataBind({visible : "newActivityImageView() === true"});
	$("#ko_new_activity_document_view1").dataBind({visible : "newActivityDocumentView() === false"});
	$("#ko_new_activity_document_view2").dataBind({visible : "newActivityDocumentView() === true"});
	$("#ko_new_activity_image_loading").dataBind({visible : "newActivityImageLoading()"});
	$("#ko_new_activity_document_loading").dataBind({visible : "newActivityDocumentLoading()"});
	
	//******************* FILES *******************
	//$(".ko_new_activity_document_upload").dataBind({files: {onLoaded: "newActivityStreamDocumentUpload"}});
	//$(".ko_new_activity_image_upload").dataBind({files: {onLoaded: "newActivityStreamImageUpload"}});
	$(".ko_new_activity_document_upload").dataBind({event: {change: "function(){ newActivityStreamDocumentUpload($element.files[0]) }"}});
	$(".ko_new_activity_image_upload").dataBind({event: {change: "function(){ newActivityStreamImageUpload($element.files[0]) }"}});
}

function RegisterComponent(){
	var templateElement = document.getElementById("ko_activty_stream_container");
	
	ko.components.register('activity-stream', {
		viewModel: {
			createViewModel: function(params, componentInfo, componentInfo2) 
			{
				var innovazioneSpaceGuid = $("input[name*='hiddenInnovazioneGuid']").val();
				var serviceIds = "oracle.webcenter.collab.calendar.community,oracle.webcenter.doclib,oracle.webcenter.collab.forum,oracle.webcenter.peopleconnections.wall,oracle.webcenter.collab.calendar.community,it.inail.esc.idea";
				var spaceGuids = groupSpaceGuids+"," + innovazioneSpaceGuid;
				params = { isUserStream: false, serviceIds: serviceIds, spaceGuids:spaceGuids, generateSpaceIndependentUrls: true};
				activityStreamVM = new ActivityStreamViewModel(params);
				return activityStreamVM;
			}
		},
		template : {element : templateElement}
	});
}

