<?php
require_once 'dbsetup.php';
$query = $conn->real_escape_string($_GET['search']);
$app_id = '<EDAMAM APP ID>';
$app_key = '<EDAMAM APP KEY>';
$url = "https://api.edamam.com/api/recipes/v2?type=any&beta=true&q=${query}&app_id=${app_id}&app_key=${app_key}";
$response = file_get_contents($url);
echo $response;
?>
