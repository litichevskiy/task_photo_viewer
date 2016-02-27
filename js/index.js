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
					size :itemFile.size
				}, counter);

				var reader = new FileReader();
  				reader.onload = (function( func, id ) {

  				  	return function(event) {
  				    		return func(event.target.result, id)
  					};

  				})( mappingElements.createElement, counter );

  			reader.readAsDataURL( itemFile );
			counter++;
			}
			this.value = '';
		};

	})();


	input.onchange = createReader;

})( mappingElements );