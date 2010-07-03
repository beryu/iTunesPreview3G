/**
 * 画面上に曲情報を追加
 */
function showItem()
{
	var resultTable = document.getElementById('result'); // 検索結果を入れるテーブル
	
	// 「more...」を表示中なら消す
	if($('#more'))
	{
		$('#more').remove();
	}
	
	var tr;
	var td;
	if (window.globalVariable.resultNum == 0)
	{
		// Not found画面を生成する
		
		// 画像
		var arrowImg = document.createElement('img');
		$(arrowImg).attr('src', 'img/arrowTop.png');
		$(arrowImg).attr('alt', '↑');
		$(arrowImg).attr('id', 'introArrow');
		
		// メッセージ
		var nfDiv = document.createElement('div');
		$(nfDiv).attr('id', 'introBox');
		$(nfDiv).append(document.createTextNode('キーワードにヒットする曲が見つかりませんでした。'))
		td = document.createElement('td'); // セル作成
		
		// セル
		$(td).append(arrowImg);
		$(td).append(nfDiv);
		tr = document.createElement('tr'); // 行作成
		$(tr).attr('id', 'intro');
		$(tr).append(td);
		$(resultTable).append(tr);
		return;
	}
	
	// 検索結果を結果テーブルに設定
	var tdArtwork; // ジャケット写真セル
	var tdTrack; // 曲名セル
	var artwork; // ジャケット写真
	var preview; // 試聴用audio要素
	var previewLink; // 試聴リンク
	var artist; // アーティスト名
	var track; // 曲名
	var album; // アルバム名
	var length = window.globalVariable.itemsPerPage
	var delta = window.globalVariable.curItemNum; // この関数の前回の実行時点で読み込んだアイテム数
	for(var i = 0;
		i < length 
		&& i + window.globalVariable.curItemNum < window.globalVariable.resultNum;
		i++)
	{
		tr = document.createElement('tr'); // 行作成
		$(tr).attr('id', 'tr' + window.globalVariable.results[i + delta].trackId);
		
		// trにクリックハンドラ追加
		$(tr).click(audioPlay);

		
		// 試聴用audio要素作成
		preview = document.createElement('audio');
		$(preview).attr('id', 'au' + window.globalVariable.results[i + delta].trackId);
		$(preview).attr('src', window.globalVariable.results[i + delta].previewUrl);
		preview.addEventListener('ended', audioStop, false);
		
		// ジャケット写真作成
		artwork = document.createElement('img');
		$(artwork).attr('id', 'aw' + window.globalVariable.results[i + delta].trackId);
		$(artwork).attr('src', window.globalVariable.results[i + delta].artworkUrl60);
		$(artwork).addClass('artwork');
		$(artwork).click(audioPlay);
		
		// ジャケット写真セルに以下の要素を追加
		// ・試聴用audio要素
		// ・試聴リンク
		tdArtwork = document.createElement('td');
		$(tdArtwork).addClass('artworkCell');
		$(tdArtwork).append(preview);
		$(tdArtwork).append(artwork);
		
		// 曲名セル作成
		artist = document.createElement('span');
		$(artist).addClass('artist');
		$(artist).append(document.createTextNode(window.globalVariable.results[i + delta].artistName));
		track = document.createElement('span');
		$(track).addClass('track');
		previewLink = document.createElement('h2');
		$(previewLink).attr('id', 'nm' + window.globalVariable.results[i + delta].trackId);
		$(previewLink).append(document.createTextNode(window.globalVariable.results[i + delta].trackName));
//		$(previewLink).click(audioPlay);
		$(track).append(previewLink);
		album = document.createElement('span');
		$(album).addClass('album');
		$(album).append(document.createTextNode(window.globalVariable.results[i + delta].collectionName));
		tdTrack = document.createElement('td');
		$(tdTrack).append(artist);
		$(tdTrack).append(track);
		$(tdTrack).append(album);
		
		// 行に各セルを追加
		$(tr).append(tdArtwork); // ジャケット写真セル
		$(tr).append(tdTrack); // 曲名セル
		
		$(resultTable).append(tr); // 結果テーブルに行を追加
		
		window.globalVariable.curItemNum++; // ロード済みアイテムの数を加算
		
		if(i == length - 1
			&& window.globalVariable.curItemNum + 1 < window.globalVariable.resultNum)
		{ // まだ未ロードの曲が存在する
			// 追加で読み込むためのリンク作成
			var div = document.createElement('div');
			$(div).click(showItem);
			$(div).append(document.createTextNode('load more...'));
			td = document.createElement('td'); // セル作成
			$(td).attr('colSpan', 2);
			$(td).append(div);
			tr = document.createElement('tr'); // 行作成
			$(tr).append(td);
			$(tr).attr('id', 'more');
			$(tr).attr('name', 'more');
			$(resultTable).append(tr);
		}
	}
}

/**
 * 曲の再生時の処理
 */
function audioPlay(e)
{
	var myAudio = document.getElementById('au' + this.id.substr(2)); // 自分のaudio要素を取得
	var myTr = document.getElementById('tr' + this.id.substr(2)); // 自分のtr要素を取得
	if (!$(myTr).hasClass('playing'))
	{ // タップされた曲が再生中ではなかった
		// 他に再生中の曲があれば、止める
		$('tr.playing').each(function()
		{ // tr要素のスコープで実行される
			audioPause(this.id.substr(2)); // 曲を停止
		});
		myAudio.play(); // 曲を再生
		$(myTr).attr('class', 'playing');
	}
	else { // タップされた曲が再生中だった
		// 曲を停止
		audioPause(this.id.substr(2));
	}
	
	// バブリングストップ
	e.stopPropagation();
}

/**
 * 曲を終わりまで再生したイベントの処理
 */
function audioStop()
{
	var myTr = document.getElementById('tr' + this.id.substr(2)); // 自分のtr要素を取得
	$(myTr).attr('class', 'stop');
}

/**
 * 曲を途中で止めたイベントの処理
 */
function audioPause(id)
{
	var myAudio = document.getElementById('au' + id); // 自分のaudio要素を取得
	var myTr = document.getElementById('tr' + id); // 自分のtr要素を取得
	$(myTr).attr('class', 'stop');
	myAudio.pause(); // 曲を停止
	myAudio.currentTime = 0; // 再生位置を最初に戻す
}