<?php include('function.php');
session_start();

if($_POST['type'] == 'submtFormFunC'){
	extract($_POST);
	$sql = PaymentForm($customerName, $customerEmail, $contactNumber, $description, $packageName, $packagePrice, $BrandName);
	echo $sql;
}

?>