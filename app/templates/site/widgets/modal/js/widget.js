$(function () {
	var modal = $('.modal'),
		modalContainer = $('.widget_container', modal);

	//> TOOLS MODAL
	$(modal).attr('self', 'modal');
	$(modalContainer).attr('self', 'modal-container');
	//CLOSE MODAL
	$(modal).on('click', function (event) {
		var selfElem = event.target || event.srcElement;

		if ($(selfElem).attr('self') === 'modal') {
			modalClose(selfElem);
		}
	});

	//CLOSE MODAL
	$(modalContainer).on('click', function (event) {
		var selfElem = event.target || event.srcElement;

		if ($(selfElem).attr('self') === 'modal-container') {
			var modalSelf = $(selfElem).parent();
			modalClose(modalSelf);
		}
	});	

	$('.modal-close', modalContainer).on('click', function () {
		var modalSelf = $(this).parent().parent().parent(); 
		modalClose(modalSelf);
	});		
	//< TOOLS MODAL	
});

function modalClose(modal) {
	$(modal).fadeOut(200);
	$(modal).attr('show', '');	
}

//=include modal-more.js