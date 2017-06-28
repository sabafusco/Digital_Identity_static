function tracciaturaDownload(path){
	$.ajax
	({ 
		url: path,
		data: {},
		type: 'GET',
		success: function()
		{
			return;
		}
	});
}