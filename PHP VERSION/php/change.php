<?php
require_once 'dbsetup.php';
session_start();
$user_id = $conn->real_escape_string($_SESSION['user_id']);
$new_password = $conn->real_escape_string($_POST['password']);
$hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
$sql = "UPDATE users SET password='$hashed_password' WHERE id=$user_id";
if ($conn->query($sql) === TRUE) {
    $response = array("success" => true, "message" => "Password changed successfully");
    echo json_encode($response);
    exit();
} else {
    $response = array("success" => false, "message" => "Error occurred while changing password");
    echo json_encode($response);
    exit();
}
?>
