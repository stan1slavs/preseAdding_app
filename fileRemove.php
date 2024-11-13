<?php
$input = json_decode(file_get_contents('php://input'), true);
$newPathAbs = $input['newPathAbs'];
$nameFile = $input['nameFile'];

$path = "/var/www/intel-trans.ru/" .$newPathAbs;
$error = '';
$success = '';
if (!file_exists($path)) {
    $error = 'Файла не существует.';
} else {

    if (!unlink($path)) {
      $error = 'Не удалось удалить файл.';
    } else {
		$success = "<a target='_blank' href='../" .$newPathAbs."' class='gost-text'>". $nameFile ."</a>";
    }
}

$data = array(
    'error'   => $error,
    'success' => $success,
);


die( json_encode( $data ) );
?>