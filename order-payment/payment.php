<?php 
// Include Authorize.Net PHP sdk 
require 'authorize_net_sdk_php/autoload.php';  
use net\authorize\api\contract\v1 as AnetAPI; 
use net\authorize\api\controller as AnetController; 
 
// Include configuration file  
require_once 'config.php';
    
define('DBHOST', 'localhost');
define('DBUSER', 'metadesi_masters');
define('DBPASS', 'Rt6N@zOj,LW(');
define('DBNAME', 'metadesi_masters');
define('DEBUG', true);

$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME) or custom_die('Database Connection Error', mysqli_connect_error());
    
    
    if(isset($_GET['gen_id'])) {
        $GeneratedId = $_GET['gen_id'];
        $query = "SELECT * FROM payments WHERE payment_id = '$GeneratedId'";
        $result = mysqli_query( $connection, $query ) or custom_die( 'Query Execution Error', mysqli_error( $connection ) );
        $count = mysqli_num_rows( $result );
        if ( $count > 0 ) {
            $user = mysqli_fetch_assoc( $result );
            $itemName = $user[ 'package' ];
            $itemPrice = $user[ 'amount' ];
            } 
        }
 
$paymentID = $statusMsg = ''; 
$ordStatus = 'error'; 
$responseArr = array(1 => 'Approved', 2 => 'Declined', 3 => 'Error', 4 => 'Held for Review'); 
 
// Check whether card information is not empty 
if(!empty($_POST['card_number']) && !empty($_POST['card_exp_month']) && !empty($_POST['card_exp_year']) && !empty($_POST['card_cvc'])){ 
     
    // Retrieve card and user info from the submitted form data 
    $name = $_POST['name']; 
    $email = $_POST['email']; 
    $card_number = preg_replace('/\s+/', '', $_POST['card_number']); 
    $card_exp_month = $_POST['card_exp_month']; 
    $card_exp_year = $_POST['card_exp_year']; 
    $card_exp_year_month = $card_exp_year.'-'.$card_exp_month; 
    $card_cvc = $_POST['card_cvc']; 
     
    // Set the transaction's reference ID 
    $refID = 'REF'.time(); 
     
    // Create a merchantAuthenticationType object with authentication details 
    // retrieved from the config file 
    $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();    
    $merchantAuthentication->setName(ANET_API_LOGIN_ID);    
    $merchantAuthentication->setTransactionKey(ANET_TRANSACTION_KEY);    
     
    // Create the payment data for a credit card 
    $creditCard = new AnetAPI\CreditCardType(); 
    $creditCard->setCardNumber($card_number); 
    $creditCard->setExpirationDate($card_exp_year_month); 
    $creditCard->setCardCode($card_cvc); 
     
    // Add the payment data to a paymentType object 
    $paymentOne = new AnetAPI\PaymentType(); 
    $paymentOne->setCreditCard($creditCard); 
     
    // Create order information 
    $order = new AnetAPI\OrderType(); 
    $order->setDescription($itemName); 
     
    // Set the customer's identifying information 
    $customerData = new AnetAPI\CustomerDataType(); 
    $customerData->setType("individual"); 
    $customerData->setEmail($email); 
     
    // Create a transaction 
    $transactionRequestType = new AnetAPI\TransactionRequestType(); 
    $transactionRequestType->setTransactionType("authCaptureTransaction");    
    $transactionRequestType->setAmount($itemPrice); 
    $transactionRequestType->setOrder($order); 
    $transactionRequestType->setPayment($paymentOne); 
    $transactionRequestType->setCustomer($customerData); 
    $request = new AnetAPI\CreateTransactionRequest(); 
    $request->setMerchantAuthentication($merchantAuthentication); 
    $request->setRefId($refID); 
    $request->setTransactionRequest($transactionRequestType); 
    $controller = new AnetController\CreateTransactionController($request); 
    $response = $controller->executeWithApiResponse(constant("\\net\authorize\api\constants\ANetEnvironment::$ANET_ENV")); 
     
    if ($response != null) { 
        // Check to see if the API request was successfully received and acted upon 
        if ($response->getMessages()->getResultCode() == "Ok") { 
            // Since the API request was successful, look for a transaction response 
            // and parse it to display the results of authorizing the card 
            $tresponse = $response->getTransactionResponse(); 
 
            if ($tresponse != null && $tresponse->getMessages() != null) { 
                // Transaction info 
                $transaction_id = $tresponse->getTransId(); 
                $payment_status = $response->getMessages()->getResultCode(); 
                $payment_response = $tresponse->getResponseCode(); 
                $auth_code = $tresponse->getAuthCode(); 
                $message_code = $tresponse->getMessages()[0]->getCode(); 
                $message_desc = $tresponse->getMessages()[0]->getDescription(); 
                 
                // Include database connection file  
                include_once 'dbConnect.php'; 
                 
                // Insert tansaction data into the database 
                $sql = "INSERT INTO orders(name,email,item_name,item_number,item_price,item_price_currency,card_number,card_exp_month,card_exp_year,paid_amount,txn_id,payment_status,payment_response,created,modified) VALUES('".$name."','".$email."','".$itemName."','".$itemNumber."','".$itemPrice."','".$currency."','".$card_number."','".$card_exp_month."','".$card_exp_year."','".$itemPrice."','".$transaction_id."','".$payment_status."','".$payment_response."',NOW(),NOW())"; 
                $insert = $db->query($sql); 
                $paymentID = $db->insert_id; 
                 
                $ordStatus = 'success'; 
                $statusMsg = 'Your Payment has been Successful!'; 
            } else { 
                $error = "Transaction Failed! \n"; 
                if ($tresponse->getErrors() != null) { 
                    $error .= " Error Code  : " . $tresponse->getErrors()[0]->getErrorCode() . "<br/>"; 
                    $error .= " Error Message : " . $tresponse->getErrors()[0]->getErrorText() . "<br/>"; 
                } 
                $statusMsg = $error; 
            } 
            // Or, print errors if the API request wasn't successful 
        } else { 
            $error = "Transaction Failed! \n"; 
            $tresponse = $response->getTransactionResponse(); 
         
            if ($tresponse != null && $tresponse->getErrors() != null) { 
                $error .= " Error Code  : " . $tresponse->getErrors()[0]->getErrorCode() . "<br/>"; 
                $error .= " Error Message : " . $tresponse->getErrors()[0]->getErrorText() . "<br/>"; 
            } else { 
                $error .= " Error Code  : " . $response->getMessages()->getMessage()[0]->getCode() . "<br/>"; 
                $error .= " Error Message : " . $response->getMessages()->getMessage()[0]->getText() . "<br/>"; 
            } 
            $statusMsg = $error; 
        } 
    } else { 
        $statusMsg =  "Transaction Failed! No response returned"; 
    } 
}else{ 
    $statusMsg = "Error on form submission."; 
} 
?>


