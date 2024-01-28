<?php
require_once('./DistanceAlgo.php');


$input_word = $_GET["input_word"] ?? "";


if (strlen($input_word) === 0) {
    echo json_encode(["error_msg" => "parameter 'input_word' is not provided"]);
    http_response_code(400);
    exit;
}

$distance_algorithm = new DistanceAlgo($input_word);

echo $distance_algorithm->get_word_suggestions(10);
http_response_code(200);
exit;
