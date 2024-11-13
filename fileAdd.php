<?php
// ini_set('post_max_size', '110M');       // Максимальный размер данных
// ini_set('upload_max_filesize', '100M'); // Максимальный размер файлов
// ini_set('max_execution_time', '600');   // Максимальное время выполнения скрипта
// ini_set('max_input_time', '600');       // Максимальное время обработки данных
// ini_set('memory_limit', '200M');        // Память для скрипта


// echo "<p>". $uploaddir."</p>";
// $uploadfile = $uploaddir . basename($_FILES['filedata']['name']);
// echo "<p>". $uploadfile."</p>";

// echo "<script>console.log('Debug Objects: " . $_FILES['filedata'] . "' );</script>";

// if (file_exists($uploaddir)) {
//     if (move_uploaded_file($_FILES['filedata']['tmp_name'], $uploadfile)) {
//         $out = "good.\n";
//     } else {
//         $out = "not good\n";
//     }

//     echo $out;
// }

$newPathRel = $_POST['newPathRel'];
$newPathAbs = $_POST['newPathAbs'];

$path = "/var/www/intel-trans.ru/" .$newPathAbs. "/";
$error = '';
$success = '';
if (!isset($_FILES['my_file_upload'])) {
    $error = 'Файл не загружен.';
} else {
    $file = $_FILES['my_file_upload'];

    if (!is_uploaded_file($file['tmp_name']) || empty($file['tmp_name'])) {
        $error = 'Файл загружен не должным образом.';
    } else {
        $name = basename($_FILES['my_file_upload']['name']);
        $nameFile = basename($_FILES['my_file_upload']['name'], ".ppsx");

        if (move_uploaded_file($file['tmp_name'], $path . $name)) {
            $success = "<div style='display: flex;justify-content: space-between;'>
<a target='_blank' href='" .$newPathRel. "/". $name. "' class='gost-text'>". $nameFile ."</a>
<div style='cursor: pointer;display: none;' data-name='daletePresent'>x</div>
</div>";
        } else {
            $error = 'Не удалось загрузить файл.';
        }
    }
}

$data = array(
    'error'   => $error,
    'success' => $success,
);

die( json_encode( $data ) );
?>