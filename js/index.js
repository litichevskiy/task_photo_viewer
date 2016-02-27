(function( mappingElements ){

	var input = document.querySelector('input[data-role="selectFile"]');

	var createReader = (function () {
		var counter = 0;
		return function (event){

			var file = this.files,
			itemFile;

			for ( var i = 0; i < this.files.length; i++ ) {
				itemFile = this.files[i];

				storage.addElement({
					name :itemFile.name,
					size :itemFile.size,
					id   : counter
				}, counter);

				var reader = new FileReader();
  				reader.onload = (function( func, obj ) {

  				  	return function(event) {
  				  			obj.src = event.target.result;
  				    		return func( obj );
  					};

  				})( mappingElements.createElement, {
  					id   : counter,
  					name : itemFile.name,
					size : itemFile.size
  				} );

  			reader.readAsDataURL( itemFile );
			counter++;
			}
			this.value = '';
		};

	})();


	input.onchange = createReader;

})( mappingElements );