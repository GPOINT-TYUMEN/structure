<?php 
	namespace PHPMailer\PHPMailer;
	include 'Exception.php';
	include 'OAuth.php';
	include 'PHPMailer.php';
	include 'POP3.php';
	include 'SMTP.php';

	$mail = new PHPMailer;
	//будем отравлять письмо через СМТП сервер
	$mail->isSMTP();
	//хост
	$mail->Host = $host;
	//требует ли СМТП сервер авторизацию/идентификацию
	$mail->SMTPAuth = true;
	// логин от вашей почты
	$mail->Username = $login;
	// пароль от почтового ящика
	$mail->Password = $password;
	//указываем способ шифромания сервера
	$mail->SMTPSecure = 'ssl';
	//указываем порт СМТП сервера
	$mail->Port = '465';
	 
	//указываем кодировку для письма
	$mail->CharSet = 'UTF-8';
	//информация от кого отправлено письмо
	$mail->From = $from;
	//название сообщения
	$mail->FromName = $nameMsg;
	//На какой адрес будет отправлено письмо
	-$emails-

	$mail->isHTML(true);	