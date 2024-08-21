<?php
require_once 'dbsetup.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $conn->real_escape_string($_POST['password']);
    if (empty($email) || empty($password)) {
        $response = array("success" => false, "message" => "Please provide both email and password");
        echo json_encode($response);
        exit();
    }
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $hashed_password = $user['password'];
                if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['display_name'] = $user['display_name'];
            $_SESSION['email'] = $user['email'];
            $response = array("success" => true, "message" => "Login successful");
            echo json_encode($response);
            exit();
        } else {
            $response = array("success" => false, "message" => "Incorrect email or password");
            echo json_encode($response);
            exit();
        }
    } else {
        $response = array("success" => false, "message" => "Incorrect email or password");
        echo json_encode($response);
        exit();
    }
} else {
    $response = array("success" => false, "message" => "Invalid request method");
    echo json_encode($response);
    exit(); 
}
?>
