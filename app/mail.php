<?php

	include 'php/PHPMailer/config.php';
	
	$data["success"] = 1;	
	if (isset($_POST) && !empty($_POST)) {
	

		$dataPost = $_POST;
		$form = $_POST['form'];
		$data["msg"] = '';

		foreach ($dataPost['inputs'] as $input) {
			$data["msg"] .= $input['mail'] . ':' . $input['value'] . '<br>';
		}
		
		//Тема письма 
		$mail->Subject = 'Заявка с сайта';
		//Сообщение
		$mail->Body = $form . '<br>' . $data["msg"];
	
	
		if(!$mail->send()){
		    $data["success"] = 0;
		}
	} else {
		$data["success"] = 0;
	}

	echo json_encode($data); 