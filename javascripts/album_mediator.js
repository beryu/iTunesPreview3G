/**
 * init
 */
$(document).bind('pageshow', function() {
	// 一度実行された後かどうかチェック
	if($('#album').html() != '' || window.location.href.lastIndexOf('cId=') == -1) return;

	// menu
	$('#menu_search').addClass('selected');

	// set album info
	var collectionId = window.location.href.substring(window.location.href.lastIndexOf('cId=') + 4, 9999);// get collection id from get parameter
	itunesSearchAlbum(collectionId); // get collection information from iTunes Store API
});

function showAlbum(results) {
	// get html elements
	var albumPane = $('#album');
	var tracksPane = $('album_tracks');

	// set album information
	var imgArtwork = $(document.createElement('img'));
	var pAlbum = $(document.createElement('p'));
	var pArtist = $(document.createElement('p'));
	var pYear = $(document.createElement('p'));
	imgArtwork.attr('src', results[0].artworkUrl100);
	imgArtwork.attr('alt', results[0].collectionName);
	pAlbum.append(document.createTextNode(results[0].collectionName));
	pArtist.append(document.createTextNode(results[0].artistName));
	pYear.append(document.createTextNode(results[0].releaseDate.substring(0, 10)));
	albumPane.append(imgArtwork);
	albumPane.append(pAlbum);
	albumPane.append(pArtist);
	albumPane.append(pYear);

	// set track information
	showItem(results, $('#album_result_container'), MODE_ALBUM);
}
