/**
 * init
 */
$(document).bind('pagecreate', function(){  
	// basic setup
	$.mobile.ajaxEnabled = true;
	$.mobile.page.prototype.options.addBackBtn = true;
	$.mobile.loadingMessage = getMessages().loading;
	$.mobile.pageLoadErrorMessage = getMessages().loadError;
	
	// localize
	//$('.title:last').html(getLabels().subTitle + ' - ' + getLabels().title);
	//$('.menu_search:last').html(getLabels().menuSearch);
	//$('.menu_bookmark:last').html(getLabels().menuBookmark);

	$('#preview').bind('ended', audioStop); // 試聴用audio要素の停止イベント登録

});

/**
 * jump to album page
 */
function jump2Album(albumId) {
	// Google Analytics Event Tracking
	window._gaq = window._gaq || [];
	window._gaq.push(['_trackEvent', 'Jump', 'Album', albumId]);

	$.mobile.changePage({  
		url: 'album.html', 
		type: 'get',
		data: 'cId=' + albumId
	}, 'slide', false, true, false);  
}

/**
 * jump to search page
 */
function jump2Search() {
	// Google Analytics Event Tracking
	window._gaq = window._gaq || [];
	window._gaq.push(['_trackEvent', 'Jump', 'Search', '']);

	$.mobile.changePage({
		url: '/', 
		type: 'get',
		data: ''
	}, false, false, true, false);
}

/**
 * jump to bookmarks page
 */
function jump2Bookmarks() {
	// Google Analytics Event Tracking
	window._gaq = window._gaq || [];
	window._gaq.push(['_trackEvent', 'Jump', 'Bookmarks', '']);

	$.mobile.changePage({
		url: 'bookmark.html', 
		type: 'get',
		data: ''
	}, false, false, true, false);
}
