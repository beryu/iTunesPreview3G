/**
 * 検索実行
 */
function itunesSearch() {
	// 検索ワード取得
	var keyword = $('.keyword:visible').attr('value');
	if(keyword == gVar.lastKeyword) {
		// 最後に検索したキーワードから変化がなければ検索しない
		return;
	} else {
		gVar.lastKeyword = keyword;
	}
	
	// 読み込み中メッセージ表示
	$.mobile.showPageLoadingMsg();

	// 検索ワードエスケープ処理
	keyword = encodeURI(keyword);
	
	// 検索実行
	var url = 'http://itunes.apple.com/search?term=' + keyword + '&country=jp&lang=ja_jp&entity=song&callback=resultCallBack&limit=30';
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.setAttribute('src', url);
	//$('#search_script').children().remove();
	$('.search_script:visible').append(script);

	// Google Analytics Event Tracking
	window._gaq = window._gaq || [];
	window._gaq.push(['_trackEvent', 'Search', 'From Main', keyword]);

	return false; // formのsubmitを中止
}

/**
 * アルバムの検索実行
 */
function itunesSearchAlbum(albumId) {
	var url = 'http://itunes.apple.com/lookup?id=' + albumId + '&country=JP&lang=ja_jp&entity=song&callback=resultCallBackAlbum&limit=200&sort=trackNumber';
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.setAttribute('src', url);
	//$('#search_script').children().remove();
	$('.search_script:visible').append(script);
}

/**
 * trackIdの検索実行
 */
function itunesSearchIds(idsStr) {
	var url = 'http://itunes.apple.com/lookup?id=' + idsStr + '&country=JP&lang=ja_jp&entity=song&callback=resultCallBackIds&limit=200';
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.setAttribute('src', url);
	//$('#search_script').children().remove();
	$('.search_script:visible').append(script);
}

