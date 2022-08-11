<?php
function smtpmailer($to, $from, $from_name, $subject, $body)
{
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Host = 'mail.creativedesignmasters.com';
    $mail->Port = '465';
    $mail->Username = 'noreply@creativedesignmasters.com';
    $mail->Password = '#@aV892~.E8#';
    $mail->IsHTML(true);
    $mail->From = "noreply@creativedesignmasters.com";
    $mail->FromName = $from_name;
    $mail->Sender = $from;
    $mail->AddReplyTo($from, $from_name);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->AddAddress($to);
    //$mail->addCC("hassaan0802@gmail.com");
    foreach ( $_FILES[ "inspir" ][ "name" ] as $k => $v ) {
        $mail->AddAttachment( $_FILES[ "inspir" ][ "tmp_name" ][ $k ], $_FILES[ "inspir" ][ "name" ][ $k ] );
    }
    if (!$mail->Send()) {
        $error = "Please try Later, Error Occured while Processing...";
        return $error;
    } else {
        $error = "Thank You, Form has been submitted!";
        return $error;
    }
}
?>