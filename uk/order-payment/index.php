<?php 
// Include configuration file  
require_once 'config.php';

?>

<!DOCTYPE html>
    <html lang="en">
    <head>
    <title>Metadesignmasters | Secure Payments. Globally!</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link href="../assets-payment/css/layout.css" rel="stylesheet" type="text/css"/>
        <link href="../assets-payment/css/style_step.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="../assets-payment/images/favicon.png" type="image/x-icon">
        <style>
        section.main-lgo-requiremnts-sec .sbmt_btn {color: #fff;text-transform: uppercase;font-weight: 600;font-size: 16px;padding: 11px 28px;border-radius: 2px;text-decoration: none;transition: .3s;width: 100%;border: none;cursor: pointer;background: linear-gradient(to right, #ff533d 0, #ff533d 100%);font-family: 'Open Sans', sans-serif;outline: none;}
                       img.simple {
            max-width: 152px;
        }
            .has-exp-card {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .has-exp-card input {
                width: 48%;
            }
            input#submit-btn {
                width: 100%;
                margin: 0 0 10px;
            }
            .pack-name-price h2 {
                font-size: 20px;
                font-weight: 600;
                margin: 0;
            }

            .pack-name-price h3 {
                font-size: 34px;
                font-weight: 700;
                color: #f15f61;
                margin: 0;
            }

            .pack-name-price {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #bbc5d6;
                padding-bottom: 10px !important;
                margin-bottom: 10px;
            }
            div#error-message {
                display: block;
                text-align: left;
                color: red;
                font-size: 14px;
                margin-bottom: 5px;
                font-weight: 600;
            }
            .lds-ring {
              display: none;
              position: relative;
              width: 40px;
              height: 40px;
              position: absolute;
            }
            .lds-ring.show {
              display: inline-block;
            }
            .lds-ring div {
              box-sizing: border-box;
              display: block;
              position: absolute;
              width: 34px;
              height: 34px;
              margin: 8px;
              border: 2px solid #fff;
              border-radius: 50%;
              animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
              border-color: #fff transparent transparent transparent;
            }
            .lds-ring div:nth-child(1) {
              animation-delay: -0.45s;
            }
            .lds-ring div:nth-child(2) {
              animation-delay: -0.3s;
            }
            .lds-ring div:nth-child(3) {
              animation-delay: -0.15s;
            }
            @keyframes lds-ring {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }


