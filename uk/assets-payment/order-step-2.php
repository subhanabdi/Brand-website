<?php session_start();
session_destroy(); ?>
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Order Step 2 - Creative Design Masters</title>
		<meta charset="utf-8">
		<meta name="ip2loc" content="<?php echo $ip ?>">
		<meta name="ip2loc" content="<?php echo $_SERVER['REMOTE_ADDR']; ?>">
		<meta name="page_url" content="<?php echo $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">	<link rel="stylesheet" href="https://backofficeprofs.com/assets/css/layout.css?var=1213" />
        <link href="css/layout.css" rel="stylesheet" type="text/css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
		<link href="css/style_step.css" rel="stylesheet" type="text/css"/>
		<link rel="shortcut icon" href="/favico.png" type="image/x-icon">
	</head>
<body class="hompg">
<?php
$hascn2 = $_POST['Name'];
echo $hascn2;
$hasem2 = $_GET['em'];
$hasnum2 = $_GET['pn'];
$lead_ar = $_GET['pack'];
$pack_ar = $_GET['packnm'];
$web_url = $_SESSION[ 'web_page' ];
?>
<header class="fixed sticky">
    <div class="main-header">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-4">
                    <a href="javascript:;" class="logo">
                        <img class="simple" src="images/Logo.png" alt="">
                        <!-- <img class="halloweenlogo" src="" alt=""> -->
                    </a>
                </div>
                <div class="col-md-8 ">
                    <div class="menuWrap text-right">
                        <ul class="menu ">
                            <!-- <li><span>We are here 24/7</span><a href="#" onclick="setButtonURL();">Live Chat Now</a></li> -->
                            <li class="first"><span>Call An Expert!</span><a href="tel:<?php echo $phonenumber; ?>"><?php echo $phonenumber; ?></a></li>
                            <li><a href="javascript:;" class="header-btn loginUp d-none" onclick="setButtonURL()"> Live Chat</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<section class="main-lgo-requiremnts-sec">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <form id="frm2" class="has-form"  method="POST" enctype="multipart/form-data" action="/logo-order/stepFormController.php">
                    <div class="row justify-content-center">
                        <div class="col-md-10">
                            <div class="bsnuss-heading">
                                <h2 class="main-cnt-heading">Logo Design Brief Form</h2>
                                <p class="main-cnt-para para-wdth">
                                    Please fill out the following information to provide us
                                    <span>brief information about your Business For any query <a href="javascript:;" onclick="setButtonURL();" target="_self">Chat with Us Now</a></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <div class="">
                                <div class="infrm-inpts">
                                    <span>Project Title</span>
                                    <input type="text" name="project_title" placeholder="Logo for my new business" required="" />
                                </div>
								<div class="infrm-inpts">
									<span>Tagline/Slogan</span>
									<input type="text" name="tagline" placeholder="Let’s do Business"/>
								</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div>
								<div class="infrm-inpts">
									<span>Color Preference</span>
									<input type="text" name="color_pref" placeholder="Red, Black, Orange etc"/>
								</div>
								<div class="infrm-inpts">
									<span>Logo Text</span>
									<input type="text" name="logo_text" placeholder="ABC Inc" />
								</div>
                            </div>
                        </div>
						<div class="col-md-12 col-sm-12">
							<div class="">
								<div class="infrm-inpts">
									<span>Inspiration/Reference</span>
									<input id="profile-img1" type="file" name="inspir[]" />
								</div>
							</div>
						</div>
						<div class="col-md-12 col-sm-12">
							<div>
								<div class="infrm-inpts">
									<span>Design Description</span>
									<textarea name="design_desc" placeholder="Ideas or Suggestions"></textarea>
								</div>
							</div>
						</div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center mt-4">
                            <div class="sbmt_btn">
                                <ul>
                                    					<li class="last">
						<input type="submit" name="send" value="Proceed" class="custBtn">
						<input type="hidden" name="hiddencapcha" value="">
						<input class="" type="hidden" name="Name" value="<?php echo $hascn2; ?>"/>
						<input class="" type="hidden" name="Email" value="<?php echo $hasem2; ?>"/>
						<input class="" type="hidden" name="Number" value="<?php echo $hasnum2; ?>"/>
						<input class="" type="hidden" name="lead_amt" value="<?php echo $lead_ar; ?>"/>
						<input class="" type="hidden" name="pack_n" value="<?php echo $pack_ar; ?>"/>
						<input type="hidden" name="fullpageurl" 	value="<?php echo $fullpageurl 			?>" />
						<input type="hidden" name="pageurl" 		value="<?php echo $pageurl 				?>" />
						<!-- ip2Location -->
						<input type="hidden" name="ip2loc_ip" 		value="<?php echo $query['query'] 		?>" />
						<input type="hidden" name="ip2loc_isp" 		value="<?php echo $query['isp'] 		?>" />
						<input type="hidden" name="ip2loc_org" 		value="<?php echo $query['org'] 		?>" />
						<input type="hidden" name="ip2loc_country" 	value="<?php echo $query['country'] 	?>" />
						<input type="hidden" name="ip2loc_region" 	value="<?php echo $query['regionName'] 	?>" />
						<input type="hidden" name="ip2loc_city" 	value="<?php echo $query['city'] 		?>" />
						<input type="hidden" name="pc" value="">
						<input type="hidden" name="lead_web_url" value="<?php echo $web_url;?>">
						<input type="hidden" id="location" name="locationURL"
							   value="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>"/>
					</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<div class="copyright">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
                <p>Copyright © 2021 Creative Design Masters | All rights reserved.</p>
            </div>
        </div>
    </div>
</div>
<script src="js/plugin.js"></script>
<?php include("/home/o1oiw2d0a8z4/public_html/includes/chat-link.php") ?>
<script>
    $(document).ready(function() {
	var key = '5XpThOAEkfgOvEJ';
	var currentIP = $("meta[name=ip2loc]").attr('content');
	$.ajax({
		method: 'get',
		url: 'https://pro.ip-api.com/json/' + currentIP,
		data: {key: key},
		success: function (data) {
			if (data) {
				$('input[name=ip2loc_ip]').val(data.query);
				$('input[name=ip2loc_isp]').val(data.isp);
				$('input[name=ip2loc_org]').val(data.org);
				$('input[name=ip2loc_country]').val(data.country);
				$('input[name=ip2loc_region]').val(data.regionName);
				$('input[name=ip2loc_city]').val(data.city);
				$('input[name=pageurl]').val(pgurl);
			}
		}
	});
	});
</script>
</body>
</html>