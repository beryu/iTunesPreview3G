/**
 * Viewを初期化
 */
$(document).ready(function()
{
	var searchForm = document.getElementById('searchForm'); // 検索条件取得
	
	$(searchForm).submit(search); // イベント登録
	
	$('#keyword').focus();
});