//Скрип отображения какого либо скрытого дополнительного контента в модальном окне
$(function () {
	$('body').on('click', '.show-more-content', function () {
		var moreContent = chidrenParent(this, '.modal-content');
			modal = $(this).attr('modal') || '.modal-more';

		//Найдём модалку	
		modal = $(modal);

		//Вставляем контент в модалку	
		$('.modal-more-content', modal).html($(moreContent).html());
		$(modal).fadeIn();
	});


	//Поиск дочернего элемента поднимаясь каждый раз вверх
	function chidrenParent(elem, selector) {
		var result = $(elem).find(selector); 

		if (result.length > 0) {
			return result;
		} else {
			elem = $(elem).parent();
			if ($(elem).prop("tagName") === 'HTML') {
				return false;
			} else {
				return chidrenParent(elem, selector);
			}	
		}
	}
});