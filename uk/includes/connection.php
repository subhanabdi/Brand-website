<?php $servername = 'localhost';
$username = 'metadesi_masters';
$password = 'Rt6N@zOj,LW(';
$dbname = 'metadesi_masters';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
?>