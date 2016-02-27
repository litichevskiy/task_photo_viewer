(function(exports, storage){

	var ListFoto = document.querySelector('.ListFoto');

	var mappingElements = (function () {

		var transparentLayer = document.querySelector('.transparentLayer'),
			mainContainer = document.querySelector('.mainContainer'),
			containerPreview = 'containerPreview',
			bigSizeFoto = 'bigSizeFoto',
			visible = 'visible',
			scroll = 'scroll';

		return {

			createElement : function ( _src, id ) {
				var img, li;

				img = document.createElement('img');
				img.className = 'preveiw';
				img.dataset.id = id;
				img.src = _src;
				li = document.createElement('li');
				li.className = containerPreview;
				li.appendChild(img);
				ListFoto.appendChild(li);
				img.addEventListener( 'load', mappingElements.getSizeImage, true );
			},

			getSizeImage : function ( event ) {
				var id = event.target.dataset.id;

				storage.setSizeInPx({
					height : event.target.naturalHeight,
					width  : event.target.naturalWidth
				}, id)
			},


			resizeFoto : function ( event ){
				var target = event.target;

				if ( target.tagName !== 'IMG' ) return;

				target.classList.toggle( bigSizeFoto );
				transparentLayer.classList.toggle( visible );
				mainContainer.classList.toggle( scroll )
			},

			deleteFoto : function ( event ) {
				var target = event.target;

				if ( target.parentElement.classList.contains(containerPreview) ){
					ListFoto.removeChild( target.parentElement );
				}
			}
		}

	})();


	ListFoto.addEventListener('click', mappingElements.resizeFoto);
	ListFoto.addEventListener('dblclick', mappingElements.deleteFoto);


	exports.mappingElements = mappingElements;

})(window, storage);