(function(exports, storage){

	var ListFoto = document.querySelector('.ListFoto'),
		selectSort = document.querySelector('.selectSort');


	var mappingElements = (function () {

		var transparentLayer = document.querySelector('.transparentLayer'),
			mainContainer = document.querySelector('.mainContainer'),
			containerPreview = 'containerPreview',
			bigSizeFoto = 'bigSizeFoto',
			REVERSE = 'reverse',
			visible = 'visible',
			scroll = 'scroll';

		return {

			createElement : function ( obj ) {
				var img, li;

				img = document.createElement('img');
				img.className = 'preveiw';
				img.dataset.id = obj.id;
				img.src = obj.src;
				img.dataset.name = obj.name;
				img.dataset.size = obj.size;
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
				mainContainer.classList.toggle( scroll );
			},

			deleteFoto : function ( event ) {
				var target = event.target,
					id = target.dataset.id;

				if ( target.parentElement.classList.contains(containerPreview) ){
					ListFoto.removeChild( target.parentElement );
					storage.deleteElement( id );
				}
			},

			listSortFotos : function( event ) {
				var target = event.target.dataset.name, result;

				if ( ListFoto.children.length < 2) return;

				if ( target === 'sizeReverse' ) {
					result = storage.getSortAllFoto( 'size', REVERSE );
					return relocateFotos ( result, ListFoto, 'size' );
				}else {

					if ( target === 'nameReverse' ) {
						result = storage.getSortAllFoto( 'name', REVERSE );
						return relocateFotos ( result, ListFoto, 'name' );
					}
				}
				result = storage.getSortAllFoto( target );
				return relocateFotos ( result, ListFoto, target );
			}
		}

	})();


	function relocateFotos( dataSorts, ListFoto, dataId ){
		var rememberCurrentResult, id, parentCurrentResult, currentDataSort, idDataSort, result;

		for ( var i = 0; i < dataSorts.length; i++) {

			id = ListFoto.children[i].children[0].dataset[dataId];
			currentDataSort = dataSorts[i].split(' ');
			result = currentDataSort[0];

			if ( dataId === 'size' ) id = Number( id ), result = Number( result );


				idDataSort = Number(currentDataSort[1]);

			if( id !== result ) {

				rememberCurrentResult = ListFoto.children[i].children[0];

				currentResult = ListFoto.querySelector('img[data-id="'+idDataSort+'"]')

				ListFoto.children[i].removeChild(ListFoto.children[i].children[0]);

				parentCurrentResult = currentResult.parentElement;

				ListFoto.children[i].appendChild( currentResult )
				parentCurrentResult.appendChild( rememberCurrentResult );
			}
		}
	};


	ListFoto.addEventListener('dblclick', mappingElements.deleteFoto);
	ListFoto.addEventListener('click', mappingElements.resizeFoto);
	selectSort.addEventListener('click', mappingElements.listSortFotos);


	exports.mappingElements = mappingElements;

})(window, storage);