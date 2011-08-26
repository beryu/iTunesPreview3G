/**
 * グローバル変数
 */
var gVar = {
	curItemNum: 0,
	resultNum: 0,
	results: undefined,
	itemsPerPage: 5,
	bookmarks: localStorage.getItem('mp_bookmark'),
	pathIconStop: '/images/icon_stop.png',
	pathIconPlay: '/images/icon_play.png',
	lang: 'ja',
	lastKeyword: ''
};
if(gVar.bookmarks == null) {
	gVar.bookmarks = '';
}

/**
 * ラベルのGETTER
 */
function getLabels() {
	return gLabels[gVar.lang];
}

/**
 * メッセージのGETTER
 */
function getMessages() {
	return gMessages[gVar.lang];
}

/**
 * ラベル
 */
var gLabels = {
	ja: {
		//title: 'MusicPreview',
		//subTitle: 'iPhoneで音楽試聴',
		//menuSearch: '曲を検索',
		//menuBookmark: 'お気に入り',
		bookmark: 'お気に入り',
		unbookmark: '登録解除',
		viewAlbum: 'アルバム情報',
		loadMore: 'さらに読み込む...'
	}
}

/**
 * メッセージ
 */
var gMessages = {
	ja: {
		loading: '読込中...',
		loadError: '読み込みに失敗しました。<br />しばらく経ってからもう一度お試しください。',
		searchIntro: '検索結果の楽曲を試聴できます。<br />※音量にご注意ください。',
		bookmarkIntro: 'お気に入りに登録された楽曲がまだありません。',
		searchHelpText: '歌手, 曲, アルバム名で検索...',
		noItemFound: 'キーワードに該当する検索結果がありません。'
	}
}
