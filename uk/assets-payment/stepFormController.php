<?php
## CONFIG ##
include("connectiondb.php");
session_start();

# RESULT PAGE
$hascn = $_POST['Name'];
$hasem = $_POST['Email'];
$hasnum = $_POST['Number'];
$haspack = $_POST['lead_amt'];
$package = $_REQUEST['pack_n'];
//echo $hasnum;
//die();


$location = "stripe-pay-secure?cn=". $hascn . "&em=" . $hasem . "&pn=" . $hasnum . "&pack=" .$haspack . "&packnm=" .$package;
require "../PHPMailer/PHPMailerAutoload.php";
?>
<?php include("smtp-settings.php") ?>
<?php

if (isset($_REQUEST['hiddencapcha']) && $_REQUEST['hiddencapcha'] == "") {
    if (isset($_REQUEST['Name']) && $_REQUEST['Name'] != ""
        && isset($_REQUEST['Email']) && $_REQUEST['Email'] != ""
        && isset($_REQUEST['Number']) && $_REQUEST['Number'] != "") {
        //Brief Values
        $body .= "<b>Logo Design Brief</b><br>";
        $body .= "<b>-----------------</b><br>";
        $body .= "Project Title: " . $_REQUEST['project_title'] . "<br>";
        $body .= "Logo Text: " . $_REQUEST['logo_text'] . "<br>";
        $body .= "Tagline/Slogan: " . $_REQUEST['tagline'] . "<br>";
        $body .= "Color Preference: " . $_REQUEST['color_pref'] . "<br>";
        $body .= "Design Description: " . $_REQUEST['design_desc'] . "<br><br>";
        $body .= "<b>Client Details</b><br>";
        $body .= "<b>--------------</b><br>";
        $body .= "Name: " . $_REQUEST['Name'] . " <br>";
        $body .= "Email: " . $_REQUEST['Email'] . " <br>";
        $body .= "Phone: " . $_REQUEST['Number'] . " <br>";
        $body .= "Lead Area: $ " . $_REQUEST['lead_amt'] . " <br>";
        $body .= "Country Code: " . $_REQUEST['pc'] . " <br>";
        $body .= "Package: " . $_REQUEST['pack_n'] . " <br>";
        $body .= "Visitor IP: " . $_REQUEST['ip2loc_ip'] . " <br>";
        $body .= "Visitor Country Name: " . $_REQUEST['ip2loc_country'] . "<br>";
        $body .= "Visitor City: " . $_REQUEST['ip2loc_city'] . " <br>";
        $body .= "Page URL: " . $_REQUEST['locationURL'] . "<br>";

        // Logo Brief Values
        $project_title = mysqli_real_escape_string($con, $_REQUEST['project_title']);
        $logo_text = mysqli_real_escape_string($con, $_REQUEST['logo_text']);
        $tagline = mysqli_real_escape_string($con, $_REQUEST['tagline']);
        $color_pref = mysqli_real_escape_string($con, $_REQUEST['color_pref']);
        $design_desc = mysqli_real_escape_string($con, $_REQUEST['design_desc']);
        //
//        Database value
        $name = mysqli_real_escape_string($con, $_REQUEST['Name']);
        $email = mysqli_real_escape_string($con, $_REQUEST['Email']);
        $phone = mysqli_real_escape_string($con, $_REQUEST['Number']);
        $lead_area = mysqli_real_escape_string($con, $_REQUEST['lead_amt']);
        $lead_area2 = "$" . $lead_area;
        $package = mysqli_real_escape_string($con, $_REQUEST['pack_n']);
        $ip = mysqli_real_escape_string($con, $_REQUEST['ip2loc_ip']);
        $country = mysqli_real_escape_string($con, $_REQUEST['ip2loc_country']);
        $page_url = mysqli_real_escape_string($con, $_REQUEST['locationURL']);

        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        } else {
            $sql = "INSERT INTO logo_brief_lead SET name='" . $name . "', email='" . $email . "', phone='" . $phone . "', package_amount='" . $lead_area2 . "', package_name='" . $package . "', cus_ip='" . $ip . "', cus_country='" . $country . "', page_url='" . $page_url . "', project_title='" . $project_title . "', logo_text='" . $logo_text . "', tagline='" . $tagline . "', color_pref='" . $color_pref . "', design_desc='" . $design_desc . "'";
            mysqli_query($con, $sql);
            mysqli_close($con);
        }

        $datarr = array($body);
        $to = 'order@creativedesignmasters.com';
        $from = 'noreply@creativedesignmasters.com';
        $name = $hascn . ' - Brief of ' . $package;
        $subj = $hascn . " - Brief of " . $package . " - Creative Design Masters";
        $msg = implode('<br>', $datarr);
        $error = smtpmailer($to, $from, $name, $subj, $msg);
        header("Location: $location");
    }


}

