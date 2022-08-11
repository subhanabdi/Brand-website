<?php
include('connection.php');

function PaymentForm($customerName, $customerEmail, $contactNumber, $description, $packageName, $packagePrice, $BrandName)
{
	global $conn;
	$sql = "INSERT INTO payments (amount, package, customer_name, customer_email, customer_number, brand, description) VALUES ('$packagePrice', '$packageName', '$customerName', '$customerEmail', '$contactNumber', '$BrandName', '$description')";
	$conn->query($sql);
	return $conn->insert_id;
}

?>