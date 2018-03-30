	//>FORM
	var form_tools = {
		url: 'mail.php',
		method: 'post',
		title: 'Если у Вас есть вопросы, Вы можете оставить заявку и мы перезвоним Вам в ближайшее время.',
		response: {
			modal: '.msg-form-default',
			success: {
				msg: 'Ваша заявка успешно отправлена!'
			}
		}
	};
	
$(function () {
	//CHECK POLITICA
	$('.politica .check').on('click', function () {
		var selfCheck = $(this).attr('check');

		if (selfCheck) {
			if (selfCheck === 'true') {
				$(this).attr('check', '');
			}	else {
				$(this).attr('check', 'true');
				$(this).removeClass('warning');
			}
		} else {
			$(this).attr('check', 'true');
			$(this).removeClass('warning');
		}
	});

	//CALLBACK DATA SEND FORM
	var callbackData;

	//ФИЛЬТРЫ

	var filters = {
		//Название поля которое будет отправлено на e-mail
		mail: {
			phone: 'Телефон',
			email: 'E-mail',
			text: 'Сообщение',
			name: 'Имя'
		},

		//Сообщения об ошибках
		msg: {
			phone: {
				error: 'Некорректный номер',
				success: ''
			},

			email: {
				error: 'Некорректный e-mail',
				success: ''
			},

			name: {
				error: 'Не походит на имя',
				success: ''
			},

			text: {
				error: 'Некорректное значение',
				success: ''
			},

		},

		//Типы данных
		type: {
			phone: function (value) {
				var reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
				return reg.test(value);
	
			},

			email: function (value) {
				var reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
				return reg.test(value);
			},

			name: function (value) {
				var reg = /^[а-яА-ЯёЁa-zA-Z]{3,20}$/;
				return reg.test(value);
			},

			text: function (value) {
				if (value !== '') {
					return true;
				} else {
					return false;
				}				
			}
		},

		//Фильтр input при keyup
		filter: {
			phone: function (self) {
				var phone = filters.type.phone(self.value),
					settings = getSettingssInput(self);

				return filterInput({
					settings: settings,
					input: phone,
					type: 'phone',
					value: self.value,
					mail: $(self).attr('mail'),
					msgSucess: {
						input: self,
						success: true,
						msg: $(self).attr('msg:success') || filters.msg.phone.success
					},

					msgError: {
						input: self,
						success: false,
						msg: $(self).attr('msg:error') || filters.msg.phone.error
					} 
				});
			},

			email: function (self) {
				var email 	 = filters.type.email(self.value),
					settings = getSettingssInput(self);
				
				return filterInput({
					settings: settings,
					input: email,
					type: 'email',
					value: self.value,
					mail: $(self).attr('mail'),
					msgSucess: {
						input: self,
						success: true,
						msg: $(self).attr('msg:success') || filters.msg.email.success
					},

					msgError: {
						input: self,
						success: false,
						msg: $(self).attr('msg:error') || filters.msg.email.error
					} 
				});
			},

			name: function (self) {
				var name 	 = filters.type.name(self.value),
					settings = getSettingssInput(self);

				return	filterInput({
						settings: settings,
						input: name,
						type: 'name',
						value: self.value,
						mail: $(self).attr('mail'),
						msgSucess: {
							input: self,
							success: true,
							msg: $(self).attr('msg:success') || filters.msg.name.success
						},

						msgError: {
							input: self,
							success: false,
							msg: $(self).attr('msg:error') || filters.msg.name.error
						} 
					});					
			},

			text: function (self) {
				var text 	 = filters.type.text(self.value),
					settings = getSettingssInput(self);	

				return	filterInput({
						settings: settings,
						input: text,
						type: 'text',
						value: self.value,
						mail: $(self).attr('mail'),
						msgSucess: {
							input: self,
							success: true,
							msg: $(self).attr('msg:success') || filters.msg.text.success
						},

						msgError: {
							input: self,
							success: false,
							msg: $(self).attr('msg:error') || filters.msg.text.error
						} 
					});

			}
		}

	};

	var form = $('.form-dymanic');

	//ОТПРАВКА ФОРМЫ
	$('.form-send [class*="btn_"]', form).on('click', function () {
		var selfForm = $(this).closest('.form-dymanic'),
			inputs = $('input[type="text"], textarea', selfForm),
			check =  $('.politica .check', selfForm);

			if ($(check).attr('check') === "true") {
				sendForm({
					form: selfForm,
					inputs: inputs
				});
			} else {
				//Не подтвердили политику конфендициальности
				$(check).addClass('warning');
			}
	});

	//ФИЛЬТРУЕМ VALUE INPUT И СООБЩЩАЕМ ОБ ОШИБКЕ ПОЛЬЗОВАТЕЛЮ
	$('input[type="text"], textarea', form).on('keyup', function () {
		var type = $(this).attr('reg');

		//Проверяем тип данных
		if (type && filters.filter[type] !== undefined) {
			//Проверяем value на тип данных
			filters.filter[type](this);
		} else {
			//Тип данных по умолчанию
			filters.filter.text(this);
		}
	});
	//< FORM

	//> MODALS
	$('body').on('click', '.show-modal', function () {
		var modal = $(this).attr('modal');
		if (!modal || modal === '') {
			modal = $('.modal-default');
		} 

		//> Отслеживает с какой формы заявка
		var form = $(this).attr('form');

		if (form) {
			$('.form-send [class*="btn_"]', modal).attr('form', form);
		}
		//> Отслеживает с какой формы заявка

		var animateModal = setDataModalCustom(modal, this);

		$(modal).fadeIn(200, function () {
			if (animateModal) {
				if (animateModal.show) {
					$('.widget_wrapper', modal).addClass(animateModal.show);
					$('.widget_wrapper', modal).addClass('animated');
				}
			} 
		});
		$(modal).attr('show', 'true');
	});
	//< MODALS


	function showMsg(data) {
		var msg = $(data.input).siblings('.msg');

		//Если есть блок под сообщения
		if(msg) {
			if (data.success === true) {
				$(msg).removeClass('error');
				$(msg).addClass('success');
			} else {
				$(msg).removeClass('success');
				$(msg).addClass('error');	
			}
			$(msg).text(data.msg);		
		}

		if (data.success === true) {
			$(data.input).removeClass('error');
		} else {
			$(data.input).addClass('error');		
		}
	} 


	//Верёнм настройки для input
	function getSettingssInput(input) {
		var settings = $(input).attr('data'),
			result = '';

		//Вернём массив настроек
		if (settings) {
			settings = settings.split(' ');
			var settingsCount = settings.length;

			if (settingsCount > 0) {
				for (var index = 0; index < settingsCount; index++) {
					settings[index] = settings[index].split(':');
				}			
			}


			
			//Превращаем массив объект	
			settingsCount = settings.length;

			if (settingsCount > 0) {
				for (var index = 0; index < settingsCount; index++) {
					if (index < settingsCount - 1) {
						result += '"' + settings[index][0] + '":' + '"' + settings[index][1] + '",'
					} else {
						result += '"' + settings[index][0] + '":' + '"' + settings[index][1] + '"';
					}	
				}


				settings = JSON.parse('{' + result + '}');	
			}
		} 
		
		return settings;
	}

	//Проверяем input исходя из настроек data
	function filterInput(data) {
		var result = '';

		if (data.settings) {
			var settings = data.settings;

			//Если поле является обязательным
			if (settings.elem && settings.elem === 'required') {
				//Если input соответствует типу данных
				if (data.input) {
					showMsg(data.msgSucess);
					result = {
						mail: $(data.input).attr('mail') || filters.mail[data.type],
						success: true,
						value: data.value
					}; 
				} else {
					showMsg(data.msgError);
					result = {
						mail: $(data.input).attr('mail') || filters.mail[data.type],
						success: false,
						value: data.value
					}; 		
				}
			} 
		} else {
			result = {
				mail: $(data.input).attr('mail') || filters.mail[data.type],
				value: data.value
			}; 				
		} 

		return result;
	}

	function sendForm(data) {
		if (data.inputs.length > 0) {
			var countInputs = data.inputs.length,
				result = [];

			var iteration = 0;		
			//Проверяем input на соответсвущий тип данных
			for (var index = 0; index < countInputs; index++) {
				var type = $(data.inputs[index]).attr('reg');

				//Проверяем тип данных
				if (type && filters.filter[type] !== undefined) {
					//Проверяем value на тип данных
					result[iteration++] = filters.filter[type](data.inputs[index]);
				
				} else {
					//Тип данных по умолчанию
					result[iteration++] = filters.filter.text(data.inputs[index]);
				}

			}

			var success = 1;
			//Проверяем всё ли в порядке чтобы отправить ajax запрос
			//И тут же формируем данные для отправки
			var resultCount = result.length;
			for (var index = 0; index < resultCount; index++) {

				//Если обязательный input не корректен то не допускаем до отправки
				if (result[index].success === false) {
					success = 0;
					break;
				}
			}

			//Если все данные огонь
			if (success === 1) {
				settingsFormButton({
					form: data.form,
					result: result
				});
			}

		}
	}

	function settingsFormButton(data) {
		var sendButton = $('[class*="btn_"]', data.form);

		var ajaxData = {
			src: $(data.form).attr('url') || form_tools.url,
			action: 'showMessageForm',
			form: data.form,
			post: {
				inputs: data.result,
				form: $(sendButton).attr('form') || 'Контакты'
			}	
		};

		//Вернём настройки с кнопки
		var settingsBtn = getSettingssInput(sendButton);

		if (settingsBtn) {
			if (settingsBtn.callback && settingsBtn.callback !== 'undefined' && settingsBtn.callback !== '') {
				ajaxData.callback = settingsBtn.callback;
			}

			if (settingsBtn.modal && settingsBtn.modal !== 'undefined' && settingsBtn.modal !== '') {
				ajaxData.modal = settingsBtn.modal;
			}
		}

		//Определяем метод
		if ($(data.form).attr('method') && $(data.form).attr('method') === 'GET') {
			
		} else {
			ajaxPost(ajaxData);
		}
	}	

	function setDataModalCustom(modal, self) {
		var bgModal = $(self).attr('bg');

		//APPEND BG MODAL
		if (bgModal && bgModal !== '') {
			var bgModalSec = $('.bg-modal', modal),
				successBg = false;
			//Если есть блок под изображение	
			if (bgModalSec && bgModalSec.length > 0 ) {
				successBg = true;
				$('img', bgModalSec).attr('src', bgModal);
			}

			//Если есть блок под изображение
			if (successBg === true) {
				var bgModalImg = $('img', bgModalSec);

				//Если есть тег IMG  либо вставляем, либо сперва создаём
				if (bgModalImg && bgModalImg.length > 0) {
					$(bgModalImg).attr('src', bgModal);	
				} else {
					$(bgModalSec).append(
						'<img src="' + bgModal + '" class="img-1">'
					);
				}
			}
		}

		//APPEND TITLE
		var formTitle = $(self).attr('form-title'); 
		if (formTitle && formTitle.length > 0) {
			$('.form-title', modal).html(formTitle);
		} else {
			$('.form-title', modal).html(form_tools.title);
		}

		var animateModal = getSettingssInput(self);

		//Анимации для модалки кастомизированные
		return animateModal;
	}	
});

function showMessageForm(data) {
	if (data["success"] === 1) {
		var modal = $('.modal[show="true"]'); 
		
		//Скрываем модалка отправки и показывае модалку об успешной отправке
		$(modal).css('display', 'none');
		$(modal).attr('show', '');
		$(form_tools.response.modal).fadeIn(200, function () {
			setTimeout(function () {
					$(form_tools.response.modal).fadeOut(200);
			}, 1500);			
		});

	}

	//CLEAR INPUT
	$('.form-dymanic input[type="text"], .form-dymanic input[type="textarea"]').val('');
}

function log(msg) {
	console.log(msg);
}


