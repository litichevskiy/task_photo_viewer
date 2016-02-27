(function(exports){

	var storage = (function(){
		var indexStorage = {};

		return {

			addElement : function ( obj, id ) {
				indexStorage[id] = obj;
			},

			setSizeInPx : function ( size, id ) {
				var index;

				if ( indexStorage[id]  ){
					indexStorage[id]['widthInPx']  = size.width;
					indexStorage[id]['heightInPx'] = size.height;

					// index = JSON.stringify( indexStorage[id] )
					// localStorage.setItem( id, index )
				}
			},

			deleteElement : function( id ){
				var index;

				delete indexStorage[id];

				// localStorage.removeItem( id );
			},

			getSortAllFoto : function( data, _reverse ){
				var allSizeOrNames = [];

				for ( var key in indexStorage ){
					allSizeOrNames.push( indexStorage[key][data] + ' ' + indexStorage[key].id);
				}

				if ( _reverse ) return ( allSizeOrNames.sort() ).reverse();
				return allSizeOrNames.sort();
			}
		}


	})();

	window.storage = storage;

})(window);