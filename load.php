<?php

// print_r($_FILES['info']);
$uploaddir = "/var/www/intel-trans.ru/files/normbase/";
$uploadfile = $uploaddir . basename($_FILES['info']['name']);
// echo "<p>". $uploadfile."</p>";

if (file_exists($uploaddir)) {
    if (move_uploaded_file($_FILES['info']['tmp_name'], $uploadfile)) {
        $out = "good.\n";
    } else {
        $out = "not good\n";
    }

    echo $out;
}
?>