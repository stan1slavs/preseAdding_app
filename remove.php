<?php
$input = json_decode(file_get_contents('php://input'), true);
$newData = $input['newData'];

$error = '';
$fileName = 'present.html';


$fileData = file_get_contents($fileName);

if(!$fileData) {
    $error = "Не удалось открыть файл разметки";
}
else {
    $lines = explode("\n", $fileData);

    $linesFormated = array_map(function($str) { return trim($str); }, $lines);
    $index = array_search($newData, $linesFormated);

    if($index !== false){
        array_splice($linesFormated, $index-1, 4);
        $newFileContent = implode("\n", $linesFormated);
        file_put_contents($fileName, $newFileContent);
    }
    else {
        $error = "Разметка не найдена";
    }
}

$data = array(
    'error' => $error
);

die( json_encode( $data ) );

?>