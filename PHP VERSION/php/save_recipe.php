<?php
require_once 'dbsetup.php';
session_start();
$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);
$label = $conn->real_escape_string($data['label']);
$image = $conn->real_escape_string($data['image']);
$url = $conn->real_escape_string($data['url']);
$existing_recipe_sql = "SELECT * FROM saved_recipes WHERE recipe_label = '$label' AND user_id = $user_id";
$existing_recipe_result = $conn->query($existing_recipe_sql);
if ($existing_recipe_result->num_rows > 0) {
    $response = array("success" => true, "message" => "Recipe already saved");
    echo json_encode($response);
    exit();
} else {
    $sql = "INSERT INTO saved_recipes (recipe_label, recipe_image, recipe_url, user_id) VALUES ('$label', '$image', '$url', $user_id)";
    if ($conn->query($sql) === TRUE) {
        $response = array("success" => true, "message" => "Recipe saved successfully");
        echo json_encode($response);
        exit();
    } else {
        $response = array("success" => false, "message" => "Error occurred while saving recipe: " . $conn->error);
        echo json_encode($response);
        exit();
    }
}
?>
