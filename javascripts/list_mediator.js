/**
 * 画面上に曲情報を出力
 * @param mode 検索モードかアルバム情報モードかを選択
 */
function showItem(results, resultElem, mode) {
	resultElem.html('');

	if (results.length == 0)
	{
		// Not found画面を生成する
		// メッセージ
		resultElem.append(document.createTextNode(getMessages().noItemFound));
		return;
	}
	
	// 検索結果を結果テーブルに設定
	var ul, li;
	var img_artwork; // ジャケット写真
	var a_audioInfo; // 試聴用audio要素
	var a_preview; // 試聴リンク
	var h2_track; // 曲名
	var h3_artist; // アーティスト名
	var h4_album; // アルバム名
	var a_info; // 詳細リンク
	var li_btns; // ボタンペイン
	var span_btns; // ボタンペインの一部
	var a_bookmark; // ブックマークリンク
	var a_viewAlbum; // アルバム参照リンク

	// 全体をまとめるul要素作成
	ul = $('<ul id="result_list" class="result_list" data-role="listview" data-theme="a" data-icon="arrow-r" data-split-icon="info" />');
	resultElem.append(ul);

	// li要素作成
	var length = results.length;
	for(var i = mode; i < length; i++) // mode:検索なら0, アルバムなら1が設定されている。アルバムの0番目の要素はアルバム情報なのでスキップしたい。
	{
		li = $('<li data-theme="a" />');
		li.attr('id', 'tr' + results[i].trackId);
		if(mode == MODE_SEARCH && i >= window.gVar.itemsPerPage) {
			li.addClass('hidden');
		}

		// 試聴用audio要素の情報を保存するa要素作成
		a_audioInfo = $(document.createElement('info'));
		a_audioInfo.attr('id', 'au' + results[i].trackId);
		a_audioInfo.attr('href', results[i].previewUrl);
		a_audioInfo.hide();
		
		// ジャケット写真作成
		img_artwork = $(document.createElement('img'));
		img_artwork.attr('id', 'aw' + results[i].trackId);
		img_artwork.attr('src', window.gVar.pathIconPlay);
		img_artwork.css({
			'background': 'url(' + results[i].artworkUrl60 + ') no-repeat',
			'width': '60px',
			'float': 'left'
		});
		
		// 曲情報作成
		h2_track = $(document.createElement('h2'));
		h2_track.append(document.createTextNode(results[i].trackName));
		h3_artist = $(document.createElement('h3'));
		h3_artist.append(document.createTextNode(results[i].artistName));
		h4_album = $(document.createElement('h4'));
		$(h4_album).append(document.createTextNode(results[i].collectionName));

                // 各情報に試聴リンクを設定
		a_preview = $(document.createElement('a'));
		a_preview.attr('id', 'nm' + results[i].trackId);
		a_preview.click(audioPlay);
		a_preview.attr('href', 'javascript:$(this).click()');
		a_preview.append(img_artwork);
		a_preview.append(h2_track);
		a_preview.append(h3_artist);
		a_preview.append(h4_album);
		
		// ボタンペインへのリンクを設定
		a_info = $(document.createElement('a'));
		a_info.click(showButtons);
		a_info.attr('href', 'javascript:$(this).click()');
		a_info.attr('id', 'if' + results[i].trackId);
		a_info.attr('data-theme', 'a');
		a_info.append('Option');

		// ボタンペインに載せるボタン作成(ただし一部はボタンペイン作成時に作成）
		a_bookmark = $(document.createElement('a'));
		if(gVar.bookmarks.indexOf(',' + results[i].trackId + ',') == -1) {
			a_bookmark.addClass('not_bookmarked');
			a_bookmark.append(document.createTextNode(getLabels().bookmark));
		} else {
			a_bookmark.addClass('bookmarked');
			a_bookmark.append(document.createTextNode(getLabels().unbookmark));
		}
		a_bookmark.click(function() {
			toggleBookmark(this, $(this).attr('title'));
		});
		a_bookmark.attr('href', 'javascript:$(this).click()');
		a_bookmark.attr('title', results[i].trackId);
		a_bookmark.attr('data-role', 'button');
		a_bookmark.attr('data-inline', 'true');
		a_bookmark.attr('data-theme', 'a');
		a_bookmark.attr('data-icon', 'star');

		// ボタンペイン作成
		li_btns = $(document.createElement('li'));
		li_btns.addClass('btn_pane');
		li_btns.addClass('bp' + results[i].trackId);
		li_btns.attr('id', 'bp' + results[i].trackId);
		span_btns = $(document.createElement('span'));
		span_btns.addClass('btn_list');
		span_btns.append(a_bookmark);
		if(mode == MODE_SEARCH) {
			// "View Albumリンクもボタンペインに配置する
			a_viewAlbum = $(document.createElement('a'));
			a_viewAlbum.append(document.createTextNode(getLabels().viewAlbum));
			a_viewAlbum.attr('href', '/album?cId=' + results[i].collectionId);
			a_viewAlbum.attr('data-role', 'button');
			a_viewAlbum.attr('data-inline', 'true');
			a_viewAlbum.attr('data-theme', 'a');
			a_viewAlbum.attr('data-icon', 'info');
			span_btns.append(a_viewAlbum);
		}
		span_btns.children().buttonMarkup();
		li_btns.append(span_btns);
		li_btns.css('display', 'none');

		// 行に情報を追加
		li.append(a_preview);
		li.append(a_info);
		li.append(a_audioInfo);
		ul.append(li); // 結果テーブルに行を追加
		ul.append(li_btns); // 結果テーブルに行を追加（こっちはボタンペイン）
	}
	
	window.gVar.curItemNum = window.gVar.itemsPerPage; // ロード済みアイテムの数を記憶

	if(mode == MODE_SEARCH && window.gVar.curItemNum < window.gVar.resultNum) { // まだ未ロードの曲が存在する
		// 追加で読み込むためのリンク作成
		var a_more = $(document.createElement('a'));
		a_more.click(showMore);
		a_more.append(document.createTextNode(getLabels().loadMore));
		a_more.attr('name', 'more');
		a_more.attr('href', 'javascript:$(this).click()');
		li = $(document.createElement('li'));
		li.addClass('more');
		li.attr('id', 'more');
		li.attr('data-icon', 'arrow-d');
		li.append(a_more);
		ul.append(li);
	}

	ul.listview();
}

