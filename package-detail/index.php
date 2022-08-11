<?php 

header('Location: https://metadesignmasters.com/');

require_once "../includes/connection.php";

if(isset($_GET['id'])){
   $id = $_GET['id'];
   $sql = "SELECT * FROM packages WHERE brand_pkg_id = '$id'";
   $result = $conn -> query($sql);
   foreach ($result as $res) {
    $packageName = $res['pkg_name'];
    $packagePrice = $res['pkg_price'];
 }
}

?>
<!DOCTYPE HTML>
<html lang="en">

<head>
   <?php include("../includes/compatibility.php"); ?>
   <title>Best Digital Agency for Creative Design in the USA | Meta Design Masters </title>
   <?php include("../includes/style.php"); ?>
   
   <style>
       #submtFormBtn{
           background: #007edd;
    width: 100%;
    height: 45px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    border: 0px;
    text-align: left;
    padding-left: 59px;
       }
   </style>
   
</head>

<body class="cbp-spmenu-push inner-pg bannerdesign-p broucherdesign-p contact">

   <?php include("../includes/header.php"); ?>

   <?php include("../includes/popup.php"); ?>

   <section class="bannermm">
      <div class="container">
         <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
               <div class="leftcont-ban">
                  <h1 class="montfont">
                     <span>Our Dedicated</span>
                     <br>
                     <strong>Support Staff </strong> Is Active 24x7 to Assist You. 
                  </h1>
                  <p>Know Everything About Your Designs.</p>
               </div>
            </div>
         </div>
      </div>
   </section>
   <section class="contact-main">
      <div class="container">
         <div class="sechead">
            <h3 class="montfont">Payment Generation Form!</h3>
            <p>Please fill out the following information for generated link</p>
         </div>
         <div class="row">
            <div class="col-md-12">
               <div class="contact-form-main">
                  <div id="contact-form" class="gray-bg">
                     <form action="../order-payment" method="POST" id="submtFormFunC">
                        <h4>Fill the required information:</h4>
                        <div class="field mm-field">
                           <i class="user"></i>
                           <input type="text" name="customerName" class="required" placeholder="Your Name">
                        </div>
                        <div class="field mm-field">
                           <i class="email"></i>
                           <input type="text" name="customerEmail" class="required email" maxlength="60" placeholder="Your Email">
                        </div>
                        <div class="field mm-field">
                           <i class="phone"></i>
                           <input type="text" name="contactNumber" class="required" placeholder="Your Number">
                        </div>
                        <div class="field mm-field full textarea">
                           <textarea name="description" rows="12" placeholder="Description"></textarea>
                        </div>
                        <div class="submit">
                           <input type="hidden" name="packageName" value="<?php echo $packageName; ?>">
                           <input type="hidden" name="packagePrice" value="<?php echo $packagePrice; ?>">
                           <input type="hidden" name="BrandName" value="Metadesignmaster">
                           <button id="submtFormBtn">Submit Now</button>
                        </div>
                     </form>
                  </div>
                  <div class="red-bg">
                     <h3 class="montfont">Product Information</h3>
                     <div class="row">
                        <div class="col-480-100 col-xs-6 col-sm-4 col-md-12">
                           <h4>Package Name</h4>
                           <p><?php echo $packageName; ?></p>
                        </div>
                        <div class="col-480-100 col-xs-6 col-sm-4 col-md-12">
                           <h4>Package Price</h4>
                           <p>
                              <a>$ <?php echo $packagePrice; ?></a>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>

   <?php include("../includes/footer.php"); ?>

   <?php include("../includes/scripts.php"); ?>
   
   <script type="text/javascript">
        $("#submtFormBtn").click(function(e){
            e.preventDefault();
            submtFormFun();
        });
        function submtFormFun(){
            
            var form = $('#submtFormFunC').serialize();
      var formdata = 'submtFormFunC';
      $.ajax({
         url: 'includes/ajax.php',
         type: 'POST',
         data: form+"&type="+formdata,
         success: function(res){
            window.location = '/order-payment?ID=' + res;
      }
  })
            
        }
    </script>
   
</body>
</html>