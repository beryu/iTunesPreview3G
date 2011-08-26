/**
 * add bookmark to local storage
 */
function addBookmark(trackId) {
	var ids = localStorage.getItem('mp_bookmark');
	if(ids == null) {
		ids = ',';
	}
	localStorage.setItem('mp_bookmark', ids + trackId + ',');

	// Google Analytics Event Tracking
	window._gaq = window._gaq || [];
	window._gaq.push(['_trackEvent', 'Bookmarks', 'Add', trackId]);

	return true;
}

/**
 * get bookmarks as string
 */
function getBookmarks() {
	var ids = localStorage.getItem('mp_bookmark'); 
	if(ids == null) {
		ids = ',';
	}
	return ids;
}

/**
 * get bookmarks as array
 */
function getBookmarksArray(ascFlag) {
	var idsStr = localStorage.getItem('mp_bookmark'); 
	if(idsStr == null) {
		idsStr = ',';
	}
	idsArr = idsStr.split(',');
	
	if(!ascFlag) {
		descArr = [];
		for(var i = idsArr.length-1; i >= 0; i--) {
			descArr.push(idsArr[i]);
		}
		idsArr = descArr;
	}

	return idsArr;	
}

/**
 * remove bookmark from local storage
 */
function removeBookmark(trackId) {
	var idsStr = localStorage.getItem('mp_bookmark')
	if(idsStr == null) {
		return false;
	}
	idsArr = idsStr.split(',');
	var newIdsStr = ',';
	var length = idsArr.length;
	for(var i = 0; i < length; i++) {
		if(idsArr[i] != trackId && idsArr[i] != '') {
			newIdsStr = newIdsStr + idsArr[i] + ',';
		}
	}
	localStorage.setItem('mp_bookmark', newIdsStr);

	// Google Analytics Event Tracking
	window._gaq = window._gaq || [];
	window._gaq.push(['_trackEvent', 'Bookmarks', 'remove', trackId]);

	return true;
}

/**
 * toggle add or remove
 */
function toggleBookmark(element, trackId) {
	var elem = $(element);
	if(elem.hasClass('not_bookmarked')) {
		addBookmark(trackId);
		elem.removeClass('not_bookmarked');
		elem.addClass('bookmarked');
		elem.attr('data-icon', 'delete');
		elem.html(getLabels().unbookmark);
	} else {
		removeBookmark(trackId);
		elem.removeClass('bookmarked');
		elem.addClass('not_bookmarked');
		elem.attr('data-icon', 'star');
		elem.html(getLabels().bookmark);
	}
	elem.buttonMarkup();
	gVar.bookmarks = localStorage.getItem('mp_bookmark');

	return true;
}
