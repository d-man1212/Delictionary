<?php
require_once 'dbsetup.php';
session_start();
session_destroy();
$response = array("success" => true, "message" => "Logout successful");
echo json_encode($response);
exit();
?>
