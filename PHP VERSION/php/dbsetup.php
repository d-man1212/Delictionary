<?php
$servername = "localhost";
$username = "root";
$password = "1234";
$database = "IWP";
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "CREATE DATABASE IF NOT EXISTS $database";
if ($conn->query($sql) === FALSE) {
    die("Error creating database: " . $conn->error);
}
$conn->select_db($database);
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)";
if ($conn->query($sql) === FALSE) {
    die("Error creating users table: " . $conn->error);
}
$sql = "CREATE TABLE IF NOT EXISTS saved_recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_label VARCHAR(255) NOT NULL,
    recipe_image VARCHAR(2048) NOT NULL,
    recipe_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)";
if ($conn->query($sql) === FALSE) {
    die("Error creating saved_recipes table: " . $conn->error);
}
?>