<!DOCTYPE html>
	<html lang="en">
	<head>
	<title>Meta Design Masters | Thank You</title>
        <meta charset="utf-8">
        <meta name="page_url" content="metadesignmasters.com/thankyou/">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link href="../assets-payment/css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="../assets-payment/css/style_step.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="/favico.png" type="image/x-icon">
        <script>(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"56357517"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");</script>
       <style>
       img.simple {
    max-width: 180px;
}
               img.simple {
            max-width: 152px;
        }
           .inner-banner {
               height: 440px;
               background-position: center;
               background-repeat: no-repeat;
               background-size: cover;
               display: flex;
               align-items: center;
               justify-content: center;
               text-align: center;
           }
           .inner-banner h1 {
               font-size: 18px;
               color: #f9d470;
               font-weight: 400;
               padding-bottom: 2px;
           }
           .inner-banner h2 {
               font-size: 45px;
               color: #fff;
               font-weight: 700;
               line-height: 52px;
           }
           .privacy_policy_Sec {
               padding: 18px 0 59px;
           }
           section.privacy_policy_Sec h4 {
               font-size: 36px;
               font-weight: 700;
               color: #141516;
           }
           section.privacy_policy_Sec h4:nth-child(1) {
               text-align: center;
               font-size: 46px;
               padding-top: 69px;
           }
           .para p {
               font-size: 18px;
               line-height: 23px;
               color: #897c68;
           }
           .privacy_policy_Sec a{display: table;    background: #ff533d!important;    padding: 12px 20px;    border-radius: 4px; margin: auto; color: #fff;}
           
        </style>

    </head>
    <body class="hompg">
    <header class="fixed sticky">
        <div class="main-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <a href="https://metadesignmasters.com/" class="logo">
                            <img src="../assets-payment/images/meta-black2.png" alt="" style="max-width:190px;">
                        </a>
                    </div>
                    <div class="col-md-8 ">
                        <div class="menuWrap text-right">
                            <ul class="menu ">
                                <!-- <li><span>We are here 24/7</span><a href="#" onclick="setButtonURL();">Live Chat Now</a></li> -->
                                <li class="first"><span>Call An Expert!</span><a href="tel:(800) 861-8851">(800) 861-8851</a></li>
                                <li><a href="javascript:;" class="header-btn loginUp d-none" onclick="setButtonURL()"> Live Chat</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="inner-banner" style="background-image: url(../assets-payment/images/1.png);">
        <div class="container">
            <h1>Meta Design Masters</h1>
            <h2>ThankYou</h2>
        </div>
    </div>
    <section class="privacy_policy_Sec hding-2 hding-4 para">
        <div class="container">
            <div class="status">
    <?php if(!empty($paymentID)){ ?>
        <h4 class="<?php echo $ordStatus; ?>"><?php echo $statusMsg; ?></h4>
        
        <h5 class="text-center">Payment Information</h5>
        <p class="text-center">Reference Number: <?php echo $paymentID; ?></p>
        <p class="text-center">Transaction ID: <?php echo $transaction_id; ?></p>
        <p class="text-center">Status: <?php echo $responseArr[$payment_response]; ?></p>
        
        <h5 class="text-center">Product Information</h5>
        <p class="text-center">Name: <?php echo $itemName; ?></p>
        <p class="text-center">Price: <?php echo $itemPrice.' '.$currency; ?></p>
    <?php }else{ ?>
        <h4 class="error">Your Payment has Failed</h4>
        <p class="error text-center"><?php echo $statusMsg; ?></p>
    <?php } ?>
</div>
        </div>
        <div class="space"><br></div>

    </section>
    <div class="copyright">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <p>Copyright © 2021 Meta Design Masters | All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
    <script src="../assets-payment/js/plugin.js"></script>
</body>
</html>