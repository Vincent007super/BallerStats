<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'BallerStats';
$username = 'BallerStats-Admin';
$password = 'Baller-Admin123';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>