/**
 * show more
 */
function showMore() {
	var delta = window.gVar.curItemNum; // この関数の前回の実行時点で読み込んだアイテム数
	var length = delta + window.gVar.itemsPerPage;
	var items = $('.result_list:visible').children('.ui-li-has-thumb');

	for(var i = delta; i < length && i < window.gVar.resultNum; i++) {
		$(items[i]).removeClass('hidden');
	}
	window.gVar.curItemNum = length;

	if(window.gVar.curItemNum + 1 > window.gVar.resultNum) {
		// ヒットした曲を全て表示し終わっていたら消す
		$('.more:visible').remove();
	}
	
	// Google Analytics Event Tracking
	if (delta > 0) {
		window._gaq = window._gaq || [];
		window._gaq.push(['_trackEvent', 'List', 'LoadMore', '', (delta / window.gVar.itemsPerPage) + 1]);
	}
}

/**
 * 曲の再生時の処理
 */
function audioPlay(e) {
	var mediaId = this.id.substr(2);
	var myAudioInfo = $('#au' + mediaId); // 自分の曲の試聴用情報がセットされたa要素を取得
	var myArtwork = $(this).children('img');
	var audioElem = document.getElementById('preview'); // 試聴用audio要素
	
	// 他の曲を停止
	jQuery.each($('.playing'), function() {
		if(this.id != 'aw' + mediaId) {
			$(this).attr('class', 'stop').attr('src', gVar.pathIconPlay);
		}
	});

	// タップされた曲の再生
	if (!$(myArtwork).hasClass('playing'))
	{ // タップされた曲が再生中ではなかった
		audioElem.pause(); // 曲を停止
		$(audioElem).attr('src', myAudioInfo.attr('href')); // audioの試聴ファイルのパスを設定
		audioElem.load(); // 曲を最初から再生するためのtips
		audioElem.play(); // 曲を再生
		$(myArtwork).attr('class', 'playing');
		$(myArtwork).attr('src', gVar.pathIconStop);

		// Google Analytics Event Tracking
		window._gaq = window._gaq || [];
		window._gaq.push(['_trackEvent', 'Audio', 'Play', mediaId]);
	}
	else { // タップされた曲が再生中だった
		// 曲を停止
		audioPause(this);
	}
	
	// バブリングストップ
	e.stopPropagation();

	// 再描画
	$('.container:visible').page();
}

/**
 * 曲を終わりまで再生したイベントの処理
 */
function audioStop() {
	$('.playing').attr('class', 'stop').attr('src', gVar.pathIconPlay);
	$('.container:visible').page();
}

/**
 * 曲を途中で止めたイベントの処理
 */
function audioPause(elem) {
	var audioElem = document.getElementById('preview'); // 試聴用audio要素
	var myArtwork = $(elem).children('img') // 自分のジャケットを取得
	if($(myArtwork).attr('class') == 'playing') {
		audioElem.pause(); // 曲を停止
		myArtwork.attr('class', 'stop');
		myArtwork.attr('src', gVar.pathIconPlay);
	}
}

/**
 * 曲のボタンペインを表示
 */
function showButtons(e) {
	var mediaId = this.id.substr(2);
	var btnPane = $('.bp' + mediaId + ':last'); // 自分のボタンペインを取得
	if(btnPane.is(':hidden')) {
		// 非表示中なら全ボタンペインを非表示にしてからペインを表示する
		$('.btn_pane:visible').slideUp();
		btnPane.slideDown();
	} else {
		// 表示中だったらペインを非表示にする
		btnPane.slideUp();
	}
	
	// バブリングストップ
	e.stopPropagation();

	// 再描画
	btnPane.parent().listview();
}
