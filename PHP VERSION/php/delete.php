<?php
require_once 'dbsetup.php';
session_start();
$user_id = $_SESSION['user_id'];
$sql = "DELETE FROM users WHERE id=$user_id";
if ($conn->query($sql) === TRUE) {
    session_destroy();
    $response = array("success" => true, "message" => "Account deleted successfully");
    echo json_encode($response);
    exit(); 
} else {
    $response = array("success" => false, "message" => "Error occurred while deleting account");
    echo json_encode($response);
    exit();
}
?>
