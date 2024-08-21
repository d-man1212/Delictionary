<?php
require_once 'dbsetup.php';
session_start();
$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);
$label = $conn->real_escape_string($data['label']);
$image = $conn->real_escape_string($data['image']);
$url = $conn->real_escape_string($data['url']);
$sql = "DELETE FROM saved_recipes WHERE recipe_label = '$label' AND recipe_image = '$image' AND recipe_url = '$url' AND user_id = $user_id";
if ($conn->query($sql) === TRUE) {
    $response = array("success" => true, "message" => "Recipe removed successfully");
    echo json_encode($response);
    exit();
} else {
    $response = array("success" => false, "message" => "Error occurred while removing recipe: " . $conn->error);
    echo json_encode($response);
    exit();
}
?>
