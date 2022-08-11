<?php

session_start();

define('DBHOST', 'localhost');
define('DBUSER', 'metadesi_masters');
define('DBPASS', 'Rt6N@zOj,LW(');
define('DBNAME', 'metadesi_masters');
define('DEBUG', true);

$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME) or custom_die('Database Connection Error', mysqli_connect_error());

function custom_die($message, $error)
{
	if (DEBUG)
	{
		echo $message . ': ' . $error;
		die();
	}
	else
	{
		echo $message;
		die();
	}
}

?>