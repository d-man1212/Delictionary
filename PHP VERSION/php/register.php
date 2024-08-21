<?php
require_once 'dbsetup.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $display_name = $conn->real_escape_string($_POST['displayName']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = $conn->real_escape_string($_POST['password']);
    $confirm_password = $conn->real_escape_string($_POST['confirmPassword']);
    if ($password != $confirm_password) {
        $response = array("success" => false, "message" => "Passwords do not match");
        echo json_encode($response);
        exit();
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "SELECT * FROM users WHERE email='$email'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $response = array("success" => false, "message" => "Email already taken");
            echo json_encode($response);
            exit();
        } else {
            $sql = "INSERT INTO users (display_name, email, password) VALUES ('$display_name', '$email', '$hashed_password')";
            
            if ($conn->query($sql) === TRUE) {
                $_SESSION['user_id'] = $conn->insert_id;
                $_SESSION['display_name'] = $display_name;
                $_SESSION['email'] = $email;
                $response = array("success" => true, "message" => "Registration successful");
                echo json_encode($response);
                exit();
            } else {
                $response = array("success" => false, "message" => "Error occurred while registering user");
                echo json_encode($response);
                exit();
            }
        }
    }
}
?>
