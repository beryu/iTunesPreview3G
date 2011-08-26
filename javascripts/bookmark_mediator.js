/**
 * init
 */
$(document).bind('pageshow', function() {
	if(document.location.href.indexOf('bookmark') == -1) return;

	// menu
	//$('#menu').children().removeClass('selected');
	//$('.menu_bookmark').addClass('selected');

	// get bookmarks from local storage
	var idsArr = getBookmarksArray(false);
	var idsStr = '';
	var length = idsArr.length;
	for(var i = 0; i < length; i++) {
		if(idsArr[i] != '') {
			idsStr += ',' + idsArr[i];
		}
	}
	idsStr = idsStr.substr(1, idsStr.length);
	itunesSearchIds(idsStr); // get song list from iTunes Store API
	
	// introduction
	if(idsStr == ''){
		$('.bookmarks_result_container:visible').html(getMessages().bookmarkIntro);
	}

});

