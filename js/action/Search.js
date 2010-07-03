/**
 * 検索実行
 */
function search()
{
	// loading表示
	var resultTable = document.getElementById('result');
	$(resultTable).children().remove();
	var loadingImg = document.createElement('img');
	$(loadingImg).attr('src', 'img/loading.gif');
	var td = document.createElement('td');
	$(td).append(loadingImg);
	var tr = document.createElement('tr');
	$(tr).attr('class', 'loading');
	$(tr).append(loadingImg);
	$(resultTable).append(tr);
	
	// 検索ワード取得
	var keyword = document.getElementById('keyword').value;
	
	// 検索ワードエスケープ処理
	keyword = encodeURI(keyword);
	
	// 検索実行
	var url = 'http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStoreServices.woa/wa/wsSearch?term=' + keyword + '&country=jp&lang=ja_jp&media=music&callback=resultCallBack';
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', url);
	document.getElementsByTagName('body').item(0).appendChild(script);
	
	return false; // formのsubmitを中止
}