.logo-invc img{width: 210px;}
    .invc-inr{max-width: 750px; margin: auto; background-color: #f5f5f5; padding: 50px 50px;}
    .invoice-sec{padding: 60px 0;}
    .qtn-dt{text-align: right;}
    .qtn-dt h4{font-size: 20px; background-color: #969696; display: inline-block;    padding: 4px 5px; color: #fff;}
    .qtn-dt h5{font-size: 17px; margin: 0 0 4px;}
    .adrs-brnd{    padding: 50px 0 40px 0;}
    .blv-hstn{}
    .blv-hstn h4{    font-weight: 700;    margin: 0 0 14px;}
    .blv-hstn h5{    font-size: 16px;    line-height: 23px;}
    .blv-hstn h6{    font-size: 16px;}
    .blv-hstn h6 a{color: #333; font-weight: 700;}
    .estmt{text-align: right;}
    .estmt h4{font-size: 20px;border-bottom: 1px solid #bdbdbd;padding: 0 0 7px;margin: 0 0 12px 120px;}
    .estmt h5{font-size: 20px;}
    table.invc-tbl{width: 100%; background-color: #eae9e9; }
    table.invc-tbl tr th{background-color: #808080;color: #fff;font-size: 18px;font-weight: 600;padding: 5px 15px;border-right: 1px solid #fff;}
    table.invc-tbl tr th:nth-child(1){width: 43%;}
    table.invc-tbl tr th:nth-child(2){width: 16%;}
    table.invc-tbl tr th:nth-child(3){width: 19%; text-align: right;}
    table.invc-tbl tr th:nth-child(4){width: 19%; text-align: right;}
    table.invc-tbl tr td{color: #585858;font-size: 14px;padding: 10px 15px;border-right: 1px solid #fff;line-height: 20px;white-space:break-spaces;}
    table.invc-tbl tr td strong{font-size: 16px;color: #333;font-weight: 600;}
    table.invc-tbl tr td:nth-child(3){text-align: right;}
    table.invc-tbl tr td:nth-child(4){text-align: right;}


        </style>

    </head>
    <body class="hompg">
        <header class="fixed sticky">
        <div class="main-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <a href="https://metadesignmasters.com/uk/" class="logo">
                            <img src="../assets-payment/images/meta-black2.png" alt="" class="simple">
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
    
    <?php

define('DBHOST', 'localhost');
define('DBUSER', 'metadesi_masters');
define('DBPASS', 'Rt6N@zOj,LW(');
define('DBNAME', 'metadesi_masters');
define('DEBUG', true);

$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME) or custom_die('Database Connection Error', mysqli_connect_error());
    
    if(isset($_GET['ID'])) {
        $GeneratedId = $_GET['ID'];
        $query = "SELECT * FROM payments WHERE payment_id = '$GeneratedId'";
        $result = mysqli_query( $connection, $query ) or custom_die( 'Query Execution Error', mysqli_error( $connection ) );
        $count = mysqli_num_rows( $result );
        if ( $count > 0 ) {
            $user = mysqli_fetch_assoc( $result );
            $itemName = $user[ 'package' ];
            $itemPrice = $user[ 'amount' ];
            } 
        }
    ?>

<section class="main-lgo-requiremnts-sec">
  <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="bsnuss-heading">
                    <h2 class="main-cnt-heading">JUST ONE STEP LEFT<br> TO ACTIVATE YOUR COUPON</h2>
                    <p class="main-cnt-para para-wdth">We’re almost done here, just a few more things that we’d be needing from you to welcome you onboard.</p>
                    <h4 class="text-center">Secure Payment Globally!</h4>
                </div>
            </div>
        </div>
      <div class="row mt-3">
         <div class="col-md-6 has-pay-meth">
             <div class="col-md-12 col-sm-12 pack-name-price">
                 <h2><?php echo $itemName; ?></h2>
                                            <h3>$<?php echo $itemPrice; ?></h3>
                                  </div>
             <div class="col-md-12 col-sm-12 m-auto">
                 <img src="../assets-payment/images/card-brands.svg">
             </div>
             <div class="col-md-12">
                 <div class="panel">
    <div class="panel-body">
        
        <!-- Payment form -->
        <form action="payment.php?gen_id=<?php echo $GeneratedId ?>" method="POST">
            <div class="form-group thnk_inp">
                <span>NAME</span>
                <input type="text" name="name" placeholder="Enter name" required="" autofocus="">
            </div>
            <div class="form-group thnk_inp">
                <span>EMAIL</span>
                <input type="email" name="email" placeholder="Enter email" required="">
            </div>
            <div class="form-group thnk_inp">
                <span>CARD NUMBER</span>
                <input autocomplete="off" type="text" name="card_number" placeholder="Card Numbers"
                            maxlength="16" minlength="16"
                            onkeypress='return ((event.charCode >= 48 && event.charCode <= 57) )' required/>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <input type="text" name="card_exp_month" placeholder="MM" required="">
                    </div>
                    <div class="col-md-4">
                        <input type="text" name="card_exp_year" placeholder="YYYY" required="">
                    </div>
                    <div class="col-md-4">
                        <input type="text" name="card_cvc" placeholder="CVC" autocomplete="off" required="">
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-success sbmt_btn">Submit Payment</button>
        </form>
    </div>
</div>
                 
             </div>
         </div>

      </div>
        <div class="row">
            <div class="container bottom-form">

                <ul>
                    <li><img src="../assets-payment/images/bottom-logos1.jpg"></li>
                    <li><img src="../assets-payment/images/bottom-logos2.jpg"></li>
                    <li><img src="../assets-payment/images/bottom-logos3.jpg"></li>
                </ul>


            </div>
        </div>
   
   </div>
        
  </div>
    
 </div>
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