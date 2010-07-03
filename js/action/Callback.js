/**
 * iTunes Previewから返される検索結果のコールバック関数
 */
function resultCallBack(result)
{
	// 検索結果表示を初期化
	var resultTable = document.getElementById('result');
	$(resultTable).children().remove();
	
	// グローバル変数を初期化
	window.globalVariable.curItemNum = 0;

	// 検索結果をグローバル変数に保存
	window.globalVariable.results = result.results;
	window.globalVariable.resultNum = result.resultCount;
	
	// 画面に表示
	showItem();
}
