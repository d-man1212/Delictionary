<?php
require_once 'dbsetup.php';
session_start();
if (!isset($_SESSION['user_id'])) {
    $response = array("success" => false, "message" => "You are not logged in");
    echo json_encode($response);
    exit();
}
$user_id = $_SESSION['user_id'];
$display_name = $_SESSION['display_name'];
$email = $_SESSION['email'];
$user_info = array(
    "user_id" => $user_id,
    "display_name" => $display_name,
    "email" => $email
);
$response = array("success" => true, "user_info" => $user_info);
echo json_encode($response);
exit();
?>
