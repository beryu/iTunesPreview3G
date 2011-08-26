/**
 * iTunes Previewから返される検索結果のコールバック関数
 */
function resultCallBack(result) {
	// 検索結果表示を初期化
	var resultElem = $('.search_result_container:visible');
	//resultElem.children().remove();
	$.mobile.hidePageLoadingMsg();

	// グローバル変数を初期化
	window.gVar.curItemNum = 0;

	// 検索結果をグローバル変数に保存
	window.gVar.resultNum = result.resultCount;
	
	// Google Analytics Event Tracking
	window._gaq = window._gaq || [];
	window._gaq.push(['_trackEvent', 'Search', 'Search Num', '', result.results.length]);

	// 画面に表示
	showItem(result.results, resultElem, MODE_SEARCH);
}

/**
 * iTunes Previewから返される検索結果のコールバック関数(アルバム検索専用）
 */
function resultCallBackAlbum(result) {
	// 検索結果表示を初期化
	var resultElem = $('#album_result_container');
	resultElem.children().remove();
	
	// グローバル変数を初期化
	window.gVar.curItemNum = 0;

	// 検索結果をグローバル変数に保存
	window.gVar.resultNum = result.resultCount;
	
	/*
	// Google Analytics Event Tracking
	window._gaq = window._gaq || [];
	window._gaq.push(['_trackEvent', 'Search', 'Search Num', '', result.results.length]);
	*/

	// 画面に表示
	if(result.results && result.results.length > 0) {
		showAlbum(result.results);
	}
}

/**
 * iTunes Previewから返される検索結果のコールバック関数(bookmark検索専用）
 */
function resultCallBackIds(result) {
	// 検索結果表示を初期化
	var resultElem = $('#bookmarks_result_container');
	resultElem.children().remove();
	
	// グローバル変数を初期化
	window.gVar.curItemNum = 0;

	// 検索結果をグローバル変数に保存
	window.gVar.resultNum = result.resultCount;
	
	/*
	// Google Analytics Event Tracking
	window._gaq = window._gaq || [];
	window._gaq.push(['_trackEvent', 'Search', 'Search Num', '', result.results.length]);
	*/

	// 画面に表示
	if(result.results && result.results.length > 0) {
		showItem(result.results, resultElem, MODE_SEARCH);
	}
}


