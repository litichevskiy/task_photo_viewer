(function(exports){

	var storage = (function(){
		var indexStorage = {};

		return {

			addElement : function ( obj, id ) {
				indexStorage[id] = obj;
			},

			setSizeInPx : function ( size, id ) {

				if ( indexStorage[id]  ){
					indexStorage[id]['widthInPx']  = size.width;
					indexStorage[id]['heightInPx'] = size.height;
					debugger;
				}
			}
		}


	})();

	window.storage = storage;

})(window);