<?php
require_once 'dbsetup.php';
session_start();
$user_id = $_SESSION['user_id'];
$sql = "SELECT * FROM saved_recipes WHERE user_id = $user_id";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $recipes = array();
    while ($row = $result->fetch_assoc()) {
        $recipes[] = $row;
    }
    $response = array("success" => true, "recipes" => $recipes);
    echo json_encode($response);
} else {
    $response = array("success" => false, "message" => "No saved recipes found");
    echo json_encode($response);
}
?>
