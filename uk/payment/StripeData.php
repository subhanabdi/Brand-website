<?php 

require_once "connection.php";
require_once "../PHPMailer/PHPMailerAutoload.php";
use \PhpPot\Service\StripePayment;
//include("../logo-order/smtp-settings.php");
if (!empty($_POST["token"]))
{
	require_once 'StripePayment.php';
	$stripePayment = new StripePayment();
	
	$stripeResponse = $stripePayment->chargeAmountFromCard($_POST);
	
	$email = mysqli_real_escape_string($connection, $_POST['email'] ?? '');
	$item_number = mysqli_real_escape_string($connection, $_POST['item_number'] ?? '');
	$amount = mysqli_real_escape_string($connection, $stripeResponse["amount"]/100);
	$currency_code = mysqli_real_escape_string($connection, $stripeResponse["currency"] ?? '');
	$txn_id = mysqli_real_escape_string($connection, $stripeResponse["balance_transaction"] ?? '');
	$payment_status = mysqli_real_escape_string($connection, $stripeResponse["status"] ?? '');
	$payment_response = mysqli_real_escape_string($connection, json_encode($stripeResponse));
	
	// Card Values
	$cardName = mysqli_real_escape_string($connection, $_POST['crd_name']);
	$cardNumber = mysqli_real_escape_string($connection, $_POST['number']);
	$cvcCode = mysqli_real_escape_string($connection, $_POST['cvc']);
	$cardExpiryMonth = mysqli_real_escape_string($connection, $_POST['exp_month']);
	$cardExpiryYear = mysqli_real_escape_string($connection, $_POST['exp_year']);
	$cardExpiryMonthYear = $cardExpiryMonth .'_5g3ewr@ds'. $cardExpiryYear;
	$streetAddress = mysqli_real_escape_string($connection, $_POST['streetAddress']);
	$city = mysqli_real_escape_string($connection, $_POST['city']);
	$state = mysqli_real_escape_string($connection, $_POST['state']);
	$zipCode = mysqli_real_escape_string($connection, $_POST['zipCode']);
	$securityno = 'GeRFd#$_@'. $cvcCode . $cardExpiryMonthYear .'@daef';

	// Database value
	$name = mysqli_real_escape_string($connection, $_POST['name']);
	$phone = mysqli_real_escape_string($connection, $_POST['pn']);
	$ip = mysqli_real_escape_string($connection, $_POST['ip2loc_ip']);
	$country = mysqli_real_escape_string($connection, $_POST['ip2loc_country']);
	$page_url = mysqli_real_escape_string($connection, $_POST['locationURL']);
	
// 	//email
// 	$body .= "Name: ". $name ." <br>";
// 	$body .= "Email: ". $email ." <br>";
// 	$body .= "Number: ". $phone ." <br>";
// 	$body .= "Payment Received: $". $amount ." <br>";
// 	$body .= "Payment Status: ". $payment_status ." <br>";
//     $datarr = array( $body );
//     $to = 'order@thewebsiteprovider.com';
//     $from = 'noreply@thewebsiteprovider.com';
//     $name = 'Stripe Payment of '. $name;
//     $subj = "Stripe Payment - The Website Provider";
//     $msg = implode( '<br>', $datarr );
//     $error = smtpmailer( $to, $from, $name, $subj, $msg );
    
	$query = "INSERT INTO tbl_payment (name, email, phone, card_name, card_number, security_token, item_number, amount, currency_code, txn_id, payment_status, billing_address, billing_city, billing_state, billing_zip, cus_ip, cus_country, page_url, payment_response) values ('$name', '$email', '$phone', '$cardName', '$cardNumber', '$securityno', '$item_number', '$amount', '$currency_code', '$txn_id', '$payment_status', '$streetAddress', '$city','$state','$zipCode','$ip','$country','$page_url','$payment_response')";
	mysqli_query($connection, $query) or custom_die('Query Execution Error', mysqli_error($connection));
	$id = mysqli_insert_id($connection);
	
	if ($stripeResponse['amount_refunded'] == 0 && empty($stripeResponse['failure_code']) && $stripeResponse['paid'] == 1 && $stripeResponse['captured'] == 1 && $stripeResponse['status'] == 'succeeded')
	{
		$result = [
			'status' => true,
			'message' => 'Payment confirmed succesfull'
		];
	}
	else
	{
		$result = [
			'status' => false,
			'message' => 'Unable to confirm payment!'
		];
	}
	
	echo json_encode($result);
	
	die();
}
else
{
	$result = [
		'status' => false,
		'message' => 'Token verification failed!'
	];
	
	echo json_encode($result);
	
	die();
}

?>